/**
 * Bạn có thể không cần jQuery (Static)
 * @constructor
 */
var gclient_element = {};

/**
 * Bạn có thể không cần jQuery
 * @param {string} tagName The element tag, use 'TEXT' to create a text node
 * @param {*} options
 *  @param {string} options.className className The element class name 
 *  @param {Element} options.parent Parent to append the element as child
 *  @param {Element|string} options.html Content of the element
 *  @param {string} options.* Any other attribut to add to the element
 */
gclient_element.create = function (tagName, options) {
  options = options || {};
  var elt;
  // Create text node
  if (tagName === 'TEXT') {
    elt = document.createTextNode(options.html||'');
    if (options.parent) options.parent.appendChild(elt);
  } else {
    // Other element
    elt = document.createElement(tagName);
    if (/button/i.test(tagName)) elt.setAttribute('type', 'button');
    for (var attr in options) {
      switch (attr) {
        case 'className': {
          if (options.className && options.className.trim) elt.setAttribute('class', options.className.trim());
          break;
        }
        case 'html': {
          if (options.html instanceof Element) elt.appendChild(options.html)
          else if (options.html!==undefined) elt.innerHTML = options.html;
          break;
        }
        case 'parent': {
          options.parent.appendChild(elt);
          break;
        }
        case 'style': {
          this.setStyle(elt, options.style);
          break;
        }
        case 'change':
        case 'click': {
          gclient_element.addListener(elt, attr, options[attr]);
          break;
        }
        case 'on': {
          for (var e in options.on) {
            gclient_element.addListener(elt, e, options.on[e]);
          }
          break;
        }
        case 'checked': {
          elt.checked = !!options.checked;
          break;
        }
        default: {
          elt.setAttribute(attr, options[attr]);
          break;
        }
      }
    }
  }
  return elt;
};

/** Set inner html or append a child element to an element
 * @param {Element} element
 * @param {Element|string} html Content of the element
 */
gclient_element.setHTML = function(element, html) {
  if (html instanceof Element) element.appendChild(html)
  else if (html!==undefined) element.innerHTML = html;
};

/** Append text into an elemnt
 * @param {Element} element
 * @param {string} text text content
 */
gclient_element.appendText = function(element, text) {
  element.appendChild(document.createTextNode(text||''));
};

/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */
gclient_element.addListener = function (element, eventType, fn) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function(e) {
    element.addEventListener(e, fn);
  });
};

/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */
gclient_element.removeListener = function (element, eventType, fn) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function(e) {
    element.removeEventListener(e, fn);
  });
};

/**
 * Show an element
 * @param {Element} element
 */
gclient_element.show = function (element) {
  element.style.display = '';
};

/**
 * Hide an element
 * @param {Element} element
 */
gclient_element.hide = function (element) {
  element.style.display = 'none';
};

/**
 * Test if an element is hihdden
 * @param {Element} element
 * @return {boolean}
 */
gclient_element.hidden = function (element) {
  return gclient_element.getStyle(element, 'display') === 'none';
};

/**
 * Toggle an element
 * @param {Element} element
 */
gclient_element.toggle = function (element) {
  element.style.display = (element.style.display==='none' ? '' : 'none');
};

/** Set style of an element
 * @param {DOMElement} el the element
 * @param {*} st list of style
 */
gclient_element.setStyle = function(el, st) {
  for (var s in st) {
    switch (s) {
      case 'top':
      case 'left':
      case 'bottom':
      case 'right':
      case 'minWidth':
      case 'maxWidth':
      case 'width':
      case 'height': {
        if (typeof(st[s]) === 'number') {
          el.style[s] = st[s]+'px';
        } else {
          el.style[s] = st[s];
        }
        break;
      }
      default: {
        el.style[s] = st[s];
      }
    }
  }
};

/**
 * Get style propertie of an element
 * @param {DOMElement} el the element
 * @param {string} styleProp Propertie name
 * @return {*} style value
 */
gclient_element.getStyle = function(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    value = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
  }
  if (/px$/.test(value)) return parseInt(value);
  return value;
};

/** Get outerHeight of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */
gclient_element.outerHeight = function(elt) {
  return elt.offsetHeight + gclient_element.getStyle(elt, 'marginBottom')
};

/** Check class exist element
 * @param {DOMElement} elt
 * @param {String} css
 * @return {Boolean}
 */
gclient_element.hasClass = function(elt, css) {
  return elt.classList.contains(css);
};

/** Add css to element
 * @param {DOMElement} elt
 * @param {String} css
 */
gclient_element.addClass = function(elt,css) {
  elt.classList.add(css);
};

/** remove css to element
 * @param {DOMElement} elt
 * @param {String} css
 */
gclient_element.removeClass = function(elt,css) {
  elt.classList.remove(css);
};

/** Get outerWidth of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */
gclient_element.outerWidth = function(elt) {
  return elt.offsetWidth + gclient_element.getStyle(elt, 'marginLeft')
};

/** Get element offset rect
 * @param {DOMElement} elt
 * @return {*} 
 */
gclient_element.offsetRect = function(elt) {
  var rect = elt.getBoundingClientRect();
  return {
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    height: rect.height || (rect.bottom - rect.top),
    width: rect.widtth || (rect.right - rect.left)
  }
};

/** Make a div scrollable without scrollbar.
 * On touch devices the default behavior is preserved
 * @param {DOMElement} elt
 * @param {function} onmove a function that takes a boolean indicating that the div is scrolling
 */
gclient_element.scrollDiv = function(elt, options) {
  var pos = false;
  var speed = 0;
  var d, dt = 0;

  var onmove = (typeof(options.onmove) === 'function' ? options.onmove : function(){});
  var page = options.vertical ? 'pageY' : 'pageX';
  var scroll = options.vertical ? 'scrollTop' : 'scrollLeft';
  var moving = false;

  // Prevent image dragging
  elt.querySelectorAll('img').forEach(function(i) {
    i.ondragstart = function(){ return false; };
  });
  
  // Start scrolling
  gclient_element.addListener(elt, ['mousedown'], function(e) {
    moving = false;
    pos = e[page];
    dt = new Date();
    elt.classList.add('ol-move');
  });
  
  // Register scroll
  gclient_element.addListener(window, ['mousemove'], function(e) {
    moving = true;
    if (pos !== false) {
      var delta = pos - e[page];
      elt[scroll] += delta;
      d = new Date();
      if (d-dt) {
        speed = (speed + delta / (d - dt))/2;
      }
      pos = e[page];
      dt = d;
      // Tell we are moving
      if (delta) onmove(true);
    } else {
      // Not moving yet
      onmove(false);
    }
  });
  
  // Stop scrolling
  gclient_element.addListener(window, ['mouseup'], function(e) {
    if (moving) setTimeout (function() { elt.classList.remove('ol-move'); });
    else elt.classList.remove('ol-move');
    moving = false;
    dt = new Date() - dt;
    if (dt>100) {
      // User stop: no speed
      speed = 0;
    } else if (dt>0) {
      // Calculate new speed
      speed = ((speed||0) + (pos - e[page]) / dt) / 2;
    }
    elt[scroll] += speed*100;
    pos = false;
    speed = 0;
    dt = 0;
  });

  // Handle mousewheel
  if (options.mousewheel && !elt.classList.contains('ol-touch')) {
    gclient_element.addListener(elt, 
      ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], 
      function(e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        elt.classList.add('ol-move');
        elt[scroll] -= delta*30;
        elt.classList.remove('ol-move');
        return false;
      }
    );
  }
};

/** Dispatch an event to an Element 
 * @param {string} eventName
 * @param {Element} element
*/
gclient_element.dispatchEvent = function (eventName, element) {
  var event;
  try {
    event = new CustomEvent(eventName);
  } catch(e) {
    // Try customevent on IE
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, true, true, {});
  }
  element.dispatchEvent(event);
};

export default gclient_element
