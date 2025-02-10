<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, class: btnClass = '', ...rest }: HTMLButtonAttributes = $props();
</script>

<button class={`btn variant-ghost-surface ${btnClass}`} {...rest}>
	{@render children?.()}
</button>
