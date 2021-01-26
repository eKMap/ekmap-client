import ekmap_inherits from './ext/inherits';
import Control from 'ol/control/Control'
import { unByKey as ol_Observable_unByKey } from 'ol/Observable'
import ekmap_getMapCanvas from './ext/getMapCanvas'

/**
 * @classdesc 
 *   Attribution Control integrated in the canvas (for jpeg/png export purposes).
 * @see http://www.kreidefossilien.de/webgis/dokumentation/beispiele/export-map-to-png-with-scale
 *
 * @extends {ol.control.Control}
 * @param {Object=} options extend the ol.control options. 
 *  @param {ol.style.Style} options.style style used to draw the title.
 */
var CanvasBase = function(options) {
    if (!options) options = {};

    // Define a style to draw on the canvas
    this.setStyle(options.style);

    Control.call(this, options);
}
ekmap_inherits(CanvasBase, Control);

/**
 * Remove the control from its current map and attach it to the new map.
 * Subclasses may set up event handlers to get notified about changes to
 * the map here.
 * @param {o.Map} map Map.
 * @api stable
 */
CanvasBase.prototype.setMap = function(map) {
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
};

/** Get canvas overlay
 */
CanvasBase.prototype.getCanvas = function(map) {
    return ekmap_getMapCanvas(map);
};

/** Get map Canvas
 * @private
 */
CanvasBase.prototype.getContext = function(e) {
    var ctx = e.context;
    if (!ctx && this.getMap()) {
        var c = this.getMap().getViewport().getElementsByClassName('ol-fixedoverlay')[0];
        ctx = c ? c.getContext('2d') : null;
    }
    return ctx;
};

/** Set Style
 * @api
 */
CanvasBase.prototype.setStyle = function(style) {
    this._style = style || new ol.style.Style({});
};

/** Get style
 * @api
 */
CanvasBase.prototype.getStyle = function() {
    return this._style;
};

/** Get stroke
 * @api
 */
CanvasBase.prototype.getStroke = function() {
    var t = this._style.getStroke();
    if (!t) this._style.setStroke(new ol.style.Stroke({ color: '#000', width: 1.25 }));
    return this._style.getStroke();
};

/** Get fill
 * @api
 */
CanvasBase.prototype.getFill = function() {
    var t = this._style.getFill();
    if (!t) this._style.setFill(new ol.style.Fill({ color: '#fff' }));
    return this._style.getFill();
};

/** Get stroke
 * @api
 */
CanvasBase.prototype.getTextStroke = function() {
    var t = this._style.getText();
    if (!t) t = new ol.style.Text({});
    if (!t.getStroke()) t.setStroke(new ol.style.Stroke({ color: '#fff', width: 3 }));
    return t.getStroke();
};

/** Get text fill
 * @api
 */
CanvasBase.prototype.getTextFill = function() {
    var t = this._style.getText();
    if (!t) t = new ol.style.Text({});
    if (!t.getFill()) t.setFill(new ol.style.Fill({ color: '#fff', width: 3 }));
    return t.getFill();
};

/** Get text font
 * @api
 */
CanvasBase.prototype.getTextFont = function() {
    var t = this._style.getText();
    if (!t) t = new ol.style.Text({});
    if (!t.getFont()) t.setFont('12px sans-serif');
    return t.getFont();
};

/** Draw the control on canvas
 * @private
 */
CanvasBase.prototype._draw = function( /* e */ ) {
    console.warn('[CanvasBase] draw function not implemented.');
};

export default CanvasBase