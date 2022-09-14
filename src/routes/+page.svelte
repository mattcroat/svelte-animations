<script lang="ts">
	import { fly } from 'svelte/transition'
	import { backOut } from 'svelte/easing'

	import Animate from '$lib/animate.svelte'

	const lines = ['you wont', '', 'believe', '', 'these discounts.']
</script>

<Animate>
	<div class="lines">
		{#each lines as line, index}
			<span
				class="line"
				in:fly={{
					y: 40,
					delay: 300 * index,
					easing: backOut
				}}
			>
				{line}
			</span>
		{/each}
	</div>
</Animate>

<style>
	.lines {
		max-width: 800px;
		font-size: 3rem;
		font-weight: 900;
		text-align: center;
	}

	.line {
		display: inline-block;
		padding: 0.2rem;
		text-transform: uppercase;
		text-shadow: 2px 0 10px hsl(0 0% 0% / 20%);
	}
</style>
