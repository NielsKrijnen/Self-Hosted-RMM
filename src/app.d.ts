import type { Auth } from "$lib/server/auth";
import type { Session, User } from "@prisma/client";

declare global {
	namespace App {
		interface Locals {
			auth: Auth
			user: User | undefined
			session: Session | undefined
		}
	}
}