# ResizableElements
ResizableElements is a script that allows you to add resizable elements to your page that can be stretched like windows in OS.

# Versions
* __resizableElements.js__ - _main_ version of the script. Made with the latest features of the language, as readable as possible, but it doesn’t work in all browsers.
* __resizableElements-сomp.js__ - _compatible_ version of the script. This is the _babel_-revised version code. Works in all browsers, but has more weight.
* __resizableElements-comp-min.js__ - _compressed_ code of the compatible script weight. It weighs a little. I did not check cross-browser compatibility, but it should be.

#Installation
Connect the script to the page, for this it is enough to add the following line to the end of the _body_ (or to the _head_):
```html
<script src="https://verzsut.github.io/ResizableElements/resizableElements.js"></script>
```
You can also download the script to your server and connect it from there.

# Example
You can see how the script works at this [link](https://codepen.io/VerZsuT/pen/YzyVgEW)

# Use with element classes
To make an element mutable, just add the _resizable_ class to it, in which case the element can be stretched to any sides and angles. You can control the stretching using the CSS properties _max-width_, _min-width_ and _max-height_, _min-height_.

If you want to add the possibility of stretching __only to any side/edge__, then you need to add the class _resizableOnly_ and the class _sides-<list of parties>_. For instance:
```html
<div class="resizableOnly sides-top-right-topRight"></div>
```
In this case, the element can be stretched at the top, right, and also in the upper right corner.

If you want to stretch __all sides except any__, then from the previous example change the class _resizableOnly_ to _resizableWithout_, and in _sides_ specify the parties that should be excluded.
```html
<div class="resizableWithout sides-top-right"></div>
```
In this case, the element can be stretched everywhere except the upper and right sides.

You can change the multiplier of changing the size of the element. Put the class _mult-<vertical_multiplier>-<horizontal_multiplier>_. This may be needed when an element expands at once in several directions. For example, with _margin: 0 auto_.

# Use with JS
You can make elements mutable using JS, namely the __Resizable.make__ method:
```js
let target = document.getElementById('target')
Resizable.make(target)
```
As a required argument, the function takes an element that must be made mutable. The second, optional arguments is an array of strings (sides) that can be dragged and multiplier.
```js
Resizable.make(element, ['left', 'bottom'], 2)
```
