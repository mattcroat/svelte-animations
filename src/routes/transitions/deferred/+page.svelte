<script lang="ts">
	import { crossfade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import shuffle from 'just-shuffle'

	const [send, receive] = crossfade({
		duration: 600,

		// default when you remove an emoji
		fallback(node) {
			const style = getComputedStyle(node)
			const transform =
				style.transform === 'none' ? '' : style.transform

			return {
				duration: 600,
				easing: quintOut,
				css: (time) => `
					transform: ${transform} scale(${time});
					opacity: ${time}
				`
			}
		}
	})

	let emojis = ['🎩', '🪄', '🐇', '🌹']
	let container = 1

	async function randomize() {
		emojis = shuffle(emojis)
		container = container === 1 ? 2 : 1
	}

	function remove(id: string) {
		emojis = emojis.filter((emoji) => emoji !== id)
	}
</script>

<div class="container">
	{#if container === 1}
		{#each emojis as emoji (emoji)}
			<div
				class="emoji"
				in:receive={{ key: emoji }}
				out:send={{ key: emoji }}
			>
				{emoji}
			</div>
		{/each}
	{/if}
</div>

<div class="container">
	{#if container === 2}
		{#each emojis as emoji (emoji)}
			<div
				class="emoji"
				in:receive={{ key: emoji }}
				out:send={{ key: emoji }}
			>
				{emoji}
			</div>
		{/each}
	{/if}
</div>

<div class="actions">
	<button on:click={randomize}>🎲</button>
</div>

<style lang="scss">
	.container {
		min-width: 800px;
		min-height: 200px;
		display: flex;
		gap: 1rem;
		margin: 2rem;
		padding: 1rem;
		border: 6px dashed hsl(220 20% 28%);
		border-radius: 1rem;

		.emoji {
			width: 140px;
			display: grid;
			place-content: center;
			font-size: 3rem;
			background: hsl(220 20% 20%);
			border: 1px solid hsl(220 20% 24%);
			border-radius: 1rem;
			box-shadow: 0 0 10px hsl(0 0% 0% / 20%);
			cursor: pointer;
		}
	}

	.actions {
		width: min-content;
		display: flex;
		gap: 1rem;
		margin: 0 auto;

		button {
			margin: 0 auto;
			font-size: 3rem;
			color: white;
			box-shadow: 0 0 10px hsl(0 0% 0% / 20%);
			transition: background-color 0.3s ease;
		}

		button:hover {
			color: black;
			background-color: aquamarine;
		}
	}
</style>
