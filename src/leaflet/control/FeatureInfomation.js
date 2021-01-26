import '../core/Base';
import L from 'leaflet';

/**
 * @class L.ekmap.control.FeatureInfomation
 * @category  Control
 * @classdesc FeatureInfomation.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {String} options.mode=multi Default select multiple features se and vice versa set mode = 'single'.
 * @param {Boolean} options.setStyle=true If setStyle = false, the selected feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {L.Evented}
 * @fires L.ekmap.FeatureInfomation#selectfeatures
 * @example
 * (start code)
 *  map.addControl(new L.ekmap.control.FeatureInfomation({ setStyle: true }),'bottom-right');
 * (end)
 */

export class FeatureInfomation extends L.Control {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.setStyle = this.options.setStyle != undefined ? this.options.setStyle : true;
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.active = false;
        this.target = this.options.target;
        if (this.target)
            this.options.position = 'topleft';
        this.mode = this.options.mode != undefined ? this.options.mode : 'multi';
        this.layer = null;
        this.listeners = {};
        L.extend(FeatureInfomation.prototype, L.Evented.prototype);
    }

    /**
     * @function L.ekmap.control.FeatureInfomation.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        var className = 'leaflet-bar ';
        this._container.className = className + (this.options.className !== undefined ? this.options.className : '');;
        this._container.style.fontSize = "14px";
        var me = this;
        var cursorDom = document.getElementsByClassName('leaflet-container');
        let input = this.createLayerInputToggle();
        input.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                /**
                 * @event L.ekmap.control.FeatureInfomation#click
                 * @description Fired when start control.
                 */
                me.fire('click', me);
                me.offEvent();
                me.listeners["click"] = me.onClick.bind(me);
                me._map.on('click', me.listeners["click"]);
            } else {
                cursorDom[0].style.cursor = 'grab';
                /**
                 * @event L.ekmap.control.FeatureInfomation#unclick
                 * @description Fired when cancel control.
                 */
                me.fire('unclick', me);
                me.offEvent();
            }
        });
        if (!me.target)
            me._container.appendChild(input);
        else {
            me._container.style.display = 'none';
        }
        this.geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        return me._container;
    }

    onClick(e) {
        var me = this;
        this._map.eachLayer(function(layer) {
            if (layer.options && layer.options.metadata && layer.options.metadata.type == 'tileLayer') {
                var mapService = new L.ekmap.MapService({
                    url: layer.options.metadata.url,
                    token: layer.options.metadata.token
                });

                mapService.identify().on(map).at(e.latlng).run(function(error, obj) {
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
                            if (me.layer) {
                                if (me.mode == 'single')
                                    me.layer.clearLayers();
                                me.layer.addData(features);
                            } else
                                me.layer = L.geoJSON(features, {
                                    style: function(feature) {
                                        switch (feature.geometry.type) {
                                            case 'LineString':
                                                return {
                                                    "color": "blue",
                                                    "weight": 2,
                                                    "opacity": 0.7
                                                };
                                        }
                                    },
                                    pointToLayer: function(feature, latlng) {
                                        return L.circleMarker(latlng, me.geojsonMarkerOptions);
                                    }
                                }).addTo(map);
                        }
                    }
                    /**
                     * @event L.ekmap.control.FeatureInfomation#selectfeatures
                     * @description Fired when the feature is selected.
                     */
                    me.fire('selectfeatures', { features: obj });
                }, "");
            }
        });
    }

    /**
     * @function L.ekmap.control.FeatureInfomation.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove() {
        this._map = map;
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    removeFeature() {
        if (this.layer)
            this.layer.clearLayers();
    }

    offEvent() {
        for (var evt in this.listeners) {
            this._map.off('click', this.listeners[evt]);
        }
        this.listeners = {};
    }

    /**
     * @function L.ekmap.control.FeatureInfomation.prototype.activate
     * @description Activate control FeatureInfomation.
     */
    activate() {
        var cursorDom = document.getElementsByClassName('leaflet-container');
        cursorDom[0].style.cursor = 'crosshair';
        this.offEvent();
        this.listeners["click"] = this.onClick.bind(this);
        this._map.on('click', this.listeners["click"]);
        // this.fire('startselect', this);
        this.active = true;
    }

    /**
     * @function L.ekmap.control.FeatureInfomation.prototype.deactivate
     * @description Deactivate control FeatureInfomation.
     */
    deactivate() {
        var cursorDom = document.getElementsByClassName('leaflet-container');
        cursorDom[0].style.cursor = '';
        this.offEvent();
        // this.fire('unselect', this);
        this.active = false;
        this.removeFeature();
    }


    createLayerInputToggle() {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = this.icon;
            button.className = "L-ctrl-zoom-in"
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button
    }

    changeMode(mode) {
        this.mode = mode;
        this.deactivate();
        this.activate();
    }
}

L.ekmap.control.FeatureInfomation = FeatureInfomation;