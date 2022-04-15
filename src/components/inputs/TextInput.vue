<script lang="ts">
import { defineComponent, PropType } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import useUpdateModel from "@/composables/input/useUpdateModel"
import InputErrors from "./pieces/InputErrors.vue"

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
		errors: {
			default: [],
			type: Array as PropType<string[]>,
		},
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const updateModelValue = useUpdateModel(emit)

		return { id, updateModelValue }
	},
})
</script>

<template>
	<div>
		<InputLabel v-if="label" :required="required" :for="id">
			{{ label }}
		</InputLabel>
		<InputContainer
			class="rounded-button"
			:is-filled="!!modelValue"
			:is-disabled="disabled"
		>
			<slot name="icon"></slot>
			<InputItem
				class="disabled:bg-neutral-0 disabled:text-secondary"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				:disabled="disabled"
				@input="updateModelValue"
			/>
		</InputContainer>
		<InputErrors
			v-if="!disabled && errors.length > 0"
			class="pl-4 pt-2"
			:errors="errors"
		/>
	</div>
</template>
