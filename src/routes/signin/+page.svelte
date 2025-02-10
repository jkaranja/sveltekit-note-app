<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { page } from '$app/state';
	import Button from '$lib/ui/Button.svelte';
	let { form }: { form: ActionData } = $props();
</script>

<div class="max-w-sm space-y-3 col gap-y-4">
	<h1>Sign in</h1>

	<form method="post" class="space-y-3" action="?/login" use:enhance>
		<label class="col">
			Username
			<input class="input" name="username" />
		</label>
		<label class="col">
			Password
			<input class="input" type="password" name="password" />
		</label>
		<div class="row justify-between">
			<Button>Login</Button>

			<Button formaction="?/register">Register</Button>
			<!-- <div>
				Don't have an account yet? <button class="text-green-500" formaction="?/register"
					>Register</button
				>
			</div> -->
		</div>
	</form>

	{#if form?.message}
		<aside class="alert bg-red-400">
			<p class="alert-message">{form?.message ?? ''}</p>
		</aside>
	{/if}
</div>
