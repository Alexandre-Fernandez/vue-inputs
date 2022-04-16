<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue"
import useUniqueId from "@/composables/useUniqueId"
import InputLabel from "./pieces/InputLabel.vue"
import InputContainer from "./pieces/InputContainer.vue"
import InputItem from "./pieces/InputItem.vue"
import props from "./props"
import ChevronDown from "../icons/ChevronDownIcon.vue"
import ListBox from "../boxes/ListBox/ListBox.vue"
import type { ListItemProp } from "../boxes/ListBox/types"

const digits = new Set("0123456789")

type PrefixItem = {
	label: string // country name
	value: string // phone prefix
	code: string // country abbreviation
}

type PrefixListItemData = {
	value: string
	code: string
}

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
		prefixes: {
			default: [],
			type: Array as PropType<PrefixItem[]>,
		},
		initialCode: {
			default: "FR",
			type: String,
		},
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const isOpen = ref(false)
		const currentPrefixItem = ref(
			((): PrefixItem => {
				const initialPrefix = props.prefixes.find(
					prefix => prefix.code === props.initialCode
				)
				if (!initialPrefix) throw "can't find initialCode in prefixes"
				emit("update:modelValue", initialPrefix.value)
				return initialPrefix
			})()
		)

		const listItemProps = computed(() =>
			props.prefixes.map(
				({ label, value, code }): ListItemProp<PrefixListItemData> => ({
					label,
					data: { value, code },
					isSelected: code === currentPrefixItem.value.code,
				})
			)
		)

		const handleItemSelect = (item: ListItemProp<PrefixListItemData>) => {
			if (!item.data) return
			currentPrefixItem.value = {
				label: item.label,
				code: item.data.code,
				value: item.data.value,
			}
			emit("update:modelValue", item.data.value)
			isOpen.value = false
		}

		const handleInputChange = (e: InputEvent) => {
			const input = e.target as HTMLInputElement
			const prefix = currentPrefixItem.value.value
			const cur = props.modelValue || ""
			if (
				e.inputType !== "deleteContentBackward" &&
				e.inputType !== "deleteContentForward"
			) {
				digits.has(e.data!) && emit("update:modelValue", cur + e.data)
			} else if (input.value.substring(0, prefix.length) === prefix) {
				emit("update:modelValue", input.value)
			} else {
				emit("update:modelValue", prefix)
			}
			input.value = cur
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
			currentPrefixItem,
			handleItemSelect,
			handleClickOutside,
			handleChevronClick,
			handleInputChange,
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
			:is-filled="
				(modelValue?.length || 0) > currentPrefixItem.value.length
			"
			:is-disabled="disabled"
		>
			<p class="pl-0.5">{{ currentPrefixItem.code }}</p>
			<button
				type="button"
				:class="[
					'self-stretch ml-2.5 mr-4',
					isOpen ? 'rotate-180' : 'translate-y-0.5',
				]"
				:disabled="disabled"
				@mousedown="handleChevronClick"
			>
				<ChevronDown />
			</button>
			<InputItem
				:class="[
					disabled
						? 'disabled:bg-neutral-0 disabled:text-secondary'
						: 'disabled:black',
				]"
				:placeholder="placeholder"
				:required="required"
				:id="id"
				:value="modelValue"
				:disabled="disabled"
				@input="(handleInputChange as any)"
			/>
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
