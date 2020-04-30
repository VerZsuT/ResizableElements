Array.prototype.hasElement = function(element) {
	return this.indexOf(element) != -1
}

HTMLElement.prototype.setStyle = function(styleObject) {
	for (let styleName in styleObject) {
		let styleValue = styleObject[styleName]
		this.style[styleName] = styleValue
	}
}

function int(string) {
	return parseInt(string)
}

class Resizable {
	static #firstCursorPosition = {x: 0, y: 0}
	static #secondCursorPosition = {x: 0, y: 0}
	static #inLimitWidth = true
	static #inLimitHeight = true

	static make(element, sides=['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left']) {
		let shell = document.createElement('div')
		let elementStyle = window.getComputedStyle(element)

		shell.setStyle({
			padding: elementStyle.padding,
			paddingTop: elementStyle.paddingTop,
			paddingRight: elementStyle.paddingRight,
			paddingLeft: elementStyle.paddingLeft,
			paddingBottom: elementStyle.paddingBottom,
			width: elementStyle.width,
			height: elementStyle.height,
			position: 'relative'
		})

		shell.innerHTML = element.innerHTML

		element.style.width  = int(elementStyle.width) + int(elementStyle.paddingLeft) + int(elementStyle.paddingRight) + 'px'
		element.style.height = int(elementStyle.height) + int(elementStyle.paddingTop) + int(elementStyle.paddingBottom) + 'px'

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

	static #createResizer = (parent, resizerType, sides, cursorStyle=null) => {
		let parentStyle = window.getComputedStyle(parent)
		let resizer = document.createElement('button')

		resizer.setStyle({
			position: 'absolute',
			background: 'none',
			border: 'none',
			outline: 'none',
			padding: 0,
			margin: 0,
			zIndex: 0,
			cursor: cursorStyle
		})

		if (resizerType == 'horizontal') {
			resizer.setStyle({
				width: '7px',
				height: '100%',
				top: 0,
				cursor: 'e-resize'
			})
		} else if (resizerType == 'vertical') {
			resizer.setStyle({
				width: '100%',
				height: '7px',
				left: 0,
				cursor: 'n-resize'
			})
		} else if (resizerType == 'angle') {
			resizer.setStyle({
				width: '10px',
				height: '10px',
				zIndex: 2
			})
		}

		for (let side of sides) {
			resizer.style[side] = 0
		}

		let onMouseDown = (event) => {
			event.stopPropagation()
			let onMouseMove = (event) => {
				let shell = resizer.parentElement
				this.#secondCursorPosition = {
					x: event.pageX || event.touches[0].pageX,
					y: event.pageY || event.touches[0].pageY
				}
				let newParentWidth  = null,
					newParentHeight = null

				if (resizerType == 'horizontal' || resizerType == 'angle') {
					if (sides.hasElement('right')) {
						newParentWidth = int(parent.style.width) + this.#deltaCursorPosition('x')
					} else if (sides.hasElement('left')) {
						newParentWidth = int(parent.style.width) - this.#deltaCursorPosition('x')
					}
					parent.style.width = this.#widthLimiter(parent, newParentWidth) + 'px'
				}
				if (resizerType == 'vertical' || resizerType == 'angle') {
					if (sides.hasElement('bottom')) {
						newParentHeight = int(parent.style.height) + this.#deltaCursorPosition('y')
					} else if (sides.hasElement('top')) {
						newParentHeight = int(parent.style.height) - this.#deltaCursorPosition('y')
					}
					parent.style.height = this.#heightLimiter(parent, newParentHeight) + 'px'
				}

				if (this.#inLimitHeight) {
					this.#firstCursorPosition.y = this.#secondCursorPosition.y
				} 
				if (this.#inLimitWidth) {
					this.#firstCursorPosition.x = this.#secondCursorPosition.x
				}

				let horizontalPaddings = int(shell.style.paddingLeft) + int(shell.style.paddingRight)
				let verticalPaddings   = int(shell.style.paddingTop)  + int(shell.style.paddingBottom)

				shell.style.minWidth = int(parentStyle.minWidth) - horizontalPaddings
				shell.style.maxWidth = int(parentStyle.maxWidth) - horizontalPaddings
				shell.style.minHeight = int(parentStyle.minHeight) - verticalPaddings
				shell.style.maxHeight = int(parentStyle.maxHeight) - verticalPaddings

				let shellWidth = int(parent.style.width) - horizontalPaddings
				let shellHeight = int(parent.style.height) - verticalPaddings
				shell.style.width  = this.#widthLimiter(shell, shellWidth) + 'px'
				shell.style.height = this.#heightLimiter(shell, shellHeight) + 'px'
			}
			
			this.#firstCursorPosition.x = event.pageX
			this.#firstCursorPosition.y = event.pageY
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

	static #widthLimiter = (element, width) => {
		let elementStyle = window.getComputedStyle(element)
		let minWidth = int(elementStyle.minWidth || element.style.minWidth) || 0
		let maxWidth = int(elementStyle.maxWidth || element.style.maxWidth) || Infinity
		if (width < minWidth) {
			this.#inLimitWidth = false
			return minWidth
		} else if (width > maxWidth) {
			this.#inLimitWidth = false
			return maxWidth
		} else {
			this.#inLimitWidth = true
			return width
		}
	}

	static #heightLimiter = (element, height) => {
		let elementStyle = window.getComputedStyle(element)
		let minHeight = int(elementStyle.minHeight || element.style.minHeight) || 0
		let maxHeight = int(elementStyle.maxHeight || element.style.maxHeight) || Infinity 
		if (height < minHeight) {
			this.#inLimitHeight = false
			return minHeight
		} else if (height > maxHeight) {
			this.#inLimitHeight = false
			return maxHeight
		} else {
			this.#inLimitHeight = true
			return height
		}
	}

	static #deltaCursorPosition = (direction) => {
		if (direction == 'x') {
			return this.#secondCursorPosition.x - this.#firstCursorPosition.x
		} else if (direction == 'y') {
			return this.#secondCursorPosition.y - this.#firstCursorPosition.y
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