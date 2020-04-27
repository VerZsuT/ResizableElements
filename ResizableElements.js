class Resizable {
	static #cursorPosition = {x: 0, y: 0}

	static make(element, sides) {
		let shell = document.createElement('div')
		shell.style.width = '100%'
		shell.style.height = '100%'
		shell.style.position = 'relative'
		shell.innerHTML = element.innerHTML

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
			let styles = window.getComputedStyle(parent)
			this.#cursorPosition.x = event.pageX
			this.#cursorPosition.y = event.pageY
			parent.style.width = styles.width
			parent.style.height = styles.height
			document.addEventListener('mousemove', listener)
			document.addEventListener('mouseup', () => {
				document.removeEventListener('mousemove', listener)
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
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y) + 'px'
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
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y) + 'px'
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
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y) + 'px'
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
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y) + 'px'
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
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let topResizer = this.#createVerticalResizer(parent, onMouseMove)
		topResizer.style.top = 0


		return topResizer
	}

	static #createBottomResizer = (parent) => {
		let onMouseMove = (event) => {
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let bottomResizer = this.#createVerticalResizer(parent, onMouseMove)
		bottomResizer.style.bottom = 0


		return bottomResizer
	}

	static #createRightResizer = (parent) => {
		let onMouseMove = (event) => {
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let rightResizer = this.#createHorizontalResizer(parent, onMouseMove)
		rightResizer.style.right = 0

		return rightResizer
	}

	static #createLeftResizer = (parent) => {
		let onMouseMove = (event) => {
			let newCursorPosition = {x: event.pageX, y: event.pageY}
			event.stopPropagation()
			parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x) + 'px'
			this.#cursorPosition = newCursorPosition
		}
		let leftResizer = this.#createHorizontalResizer(parent, onMouseMove)
		leftResizer.style.left = 0


		return leftResizer
	}
}

window.onload = () => {
	let resizableElements = document.getElementsByClassName('resizable')
	let resizableOnlyElements = document.getElementsByClassName('resizableOnly')
	let resizableWithoutElements = document.getElementsByClassName('resizableWithout')
	let allSides = ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left']

	for (let element of resizableElements) {
		Resizable.make(element, allSides)
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
