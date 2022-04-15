<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import ChevronDown from "../icons/ChevronDownIcon.vue"
import ListBox from "../boxes/ListBox/ListBox.vue"
import useListItemProps, {
	UnformattedListItemProp,
} from "@/composables/input/useListItemProps"
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
		modelValue: String,
		itemData: undefined as unknown as PropType<any>, // v-model:itemData
		items: {
			default: [],
			type: Array as PropType<UnformattedListItemProp[]>,
		},
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const isOpen = ref(false)

		const listItemProps = computed(() =>
			useListItemProps(props.items, props.modelValue || "")
		)

		const handleItemSelect = (item: ListItemProp) => {
			isOpen.value = false
			emit("update:modelValue", item.label)
			emit("update:itemData", item.data)
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
			:is-filled="!!itemData || itemData === 0"
			:is-disabled="disabled"
		>
			<InputItem
				:class="[
					disabled
						? 'disabled:bg-neutral-0 disabled:text-secondary'
						: 'disabled:bg-white',
				]"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				disabled
			/>
			<button
				type="button"
				:class="[
					'self-stretch',
					isOpen ? 'rotate-180' : 'translate-y-0.5',
				]"
				:disabled="disabled"
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
