import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { Util } from '../core/Util';
import { Parse } from '../core/Parse';

/**
 * @class mapboxgl.ekmap.FeatureService
 * @category  BaseType Service
 * @classdesc FeatureService.
 * @example
 * var featureService = new mapboxgl.ekmap.FeatureService({
 *      url : //The URL to the Feature Service
 * });
 * featureService.query(params,function(result){
 *     //doSomething
 * })
 * @extends {mapboxgl.ekmap.ServiceBase}
 * @param {object} options Construction parameters.
 * @param {string} [options.url]  (Required) The URL to the Feature Service.
 * @param {string} [options.token] - Will use this token to authenticate all calls to the service.
 */
export class FeatureService extends ServiceBase {
    constructor(options) {
        super(options);
        if (options.url){
            this.options = Util.getUrlParams(options);
        }
    }

    nearby(lngLat, callback, context) {
        var params = {};
        params.geometry = [lngLat.lng, lngLat.lat];
        params.geometryType = 'esriGeometryPoint';
        params.spatialRel = 'esriSpatialRelIntersects';
        params.units = 'esriSRUnit_Kilometer';
        params.distance = 5;
        params.inSr = 4326;
        params.returnIdsOnly = true;
        params.f = 'json';
        var service = new FeatureService(this.options);
        return service.request('query', params, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.run
     * @description  Executes the identify request with the current parameters, identified features will be passed to callback as a GeoJSON FeatureCollection. Accepts an optional function context.
     * @returns {this}
     */
    run(callback, context) {
        this._cleanParams();
        var service = new FeatureService(this.options);
        // services hosted on ArcGIS Online and ArcGIS Server 10.3.1+ support requesting geojson directly
        if (this.options.isModern || isArcgisOnline(this.options.url)) {
            this.params.f = 'geojson';

            return service.request('query', params, function (error, response) {
                this._trapSQLerrors(error);
                callback.call(context, error, response, response);
            }, this);

            // otherwise convert it in the callback then pass it on
        } else {
            return service.request('query', params, function (error, response) {
                this._trapSQLerrors(error);
                callback.call(context, error, (response && responseToFeatureCollection(response)), response);
            }, this);
        }
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.addFeature
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {GeoJSONObject} params GeoJSON of feature add (To change point color, set 'color' for options GeoJSON, the default is light blue ('#3FB1CE')).
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeature(params, callback, context) {
        this.addFeatures(params, callback, context);
    }

    /**
     * @private
     * @function mapboxgl.ekmap.FeatureService.prototype.addFeatures
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {GeoJSONObject} params GeoJSON of feature add (To change point color, set 'color' for options GeoJSON, the default is light blue ('#3FB1CE')).
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeatures(params, callback, context) {
        var fea = Parse.geojsonToArcGIS(params);
        var data = [];
        data.push(fea)
        var dataPost = JSON.stringify(data)
        var service = new FeatureService(this.options);
        return service.post('addFeatures', dataPost, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
    * @function mapboxgl.ekmap.FeatureService.prototype.updateFeature
    * @description Update the provided feature on the Feature Layer. This also updates the feature on the map.
    * @param {GeoJSONObject} params Infomation feature.
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    * @returns {this}
    */
    updateFeature(params, callback, context) {
        this.updateFeatures(params, callback, context);
    }

    /**
    * @private
    * @function mapboxgl.ekmap.FeatureService.prototype.updateFeatures
    * @description Update the provided feature on the Feature Layer. This also updates the feature on the map.
    * @param {GeoJSONObject} params - Infomation feature.
    */
    updateFeatures(params, callback, context) {
        var fea = Parse.geojsonToArcGIS(params);
        var data = [];
        data.push(fea)
        var dataPost = JSON.stringify(data)
        var service = new FeatureService(this.options);
        return service.post('updateFeatures', dataPost, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
    * @function mapboxgl.ekmap.FeatureService.prototype.deleteFeature
    * @description Remove the feature with the provided id from the feature layer. This will also remove the feature from the map if it exists.
    * @param {Interger} id Id of feature.
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    * @returns {this}
    */
    deleteFeature(id, callback, context) {
        this.deleteFeatures(id, callback, context);
    }

    /**
    * @function mapboxgl.ekmap.FeatureService.prototype.deleteFeatures
    * @description Removes an array of features with the provided ids from the feature layer. This will also remove the features from the map if they exist.
    * @param {Integers} ids List id of features.
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    * @returns {this}
    */
    deleteFeatures(ids, callback, context) {
        var service = new FeatureService(this.options);
        return service.post('deleteFeatures', ids, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.query
     * @description Query data
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback
     */
    query(params, callback, context) {
        var param = {};
        param.where = params.where;
        if (params.orderByFields)
            param.orderByFields = params.orderByFields
        if (params.geometry) {
            var geom = params.geometry;
            if (params.geometry.type == 'Point') {
                param.geometryType = 'esriGeometryPoint'
                param.geometry = {
                    "x": geom.coordinates[0],
                    "y": geom.coordinates[1],
                    "spatialReference": { "wkid": 4326 }
                }
            }
            if (params.geometry.type == 'Polygon') {
                param.geometryType = 'esriGeometryPolygon';
                param.geometry = {
                    "rings": geom.coordinates,
                    "spatialReference": { "wkid": 4326 }
                }
            }
            if (params.geometry.type == 'LineString')
                param.geometryType = 'esriGeometryPolyline'
        }
        param.outFields = '*';
        param.f = 'geojson';
        var service = new FeatureService(this.options);
        return service.request('query', param, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.queryByBound
     * @description  is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {mapboxgl.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback
     */
    queryByBound(lngLatBounds, callback, context) {
        var param = {};
        var data = Util._setGeometry(lngLatBounds);
        param.f = 'geojson';
        param.outFields = '*';
        param.geometryType = data.geometryType;
        param.geometry = data.geometry;
        var service = new FeatureService(this.options);
        return service.request('query', param, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.queryByGeometry
     * @description  is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback
     */
    queryByGeometry(params, callback, context) {
        var param = {};
        param.f = 'geojson';
        param.outFields = '*';
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
        var service = new FeatureService(this.options);
        return service.request('query', param, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureService.prototype.applyEdits
     * @description This operation adds, updates, and deletes features to the associated feature layer.
     * @param {Object} params Options.
     * @param {GeoJSONObject} params.adds GeoJSON of feature add.
     * @param {GeoJSONObject} params.updates GeoJSON of feature update.
     * @param {Interger} params.deletes Id of feature delete.
     * @param {RequestCallback} callback
     */
    applyEdits(params, callback, context) {
        var param = {}
        if (params.adds) {
            var dataAdd = Parse.geojsonToArcGIS(params.adds);
            var arr1 = [];
            arr1.push(dataAdd);
            param.adds = JSON.stringify(arr1)
        } else
            params.adds = false;
        if (params.updates) {
            var dataUpdate = Parse.geojsonToArcGIS(params.updates);
            var arr2 = [];
            arr2.push(dataUpdate);
            param.updates = JSON.stringify(arr2)
        } else
            params.updates = false;
        if (params.deletes)
            param.deletes = params.deletes;
        else
            param.deletes = false;
        var service = new FeatureService(this.options);
        return service.post('applyEdits', param, function (error, response) {
            callback.call(context, error, response, response);
        }, this);
    }
}

mapboxgl.ekmap.FeatureService = FeatureService;
