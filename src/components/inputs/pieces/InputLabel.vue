<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	props: {
		required: Boolean,
		isDisabled: Boolean,
	},
})
</script>

<template>
	<label
		:class="[
			'inline-block pl-4 mb-[3px] whitespace-nowrap',
			$attrs.for && !isDisabled ? 'cursor-pointer' : '',
		]"
	>
		<slot></slot>
		<span v-if="required" class="text-danger-700"> * </span>
	</label>
</template>
