<script lang="ts">
import { defineComponent } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import useInputUpdateModel from "@/composables/input/useInputUpdateModel"

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
	},
	props: {
		...props,
		modelValue: String,
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const updateModelValue = useInputUpdateModel(emit)

		return { id, updateModelValue }
	},
})
</script>

<template>
	<div>
		<InputLabel v-if="label" :required="required" :for="id">
			{{ label }}
		</InputLabel>
		<InputContainer class="rounded-button" :is-filled="!!modelValue">
			<slot name="icon"></slot>
			<InputItem
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				@input="updateModelValue"
			/>
		</InputContainer>
	</div>
</template>
