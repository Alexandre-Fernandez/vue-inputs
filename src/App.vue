<script lang="ts">
import { defineComponent, ref } from "vue"
import TextInput from "./components/inputs/TextInput.vue"
import SecretInput from "./components/inputs/SecretInput.vue"
import LetterIcon from "./components/icons/LetterIcon.vue"
import SelectInput from "./components/inputs/SelectInput.vue"
import ListBox from "./components/boxes/ListBox/ListBox.vue"
import AutocompleteInput from "./components/inputs/AutocompleteInput.vue"
import SearchIcon from "./components/icons/SearchIcon.vue"
import PhoneInput from "./components/inputs/PhoneInput.vue"
import prefixes from "./assets/prefixes.json"
import TextAreaInput from "./components/inputs/TextAreaInput.vue"
import CounterInput from "./components/inputs/CounterInput.vue"
import CheckboxInput from "./components/inputs/CheckboxInput.vue"
import DatepickerInput from "./components/inputs/DatepickerInput.vue"
import NumberInput from "./components/inputs/NumberInput.vue"
import ToggleButton from "./components/buttons/ToggleButton.vue"

export default defineComponent({
	components: {
		TextInput,
		SecretInput,
		LetterIcon,
		SelectInput,
		ListBox,
		AutocompleteInput,
		SearchIcon,
		PhoneInput,
		TextAreaInput,
		CounterInput,
		CheckboxInput,
		DatepickerInput,
		NumberInput,
		ToggleButton,
	},
	setup() {
		const isOpen = ref(true)
		const textInputModel = ref("")
		const secretInputModel = ref("")
		const selectInputModel = ref({
			label: "",
			value: "" as any,
		})
		const autocompleteInputModel = ref({
			label: "",
			value: "" as any,
		})
		const phoneInputModel = ref("")
		const textAreaInputModel = ref("")
		const counterInputModel = ref("")
		const checkboxInputModel = ref(false)
		const datepickerInputModel = ref(null)
		const numberInputModel = ref("")

		return {
			isOpen,
			textInputModel,
			secretInputModel,
			selectInputModel,
			autocompleteInputModel,
			phoneInputModel,
			prefixes,
			textAreaInputModel,
			counterInputModel,
			checkboxInputModel,
			datepickerInputModel,
			numberInputModel,
		}
	},
})
</script>

<template>
	<form class="bg-white px-6 py-20" v-if="isOpen">
		<TextInput
			class="input-base"
			label="TextInput"
			placeholder="Placeholder..."
			v-model="textInputModel"
		>
			<template #icon><LetterIcon class="ml-0.5 mr-2" /></template>
		</TextInput>
		<SecretInput
			label="SecretInput"
			placeholder="Password..."
			class="input-base"
			v-model="secretInputModel"
		/>
		<SelectInput
			label="SelectInput"
			placeholder="Select something..."
			class="input-base"
			v-model="selectInputModel.label"
			v-model:itemData="selectInputModel.value"
			:items="[
				'a',
				{ label: 'b', data: ['array'] },
				{ label: 'c', data: null },
			]"
		/>
		<AutocompleteInput
			label="AutocompleteInput"
			placeholder="Type something..."
			class="input-base"
			v-model="autocompleteInputModel.label"
			v-model:itemData="autocompleteInputModel.value"
			:items="[
				'abc',
				{ label: 'def', data: ['array'] },
				{ label: 'ghi', data: null },
			]"
		>
			<template #icon>
				<SearchIcon class="ml-0.5 mr-2.5 scale-[1.15]" />
			</template>
		</AutocompleteInput>
		<PhoneInput
			label="PhoneInput"
			placeholder="Placeholder..."
			class="input-base"
			v-model="phoneInputModel"
			:prefixes="prefixes"
		/>
		<TextAreaInput
			label="TextAreaInput"
			placeholder="Placeholder..."
			v-model="textAreaInputModel"
			required
		/>
		<CounterInput
			class="input-base"
			v-model="counterInputModel"
			:min-value="12"
		/>
		<CheckboxInput v-model="checkboxInputModel" label="CheckboxInput" />
		<DatepickerInput
			class="input-base"
			label="DatepickerInput"
			placeholder="Placeholder..."
			v-model="datepickerInputModel"
		/>
		<NumberInput
			class="input-base"
			label="NumberInput"
			placeholder="Placeholder..."
			v-model="numberInputModel"
			unit="%"
		/>
		<ToggleButton
			class="block"
			:active="{ class: 'btn-outline-gradient-base' }"
			:inactive="{ class: 'btn-base btn-solid-blue', text: 'inactive' }"
			type="button"
		>
			<template #active><span>active</span></template>
		</ToggleButton>
	</form>
</template>

<style>
#app > form > * {
	margin-bottom: 2rem;
}
</style>
