import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.FeatureInfomation
 * @category  Control
 * @classdesc FeatureInfomation.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {Boolean} options.showButton=true If showButton = false, button control is not displayed.
 * @param {Boolean} options.setStyle=true If setStyle = false, the selected feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.FeatureInfomation#selectfeatures
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.FeatureInfomation({ setStyle: true }),'bottom-right');
 * (end)
 */

export class FeatureInfomation extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.setStyle = this.options.setStyle != undefined ? this.options.setStyle : true;
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.active = false;
        this.target = this.options.target;

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
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.style.fontSize = "14px"

        let input = this.createLayerInputToggle();
        var cursorDom = $('.mapboxgl-canvas-container')
        var me = this;
        if (me.showButton)
            me._container.appendChild(input);
        else {
            input.addEventListener("click", function(e) {
                me.active = !me.active
                if (me.active) {
                    cursorDom[0].style.cursor = 'crosshair';
                    me.fire('click', me);
                    me._map.on('click', onClick);
                } else {
                    cursorDom[0].style.cursor = 'grab';
                    me.fire('unclick', me);
                    me._map.off('click', onClick)
                }
            });
        }
        me._container.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                me.fire('click', me);
                me._map.on('click', onClick);
            } else {
                cursorDom[0].style.cursor = 'grab';
                me.fire('unclick', me);
                me._map.off('click', onClick)
            }
        });
        return me._container

        function onClick(e) {
            var layers = map.getStyle().layers;
            layers.forEach(layer => {
                if (layer.metadata && layer.metadata.url && layer.metadata.type == 'overlayer' && layer.layout.visibility === "visible") {
                    var mapService = new mapboxgl.ekmap.MapService({
                        url: layer.metadata.url,
                        token: layer.metadata.token
                    });
                    mapService.identify().on(map).at(e.lngLat).run(function(obj) {
                        var features = [];
                        if (obj.length > 0 && me.setStyle) {
                            for (var i = 0; i < obj.length; i++) {
                                //Point
                                if (obj[i].geometryType == 'esriGeometryPoint') {
                                    features.push({
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': [
                                                obj[i].geometry.x,
                                                obj[i].geometry.y
                                            ]
                                        },
                                        'properties': {
                                            'name': 'point'
                                        }
                                    })
                                } else {
                                    var coordinates;
                                    if (obj[i].geometry.paths)
                                        coordinates = obj[i].geometry.paths[0];
                                    else
                                        coordinates = obj[i].geometry.rings[0];
                                    if (obj[i].geometryType == 'esriGeometryPolyline')
                                        features.push({
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'LineString',
                                                'coordinates': coordinates
                                            },
                                            'properties': {
                                                'name': 'line'
                                            }
                                        })
                                    else
                                        features.push({
                                            'type': 'Feature',
                                            'geometry': {
                                                'type': 'LineString',
                                                'coordinates': coordinates
                                            },
                                            'properties': {
                                                'name': 'area'
                                            }
                                        })
                                }
                                var data = {
                                    'type': 'FeatureCollection',
                                    'features': features
                                }
                                if (!map.getSource('feature-info')) {

                                    map.addSource('feature-info', {
                                        'type': 'geojson',
                                        'data': data
                                    })

                                    map.addLayer({
                                        'id': 'point',
                                        'type': 'circle',
                                        'source': 'feature-info',
                                        'paint': {
                                            'circle-radius': 10,
                                            'circle-color': '#0000ff'
                                        },
                                        'filter': ['in', 'name']
                                    })

                                    map.addLayer({
                                        'id': 'line',
                                        'type': 'line',
                                        'source': 'feature-info',
                                        'layout': {
                                            'line-join': 'round',
                                            'line-cap': 'round'
                                        },
                                        'paint': {
                                            'line-color': '#000',
                                            'line-width': 5
                                        },
                                        'filter': ['in', 'name']
                                    })

                                    map.addLayer({
                                        'id': 'area',
                                        'type': 'fill',
                                        'source': 'feature-info',
                                        'layout': {},
                                        'paint': {
                                            'fill-outline-color': '#484896',
                                            'fill-color': '#6e599f',
                                            'fill-opacity': 0.75
                                        },
                                        'filter': ['in', 'name']
                                    })
                                    me.setFilter(map);
                                } else {
                                    map.getSource('feature-info').setData(data);
                                    me.setFilter(map);
                                }
                                if (map.getLayer('point') && map.getLayer('line'))
                                    map.moveLayer('line', 'point');
                            }
                            obj.coordinate = e.lngLat;
                        }
                        /**
                         * @event mapboxgl.ekmap.control.FeatureInfomation#selectfeatures
                         * @description Fired when the feature is selected.
                         */
                        me.fire('selectfeatures', obj);
                    }, "");
                }
            });
        }

    }


    /**
     * @private
     * @param {*} map 
     */
    setFilter(map) {
        map.setFilter('point', ['in', 'name', 'point'])
        map.setFilter('line', ['in', 'name', 'line'])
        map.setFilter('area', ['in', 'name', 'area'])
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

    createLayerInputToggle() {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = this.icon;
            button.className = "mapboxgl-ctrl-zoom-in"
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button
    }
}

mapboxgl.ekmap.control.FeatureInfomation = FeatureInfomation;