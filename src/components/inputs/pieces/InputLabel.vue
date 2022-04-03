<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	props: {
		required: Boolean,
	},
})
</script>

<template>
	<label class="inline-block pl-4 mb-[3px]">
		<slot></slot>
		<span v-if="required" class="text-danger-700"> * </span>
	</label>
</template>
