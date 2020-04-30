"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

Array.prototype.hasElement = function (element) {
  return this.indexOf(element) != -1;
};

HTMLElement.prototype.setStyle = function (styleObject) {
  for (var styleName in styleObject) {
    var styleValue = styleObject[styleName];
    this.style[styleName] = styleValue;
  }
};

function int(string) {
  return parseInt(string);
}

var Resizable = /*#__PURE__*/function () {
  function Resizable() {
    _classCallCheck(this, Resizable);
  }

  _createClass(Resizable, null, [{
    key: "make",
    value: function make(element) {
      var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'];
      var shell = document.createElement('div');
      var elementStyle = window.getComputedStyle(element);
      shell.setStyle({
        padding: elementStyle.padding,
        paddingTop: elementStyle.paddingTop,
        paddingRight: elementStyle.paddingRight,
        paddingLeft: elementStyle.paddingLeft,
        paddingBottom: elementStyle.paddingBottom,
        width: elementStyle.width,
        height: elementStyle.height,
        position: 'relative'
      });
      shell.innerHTML = element.innerHTML;
      element.style.width = int(elementStyle.width) + int(elementStyle.paddingLeft) + int(elementStyle.paddingRight) + 'px';
      element.style.height = int(elementStyle.height) + int(elementStyle.paddingTop) + int(elementStyle.paddingBottom) + 'px';

      var _iterator = _createForOfIteratorHelper(sides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var side = _step.value;
          var resizer = null;

          switch (side) {
            case 'topLeft':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'angle', ['top', 'left'], 'se-resize');
              break;

            case 'topRight':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'angle', ['top', 'right'], 'ne-resize');
              break;

            case 'bottomLeft':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'angle', ['bottom', 'left'], 'ne-resize');
              break;

            case 'bottomRight':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'angle', ['bottom', 'right'], 'se-resize');
              break;

            case 'top':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'vertical', ['top']);
              break;

            case 'bottom':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'vertical', ['bottom']);
              break;

            case 'left':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'horizontal', ['left']);
              break;

            case 'right':
              resizer = _classStaticPrivateFieldSpecGet(this, Resizable, _createResizer).call(this, element, 'horizontal', ['right']);
              break;
          }

          shell.appendChild(resizer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      element.style.padding = 0;
      element.innerHTML = '';
      element.appendChild(shell);
    }
  }]);

  return Resizable;
}();

var _firstCursorPosition = {
  writable: true,
  value: {
    x: 0,
    y: 0
  }
};
var _secondCursorPosition = {
  writable: true,
  value: {
    x: 0,
    y: 0
  }
};
var _inLimitWidth = {
  writable: true,
  value: true
};
var _inLimitHeight = {
  writable: true,
  value: true
};
var _createResizer = {
  writable: true,
  value: function value(parent, resizerType, sides) {
    var cursorStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var parentStyle = window.getComputedStyle(parent);
    var resizer = document.createElement('button');
    resizer.setStyle({
      position: 'absolute',
      background: 'none',
      border: 'none',
      outline: 'none',
      padding: 0,
      margin: 0,
      zIndex: 0,
      cursor: cursorStyle
    });

    if (resizerType == 'horizontal') {
      resizer.setStyle({
        width: '7px',
        height: '100%',
        top: 0,
        cursor: 'e-resize'
      });
    } else if (resizerType == 'vertical') {
      resizer.setStyle({
        width: '100%',
        height: '7px',
        left: 0,
        cursor: 'n-resize'
      });
    } else if (resizerType == 'angle') {
      resizer.setStyle({
        width: '10px',
        height: '10px',
        zIndex: 2
      });
    }

    var _iterator8 = _createForOfIteratorHelper(sides),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var side = _step8.value;
        resizer.style[side] = 0;
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    var onMouseDown = function onMouseDown(event) {
      event.stopPropagation();

      var onMouseMove = function onMouseMove(event) {
        var shell = resizer.parentElement;

        _classStaticPrivateFieldSpecSet(Resizable, Resizable, _secondCursorPosition, {
          x: event.pageX || event.touches[0].pageX,
          y: event.pageY || event.touches[0].pageY
        });

        var newParentWidth = null,
            newParentHeight = null;

        if (resizerType == 'horizontal' || resizerType == 'angle') {
          if (sides.hasElement('right')) {
            newParentWidth = int(parent.style.width) + _classStaticPrivateFieldSpecGet(Resizable, Resizable, _deltaCursorPosition).call(Resizable, 'x');
          } else if (sides.hasElement('left')) {
            newParentWidth = int(parent.style.width) - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _deltaCursorPosition).call(Resizable, 'x');
          }

          parent.style.width = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _widthLimiter).call(Resizable, parent, newParentWidth) + 'px';
        }

        if (resizerType == 'vertical' || resizerType == 'angle') {
          if (sides.hasElement('bottom')) {
            newParentHeight = int(parent.style.height) + _classStaticPrivateFieldSpecGet(Resizable, Resizable, _deltaCursorPosition).call(Resizable, 'y');
          } else if (sides.hasElement('top')) {
            newParentHeight = int(parent.style.height) - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _deltaCursorPosition).call(Resizable, 'y');
          }

          parent.style.height = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _heightLimiter).call(Resizable, parent, newParentHeight) + 'px';
        }

        if (_classStaticPrivateFieldSpecGet(Resizable, Resizable, _inLimitHeight)) {
          _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).y = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _secondCursorPosition).y;
        }

        if (_classStaticPrivateFieldSpecGet(Resizable, Resizable, _inLimitWidth)) {
          _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).x = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _secondCursorPosition).x;
        }

        var horizontalPaddings = int(shell.style.paddingLeft) + int(shell.style.paddingRight);
        var verticalPaddings = int(shell.style.paddingTop) + int(shell.style.paddingBottom);
        shell.style.minWidth = int(parentStyle.minWidth) - horizontalPaddings;
        shell.style.maxWidth = int(parentStyle.maxWidth) - horizontalPaddings;
        shell.style.minHeight = int(parentStyle.minHeight) - verticalPaddings;
        shell.style.maxHeight = int(parentStyle.maxHeight) - verticalPaddings;
        var shellWidth = int(parent.style.width) - horizontalPaddings;
        var shellHeight = int(parent.style.height) - verticalPaddings;
        shell.style.width = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _widthLimiter).call(Resizable, shell, shellWidth) + 'px';
        shell.style.height = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _heightLimiter).call(Resizable, shell, shellHeight) + 'px';
      };

      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).x = event.pageX;
      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).y = event.pageY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
      });
      document.addEventListener('touchend', function () {
        document.removeEventListener('touchmove', onMouseMove);
      });
    };

    resizer.addEventListener('mousedown', onMouseDown);
    resizer.addEventListener('touchstart', onMouseDown);
    return resizer;
  }
};
var _widthLimiter = {
  writable: true,
  value: function value(element, width) {
    var elementStyle = window.getComputedStyle(element);
    var minWidth = int(elementStyle.minWidth || element.style.minWidth) || 0;
    var maxWidth = int(elementStyle.maxWidth || element.style.maxWidth) || Infinity;

    if (width < minWidth) {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitWidth, false);

      return minWidth;
    } else if (width > maxWidth) {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitWidth, false);

      return maxWidth;
    } else {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitWidth, true);

      return width;
    }
  }
};
var _heightLimiter = {
  writable: true,
  value: function value(element, height) {
    var elementStyle = window.getComputedStyle(element);
    var minHeight = int(elementStyle.minHeight || element.style.minHeight) || 0;
    var maxHeight = int(elementStyle.maxHeight || element.style.maxHeight) || Infinity;

    if (height < minHeight) {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitHeight, false);

      return minHeight;
    } else if (height > maxHeight) {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitHeight, false);

      return maxHeight;
    } else {
      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _inLimitHeight, true);

      return height;
    }
  }
};
var _deltaCursorPosition = {
  writable: true,
  value: function value(direction) {
    if (direction == 'x') {
      return _classStaticPrivateFieldSpecGet(Resizable, Resizable, _secondCursorPosition).x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).x;
    } else if (direction == 'y') {
      return _classStaticPrivateFieldSpecGet(Resizable, Resizable, _secondCursorPosition).y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _firstCursorPosition).y;
    }
  }
};

window.onload = function () {
  var resizableElements = document.getElementsByClassName('resizable');
  var resizableOnlyElements = document.getElementsByClassName('resizableOnly');
  var resizableWithoutElements = document.getElementsByClassName('resizableWithout');
  var allSides = ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'];

  var _iterator2 = _createForOfIteratorHelper(resizableElements),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var element = _step2.value;
      Resizable.make(element);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var _iterator3 = _createForOfIteratorHelper(resizableOnlyElements),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _element = _step3.value;

      var _iterator5 = _createForOfIteratorHelper(_element.classList),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var className = _step5.value;
          var params = className.split('-');
          var name = params[0];

          if (name == 'sides') {
            var sides = params.slice(1);
            Resizable.make(_element, sides);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = _createForOfIteratorHelper(resizableWithoutElements),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _element2 = _step4.value;

      var _iterator6 = _createForOfIteratorHelper(_element2.classList),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _className = _step6.value;

          var _params = _className.split('-');

          var _name = _params[0];

          if (_name == 'sides') {
            var withoutSides = _params.slice(1);

            var _sides = allSides;

            var _iterator7 = _createForOfIteratorHelper(withoutSides),
                _step7;

            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                var side = _step7.value;

                _sides.splice(_sides.indexOf(side), 1);
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }

            Resizable.make(_element2, _sides);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
};