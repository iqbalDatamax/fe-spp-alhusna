// based on https://www.freecodecamp.org/news/javascript-debounce-example/
let timer = null
export function debounce(functional, timeout = 300) {
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			functional.apply(this, args)
		}, timeout)
	}
}

export function randomString() {
	return Math.random().toString(36).substring(7)
}