"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Resizable = function () {
  // Is there an element in the array.
  function hasElement(array, element) {
    return array.indexOf(element) != -1;
  } // Setting an element of styles from an array.


  function setStyle(element, styleObject) {
    for (var styleName in styleObject) {
      var styleValue = styleObject[styleName];
      element.style[styleName] = styleValue;
    }
  } // Shortened parseInt.


  function int(string) {
    return parseInt(string);
  } // Class for working with two cursor positions: previous and current.


  var CursorPositions = /*#__PURE__*/function () {
    function CursorPositions() {
      _classCallCheck(this, CursorPositions);

      _defineProperty(this, "previous", {
        x: 0,
        y: 0
      });

      _defineProperty(this, "current", {
        x: 0,
        y: 0
      });
    }

    _createClass(CursorPositions, [{
      key: "updateX",
      value: function updateX(x) {
        if (x != undefined) this.previous.x = x;else this.previous.x = this.current.x;
      }
    }, {
      key: "updateY",
      value: function updateY(y) {
        if (y != undefined) this.previous.y = y;else this.previous.y = this.current.y;
      }
    }, {
      key: "deltaX",
      get: function get() {
        return this.current.x - this.previous.x;
      }
    }, {
      key: "deltaY",
      get: function get() {
        return this.current.y - this.previous.y;
      }
    }]);

    return CursorPositions;
  }(); // Resizer button class.


  var Resizer = /*#__PURE__*/function () {
    // Element resizing factor.
    // Content wrapper. Needed to work properly with padding.
    // Allows you to not restrict the postion of the parent.
    // Resize Limit.
    function Resizer(parent, resizerType, sides, mult, cursorStyle) {
      var _this = this;

      _classCallCheck(this, Resizer);

      _cursorPositions.set(this, {
        writable: true,
        value: new CursorPositions()
      });

      _element.set(this, {
        writable: true,
        value: null
      });

      _mult.set(this, {
        writable: true,
        value: null
      });

      _wrapper.set(this, {
        writable: true,
        value: null
      });

      _inLimitWidth.set(this, {
        writable: true,
        value: true
      });

      _inLimitHeight.set(this, {
        writable: true,
        value: true
      });

      _widthLimiter.set(this, {
        writable: true,
        value: function value(element, width) {
          var elementStyle = window.getComputedStyle(element);
          var minWidth = int(elementStyle.minWidth || element.style.minWidth) || 0;
          var maxWidth = int(elementStyle.maxWidth || element.style.maxWidth) || Infinity;

          if (width < minWidth) {
            _classPrivateFieldSet(_this, _inLimitWidth, false);

            return minWidth + 'px';
          } else if (width > maxWidth) {
            _classPrivateFieldSet(_this, _inLimitWidth, false);

            return maxWidth + 'px';
          } else {
            _classPrivateFieldSet(_this, _inLimitWidth, true);

            return width + 'px';
          }
        }
      });

      _heightLimiter.set(this, {
        writable: true,
        value: function value(element, height) {
          var elementStyle = window.getComputedStyle(element);
          var minHeight = int(elementStyle.minHeight || element.style.minHeight) || 0;
          var maxHeight = int(elementStyle.maxHeight || element.style.maxHeight) || Infinity;

          if (height < minHeight) {
            _classPrivateFieldSet(_this, _inLimitHeight, false);

            return minHeight + 'px';
          } else if (height > maxHeight) {
            _classPrivateFieldSet(_this, _inLimitHeight, false);

            return maxHeight + 'px';
          } else {
            _classPrivateFieldSet(_this, _inLimitHeight, true);

            return height + 'px';
          }
        }
      });

      var parentStyle = window.getComputedStyle(parent);

      _classPrivateFieldSet(this, _element, document.createElement('button'));

      _classPrivateFieldSet(this, _mult, mult); // Setting default styles.


      setStyle(_classPrivateFieldGet(this, _element), {
        position: 'absolute',
        background: 'none',
        border: 'none',
        outline: 'none',
        padding: 0,
        margin: 0,
        zIndex: 0,
        cursor: cursorStyle
      }); // Setting styles by resizer type.

      if (resizerType == 'horizontal') {
        setStyle(_classPrivateFieldGet(this, _element), {
          width: '7px',
          height: '100%',
          top: 0,
          cursor: 'e-resize'
        });
      } else if (resizerType == 'vertical') {
        setStyle(_classPrivateFieldGet(this, _element), {
          width: '100%',
          height: '7px',
          left: 0,
          cursor: 'n-resize'
        });
      } else if (resizerType == 'angle') {
        setStyle(_classPrivateFieldGet(this, _element), {
          width: '10px',
          height: '10px',
          zIndex: 2
        });
      } // Setting styles on the sides (left: 0, right: 0 ...)


      var _iterator = _createForOfIteratorHelper(sides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var side = _step.value;
          _classPrivateFieldGet(this, _element).style[side] = 0;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var onResizerMouseDown = function onResizerMouseDown(event) {
        event.stopPropagation();
        _classPrivateFieldGet(_this, _cursorPositions).previous = {
          x: event.pageX || event.touches && event.touches[0].pageX,
          y: event.pageY || event.touches && event.touches[0].pageY
        };

        _classPrivateFieldSet(_this, _wrapper, _classPrivateFieldGet(_this, _element).parentElement);

        var onDocumentMouseMove = function onDocumentMouseMove(event) {
          _classPrivateFieldGet(_this, _cursorPositions).current = {
            x: event.pageX || event.touches && event.touches[0].pageX,
            y: event.pageY || event.touches && event.touches[0].pageY
          };
          var newParentWidth = null,
              newParentHeight = null; // Resizing an element based on a change in cursor position.

          if (resizerType == 'horizontal' || resizerType == 'angle') {
            if (hasElement(sides, 'right')) {
              newParentWidth = int(parent.style.width) + _classPrivateFieldGet(_this, _cursorPositions).deltaX * _classPrivateFieldGet(_this, _mult).horizontal;
            } else if (hasElement(sides, 'left')) {
              newParentWidth = int(parent.style.width) - _classPrivateFieldGet(_this, _cursorPositions).deltaX * _classPrivateFieldGet(_this, _mult).horizontal;
            }

            parent.style.width = _classPrivateFieldGet(_this, _widthLimiter).call(_this, parent, newParentWidth);
          }

          if (resizerType == 'vertical' || resizerType == 'angle') {
            if (hasElement(sides, 'bottom')) {
              newParentHeight = int(parent.style.height) + _classPrivateFieldGet(_this, _cursorPositions).deltaY * _classPrivateFieldGet(_this, _mult).vertical;
            } else if (hasElement(sides, 'top')) {
              newParentHeight = int(parent.style.height) - _classPrivateFieldGet(_this, _cursorPositions).deltaY * _classPrivateFieldGet(_this, _mult).vertical;
            }

            parent.style.height = _classPrivateFieldGet(_this, _heightLimiter).call(_this, parent, newParentHeight);
          }

          if (_classPrivateFieldGet(_this, _inLimitHeight)) {
            _classPrivateFieldGet(_this, _cursorPositions).updateY();
          }

          if (_classPrivateFieldGet(_this, _inLimitWidth)) {
            _classPrivateFieldGet(_this, _cursorPositions).updateX();
          } // Resize wrapper.


          var horizontalPaddings = int(_classPrivateFieldGet(_this, _wrapper).style.paddingLeft) + int(_classPrivateFieldGet(_this, _wrapper).style.paddingRight);
          var verticalPaddings = int(_classPrivateFieldGet(_this, _wrapper).style.paddingTop) + int(_classPrivateFieldGet(_this, _wrapper).style.paddingBottom);
          _classPrivateFieldGet(_this, _wrapper).style.minWidth = int(parentStyle.minWidth) - horizontalPaddings;
          _classPrivateFieldGet(_this, _wrapper).style.maxWidth = int(parentStyle.maxWidth) - horizontalPaddings;
          _classPrivateFieldGet(_this, _wrapper).style.minHeight = int(parentStyle.minHeight) - verticalPaddings;
          _classPrivateFieldGet(_this, _wrapper).style.maxHeight = int(parentStyle.maxHeight) - verticalPaddings;
          var wrapWidth = int(parent.style.width) - horizontalPaddings;
          var wrapHeight = int(parent.style.height) - verticalPaddings;
          _classPrivateFieldGet(_this, _wrapper).style.width = _classPrivateFieldGet(_this, _widthLimiter).call(_this, _classPrivateFieldGet(_this, _wrapper), wrapWidth);
          _classPrivateFieldGet(_this, _wrapper).style.height = _classPrivateFieldGet(_this, _heightLimiter).call(_this, _classPrivateFieldGet(_this, _wrapper), wrapHeight);
        }; // Setting mouse ang touch document listeners.


        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('touchmove', onDocumentMouseMove);
        document.addEventListener('mouseup', function () {
          document.removeEventListener('mousemove', onDocumentMouseMove);
        });
        document.addEventListener('touchend', function () {
          document.removeEventListener('touchmove', onDocumentMouseMove);
        });
      };

      _classPrivateFieldGet(this, _element).addEventListener('mousedown', onResizerMouseDown);

      _classPrivateFieldGet(this, _element).addEventListener('touchstart', onResizerMouseDown);
    }

    _createClass(Resizer, [{
      key: "element",
      get: function get() {
        return _classPrivateFieldGet(this, _element);
      }
    }]);

    return Resizer;
  }(); // Public class for creating resizable elements.


  var _cursorPositions = new WeakMap();

  var _element = new WeakMap();

  var _mult = new WeakMap();

  var _wrapper = new WeakMap();

  var _inLimitWidth = new WeakMap();

  var _inLimitHeight = new WeakMap();

  var _widthLimiter = new WeakMap();

  var _heightLimiter = new WeakMap();

  var Resizable = /*#__PURE__*/function () {
    function Resizable() {
      _classCallCheck(this, Resizable);
    }

    _createClass(Resizable, null, [{
      key: "make",
      value: function make(element) {
        var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'];
        var mult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          horizontal: 1,
          vertical: 1
        };
        var wrapper = document.createElement('div');
        var elementStyle = window.getComputedStyle(element); // Setting wrap default styles.

        setStyle(wrapper, {
          padding: elementStyle.padding,
          paddingTop: elementStyle.paddingTop,
          paddingRight: elementStyle.paddingRight,
          paddingLeft: elementStyle.paddingLeft,
          paddingBottom: elementStyle.paddingBottom,
          width: elementStyle.width,
          height: elementStyle.height,
          position: 'relative'
        }); // Copy parent content in wrapper.

        wrapper.innerHTML = element.innerHTML;
        element.style.width = int(elementStyle.width) + int(elementStyle.paddingLeft) + int(elementStyle.paddingRight) + 'px';
        element.style.height = int(elementStyle.height) + int(elementStyle.paddingTop) + int(elementStyle.paddingBottom) + 'px'; // Creting resizer.

        var _iterator2 = _createForOfIteratorHelper(sides),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var side = _step2.value;
            var resizer = null;
            var resizerType = null;
            var _sides = [];
            var cursor = null;

            switch (side) {
              case 'topLeft':
                resizerType = 'angle';
                _sides = ['top', 'left'];
                cursor = 'se-resize';
                break;

              case 'topRight':
                resizerType = 'angle';
                _sides = ['top', 'right'];
                cursor = 'ne-resize';
                break;

              case 'bottomLeft':
                resizerType = 'angle';
                _sides = ['bottom', 'left'];
                cursor = 'ne-resize';
                break;

              case 'bottomRight':
                resizerType = 'angle';
                _sides = ['bottom', 'right'];
                cursor = 'se-resize';
                break;

              case 'top':
                resizerType = 'vertical';
                _sides = ['top'];
                break;

              case 'bottom':
                resizerType = 'vertical';
                _sides = ['bottom'];
                break;

              case 'left':
                resizerType = 'horizontal';
                _sides = ['left'];
                break;

              case 'right':
                resizerType = 'horizontal';
                _sides = ['right'];
                break;
            }

            resizer = new Resizer(element, resizerType, _sides, mult, cursor);
            wrapper.appendChild(resizer.element);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        element.style.padding = 0;
        element.innerHTML = '';
        element.appendChild(wrapper);
      }
    }]);

    return Resizable;
  }();

  return Resizable;
}(); // Modifying elements with class resizable, resizableOnly or resizableWithout.


window.addEventListener('load', function () {
  var resizableElements = document.getElementsByClassName('resizable');
  var resizableOnlyElements = document.getElementsByClassName('resizableOnly');
  var resizableWithoutElements = document.getElementsByClassName('resizableWithout');
  var allSides = ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'];

  var _iterator3 = _createForOfIteratorHelper(resizableElements),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var element = _step3.value;
      var mult = {
        horizontal: 1,
        vertical: 1
      };

      var _iterator6 = _createForOfIteratorHelper(element.classList),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var className = _step6.value;
          var params = className.split('-');
          var name = params[0];

          if (name == 'mult') {
            var verticalMult = params[1] || 1;
            var horizontalMult = params[2] || 1;
            mult = {
              vertical: verticalMult,
              horizontal: horizontalMult
            };
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      Resizable.make(element, allSides, mult);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = _createForOfIteratorHelper(resizableOnlyElements),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _element2 = _step4.value;
      var _mult2 = {
        horizontal: 1,
        vertical: 1
      };
      var sides = [];

      var _iterator7 = _createForOfIteratorHelper(_element2.classList),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _className = _step7.value;

          var _params = _className.split('-');

          var _name = _params[0];

          if (_name == 'sides') {
            sides = _params.slice(1);
          } else if (_name == 'mult') {
            var _verticalMult = _params[1] || 1;

            var _horizontalMult = _params[2] || 1;

            _mult2 = {
              vertical: _verticalMult,
              horizontal: _horizontalMult
            };
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      Resizable.make(_element2, sides, _mult2);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var _iterator5 = _createForOfIteratorHelper(resizableWithoutElements),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var _element3 = _step5.value;
      var _mult3 = {
        horizontal: 1,
        vertical: 1
      };
      var _sides2 = allSides;

      var _iterator8 = _createForOfIteratorHelper(_element3.classList),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _className2 = _step8.value;

          var _params2 = _className2.split('-');

          var _name2 = _params2[0];

          if (_name2 == 'sides') {
            var withoutSides = _params2.slice(1);

            var _iterator9 = _createForOfIteratorHelper(withoutSides),
                _step9;

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var side = _step9.value;

                _sides2.splice(_sides2.indexOf(side), 1);
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          } else if (_name2 == 'mult') {
            var _verticalMult2 = _params2[1] || 1;

            var _horizontalMult2 = _params2[2] || 1;

            _mult3 = {
              vertical: _verticalMult2,
              horizontal: _horizontalMult2
            };
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      Resizable.make(_element3, _sides2, _mult3);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
});