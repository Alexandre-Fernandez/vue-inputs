type Emit = (event: any, ...args: any[]) => void

/**
 * @returns a function that can plug to @input to update the modelKey model
 */
const useInputUpdateModel = function (emit: Emit, modelKey = "modelValue") {
	return (e: Event) => {
		emit("update:" + modelKey, (e.target as HTMLInputElement).value)
	}
}

export default useInputUpdateModel
