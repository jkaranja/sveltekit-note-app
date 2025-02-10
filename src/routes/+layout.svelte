<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Link from '$lib/ui/Link.svelte';

	let { children } = $props();
</script>

<!-- App Shell -->
<AppShell>
	<!-- App Bar -->
	<AppBar>
		<div class="row justify-end">
			<Link class="text-lg" href="/">Note.app</Link>
		</div>
	</AppBar>

	<!-- Page Route Content -->
	{@render children()}
</AppShell>
