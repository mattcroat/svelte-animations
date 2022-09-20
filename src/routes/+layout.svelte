<script lang="ts">
	import Navigator from '$lib/navigator.svelte'
	import PageTransition from '$lib/transition.svelte'
	import type { PageData } from './$types'

	import '../app.css'

	export let data: PageData
</script>

<svelte:head>
	<title>Svelte Animations</title>
	<script
		async
		src="https://platform.twitter.com/widgets.js"
		charset="utf-8"></script>
</svelte:head>

<Navigator />

<PageTransition key={data.url} duration={600}>
	<slot />
</PageTransition>
