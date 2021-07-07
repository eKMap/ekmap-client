import { Eventful } from './Eventful';
import { Config } from './Config';
import { SUtil } from './SUtil';

export class Handler extends Eventful {

    /**
     * @function Ekmap.LevelRenderer.Handler.constructor
     * @description Constructor.
     * @param {HTMLElement} root-drawing area.
     * @param {Ekmap.LevelRenderer.Storage} storage-Storage instance.
     * @param {Ekmap.LevelRenderer.Painter} painter-Painter instance.
     */
     constructor(root, storage, painter) {
        super(root, storage, painter);
        /**
         * @member {HTMLElement} Ekmap.LevelRenderer.Handler.prototype.root
         * @description drawing area
         */
        this.root = root;
        /**
         * @member {Ekmap.LevelRenderer.Storage} Ekmap.LevelRenderer.Handler.prototype.storage
         * @description Storage instance
         */
        this.storage = storage;
        /**
         * @member {Ekmap.LevelRenderer.Painter} Ekmap.LevelRenderer.Handler.prototype.Painter
         * @description Painter instance
         */
        this.painter = painter;
        /**
         * @member {number} [Ekmap.LevelRenderer.Handler.prototype._lastX=0]
         * @description The x coordinate value of the last mouse position
         */
        this._lastX = 0;
        /**
         * @member {number} [Ekmap.LevelRenderer.Handler.prototype._lastY=0]
         * @description The y coordinate value of the last mouse position
         */
        this._lastY = 0;
        /**
         * @member {number} [Ekmap.LevelRenderer.Handler.prototype._mouseX=0]
         * @description The x coordinate value of the current mouse position
         */
        this._mouseX = 0;
        /**
         * @member {number} [Ekmap.LevelRenderer.Handler.prototype._mouseY=0]
         * @description The y coordinate value of the current mouse position
         */
        this._mouseY = 0;
        /**
         * @member {Function} Ekmap.LevelRenderer.Handler.prototype._findHover
         * @description find Hover graphics
         */
        this._findHover = null;
        /**
         * @member {Object} Ekmap.LevelRenderer.Handler.prototype._domHover
         * @description highlight DOM
         */
        this._domHover = null;

        // Private variables identified by various events
        // this._hasfound = false; // Whether to find the hover graphic element
        // this._lastHover = null; // the last hover graphic element
        // this._mouseDownTarget = null;
        // this._draggingTarget = null; // the graphic element currently being dragged
        // this._isMouseDown = false;
        // this._isDragging = false;
        // this._lastMouseDownMoment;
        // this._lastTouchMoment;
        // this._lastDownButton;

        this._findHover = bind3Arg(findHover, this);
        this._domHover = painter.getDomHover();

        this.CLASS_NAME = "Ekmap.LevelRenderer.Handler";
        var domHandlers = {
            /**
             * Method: resize
             * Window size change response function.
             *
             * Parameters:
             * event-{Event} event.
             *
             */
            resize: function(event) {
                event = event || window.event;
                this._lastHover = null;
                this._isMouseDown = 0;

                // Distribute SuperMap.LevelRenderer.Config.EVENT.RESIZE event, global
                this.dispatch(Config.EVENT.RESIZE, event);
            },

            /**
             * Method: click
             * Click on the response function.
             *
             * Parameters:
             * event-{Event} event.
             *
             */
            click: function(event) {
                event = this._zrenderEventFixed(event);

                // Distribute the SuperMap.LevelRenderer.Config.EVENT.CLICK event
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable) ||
                    !_lastHover
                ) {

                    // The click event is triggered only after judging that no drag has occurred
                    if (this._clickThreshold <10) {
                        this._dispatchAgency(_lastHover, Config.EVENT.CLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: dblclick
             * Double-click the response function.
             *
             * Parameters:
             * event-{Event} event.
             *
             */
            dblclick: function(event) {
                event = event || window.event;
                event = this._zrenderEventFixed(event);

                // Distribute SuperMap.LevelRenderer.Config.EVENT.DBLCLICK event
                var _lastHover = this._lastHover;
                if ((_lastHover && _lastHover.clickable) ||
                    !_lastHover
                ) {

                    // The dblclick event is triggered only if there is no dragging
                    if (this._clickThreshold <5) {
                        this._dispatchAgency(_lastHover, Config.EVENT.DBLCLICK, event);
                    }
                }

                this._mousemoveHandler(event);
            },

            /**
             * Method: mousewheel
             * Mouse wheel response function.
             *
             * Parameters:
             * event-{Event} event.
             *
             */
            mousewheel: function(event) {
                event = this._zrenderEventFixed(event);

                // http://www.sitepoint.com/html5-javascript-mouse-wheel/
                // https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
                var delta = event.wheelDelta // Webkit
                ||
                -event.detail; // Firefox
            var scale = delta> 0? 1.1: 1 / 1.1;

            var layers = this.painter.getLayers();

            var needsRefresh = false;
            for (var z in layers) {
                if (z !=='hover') {
                    var layer = layers[z];
                    var pos = layer.position;
                    if (layer.zoomable) {
                        layer.__zoom = layer.__zoom || 1;
                        var newZoom = layer.__zoom;
                        newZoom *= scale;
                        newZoom = Math.max(
                            Math.min(layer.maxZoom, newZoom),
                            layer.minZoom
                        );
                        scale = newZoom / layer.__zoom;
                        layer.__zoom = newZoom;
                        // Keep the mouse center when scaling
                        pos[0] -= (this._mouseX-pos[0]) * (scale-1);
                        pos[1] -= (this._mouseY-pos[1]) * (scale-1);
                        layer.scale[0] *= scale;
                        layer.scale[1] *= scale;
                        layer.dirty = true;
                        needsRefresh = true;
                    }
                }
            }
            if (needsRefresh) {
                this.painter.refresh();
            }

            // Distribute the SuperMap.LevelRenderer.Config.EVENT.MOUSEWHEEL event
            this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEWHEEL, event);
            this._mousemoveHandler(event);
        },

        /**
         * Method: mousemove
         * Mouse (finger) movement response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        mousemove: function(event) {
            // Dragging does not trigger the click event
            this._clickThreshold++;

            event = this._zrenderEventFixed(event);
            this._lastX = this._mouseX;
            this._lastY = this._mouseY;
            this._mouseX = SUtil.Util_event.getX(event);
            this._mouseY = SUtil.Util_event.getY(event);
            var dx = this._mouseX-this._lastX;
            var dy = this._mouseY-this._lastY;

            // SuperMap.LevelRenderer.Config.EVENT.DRAGSTART event may appear
            // Avoid trembling and clicking mistakenly thinking of dragging
            // if (this._mouseX-this._lastX> 1 || this._mouseY-this._lastY> 1) {
            this._processDragStart(event);
            //}
            this._hasfound = 0;
            this._event = event;

            this._iterateAndFindHover();

            // The ones that are found are processed in the iterative function, and those that are not found are processed after the iteration
            if (!this._hasfound) {
                // Filter mouseout and dragLeave generated by the first drag
                if (!this._draggingTarget ||
                    (this._lastHover && this._lastHover != this._draggingTarget)
                ) {
                    // SuperMap.LevelRenderer.Config.EVENT.MOUSEOUT event may appear
                    this._processOutShape(event);

                    // SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE event may appear
                    this._processDragLeave(event);
                }

                this._lastHover = null;
                this.storage.delHover();
                this.painter.clearHover();
            }

            // set cursor for root element
            var cursor ='';

            // If there is a dragging element, the dragged graphic element is finally addHover
            if (this._draggingTarget) {
                this.storage.drift(this._draggingTarget.id, dx, dy);
                this._draggingTarget.modSelf();
                this.storage.addHover(this._draggingTarget);
            } else if (this._isMouseDown) {
                // Layer dragging
                var layers = this.painter.getLayers();

                var needsRefresh = false;
                for (var z in layers) {
                    if (z !=='hover') {
                        var layer = layers[z];
                        if (layer.panable) {
                            // PENDING
                            cursor ='move';
                            // Keep the mouse center when scaling
                            layer.position[0] += dx;
                            layer.position[1] += dy;
                            needsRefresh = true;
                            layer.dirty = true;
                        }
                    }
                }
                if (needsRefresh) {
                    this.painter.refresh();
                }
            }

            if (this._draggingTarget || (this._hasfound && this._lastHover.draggable)) {
                cursor ='move';
            } else if (this._hasfound && this._lastHover.clickable) {
                cursor ='pointer';
            }
            this.root.style.cursor = cursor;

            // Distribute the SuperMap.LevelRenderer.Config.EVENT.MOUSEMOVE event
            this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEMOVE, event);

            if (this._draggingTarget || this._hasfound || this.storage.hasHoverShape()) {
                this.painter.refreshHover();
            }
        },

        /**
         * Method: mouseout
         * The mouse (finger) leaves the response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        mouseout: function(event) {
            event = this._zrenderEventFixed(event);

            var element = event.toElement || event.relatedTarget;
            if (element != this.root) {
                while (element && element.nodeType != 9) {
                    // Ignore mouseOut caused by dom contained in root
                    if (element == this.root) {
                        this._mousemoveHandler(event);
                        return;
                    }

                    element = element.parentNode;
                }
            }

            event.zrenderX = this._lastX;
            event.zrenderY = this._lastY;
            this.root.style.cursor ='';
            this._isMouseDown = 0;

            this._processOutShape(event);
            this._processDrop(event);
            this._processDragEnd(event);

            this.painter.refreshHover();

            this.dispatch(Config.EVENT.GLOBALOUT, event);
        },

        /**
         * Method: mousedown
         * Mouse (finger) press response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        mousedown: function(event) {
            // reset clickThreshold
            this._clickThreshold = 0;

            if (this._lastDownButton == 2) {
                this._lastDownButton = event.button;
                this._mouseDownTarget = null;
                // Only used to close the right-click menu
                return;
            }

            this._lastMouseDownMoment = new Date();
            event = this._zrenderEventFixed(event);
            this._isMouseDown = 1;

            // Distribute the SuperMap.LevelRenderer.Config.EVENT.MOUSEDOWN event
            this._mouseDownTarget = this._lastHover;
            this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEDOWN, event);
            this._lastDownButton = event.button;
        },

        /**
         * Method: mouseup
         * The mouse (finger) raises the response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        mouseup: function(event) {
            event = this._zrenderEventFixed(event);
            this.root.style.cursor ='';
            this._isMouseDown = 0;
            this._mouseDownTarget = null;

            // Distribute the SuperMap.LevelRenderer.Config.EVENT.MOUSEUP event
            this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEUP, event);
            this._processDrop(event);
            this._processDragEnd(event);
        },

        /**
         * Method: touchstart
         * Touch starts to respond to the function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        touchstart: function(event) {
            // SUtil.Util_event.stop(event);// Prevent browser default events, important
            event = this._zrenderEventFixed(event, true);
            this._lastTouchMoment = new Date();

            // Tablet supplement findHover once
            this._mobildFindFixed(event);
            this._mousedownHandler(event);
        },

        /**
         * Method: touchmove
         * Touch mobile response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        touchmove: function(event) {
            event = this._zrenderEventFixed(event, true);
            this._mousemoveHandler(event);
            if (this._isDragging) {
                SUtil.Util_event.stop(event); // Prevent browser default events, important
            }
        },

        /**
         * Method: touchend
         * Touch end response function.
         *
         * Parameters:
         * event-{Event} event.
         *
         */
        touchend: function(event) {
            // SUtil.Util_event.stop(event);// Prevent browser default events, important
            event = this._zrenderEventFixed(event, true);
            this._mouseupHandler(event);

            var now = new Date();
            if (now-this._lastTouchMoment <Config.EVENT.touchClickDelay) {
                this._mobildFindFixed(event);
                this._clickHandler(event);
                if (now-this._lastClickMoment <Config.EVENT.touchClickDelay / 2) {
                    this._dblclickHandler(event);
                    if (this._lastHover && this._lastHover.clickable) {
                        SUtil.Util_event.stop(event); // Prevent browser default events, important
                    }
                }
                this._lastClickMoment = now;
            }
            this.painter.clearHover();
        }
    };

    initDomHandler(this);

    // Initialization, event binding, all events supported are calculated from the following native events
    if (window.addEventListener) {
        window.addEventListener('resize', this._resizeHandler);

        if (SUtil.Util_env.os.tablet || SUtil.Util_env.os.phone) {
            // mobile support
            root.addEventListener('touchstart', this._touchstartHandler);
            root.addEventListener('touchmove', this._touchmoveHandler);
            root.addEventListener('touchend', this._touchendHandler);
        } else {
            // imitate the click/move/up/down of mobile
            root.addEventListener('click', this._clickHandler);
            root.addEventListener('dblclick', this._dblclickHandler);
            root.addEventListener('mousewheel', this._mousewheelHandler);
            root.addEventListener('mousemove', this._mousemoveHandler);
            root.addEventListener('mousedown', this._mousedownHandler);
            root.addEventListener('mouseup', this._mouseupHandler);
        }
        root.addEventListener('DOMMouseScroll', this._mousewheelHandler);
        root.addEventListener('mouseout', this._mouseoutHandler);
    } else {
        window.attachEvent('onresize', this._resizeHandler);

        root.attachEvent('onclick', this._clickHandler);
        //root.attachEvent('ondblclick', this._dblclickHandler);
        root.ondblclick = this._dblclickHandler;
        root.attachEvent('onmousewheel', this._mousewheelHandler);
        root.attachEvent('onmousemove', this._mousemoveHandler);
        root.attachEvent('onmouseout', this._mouseoutHandler);
        root.attachEvent('onmousedown', this._mousedownHandler);
        root.attachEvent('onmouseup', this._mouseupHandler);
    }

    // auxiliary function start
    /**
     * Method: bind1Arg
     * bind a parameter function.
     *
     * Parameters:
     * handler-{Function} The function to be bound.
     * context-{Object} this environment at runtime.
     *
     * Returns:
     * {Function}
     */
    function bind1Arg(handler, context) {
        return function(e) {
            return handler.call(context, e);
        };
    }

    /*
     // bind function with two parameters
     function bind2Arg(handler, context) {
     return function (arg1, arg2) {
     return handler.call(context, arg1, arg2);
     };
     }
     */

    // bind function with three parameters
    function bind3Arg(handler, context) {
        return function(arg1, arg2, arg3) {
            return handler.call(context, arg1, arg2, arg3);
        };
    }

    /**
     * Method: initDomHandler
     * Initialize the dom event handler for the control class instance.
     *
     * Parameters:
     * instance-{<Ekmap.LevelRenderer.Handler>} instance of the control class.
     *
     * Returns:
     * {Function}
     */
    function initDomHandler(instance) {
        var domHandlerNames = [
            'resize','click','dblclick',
            'mousewheel','mousemove','mouseout','mouseup','mousedown',
            'touchstart','touchend','touchmove'
        ];

        var len = domHandlerNames.length;
        while (len--) {
            var name = domHandlerNames[len];
            instance['_' + name +'Handler'] = bind1Arg(domHandlers[name], instance);
        }
    }

    /**
     * Method: findHover
     * Iterate function, find the graphic element hovered and do some event distribution in real time.
     *
     * Parameters:
     * shape-{Object} shape.
     * x-{number} mouse x.
     * y-{number} mouse y.
     *
     * Returns:
     * {boolean} Whether to find graphics.
     *
     */
    function findHover(shape, x, y) {
        var me = this;
        if (
            (me._draggingTarget && me._draggingTarget.id == shape.id) // Iterate to the currently dragged graph
            ||
            shape.isSilent() // When passing by with soy sauce, the shape that doesn't respond to anything~
        ) {
            return false;
        }

        var event = me._event;
        if (shape.isCover(x, y)) {
            if (shape.hoverable) {
                // SMIC-modify-start
                if (shape.isHoverByRefDataID && shape.isHoverByRefDataID === true) {
                    if (shape.refDataID) {
                        var fid = shape.refDataID;//me.painter.clearHover();
                        //me.storage.delHover();

                        var hoverGroup = null;
                        if (shape.refDataHoverGroup) {
                            hoverGroup = shape.refDataHoverGroup;
                        }

                        //Find all graphics of the same user data feature
                        var shapeList = me.storage._shapeList;
                        for (var i = 0, len = shapeList.length; i <len; i++) {
                            var si = shapeList[i];
                            if (si.refDataID && fid === si.refDataID) {
                                if (hoverGroup) {
                                    if (si.refDataHoverGroup && hoverGroup === si.refDataHoverGroup) {
                                        me.storage.addHover(si);
                                    }
                                } else {
                                    me.storage.addHover(si);
                                }
                            }
                        }
                    }
                } else {
                    me.storage.addHover(shape);
                }
                //Initial code:
                // me.storage.addHover(shape);
                // SMIC-modify-end
            }
            // Find if it is in clipShape
            var p = shape.parent;
            while (p) {
                if (p.clipShape && !p.clipShape.isCover(me._mouseX, me._mouseY)) {
                    // Has been dropped by the ancestor clip
                    return false;
                }
                p = p.parent;
            }

            if (me._lastHover != shape) {
                me._processOutShape(event);

                // SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE event may appear
                me._processDragLeave(event);

                me._lastHover = shape;

                // SuperMap.LevelRenderer.Config.EVENT.DRAGENTER event may appear
                me._processDragEnter(event);
            }

            me._processOverShape(event);

            // SuperMap.LevelRenderer.Config.EVENT.DRAGOVER may appear
            me._processDragOver(event);

            me._hasfound = 1;

            return true; // Interrupt iterative search if found
        }

        return false;
    }

    // auxiliary function end
}

/**
 * @function Ekmap.LevelRenderer.Handler.prototype.destroy
 * @description destroys the object and releases resources. All properties will be set to null after calling this function.
 */
destroy() {
    this.dispose();
    this._lastX = null;
    this._lastY = null;
    this._mouseX = null;
    this._mouseY = null;
    this._findHover = null;

    Eventful.prototype.destroy.apply(this, arguments);
}


/**
 * @function Ekmap.LevelRenderer.Handler.prototype.on
 * @description Custom event binding.
 * @param {string} eventName-event name, resize, hover, drag, etc.
 * @param {function} handler-response function.
 * @returns {Ekmap.LevelRenderer.Handler} this.
 */
on(eventName, handler) {
    this.bind(eventName, handler);
    return this;
}

/**
 * @function Ekmap.LevelRenderer.Handler.prototype.un
 * @description Custom event unbinding.
 * @param {string} eventName-event name, resize, hover, drag, etc.
 * @param {function} handler-response function.
 * @returns {Ekmap.LevelRenderer.Handler} this.
 */
un(eventName, handler) {
    this.unbind(eventName, handler);
    return this;
}

/**
 * @function Ekmap.LevelRenderer.Handler.prototype.trigger
 * @description event is triggered.
 * @param {string} eventName-event name, resize, hover, drag, etc.
 * @param {event} eventArgs-dom event object.
 */
trigger(eventName, eventArgs) {
    var EVENT = Config.EVENT;
    switch (eventName) {
        case EVENT.RESIZE:
        case EVENT.CLICK:
        case EVENT.DBLCLICK:
        case EVENT.MOUSEWHEEL:
        case EVENT.MOUSEMOVE:
        case EVENT.MOUSEDOWN:
        case EVENT.MOUSEUP:
        case EVENT.MOUSEOUT:
            this['_' + eventName +'Handler'](eventArgs);
            break;
    }
}

/**
 * @function Ekmap.LevelRenderer.Handler.prototype.dispose
 * @description Release and unbind all events.
 */
dispose() {
    var root = this.root;

    if (window.removeEventListener) {
        window.removeEventListener('resize', this._resizeHandler);

        if (SUtil.Util_env.os.tablet || SUtil.Util_env.os.phone) {
            // mobile support
            root.removeEventListener('touchstart', this._touchstartHandler);
            root.removeEventListener('touchmove', this._touchmoveHandler);
            root.removeEventListener('touchend', this._touchendHandler);
        } else {
            // The mobile click simulates itself
            root.removeEventListener('click', this._clickHandler);
            root.removeEventListener('dblclick', this._dblclickHandler);
            root.removeEventListener('mousewheel', this._mousewheelHandler);
            root.removeEventListener('mousemove', this._mousemoveHandler);
            root.removeEventListener('mousedown', this._mousedownHandler);
            root.removeEventListener('mouseup', this._mouseupHandler);
        }
        root.removeEventListener('DOMMouseScroll', this._mousewheelHandler);
        root.removeEventListener('mouseout', this._mouseoutHandler);
    } else {
        window.detachEvent('onresize', this._resizeHandler);

        root.detachEvent('onclick', this._clickHandler);
        root.detachEvent('dblclick', this._dblclickHandler);
        root.detachEvent('onmousewheel', this._mousewheelHandler);
        root.detachEvent('onmousemove', this._mousemoveHandler);
        root.detachEvent('onmouseout', this._mouseoutHandler);
        root.detachEvent('onmousedown', this._mousedownHandler);
        root.detachEvent('onmouseup', this._mouseupHandler);
    }

    this.root = null;
    this._domHover = null;
    this.storage = null;
    this.painter = null;

    this.un();
}


/**
 * Method: _processDragStart
 * Drag and drop to start.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDragStart(event) {
    var _lastHover = this._lastHover;

    if (this._isMouseDown &&
        _lastHover &&
        _lastHover.draggable &&
        !this._draggingTarget &&
        this._mouseDownTarget == _lastHover
    ) {
        // Drag and click the valve for the effective time, some scenes need to reduce the drag sensitivity
        if (_lastHover.dragEnableTime &&
            new Date()-this._lastMouseDownMoment <_lastHover.dragEnableTime
        ) {
            return;
        }

        var _draggingTarget = _lastHover;
        this._draggingTarget = _draggingTarget;
        this._isDragging = 1;

        _draggingTarget.invisible = true;
        this.storage.mod(_draggingTarget.id);

        // Distribute the Config.EVENT.DRAGSTART event
        this._dispatchAgency(
            _draggingTarget,
            Config.EVENT.DRAGSTART,
            event
        );
        this.painter.refresh();
    }
}


/**
 * Method: _processDragEnter
 * Drag and drop into the target element.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDragEnter(event) {
    if (this._draggingTarget) {
        // Distribute the SuperMap.LevelRenderer.Config.EVENT.DRAGENTER event
        this._dispatchAgency(
            this._lastHover,
            Config.EVENT.DRAGENTER,
            event,
            this._draggingTarget
        );
    }
}


/**
 * Method: _processDragOver
 * Drag and drop to move on the target element.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDragOver(event) {
    if (this._draggingTarget) {
        // Distribute the SuperMap.LevelRenderer.Config.EVENT.DRAGOVER event
        this._dispatchAgency(
            this._lastHover,
            Config.EVENT.DRAGOVER,
            event,
            this._draggingTarget
        );
    }
}


/**
 * Method: _processDragLeave
 * Drag and drop to leave the target element.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDragLeave(event) {
    if (this._draggingTarget) {
        // Distribute the SuperMap.LevelRenderer.Config.EVENT.DRAGLEAVE event
        this._dispatchAgency(
            this._lastHover,
            Config.EVENT.DRAGLEAVE,
            event,
            this._draggingTarget
        );
    }
}


/**
 * Method: _processDrop
 * Drag and drop are completed on the target element.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDrop(event) {
    if (this._draggingTarget) {
        this._draggingTarget.invisible = false;
        this.storage.mod(this._draggingTarget.id);
        this.painter.refresh();

        // Distribute SuperMap.LevelRenderer.Config.EVENT.DROP event
        this._dispatchAgency(
            this._lastHover,
            Config.EVENT.DROP,
            event,
            this._draggingTarget
        );
    }
}


/**
 * Method: _processDragEnd
 * Drag and drop ends.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processDragEnd(event) {
    if (this._draggingTarget) {
        // Distribute the SuperMap.LevelRenderer.Config.EVENT.DRAGEND event
        this._dispatchAgency(
            this._draggingTarget,
            Config.EVENT.DRAGEND,
            event
        );

        this._lastHover = null;
    }

    this._isDragging = 0;
    this._draggingTarget = null;
}


/**
 * Method: _processOverShape
 * The mouse moves on a certain graphic element.
 *
 * Parameters:
 * event-{Object} event object.
 *
 */
_processOverShape(event) {
    // Distribute SuperMap.LevelRenderer.Config.EVENT.MOUSEOVER event
        this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEOVER, event);
    }


    /**
     * Method: _processOutShape
     * The mouse leaves a graphic element.
     *
     * Parameters:
     * event-{Object} event object.
     *
     */
    _processOutShape(event) {
        // Distribute the SuperMap.LevelRenderer.Config.EVENT.MOUSEOUT event
        this._dispatchAgency(this._lastHover, Config.EVENT.MOUSEOUT, event);
    }


    /**
     * Method: _dispatchAgency
     * The mouse leaves a graphic element.
     *
     * Parameters:
     * targetShape-{Object} target graphic element.
     * eventName-{Object} event name.
     * event-{Object} event object.
     * draggedShape-{Object} unique to drag events, the graphic element currently being dragged.
     *
     */
    _dispatchAgency(targetShape, eventName, event, draggedShape) {
        var eventHandler ='on' + eventName;
        var eventPacket = {
            type: eventName,
            event: event,
            target: targetShape,
            cancelBubble: false
        };

        var el = targetShape;

        if (draggedShape) {
            eventPacket.dragged = draggedShape;
        }

        while (el) {
            el[eventHandler] &&
                (eventPacket.cancelBubble = el[eventHandler](eventPacket));
            el.dispatch(eventName, eventPacket);

            el = el.parent;

            if (eventPacket.cancelBubble) {
                break;
            }
        }

        if (targetShape) {
            // bubble to the top-level zrender object
            if (!eventPacket.cancelBubble) {
                this.dispatch(eventName, eventPacket);
            }
        } else if (!draggedShape) {
            // No hover target, no drag and drop object, native event distribution
            this.dispatch(eventName, {
                type: eventName,
                event: event
            });
        }
    }


    /**
     * Method: _iterateAndFindHover
     * Iteratively find hover shape.
     *
     */
    _iterateAndFindHover() {
        var invTransform = SUtil.Util_matrix.create();

        var list = this.storage.getShapeList();
        var currentZLevel;
        var currentLayer;
        var tmp = [0, 0];
        for (var i = list.length-1; i >= 0; i--) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                currentLayer = this.painter.getLayer(shape.zlevel, currentLayer);
                tmp[0] = this._mouseX;
                tmp[1] = this._mouseY;

                if (currentLayer.needTransform) {
                    SUtil.Util_matrix.invert(invTransform, currentLayer.transform);
                    SUtil.Util_vector.applyTransform(tmp, tmp, invTransform);
                }
            }

            if (this._findHover(shape, tmp[0], tmp[1])) {
                break;
            }
        }
    }


    /**
     * Method: _mobildFindFixed
     * touch has the illusion of fingertips, try in four directions to make the click on the touch better trigger the event.
     *
     * Parameters:
     * event-{Object} event object.
     *
     */
    _mobildFindFixed(event) {
        // Try offset configuration of touch fingertip illusion
        var MOBILE_TOUCH_OFFSETS = [
            {x: 10 },
            {x: -20 },
            {x: 10, y: 10 },
            {y: -20}
        ];

        this._lastHover = null;
        this._mouseX = event.zrenderX;
        this._mouseY = event.zrenderY;

        this._event = event;

        this._iterateAndFindHover();

        for (var i = 0; !this._lastHover && i <MOBILE_TOUCH_OFFSETS.length; i++) {
            var offset = MOBILE_TOUCH_OFFSETS[i];
            offset.x && (this._mouseX += offset.x);
            offset.y && (this._mouseX += offset.y);

            this._iterateAndFindHover();
        }

        if (this._lastHover) {
            event.zrenderX = this._mouseX;
            event.zrenderY = this._mouseY;
        }
    }


    /**
     * Method: _zrenderEventFixed
     * If there are some dom-triggered events or touch events embedded by a third party, you need to convert the event coordinates.
     *
     * Parameters:
     * event-{Object} event.
     * isTouch-{boolean} Whether to touch.
     *
     */
    _zrenderEventFixed(event, isTouch) {
        if (event.zrenderFixed) {
            return event;
        }

        if (!isTouch) {
            event = event || window.event;
            // Priority to enter the object~
            var target = event.toElement ||
                event.relatedTarget ||
                event.srcElement ||
                event.target;

            if (target && target != this._domHover) {
                event.zrenderX = (typeof event.offsetX !='undefined'?
                        event.offsetX:
                        event.layerX) +
                    target.offsetLeft;
                event.zrenderY = (typeof event.offsetY !='undefined'?
                        event.offsetY:
                        event.layerY) +
                    target.offsetTop;
            }
        } else {
            var touch = event.type !='touchend'?
                event.targetTouches[0]:
                event.changedTouches[0];
            if (touch) {
                var rBounding = this.root.getBoundingClientRect();
                // The touch event coordinates are full screen~
                event.zrenderX = touch.clientX-rBounding.left;event.zrenderY = touch.clientY-rBounding.top;
            }
        }

        event.zrenderFixed = 1;
        return event;
    }


    // SMIC-Method Extension-start

    /**
     * @function Ekmap.LevelRenderer.Handler.prototype.getLastHoverOne
     * @description Get a single highlighted graphic
     */
    getLastHoverOne() {
        if (this._lastHover) {
            return this._lastHover;
        }
        return null;
    }

    // SMIC-Method Extension-end

}