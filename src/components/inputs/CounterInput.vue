<script lang="ts">
import { computed, defineComponent } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"

function countIntegerDigits(n: number) {
	let number = n >= 0 ? n : n * -1
	let count = 1
	while (number >= 10) {
		number *= 0.1
		count++
	}
	return count
}
// bg-primary-100 text-white
const buttonClass = `
	[--size:18px] rounded-button flex items-center justify-center 
	min-w-[var(--size)] max-w-[var(--size)] min-h-[var(--size)] 
	max-h-[var(--size)]
`

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
	},
	props: {
		modelValue: String,
		minValue: Number,
	},
	setup(props, { emit }) {
		if (
			props.modelValue == null ||
			isNaN(parseInt(props.modelValue)) ||
			(props.minValue && getParsedModelValue() < props.minValue)
		) {
			emit("update:modelValue", props.minValue?.toString() || "0")
		}
		const id = useUniqueId()
		const digits = computed(() => {
			const parsedModelValue = getParsedModelValue()
			if (parsedModelValue < 0) {
				return (countIntegerDigits(parsedModelValue) + 1).toString()
			}
			return countIntegerDigits(parsedModelValue).toString()
		})
		const isMinValue = computed(() => {
			if (props.minValue == null) return false
			return getParsedModelValue() <= props.minValue
		})

		const handleCount = (value: number) => {
			emit(
				"update:modelValue",
				(getParsedModelValue() + value).toString()
			)
		}

		function getParsedModelValue() {
			return parseInt(props.modelValue || "0")
		}

		return { id, digits, buttonClass, isMinValue, handleCount }
	},
})
</script>

<template>
	<div class="flex items-center gap-2">
		<button
			:class="[
				buttonClass,
				isMinValue
					? 'bg-neutral-400 text-white'
					: 'bg-primary-100 text-white',
			]"
			:disabled="isMinValue"
			type="button"
			@click="() => handleCount(-1)"
		>
			-
		</button>
		<InputContainer class="rounded-button w-min">
			<InputItem
				class="disabled:bg-white"
				:style="`width:${digits}ch`"
				:id="id"
				:value="modelValue"
				disabled
			/>
		</InputContainer>
		<button
			:class="[buttonClass, 'bg-primary-100 text-white']"
			type="button"
			@click="() => handleCount(1)"
		>
			+
		</button>
	</div>
</template>
