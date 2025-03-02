import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    await locals.auth.logout(locals.session)
  }
  redirect(301, "/login")
}