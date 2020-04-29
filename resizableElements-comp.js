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

var Resizable = /*#__PURE__*/function () {
  function Resizable() {
    _classCallCheck(this, Resizable);
  }

  _createClass(Resizable, null, [{
    key: "make",
    value: function make(element) {
      var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['topLeft', 'top', 'topRight', 'right', 'bottomRight', 'bottom', 'bottomLeft', 'left'];
      var shell = document.createElement('div');
      var styles = window.getComputedStyle(element);
      shell.style.padding = styles.padding;
      shell.style.paddingTop = styles.paddingTop;
      shell.style.paddingRight = styles.paddingRight;
      shell.style.paddingLeft = styles.paddingLeft;
      shell.style.paddingBottom = styles.paddingBottom;
      shell.style.width = styles.width;
      shell.style.height = styles.height;
      shell.style.position = 'relative';
      shell.innerHTML = element.innerHTML;
      element.style.width = parseInt(styles.width) + parseInt(styles.paddingLeft) + parseInt(styles.paddingRight) + 'px';
      element.style.height = parseInt(styles.height) + parseInt(styles.paddingTop) + parseInt(styles.paddingBottom) + 'px';

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

var _cursorPosition = {
  writable: true,
  value: {
    x: 0,
    y: 0
  }
};
var _createResizer = {
  writable: true,
  value: function value(parent, type, sides) {
    var cursor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var resizer = document.createElement('button');
    resizer.style.position = 'absolute';
    resizer.style.background = 'none';
    resizer.style.border = 'none';
    resizer.style.outline = 'none';
    resizer.style.padding = 0;
    resizer.style.margin = 0;
    resizer.style.zIndex = 1;
    if (cursor) resizer.style.cursor = cursor;

    if (type == 'horizontal') {
      resizer.style.width = '7px';
      resizer.style.height = '100%';
      resizer.style.top = 0;
      resizer.style.cursor = 'e-resize';
    } else if (type == 'vertical') {
      resizer.style.width = '100%';
      resizer.style.height = '7px';
      resizer.style.left = 0;
      resizer.style.cursor = 'n-resize';
    } else if (type == 'angle') {
      resizer.style.width = '10px';
      resizer.style.height = '10px';
      resizer.style.zIndex = 2;
    }

    var _iterator8 = _createForOfIteratorHelper(sides),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var side = _step8.value;

        switch (side) {
          case 'left':
            resizer.style.left = 0;
            break;

          case 'right':
            resizer.style.right = 0;
            break;

          case 'top':
            resizer.style.top = 0;
            break;

          case 'bottom':
            resizer.style.bottom = 0;
            break;
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }

    var onMouseDown = function onMouseDown(event) {
      event.stopPropagation();
      var shell = resizer.parentElement;
      var styles = window.getComputedStyle(parent);

      var onMouseMove = function onMouseMove(event) {
        var newCursorPosition = {
          x: event.pageX || event.touches[0].pageX,
          y: event.pageY || event.touches[0].pageY
        };
        var styles = window.getComputedStyle(parent);

        if (type == 'horizontal' || type == 'angle') {
          var newParentWidth = null;

          if (sides.indexOf('right') != -1) {
            newParentWidth = parseInt(parent.style.width) + (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x);
          } else if (sides.indexOf('left') != -1) {
            newParentWidth = parseInt(parent.style.width) - (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x);
          }

          parent.style.width = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _limiter).call(Resizable, parseInt(styles.minWidth), parseInt(styles.maxWidth) || Infinity, newParentWidth) + 'px';
        }

        if (type == 'vertical' || type == 'angle') {
          var newParentHeight = null;

          if (sides.indexOf('bottom') != -1) {
            newParentHeight = parseInt(parent.style.height) + (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y);
          } else if (sides.indexOf('top') != -1) {
            newParentHeight = parseInt(parent.style.height) - (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y);
          }

          parent.style.height = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _limiter).call(Resizable, parseInt(styles.minHeight), parseInt(styles.maxHeight) || Infinity, newParentHeight) + 'px';
        }

        _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);

        var horizontalPaddings = parseInt(shell.style.paddingLeft) + parseInt(shell.style.paddingRight);
        var verticalPaddings = parseInt(shell.style.paddingTop) + parseInt(shell.style.paddingBottom);
        var minShellWidth = parseInt(styles.minWidth) - horizontalPaddings;
        var maxShellWidth = parseInt(styles.maxWidth) - horizontalPaddings;
        var newShellWidth = parseInt(parent.style.width) - horizontalPaddings;
        var minShellHeight = parseInt(styles.minHeight) - verticalPaddings;
        var maxShellHeight = parseInt(styles.maxHeight) - verticalPaddings;
        var newShellHeight = parseInt(parent.style.height) - verticalPaddings;
        shell.style.width = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _limiter).call(Resizable, minShellWidth, maxShellWidth || Infinity, newShellWidth) + 'px';
        shell.style.height = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _limiter).call(Resizable, minShellHeight, maxShellHeight || Infinity, newShellHeight) + 'px';
      };

      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x = event.pageX;
      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y = event.pageY;
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
var _limiter = {
  writable: true,
  value: function value(min, max, number) {
    return Math.min(Math.max(min, number), max);
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