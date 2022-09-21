import { animate, spring } from 'motion'
import type { Action } from 'svelte/action'

type SpringInParams = {
	scale?: number
	rotate?: number
}
type SpringInAction = Action<HTMLElement, SpringInParams>

export const springIn: SpringInAction = (node, params) => {
	animate(
		node,
		{
			scale: params?.scale ?? 1,
			rotate: params?.rotate ?? 0
		},
		{ easing: spring() }
	)
}
