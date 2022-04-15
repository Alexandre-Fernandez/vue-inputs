<script lang="ts">
import { defineComponent, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import EyeIcon from "../icons/EyeIcon.vue"
import StruckoutEyeIcon from "../icons/StruckoutEyeIcon.vue"
import useUpdateModel from "@/composables/input/useUpdateModel"

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
		EyeIcon,
		StruckoutEyeIcon,
	},
	props: {
		...props,
		modelValue: String,
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const isTextVisible = ref(false)
		const updateModelValue = useUpdateModel(emit)

		return { id, isTextVisible, updateModelValue }
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
			<InputItem
				class="disabled:bg-neutral-0 disabled:text-secondary"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:type="isTextVisible ? 'text' : 'password'"
				:value="modelValue"
				:disabled="disabled"
				@input="updateModelValue"
			/>
			<button
				type="button"
				@click="() => (isTextVisible = !isTextVisible)"
			>
				<slot v-if="!isTextVisible" name="iconInvisible">
					<EyeIcon class="mr-0.5" />
				</slot>
				<slot v-else name="iconVisible">
					<StruckoutEyeIcon class="mr-0.5" />
				</slot>
			</button>
		</InputContainer>
	</div>
</template>
