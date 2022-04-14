<script lang="ts">
import { defineComponent, PropType } from "vue"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon.vue"

export default defineComponent({
	components: { InfoCircleIcon },
	props: {
		errors: {
			default: [],
			type: Array as PropType<string[]>,
		},
	},
})
</script>

<template>
	<div class="text-danger-500">
		<div
			v-for="(error, i) in errors"
			class="flex items-center gap-1 mb-1"
			:key="i"
		>
			<InfoCircleIcon class="min-w-4 min-h-4 max-w-4 max-h-4" />
			<p class="text-sm">{{ error }}</p>
		</div>
	</div>
</template>
