import { Util } from '../core/Util';
import L, { map } from 'leaflet';
import { Layer } from 'leaflet';


/**
 * @class L.ekmap.FeatureLayer
 * @classdesc L.ekmap.FeatureLayer is used to visualize, style, query and edit vector geographic data hosted in both ArcGIS Online and published using ArcGIS Server. Copyright text from the service is added to map attribution automatically.
 * @category  Layer
 * @param {Object} options - Construction parameters.
 * @param {string} options.url - Required The URL to the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Feature Layer}.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @extends {Layer}
 * @fires L.ekmap.FeatureLayer#loadstart
 * @fires L.ekmap.FeatureLayer#loadend
 */
export class FeatureLayer extends Layer {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                if (options.url.indexOf('{s}') !== -1 && options.subdomains && options.url)
                    options.url = options.url.replace('{s}', options.subdomains[0]);
                this.service = new L.ekmap.FeatureService(options);
            }

            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);
            }
        }
        this.id = 'featureLayer';
        this.layer = null;
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map Adds the layer to the given map or layer group.
     * @returns {this}
     */
    onAdd(map) {
        this.map = map;
        var params = {
            where: '1=1'
        };
        var me = this;
        /**
         * @event L.ekmap.FeatureLayer#loadstart
         * @description Fired when the feature layer load start.
         */
        me.fire('loadstart', me);
        me.service.query(params, function(error, result) {
            if (result[0].geometry.type == "Point" || result[0].geometry.type == "MultiPoint") {
                var geojsonMarkerOptions = {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                };

                var arr = []
                result.forEach(element => {
                    if (element.geometry.coordinates.length > 0)
                        arr.push(element)
                });
                me.layer = L.geoJSON(arr, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, geojsonMarkerOptions);
                    },
                }).addTo(map);
            }
            if (result[0].geometry.type == "LineString" || result[0].geometry.type == "MultiLineString") {
                var arr = []
                result.forEach(element => {
                    if (element.geometry.coordinates.length > 0)
                        arr.push(element)
                });
                me.layer = L.geoJSON(arr, {
                    style: {
                        "color": "#000",
                        "weight": 5,
                    }
                }).addTo(map);
            }
            if (result[0].geometry.type == "Polygon" || result[0].geometry.type == "MultiPolygon") {
                var arr = []
                result.forEach(element => {
                    if (element.geometry.coordinates.length > 0)
                        arr.push(element)
                });
                me.layer = L.geoJSON(arr, {
                    style: {
                        "fillColor": "#088",
                        "fillOpacity": 0.8,
                        "stroke": false
                    }
                }).addTo(map);
            }
            /**
             * @event L.ekmap.FeatureLayer#loadend
             * @description Fired when the feature layer load end. 
             */
            me.fire('loadend', me);
        })
    }

    // /**
    //  * @function L.ekmap.FeatureLayer.prototype.on
    //  * @description On map
    //  * @param {L.Map} map The map is defined.
    //  * @returns {this}
    //  */
    // on(map) {
    //     this.map = map
    //     return this;
    // }

    nearby(latLng, callback, context) {
        return this.service.nearby(latLng, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.query
     * @description Query data.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback 
     *
     */
    query(params, callback, context) {
        return this.service.query(params, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.queryByBound
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {L.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback
     */
    queryByBound(params, callback, context) {
        return this.service.queryByBound(params, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.queryByGeometry
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {string} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback
     */
    queryByGeometry(params, callback, context) {
        return this.service.queryByGeometry(params, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.addFeature
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
     * @function L.ekmap.FeatureLayer.prototype.addFeatures
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {GeoJSONObject} params GeoJSON of feature add (To change point color, set 'color' for options GeoJSON, the default is light blue ('#3FB1CE')).
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeatures(params, callback, context) {
        return this.service.addFeatures(params, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.updateFeature
     * @description Update the provided feature on the Feature Layer. This also updates the feature on the map. To update the point location on the map. Please use function {@link L.ekmap.FeatureLayer.html#refresh|refresh()} then update.
     * @param {GeoJSONObject} feature Infomation feature by geoJSON.
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     * @returns {this}
     */
    updateFeature(feature, callback, context) {
        this.updateFeatures(feature, callback, context);
    }

    /**
     * @private
     * @function L.ekmap.FeatureLayer.prototype.updateFeatures
     * @description Update the provided feature on the Feature Layer. This also updates the feature on the map.
     * @param {GeoJSONObject} geojson Infomation feature by geoJSON.
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     */
    updateFeatures(geojson, callback, context) {
        return this.service.updateFeatures(geojson, callback, context);
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.deleteFeature
     * @description Remove the feature with the provided id from the feature layer. This will also remove the feature from the map if it exists. Please use function {@link L.ekmap.FeatureLayer.html#refresh|refresh()} then delete.
     * @param {Interger} id Id of feature.
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     * @returns {this}
     */
    deleteFeature(id, callback, context) {
        this.deleteFeatures(id, callback, context);
    }

    /**
     * @private
     * @function L.ekmap.FeatureLayer.prototype.deleteFeatures
     * @description Removes an array of features with the provided ids from the feature layer. This will also remove the features from the map if they exist.
     * @param {Interger} ids List id of features.
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     * @returns {this}
     */
    deleteFeatures(ids, callback, context) {
        return this.service.deleteFeatures(ids, callback, context)
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.refresh
     * @description Redraws all features from the feature layer that exist on the map.
     */
    refresh() {
        var me = this;
        var data = {};
        var params = {
            where: '1=1'
        };
        this.service.query(params, function(error, result) {
            var arr = []
            result.forEach(element => {
                if (element.geometry.coordinates.length > 0)
                    arr.push(element)
            });

            me.map.eachLayer(function(layer) {
                if (layer.id && layer.id == 'featureLayer') {
                    me.layer.clearLayers();
                    me.layer.addData(arr);
                }
            });
        });
    }

    /**
     * @function L.ekmap.FeatureLayer.prototype.applyEdits
     * @description This operation adds, updates, and deletes features to the associated feature layer. Please use function {@link L.ekmap.FeatureLayer.html#refresh|refresh()} then applyEdits.
     * @param {Object} params Options.
     * @param {GeoJSONObject} params.adds GeoJSON of feature add (To change point color, set 'color' for options GeoJSON).
     * @param {GeoJSONObject} params.updates GeoJSON of feature update.
     * @param {Interger} params.deletes Id of feature delete.
     * @param {RequestCallback} callback
     */
    applyEdits(params, callback, context) {
        return this.service.applyEdits(params, callback, context);
    }
}

L.ekmap.FeatureLayer = FeatureLayer;