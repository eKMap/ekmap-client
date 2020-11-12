import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Parse } from '../core/Parse';
import { Util } from '../core/Util';

/**
 * @class mapboxgl.ekmap.HeatMapLayer
 * @classdesc The class of the thermal layer.
 * @category  Visualization HeatMap
 * @param {string} name The name of the source.
 * @param {Object} options Construction parameters.
 * @param {mapboxgl.Map} options.map The map object of mapboxgl.
 * @param {string} options.id Id of layer.
 * @param {number} options.radius=50 The maximum radius of the hotspot rendering (hotspot pixel radius) in px. 
 * @extends {mapboxgl.Evented}
 */
export class HeatMapLayer extends mapboxgl.Evented {

    constructor(name, options) {
        super();
        
        var _options = options ? options : {};

         /**
         * @member {string} mapboxgl.ekmap.HeatMapLayer.prototype.name
         * @description Name of source.
         */
        this.source = name;

         /**
         * @member {string} mapboxgl.ekmap.HeatMapLayer.prototype.id
         * @description Id of layer.
         */
        this.id = _options.id ? _options.id : "heatmap";
        
        /**
         * @member {mapboxgl.Map} mapboxgl.ekmap.HeatMapLayer.prototype.map
         * @description map
         */
        this.map = _options.map ? _options.map : null;

        /**
         * @member {number} mapboxgl.ekmap.HeatMapLayer.prototype.radius
         * @description map
         */
        this.radius = _options.radius ? _options.radius : 50

         /**
         * @member {string} mapboxgl.ekmap.HeatMapLayer.prototype.type
         * @description Default 'heatmap'.
         */
        this.type = 'heatmap';

         /**
         * @member {Object} mapboxgl.ekmap.HeatMapLayer.prototype.paint
         * @description  Object.
         * @private
         */
        this.paint = {
            "heatmap-weight": 1,
            "heatmap-intensity": 2,
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)",
            ],
            "heatmap-radius": this.radius,
        };
    }

    /**
     * @function mapboxgl.ekmap.HeatMapLayer.prototype.addFeatures
     * @description Add features
     * @param {GeoJSONObject} features 
     *
     * @example
     * var geojson = {
     *      "type": "FeatureCollection",
     *      "features": [
     *          {
     *              "type": "feature",
     *              "geometry": {
     *                  "type": "Point", 
     *                  "coordinates": [0, 0]
     *              },
     *              "properties": {
     *                  //id, name, ...
     *              }
     *          }
     *      ]
     *   };
     * var heatMapLayer = new mapboxgl.ekmap.HeatMapLayer("heatmaplayer",{"map":map});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   pLayer = new mapboxgl.ekmap.HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
     * heatMapLayer.addFeatures(geojson);
     * map.addLayer(heatMapLayer);
     */
    addFeatures(features) {
        this.map.addSource(this.source, {
            type: "geojson",
            data: features,
        });
    }
}

mapboxgl.ekmap.HeatMapLayer = HeatMapLayer;
