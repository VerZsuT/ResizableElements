var Resizable = (function() {
	// Is there an element in the array.
	function hasElement(array, element) {
		return array.indexOf(element) != -1
	}

	// Setting an element of styles from an array.
	function setStyle(element, styleObject) {
		for (let styleName in styleObject) {
			let styleValue = styleObject[styleName]
			element.style[styleName] = styleValue
		}
	}

	// Shortened parseInt.
	function int(string) {
		return parseInt(string)
	}

	// Class for working with two cursor positions: previous and current.
	class CursorPositions {
		previous = {x: 0, y: 0}
		current = {x: 0, y: 0}

		get deltaX() {
			return this.current.x - this.previous.x 
		}
		get deltaY() {
			return this.current.y - this.previous.y
		}

		updateX(x) {
			if (x != undefined) this.previous.x = x
			else this.previous.x = this.current.x
		}
		updateY(y) {
			if (y != undefined) this.previous.y = y
			else this.previous.y = this.current.y
		}
	}

	// Resizer button class.
	class Resizer {
		#cursorPositions = new CursorPositions()
		#element = null

		// Element resizing factor.
		#mult = null

		// Content wrapper. Needed to work properly with padding.
		// Allows you to not restrict the postion of the parent.
		#wrapper = null

		// Resize Limit.
		#inLimitWidth = true
		#inLimitHeight = true

		constructor(parent, resizerType, sides, mult, cursorStyle) {
			let parentStyle = window.getComputedStyle(parent)
			this.#element = document.createElement('button')
			this.#mult = mult

			// Setting default styles.
			setStyle(this.#element, {
				position: 'absolute',
				background: 'none',
				border: 'none',
				outline: 'none',
				padding: 0,
				margin: 0,
				zIndex: 0,
				cursor: cursorStyle
			})

			// Setting styles by resizer type.
			if (resizerType == 'horizontal') {
				setStyle(this.#element, {
					width: '7px',
					height: '100%',
					top: 0,
					cursor: 'e-resize'
				})
			} else if (resizerType == 'vertical') {
				setStyle(this.#element, {
					width: '100%',
					height: '7px',
					left: 0,
					cursor: 'n-resize'
				})
			} else if (resizerType == 'angle') {
				setStyle(this.#element, {
					width: '10px',
					height: '10px',
					zIndex: 2
				})
			}

			// Setting styles on the sides (left: 0, right: 0 ...)
			for (let side of sides) {
				this.#element.style[side] = 0
			}

			let onResizerMouseDown = (event) => {
				event.stopPropagation()
				this.#cursorPositions.previous = {
					x: event.pageX || event.touches && event.touches[0].pageX,
					y: event.pageY || event.touches && event.touches[0].pageY
				}
				this.#wrapper = this.#element.parentElement

				let onDocumentMouseMove = (event) => {
					this.#cursorPositions.current = {
						x: event.pageX || event.touches && event.touches[0].pageX,
						y: event.pageY || event.touches && event.touches[0].pageY
					}
					let newParentWidth  = null,
						newParentHeight = null

					// Resizing an element based on a change in cursor position.
					if (resizerType == 'horizontal' || resizerType == 'angle') {
						if (hasElement(sides, 'right')) {
							newParentWidth = int(parent.style.width) + this.#cursorPositions.deltaX * this.#mult.horizontal
						} else if (hasElement(sides, 'left')) {
							newParentWidth = int(parent.style.width) - this.#cursorPositions.deltaX * this.#mult.horizontal
						}
						parent.style.width = this.#widthLimiter(parent, newParentWidth)
					}
					if (resizerType == 'vertical' || resizerType == 'angle') {
						if (hasElement(sides, 'bottom')) {
							newParentHeight = int(parent.style.height) + this.#cursorPositions.deltaY * this.#mult.vertical
						} else if (hasElement(sides, 'top')) {
							newParentHeight = int(parent.style.height) - this.#cursorPositions.deltaY * this.#mult.vertical
						}
						parent.style.height = this.#heightLimiter(parent, newParentHeight)
					}

					if (this.#inLimitHeight) {
						this.#cursorPositions.updateY()
					} 
					if (this.#inLimitWidth) {
						this.#cursorPositions.updateX()
					}

					// Resize wrapper.
					let horizontalPaddings = int(this.#wrapper.style.paddingLeft) + int(this.#wrapper.style.paddingRight)
					let verticalPaddings   = int(this.#wrapper.style.paddingTop)  + int(this.#wrapper.style.paddingBottom)

					this.#wrapper.style.minWidth = int(parentStyle.minWidth) - horizontalPaddings
					this.#wrapper.style.maxWidth = int(parentStyle.maxWidth) - horizontalPaddings
					this.#wrapper.style.minHeight = int(parentStyle.minHeight) - verticalPaddings
					this.#wrapper.style.maxHeight = int(parentStyle.maxHeight) - verticalPaddings

					let wrapWidth = int(parent.style.width) - horizontalPaddings
					let wrapHeight = int(parent.style.height) - verticalPaddings
					this.#wrapper.style.width  = this.#widthLimiter(this.#wrapper, wrapWidth)
					this.#wrapper.style.height = this.#heightLimiter(this.#wrapper, wrapHeight)
				}
				
				// Setting mouse ang touch document listeners.
				document.addEventListener('mousemove', onDocumentMouseMove)
				document.addEventListener('touchmove', onDocumentMouseMove)
				document.addEventListener('mouseup', () => {
					document.removeEventListener('mousemove', onDocumentMouseMove)
				})
				document.addEventListener('touchend', () => {
					document.removeEventListener('touchmove', onDocumentMouseMove)
				})
			}

			this.#element.addEventListener('mousedown', onResizerMouseDown)
			this.#element.addEventListener('touchstart', onResizerMouseDown)
		}

		get element() {
			return this.#element
		}

		#widthLimiter = (element, width) => {
			let elementStyle = window.getComputedStyle(element)
			let minWidth = int(elementStyle.minWidth || element.style.minWidth) || 0
			let maxWidth = int(elementStyle.maxWidth || element.style.maxWidth) || Infinity
			if (width < minWidth) {
				this.#inLimitWidth = false
				return minWidth + 'px'
			} else if (width > maxWidth) {
				this.#inLimitWidth = false
				return maxWidth + 'px'
			} else {
				this.#inLimitWidth = true
				return width + 'px'
			}
		}

		#heightLimiter = (element, height) => {
			let elementStyle = window.getComputedStyle(element)
			let minHeight = int(elementStyle.minHeight || element.style.minHeight) || 0
			let maxHeight = int(elementStyle.maxHeight || element.style.maxHeight) || Infinity 
			if (height < minHeight) {
				this.#inLimitHeight = false
				return minHeight + 'px'
			} else if (height > maxHeight) {
				this.#inLimitHeight = false
				return maxHeight + 'px'
			} else {
				this.#inLimitHeight = true
				return height + 'px'
			}
		}
	}


	// Public class for creating resizable elements.
	class Resizable {
		static make(element,
					sides=['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'],
					mult={horizontal: 1, vertical: 1}) {
			let wrapper = document.createElement('div')
			let elementStyle = window.getComputedStyle(element)

			// Setting wrap default styles.
			setStyle(wrapper, {
				padding: elementStyle.padding,
				paddingTop: elementStyle.paddingTop,
				paddingRight: elementStyle.paddingRight,
				paddingLeft: elementStyle.paddingLeft,
				paddingBottom: elementStyle.paddingBottom,
				width: elementStyle.width,
				height: elementStyle.height,
				position: 'relative'
			})

			// Copy parent content in wrapper.
			wrapper.innerHTML = element.innerHTML

			element.style.width  = int(elementStyle.width) + int(elementStyle.paddingLeft) + int(elementStyle.paddingRight) + 'px'
			element.style.height = int(elementStyle.height) + int(elementStyle.paddingTop) + int(elementStyle.paddingBottom) + 'px'

			// Creting resizer.
			for (let side of sides) {
				let resizer = null
				let resizerType = null
				let sides = []
				let cursor = null

				switch (side) {
					case 'topLeft':
						resizerType = 'angle'
						sides = ['top', 'left']
						cursor = 'se-resize'
						break
					case 'topRight':
						resizerType = 'angle'
						sides = ['top', 'right']
						cursor = 'ne-resize'
						break
					case 'bottomLeft':
						resizerType = 'angle'
						sides = ['bottom', 'left']
						cursor = 'ne-resize'
						break
					case 'bottomRight':
						resizerType = 'angle'
						sides = ['bottom', 'right']
						cursor = 'se-resize'
						break
					case 'top':
						resizerType = 'vertical'
						sides = ['top']
						break
					case 'bottom':
						resizerType = 'vertical'
						sides = ['bottom']
						break
					case 'left':
						resizerType = 'horizontal'
						sides = ['left']
						break
					case 'right':
						resizerType = 'horizontal'
						sides = ['right']
						break
				}
				resizer = new Resizer(element, resizerType, sides, mult, cursor)
				wrapper.appendChild(resizer.element)
			}					

			element.style.padding = 0
			element.innerHTML = ''
			element.appendChild(wrapper)
		}
	}

	return Resizable
})()

// Modifying elements with class resizable, resizableOnly or resizableWithout.
window.addEventListener('load', () => {
	let resizableElements = document.getElementsByClassName('resizable')
	let resizableOnlyElements = document.getElementsByClassName('resizableOnly')
	let resizableWithoutElements = document.getElementsByClassName('resizableWithout')
	let allSides = ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left']

	for (let element of resizableElements) {
		let mult = {horizontal: 1, vertical: 1}

		for (let className of element.classList) {
			let params = className.split('-')
			let name = params[0]

			if (name == 'mult') {
				let verticalMult = params[1] || 1
				let horizontalMult = params[2] || 1
				mult = {vertical: verticalMult, horizontal: horizontalMult}
			}
		}

		Resizable.make(element, allSides, mult)
	}

	for (let element of resizableOnlyElements) {
		let mult = {horizontal: 1, vertical: 1}
		let sides = []

		for (let className of element.classList) {
			let params = className.split('-')
			let name = params[0]

			if (name == 'sides') {
				sides = params.slice(1)
			} else if (name == 'mult') {
				let verticalMult = params[1] || 1
				let horizontalMult = params[2] || 1
				mult = {vertical: verticalMult, horizontal: horizontalMult}
			}
		}

		Resizable.make(element, sides, mult)
	}

	for (let element of resizableWithoutElements) {
		let mult = {horizontal: 1, vertical: 1}
		let sides = allSides

		for (let className of element.classList) {
			let params = className.split('-')
			let name = params[0]

			if (name == 'sides') {
				let withoutSides = params.slice(1)

				for (let side of withoutSides) {
					sides.splice(sides.indexOf(side), 1)
				}
			} else if (name == 'mult') {
				let verticalMult = params[1] || 1
				let horizontalMult = params[2] || 1
				mult = {vertical: verticalMult, horizontal: horizontalMult}
			}
		}

		Resizable.make(element, sides, mult)
	}
})