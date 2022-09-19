<script lang="ts">
	import { spring } from 'svelte/motion'
	import Animate from '$lib/animate.svelte'

	function scaleRotate(el: HTMLElement, params: any = {}) {
		const value = { rotate: 0, scale: 1 }
		const options = { stiffness: 0.1, damping: 0.6 }

		let transition = spring(value, options)

		const unsubscribe = transition.subscribe(
			({ rotate, scale }) => {
				el.style.transform = `scale(${scale}) rotate(${rotate}deg)`
			}
		)

		transition.update((state) => ({
			scale: params.scale,
			rotate: params.rotate
		}))

		setTimeout(() => {
			transition.set({ scale: 1, rotate: 0 })
		}, 1000)

		return {
			destroy: () => unsubscribe()
		}
	}
</script>

<Animate>
	<div
		class="box"
		use:scaleRotate={{ rotate: 90, scale: 2 }}
	/>
</Animate>

<style>
	.box {
		width: 140px;
		height: 140px;
		background-color: aquamarine;
		border-radius: 1rem;
		box-shadow: 0 0 10px hsl(0 0% 0% / 10%);
	}
</style>
