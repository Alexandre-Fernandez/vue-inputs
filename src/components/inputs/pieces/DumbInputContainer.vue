<script lang="ts">
import useInputContainerStyle from "@/composables/input/useInputContainerStyle"
import { computed, defineComponent } from "vue"

export default defineComponent({
	props: {
		isFocused: Boolean,
		isFilled: Boolean,
		isDisabled: Boolean,
		hasError: Boolean,
	},
	setup(props) {
		const inputContainerStyle = computed(() =>
			useInputContainerStyle(
				props.isDisabled,
				props.hasError,
				props.isFilled
			)
		)

		return {
			inputContainerStyle,
		}
	},
})
</script>

<template>
	<div
		:class="[
			`w-full px-4 flex items-center justify-center border relative`,
			isFocused ? 'outline outline-2 outline-brand-primary' : '',
			inputContainerStyle,
		]"
	>
		<slot></slot>
	</div>
</template>
