<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import ListBox from "../boxes/ListBox/ListBox.vue"
import type { ListItemProp } from "../boxes/ListBox/types"
import LoadingSpinnerIcon from "../icons/LoadingSpinnerIcon.vue"
import useListItemProps, {
	UnformattedListItemProp,
} from "@/composables/input/useListItemProps"

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
		ListBox,
		LoadingSpinnerIcon,
	},
	props: {
		...props,
		modelValue: String,
		itemData: undefined as unknown as PropType<any>, // v-model:itemData
		isLoading: Boolean,
		items: {
			default: [],
			type: Array as PropType<UnformattedListItemProp[]>,
		},
	},
	setup(props, { emit }) {
		const htmlInputContainer = ref<HTMLDivElement>()
		const id = useUniqueId()
		const isOpen = ref(false)

		const listItemProps: ComputedRef<ListItemProp<any>[]> = computed(() =>
			useListItemProps(props.items, props.modelValue || "")
		)

		const handleInputValueChange = (e: Event) => {
			if (props.disabled) return
			const value = (e.target as HTMLInputElement).value
			if (value && props.items?.length > 0) isOpen.value = true
			else isOpen.value = false
			emit("update:modelValue", value ?? "")
			emit(
				"update:itemData",
				listItemProps.value.find(item => item.label === value)?.data
			)
		}
		const handleEnterDown = () => {
			isOpen.value = false
			emit("update:modelValue", listItemProps.value?.[0].label)
			emit("update:itemData", listItemProps.value?.[0].data)
		}
		const closeList = () => (isOpen.value = false)
		const handleItemSelect = (item: ListItemProp) => {
			isOpen.value = false
			emit("update:modelValue", item.label)
			emit("update:itemData", item.data)
		}

		return {
			id,
			isOpen,
			listItemProps,
			closeList,
			handleItemSelect,
			handleInputValueChange,
			handleEnterDown,
			htmlInputContainer,
		}
	},
})
</script>

<template>
	<div class="relative">
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
			:is-filled="!!itemData || itemData === 0"
			:is-disabled="disabled"
			ref="htmlInputContainer"
			@focusout="closeList"
		>
			<slot name="icon"></slot>
			<InputItem
				class="disabled:bg-neutral-0 disabled:text-secondary"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				:disabled="disabled"
				@keydown.enter="handleEnterDown"
				@input="handleInputValueChange"
			/>
			<LoadingSpinnerIcon v-if="isLoading" class="text-primary-100" />
			<ListBox
				v-if="isOpen"
				class="absolute top-full mt-2 w-full z-10 max-h-48 overflow-auto"
				:list-items="listItemProps"
				:autofocus="false"
				@item-select="handleItemSelect"
				@click-outside="closeList"
			/>
		</InputContainer>
	</div>
</template>
