<script lang="ts">
import { defineComponent, PropType } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import InputErrors from "./pieces/InputErrors.vue"

type Predicate = (nextValue: string) => boolean

const digits = new Set("0123456789")

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
		InputErrors,
	},
	props: {
		...props,
		modelValue: String,
		unit: String,
		errors: {
			default: [],
			type: Array as PropType<string[]>,
		},
		type: {
			default: "decimal",
			type: String as PropType<"decimal" | "numeric">,
		},
		predicate: {
			default: () => true,
			type: Function as PropType<Predicate>,
		},
	},
	setup(props, { emit }) {
		if (props.type === "decimal") digits.add(".").add(",")
		const id = useUniqueId()

		const handleInputChange = (e: InputEvent) => {
			const input = e.target as HTMLInputElement
			const cur = props.modelValue || ""
			if (
				e.inputType !== "deleteContentBackward" &&
				e.inputType !== "deleteContentForward" &&
				e.data
			) {
				const isCurDecimal = cur.includes(".")
				let textToAdd = ""
				for (let i = 0; i < e.data.length; i++) {
					let char = e.data[i]
					if (!digits.has(char)) {
						textToAdd = ""
						break
					}
					if (char === ",") char = "."
					if (char !== ".") textToAdd += char
					else if (!isCurDecimal && !textToAdd.includes(".")) {
						textToAdd += char
					}
				}
				const nextValue = cur + textToAdd
				if (props.predicate(nextValue)) {
					emit("update:modelValue", nextValue)
				}
			} else {
				emit("update:modelValue", input.value)
			}
			input.value = cur
		}

		return { id, handleInputChange }
	},
})
</script>

<template>
	<div>
		<InputLabel
			v-if="label"
			:required="required"
			:for="id"
			:is-disabled="disabled"
		>
			{{ label }}
		</InputLabel>
		<InputContainer
			class="rounded-button"
			:is-filled="!!modelValue"
			:is-disabled="disabled"
		>
			<InputItem
				class="disabled:bg-neutral-0 disabled:text-secondary"
				:inputmode="type"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				:disabled="disabled"
				@input="(handleInputChange as any)"
			/>
			<p v-if="unit" class="inline-block select-none">{{ unit }}</p>
		</InputContainer>
		<InputErrors
			v-if="!disabled && errors.length > 0"
			class="pl-4 pt-2"
			:errors="errors"
		/>
	</div>
</template>
