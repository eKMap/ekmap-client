import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.FeatureLayer
 * @classdesc mapboxgl.ekmap.FeatureLayer is used to visualize, style, query and edit vector geographic data hosted in both ArcGIS Online and published using ArcGIS Server. Copyright text from the service is added to map attribution automatically.
 * @category  Layer
 * @param {Object} options - Construction parameters.
 * @param {string} options.url - Required The URL to the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Feature Layer}.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.Evented}
 */
export class FeatureLayer extends mapboxgl.Evented {

    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                if (options.url.indexOf('{s}') !== -1 && options.subdomains && options.url)
                    options.url = options.url.replace('{s}', options.subdomains[0]);
                this.service = new mapboxgl.ekmap.FeatureService(options);
            }

            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);
            }
        }
        /**
         * @event mapboxgl.ekmap.FeatureLayer#Click
         * @description Fired when the user click the feature on layer.
         */
        this.fire('Click', this);
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map Adds the layer to the given map or layer group.
     * @returns {this}
     */
    addTo(map) {
        this.map = map;
        var params = {
            where: 'CHAR_LENGTH(OBJECTID) > 0'
        };
        this.service.query(params, function (result) {
            if (result[0].geometry.type == "Point") {
                map.addLayer({
                    "id": "Point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "red",
                    },
                    "source": {
                        "type": "geojson",
                        "data": {
                            'type': 'FeatureCollection',
                            'features': result
                        }
                    }
                });
            }
            if (result[0].geometry.type == "LineString") {
                map.addLayer({
                    'id': "Line",
                    'type': 'line',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#000',
                        'line-width': 5
                    },
                    "source": {
                        "type": "geojson",
                        "data": {
                            'type': 'FeatureCollection',
                            'features': result
                        }
                    }
                });
            }
            if (result[0].geometry.type == "LineString") {
                map.addLayer({
                    'id': 'Area',
                    'type': 'line',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#90c258',
                        'line-width': 5,
                        'line-gradient': [
                            'interpolate',
                            ['linear'],
                            ['line-progress'],
                            0,
                            'blue',
                            0.1,
                            'royalblue',
                            0.3,
                            'cyan',
                            0.5,
                            'lime',
                            0.7,
                            'yellow',
                            1,
                            'red'
                        ],
                    },
                    source: {
                        "type": "geojson",
                        lineMetrics: true,
                        'data': {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': result
                            }
                        }
                    }
                })
            }
        })
        return this;
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.query
     * @description Query data.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback 
     *
     */
    query(params, callback, context) {
        return this.service.query(params, callback, context);
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.queryByBound
     * @description  is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {mapboxgl.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback
     */
    queryByBound(params, callback, context) {
        return this.service.queryByBound(params, callback, context);
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.queryByGeometry
     * @description  is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {string} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback
     */
    queryByGeometry(params, callback, context) {
        return this.service.queryByGeometry(params, callback, context);
    }

    /**
   * @function mapboxgl.ekmap.FeatureLayer.prototype.addFeature
   * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
   * @param {Object} params Options
   * @param {mapboxgl.LngLat} params.lngLat
   * @param {string} params.color The color to use for the default marker if options.element is not provided. The default is light blue ('#3FB1CE').
   * @param {Function} callback
   * @param {Object} context
   * @returns {this}
   */
    addFeature(params, callback, context) {
        var marker = new mapboxgl.Marker({
            'color': params.color ? params.color : ''
        })
        .setLngLat([params.lngLat.lng,params.lngLat.lat])
        .addTo(this.map);
        this.addFeatures(params, callback, context);
    }

    /**
    * @private
    * @function mapboxgl.ekmap.FeatureLayer.prototype.addFeatures
    * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
    * @param {Object} params Options
    * @param {mapboxgl.LngLat} params.LngLat 
    * @param {string} params.color The color to use for the default marker if options.element is not provided. The default is light blue ('#3FB1CE').
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    * @returns {this}
    */
    addFeatures(params, callback, context) {
        return this.service.addFeatures(params, callback, context);
    }

    /**
    * @function mapboxgl.ekmap.FeatureLayer.prototype.updateFeature
    * @description Update the provided feature on the Feature Layer. This also updates the feature on the map. To update the point location on the map. Please use function {@link mapboxgl.ekmap.FeatureLayer.html#refresh|refresh()} then update.
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
    * @function mapboxgl.ekmap.FeatureLayer.prototype.updateFeatures
    * @description Update the provided feature on the Feature Layer. This also updates the feature on the map.
    * @param {GeoJSONObject} geojson Infomation feature by geoJSON.
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    */
    updateFeatures(geojson, callback, context) {
        return this.service.updateFeatures(geojson, callback, context);
    }

    /**
    * @function mapboxgl.ekmap.FeatureLayer.prototype.deleteFeature
    * @description Remove the feature with the provided id from the feature layer. This will also remove the feature from the map if it exists.
    * @param {string} id Id of feature.
    * @param {Function} callback The callback of result data returned by the server side.
    * @param {Object} context
    * @returns {this}
    */
    deleteFeature(id, callback, context) {
        this.deleteFeatures(id, callback, context);
    }

    /**
    * @private
    * @function mapboxgl.ekmap.FeatureLayer.prototype.deleteFeatures
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
    * @function mapboxgl.ekmap.FeatureLayer.prototype.on
    * @description Listen for a event.
    * @param {string} event The event type or array of event types.
    * @param {Function} callback The callback of result data returned by the server side.
    * @returns {} Unique key for the listener. If called with an array of event types as the first argument, the return will be an array of keys.
    */
    on(event, callback) {
        var me = this;
        if (event == 'click') {
            this.map.on('click', function (e) {
                var lngLat = e.lngLat;
                var featureService = new mapboxgl.ekmap.FeatureService(me.options);
                featureService.nearby(lngLat.lat, lngLat.lng, function (obj) {
                    if (obj.objectIds)
                        callback(obj);
                    else
                        callback(e)
                })

            })
        }
    }

    /**
    * @function mapboxgl.ekmap.FeatureLayer.prototype.refresh
    * @description Redraws all features from the feature layer that exist on the map.
    */
    refresh() {
        var me = this;
        var data = {};
        var params = {
            where: 'CHAR_LENGTH(OBJECTID) > 0'
        };
        this.service.query(params, function (result) {
            data = {
                'type': 'FeatureCollection',
                'features': result
            }
            if (me.map.getLayer('Point')) {
                me.map.getSource('Point').setData(data);
            }
            if (me.map.getLayer('Line'))
                me.map.getSource('Line').setData(data);
            if (me.map.getLayer('Area'))
                me.map.getSource('Area').setData(data);
        });
    }

    applyEdits(params, callback,context) {
        return this.service.applyEdits(params, callback, context);
    }
}

mapboxgl.ekmap.FeatureLayer = FeatureLayer;
