import { Util } from './Util';
import { Util as CommonUtil } from '../../commontypes/Util';
import { Storage } from './Storage';
import { Painter } from './Painter';
import { Handler } from './Handler';
import { Animation } from './Animation';
import { SUtil } from './SUtil';

export class Render {

    constructor(id, dom) {
        this.id = id;
        this.storage = new Storage();
        this.painter = new Painter(dom, this.storage);
        this.handler = new Handler(dom, this.storage, this.painter);
        this.animatingElements = [];
        this.animation = new Animation({
            stage: {
                update: Render.getFrameCallback(this)
            }
        });
        this._needsRefreshNextFrame = false;
        this.animation.start();
        this.CLASS_NAME = "Ekmap.LevelRenderer.Render";

    }

    destroy() {
        this.id = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;
        this.animatingElements = null;
        this.animation = null;
        this._needsRefreshNextFrame = null;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.getId
     * @description Get the unique identifier of the instance.
     * @return {string} The unique identifier of the instance.
     */
    getId() {
        return this.id;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.addShape
     * @description adds the shape of the graph to the root node.
     *
     * @param {Ekmap.LevelRenderer.Shape} shape-shape object, full set of available attributes, see each shape for details.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    addShape(shape) {
        this.storage.addRoot(shape);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.addGroup
     * @description adds the group to the root node.
     *
     * (code)
     * //Add group to root node example
     * var render = new Ekmap.LevelRenderer.Render("Render",document.getElementById('lRendertest'));
     * render.clear();
     * var g = new Ekmap.LevelRenderer.Group();
     * g.addChild(new Ekmap.LevelRenderer.Shape.Circle({
     * style: {
     * x: 100,
     * y: 100,
     * r: 20,
     * brushType:'fill'
     *}
     * }));
     * render.addGroup(g);
     * render.render();
     * (end)
     *
     * @param {Ekmap.LevelRenderer.Group} group-group object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    addGroup(group) {
        this.storage.addRoot(group);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.delShape
     * @description deletes the graph shape from the root node.
     *
     * @param {string} shapeId-the unique identifier of the shape object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    delShape(shapeId) {
        this.storage.delRoot(shapeId);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.delGroup
     * @description deletes the group from the root node.
     *
     * @param {string} groupId-the unique identifier of the group object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    delGroup(groupId) {
        this.storage.delRoot(groupId);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.modShape
     * @description Modify the shape of the graph.
     *
     * @param {string} shapeId-the unique identifier of the shape object.
     * @param {Ekmap.LevelRenderer.Shape} shape-shape object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    modShape(shapeId, shape) {
        this.storage.mod(shapeId, shape);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.modGroup
     * @description Modify the group.
     *
     * @param {string} groupId-the unique identifier of the group object.
     * @param {Ekmap.LevelRenderer.Group} group-group object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    modGroup(groupId, group) {
        this.storage.mod(groupId, group);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.modLayer
     * @description Modify the drawing configuration items of the specified zlevel.
     *
     * @param {string} zLevel-the unique identifier of the group object.
     * @param {Object} config-configuration object.
     * @param {string} clearColor-The color of the canvas when the canvas is cleared each time. Default value: 0.
     * @param {noolean} motionBlur-whether to enable motion blur. Default value: false.
     * @param {number} lastFrameAlpha-used when the motion blur is turned on, the alpha value blended with the previous frame, the larger the value, the more obvious the trail. Default value: 0.7.
     * @param {Array.<number>} position-the translation of the layer.
     * @param {Array.<number>} rotation-the rotation of the layer.
     * @param {Array.<number>} scale-The scale of the layer.
     * @param {boolean} zoomable-whether the layer supports mouse zooming operations. Default value: false.
     * @param {boolean} panable-Whether the layer supports mouse pan operation. Default value: false.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    modLayer(zLevel, config) {
        this.painter.modLayer(zLevel, config);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.addHoverShape
     * @description Add extra highlight layer display, only adding method is provided, the highlight layer graphics will be cleared after each refresh.
     *
     * @param {Ekmap.LevelRenderer.Shape} shape-shape object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    addHoverShape(shape) {
        this.storage.addHover(shape);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.render
     * @description rendering.
     *
     * @callback {Function} callback-callback function after rendering.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    render(callback) {
        this.painter.render(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.refresh
     * @The description view is updated.
     *
     * @callback {Function} callback-callback function after the view is updated.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    refresh(callback) {
        this.painter.refresh(callback);
        this._needsRefreshNextFrame = false;
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.refreshNextFrame
     * @description marks that the view needs to be drawn in the next frame of the browser.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    refreshNextFrame() {
        this._needsRefreshNextFrame = true;
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.refreshHover
     * @description draw (view update) highlight layer.
     * @callback {Function} callback-callback function after the view is updated.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    refreshHover(callback) {
        this.painter.refreshHover(callback);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.refreshShapes
     * @description view update.
     *
     * @param {Array.<Ekmap.LevelRenderer.Shape>} shapeList-The shape list that needs to be updated.
     * @callback {Function} callback-callback function after the view is updated.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    refreshShapes(shapeList, callback) {
        this.painter.refreshShapes(shapeList, callback);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.resize
     * @description Adjust the size of the view.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    resize() {
        this.painter.resize();
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.animate
     * @description animation.
     *
     * @example
     * zr.animate(circle.id,'style', false)
     * .when(1000, {x: 10})
     * .done(function(){ // Animation done })
     * .start()
     *
     *
     * @param {Array.<(Ekmap.LevelRenderer.Shape/Ekmap.LevelRenderer.Group)>} el-animation object.
     * @param {string} path-Need to add animation attributes to get the path, you can get deep attributes through a.b.c. If the incoming object is <Ekmap.LevelRenderer.Group>, path must be an empty string.
     * @param {Function} loop-Whether the animation loops.
     * @return {Ekmap.LevelRenderer.animation.Animator} Animator.
     */
    animate(el, path, loop) {
        if (typeof(el) ==='string') {
            el = this.storage.get(el);
        }
        if (el) {
            var target;
            if (path) {
                var pathSplitted = path.split('.');
                var prop = el;
                for (var i = 0, l = pathSplitted.length; i <l; i++) {
                    if (!prop) {
                        continue;
                    }
                    prop = prop[pathSplitted[i]];
                }
                if (prop) {
                    target = prop;
                }
            } else {
                target = el;
            }

            if (!target) {
                SUtil.Util_log(
                    'Property "'+
                    path +
                    '" is not existed in element '+
                    el.id
                );
                return;
            }

            var animatingElements = this.animatingElements;
            if (typeof el.__aniCount ==='undefined') {
                // Count of ongoing animation
                el.__aniCount = 0;
            }
            if (el.__aniCount === 0) {
                animatingElements.push(el);
            }
            el.__aniCount++;

            return this.animation.animate(target, {loop: loop })
                .done(function() {
                    el.__aniCount--;
                    if (el.__aniCount === 0) {
                        // Remove from animatedElements
                        var idx = new Util().indexOf(animatingElements, el);
                        animatingElements.splice(idx, 1);
                    }
                });
        } else {
            SUtil.Util_log('Element not existed');
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.clearAnimation
     * @description Stop all animations.
     *
     */
    clearAnimation() {
        this.animation.clear();
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.getWidth
     * @description Get the width of the view.
     * @return {number} View width.
     */
    getWidth() {
        return this.painter.getWidth();
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.getHeight
     * @description Get the height of the view.
     * @return {number} The height of the view.
     */
    getHeight() {
        return this.painter.getHeight();
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.toDataURL
     * @description Image export.
     *
     * @param {string} type-type.
     * @param {string} backgroundColor-background color, default value: "#FFFFFF".
     * @param {string} args-parameters.
     * @return {string} The Base64 url ​​of the image.
     */
    toDataURL(type, backgroundColor, args) {
        return this.painter.toDataURL(type, backgroundColor, args);
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.shapeToImage
     * @description converts regular shape to image shape.
     *
     * @param {Ekmap.LevelRenderer.Shape} e-graphics.* @param {number} width-width.
     * @param {number} height-height.
     * @return {Object} image shape.
     */
    shapeToImage(e, width, height) {
        var id = CommonUtil.createUniqueID("Ekmap.LevelRenderer.ToImage_");
        return this.painter.shapeToImage(id, e, width, height);
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.on
     * @description event binding.
     *
     * @param {string} eventName-the name of the event.
     * @param {Function} eventHandler-response function.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    on(eventName, eventHandler) {
        this.handler.on(eventName, eventHandler);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.un
     * @description event unbind, if the parameter is empty, all custom events will be unbound.
     *
     * @param {string} eventName-the name of the event.
     * @param {Function} eventHandler-response function.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    un(eventName, eventHandler) {
        this.handler.un(eventName, eventHandler);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.trigger
     * @description event is triggered.
     *
     * @param {string} eventName-event name, resize, hover, drag, etc.
     * @param {event} event-event dom event object.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    trigger(eventName, event) {
        this.handler.trigger(eventName, event);
        this.handler.dispatch(eventName, event);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.clear
     * @description Clear the data and display of all class diagrams under the current Render. After clear, the MVC and bound events still exist, and Render is available.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    clear() {
        this.storage.delRoot();
        this.painter.clear();
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.dispose
     * @description releases the current Render instance (deletes including dom, data, display and event bindings). Render is unavailable after dispose.
     */
    dispose() {
        this.animation.stop();

        this.clear();
        this.storage.dispose();
        this.painter.dispose();
        this.handler.dispose();

        this.animation = null;
        this.animatingElements = null;
        this.storage = null;
        this.painter = null;
        this.handler = null;

        // After the release, tell the global to delete the index to yourself, but I didn't think of a good way
        // zrender.delInstance(this.id);

    }

    // SMIC-Method Extension-start
    /**
     * @function Ekmap.LevelRenderer.Render.prototype.updateHoverShapes
     * @description Update the settings to display the highlighted layer.
     *
     * @param {Array.<Ekmap.LevelRenderer.Shape>} shapes-shape array.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    updateHoverShapes(shapes) {
        this.painter.updateHoverLayer(shapes);
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.getAllShapes
     * @description Get all graphics.
     * @return {Array.<Ekmap.LevelRenderer.Shape>} graphics array.
     */
    getAllShapes() {
        return this.storage._shapeList;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.clearAll
     * @description Clear highlight and graphic layers.
     * @return {Ekmap.LevelRenderer.Render} this.
     */
    clearAll() {
        this.clear();
        this.painter.clearHover();
        return this;
    }

    /**
     * @function Ekmap.LevelRenderer.Render.prototype.getHoverOne
     * @description Get a single highlighted graphic, corresponding to the current mouse.
     * @return {Ekmap.LevelRenderer.Shape} highlight the shape.
     */
    getHoverOne() {
        return this.handler.getLastHoverOne();
    }

    static getFrameCallback(renderInstance) {
        return function() {
            var animatingElements = renderInstance.animatingElements;

            //animatingElements instanceof Array temporarily solves the destruction error
            if (animatingElements instanceof Array) {
                for (var i = 0, l = animatingElements.length; i <l; i++) {
                    renderInstance.storage.mod(animatingElements[i].id);
                }

                if (animatingElements.length || renderInstance._needsRefreshNextFrame) {
                    renderInstance.refresh();
                }
            }
        };
    }

    // SMIC-Method Extension-end
}