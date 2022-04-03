<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue"
import type { ListItem, ListItemProp } from "./types"

export default defineComponent({
	props: {
		listItems: {
			default: [],
			type: Array as PropType<ListItemProp[]>,
		},
		autofocus: {
			default: true,
			type: Boolean,
		},
	},
	emits: ["click-outside", "item-select"],
	setup(props, { emit }) {
		const htmlList = ref<HTMLUListElement>()

		onMounted(() => props.autofocus && htmlList.value?.focus())
		const handleFocusOut = () => emit("click-outside")
		const handleClick = (item: ListItem) => emit("item-select", item)

		return { htmlList, handleFocusOut, handleClick }
	},
})
</script>

<template>
	<ul
		class="bg-white px-1.5 py-3 rounded-lg"
		tabindex="0"
		ref="htmlList"
		@focusout="handleFocusOut"
	>
		<li
			v-for="item in listItems"
			:key="item.label"
			:class="[
				'cursor-pointer px-2 py-1.5 rounded',
				item.isSelected
					? 'text-brand-secondary bg-neutral-0'
					: 'hover:text-brand-secondary hover:bg-neutral-0',
			]"
			@click="() => handleClick(item)"
		>
			{{ item.label }}
		</li>
	</ul>
</template>
