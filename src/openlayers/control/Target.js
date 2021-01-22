import '../core/Base';
import Control from 'ol/control/Control';
import CanvasBase from './CanvasBase'
import { unByKey as ol_Observable_unByKey } from 'ol/Observable'
import ekmap_getMapCanvas from './ext/getMapCanvas'
import ol_render_getVectorContext from './ext/getVectorContext';


/**
 * @class ol.ekmap.control.Target
 * @category  Control
 * @classdesc Target.
 * @param {Object} options Construction parameters.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {String} options.tooltip=MyTarget Tooltip of button.
 * @param {String} options.className Your style fix.
 * 
 * @extends {ol.control.Control}
 * @example
 * (start code)
 *  map.addControl(new ol.ekmap.control.Target());
 * (end)
 */

var Target = /*@__PURE__*/ (function(Control) {
    function Target(opt_options) {

        this.options = opt_options ? opt_options : {};

        this.style = this.options.style || [
            new ol.style.Style({ image: new ol.style.RegularShape({ points: 4, radius: 11, radius1: 0, radius2: 0, snapToPixel: true, stroke: new ol.style.Stroke({ color: "#fff", width: 4 }) }) }),
            new ol.style.Style({ image: new ol.style.RegularShape({ points: 4, radius: 11, radius1: 0, radius2: 0, snapToPixel: true, stroke: new ol.style.Stroke({ color: "black", width: 2 }) }) })
        ];
        if (!(this.style instanceof Array)) this.style = [this.style];
        this.composite = this.options.composite || '';
        var div = document.createElement('div');
        div.className = "ol-target ol-unselectable ol-control";
        this.setStyle(this.style);
        Control.call(this, {
            element: div,
            target: this.options.target
        });
        this.setVisible(this.options.visible !== false);
    }

    if (Control) Target.__proto__ = Control;
    Target.prototype = Object.create(Control && Control.prototype);
    Target.prototype.constructor = Target;

    Target.prototype.setMap = function setMap(map) {
        this.getCanvas(map);

        var oldmap = this.getMap();
        if (this._listener) {
            ol_Observable_unByKey(this._listener);
            this._listener = null;
        }

        Control.prototype.setMap.call(this, map);
        if (oldmap) oldmap.renderSync();

        if (map) {
            this._listener = map.on('postcompose', this._draw.bind(this));
            // Get a canvas layer on top of the map
        }
    }

    Target.prototype.setVisible = function setVisible(b) {
        this.set("visible", b);
        if (this.getMap()) this.getMap().renderSync();
    };

    /** Lấy thông tin hiển thị hiện thời
     * @return {boolean} b 
     */
    Target.prototype.getVisible = function getVisible() {
        return this.get("visible");
    };

    /** Draw the target
     * @private
     */
    Target.prototype._draw = function _draw(e) {
        var ctx = this.getContext(e);
        if (!ctx || !this.getMap() || !this.getVisible()) return;

        var ratio = e.frameState.pixelRatio;
        ctx.save();

        ctx.scale(ratio, ratio);

        var cx = ctx.canvas.width / (2 * ratio);
        var cy = ctx.canvas.height / (2 * ratio);
        var geom = new ol.geom.Point(this.getMap().getCoordinateFromPixel([cx, cy]));

        if (this.composite) ctx.globalCompositeOperation = this.composite;

        for (var i = 0; i < this.style.length; i++) {
            var style = this.style[i];
            if (style instanceof ol.style.Style) {
                var vectorContext = e.vectorContext;
                if (!vectorContext) {
                    var event = {
                        inversePixelTransform: [ratio, 0, 0, ratio, 0, 0],
                        context: ctx,
                        frameState: {
                            pixelRatio: ratio,
                            extent: e.frameState.extent,
                            coordinateToPixelTransform: e.frameState.coordinateToPixelTransform,
                            viewState: e.frameState.viewState
                        }
                    }
                    console.log(ol_render_getVectorContext)
                    vectorContext = ol_render_getVectorContext(event);
                }
                vectorContext.setStyle(style);
                vectorContext.drawGeometry(geom);
            }
        }

        ctx.restore();
    };

    /** Set Style
     * @api
     */
    Target.prototype.setStyle = function setStyle(style) {
        this._style = style || new ol.style.Style({});
    };

    /** Get canvas overlay
     */
    Target.prototype.getCanvas = function getCanvas(map) {
        return ekmap_getMapCanvas(map);
    };

    /** Get map Canvas
     * @private
     */
    Target.prototype.getContext = function getContext(e) {
        var ctx = e.context;
        if (!ctx && this.getMap()) {
            var c = this.getMap().getViewport().getElementsByClassName('ol-fixedoverlay')[0];
            ctx = c ? c.getContext('2d') : null;
        }
        return ctx;
    };


    return Target;
}(Control));

export default Target;