import { Util } from '../core/Util';
import Observable from 'ol/Observable';
import { Point } from 'mapbox-gl';
import Geometry from 'ol/geom/geometry';

/**
 * @class ol.ekmap.FeatureLayer
 * @classdesc ol.ekmap.FeatureLayer is used to visualize, style, query and edit vector geographic data hosted in both ArcGIS Online and published using ArcGIS Server. Copyright text from the service is added to map attribution automatically.
 * @category  Layer
 * @param {Object} options - Construction parameters.
 * @param {string} options.id - Unique layer and source name.
 * @param {string} options.url - Required The URL to the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Feature Layer}.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @extends {ol.Observable}
 * @fires ol.ekmap.FeatureLayer#loadstart
 * @fires ol.ekmap.FeatureLayer#loadend
 */
export class FeatureLayer extends Observable {

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
                this.service = new ol.ekmap.FeatureService(options);
            }

            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);
            }

            this.id = this.options.id != undefined ? this.options.id : 'layer-vector' + guid12();
        }
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map Adds the layer to the given map or layer group.
     * @returns {this}
     */
    addTo(map) {
        this.map = map;
        var params = {
            where: '1=1'
        };
        var me = this;
        /**
         * @event ol.ekmap.FeatureLayer#loadstart
         * @description Fired when the feature layer load start.
         */
        me.dispatchEvent({ type: 'loadstart', value: me });

        var style = new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#088'
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'red',
                }),
            })
        })
        var resultLayer;
        me.service.query(params, function(error, result) {
                var features = {
                    type: "FeatureCollection",
                    features: result
                };
                var vectorSource = new ol.source.Vector({
                    features: (new ol.format.GeoJSON()).readFeatures(features),
                    wrapX: false
                });
                resultLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: style
                });
                resultLayer.setProperties({
                    'id': me.id
                })
                map.addLayer(resultLayer);
            })
            /**
             * @event ol.ekmap.FeatureLayer#loadend
             * @description Fired when the feature layer load end.
             */
        me.dispatchEvent({ type: 'loadend', value: me });
        return me;
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.on
     * @description On map
     * @param {ol.Map} map The map is defined.
     * @returns {this}
     */
    // on(map) {
    //     this.map = map
    //     return this;
    // }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.query
     * @description Query data.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback
     *
     */
    query(params, callback, context) {
        return this.service.query(params, callback, context);
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.queryByBound
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {ol.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback
     */
    queryByBound(params, callback, context) {
        return this.service.queryByBound(params, callback, context);
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.queryByGeometry
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {string} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback
     */
    queryByGeometry(params, callback, context) {
        return this.service.queryByGeometry(params, callback, context);
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.addFeature
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {ol.Feature} feature ol.Feature
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeature(feature, callback, context) {
        var layers = map.getLayers().array_;
        layers.forEach(function(layer) {
            if (layer.getProperties().id == 'point') {
                var source = layer.getSource();
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: './img/icon-rain.png',
                        anchor: [1, 1],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'fraction',
                        scale: 0.05
                    }),
                }))
                source.addFeature(feature)
            }
        });
        this.addFeatures(feature, callback, context);
    }

    /**
     * @private
     * @function ol.ekmap.FeatureLayer.prototype.addFeatures
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {ol.Feature} feature ol.Feature
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeatures(feature, callback, context) {
        return this.service.addFeatures(feature, callback, context);
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.updateFeature
     * @description Update the provided feature on the Feature Layer. This also updates the feature on the map. To update the point location on the map. Please use function {@link ol.ekmap.FeatureLayer.html#refresh|refresh()} then update.
     * @param {ol.Feature} feature ol.Feature
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     * @returns {this}
     */
    updateFeature(feature, callback, context) {
        this.updateFeatures(feature, callback, context);
    }

    /**
     * @private
     * @function ol.ekmap.FeatureLayer.prototype.updateFeatures
     * @description Update the provided feature on the Feature Layer. This also updates the feature on the map.
     * @param {ol.Feature} feature ol.Feature
     * @param {Function} callback The callback of result data returned by the server side.
     * @param {Object} context
     */
    updateFeatures(feature, callback, context) {
        return this.service.updateFeatures(feature, callback, context);
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.deleteFeature
     * @description Remove the feature with the provided id from the feature layer. This will also remove the feature from the map if it exists. Please use function {@link ol.ekmap.FeatureLayer.html#refresh|refresh()} then delete.
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
     * @function ol.ekmap.FeatureLayer.prototype.deleteFeatures
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
     * @function ol.ekmap.FeatureLayer.prototype.refresh
     * @description Redraws all features from the feature layer that exist on the map.
     */
    refresh() {
        var me = this;
        var data = {};
        var params = {
            where: '1=1'
        };
        this.service.query(params, function(error, result) {
            var features = {
                type: "FeatureCollection",
                features: result
            };

            var vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(features),
                wrapX: false
            });
            var layers = me.map.getLayers().array_;
            layers.forEach(function(layer) {
                if (layer.getProperties().id == me.id) {
                    layer.setSource(vectorSource)
                }
            });
        });
    }

    /**
     * @function ol.ekmap.FeatureLayer.prototype.applyEdits
     * @description This operation adds, updates, and deletes features to the associated feature layer. Please use function {@link ol.ekmap.FeatureLayer.html#refresh|refresh()} then applyEdits.
     * @param {Object} params Options.
     * @param {GeoJSONObject} params.adds GeoJSON of feature add (To change point color, set 'color' for options GeoJSON).
     * @param {GeoJSONObject} params.updates GeoJSON of feature update.
     * @param {Interger} params.deletes Id of feature delete.
     * @param {RequestCallback} callback
     */
    applyEdits(params, callback, context) {
        if (params.adds) {
            var layers = map.getLayers().array_;
            layers.forEach(function(layer) {
                if (layer.getProperties().id == 'point') {
                    var source = layer.getSource();
                    if (params.adds instanceof ol.Feature)
                        source.addFeature(params.adds)
                    else {
                        var feature = new ol.Feature({
                            geometry: params.adds
                        })
                        source.addFeature(feature)
                    }
                }
            });
        }
        return this.service.applyEdits(params, callback, context);
    }
}