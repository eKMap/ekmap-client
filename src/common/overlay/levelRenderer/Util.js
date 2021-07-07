export class Util {


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.constructor
     * @description Constructor.
     *
     */
    constructor() {
        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Util.prototype.BUILTIN_OBJECT
         * @description is used to deal with the problem that objects such as Date cannot be traversed during merge
         */
        this.BUILTIN_OBJECT = {
            '[object Function]': 1,
            '[object RegExp]': 1,
            '[object Date]': 1,
            '[object Error]': 1,
            '[object CanvasGradient]': 1
        };

        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Util.prototype._ctx
         */
        this._ctx = null;

        /**
         * Property: _canvas
         * {Object}
         */
        this._canvas = null;

        /**
         * Property: _pixelCtx
         * {Object}
         */
        this._pixelCtx = null;

        /**
         * Property: _width
         * {Object}
         */
        this._width = null;

        /**
         * Property: _height
         * {Object}
         */
        this._height = null;

        /**
         * Property: _offsetX
         * {Object}
         */
        this._offsetX = 0;

        /**
         * Property: _offsetY
         * {Object}
         */
        this._offsetY = 0;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Util";

    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.clone
     * @description makes a deep copy of an object.
     *
     * @param {Object} source-the object to be copied.
     * @return {Object} The new object after copying.
     */
    clone(source) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (typeof source =='object' && source !== null) {
            var result = source;
            if (source instanceof Array) {
                result = [];
                for (var i = 0, len = source.length; i <len; i++) {
                    result[i] = this.clone(source[i]);
                }
            } else if (!BUILTIN_OBJECT[Object.prototype.toString.call(source)]) {
                result = {};
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        result[key] = this.clone(source[key]);
                    }
                }
            }

            return result;
        }

        return source;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.mergeItem
     * @description merges a single attribute of the source object to the target object.
     *
     * @param {Object} target-the target object.
     * @param {Object} source-source object.
     * @param {string} key-key.
     * @param {boolean} overwrite-Whether to overwrite.
     * @return {Object} target object
     */
    mergeItem(target, source, key, overwrite) {
        var BUILTIN_OBJECT = this.BUILTIN_OBJECT;
        if (source.hasOwnProperty(key)) {
            if (typeof target[key] =='object' &&
                !BUILTIN_OBJECT[Object.prototype.toString.call(target[key])]
            ) {
                // If you need to recursively cover, call merge recursively
                this.merge(
                    target[key],
                    source[key],
                    overwrite
                );
            } else if (overwrite || !(key in target)) {
                // Otherwise, only handle the case where overwrite is true or there is no such attribute in the target object
                target[key] = source[key];
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.merge
     * @description merges the attributes of the source object to the target object.
     *
     * @param {Object} target-the target object.
     * @param {Object} source-the source object.
     * @param {boolean} overwrite-Whether to overwrite.
     * @return {Object} The target object.
     */
    merge(target, source, overwrite) {
        for (var i in source) {
            this.mergeItem(target, source, i, overwrite);
        }

        return target;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.getContext
     * @description Get the Canvas context.
     * @return {Object} Context.
     */
    getContext() {
        if (!this._ctx) {
            this._ctx = document.createElement('canvas').getContext('2d');
        }
        return this._ctx;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.getPixelContext
     * @description Get the context dedicated to pixel picking.
     * @return {Object} Context dedicated to pixel picking.
     */
    getPixelContext() {
        if (!this._pixelCtx) {
            this._canvas = document.createElement('canvas');
            this._width = this._canvas.width;
            this._height = this._canvas.height;
            this._pixelCtx = this._canvas.getContext('2d');
        }
        return this._pixelCtx;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.adjustCanvasSize
     * @description If the coordinates are outside _canvas, change the size of _canvas, modify the size of canvas, you need to reset translate
     *
     * @param {number} x-the abscissa.
     * @param {number} y-the ordinate.
     *
     */
    adjustCanvasSize(x, y) {
        var _canvas = this._canvas;
        var _pixelCtx = this._pixelCtx;
        var _width = this._width;
        var _height = this._height;
        var _offsetX = this._offsetX;
        var _offsetY = this._offsetY;

        // Length added each time
        var _v = 100;
        var _flag;

        if (x + _offsetX> _width) {
            _width = x + _offsetX + _v;
            _canvas.width = _width;
            _flag = true;
        }

        if (y + _offsetY> _height) {
            _height = y + _offsetY + _v;
            _canvas.height = _height;
            _flag = true;
        }

        if (x <-_offsetX) {
            _offsetX = Math.ceil(-x / _v) * _v;
            _width += _offsetX;
            _canvas.width = _width;
            _flag = true;
        }

        if (y <-_offsetY) {
            _offsetY = Math.ceil(-y / _v) * _v;
            _height += _offsetY;
            _canvas.height = _height;
            _flag = true;
        }

        if (_flag) {
            _pixelCtx.translate(_offsetX, _offsetY);
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.getPixelOffset
     * @description Get the offset of the pixel canvas.
     * @return {Object} Offset.
     */
    getPixelOffset() {
        return {
            x: this._offsetX,
            y: this._offsetY
        };
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.indexOf
     * @description query the index of the element in the array
     * @return {Object} Offset.
     */
    indexOf(array, value) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i <len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Util.prototype.inherits
     * @description constructs class inheritance relationship
     *
     * @param {Function} clazz-source class.
     * @param {Function} baseClazz-base class.
     * @return {Object} Offset.
     */
    inherits(clazz, baseClazz) {
        var clazzPrototype = clazz.prototype;

        function F() {}

        F.prototype = baseClazz.prototype;
        clazz.prototype = new F();

        for (var prop in clazzPrototype) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
        clazz.constructor = clazz;
    }
}