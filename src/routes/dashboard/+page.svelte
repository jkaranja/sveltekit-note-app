<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="w-full px-8 col gap-y-6">
	<div class="row justify-between py-2">
		<h1>Welcome back, {data.user.username}!</h1>
		<!-- <p>Your user ID is {data.user.id}.</p> -->
		<form method="post" action="?/logout" use:enhance>
			<Button>Sign out</Button>
		</form>
	</div>

	<div>
		<h3>Add note</h3>
		<form method="POST" action="?/create" use:enhance class="row gap-x-3">
			<input name="title" placeholder="Title" class="input" required />
			<textarea name="text" placeholder="Text" class="input h-12" required></textarea>
			<Button type="submit">Add Note</Button>
		</form>
	</div>

	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>#Id</th>
					<th>Title</th>
					<th>Text</th>
					<th>Manage</th>
				</tr>
			</thead>
			<tbody>
				{#each data.notes as note, i}
					<tr>
						<td>{note.id}</td>
						<td>{note.title}</td>
						<td>{note.text}</td>
						<td>
							<form method="POST" action="?/delete" use:enhance>
								<input type="hidden" name="id" value={note.id} />
								<Button type="submit" class="text-red-500">Delete</Button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">All notes</th>
					<td>{data.notes.length || ''}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
