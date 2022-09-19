<script lang="ts">
	import { goto } from '$app/navigation'

	const pages = [
		'/',
		'/motion/tweened',
		'/motion/spring',
		'/transitions/component',
		'/transitions/stagger',
		'/transitions/examples',
		'/transitions/custom/css',
		'/transitions/custom/js',
		'/animate/flip',
		'/flip/svelte',
		'/flip/gsap'
	]
	let currentPage = 0

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			if (currentPage === pages.length - 1) return
			currentPage += 1
			const nextPage = currentPage
			goto(pages[nextPage])
		}

		if (event.key === 'ArrowLeft') {
			if (currentPage <= 0) return
			currentPage -= 1
			const previousPage = currentPage
			goto(pages[previousPage])
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
