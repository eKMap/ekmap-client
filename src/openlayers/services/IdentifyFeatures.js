import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { Util } from '../core/Util';

/**
 * @class ol.ekmap.IdentifyFeatures
 * @category  BaseType Service
 * @classdesc  ol.ekmap.IdentifyFeatures is an abstraction for the Identify API found in Map Services. It provides a chainable API for building request parameters and executing the request.
 * @extends {ol.ekmap.ServiceBase}
 * @param {object} options Construction parameters.
 * @param {string} options.url URL of the ArcGIS service you would like to consume.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @example
 * var map = new ol.Map({
 *      container: 'divMapId',
 *      center: [103.9, 22.2],
 *      zoom: 6
 * })
 * var identify = new ol.ekmap.IdentifyFeatures({
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
        this.paramsIdentify = {
            geometry: '',
            sr: 4326,
            layers: 'all',
            tolerance: 6,
            returnGeometry: true,
            f: 'json'
        };
    }

    /**
     * @function ol.ekmap.IdentifyFeatures.prototype.on
     * @description  The map to identify features on.
     * @param {ol.Map} map The map is defined.
     * @returns {this}
     */
    on(map) {
        var bounds = map.getView().calculateExtent();
        var wkid = 4326;
        if (map.getView().getProjection().code_ == 'EPSG:3857')
            wkid = 3857;
        var extent = {
            'xmin': bounds[0],
            'ymin': bounds[1],
            'xmax': bounds[2],
            'ymax': bounds[3],
            'spatialReference': {
                'wkid': wkid
            }
        };
        var size = map.getSize();
        this.paramsIdentify.imageDisplay = [size[0], size[1], 96];
        this.paramsIdentify.mapExtent = [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
        return this;
    }

    /**
     * @function ol.ekmap.IdentifyFeatures.prototype.at
     * @description  Identifies features at a given {@link https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds|ol.LatLngBounds} or a valid GeoJSON object literal.
     * @returns {this}
     */
    at(geometry) {
        if (geometry.length === 2)
            geometry = new ol.geom.Point(geometry);
        this._setGeometryParams(geometry);
        return this;
    }

    /**
     * @function ol.ekmap.IdentifyFeatures.prototype.run
     * @description  Executes the identify request with the current parameters, identified features will be passed to callback as a GeoJSON FeatureCollection. Accepts an optional function context.
     * @returns {this}
     */
    run(callback, context) {
        var service = new IdentifyFeatures(this.options);
        return service.request('identify', this.paramsIdentify, function(error, response) {
            // immediately invoke with an error

            callback.call(context, error, response.results);
        }, this);
    }

    /**
     * @private
     * @function ol.ekmap.IdentifyFeatures.prototype._setGeometryParams
     * @description Set geometry params.
     */
    _setGeometryParams(geometry) {
        var converted = Util._setGeometry(geometry);
        this.paramsIdentify.geometry = converted.geometry;
        this.paramsIdentify.geometryType = converted.geometryType;
    }
}