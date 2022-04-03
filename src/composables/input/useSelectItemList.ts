import type { ListItem, ListItemProp } from "@/components/boxes/ListBox/types"
import { computed, ref } from "vue"

export type SelectItem = string | ListItem

/**
 * @returns a ListBox compatible computed list of items and a ref used for
 * the input value and updates the parent model with its associated data
 */
const useSelectItemList = (
	items: SelectItem[],
	initialItem: SelectItem,
	updateCallback: (data: SelectItem) => void
) => {
	// Helper:
	function getLabelandUpdate(item: SelectItem) {
		if (typeof item === "string") {
			updateCallback(item)
			return item
		}
		updateCallback(item.data)
		return item.label
	}

	const label = ref(getLabelandUpdate(initialItem))
	const listItemProps = computed(() =>
		items.map((item): ListItemProp => {
			if (typeof item === "string") {
				return {
					label: item,
					data: item,
					isSelected: item === label.value,
				}
			}
			return {
				...item,
				isSelected: item.label === label.value,
			}
		})
	)
	return { label, listItemProps }
}

export default useSelectItemList
