<script lang="ts">
	import { flip } from 'svelte/animate'
	import { crossfade } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

	const [send, receive] = crossfade({
		easing: quintOut,
		fallback(node) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '' : style.transform

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

	let cards = [
		{ id: 1, selected: false },
		{ id: 2, selected: false },
		{ id: 3, selected: false },
		{ id: 4, selected: false }
	]

	$: stack = cards.filter((card) => card.selected)
	$: hand = cards.filter((card) => !card.selected)

	function dealCard() {
		cards = [...cards, { id: cards.length + 1, selected: false }]
	}

	function returnToStack(cardId: number) {
		const index = cards.findIndex((card) => card.id === cardId)
		cards[index].selected = true
	}

	function returnToHand(cardId: number) {
		const index = cards.findIndex((card) => card.id === cardId)
		cards[index].selected = false
	}
</script>

<div class="cards">
	<div class="deck">
		{#each stack as card, index (card)}
			<div
				class="card"
				on:click={() => returnToHand(card.id)}
				animate:flip
				in:send={{ key: card.id }}
				out:receive={{ key: card.id }}
				style:--index={index}
			>
				{card.id}
			</div>
		{/each}
	</div>

	<div class="hand" style:--cards={hand.length}>
		{#each hand as card, index (card)}
			<div
				class="card"
				on:click={() => returnToStack(card.id)}
				animate:flip
				in:send={{ key: card.id }}
				out:receive={{ key: card.id }}
				style:--index={index}
			>
				{card.id}
			</div>
		{/each}
	</div>
</div>

<div class="deal">
	<button on:click={dealCard}>Deal</button>
</div>

<style lang="scss">
	.cards {
		height: 100vh;
		display: grid;
		grid-template-rows: repeat(2, 1fr);
	}

	.deck {
		--angle: 10deg;
		--index: 0;

		display: grid;
		place-content: center;
		user-select: none;

		> * {
			grid-area: 1 / -1;
		}

		&::before {
			content: '';
			width: 200px;
			height: 280px;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 25%);
			background-color: hsl(220 20% 20%);
			border: 6px dashed hsl(220 20% 40%);
			border-radius: 1rem;
		}

		.card {
			width: 200px;
			height: 280px;
			display: grid;
			place-content: center;
			transform: rotate(calc(var(--angle) * var(--index)));
			font-weight: 700;
			font-size: 8rem;
			color: hsl(220 20% 20%);
			background-color: hsl(220 20% 98%);
			border-radius: 1rem;
			box-shadow: 0 0 20px hsl(0 0% 0% / 20%);
			cursor: pointer;
		}
	}

	.hand {
		--angle: 40deg;
		--cards: 0;
		--index: 0;

		display: grid;
		place-content: center;
		margin: 0 auto;
		user-select: none;

		> * {
			grid-area: 1 / -1;
		}

		&:hover {
			--angle: 60deg;
		}

		.card {
			width: 200px;
			height: 280px;
			display: grid;
			place-content: center;
			transform-origin: center 180%;
			transform: rotate(
				calc(
					calc(var(--angle) * -1) / 2 + calc(var(--angle) / var(--cards)) *
						var(--index)
				)
			);
			font-weight: 700;
			font-size: 8rem;
			color: hsl(220 20% 20%);
			background-color: hsl(220 20% 98%);
			border-radius: 1rem;
			box-shadow: 0 0 20px hsl(0 0% 0% / 20%);
			transition: all 300ms cubic-bezier(0.6, 0, 0.2, 1);
			cursor: pointer;
		}

		.card:hover {
			scale: 1.04;
			z-index: 100;
		}
	}

	.deal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		button {
			font-size: 1.2rem;
			font-weight: 700;
		}
	}
</style>
