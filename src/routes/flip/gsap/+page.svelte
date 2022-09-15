<script lang="ts">
	import { gsap } from 'gsap'
	import Flip from 'gsap/dist/Flip'

	gsap.registerPlugin(Flip)

	type Card = {
		id: number
		content: string
		selected: boolean
	}

	let cards = [
		{ id: 1, content: '🎩', selected: false },
		{ id: 2, content: '🪄', selected: false },
		{ id: 3, content: '🐇', selected: false },
		{ id: 4, content: '🔥', selected: false }
	]

	$: stack = cards.filter((card) => card.selected)
	$: hand = cards.filter((card) => !card.selected)

	function flip() {
		const state = Flip.getState('.card')

		// you could also use tick
		requestAnimationFrame(() => {
			Flip.from(state, {
				targets: '.card',
				duration: 1
			})
		})
	}

	function dealCard() {
		const emojis = ['🎩', '🪄', '🐇', '🔥']
		const index = Math.floor(Math.random() * emojis.length)

		cards = [
			...cards,
			{
				id: cards.length + 1,
				content: emojis[index],
				selected: false
			}
		]
	}

	function returnToStack(cardFromHand: Card) {
		const index = cards.findIndex(
			(card) => card === cardFromHand
		)
		cards[index].selected = true
		flip()
	}

	function returnToHand(cardFromDeck: Card) {
		const index = cards.findIndex(
			(card) => card === cardFromDeck
		)
		cards[index].selected = false
		flip()
	}
</script>

<svelte:window on:mousewheel={dealCard} />

<div class="table">
	<div class="deck">
		{#each stack as card, index}
			<div
				class="card"
				on:click={() => returnToHand(card)}
				data-flip-id={card.id}
				style:--index={index}
			>
				{card.content}
			</div>
		{/each}
	</div>

	<div class="hand" style:--cards={hand.length}>
		{#each hand as card, index}
			<div
				class="card"
				on:click={() => returnToStack(card)}
				data-flip-id={card.id}
				style:--index={index}
			>
				{card.content}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.table {
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
			width: 220px;
			height: 300px;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 30%);
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
					calc(var(--angle) * -1) / 2 +
						calc(var(--angle) / var(--cards)) * var(--index)
				)
			);
			font-size: 8rem;
			color: hsl(220 20% 20%);
			background-color: hsl(220 20% 98%);
			border-radius: 1rem;
			box-shadow: 0 0 20px hsl(0 0% 0% / 20%);
			// transition: all 300ms cubic-bezier(0.6, 0, 0.2, 1);
			cursor: pointer;

			&:hover {
				scale: 1.04;
				z-index: 100;
			}
		}
	}
</style>
