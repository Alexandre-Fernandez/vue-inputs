<script lang="ts">
import { defineComponent, ref } from "vue"
import Datepicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

export default defineComponent({
	components: { Datepicker },
	props: {
		placeholder: String,
	},
	setup() {
		const date = ref()

		return {
			date,
		}
	},
})
</script>

<template>
	<Datepicker
		v-model="date"
		:placeholder="placeholder ? placeholder : 'Date'"
		:style="
			placeholder
				? '--placeholder-color: #828282'
				: '--placeholder-color: rgba(0, 0, 0, 0)'
		"
	/>
</template>

<style>
/* root */
:root {
	--white: #fff;
	--neutral-0: #f9f9f9;
	--neutral-300: #d1d5db;
	--brand-primary: #502ebf;
	--brand-tertiary: #ff4b0e;
	--danger-500: #ef4444;
	--nav-black: #040c4e;
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

/* dp__menu */
.dp__menu {
	padding: 15px 18px;
	border-radius: 8px;
	box-shadow: 0px 2px 8px rgba(7, 25, 61, 0.2);
}

/*     Input */

/* dp__input */
.dp__input {
	padding-left: 42px;
	background-color: var(--white);
	border: 1px solid var(--neutral-300);
	border-radius: 40px;
	color: var(--primary-100);
}
.dp__input::placeholder {
	color: var(--placeholder-color);
	font-style: italic;
}
.dp__input.dp__pointer:not(:placeholder-shown) {
	border: 1px solid var(--nav-black);
}

.dp__input_icon {
	left: 4px;
}

/* dp__input_focus */
.dp__input_focus {
	border-color: var(--neutral-300);
	outline: 2px solid var(--brand-primary);
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
/*     Calendar */

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
</style>
