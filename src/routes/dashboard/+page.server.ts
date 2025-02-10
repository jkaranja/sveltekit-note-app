import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/signin');
	}

	// fetch notes
	const allNotes = await db.select().from(table.note);

	return { user: event.locals.user, notes: allNotes };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/signin');
	},

	create: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		const text = formData.get('text') as string;

		if (!title || !text) return fail(400, { error: 'Title and text are required' });

		const note: table.Note = { id: generateUserId(), title, text };

		await db.insert(table.note).values(note);

		return { success: true };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		if (!id) return fail(400, { error: 'Invalid note ID' });

		//await db.delete(table.note).where({ id });

		return { success: true };
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
