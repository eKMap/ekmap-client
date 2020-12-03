import ol from 'mapbox-gl';
import { ServiceBase } from './ServiceBase';
import { Util } from '../core/Util';

/**
 * @class ol.ekmap.MapService
 * @category  BaseType Service
 * @classdesc The MapService class.
 * @extends {ol.ekmap.ServiceBase}
 * @param {object} options Construction parameters.
 * @param {string} options.url (Required) The URL to the MapService.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @example
 * var mapService = new ol.ekmap.MapService({
 *      url: //The URL to the MapService
 * });
 * mapService.identify(function(result){
 *     //doSomething
 * })
 */
export class MapService extends ServiceBase {

    constructor(options) {
        super(options);
        this.options = Util.getUrlParams(options);
        this.paramsIdentify = {
            geometry: '',
            sr: 4326,
            layers: 'all',
            tolerance: 3,
            returnGeometry: true
        };
    }

    /**
     * @function ol.ekmap.MapService.prototype.identify
     * @description Returns a new ol.ekmap.IdentifyFeatures object that can be used to identify features contained within this service.
     */
    identify() {
        return new ol.ekmap.IdentifyFeatures(this.options);
    }

    /**
     * @function ol.ekmap.MapService.prototype.find
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {Object} params
     * @param {string} params.f=json The response format. The default response format is html.
     * @param {string} params.searchText (Required) The search string. This is the text that is searched across the layers and fields the user specifies.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    find(params, callback, context) {
        var me = this;
        this.legend(function(obj) {
            var layers = [];
            var list = obj.layers;
            list.forEach(layer => {
                layers.push(layer.layerId);
            })
            var param = {};
            param.searchText = params.searchText;
            param.layers = layers.toString();
            param.f = 'json';
            var service = new MapService(me.options);
            return service.request('find', param, function(error, response) {
                callback.call(context, error, response, response);
            }, me);
        })

    }

    /**
     * @function ol.ekmap.MapService.prototype.query
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} params
     * @param {string} params.f=json The response format. The default response format is json.
     * @param {string} params.where A WHERE clause for the query filter. Any legal SQL WHERE clause operating on the fields in the layer is allowed.
     * @param {string} params.text A literal search text. If the layer has a display field associated with it, the server searches for this text in this field. This parameter is shorthand for a WHERE clause of where <displayField> like '%<text>%'. The text is case sensitive. This parameter is ignored if the WHERE parameter is specified.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    query(params, callback, context) {
        var param = {};
        param.where = params.where;
        param.text = params.text;
        param.objectIds = params.objectId;
        param.f = 'json';
        var service = new MapService(this.options);
        return service.request('query', param, function(error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function ol.ekmap.MapService.prototype.getLayers
     * @description  Get list layer on map. 
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    getLayers(callback, context) {
        var params = {};
        params.f = 'pjson';
        var service = new MapService(this.options);
        return service.request('layers', params, function(error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function ol.ekmap.MapService.prototype.legend
     * @description  Get legend on map.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    legend(callback, context) {
        var params = {};
        params.f = 'json';
        var service = new MapService(this.options);
        return service.request('legend', params, function(error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function ol.ekmap.MapService.prototype.queryByBound
     * @description  Is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {ol.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    queryByBound(params, callback, context) {
        var param = {};
        var data = Util._setGeometry(params);
        param.f = 'geojson';
        param.geometryType = data.geometryType;
        param.geometry = data.geometry;
        var service = new MapService(this.options);
        return service.request('query', param, function(error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function ol.ekmap.MapService.prototype.queryByGeometry
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    queryByGeometry(params, callback, context) {
        var param = {};
        param.f = 'geojson';
        if (params) {
            var geom = params;
            if (params.type == 'Point') {
                param.geometryType = 'esriGeometryPoint'
                param.geometry = {
                    "x": geom.coordinates[0],
                    "y": geom.coordinates[1],
                    "spatialReference": { "wkid": 4326 }
                }
            }
            if (params.type == 'Polygon') {
                param.geometryType = 'esriGeometryPolygon';
                param.geometry = {
                    "rings": geom.coordinates,
                    "spatialReference": { "wkid": 4326 }
                }
            }
            if (params.type == 'LineString')
                param.geometryType = 'esriGeometryPolyline'
        }
        var service = new MapService(this.options);
        return service.request('query', param, function(error, response) {
            callback.call(context, error, response, response);
        }, this);
    }
}

ol.ekmap.MapService = MapService;