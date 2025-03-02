import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData()
    const email = form.get("email") as string | null
    const password = form.get("password") as string | null

    if (!email || !password) return fail(400, { message: "Provide an email and password" })

    const session = await locals.auth.login(email, password)

    if (!session) return fail(401, { message: "Incorrect email and/or password" })

    redirect(301, "/")
  }
}