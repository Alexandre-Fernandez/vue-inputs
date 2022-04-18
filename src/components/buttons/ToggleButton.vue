<script lang="ts">
import { ButtonHTMLAttributes, defineComponent, PropType, ref } from "vue"

type ToggleStateProp = {
	class?: string
	text?: string
	type?: ButtonHTMLAttributes["type"]
}

export default defineComponent({
	props: {
		active: {
			default: { class: "" },
			type: Object as PropType<ToggleStateProp>,
		},
		inactive: {
			default: { class: "" },
			type: Object as PropType<ToggleStateProp>,
		},
	},
	emits: ["toggled-on", "toggled-off"],
	setup(props, { emit }) {
		const isActive = ref(false)
		const handleClick = (e: MouseEvent) => {
			isActive.value = !isActive.value
			if (isActive.value) emit("toggled-on", e)
			else emit("toggled-off", e)
		}

		return { isActive, handleClick }
	},
})
</script>

<template>
	<button
		:class="[isActive ? active.class : inactive.class]"
		:type="
			isActive /* for some reason submit & button behaviour is reversed */
				? inactive.type
				: active.type
		"
		@click="handleClick"
	>
		<slot v-if="isActive" name="active">{{ active.text }}</slot>
		<slot v-else name="inactive">{{ inactive.text }}</slot>
	</button>
</template>
