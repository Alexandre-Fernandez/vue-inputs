type Emit = (event: any, ...args: any[]) => void

/**
 * Makes a function to update the specified v-model
 */
const useUpdateModel = function (emit: Emit, modelKey = "modelValue") {
	return (e: Event) => {
		emit("update:" + modelKey, (e.target as HTMLInputElement).value)
	}
}

export default useUpdateModel
