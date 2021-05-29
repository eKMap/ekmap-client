import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.WFS
 * @classdesc Instantiates a WFS tile layer object given a base URL of the WFS service and a WFS parameters/options object..
 * @category Layer
 * @param {string} baseUrl  a base URL of the WFS service.
 * @param {Object} options  Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.service='WFS' (required) Comma-separated list of WFS layers to show.
 * @param {string} options.typeName type name.
 * @param {string} options.request='GetFeature' Comma-separated list of WFS styles.
 * @param {string} options.maxFeatures=50 Limit the amount of features returned
 * @param {string} options.format='image/jpeg' WFS image format (use 'image/png' for layers with transparency).
 * @param {boolean} options.outputFormat='application/json' 
 * @param {string} options.version='1.0.0' Version of the WFS service to use.
 * @extends {mapboxgl.Evented}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'divMapId',
 *     zoom: 3.9996619013972636,
 *     center: [-96.52559859275812, 39.21792880745451]
 * });
 * var wfs = new mapboxgl.ekmap.WFS('https://demo.geo-solutions.it/geoserver/topp/ows', {
 *     typeName: 'topp:states'
 * })
 * wfs.getFeature(function(e){
 *     //JSON data
 * })
 */
export class WFS extends mapboxgl.Evented {

    constructor(url, options) {
        super();
        this._url = url;
        this.defaultWFSParams = {
            service: 'WFS',
            request: 'GetFeature',
            typeName: '',
            maxFeatures: options.maxFeatures != undefined ? options.maxFeatures : 50,
            format: 'image/jpeg',
            outputFormat: 'application/json',
            version: '1.0.0',
            token: ''
        }
        this.id = options.id != undefined ? options.id : "ogc-wfs" + guid12();
        var WFSParams = Util.extend({}, this.defaultWFSParams);
        // all keys that are not TileLayer options go to WFS params
        for (var i in options) {
            WFSParams[i] = options[i];
        }
        this.WFSParams = WFSParams;
    }

    /**
     * @function mapboxgl.ekmap.WFS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        this._map = map;
        var me = this;
        var baseUrl = this._url + '?' + Util.serialize(this.WFSParams);
        $.get(baseUrl, function(res) {
            map.addLayer({
                'id': 'polygon-' + guid12(),
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': res,
                },
                'paint': {
                    'fill-color': '#888888',
                    'fill-opacity': 0.4
                },
                'filter': ['==', ["geometry-type"], 'Polygon']
            });
            map.addLayer({
                'id': 'point-' + guid12(),
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': res,
                },
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "red"
                },
                'filter': ['==', ["geometry-type"], 'Point']
            });

            map.addLayer({
                'id': 'line-' + guid12(),
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': res,
                },
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#000',
                    'line-width': 5
                },
                'filter': ['==', ["geometry-type"], 'LineString']
            });
            /**
             * @event mapboxgl.ekmap.WFS#load
             * @description Fired when the layer of WFS loaded.
             */
            me.fire('load');
        })
        return this;
    }

    /**
     * @function mapboxgl.ekmap.WFS.prototype.getFeature
     * @description Adds the layer to the given map or layer group.
     * @returns geojson
     */
    getFeature(callback) {
        var baseUrl = this._url + '?' + Util.serialize(this.WFSParams);
        var result;
        $.get(baseUrl, function(res) {
            result = res;
        }).done(function() {
            return callback(result);
        })
    }
}

mapboxgl.ekmap.WFS = WFS;