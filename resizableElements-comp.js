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
      shell.style.width = '100%';
      shell.style.height = '100%';
      shell.style.position = 'relative';
      shell.innerHTML = element.innerHTML;

      var _iterator = _createForOfIteratorHelper(sides),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var side = _step.value;

          switch (side) {
            case 'topLeft':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createTopLeftResizer).call(this, element));
              break;

            case 'topRight':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createTopRightResizer).call(this, element));
              break;

            case 'bottomLeft':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createBottomLeftResizer).call(this, element));
              break;

            case 'bottomRight':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createBottomRightResizer).call(this, element));
              break;

            case 'top':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createTopResizer).call(this, element));
              break;

            case 'right':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createRightResizer).call(this, element));
              break;

            case 'bottom':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createBottomResizer).call(this, element));
              break;

            case 'left':
              shell.appendChild(_classStaticPrivateFieldSpecGet(this, Resizable, _createLeftResizer).call(this, element));
              break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

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
  value: function value(parent, listener) {
    var resizer = document.createElement('button');
    resizer.style.position = 'absolute';
    resizer.style.background = 'none';
    resizer.style.border = 'none';
    resizer.style.outline = 'none';
    resizer.style.padding = 0;
    resizer.style.margin = 0;
    resizer.style.zIndex = 1;

    resizer.onmousedown = function (event) {
      var styles = window.getComputedStyle(parent);
      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x = event.pageX;
      _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y = event.pageY;
      parent.style.width = styles.width;
      parent.style.height = styles.height;
      document.addEventListener('mousemove', listener);
      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', listener);
      });
    };

    return resizer;
  }
};
var _createHorizontalResizer = {
  writable: true,
  value: function value(parent, listener) {
    var horizontalResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createResizer).call(Resizable, parent, listener);

    horizontalResizer.style.width = '7px';
    horizontalResizer.style.height = '100%';
    horizontalResizer.style.top = 0;
    horizontalResizer.style.cursor = 'e-resize';
    return horizontalResizer;
  }
};
var _createVerticalResizer = {
  writable: true,
  value: function value(parent, listener) {
    var verticalResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createResizer).call(Resizable, parent, listener);

    verticalResizer.style.width = '100%';
    verticalResizer.style.height = '7px';
    verticalResizer.style.left = 0;
    verticalResizer.style.cursor = 'n-resize';
    return verticalResizer;
  }
};
var _createAngleResizer = {
  writable: true,
  value: function value(parent, listener) {
    var angleResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createResizer).call(Resizable, parent, listener);

    angleResizer.style.width = '10px';
    angleResizer.style.height = '10px';
    angleResizer.style.zIndex = 2;
    return angleResizer;
  }
};
var _createTopLeftResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';
      parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var topLeftResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createAngleResizer).call(Resizable, parent, onMouseMove);

    topLeftResizer.style.top = 0;
    topLeftResizer.style.left = 0;
    topLeftResizer.style.cursor = 'se-resize';
    return topLeftResizer;
  }
};
var _createBottomLeftResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';
      parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var bottomLeftResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createAngleResizer).call(Resizable, parent, onMouseMove);

    bottomLeftResizer.style.bottom = 0;
    bottomLeftResizer.style.left = 0;
    bottomLeftResizer.style.cursor = 'ne-resize';
    return bottomLeftResizer;
  }
};
var _createTopRightResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';
      parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var topRightResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createAngleResizer).call(Resizable, parent, onMouseMove);

    topRightResizer.style.top = 0;
    topRightResizer.style.right = 0;
    topRightResizer.style.cursor = 'ne-resize';
    return topRightResizer;
  }
};
var _createBottomRightResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';
      parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var bottomRightResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createAngleResizer).call(Resizable, parent, onMouseMove);

    bottomRightResizer.style.bottom = 0;
    bottomRightResizer.style.right = 0;
    bottomRightResizer.style.cursor = 'se-resize';
    return bottomRightResizer;
  }
};
var _createTopResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.height = parseInt(parent.style.height) - (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var topResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createVerticalResizer).call(Resizable, parent, onMouseMove);

    topResizer.style.top = 0;
    return topResizer;
  }
};
var _createBottomResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.height = parseInt(parent.style.height) + (newCursorPosition.y - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).y) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var bottomResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createVerticalResizer).call(Resizable, parent, onMouseMove);

    bottomResizer.style.bottom = 0;
    return bottomResizer;
  }
};
var _createRightResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) + (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var rightResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createHorizontalResizer).call(Resizable, parent, onMouseMove);

    rightResizer.style.right = 0;
    return rightResizer;
  }
};
var _createLeftResizer = {
  writable: true,
  value: function value(parent) {
    var onMouseMove = function onMouseMove(event) {
      var newCursorPosition = {
        x: event.pageX,
        y: event.pageY
      };
      event.stopPropagation();
      parent.style.width = parseInt(parent.style.width) - (newCursorPosition.x - _classStaticPrivateFieldSpecGet(Resizable, Resizable, _cursorPosition).x) + 'px';

      _classStaticPrivateFieldSpecSet(Resizable, Resizable, _cursorPosition, newCursorPosition);
    };

    var leftResizer = _classStaticPrivateFieldSpecGet(Resizable, Resizable, _createHorizontalResizer).call(Resizable, parent, onMouseMove);

    leftResizer.style.left = 0;
    return leftResizer;
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