import { Util } from '../core/Util';
import Observable from 'ol/Observable';
require('ol-mapbox-style').default
/**
 * @class ol.ekmap.VectorTiledMapLayer
 * @classdesc The VectorTiledMapLayer class.
 * @category Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url 
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {ol.style.Style} options.style Style of features.
 * @extends {ol.Observable}
 */
export class VectorTiledMapLayer extends Observable {
    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (options.url) {
                options = Util.getUrlParams(options);
                this.url = Util.cleanUrl(options.url)
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + this.url + 'tile/{z}/{y}/{x}.pbf';
                this.styleUrl = this.url + 'resources/styles'
            }
            if (options.token) {
                this.tileUrl += ('?token=' + this.options.token);
                this.styleUrl += ('?token=' + this.options.token);
            }
        }

        var styleDefault = new ol.style.Style({ 
            stroke: new ol.style.Stroke({
                color: 'gray',
                width: 1,
            }),
            fill: new ol.style.Fill({
                color: 'rgba(20,20,20,0.9)',
            }),
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#B42222'
                }),
                stroke: new ol.style.Stroke({
                    color: 'yellow',
                    width: 3
                }),
                radius: 7
            })
        });
        // this.map = '';
        // this.arr = [];
        // this.name = [];
        // this.objectLayer = {};
        // this.layerPointLine = [];
        // this.featuresCheck = '';
        // this.layer = null;
        // this.urlFeatureService = options.url.replace("VectorTileServer", "FeatureServer")
        // this.urlMapService = options.url.replace("VectorTileServer", "MapServer")
    }

    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        this.map = map;
        var me = this;
        var layer = new ol.layer.VectorTile({
            declutter: true,
            source: new ol.source.VectorTile({
                format: new ol.format.MVT(),
                url: me.tileUrl,
                projection: 'EPSG:4326',
            }), 
        })
        layer.setStyle(me.style);
        console.log(layer)
        map.addLayer(layer)
        // const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=pk.eyJ1IjoiZWtnaXMiLCJhIjoiY2tnenZ5NDN6MDl6ZDJ4c2lkZzBjZHpuZyJ9.d1wSWx_jMWjNTbbbhS6iMg';
        // new olms('divMapId',baseUrl);
        return this;
    }

    style(feature){
        console.log(feature)
        return [
            new ol.style.Style({
                fill: new ol.style.Fill({
                    color: '#FF0000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#000',
                    width: 1
                }),
            })
        ]
    }



    // Legend 
    // style: createMapboxStreetsV6Style(ol.style.Style, ol.style.Fill, ol.style.Stroke, ol.style.Icon, ol.style.Text),
    // style: this.style,
    // type: 'VectorTileLayer',
    // url: this.urlMapService,
    // token: this.options.token,
    // vectorTile: true
    // var mapService = new ol.ekmap.MapService({
    //     url: this.urlMapService,
    //     token: this.options.token
    // })

    // var listLayer = []
    // mapService.getLayers(function(layers) {
    //     listLayer.forEach(layer => {
    //         if (layer.subLayers && layer.subLayers.length > 0) {
    //             var subLayers = layer.subLayers
    //             subLayers.forEach(sub => {
    //                 listLayer.push(sub)
    //             });
    //         }
    //     });
    //     listLayer.forEach((key, i) => {
    //         me.objectLayer[key.id] = listLayer[i].name
    //     });
    // });


    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.queryByGeometry
     * @description  Is an abstraction for the find API included in Map Services. It provides a chainable API for building request parameters and executing find tasks.。
     * @param {Object} polygon The geometry to apply as the spatial filter. The structure of the geometry is the same as the structure of the JSON geometry objects returned by the ArcGIS REST API. In addition to the JSON structures, for envelopes and points, you can specify the geometry with a simpler comma-separated syntax.
     * @param {Object} param Option style selected.
     * @param {String} param.circleColor='red' Circle color.
     * @param {String} param.strokeColor='#00ffff' Circle stroke color.
     * @param {Number} param.strokeWidth=3 Circle stroke width.
     * @param {String} param.lineColor='blue' Line color.
     * @param {Number} param.lineWidth=2 Line width.
     * 
     * @param {RequestCallback} callback The callback of result data returned by the server side.
     */
    queryByGeometry(polygon, param, callback) {
        param = param || {}
            //Kiểm tra xem có selected chưa. Nếu có thì removeLayer
        var layers = map.getStyle().layers;
        layers.forEach(layer => {
            if (layer.id.indexOf('queryEK-') != -1) {
                this.map.removeLayer(layer.id)
            }
        });
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
            if (!(undefined === turf.intersect(feature, polygon))) {
                if (feature._geometry.type == 'Point') {
                    map.addLayer({
                        'id': 'queryEK-' + guid12(),
                        'type': 'circle',
                        "source": {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'geometry': feature._geometry
                            }
                        },
                        "metadata": {
                            'name': '',
                            'type': '',
                        },
                        'paint': {
                            "circle-color": param.circleColor != undefined ? param.circleColor : "red",
                            "circle-stroke-color": param.strokeColor != undefined ? param.strokeColor : '#00ffff',
                            "circle-stroke-width": param.strokeWidth != undefined ? param.strokeWidth : 3,
                        },
                    });
                }
                if (feature._geometry.type == "LineString") {
                    map.addLayer({
                        "id": "queryEK-" + guid12(),
                        "source": {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'geometry': feature._geometry
                            }
                        },
                        "type": "line",
                        "metadata": {
                            'name': '',
                            'type': '',
                        },
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': param.lineColor != undefined ? param.lineColor : 'blue',
                            'line-width': param.lineWidth != undefined ? param.lineWidth : 2,
                        }
                    });
                }
            }
        });
        return callback(features);
    }

    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.flyTo
     * @description Changes any combination of center, zoom, highlight, bearing, and pitch, animating the transition along a curve that evokes flight
     * @param {String} featureId Id of feature you want to flyTo.
     * @param {Object} params the Map this control will be removed from.
     * @param {LngLatLike} params.center The desired center.
     * @param {Number} params.zoom The desired zoom level.
     * @param {Number} params.bearing The desired bearing in degrees. The bearing is the compass direction that is "up". For example, bearing: 90 orients the map so that east is up.
     * @param {Number} params.pitch The desired pitch in degrees. The pitch is the angle towards the horizon measured in degrees with a range between 0 and 60 degrees. <br>For example, pitch: 0 provides the appearance of looking straight down at the map, while pitch: 60 tilts the user's perspective towards the horizon. Increasing the pitch value is often used to display 3D objects.
     * @param {Boolean} params.highlight=true Display feature after flyTo.
     * @returns {Map} this.
     */
    flyTo(featureId, sourceLayer, params) {
        params = params || {}
        var highlight = params.highlight != undefined ? params.highlight : true;
        var featureService = new ol.ekmap.FeatureService({
            url: this.urlFeatureService + sourceLayer,
            token: this.options.token
        })
        var me = this;
        featureService.query({ objectIds: featureId }, function(error, obj) {
            var feature = obj;
            if (highlight) {
                var source = me.map.getSource('highlight');
                if (source)
                    source.setData({
                        'type': 'FeatureCollection',
                        'features': feature
                    })
                else {
                    me.map.addSource('highlight', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': feature
                        }
                    });
                }

                me.map.addLayer({
                    'id': "highlightEK-" + guid12(),
                    'type': 'line',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': 'blue',
                        'line-width': 2
                    },
                    "source": 'highlight',
                    'filter': ['==', '$type', 'LineString']
                });

                me.map.addLayer({
                    "id": "highlightEK-" + guid12(),
                    "type": "circle",
                    "paint": {
                        "circle-color": "red",
                        "circle-stroke-color": '#00ffff',
                        "circle-stroke-width": 3
                    },
                    "source": 'highlight',
                    'filter': ['==', '$type', 'Point']
                });

                me.map.addLayer({
                    "id": "highlightEK-" + guid12(),
                    'type': 'fill',
                    'layout': {},
                    'paint': {
                        'fill-color': '#088',
                        'fill-opacity': 0.8
                    },
                    "source": 'highlight',
                    'filter': ['==', '$type', 'Polygon']
                });
            }
            if (feature[0].geometry.type == "Point")
                params.center = feature[0].geometry.coordinates;
            else {
                var param = {
                    type: 'Feature',
                    properties: feature[0].properties,
                    geometry: feature[0].geometry
                }
                var centroid = turf.centroid(param);
                params.center = centroid.geometry.coordinates;
            }
            me.map.flyTo(params)
        })
    }

    /**
     * @function ol.ekmap.control.VectorTiledMapLayer.prototype.removeHighlight
     * @description Remove highlight when flyTo set highlight true
     */
    removeHighlight() {
        var layers = this.map.getStyle().layers;
        layers.forEach(layer => {
            if (layer.id.indexOf('highlightEK-') != -1) {
                this.map.removeLayer(layer.id)
            }
        });
    }

    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    legend(callback, context) {
        var service = new ol.ekmap.MapService({
            url: this.urlMapService,
            token: this.options.token
        })
        return service.legend(callback, context);
    }
}