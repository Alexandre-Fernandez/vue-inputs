<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import props from "./props"

export default defineComponent({
	props: {
		...props,
		modelValue: Boolean,
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const toggle = () => {
			if (!props.disabled) emit("update:modelValue", !props.modelValue)
		}

		const border = "after:border after:border-x-primary-50"
		const boxStyle = computed(() => {
			if (props.disabled) return `after:bg-neutral-0 ${border}`
			if (!props.modelValue) return `after:bg-white ${border}`
			return "after:bg-primary-100 after:bg-checked after:bg-center after:bg-contain"
		})

		return { id, boxStyle, toggle }
	},
})
</script>

<template>
	<div :class="['flex items-center w-min']">
		<div
			:class="[
				'w-3.5 h-3.5 rounded-sm flex items-center justify-center relative',
				'after:absolute after:w-3.5 after:h-3.5 after:rounded-sm ',
				disabled ? '' : 'cursor-pointer',
				boxStyle,
			]"
			@click="toggle"
		>
			<input
				type="checkbox"
				class="opacity-5"
				:id="id"
				:value="modelValue"
				:disabled="disabled"
			/>
		</div>
		<label
			v-if="label"
			:class="['pl-2 select-none', disabled ? '' : 'cursor-pointer']"
			:for="id"
		>
			{{ label }}
		</label>
	</div>
</template>
