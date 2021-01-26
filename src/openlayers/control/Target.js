import ekmap_inherits from './ext/inherits'
import ol_render_getVectorContext from './ext/getVectorContext';

import ekmap_control_CanvaseBase from './CanvasBase'

/** Control vẽ vị trí tâm bản đồ
 * @constructor
 * @param {Object} options
 *  @param {ol.style.Style|Array<ol.style.Style>} options.style
 */
var Target = function(options) {
    options = options || {};

    this.style = options.style || [
        new ol.style.Style({ image: new ol.style.RegularShape({ points: 4, radius: 11, radius1: 0, radius2: 0, snapToPixel: true, stroke: new ol.style.Stroke({ color: "#fff", width: 4 }) }) }),
        new ol.style.Style({ image: new ol.style.RegularShape({ points: 4, radius: 11, radius1: 0, radius2: 0, snapToPixel: true, stroke: new ol.style.Stroke({ color: "black", width: 2 }) }) })
    ];
    if (!(this.style instanceof Array)) this.style = [this.style];
    this.composite = options.composite || '';

    var div = document.createElement('div');
    div.className = "ol-target ol-unselectable ol-control";
    ekmap_control_CanvaseBase.call(this, {
        element: div,
        target: options.target
    });
    this.setVisible(options.visible !== false);
};
ekmap_inherits(Target, ekmap_control_CanvaseBase);

/** Thiết lập hiển thị
 * @paraam {boolean} b
 */
Target.prototype.setVisible = function(b) {
    this.set("visible", b);
    if (this.getMap()) this.getMap().renderSync();
};

/** Lấy thông tin hiển thị hiện thời
 * @return {boolean} b 
 */
Target.prototype.getVisible = function() {
    return this.get("visible");
};

/** Draw the target
 * @private
 */
Target.prototype._draw = function(e) {
    var ctx = this.getContext(e);
    if (!ctx || !this.getMap() || !this.getVisible()) return;

    var ratio = e.frameState.pixelRatio;
    ctx.save();

    ctx.scale(ratio, ratio);

    var cx = ctx.canvas.width / (2 * ratio);
    var cy = ctx.canvas.height / (2 * ratio);
    var geom = new ol.geom.Point(this.getMap().getCoordinateFromPixel([cx, cy]));

    if (this.composite) ctx.globalCompositeOperation = this.composite;
    console.log(this.style)
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

export default Target