import type { RequestEvent } from "@sveltejs/kit";
import {
  createSession, deleteSessionTokenCookie,
  generateSessionToken, invalidateSession,
  type SessionValidationResult, setSessionTokenCookie,
  validateSessionToken
} from "$lib/server/auth/utils";
import * as argon2 from "argon2";
import prisma from "$lib/server/db";
import type { Session } from "@prisma/client";

export class Auth {
  constructor(private event: RequestEvent) {}

  async get(): Promise<SessionValidationResult> {
    const token = this.event.cookies.get("session")
    if (token) return validateSessionToken(token)
    else return { session: null, user: null }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (user) {
      const verify = await argon2.verify(user.password, password)
      if (verify) {
        const token = generateSessionToken()
        const session = await createSession(token, user.id)
        setSessionTokenCookie(this.event, token, session.expiresAt)
        return session
      }
    }
  }

  async register(email: string, password: string) {
    return prisma.user.create({
      data: {
        email,
        password: await argon2.hash(password)
      }
    })
  }

  async setAdmin(id: number, admin: boolean = true) {
    await prisma.user.update({
      where: { id },
      data: {
        admin
      }
    })
  }

  async logout(session: Session) {
    await invalidateSession(session.id)
    deleteSessionTokenCookie(this.event)
  }
}