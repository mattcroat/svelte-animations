<script lang="ts">
	import { gsap } from 'gsap'
	import { Flip } from 'gsap/dist/Flip'

	gsap.registerPlugin(Flip)

	let boxes = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
	let container = 1

	async function shuffle() {
		const state = Flip.getState('.box')

		boxes = gsap.utils.shuffle(boxes)
		container = container === 1 ? 2 : 1

		requestAnimationFrame(() => {
			Flip.from(state, {
				targets: '.box',
				duration: 1,
				ease: 'power1.inOut',
				stagger: 0.2,
				spin: true
			})
		})
	}
</script>

<div class="container-1">
	{#if container === 1}
		{#each boxes as box (box)}
			<div class="box" data-flip-id={box.id}>
				{box.id}
			</div>
		{/each}
	{/if}
</div>

<div class="container-2">
	{#if container === 2}
		{#each boxes as box (box)}
			<div class="box" data-flip-id={box.id}>
				{box.id}
			</div>
		{/each}
	{/if}
</div>

<button on:click={shuffle}>Shuffle</button>

<style>
	.box {
		width: 140px;
		display: grid;
		place-content: center;
		font-size: 3rem;
		font-weight: 700;
		color: black;
		background-color: white;
		border-radius: 1rem;
	}

	.container-1,
	.container-2 {
		min-height: 140px;
		display: flex;
		gap: 1rem;
		margin: 2rem;
		padding: 1rem;
		border: 2px solid white;
		border-radius: 1rem;
	}

	button {
		margin: 2rem;
	}
</style>
