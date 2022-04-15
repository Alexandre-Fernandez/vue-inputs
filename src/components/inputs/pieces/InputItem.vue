<script lang="ts">
import useUpdateModel from "@/composables/input/useUpdateModel"
import { defineComponent, ref } from "vue"

export default defineComponent({
	props: { modelValue: String, isTextarea: Boolean },
	setup(props, { emit }) {
		const htmlComponent = ref<HTMLInputElement>()
		const updateModelValue = useUpdateModel(emit)
		const handleEnterDown = () => htmlComponent.value?.blur()

		return { updateModelValue, handleEnterDown, htmlComponent }
	},
})
</script>

<template>
	<component
		:is="isTextarea ? 'textarea' : 'input'"
		class="appearance-none outline-none w-full placeholder:italic placeholder:text-secondary"
		:value="modelValue"
		@input="updateModelValue"
		@keydown.enter="handleEnterDown"
		ref="htmlComponent"
	/>
</template>
