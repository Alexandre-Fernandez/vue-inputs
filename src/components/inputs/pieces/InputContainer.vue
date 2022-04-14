<script lang="ts">
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

		const borderStyle = computed(() => {
			if (props.isDisabled) return "border-neutral-300"
			if (props.hasError) return "border-danger-500"
			if (props.isFilled) return "border-nav-black"
			return "border-neutral-300"
		})

		return {
			htmlInputContainer,
			handleFocusOut,
			borderStyle,
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
			borderStyle,
			isDisabled ? 'bg-neutral-0' : '',
		]"
		@focusout="handleFocusOut"
		ref="htmlInputContainer"
	>
		<slot></slot>
	</div>
</template>
