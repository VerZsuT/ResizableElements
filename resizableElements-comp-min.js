"use strict";function _instanceof(a,b){return null!=b&&"undefined"!=typeof Symbol&&b[Symbol.hasInstance]?!!b[Symbol.hasInstance](a):a instanceof b}function _createForOfIteratorHelper(a){if("undefined"==typeof Symbol||null==a[Symbol.iterator]){if(Array.isArray(a)||(a=_unsupportedIterableToArray(a))){var b=0,c=function(){};return{s:c,n:function(){return b>=a.length?{done:!0}:{done:!1,value:a[b++]}},e:function(a){throw a},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var d,e,f=!0,g=!1;return{s:function(){d=a[Symbol.iterator]()},n:function(){var a=d.next();return f=a.done,a},e:function(a){g=!0,e=a},f:function(){try{f||null==d.return||d.return()}finally{if(g)throw e}}}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(c):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _classCallCheck(a,b){if(!_instanceof(a,b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function _classStaticPrivateFieldSpecSet(a,b,c,d){if(a!==b)throw new TypeError("Private static access of wrong provenance");if(c.set)c.set.call(a,d);else{if(!c.writable)throw new TypeError("attempted to set read only private field");c.value=d}return d}function _classStaticPrivateFieldSpecGet(a,b,c){if(a!==b)throw new TypeError("Private static access of wrong provenance");return c.get?c.get.call(a):c.value}var Resizable=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"make",value:function(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:["topLeft","top","topRight","right","bottomRight","bottom","bottomLeft","left"],d=document.createElement("div");d.style.width="100%",d.style.height="100%",d.style.position="relative",d.innerHTML=b.innerHTML;var e,f=_createForOfIteratorHelper(c);try{for(f.s();!(e=f.n()).done;){var g=e.value;"topLeft"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createTopLeftResizer).call(this,b)):"topRight"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createTopRightResizer).call(this,b)):"bottomLeft"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createBottomLeftResizer).call(this,b)):"bottomRight"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createBottomRightResizer).call(this,b)):"top"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createTopResizer).call(this,b)):"right"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createRightResizer).call(this,b)):"bottom"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createBottomResizer).call(this,b)):"left"===g?d.appendChild(_classStaticPrivateFieldSpecGet(this,a,_createLeftResizer).call(this,b)):void 0}}catch(a){f.e(a)}finally{f.f()}b.innerHTML="",b.appendChild(d)}}]),a}(),_cursorPosition={writable:!0,value:{x:0,y:0}},_createResizer={writable:!0,value:function(a,b){var c=document.createElement("button");return c.style.position="absolute",c.style.background="none",c.style.border="none",c.style.outline="none",c.style.padding=0,c.style.margin=0,c.style.zIndex=1,c.onmousedown=function(c){var d=window.getComputedStyle(a);_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x=c.pageX,_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y=c.pageY,a.style.width=d.width,a.style.height=d.height,document.addEventListener("mousemove",b),document.addEventListener("mouseup",function(){document.removeEventListener("mousemove",b)})},c}},_createHorizontalResizer={writable:!0,value:function(a,b){var c=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createResizer).call(Resizable,a,b);return c.style.width="7px",c.style.height="100%",c.style.top=0,c.style.cursor="e-resize",c}},_createVerticalResizer={writable:!0,value:function(a,b){var c=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createResizer).call(Resizable,a,b);return c.style.width="100%",c.style.height="7px",c.style.left=0,c.style.cursor="n-resize",c}},_createAngleResizer={writable:!0,value:function(a,b){var c=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createResizer).call(Resizable,a,b);return c.style.width="10px",c.style.height="10px",c.style.zIndex=2,c}},_createTopLeftResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createAngleResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)-(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",a.style.height=parseInt(a.style.height)-(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.top=0,b.style.left=0,b.style.cursor="se-resize",b}},_createBottomLeftResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createAngleResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)-(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",a.style.height=parseInt(a.style.height)+(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.bottom=0,b.style.left=0,b.style.cursor="ne-resize",b}},_createTopRightResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createAngleResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)+(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",a.style.height=parseInt(a.style.height)-(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.top=0,b.style.right=0,b.style.cursor="ne-resize",b}},_createBottomRightResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createAngleResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)+(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",a.style.height=parseInt(a.style.height)+(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.bottom=0,b.style.right=0,b.style.cursor="se-resize",b}},_createTopResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createVerticalResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.height=parseInt(a.style.height)-(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.top=0,b}},_createBottomResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createVerticalResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.height=parseInt(a.style.height)+(c.y-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).y)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.bottom=0,b}},_createRightResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createHorizontalResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)+(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.right=0,b}},_createLeftResizer={writable:!0,value:function(a){var b=_classStaticPrivateFieldSpecGet(Resizable,Resizable,_createHorizontalResizer).call(Resizable,a,function(b){var c={x:b.pageX,y:b.pageY};b.stopPropagation(),a.style.width=parseInt(a.style.width)-(c.x-_classStaticPrivateFieldSpecGet(Resizable,Resizable,_cursorPosition).x)+"px",_classStaticPrivateFieldSpecSet(Resizable,Resizable,_cursorPosition,c)});return b.style.left=0,b}};window.onload=function(){var a,b=document.getElementsByClassName("resizable"),c=document.getElementsByClassName("resizableOnly"),d=document.getElementsByClassName("resizableWithout"),e=["topLeft","top","topRight","right","bottomRight","bottom","bottomLeft","left"],f=_createForOfIteratorHelper(b);try{for(f.s();!(a=f.n()).done;){var g=a.value;Resizable.make(g)}}catch(a){f.e(a)}finally{f.f()}var h,i=_createForOfIteratorHelper(c);try{for(i.s();!(h=i.n()).done;){var j,k=h.value,l=_createForOfIteratorHelper(k.classList);try{for(l.s();!(j=l.n()).done;){var m=j.value,n=m.split("-"),o=n[0];if("sides"==o){var p=n.slice(1);Resizable.make(k,p)}}}catch(a){l.e(a)}finally{l.f()}}}catch(a){i.e(a)}finally{i.f()}var q,r=_createForOfIteratorHelper(d);try{for(r.s();!(q=r.n()).done;){var s,t=q.value,u=_createForOfIteratorHelper(t.classList);try{for(u.s();!(s=u.n()).done;){var v=s.value,w=v.split("-"),x=w[0];if("sides"==x){var y,z=w.slice(1),A=e,B=_createForOfIteratorHelper(z);try{for(B.s();!(y=B.n()).done;){var C=y.value;A.splice(A.indexOf(C),1)}}catch(a){B.e(a)}finally{B.f()}Resizable.make(t,A)}}}catch(a){u.e(a)}finally{u.f()}}}catch(a){r.e(a)}finally{r.f()}};