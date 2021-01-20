import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Base from 'ol/control/BaseLayer';
import * as olProj from 'ol/proj';
import AssertionError from 'ol/AssertionError';
import Control from 'ol/control/Control';
import Scale from 'ol/control/ScaleLine';
import { getMap } from 'echarts';
import gclient_element from '../core/Element';


/**
 * @class ol.ekmap.control.BaseLayer
 * @category  Control
 * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a BaseLayer..
 * @extends {ol.control.Control}
 * @param {options} options Scale line options.
 * @param {string} options.className CSS Class name.
 * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.
 * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 * @param {(ol.control.BaseLayerUnits|string)} options.units='metric' Units.
 * @example
 * var control = new ol.ekmap.control.BaseLayer();
 *      map.addControl(control)
 */
var RotateNorthControl = /*@__PURE__*/ (function(Control) {
    function RotateNorthControl(opt_options) {
        var options = opt_options || {};

        var button = document.createElement('button');
        button.innerHTML = 'N';

        var element = document.createElement('div');
        element.className = 'gclient-bl ol-unselectable ol-control';
        element.appendChild(button);

        Control.call(this, {
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    }

    if (Control) RotateNorthControl.__proto__ = Control;
    RotateNorthControl.prototype = Object.create(Control && Control.prototype);
    RotateNorthControl.prototype.constructor = RotateNorthControl;

    RotateNorthControl.prototype.setMap = function setMap(map) {
        Control.prototype.setMap.call(this, map);
        if (this.getMap()) {
            console.log(this.getMap())
        }
    }


    RotateNorthControl.prototype.handleRotateNorth = function handleRotateNorth() {
        console.log(this.getMap())
        this.getMap().getView().setRotation(0);
    };

    return RotateNorthControl;
}(Control));

export default RotateNorthControl;