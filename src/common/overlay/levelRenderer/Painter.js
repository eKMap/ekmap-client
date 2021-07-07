import { Transformable } from './Transformable';
import { SmicImage } from './SmicImage';
import { Util as CommonUtil } from '../../commontypes/Util';
import { Util } from './Util';
import { Config } from './Config';
import { SUtil } from './SUtil';

export class Painter {

   /**
     * @function Ekmap.LevelRenderer.Painter.constructor
     * @description Constructor.
     *
     * @param {HTMLElement} root-drawing area (DIV).
     * @param {Ekmap.LevelRenderer.Storage} storage-Storage instance.
     *
     */
    constructor(root, storage) {
        /**
         * @member {HTMLElement} Ekmap.LevelRenderer.Painter.prototype.root
         * @description drawing container.
         *
         */
        this.root = root;

        /**
         * @member {Array} Ekmap.LevelRenderer.Painter.prototype.storage
         * @description Graphic warehouse.
         *
         */
        this.storage = storage;

        /**
         * @member {HTMLElement} Ekmap.LevelRenderer.Painter.prototype._domRoot
         * @description The root dom object of the container.
         *
         */
        this._domRoot = null;

        /**
         * @member {Object} Ekmap.LevelRenderer.Painter.prototype._layers
         * @description draws the layer object.
         *
         */
        this._layers = {};

        /**
         * @member {Array} Ekmap.LevelRenderer.Painter.prototype._zlevelList
         * @description Layer list.
         *
         */
        this._zlevelList = [];

        /**
         * @member {Object} Ekmap.LevelRenderer.Painter.prototype._layerConfig
         * @description Drawing layer configuration object.
         *
         */
        this._layerConfig = {};

        /**
         * @member {Object} Ekmap.LevelRenderer.Painter.prototype._bgDom
         * @description Background layer Canvas (Dom).
         *
         */
        this._bgDom = null;

        /**
         * @member {Function} Ekmap.LevelRenderer.Painter.prototype.shapeToImage
         * @description Shape to image function.
         *
         */
        this.shapeToImage = null;
        // retina screen optimization
        Painter.devicePixelRatio = Math.max((window.devicePixelRatio || 1), 1);

        this.CLASS_NAME = "Ekmap.LevelRenderer.Painter";
        this.root.innerHTML ='';
        this._width = this._getWidth(); // width, cache record
        this._height = this._getHeight(); // high, cache record

        var domRoot = document.createElement('div');
        this._domRoot = domRoot;

        // domRoot.onselectstart = returnFalse; // Avoid the embarrassment of page selection
        domRoot.style.position ='relative';
        domRoot.style.overflow ='hidden';
        domRoot.style.width = this._width +'px';
        domRoot.style.height = this._height +'px';
        this.root.appendChild(domRoot);

        this.shapeToImage = this._createShapeToImageProcessor();

        // Create each layer of canvas
        // background
        //this._bgDom = Painter.createDom('bg','div', this);
        this._bgDom = Painter.createDom(CommonUtil.createUniqueID("Ekmap.Theme_background_"),'div', this);
        domRoot.appendChild(this._bgDom);
        this._bgDom.onselectstart = returnFalse;
        this._bgDom.style['-webkit-user-select'] ='none';
        this._bgDom.style['user-select'] ='none';
        this._bgDom.style['-webkit-touch-callout'] ='none';

        // highlight
        //var hoverLayer = new PaintLayer('_hoverLayer_', this);
        var hoverLayer = new PaintLayer(CommonUtil.createUniqueID("_highLightLayer_"), this);
        this._layers['hover'] = hoverLayer;
        domRoot.appendChild(hoverLayer.dom);
        hoverLayer.initContext();

        hoverLayer.dom.onselectstart = returnFalse;
        hoverLayer.dom.style['-webkit-user-select'] ='none';
        hoverLayer.dom.style['user-select'] ='none';
        hoverLayer.dom.style['-webkit-touch-callout'] ='none';

        var me = this;
        this.updatePainter = function(shapeList, callback) {
            me.refreshShapes(shapeList, callback);
        };

        // The method of returning false is used to prevent the page from being selected
        function returnFalse() {
            return false;
        }

        /* eslint-disable */
        // empty method that does nothing
        function doNothing() {//NOSONAR
        }
        /* eslint-enable */
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.dispose();
        this._zlevelList = null;
        this._layerConfig = null;
        this._bgDom = null;
        this.shapeToImage = null;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.render
     * @description rendering. For the first drawing, create various doms and contexts.
     *
     * @param {Function} callback-callback function after drawing.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    render(callback) {
        // TODO
        this.refresh(callback, true);

        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.refresh
     * @description refresh.
     *
     * @param {Function} callback-callback function after refresh.
     * @param {boolean} paintAll-force all shapes to be drawn.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    refresh(callback, paintAll) {
        var list = this.storage.getShapeList(true);
        this._paintList(list, paintAll);

        if (typeof callback =='function') {
            callback();
        }

        return this;
    }


    /**
     * Method: _paintList
     * Draw graphics according to the list.
     */
    _paintList(list, paintAll) {
        if (typeof(paintAll) =='undefined') {
            paintAll = false;
        }

        this._updateLayerStatus(list);

        var currentLayer;
        var currentZLevel;
        var ctx;

        for (var id in this._layers) {
            if (id !=='hover') {
                this._layers[id].unusedCount++;
                this._layers[id].updateTransform();
            }
        }

        var invTransform = [];

        for (var i = 0, l = list.length; i <l; i++) {
            var shape = list[i];

            if (currentZLevel !== shape.zlevel) {
                if (currentLayer && currentLayer.needTransform) {
                    ctx.restore();
                }

                currentLayer = this.getLayer(shape.zlevel);
                ctx = currentLayer.ctx;
                currentZLevel = shape.zlevel;

                // Reset the count
                currentLayer.unusedCount = 0;

                if (currentLayer.dirty || paintAll) {
                    currentLayer.clear();
                }

                if (currentLayer.needTransform) {
                    ctx.save();
                    currentLayer.setTransform(ctx);
                }
            }

            // Start group clipping
            if (ctx && shape.__startClip) {
                var clipShape = shape.__startClip;
                ctx.save();
                // Set transform
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    SUtil.Util_matrix.invert(invTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }

                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();

                // Transform back
                if (clipShape.needTransform) {
                    let m = invTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }

            if (((currentLayer && currentLayer.dirty) || paintAll) && !shape.invisible) {
                if (!shape.onbrush ||
                    (shape.onbrush && !shape.onbrush(ctx, false))
                ) {
                    if (Config.catchBrushException) {
                        try {
                            shape.brush(ctx, false, this.updatePainter);
                        } catch (error) {
                            SUtil.Util_log(
                                error,
                                'brush error of '+ shape.type,
                                shape
                            );
                        }
                    } else {
                        shape.brush(ctx, false, this.updatePainter);
                    }
                }
            }

            // Stop group clipping
            if (ctx && shape.__stopClip) {
                ctx.restore();
            }

            shape.__dirty = false;
        }

        if (ctx && currentLayer && currentLayer.needTransform) {
            ctx.restore();
        }

        for (let id in this._layers) {
            if (id !=='hover') {
                var layer = this._layers[id];
                layer.dirty = false;
                // Delete the expired layer
                // PENDING
                // if (layer.unusedCount >= 500) {
                // this.delLayer(id);
                //}
                if (layer.unusedCount == 1) {
                    layer.clear();
                }
            }
        }

    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.getLayer
     * @description Get the layer of zlevel, if it does not exist, a new layer will be created.
     *
     * @param {number} zlevel-zlevel.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    getLayer(zlevel) {
        // Change draw layer
        var currentLayer = this._layers[zlevel];
        if (!currentLayer) {
            var len = this._zlevelList.length;
            var prevLayer = null;
            var i = -1;
            if (len> 0 && zlevel> this._zlevelList[0]) {
                for (i = 0; i <len-1; i++) {
                    if (
                        this._zlevelList[i] <zlevel &&
                        this._zlevelList[i + 1]> zlevel
                    ) {
                        break;
                    }
                }
                prevLayer = this._layers[this._zlevelList[i]];
            }
            this._zlevelList.splice(i + 1, 0, zlevel);

            // Create a new layer
            //currentLayer = new PaintLayer(zlevel, this);
            currentLayer = new PaintLayer(CommonUtil.createUniqueID("_levelLayer_" + zlevel), this);
            var prevDom = prevLayer? prevLayer.dom: this._bgDom;
            if (prevDom.nextSibling) {
                prevDom.parentNode.insertBefore(
                    currentLayer.dom,
                    prevDom.nextSibling
                );
            } else {
                prevDom.parentNode.appendChild(
                    currentLayer.dom
                );
            }
            currentLayer.initContext();

            this._layers[zlevel] = currentLayer;

            if (this._layerConfig[zlevel]) {
                new Util().merge(currentLayer, this._layerConfig[zlevel], true);
            }

            currentLayer.updateTransform();
        }

        return currentLayer;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.getLayers
     * @description Get all the created layers.
     * @return {Array.<Painter.Layer>} created layer
     */
    getLayers() {
        return this._layers;
    }


    /**
     * Method: _updateLayerStatus
     * Update the state of the drawing layer.
     */
    _updateLayerStatus(list) {
        var layers = this._layers;

        var elCounts = {};
        for (let z in layers) {
            if (z !=='hover') {
                elCounts[z] = layers[z].elCount;
                layers[z].elCount = 0;
            }
        }

        for (let i = 0; i <list.length; i++) {
            var shape = list[i];
            var zlevel = shape.zlevel;
            var layer = layers[zlevel];
            if (layer) {
                layer.elCount++;
                // has been marked as needing to be refreshed
                if (layer.dirty) {
                    continue;
                }
                layer.dirty = shape.__dirty;
            }
        }

        // The number of elements in the layer has changed
        for (let z in layers) {
            if (z !=='hover') {
                if (elCounts[z] !== layers[z].elCount) {
                    layers[z].dirty = true;
                }
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.refreshShapes
     * @description updated list of graphic elements.
     *
     * @param {number} shapeList-The list of graphic elements that need to be updated.
     * @param {number} callback-callback function after the view is updated.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    refreshShapes(shapeList, callback) {
        for (var i = 0, l = shapeList.length; i <l; i++) {
            var shape = shapeList[i];
            this.storage.mod(shape.id);
        }

        this.refresh(callback);
        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.clear
     * @description Clear all content outside the hover layer.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    clear() {
        for (var k in this._layers) {
            if (k =='hover') {
                continue;
            }
            this._layers[k].clear();
        }

        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.modLayer
     * @description Modify the drawing parameters of the specified zlevel.
     *
     * @param {string} zlevel-zlevel.
     * @param {Object} config-configuration object.
     * @param {string} [config.clearColor=0] The color of the canvas every time the canvas is cleared.
     * @param {boolean} [config.motionBlur=false] Whether to enable motion blur.
     * @param {number} [config.lastFrameAlpha=0.7] Used when the motion blur is turned on, the alpha value mixed with the previous frame, the larger the value, the more obvious the trail. Default value: 0.7.
     * @param {Array.<number>} config.position-The translation of the layer.
     * @param {Array.<number>} config.rotation-layer rotation.
     * @param {Array.<number>} config.scale-the scale of the layer.
     * @param {boolean} config.zoomable-Whether the layer supports mouse zooming operation. Default value: false.
     * @param {boolean} config.panable-Whether the layer supports mouse pan operation. Default value: false.
     *
     */
    modLayer(zlevel, config) {
        if (config) {
            if (!this._layerConfig[zlevel]) {
                this._layerConfig[zlevel] = config;
            } else {
                new Util().merge(this._layerConfig[zlevel], config, true);
            }

            var layer = this._layers[zlevel];

            if (layer) {
                new Util().merge(layer, this._layerConfig[zlevel], true);
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.delLayer
     * @description Delete the specified layer.
     *
     * @param {string} zlevel-zlevel where the layer is located.
     */
    delLayer(zlevel) {
        var layer = this._layers[zlevel];
        if (!layer) {
            return;
        }
        // Save config
        this.modLayer(zlevel, {
            position: layer.position,
            rotation: layer.rotation,
            scale: layer.scale
        });
        layer.dom.parentNode.removeChild(layer.dom);
        delete this._layers[zlevel];

        this._zlevelList.splice(new Util().indexOf(this._zlevelList, zlevel), 1);
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.refreshHover
     * @description refresh the hover layer.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    refreshHover() {
        this.clearHover();
        var list = this.storage.getHoverShapes(true);
        for (var i = 0, l = list.length; i <l; i++) {
            this._brushHover(list[i]);
        }
        this.storage.delHover();

        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.clearHover
     * @description Clear all the contents of the hover layer.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    clearHover() {
        var hover = this._layers.hover;
        hover && hover.clear();

        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.resize
     * @description Redraw after the area size changes.
     * @return {Ekmap.LevelRenderer.Painter} this.
     */
    resize() {
        var domRoot = this._domRoot;
        domRoot.style.display ='none';

        var width = this._getWidth();
        var height = this._getHeight();

        domRoot.style.display ='';

        // Optimize resize without actual change
        if (this._width != width || height != this._height) {
            this._width = width;
            this._height = height;

            domRoot.style.width = width +'px';
            domRoot.style.height = height +'px';

            for (var id in this._layers) {

                this._layers[id].resize(width, height);
            }

            this.refresh(null, true);
        }

        return this;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.clearLayer
     * @description Clear a specified layer.
     * @param {number} zLevel-level.
     */
    clearLayer(zLevel) {
        var layer = this._layers[zLevel];
        if (layer) {
            layer.clear();
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.dispose
     * @description release.
     *
     */
    dispose() {
        this.root.innerHTML ='';

        this.root = null;
        this.storage = null;
        this._domRoot = null;
        this._layers = null;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.getDomHover
     * @description Get the Dom of the Hover layer.
     */
    getDomHover() {
        return this._layers.hover.dom;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.toDataURL
     * @description Image export.
     * @param {string} type-Image type.
     * @param {string} backgroundColor-background color. Default value:'#fff'.
     * @param {Object} args
     * @return {string} The Base64 url ​​of the image.
     */
    toDataURL(type, backgroundColor, args) {
        //var imageDom = Painter.createDom('image','canvas', this);
        var imageDom = Painter.createDom(CommonUtil.createUniqueID("Ekmap.Theme.image_"),'canvas', this);
        this._bgDom.appendChild(imageDom);
        var ctx = imageDom.getContext('2d');
        Painter.devicePixelRatio != 1 &&
            ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);

        ctx.fillStyle = backgroundColor ||'#fff';
        ctx.rect(
            0, 0,
            this._width * Painter.devicePixelRatio,
            this._height * Painter.devicePixelRatio
        );
        ctx.fill();

        var self = this;
        // Ascending traversal, zlevel on shape specifies the z-axis stacking of the painting layer

        this.storage.iterShape(
            function(shape) {
                if (!shape.invisible) {
                    if (!shape.onbrush // no onbrush
                        // There is onbrush and the call execution returns false or undefined to continue painting
                        ||
                        (shape.onbrush && !shape.onbrush(ctx, false))
                    ) {
                        if (Config.catchBrushException) {
                            try {
                                shape.brush(ctx, false, self.updatePainter);
                            } catch (error) {
                                SUtil.Util_log(
                                    error,
                                    'brush error of '+ shape.type,
                                    shape
                                );
                            }
                        } else {
                            shape.brush(ctx, false, self.updatePainter);
                        }
                    }
                }
            }, {normal:'up', update: true}
        );
        var image = imageDom.toDataURL(type, args);
        ctx = null;
        this._bgDom.removeChild(imageDom);
        return image;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.getWidth
     * @description Get the width of the drawing area.
     * @return {number} The width of the drawing area.
     */
    getWidth() {
        return this._width;
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.getHeight
     * @description Get the height of the drawing area.
     * @return {number} The height of the drawing area.
     */
    getHeight() {
        return this._height;
    }


    /**
     * Method: _getWidth
     *
     */
    _getWidth() {
        var root = this.root;
        var stl = root.currentStyle ||
            document.defaultView.getComputedStyle(root);

        return ((root.clientWidth || parseInt(stl.width, 10))-
            parseInt(stl.paddingLeft, 10) // Please forgive me for being rude
            -
            parseInt(stl.paddingRight, 10)).toFixed(0)-0;
    }


    /**
     * Method: _getHeight
     *
     */
    _getHeight() {
        var root = this.root;
        var stl = root.currentStyle ||
            document.defaultView.getComputedStyle(root);

        return ((root.clientHeight || parseInt(stl.height, 10))-
            parseInt(stl.paddingTop, 10) // Please forgive me for being rude
            -
            parseInt(stl.paddingBottom, 10)).toFixed(0)-0;
    }


    /**
     * Method: _brushHover
     *
     */
    _brushHover(shape) {
        var ctx = this._layers.hover.ctx;

        if (!shape.onbrush // no onbrush
            // There is onbrush and the call execution returns false or undefined to continue painting
            ||
            (shape.onbrush && !shape.onbrush(ctx, true))
        ) {
            var layer = this.getLayer(shape.zlevel);
            if (layer.needTransform) {
                ctx.save();
                layer.setTransform(ctx);
            }
            // Retina optimization
            if (Config.catchBrushException) {
                try {
                    shape.brush(ctx, true, this.updatePainter);
                } catch (error) {
                    SUtil.Util_log(
                        error,'hoverBrush error of '+ shape.type, shape
                    );
                }
            } else {
                shape.brush(ctx, true, this.updatePainter);
            }
            if (layer.needTransform) {
                ctx.restore();
            }
        }

    }


    /**
     * Method: _shapeToImage
     *
     */
    _shapeToImage(id, shape, width, height, devicePixelRatio) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var _devicePixelRatio = devicePixelRatio || window.devicePixelRatio || 1;

        canvas.style.width = width +'px';
        canvas.style.height = height +'px';
        canvas.setAttribute('width', width * _devicePixelRatio);
        canvas.setAttribute('height', height * _devicePixelRatio);

        ctx.clearRect(0, 0, width * _devicePixelRatio, height * _devicePixelRatio);

        var shapeTransform = {
            position: shape.position,
            rotation: shape.rotation,
            scale: shape.scale
        };
        shape.position = [0, 0, 0];
        shape.rotation = 0;
        shape.scale = [1, 1];
        if (shape) {
            shape.brush(ctx, false);
        }

        var imgShape = new SmicImage({
            id: id,
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });

        if (shapeTransform.position != null) {
            imgShape.position = shape.position = shapeTransform.position;
        }

        if (shapeTransform.rotation != null) {
            imgShape.rotation = shape.rotation = shapeTransform.rotation;
        }

        if (shapeTransform.scale != null) {
            imgShape.scale = shape.scale = shapeTransform.scale;
        }

        return imgShape;
    }


    /**
     * Method: _createShapeToImageProcessor
     *
     */
    _createShapeToImageProcessor() {
        var me = this;

        return function(id, e, width, height) {
            return me._shapeToImage(
                id, e, width, height, Painter.devicePixelRatio
            );
        };
    }


    // SMIC-Method Extension-start
    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.updateHoverLayer
     * @description Update the settings to display the highlighted layer.
     * @param {Array} shapes-an array of shapes.
     */
    updateHoverLayer(shapes) {
        if (!(shapes instanceof Array)) {
            return this;
        }

        //Clear highlight
        this.clearHover();
        this.storage.delHover();

        for (var i = 0; i <shapes.length; i++) {
            this.storage.addHover(shapes[i]);
            this._brushHover(shapes[i]);
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Painter.prototype.createDom
     * @description creates Dom.
     *
     * @param {string} id-Dom id
     * @param {string} type-Dom type
     * @param {Ekmap.LevelRenderer.Painter} painter-Painter instance.
     * @return {Object} Dom
     */
    static createDom(id, type, painter) {
        var newDom = document.createElement(type);
        var width = painter._width;
        var height = painter._height;

        // No append, please forgive me for writing this way, clear~
        newDom.style.position ='absolute';
        newDom.style.left = 0;
        newDom.style.top = 0;
        newDom.style.width = width +'px';
        newDom.style.height = height +'px';
        newDom.setAttribute('width', width * Painter.devicePixelRatio);
        newDom.setAttribute('height', height * Painter.devicePixelRatio);

        // id is not used as an index to avoid possible duplication of names and is defined as a private attribute
        //newDom.setAttribute('data-zr-dom-id', id);
        newDom.setAttribute('id', id);
        return newDom;
    }
}

/**
 * @private
 * @class Painter.Layer
 * @classdesc draws the layer class.
 * @extends Ekmap.LevelRenderer.Transformable
 */
export class PaintLayer extends Transformable {

    /**
     * @function Painter.Layer.constructor
     * @description Constructor.
     *
     * @param {string} id-id.
     * @param {Ekmap.LevelRenderer.Painter} painter-Painter instance.
     *
     */
    constructor(id, painter) {
        super(id, painter);
        /**
         * @member {Object} Painter.Layer.prototype.dom
         * @description dom.
         */
        this.dom = null;/**
        * @member {Object} Painter.Layer.prototype.domBack
        * @description domBack.
        */
       this.domBack = null;

       /**
        * @member {Object} Painter.Layer.prototype.ctxBack
        * @description ctxBack.
        */
       this.ctxBack = null;

       /**
        * @member {Ekmap.LevelRenderer.Painter} Painter.Layer.prototype.painter
        * @description painter.
        */
       this.painter = painter;

       /**
        * @member {number} Painter.Layer.prototype.unusedCount
        * @description unusedCount.
        */
       this.unusedCount = 0;

       /**
        * @member {Object} Painter.Layer.prototype.config
        * @description config.
        */
       this.config = null;

       /**
        * @member {boolean} Painter.Layer.prototype.dirty
        * @description dirty.
        */
       this.dirty = true;

       /**
        * @member {number} Painter.Layer.prototype.elCount
        * @description elCount.
        */
       this.elCount = 0;

       // Configs
       /**
        * @member {string} Painter.Layer.prototype.clearColor
        * @description The color of each empty canvas. Default value: 0;
        */
       this.clearColor = 0;

       /**
        * @member {boolean} Painter.Layer.prototype.motionBlur
        * @description Whether to enable dynamic blur. Default value: false;
        */
       this.motionBlur = false;

       /**
        * @member {number} Painter.Layer.prototype.lastFrameAlpha
        * @description is used when the motion blur is turned on, and the alpha value mixed with the previous frame, the larger the value, the more obvious the trail
        */
       this.lastFrameAlpha = 0.7;

       /**
        * @member {boolean} Painter.Layer.prototype.zoomable
        * @description Whether the layer supports mouse pan operation. Default value: false;
        */
       this.zoomable = false;

       /**
        * @member {boolean} Painter.Layer.prototype.panable
        * @description Whether the layer supports mouse zoom operations. Default value: false;
        */
       this.panable = false;

       /**
        * @member {number} Painter.Layer.prototype.maxZoom
        * @description maxZoom. Default value: Infinity.
        */
       this.maxZoom = Infinity;

       /**
        * @member {number} Painter.Layer.prototype.minZoom
        * @description minZoom. Default value: 0.
        */
       this.minZoom = 0;

       /**
        * @member {number} Painter.Layer.prototype.ctx
        * @description Canvas context.
        */
       this.ctx = null;
       this.dom = Painter.createDom(CommonUtil.createUniqueID("Ekmap.Theme" + id),'canvas', painter);
       this.dom.onselectstart = returnFalse; // Avoid the embarrassment of page selection
       this.dom.style['-webkit-user-select'] ='none';
       this.dom.style['user-select'] ='none';
       this.dom.style['-webkit-touch-callout'] ='none';
       // Function
       // The method of returning false is used to prevent the page from being selected
       function returnFalse() {
           return false;
       }
       this.CLASS_NAME = "Ekmap.LevelRenderer.Painter.Layer";
   }

   /**
    * @function Painter.Layer.prototype.destroy
    * @description destroys the object and releases resources. All properties will be set to null after calling this function.
    */
   destroy() {
       this.dom = null;
       this.domBack = null;
       this.ctxBack = null;
       this.painter = null;
       this.unusedCount = null;
       this.config = null;
       this.dirty = null;
       this.elCount = null;
       this.clearColor = null;
       this.motionBlur = null;
       this.lastFrameAlpha = null;
       this.zoomable = null;
       this.panable = null;
       this.maxZoom = null;
       this.minZoom = null;
       this.ctx = null;

       Transformable.destroy.apply(this, arguments);
   }

   /**
    * @function Painter.Layer.prototype.initContext
    * @description initializes the Canvan 2D context.
    */
   initContext() {
       this.ctx = this.dom.getContext('2d');
       if (Painter.devicePixelRatio != 1) {
           this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
       }
   }

   /**
    * @function Painter.Layer.prototype.createBackBuffer
    * @description Create a backup buffer.
    */
   createBackBuffer() {
       this.domBack = Painter.createDom(CommonUtil.createUniqueID("Ekmap.Theme.back-" + this.id),'canvas', this.painter);
       this.ctxBack = this.domBack.getContext('2d');

       if (Painter.devicePixelRatio != 1) {
           this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
       }
   }

   /**
    * @function Painter.Layer.prototype.resize
    * @description changes the size.
    *
    * @param {number} width-width.
    * @param {number} height-height.
    */
   resize(width, height) {
       this.dom.style.width = width +'px';
       this.dom.style.height = height +'px';

       this.dom.setAttribute('width', width * Painter.devicePixelRatio);
       this.dom.setAttribute('height', height * Painter.devicePixelRatio);

       if (Painter.devicePixelRatio != 1) {
           this.ctx.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
       }

       if (this.domBack) {
           this.domBack.setAttribute('width', width * Painter.devicePixelRatio);this.domBack.setAttribute('height', height * Painter.devicePixelRatio);

           if (Painter.devicePixelRatio != 1) {
               this.ctxBack.scale(Painter.devicePixelRatio, Painter.devicePixelRatio);
           }
       }
   }

   /**
    * @function Painter.Layer.prototype.clear
    * @description Clear the canvas of this layer.
    */
   clear() {
       var dom = this.dom;
       var ctx = this.ctx;
       var width = dom.width;
       var height = dom.height;

       var haveClearColor = this.clearColor;
       var haveMotionBLur = this.motionBlur;
       var lastFrameAlpha = this.lastFrameAlpha;

       if (haveMotionBLur) {
           if (!this.domBack) {
               this.createBackBuffer();
           }

           this.ctxBack.globalCompositeOperation ='copy';
           this.ctxBack.drawImage(
               dom, 0, 0,
               width / Painter.devicePixelRatio,
               height / Painter.devicePixelRatio
           );
       }

       if (haveClearColor) {
           ctx.save();
           ctx.fillStyle = this.config.clearColor;
           ctx.fillRect(
               0, 0,
               width / Painter.devicePixelRatio,
               height / Painter.devicePixelRatio
           );
           ctx.restore();
       } else {
           ctx.clearRect(
               0, 0,
               width / Painter.devicePixelRatio,
               height / Painter.devicePixelRatio
           );
       }

       if (haveMotionBLur) {
           var domBack = this.domBack;
           ctx.save();
           ctx.globalAlpha = lastFrameAlpha;
           ctx.drawImage(
               domBack, 0, 0,
               width / Painter.devicePixelRatio,
               height / Painter.devicePixelRatio
           );
           ctx.restore();
       }
   }

}