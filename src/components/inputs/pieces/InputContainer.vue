<script lang="ts">
import useInputContainerStyle from "@/composables/input/useInputContainerStyle"
import { computed, defineComponent, ref } from "vue"

export default defineComponent({
	props: {
		isFilled: Boolean,
		isDisabled: Boolean,
		hasError: Boolean,
	},
	emits: ["focusout"],
	setup(props, { emit }) {
		const htmlInputContainer = ref<HTMLDivElement>()
		const handleFocusOut = () => {
			if (htmlInputContainer.value?.matches(":focus-within")) return
			emit("focusout")
		}

		const inputContainerStyle = computed(() =>
			useInputContainerStyle(
				props.isDisabled,
				props.hasError,
				props.isFilled
			)
		)

		return {
			htmlInputContainer,
			handleFocusOut,
			inputContainerStyle,
		}
	},
})
</script>

<template>
	<div
		:class="[
			`w-full px-4 flex items-center justify-center border relative
			focus-within:outline focus-within:outline-brand-primary 
			focus-within:outline-2`,
			inputContainerStyle,
		]"
		@focusout="handleFocusOut"
		ref="htmlInputContainer"
	>
		<slot></slot>
	</div>
</template>
