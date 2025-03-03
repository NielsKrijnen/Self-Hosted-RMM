import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/db";

export const load: PageServerLoad = async () => {
  const first = await prisma.user.findFirst()

  return {
    register: !first
  }
}

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const form = await request.formData()
    const email = form.get("email") as string | null
    const password = form.get("password") as string | null

    if (!email || !password) return fail(400, { message: "Provide an email and password" })

    const session = await locals.auth.login(email, password)

    if (!session) return fail(401, { message: "Incorrect email and/or password" })

    redirect(301, "/")
  },
  register: async ({ request, locals }) => {
    const form = await request.formData();
    const email = form.get("email") as string | null
    const password = form.get("password") as string | null

    if (!email || !password) return fail(400, { message: "Provide an email and password" })

    const { id } = await locals.auth.register(email, password);
    await locals.auth.setAdmin(id);
    await locals.auth.login(email, password);

    redirect(301, "/")
  }
}