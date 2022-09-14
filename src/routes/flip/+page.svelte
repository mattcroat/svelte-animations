<script lang="ts">
	import { afterUpdate, beforeUpdate } from 'svelte'
	import { gsap } from 'gsap'
	import { Flip } from 'gsap/dist/Flip'

	gsap.registerPlugin(Flip)

	let items = [1, 2, 3, 4]
	let state: Flip.FlipState | null = null

	function removeItem(itemToRemove: number) {
		items = items.filter((item) => item !== itemToRemove)
	}

	function reset() {
		items = [1, 2, 3, 4]
	}

	function reverse() {
		items = [...items.reverse()]
	}

	beforeUpdate(() => {
		state = Flip.getState('.item')
	})

	afterUpdate(() => {
		if (!state) return

		Flip.from(state, {
			duration: 1,
			ease: 'power1.inOut'
		})
	})
</script>

<ul>
	{#each items as item (item)}
		<li class="item" on:click={() => removeItem(item)}>{item}</li>
	{/each}
</ul>

<div class="actions">
	<button on:click={reset}>Reset</button>
	<button on:click={reverse}>Reverse</button>
</div>

<style>
	ul {
		display: flex;
		gap: 1rem;
		padding: 2rem;
		list-style: none;
	}

	li {
		color: black;
		background: white;
		padding: 1rem 2rem;
		border-radius: 1rem;
	}

	.actions {
		display: flex;
		gap: 0.4rem;
		padding: 0 2rem;
	}
</style>
