class Resizable {
	static #cursorPosition = {x: 0, y: 0}
	static #inLimitWidth = true
	static #inLimitHeight = true

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
			let resizer = null
			switch (side) {
				case 'topLeft':
					resizer = this.#createResizer(element, 'angle', ['top', 'left'], 'se-resize')
					break
				case 'topRight':
					resizer = this.#createResizer(element, 'angle', ['top', 'right'], 'ne-resize')
					break
				case 'bottomLeft':
					resizer = this.#createResizer(element, 'angle', ['bottom', 'left'], 'ne-resize')
					break
				case 'bottomRight':
					resizer = this.#createResizer(element, 'angle', ['bottom', 'right'], 'se-resize')
					break
				case 'top':
					resizer = this.#createResizer(element, 'vertical', ['top'])
					break
				case 'bottom':
					resizer = this.#createResizer(element, 'vertical', ['bottom'])
					break
				case 'left':
					resizer = this.#createResizer(element, 'horizontal', ['left'])
					break
				case 'right':
					resizer = this.#createResizer(element, 'horizontal', ['right'])
					break
			}
			shell.appendChild(resizer)
		}					

		element.style.padding = 0
		element.innerHTML = ''
		element.appendChild(shell)
	}

	static #createResizer = (parent, type, sides, cursor=null) => {
		let resizer = document.createElement('button')

		resizer.style.position = 'absolute'
		resizer.style.background = 'none'
		resizer.style.border = 'none'
		resizer.style.outline = 'none'
		resizer.style.padding = 0
		resizer.style.margin = 0
		resizer.style.zIndex = 1
		if (cursor) resizer.style.cursor = cursor

		if (type == 'horizontal') {
			resizer.style.width = '7px'
			resizer.style.height = '100%'
			resizer.style.top = 0
			resizer.style.cursor = 'e-resize'
		} else if (type == 'vertical') {
			resizer.style.width = '100%'
			resizer.style.height = '7px'
			resizer.style.left = 0
			resizer.style.cursor = 'n-resize'
		} else if (type == 'angle') {
			resizer.style.width = '10px'
			resizer.style.height = '10px'
			resizer.style.zIndex = 2
		}

		for (let side of sides) {
			switch (side) {
				case 'left':
					resizer.style.left = 0
					break
				case 'right':
					resizer.style.right = 0
					break
				case 'top':
					resizer.style.top = 0
					break
				case 'bottom': 
					resizer.style.bottom = 0
					break
			}
		}

		let onMouseDown = (event) => {
			event.stopPropagation()
			let shell = resizer.parentElement
			let styles = window.getComputedStyle(parent)
			let onMouseMove = (event) => {
				let newCursorPosition = {
					x: event.pageX || event.touches[0].pageX,
					y: event.pageY || event.touches[0].pageY
				}
				let styles = window.getComputedStyle(parent)
				if (type == 'horizontal' || type == 'angle') {
					let newParentWidth = null
					if (sides.indexOf('right') != -1) {
						newParentWidth = parseInt(parent.style.width) + (newCursorPosition.x - this.#cursorPosition.x)
					} else if (sides.indexOf('left') != -1) {
						newParentWidth = parseInt(parent.style.width) - (newCursorPosition.x - this.#cursorPosition.x)
					}
					parent.style.width = this.#widthLimiter(parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newParentWidth) + 'px'
				}
				if (type == 'vertical' || type == 'angle') {
					let newParentHeight = null
					if (sides.indexOf('bottom') != -1) {
						newParentHeight = parseInt(parent.style.height) + (newCursorPosition.y - this.#cursorPosition.y)
					} else if (sides.indexOf('top') != -1) {
						newParentHeight = parseInt(parent.style.height) - (newCursorPosition.y - this.#cursorPosition.y)
					}
					parent.style.height = this.#heightLimiter(parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newParentHeight) + 'px'
				}

				if (this.#inLimitHeight) {
					this.#cursorPosition.y = newCursorPosition.y
				} 
				if (this.#inLimitWidth) {
					this.#cursorPosition.x = newCursorPosition.x
				}

				let horizontalPaddings = parseInt(shell.style.paddingLeft) + parseInt(shell.style.paddingRight)
				let verticalPaddings = parseInt(shell.style.paddingTop) + parseInt(shell.style.paddingBottom)
				let minShellWidth = parseInt(styles.minWidth) - horizontalPaddings
				let maxShellWidth = parseInt(styles.maxWidth) - horizontalPaddings
				let newShellWidth = parseInt(parent.style.width) - horizontalPaddings
				let minShellHeight = parseInt(styles.minHeight) - verticalPaddings
				let maxShellHeight = parseInt(styles.maxHeight) - verticalPaddings
				let newShellHeight = parseInt(parent.style.height) - verticalPaddings
				shell.style.width = this.#widthLimiter(minShellWidth, maxShellWidth || Infinity, newShellWidth) + 'px'
				shell.style.height = this.#heightLimiter(minShellHeight, maxShellHeight || Infinity, newShellHeight) + 'px'
			}
			
			this.#cursorPosition.x = event.pageX
			this.#cursorPosition.y = event.pageY
			document.addEventListener('mousemove', onMouseMove)
			document.addEventListener('touchmove', onMouseMove)
			document.addEventListener('mouseup', () => {
				document.removeEventListener('mousemove', onMouseMove)
			})
			document.addEventListener('touchend', () => {
				document.removeEventListener('touchmove', onMouseMove)
			})
		}

		resizer.addEventListener('mousedown', onMouseDown)
		resizer.addEventListener('touchstart', onMouseDown)

		return resizer
	}

	static #widthLimiter = (min, max, number) => {
		if (number < min) {
			this.#inLimitWidth = false
			return min
		} else if (number > max) {
			this.#inLimitWidth = false
			return max
		} else {
			this.#inLimitWidth = true
			return number
		}
	}

	static #heightLimiter = (min, max, number) => {
		if (number < min) {
			this.#inLimitHeight = false
			return min
		} else if (number > max) {
			this.#inLimitHeight = false
			return max
		} else {
			this.#inLimitHeight = true
			return number
		}
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