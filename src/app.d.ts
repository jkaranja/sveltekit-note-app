// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
// declare namespace App {
// 	interface Locals {
// 		user: { id: string; username: string } | null;
// 		session: { id: string; userId: string; expiresAt: Date } | null;
// 	}
// 	// interface PageData {}
// 	// interface Error {}
// 	// interface Platform {}
// }


// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: import('$lib/server/auth').SessionValidationResult['user'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

export {};
