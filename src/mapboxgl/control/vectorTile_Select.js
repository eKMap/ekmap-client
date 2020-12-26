import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Select
 * @category  Control
 * @classdesc Select.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {Boolean} options.setStyle=true If setStyle = false, the selected feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {String} options.circleColor='red' Circle color.
 * @param {String} options.strokeColor='#00ffff' Circle stroke color.
 * @param {Number} options.strokeWidth=3 Circle stroke width.
 * @param {String} options.lineColor='blue' Line color.
 * @param {Number} options.lineWidth=2 Line width.
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.Select#selectfeatures
 * @fires mapboxgl.ekmap.Select#startselect
 * @fires mapboxgl.ekmap.Select#unselect
 * 
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.Select({ setStyle: true }),'bottom-right');
 * (end)
 */

export class Select extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.setStyle = this.options.setStyle != undefined ? this.options.setStyle : true;
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.active = false;
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.target = this.options.target;
        this.listeners = {};
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {

        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.style.fontSize = "14px"
        this.featuresCheck = map.queryRenderedFeatures();
        let input = this.createLayerInputToggle();
        var cursorDom = $('.mapboxgl-canvas-container')
        var me = this;
        input.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                /**
                 * @event mapboxgl.ekmap.control.Select#startselect
                 * @description Fired when start control.
                 */
                me.fire('startselect', me);
                me.offEvent();
                me.listeners["click"] = me.onClick.bind(me);
                me._map.on('click', me.listeners["click"]);
            } else {
                cursorDom[0].style.cursor = '';
                /**
                 * @event mapboxgl.ekmap.control.Select#unselect
                 * @description Fired when cancel control.
                 */
                me.offEvent();
                me.fire('unselect', me);
            }
        });

        if (!me.target)
            me._container.appendChild(input);

        return me._container
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    offEvent() {
        for (var evt in this.listeners) {
            this._map.off('click', this.listeners[evt]);
        }
        this.listeners = {};
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

    onClick(e) {
        var me = this;
        var mapService = new mapboxgl.ekmap.MapService({
            url: me.options.url,
            token: me.options.token
        });
        mapService.identify().on(me._map).at(e.lngLat).run(function(error, obj) {
            /**
             * @event mapboxgl.ekmap.control.Select#selectfeatures
             * @description Fired when the feature is selected.
             */
            me.fire("selectfeatures", { features: obj });
            var features = obj
            if (me.setStyle) {
                features.forEach(feature => {
                    if (feature.geometryType == 'esriGeometryPoint') {
                        me._map.addLayer({
                            'id': 'selectedEK-' + guid12(),
                            'type': 'circle',
                            "source": {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [feature.geometry.x, feature.geometry.y]
                                    }
                                }
                            },
                            "metadata": {
                                'name': '',
                                'type': '',
                            },
                            'paint': {
                                "circle-color": me.options.circleColor != undefined ? me.options.circleColor : "red",
                                "circle-stroke-color": me.options.strokeColor != undefined ? me.options.strokeColor : '#00ffff',
                                "circle-stroke-width": me.options.strokeWidth != undefined ? me.options.strokeWidth : 3,
                            },
                        });
                    }
                    if (feature.geometryType == "esriGeometryPolyline") {
                        me._map.addLayer({
                            "id": "selectedEK-" + guid12(),
                            "source": {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'LineString',
                                        'coordinates': feature.geometry.paths[0]
                                    }
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
                                'line-color': me.options.lineColor != undefined ? me.options.lineColor : 'blue',
                                'line-width': me.options.lineWidth != undefined ? me.options.lineWidth : 2,
                            }
                        });
                    }
                });
            }
        })
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.deactivate
     * @description Deactivate control Select.
     */
    deactivate() {
        var cursorDom = $('.mapboxgl-canvas-container')
        cursorDom[0].style.cursor = '';
        this.offEvent();
        // this.fire('unselect', this);
        this.active = false;
        this.removeFeature();
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.removeFeature
     * @description Remove feature selected.
     */
    removeFeature() {
        var layers = this._map.getStyle().layers;
        layers.forEach(layer => {
            if (layer.id.indexOf('selectedEK-') != -1) {
                this._map.removeLayer(layer.id)
            }
        });
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.activate
     * @description Activate control Select.
     */
    activate() {
        var cursorDom = $('.mapboxgl-canvas-container')
        cursorDom[0].style.cursor = 'crosshair';
        this.offEvent();
        this.listeners["click"] = this.onClick.bind(this);
        this._map.on('click', this.listeners["click"]);
        // this.fire('startselect', this);
        this.active = true;
    }
}

mapboxgl.ekmap.control.Select = Select;