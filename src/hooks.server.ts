import { type Handle, redirect } from "@sveltejs/kit";
import { Auth } from "$lib/server/auth";

export const handle: Handle = async ({ resolve, event }) => {
  event.locals.auth = new Auth(event)

  const { session, user } = await event.locals.auth.get()

  if (user) {
    event.locals.session = session
    event.locals.user = user

    if (event.url.pathname === "/login") redirect(301, "/")
  } else {
    event.locals.session = undefined
    event.locals.user = undefined

    if (event.url.pathname !== "/login") redirect(301, "/login")
  }
  console.log("User:", user?.id ?? "unknown")

  return resolve(event)
}