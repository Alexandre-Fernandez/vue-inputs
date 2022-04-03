<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import ChevronDown from "../icons/ChevronDownIcon.vue"
import ListBox from "../boxes/ListBox/ListBox.vue"
import useSelectItemList, {
	type SelectItem,
} from "@/composables/input/useSelectItemList"
import type { ListItemProp } from "../boxes/ListBox/types"

export default defineComponent({
	components: {
		InputLabel,
		InputContainer,
		InputItem,
		ChevronDown,
		ListBox,
	},
	props: {
		...props,
		items: {
			default: [],
			type: Array as PropType<SelectItem[]>,
		},
		data: undefined as unknown as PropType<any>, // v-model:data
		initialItemIndex: Number,
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const isOpen = ref(false)

		const { label: inputValue, listItemProps } = useSelectItemList(
			props.items,
			props.initialItemIndex != null
				? props.items?.[props.initialItemIndex] || ""
				: "",
			data => emit("update:data", data)
		)

		const handleItemSelect = (item: ListItemProp) => {
			isOpen.value = false
			inputValue.value = item.label
			emit("update:data", item.data)
		}

		const handleClickOutside = () => (isOpen.value = false)
		const handleChevronClick = () => {
			// NOTE delayed opening to avoid triggering ListBox's click outside:
			if (!isOpen.value) {
				setTimeout(() => {
					isOpen.value = true
				}, 1)
			}
		}

		return {
			id,
			isOpen,
			inputValue,
			listItemProps,
			handleItemSelect,
			handleClickOutside,
			handleChevronClick,
		}
	},
})
</script>

<template>
	<div class="relative">
		<InputLabel v-if="label" :required="required" :for="id">
			{{ label }}
		</InputLabel>
		<InputContainer
			class="rounded-button"
			:is-filled="!!data || data === 0"
		>
			<InputItem
				class="disabled:bg-white"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="inputValue"
				disabled
			/>
			<button
				type="button"
				:class="[
					'self-stretch',
					isOpen ? 'rotate-180' : 'translate-y-0.5',
				]"
				@mousedown="handleChevronClick"
			>
				<ChevronDown />
			</button>
			<ListBox
				v-if="isOpen"
				class="absolute top-full mt-2 w-full z-10 max-h-48 overflow-auto"
				:list-items="listItemProps"
				@item-select="handleItemSelect"
				@click-outside="handleClickOutside"
			/>
		</InputContainer>
	</div>
</template>
