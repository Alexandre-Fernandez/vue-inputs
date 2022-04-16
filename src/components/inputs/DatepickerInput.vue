<script lang="ts">
import { defineComponent, PropType, ref } from "vue"
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import InputLabel from "./pieces/InputLabel.vue"
import props from "./props"
import useUniqueId from "@/composables/useUniqueId"
import InputErrors from "./pieces/InputErrors.vue"
import DumbInputContainer from "./pieces/DumbInputContainer.vue"

export type SingleDatePicker = null | Date | string
export type MultiDatePicker = null | Date[] | string[]
export type RangePicker = null | [Date, Date] | [string | string]
export type MonthRangePicker =
	| null
	| {
			month: number | string
			year: number | string
	  }[]
export type TimeRangePicker =
	| null
	| {
			hours: number | string
			minutes: number | string
			seconds?: number | string
	  }[]
export type MonthPicker = null | {
	month: number | string
	year: number | string
}
export type WeekPicker = null | [Date, Date] | [string, string]
export type TimePicker = null | {
	hours: number | string
	minutes: number | string
	seconds?: number | string
}

type DatePicker =
	| SingleDatePicker
	| MultiDatePicker
	| MonthPicker
	| WeekPicker
	| TimePicker
	| RangePicker
	| MonthRangePicker
	| TimeRangePicker
export default defineComponent({
	components: {
		Datepicker,
		InputLabel,
		InputErrors,
		DumbInputContainer,
	},
	props: {
		...props,
		modelValue: {
			default: null,
			type: Object as PropType<DatePicker>,
		},
		errors: {
			default: [],
			type: Array as PropType<string[]>,
		},
	},
	setup(props, { emit }) {
		const id = useUniqueId()
		const isOpen = ref(false)
		const handleChange = (value: any) => emit("update:modelValue", value)

		return {
			id,
			handleChange,
			isOpen,
		}
	},
})
</script>

<template>
	<div>
		<InputLabel
			v-if="label"
			:required="required"
			:for="`dp-input-${id}`"
			:is-disabled="disabled"
		>
			{{ label }}
		</InputLabel>
		<DumbInputContainer
			class="rounded-button"
			:is-focused="isOpen"
			:is-filled="!!modelValue"
			:is-disabled="disabled"
		>
			<slot name="icon"></slot>
			<Datepicker
				v-bind="$attrs"
				:uid="id"
				:modelValue="modelValue"
				:required="required"
				:disabled="disabled"
				:placeholder="placeholder"
				@update:model-value="handleChange"
				@open="() => (isOpen = true)"
				@closed="() => (isOpen = false)"
			/>
		</DumbInputContainer>
		<InputErrors
			v-if="!disabled && errors.length > 0"
			class="pl-4 pt-2"
			:errors="errors"
		/>
	</div>
</template>

<style>
/* General */

/* root */
:root {
	--white: #fff;
	--neutral-0: #f9f9f9;
	--neutral-300: #d1d5db;
	--brand-tertiary: #ff4b0e;
	--danger-500: #ef4444;
	--primary-100: #040c4e;
	--secondary: #828282;
	--success-500: #22c55e;
	--success-700: #15803d;
}

/* dp__theme */
.dp__theme_light,
.dp__theme_dark {
	--dp-background-color: var(--white);
	--dp-text-color: var(--primary-100);
	--dp-hover-color: var(--neutral-0);
	--dp-hover-text-color: var(--primary-100);
	--dp-hover-icon-color: var(--primary-100);
	--dp-primary-color: var(--brand-tertiary);
	--dp-primary-disabled-color: var(--white);
	--dp-primary-text-color: var(--white);
	--dp-secondary-color: var(--secondary);
	--dp-border-color: var(--neutral-300);
	--dp-menu-border-color: rgba(0, 0, 0, 0);
	--dp-border-color-hover: var(--neutral-300);
	--dp-disabled-color: var(--neutral-300);
	--dp-scroll-bar-background: var(--neutral-0);
	--dp-scroll-bar-color: var(--neutral-300);
	--dp-success-color: var(--success-500);
	--dp-success-color-disabled: var(--success-700);
	--dp-icon-color: var(--primary-100);
	--dp-danger-color: var(--danger-500);
	--dp-marker-color: var(--danger-500);
	--dp-tooltip-color: var(--neutral-0);
	--dp-disabled-color-text: var(--neutral-300);
}
/*     Input */

/* dp__main */
.dp__main {
	width: 100%;
}

/* dp__input */
.dp__input {
	border-radius: 0;
	border: none;
	padding: 0;
}
.dp__input::placeholder {
	color: var(--secondary);
	font-style: italic;
	opacity: 1 !important;
}
.dp__input:disabled {
	background-color: var(--neutral-0);
	color: var(--secondary);
}

/* dp__input_icon */
.dp__input_icon {
	display: none;
}
.dp__input_icon_pad {
	padding-left: 0;
}
/*     Calendar */

/* dp__menu */
.dp__menu {
	padding: 15px 18px;
	border-radius: 8px;
	box-shadow: 0px 2px 8px rgba(7, 25, 61, 0.2);
}

/* dp__calendar_header_separator */
.dp__calendar_header_separator {
	display: none;
}

/* dp__active_date */
.dp__active_date {
	border-radius: 50%;
}

/* dp__date_hover */
.dp__date_hover {
	border-radius: 50%;
}

/* dp__today */
.dp__today {
	background-color: var(--neutral-0);
	border: 0;
	font-weight: 700;
	border-radius: 50%;
}
.dp__today.dp__active_date {
	background-color: var(--brand-tertiary);
	border: 0;
}
/*     Buttons */

/* dp__action_row */
.dp__action_row {
	padding-top: 2px;
	flex-direction: column;
}

/* dp__selection_preview */
.dp__selection_preview {
	width: fit-content;
	margin-bottom: 8px;
}

/* dp__action_buttons */
.dp__action_buttons {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 8px;
}

/* dp__action */
.dp__action {
	font-weight: normal;
	padding: 8px 32px;
	border-radius: 40px;
}

/* dp__select */
.dp__select {
	background-color: var(--primary-100);
	color: var(--white);
}

/* dp__cancel */
.dp__cancel {
	color: var(--primary-100);
	border: 1px solid var(--primary-100);
}
</style>
