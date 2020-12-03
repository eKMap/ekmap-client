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

/**
 * @class ol.ekmap.control.BaseLayer
 * @category  Control
 * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a BaseLayer..
 * @extends {ol/control/BaseLayer}
 * @param {options} options Scale line options.
 * @param {string} options.className CSS Class name.
 * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.
 * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 * @param {(ol.control.BaseLayerUnits|string)} options.units='metric' Units.
 * @example
 * var control = new ol.ekmap.control.BaseLayer();
 *      map.addControl(control)
 */
export class BaseLayer extends Control {

    constructor(options) {
        options = options || {};

        super({
            element: document.createElement('div'),
            target: options.target,
        });
        this.test = 20;
        this.show = false;
        /**
         * @private
         * @type {HTMLElement}
         */
        var element = this.element;
        element.className = 'ekmap-bl ol-unselectable ol-control ekmap-bl-layer-open';
        var div = document.createElement('div');
        div.className = 'ekmap-bl-bg ekmap-bl-layer-bt';
        element.appendChild(div);
        var layers = map.getLayers();
        layers.forEach(layer => {
            var divLayer = document.createElement('div');
            divLayer.onclick = function() {
                this.show = !this.show;
                if (!layer.values_.visible)
                    layer.setVisible(true)
            }
            if (layer.values_.visible)
                divLayer.className = 'ekmap-bl-bg ekmap-bl-layer ol-unselectable ol-control active';
            else
                divLayer.className = 'ekmap-bl-bg ekmap-bl-layer ol-unselectable ol-control';
            divLayer.style.zIndex = 1;
            divLayer.style.background = 'url("https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9") 0% 0% / cover no-repeat rgb(255, 255, 255)';
            divLayer.style.transition = 'transform 0.5s ease 0s, bottom 0.5s ease 0s, width 0.5s ease 0s, -webkit-transform 0.5s ease 0s';
            divLayer.style.transform = 'translateX(' + this.test + 'px)';
            divLayer.style.padding = '0px';
            var divText = document.createElement('div');
            divText.setAttribute('class', 'ekmap-bl-bg-text');
            divText.title = layer.values_.name;
            divText.innerHTML = layer.values_.name;
            divLayer.appendChild(divText);
            element.appendChild(divLayer);
            this.test += 100
        });

    }

    setMap(map) {
        console.log(map)
        super.setMap(map);
    }
}