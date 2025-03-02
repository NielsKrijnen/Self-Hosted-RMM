import type { Session, User } from "@prisma/client";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import prisma from "$lib/server/db";
import { sha256 } from "@oslojs/crypto/sha2";
import type { RequestEvent } from "@sveltejs/kit";

export function generateSessionToken() {
  return encodeBase32LowerCaseNoPadding(crypto.getRandomValues(new Uint8Array(20)))
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  return prisma.session.create({
    data: {
      id,
      userId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
  })
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const result = await prisma.session.findUnique({
    where: { id },
    include: { user: true }
  })
  if (!result) return { session: null, user: null }

  const { user, ...session } = result
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id } })
    return { session: null, user: null }
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await prisma.session.update({
      where: { id: session.id },
      data: {
        expiresAt: session.expiresAt
      }
    })
  }
  return { session, user }
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } })
}

export async function invalidateAllSessions(userId: number): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId }
  })
}

export type SessionValidationResult = { session: Session, user: User } | { session: null, user: null }

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/"
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.delete("session", { path: "/" })
}