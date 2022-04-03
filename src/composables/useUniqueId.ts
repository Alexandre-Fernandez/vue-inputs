const counters = [-9007199254740991]

const useUniqueId = () => {
	const id = counters
		.map((counter, i) => {
			if (counter < 9007199254740991) {
				return counter.toString().replace("-", "0")
			}
			if (i + 1 < counters.length) counters[i + 1]++
			return (counters[i] *= -1).toString().replace("-", "0")
		})
		.join("")
	counters[0]++
	return id + Date.now().toString()
}

export default useUniqueId
