import type { ListItem, ListItemProp } from "@/components/boxes/ListBox/types"
import { computed, Ref } from "vue"

export type UnformattedListItemProp = string | ListItem

/**
 * Formats a (string | ListItem)[] into a ListItemProps[]
 */
export const useListItemProps = (
	items: UnformattedListItemProp[],
	currentLabel: string
) => {
	return items.map((item): ListItemProp => {
		if (typeof item === "string") {
			return {
				label: item,
				data: item,
				isSelected: item === currentLabel,
			}
		}
		return {
			...item,
			isSelected: item.label === currentLabel,
		}
	})
}

export default useListItemProps
