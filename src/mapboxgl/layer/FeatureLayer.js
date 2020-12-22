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
 * @fires mapboxgl.ekmap.FeatureLayer#loadstart
 * @fires mapboxgl.ekmap.FeatureLayer#loadend
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
            where: '1=1'
        };
        var me = this;
        /**
         * @event mapboxgl.ekmap.FeatureLayer#loadstart
         * @description Fired when the feature layer load start.
         */
        me.fire('loadstart', me);
        this.service.query(params, function(result) {
            if (result[0].geometry.type == "Point") {
                map.addSource('point', {
                    "type": "geojson",
                    "data": {
                        'type': 'FeatureCollection',
                        'features': result
                    }
                });

                map.addLayer({
                    "id": "point",
                    "type": "circle",
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "red",
                    },
                    "source": 'point'
                });

                // map.addLayer({
                //     "id": "point-selected",
                //     "type": "circle",
                //     "paint": {
                //         "circle-radius": 10,
                //         "circle-color": "red",
                //         "circle-stroke-color": '#00ffff',
                //         "circle-stroke-width": 3,
                //     },
                //     'filter': ['in', 'OBJECTID', ''],
                //     "source": 'point'
                // });
            }
            if (result[0].geometry.type == "LineString") {
                map.addSource('line', {
                    "type": "geojson",
                    "data": {
                        'type': 'FeatureCollection',
                        'features': result
                    }
                });

                map.addLayer({
                    'id': "line",
                    'type': 'line',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#000',
                        'line-width': 5
                    },
                    "source": "line"
                });

                // map.addLayer({
                //     "id": "point-selected",
                //     "type": "circle",
                //     "paint": {
                //         "circle-radius": 10,
                //         "circle-color": "red",
                //         "circle-stroke-color": '#00ffff',
                //         "circle-stroke-width": 3,
                //     },
                //     'filter': ['in', 'OBJECTID', ''],
                //     "source": 'point'
                // });
            }
            if (result[0].geometry.type == "LineString") {
                map.addSource('area', {
                    "type": "geojson",
                    lineMetrics: true,
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': result
                        }
                    }
                });

                map.addLayer({
                    'id': 'area',
                    'type': 'line',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#90c258',
                        'line-width': 5,
                        'line-gradient': [
                            'interpolate', ['linear'],
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
                    'source': 'area'
                })

                // map.addLayer({
                //     'id': 'area-selected',
                //     'type': 'line',
                //     'layout': {
                //         'line-join': 'round',
                //         'line-cap': 'round'
                //     },
                //     'paint': {
                //         'line-color': 'white',
                //         'line-width': 5
                //     },
                //     'filter': ['in', 'OBJECTID', ''],
                //     "source": 'area'
                // })
            }
            /**
             * @event mapboxgl.ekmap.FeatureLayer#loadend
             * @description Fired when the feature layer load end. 
             */
            me.fire('loadend', me);
        })
        return this;
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.on
     * @description 
     * @param {mapboxgl.Map} map The map is defined.
     * @returns {this}
     */
    on(map) {
        this.map = map
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
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {mapboxgl.LngLatBounds} lngLatBounds
     * @param {RequestCallback} callback
     */
    queryByBound(params, callback, context) {
        return this.service.queryByBound(params, callback, context);
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.queryByGeometry
     * @description  is an abstraction for the query API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.
     * @param {string} geometry The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback
     */
    queryByGeometry(params, callback, context) {
        return this.service.queryByGeometry(params, callback, context);
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.addFeature
     * @description Adds a new feature to the feature layer. this also adds the feature to the map if creation is successful.
     * @param {GeoJSONObject} params GeoJSON of feature add (To change point color, set 'color' for options GeoJSON, the default is light blue ('#3FB1CE')).
     * @param {Function} callback
     * @param {Object} context
     * @returns {this}
     */
    addFeature(params, callback, context) {
        var coor = params.geometry.coordinates;
        var marker = new mapboxgl.Marker({
                'color': params.color ? params.color : ''
            })
            .setLngLat(coor)
            .addTo(this.map);
        this.addFeatures(params, callback, context);
    }

    /**
     * @private
     * @function mapboxgl.ekmap.FeatureLayer.prototype.addFeatures
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
     * @description Remove the feature with the provided id from the feature layer. This will also remove the feature from the map if it exists. Please use function {@link mapboxgl.ekmap.FeatureLayer.html#refresh|refresh()} then delete.
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
     * @function mapboxgl.ekmap.FeatureLayer.prototype.refresh
     * @description Redraws all features from the feature layer that exist on the map.
     */
    refresh() {
        var me = this;
        var data = {};
        var params = {
            where: '1=1'
        };
        this.service.query(params, function(result) {
            data = {
                'type': 'FeatureCollection',
                'features': result
            };
            var filter = ["in", "OBJECTID"];
            if (me.map.getLayer('point')) {
                me.map.getSource('point').setData(data);
                map.setFilter('point-selected', filter);
            }
            if (me.map.getLayer('line')) {
                map.setFilter('line-selected', filter);
                me.map.getSource('line').setData(data);
            }
            if (me.map.getLayer('area')) {
                me.map.getSource('area').setData(data);
                map.setFilter('area-selected', filter);
            }
        });
    }

    /**
     * @function mapboxgl.ekmap.FeatureLayer.prototype.applyEdits
     * @description This operation adds, updates, and deletes features to the associated feature layer. Please use function {@link mapboxgl.ekmap.FeatureLayer.html#refresh|refresh()} then applyEdits.
     * @param {Object} params Options.
     * @param {GeoJSONObject} params.adds GeoJSON of feature add (To change point color, set 'color' for options GeoJSON).
     * @param {GeoJSONObject} params.updates GeoJSON of feature update.
     * @param {Interger} params.deletes Id of feature delete.
     * @param {RequestCallback} callback
     */
    applyEdits(params, callback, context) {
        if (params.adds) {
            var coor = params.adds.geometry.coordinates;
            var marker = new mapboxgl.Marker({
                    'color': params.adds.color ? params.adds.color : ''
                })
                .setLngLat(coor)
                .addTo(this.map);
        }
        return this.service.applyEdits(params, callback, context);
    }
}

mapboxgl.ekmap.FeatureLayer = FeatureLayer;