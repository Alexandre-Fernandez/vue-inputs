export interface ListItem<T = any> {
	label: string
	data?: T
}

export interface ListItemProp<T = any> extends ListItem<T> {
	isSelected?: boolean
}
