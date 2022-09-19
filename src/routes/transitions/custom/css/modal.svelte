<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { quintOut } from 'svelte/easing'

	function modal(node: HTMLElement, params: any) {
		const transform = getComputedStyle(node).transform

		return {
			duration: params.duration ?? 1000,
			easing: quintOut,
			css: (t: number, u: number) => {
				return `transform:
					${transform}
					scale(${t})
					translateY(${u * -100}%)
				`
			}
		}
	}

	const dispatch = createEventDispatcher()

	const audio = new Audio('/audio/midi.mp3')
	audio.volume = 0.1
	audio.loop = true

	const play = () => audio.play()
	const pause = () => audio.pause()
	const close = () => dispatch('close')
</script>

<div class="modal-background" on:click={close} />

<div
	transition:modal={{ duration: 1000 }}
	on:introstart={play}
	on:outroend={pause}
	class="modal"
	role="dialog"
	aria-modal="true"
>
	<slot />
</div>

<style lang="scss">
	.modal-background {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: hsla(0 0% 0% / 20%);
	}

	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		background: hsl(220 20% 90%);
		box-shadow: 0 0 10px hsl(0 0% 0% / 10%);
		transform: translate(-50%, -50%);
		border-radius: 1rem;
	}
</style>
