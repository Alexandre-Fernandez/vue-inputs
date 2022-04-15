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

// bg-[#282828]
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
		}
	},
})
</script>

<template>
	<form class="bg-[#fff] px-6 py-20" v-if="isOpen">
		<TextInput
			class="input:my-[15px]"
			label="TextInput"
			placeholder="Placeholder..."
			v-model="textInputModel"
			required
			disabled
		>
			<template #icon><LetterIcon class="ml-0.5 mr-2" /></template>
		</TextInput>
		<SecretInput
			label="SecretInput"
			placeholder="Password..."
			class="input:my-[15px]"
			v-model="secretInputModel"
			required
		/>
		<SelectInput
			label="SelectInput"
			placeholder="Select something..."
			class="input:my-[15px]"
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
			class="input:my-[15px]"
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
			class="input:my-[15px]"
			v-model="phoneInputModel"
			:prefixes="prefixes"
			disabled
		/>
		<TextAreaInput
			class="input:my-3"
			label="TextAreaInput"
			placeholder="Placeholder..."
			v-model="textAreaInputModel"
		/>
		<CounterInput
			class="input:my-2.5"
			v-model="counterInputModel"
			:min-value="12"
		/>
		<CheckboxInput v-model="checkboxInputModel" label="CheckboxInput" />
	</form>
</template>

<style>
#app > form > * {
	margin-bottom: 2rem;
}
</style>
