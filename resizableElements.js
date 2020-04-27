class Resizable {
	static #cursorPosition = {x: 0, y: 0}

	static make(element, sides=['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left']) {
		let shell = document.createElement('div')
		let styles = window.getComputedStyle(element)

		shell.style.padding = styles.padding
		shell.style.paddingTop = styles.paddingTop
		shell.style.paddingRight = styles.paddingRight
		shell.style.paddingLeft = styles.paddingLeft
		shell.style.paddingBottom = styles.paddingBottom
		shell.style.width = styles.width
		shell.style.height = styles.height
		shell.style.position = 'relative'
		shell.innerHTML = element.innerHTML

		element.style.width = parseInt(styles.width) + parseInt(styles.paddingLeft) + parseInt(styles.paddingRight) + 'px'
		element.style.height = parseInt(styles.height) + parseInt(styles.paddingTop) + parseInt(styles.paddingBottom) + 'px'

		for (let side of sides) {
			switch (side) {
				case 'topLeft':
					shell.appendChild(this.#createTopLeftResizer(element))
					break
				case 'topRight':
					shell.appendChild(this.#createTopRightResizer(element))
					break
				case 'bottomLeft':
					shell.appendChild(this.#createBottomLeftResizer(element))
					break
				case 'bottomRight':
					shell.appendChild(this.#createBottomRightResizer(element))
					break
				case 'top':
					shell.appendChild(this.#createTopResizer(element))
					break
				case 'right':
					shell.appendChild(this.#createRightResizer(element))
					break
				case 'bottom':
					shell.appendChild(this.#createBottomResizer(element))
					break
				case 'left':
					shell.appendChild(this.#createLeftResizer(element))
					break
			}
		}					

		element.style.padding = 0
		element.innerHTML = ''
		element.appendChild(shell)
	}

	static #createResizer = (parent, listener) => {
		let resizer = document.createElement('button')

		resizer.style.position = 'absolute'
		resizer.style.background = 'none'
		resizer.style.border = 'none'
		resizer.style.outline = 'none'
		resizer.style.padding = 0
		resizer.style.margin = 0
		resizer.style.zIndex = 1

		resizer.onmousedown = (event) => {
			let shell = resizer.parentElement
			let styles = window.getComputedStyle(parent)
			let callback = (event) => {
				listener(event)
				let horizontalPaddings = parseInt(shell.style.paddingLeft) + parseInt(shell.style.paddingRight)
				let verticalPaddings = parseInt(shell.style.paddingTop) + parseInt(shell.style.paddingBottom)
				let minWidth = parseInt(styles.minWidth) - horizontalPaddings
				let maxWidth = parseInt(styles.maxWidth) - horizontalPaddings
				let newWidth = parseInt(parent.style.width) - horizontalPaddings
				let minHeight = parseInt(styles.minHeight) - verticalPaddings
				let maxHeight = parseInt(styles.maxHeight) - verticalPaddings
				let newHeight = parseInt(parent.style.height) - verticalPaddings
				shell.style.width = this.#limiter(minWidth, maxWidth || Infinity, newWidth) + 'px'
				shell.style.height = this.#limiter(minHeight, maxHeight || Infinity, newHeight) + 'px'
			}
			this.#cursorPosition.x = event.pageX
			this.#cursorPosition.y = event.pageY
			document.addEventListener('mousemove', callback)
			document.addEventListener('mouseup', () => {
				document.removeEventListener('mousemove', callback)
			})
		}

		return resizer
	}

	static #createHorizontalResizer = (parent, listener) => {
		let horizontalResizer = this.#createResizer(parent, listener)

		horizontalResizer.style.width = '7px'
		horizontalResizer.style.height = '100%'
		horizontalResizer.style.top = 0
		horizontalResizer.style.cursor = 'e-resize'

		return horizontalResizer
	}

	static #createVerticalResizer = (parent, listener) => {
		let verticalResizer = this.#createResizer(parent, listener)

		verticalResizer.style.width = '100%'
		verticalResizer.style.height = '7px'
		verticalResizer.style.left = 0
		verticalResizer.style.cursor = 'n-resize'

		return verticalResizer
	}

	static #createAngleResizer = (parent, listener) => {
		let angleResizer = this.#createResizer(parent, listener)

		angleResizer.style.width = '10px'
		angleResizer.style.height = '10px'
		angleResizer.style.zIndex = 2

		return angleResizer
	}

	static #createTopLeftResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newWidth = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x)
			let newHeight = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let topLeftResizer = this.#createAngleResizer(parent, onMouseMove)
		topLeftResizer.style.top = 0
		topLeftResizer.style.left = 0
		topLeftResizer.style.cursor = 'se-resize'

		return topLeftResizer
	}

	static #createBottomLeftResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newWidth = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x)
			let newHeight = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let bottomLeftResizer = this.#createAngleResizer(parent, onMouseMove)
		bottomLeftResizer.style.bottom = 0
		bottomLeftResizer.style.left = 0
		bottomLeftResizer.style.cursor = 'ne-resize'

		return bottomLeftResizer
	}

	static #createTopRightResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newWidth = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x)
			let newHeight = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let topRightResizer = this.#createAngleResizer(parent, onMouseMove)
		topRightResizer.style.top = 0
		topRightResizer.style.right = 0
		topRightResizer.style.cursor = 'ne-resize'

		return topRightResizer
	}

	static #createBottomRightResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newWidth = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x)
			let newHeight = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let bottomRightResizer = this.#createAngleResizer(parent, onMouseMove)
		bottomRightResizer.style.bottom = 0
		bottomRightResizer.style.right = 0
		bottomRightResizer.style.cursor = 'se-resize'

		return bottomRightResizer
	}

	static #createTopResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newHeight = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let topResizer = this.#createVerticalResizer(parent, onMouseMove)
		topResizer.style.top = 0


		return topResizer
	}

	static #createBottomResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newHeight = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y)
			parent.style.height = this.#limiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newHeight) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let bottomResizer = this.#createVerticalResizer(parent, onMouseMove)
		bottomResizer.style.bottom = 0


		return bottomResizer
	}

	static #createRightResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let styles = window.getComputedStyle(parent)
			let newWidth = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let rightResizer = this.#createHorizontalResizer(parent, onMouseMove)
		rightResizer.style.right = 0

		return rightResizer
	}

	static #createLeftResizer = (parent) => {
		let onMouseMove = (event) => {
			event.stopPropagation()
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			let newWidth = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x)
			parent.style.width = this.#limiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newWidth) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let leftResizer = this.#createHorizontalResizer(parent, onMouseMove)
		leftResizer.style.left = 0


		return leftResizer
	}

	static #limiter = (min, max, number) => {
		return Math.min(Math.max(min, number), max)
	}
}

window.onload = () => {
	let resizableElements = document.getElementsByClassName('resizable')
	let resizableOnlyElements = document.getElementsByClassName('resizableOnly')
	let resizableWithoutElements = document.getElementsByClassName('resizableWithout')
	let allSides = ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left']

	for (let element of resizableElements) {
		Resizable.make(element)
	}

	for (let element of resizableOnlyElements) {
		for (let className of element.classList) {
			let params = className.split('-')
			let name = params[0]
			if (name == 'sides') {
				let sides = params.slice(1)
				Resizable.make(element, sides)
			}
		}
	}

	for (let element of resizableWithoutElements) {
		for (let className of element.classList) {
			let params = className.split('-')
			let name = params[0]
			if (name == 'sides') {
				let withoutSides = params.slice(1)
				let sides = allSides
				for (let side of withoutSides) {
					sides.splice(sides.indexOf(side), 1)
				}
				Resizable.make(element, sides)
			}
		}
	}
}