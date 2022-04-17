const useInputContainerStyle = (
	isDisabled: boolean,
	hasError: boolean,
	isFilled: boolean
) => {
	if (isDisabled) return "border-neutral-300 bg-neutral-0"
	if (hasError) return "border-danger-500 bg-white"
	if (isFilled) return "border-nav-black bg-white"
	return "border-neutral-300 bg-white"
}

export default useInputContainerStyle
