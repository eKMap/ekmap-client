import { MapService } from '../services/MapService';
import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.FeatureInfomation
 * @category  Control
 * @classdesc FeatureInfomation.
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.FeatureInfomation(),'bottom-right');
 * (end)
 */

export class FeatureInfomation extends mapboxgl.Evented {

    constructor() {
        super();
    }

    /**
     * @function mapboxgl.ekmap.control.FeatureInfomation.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        return this._container;
    }

    /**
     * @function mapboxgl.ekmap.control.FeatureInfomation.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    removeLayer(map) {
        if (map) {
            if (map.getLayer('point')) {
                map.removeLayer('point');
                map.removeSource('point');
            }
            if (map.getLayer('line')) {
                map.removeLayer('line');
                map.removeSource('line');
            }
            if (map.getLayer('area')) {
                map.removeLayer('area');
                map.removeSource('area');
            }
        }
    }

    on(event, callback) {
        var me = this;
        if (event == 'selectfeature') {
            this._map.on('click', function (e) {
                me.removeLayer(me._map);
                var cooor = [e.lngLat.lng, e.lngLat.lat];
                var geojson = {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': cooor
                            }
                        }
                    ]
                };
                var layers = me._map.getStyle().layers;
                layers.forEach(layer => {
                    if (layer.metadata && layer.metadata.type == 'overlayer' && layer.layout.visibility === "visible") {
                        var mapService = new mapboxgl.ekmap.MapService({
                            url: layer.metadata.url,
                            token: layer.metadata.token
                        });
                        mapService.identify().on(me._map).at(e.lngLat).run(function (obj) {
                            if (obj.length > 0) {
                                for (var i = 0; i < obj.length; i++) {
                                    //Point
                                    if (obj[i].geometryType == 'esriGeometryPoint') {
                                        if (!me._map.getLayer('point')) { 
                                            me._map.addSource('point', {
                                                'type': 'geojson',
                                                'data': geojson
                                            });
                                            me._map.addLayer({
                                                'id': 'point',
                                                'type': 'circle',
                                                'source': 'point',
                                                'paint': {
                                                    'circle-radius': 10,
                                                    'circle-color': '#0000ff'
                                                }
                                            });
                                        } else {
                                            me._map.removeLayer('point');
                                            me._map.removeSource('point');
                                            me._map.addSource('point', {
                                                'type': 'geojson',
                                                'data': geojson
                                            });

                                            me._map.addLayer({
                                                'id': 'point',
                                                'type': 'circle',
                                                'source': 'point',
                                                'paint': {
                                                    'circle-radius': 10,
                                                    'circle-color': '#0000ff'
                                                }
                                            });
                                        }
                                    }
                                    //Polygon
                                    else {
                                        var coordinates;
                                        if (obj[i].geometry.paths)
                                            coordinates = obj[i].geometry.paths[0];
                                        else
                                            coordinates = obj[i].geometry.rings[0];
                                        //Polyline
                                        if (obj[i].geometryType == 'esriGeometryPolyline') {
                                            if (!me._map.getLayer('line')) {
                                                me._map.addSource('line', {
                                                    'type': 'geojson',
                                                    'data': {
                                                        'type': 'Feature',
                                                        'properties': {},
                                                        'geometry': {
                                                            'type': 'LineString',
                                                            'coordinates': coordinates
                                                        }
                                                    }
                                                });
                                                me._map.addLayer({
                                                    'id': 'line',
                                                    'type': 'line',
                                                    'source': 'line',
                                                    'layout': {
                                                        'line-join': 'round',
                                                        'line-cap': 'round'
                                                    },
                                                    'paint': {
                                                        'line-color': '#000',
                                                        'line-width': 5
                                                    }
                                                });
                                            } else {
                                                me._map.removeLayer('line');
                                                me._map.removeSource('line');
                                                me._map.addSource('line', {
                                                    'type': 'geojson',
                                                    'data': {
                                                        'type': 'Feature',
                                                        'properties': {},
                                                        'geometry': {
                                                            'type': 'LineString',
                                                            'coordinates': coordinates
                                                        }
                                                    }
                                                });
                                                me._map.addLayer({
                                                    'id': 'line',
                                                    'type': 'line',
                                                    'source': 'line',
                                                    'layout': {
                                                        'line-join': 'round',
                                                        'line-cap': 'round'
                                                    },
                                                    'paint': {
                                                        'line-color': '#000',
                                                        'line-width': 5
                                                    }
                                                });
                                            }
                                        }
                                        //Area
                                        else {
                                            if (!me._map.getLayer('area')) {
                                                me._map.addSource('area', {
                                                    'type': 'geojson',
                                                    lineMetrics: true,
                                                    'data': {
                                                        'type': 'Feature',
                                                        'properties': {},
                                                        'geometry': {
                                                            'type': 'LineString',
                                                            'coordinates': coordinates
                                                        }
                                                    }
                                                });
                                                me._map.addLayer({
                                                    //line path
                                                    'id': 'area',
                                                    'type': 'line',
                                                    'source': 'area',
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
                                                    }
                                                    //fill path
                                                    //'id': 'area',
                                                    //'type': 'fill',
                                                    //'source': 'area',
                                                    //'layout': {
                                                    //},
                                                    //'paint': {
                                                    //    'fill-outline-color': '#484896',
                                                    //    'fill-color': '#6e599f',
                                                    //    'fill-opacity': 0.75
                                                    //},
                                                });
                                            } else {
                                                me._map.removeLayer('area');
                                                me._map.removeSource('area');
                                                me._map.addSource('area', {
                                                    'type': 'geojson',
                                                    'data': {
                                                        'type': 'Feature',
                                                        'properties': {},
                                                        'geometry': {
                                                            'type': 'LineString',
                                                            'coordinates': coordinates
                                                        }
                                                    }
                                                });
                                                me._map.addLayer({
                                                    'id': 'area',
                                                    'type': 'line',
                                                    'source': 'area',
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
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    if (me._map.getLayer('point') && me._map.getLayer('line'))
                                        me._map.moveLayer('line', 'point');
                                }
                                obj.coordinate = e.lngLat;
                            }
                            else {
                                me.removeLayer(me._map);
                            }
                            callback(obj);
                        }, "");
                    }
                });
            });
        }
    }
}

mapboxgl.ekmap.control.FeatureInfomation = FeatureInfomation;
