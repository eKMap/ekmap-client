import { feature } from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { Util } from '../core/Util';

/**
 * @class mapboxgl.ekmap.VectorTiledMapLayer
 * @classdesc The VectorTiledMapLayer class.
 * @category Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url 
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.Evented}
 */
export class VectorTiledMapLayer extends mapboxgl.Evented {
    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = options.url + 'resources/styles'
            }
        }
        if (options.token)
            this.tileUrl += ('?token=' + this.options.token);
        this.map = '';
        this.arr = [];
        this.name = [];
        this.objectLayer = {};
        this.layerPointLine = [];
        this.featuresCheck = '';
        this.urlFeatureService = options.url.replace("VectorTileServer", "FeatureServer")
        this.urlMapService = options.url.replace("VectorTileServer", "MapServer")


    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        this.map = map;
        var me = this;
        map.setStyle(this.tileUrl);
        me.fire('loadend', me);
        var listLayer = [];
        //Style point,line,polygon
        map.on('load', function() {
            var layers = map.getStyle().layers;
            layers.forEach(layer => {
                var idCheck = layer.id % 2;
                if (!isNaN(idCheck)) {
                    listLayer.push(layer)
                    me.arr.push(layer.id)
                    me.name.push(layer.metadata.name)
                }
            });
            // listLayer.forEach(layer => {
            //     if (layer.type == 'fill')
            //         map.addLayer({
            //             "id": "areaResult" + guid12(),
            //             "source": layer.source,
            //             "type": "line",
            //             "source-layer": layer.id,
            //             "metadata": {
            //                 'name': '',
            //                 'type': '',
            //             },
            //             'layout': {
            //                 'line-join': 'round',
            //                 'line-cap': 'round'
            //             },
            //             'paint': {
            //                 'line-color': [
            //                     'case', ['boolean', ['feature-state', 'hover'], false],
            //                     '#484896',
            //                     'transparent'
            //                 ],
            //                 'line-width': 2,
            //             }
            //         });
            //     if (layer.type == 'line') {
            //         me.layerPointLine.push(layer.id);
            //         map.addLayer({
            //             "id": "lineResult" + guid12(),
            //             "source": layer.source,
            //             "type": "line",
            //             "source-layer": layer.id,
            //             "metadata": {
            //                 'name': '',
            //                 'type': '',
            //             },
            //             'layout': {
            //                 'line-join': 'round',
            //                 'line-cap': 'round'
            //             },
            //             'paint': {
            //                 'line-color': [
            //                     'case', ['boolean', ['feature-state', 'hover'], false],
            //                     'blue',
            //                     'transparent'
            //                 ],
            //                 'line-width': 2,
            //             }
            //         });
            //     }

            //     if (layer.type == 'circle') {
            //         me.layerPointLine.push(layer.id);
            //         map.addLayer({
            //             'id': 'pointResult' + guid12(),
            //             'type': 'circle',
            //             "source": layer.source,
            //             "source-layer": layer.id,
            //             "metadata": {
            //                 'name': '',
            //                 'type': '',
            //             },
            //             'paint': {
            //                 "circle-color": "red",
            //                 "circle-stroke-color": [
            //                     'case', ['boolean', ['feature-state', 'hover'], false],
            //                     '#00ffff',
            //                     'transparent'
            //                 ],
            //                 "circle-stroke-width": 3,
            //             },
            //         });
            //     }
            // });

            me.arr.forEach((key, i) => me.objectLayer[key] = me.name[i]);
        })
        return this;

    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.queryByGeometry
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} polygon The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    queryByGeometry(polygon, callback) {
        var polygonBoundingBox = turf.bbox(polygon);
        var southWest = [polygonBoundingBox[0], polygonBoundingBox[1]];
        var northEast = [polygonBoundingBox[2], polygonBoundingBox[3]];

        var northEastPointPixel = this.map.project(northEast);
        var southWestPointPixel = this.map.project(southWest);

        //Remoce Feature State
        var featuresCheck = map.queryRenderedFeatures();
        featuresCheck.forEach(feature => {
            if (feature.state.hover != undefined) {
                map.removeFeatureState({
                    source: feature.source,
                    sourceLayer: feature.sourceLayer,
                    id: feature.id
                })
            }
        });

        //Add Feature State
        var features = this.map.queryRenderedFeatures([southWestPointPixel, northEastPointPixel], {
            layers: this.layerPointLine
        });
        features.forEach(feature => {
            // var f = {
            //     "type": "Feature",
            //     "geometry": Object.assign({}, feature.geometry),
            //     "properties": Object.assign({}, feature.properties)
            // }
            //console.log(f);
            if (!(undefined === turf.intersect(feature, polygon))) {
                this.map.setFeatureState({
                    source: feature.source,
                    sourceLayer: feature.sourceLayer,
                    id: feature.id
                }, {
                    hover: true
                });
            }
        });
        return callback(features);
    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.flyTo
     * @description Changes any combination of center, zoom, highlight, bearing, and pitch, animating the transition along a curve that evokes flight
     * @param {String} featureId Id of feature you want to flyTo.
     * @param {Object} params the Map this control will be removed from.
     * @param {LngLatLike} params.center The desired center.
     * @param {Number} params.zoom The desired zoom level.
     * @param {Number} params.bearing The desired bearing in degrees. The bearing is the compass direction that is "up". For example, bearing: 90 orients the map so that east is up.
     * @param {Number} params.pitch The desired pitch in degrees. The pitch is the angle towards the horizon measured in degrees with a range between 0 and 60 degrees. <br>For example, pitch: 0 provides the appearance of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon. Increasing the pitch value is often used to display 3D objects.
     * 
     * @returns {Map} this.
     */
    flyTo(featureId, sourceLayer, params) {
        var featureService = new mapboxgl.ekmap.FeatureService({
            url: this.urlFeatureService + sourceLayer,
            token: this.options.token
        })
        var me = this;
        featureService.query({ objectIds: featureId }, function(obj) {
            var feature = obj[0]
            if (feature.geometry.type == "Point")
                params.center = feature.geometry.coordinates;
            else {
                var param = {
                    type: 'Feature',
                    properties: feature.properties,
                    geometry: feature.geometry
                }
                var centroid = turf.centroid(param);
                params.center = centroid.geometry.coordinates;
            }
            me.map.flyTo(params)
        })
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    setHighlight(featureId, sourceLayer) {
        // var featureService = new mapboxgl.ekmap.FeatureService({
        //     url: this.urlFeatureService + sourceLayer,
        //     token: this.options.token
        // })
        // var me = this;
        // featureService.query({ objectIds: featureId }, function(obj) {
        //     this.map.setFeatureState({
        //         source: feature.source,
        //         sourceLayer: feature.sourceLayer,
        //         id: featureId
        //     }, {
        //         hover: true
        //     });
        // })
        // this.featuresCheck = this.map.queryRenderedFeatures();
        // this.featuresCheck.forEach(feature => {
        //     if (feature.state.hover != undefined) {
        //         this.map.removeFeatureState({
        //             source: feature.source,
        //             sourceLayer: feature.sourceLayer,
        //             id: feature.id
        //         })
        //     }
        //     if (feature.id == featureId) {

        //     }
        // });
    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    legend(callback, context) {
        var service = new mapboxgl.ekmap.MapService({
            url: this.urlMapService,
            token: this.options.token
        })
        return service.legend(callback, context);
    }
}

mapboxgl.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;