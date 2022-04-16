<script lang="ts">
import { computed, defineComponent } from "vue"

export default defineComponent({
	props: {
		isFocused: Boolean,
		isFilled: Boolean,
		isDisabled: Boolean,
		hasError: Boolean,
	},
	setup(props) {
		const borderStyle = computed(() => {
			if (props.isDisabled) return "border-neutral-300"
			if (props.hasError) return "border-danger-500"
			if (props.isFilled) return "border-nav-black"
			return "border-neutral-300"
		})

		return {
			borderStyle,
		}
	},
})
</script>

<template>
	<div
		:class="[
			`w-full px-4 flex items-center justify-center border relative`,
			borderStyle,
			isDisabled ? 'bg-neutral-0' : '',
			isFocused ? 'outline outline-2 outline-brand-primary' : '',
		]"
	>
		<slot></slot>
	</div>
</template>
