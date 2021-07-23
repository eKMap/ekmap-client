import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { Util } from '../core/Util';

/**
 * @class mapboxgl.ekmap.IdentifyFeatures
 * @category  BaseType Service
 * @classdesc  mapboxgl.ekmap.IdentifyFeatures is an abstraction for the Identify API found in Map Services. It provides a chainable API for building request parameters and executing the request.
 * @extends {mapboxgl.ekmap.ServiceBase}
 * @param {object} options Construction parameters.
 * @param {string} options.url URL of the ArcGIS service you would like to consume.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {Array<string>} options.layers=['all'] - List layers use for identify.
 * @example
 * var map = new mapboxgl.Map({
 *      container: 'divMapId',
 *      center: [103.9, 22.2],
 *      zoom: 6
 * })
 * var identify = new mapboxgl.ekmap.IdentifyFeatures({
 *      url: 'https://viegisserver.ekgis.vn/gserver/rest/services/35/MapServer'
 * })
 *   .on(map)
 *   .at([])
 *   .run(function (obj) {
 *      console.log();
 *   })
 *     //doSomething
 * })
 */
export class IdentifyFeatures extends ServiceBase {

    constructor(options) {
        super(options);
        if (options.url)
            this.options = Util.getUrlParams(options);
        this.layers = this.options.layers != undefined ? 'visible:' + this.options.layers.toString : 'all';
        this.paramsIdentify = {
            geometry: '',
            sr: 4326,
            layers: this.layers,
            tolerance: 6,
            returnGeometry: true,
            f: 'json'
        };
    }

    /**
     * @function mapboxgl.ekmap.IdentifyFeatures.prototype.on
     * @description  The map to identify features on.
     * @param {mapboxgl.Map} map The map is defined.
     * @returns {this}
     */
    on(map) {
        var bounds = new mapboxgl.LngLatBounds(map.getBounds()._sw, map.getBounds()._ne);
        var extent = {
            'xmin': bounds.getSouthWest().lng,
            'ymin': bounds.getSouthWest().lat,
            'xmax': bounds.getNorthEast().lng,
            'ymax': bounds.getNorthEast().lat,
            'spatialReference': {
                'wkid': 4326
            }
        };
        var size = map.getContainer()
        this.paramsIdentify.imageDisplay = [size.clientWidth, size.clientHeight, 96];
        this.paramsIdentify.mapExtent = [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
        return this;
    }

    /**
     * @function mapboxgl.ekmap.IdentifyFeatures.prototype.at
     * @description  Identifies features at a given {@link https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds|mapboxgl.LatLngBounds} or a valid GeoJSON object literal.
     * @returns {this}
     */
    at(geometry) {
        if (geometry.length === 2)
            geometry = new mapboxgl.LngLat(geometry);
        this._setGeometryParams(geometry);
        return this;
    }

    /**
     * @function mapboxgl.ekmap.IdentifyFeatures.prototype.run
     * @description  Executes the identify request with the current parameters, identified features will be passed to callback as a GeoJSON FeatureCollection. Accepts an optional function context.
     * @returns {this}
     */
    run(callback, context) {
        var service = new IdentifyFeatures(this.options);
        return service.request('identify', this.paramsIdentify, function (error, response) {
            // immediately invoke with an error

            callback.call(context, error, response.results);
        }, this);
    }

    /**
     * @private
     * @function mapboxgl.ekmap.IdentifyFeatures.prototype._setGeometryParams
     * @description Set geometry params.
     */
    _setGeometryParams(geometry) {
        var converted = Util._setGeometry(geometry);
        this.paramsIdentify.geometry = converted.geometry;
        this.paramsIdentify.geometryType = converted.geometryType;
    }

    /**
     * @function mapboxgl.ekmap.IdentifyFeatures.prototype.setLayers
     * @param {Array<string>} layers List layers (if you want to set all layers eg: ['all']).
     * @description Set list layers for identify.
     */
    setLayers(layers) {
        var layers = layers.toString();
        if (layers == 'all')
            this.paramsIdentify.layers = 'all';
        else
            this.paramsIdentify.layers = 'visible:' + layers.toString();
    }
}

mapboxgl.ekmap.IdentifyFeatures = IdentifyFeatures;