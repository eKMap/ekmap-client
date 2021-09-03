import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Select
 * @category  Control
 * @classdesc Select.
 * @param {Object} options Construction parameters.
 * @param {Boolean} options.showPopup=true Show popup when click.
 * @param {Boolean} options.setStyle=true If setStyle = false, the selected feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {String} options.circleColor='red' Circle color.
 * @param {String} options.strokeColor='#00ffff' Circle stroke color.
 * @param {Number} options.strokeWidth=3 Circle stroke width.
 * @param {String} options.lineColor='blue' Line color.
 * @param {Number} options.lineWidth=2 Line width.
 * @param {String} options.mode=multi Default select multiple features se and vice versa set mode = 'single'.
 * @param {String} options.tooltip=SelectControl Tooltip of button.
 * @param {String} options.showButton=true Show button control.
 * @param {Array<string>} options.layers=['all'] List layers use for identify.
 * 
 * 
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Select#selectfeatures
 * @fires mapboxgl.ekmap.control.Select#startselect
 * @fires mapboxgl.ekmap.control.Select#unselect
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
        this.active = false;
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.target = this.options.target;
        this.mode = this.options.mode != undefined ? this.options.mode : 'multi';
        this.showPopup = this.options.showPopup != undefined ? this.options.showPopup : false;
        this.listeners = {};
        this.identify = new mapboxgl.ekmap.IdentifyFeatures({
            url: this.options.url,
            token: this.options.token,
            layers: this.options.layers
        });
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
        this.input = this.createLayerInputToggle();
        var cursorDom = $('.mapboxgl-canvas-container')
        var me = this;
        this.input.addEventListener("click", function (e) {
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
                if (!me.target)
                    me.input.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABPUlEQVRIS+2WO0/DMBSF700FDGkGFjakzqwNDo8lwf0RrIgV+CNswIpY+RE17cIjVroyV2JjYUgzAKovslCXVI4tZB6qyJqT8zn36pwEwfGqODsExAMi2kXEWyC6CoW8dHkcXURlL06RgkFdS6iyqF8MbR5OkIqzOwLYrpshwH0o5I4XyIQzMhm1hbQe1CrQ5pMeK4CgOwdCGLX7MvbyJuUeO0KE87mdEBxHN/LCC0SblDzZD4BO9G70LhTgWSTyaxtA33cal4tRk+ZvQHQIFcF6/aQBwpOXMJpCOAN6CePiQD6DuHkKBDEApt/aXT9SkP+Q2Q6dEr8Y43rlycYbTtdMn99laj2viPzxywVZZUmXAipsLYwK43CQj0y6xp3YasW1w34f8pJudZZaSv8KdRpGNn6fBtnq8GFs0nwAvqu3Gvgbt74AAAAASUVORK5CYII=")';
                me._map.on('click', me.listeners["click"]);
            } else {
                cursorDom[0].style.cursor = '';
                /**
                 * @event mapboxgl.ekmap.control.Select#unselect
                 * @description Fired when cancel control.
                 */
                me.offEvent();
                me.removeFeature();
                me.fire('unselect', me);
                if (!me.target)
                    me.input.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAA6ElEQVRIS+2VsQ4BURBFz/6ETqLW0qDhL7SixY/o0IrWX9CgWa1aovMTZORtI/N2pniRzcZtXrGz9753J3cmw48pMAEGwAnYAVvP75mnCBgCB6V2BBwtDq/IGegpZBegn0rkVUJkXtQsCOQ50FGErkA31UtmwFohmwObVCLCMwYWoTfSixWwtwTku9cuD1e0pjIiEsKmcs1HqjDGQlhoJgljfUTElmUInLzqG0nsKkh/MiD/Ih+7vYmvh11toFGyfp/ArWyCWnbJopKFZUEWlywwFZaINVZcM6wSIq3QCzljuAMyXuRU8Qb/yTEaeeVFEwAAAABJRU5ErkJggg==")';
            }
        });

        if (!me.target) {
            if (this.showButton)
                me._container.appendChild(me.input);
            else
                me._container.style.display = 'none';
        }
        else
            me._container.style.display = 'none';
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
            button.className = "mapboxgl-ctrl-zoom-in";
            button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Select control';
            button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAA6ElEQVRIS+2VsQ4BURBFz/6ETqLW0qDhL7SixY/o0IrWX9CgWa1aovMTZORtI/N2pniRzcZtXrGz9753J3cmw48pMAEGwAnYAVvP75mnCBgCB6V2BBwtDq/IGegpZBegn0rkVUJkXtQsCOQ50FGErkA31UtmwFohmwObVCLCMwYWoTfSixWwtwTku9cuD1e0pjIiEsKmcs1HqjDGQlhoJgljfUTElmUInLzqG0nsKkh/MiD/Ih+7vYmvh11toFGyfp/ArWyCWnbJopKFZUEWlywwFZaINVZcM6wSIq3QCzljuAMyXuRU8Qb/yTEaeeVFEwAAAABJRU5ErkJggg==")';
            button.style.backgroundPosition = 'center';
            button.style.backgroundRepeat = 'no-repeat';
            button.style.backgroundSize = '70%';
        } else {
            var button = document.getElementById(this.target);
        }
        return button
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.setDataPopup
     * @description Sets the popup's content to the HTML provided as a string.<br>This method does not perform HTML filtering or sanitization, and must be used only with trusted content.
     * @param {string} html A string representing HTML content for the popup.
     */
    setDataPopup(html) {
        if (this.popup)
            this.popup.setHTML(html);
        else
            throw "Error: Popup is undefined. You need set option 'showPopup' of control.";
    }

    /**
     * @function mapboxgl.ekmap.control.Select.prototype.setLayers
     * @param {Array<string>} layers List layers (if you want to set all layers eg: ['all']).
     * @description Set list layers for identify.
     */
    setLayers(layers) {
        this.identify.setLayers(layers);
    }

    onClick(e) {
        var me = this;
        if (this.showPopup) {
            this.popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .addTo(me._map);
        }
        me.identify.on(me._map).at(e.lngLat).run(function (error, obj) {
            /**
             * @event mapboxgl.ekmap.control.Select#selectfeatures
             * @description Fired when the feature is selected.
             */
            if (me.mode == 'single')
                me.removeFeature()
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
                    } else if (feature.geometryType == "esriGeometryPolyline") {
                        var type = feature.geometry.paths.length == 1 ? "LineString" : "MultiLineString";
                        me._map.addLayer({
                            "id": "selectedEK-" + guid12(),
                            "source": {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': type,
                                        'coordinates': feature.geometry.paths
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
                    } else {
                        var rings = feature.geometry.rings;
                        var type = feature.geometry.rings.length == 1 ? "Polygon" : "MultiPolygon";
                        //Cấu trúc MultiPolygon không đúng với Mapbox nên tính lại MultiPolygon
                        if (type == "MultiPolygon") {
                            var ringsMulti = [];
                            for (var i = 0; i < rings.length; i++)
                                ringsMulti.push([rings[i]])
                            me._map.addLayer({
                                "id": "selectedEK-" + guid12(),
                                "source": {
                                    'type': 'geojson',
                                    'data': {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': type,
                                            'coordinates': ringsMulti
                                        }
                                    }
                                },
                                "type": "fill",
                                "metadata": {
                                    'name': '',
                                    'type': '',
                                },
                                'layout': {},
                                'paint': {
                                    'fill-color': 'yellow',
                                    'fill-opacity': 0.8,
                                    'fill-outline-color': 'red'
                                },
                            });
                        }else{
                            me._map.addLayer({
                                "id": "selectedEK-" + guid12(),
                                "source": {
                                    'type': 'geojson',
                                    'data': {
                                        'type': 'Feature',
                                        'geometry': {
                                            'type': type,
                                            'coordinates': rings
                                        }
                                    }
                                },
                                "type": "fill",
                                "metadata": {
                                    'name': '',
                                    'type': '',
                                },
                                'layout': {},
                                'paint': {
                                    'fill-color': 'yellow',
                                    'fill-opacity': 0.8,
                                    'fill-outline-color': 'red'
                                },
                            });
                        }

                        
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
        if (!this.target)
            this.input.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAA6ElEQVRIS+2VsQ4BURBFz/6ETqLW0qDhL7SixY/o0IrWX9CgWa1aovMTZORtI/N2pniRzcZtXrGz9753J3cmw48pMAEGwAnYAVvP75mnCBgCB6V2BBwtDq/IGegpZBegn0rkVUJkXtQsCOQ50FGErkA31UtmwFohmwObVCLCMwYWoTfSixWwtwTku9cuD1e0pjIiEsKmcs1HqjDGQlhoJgljfUTElmUInLzqG0nsKkh/MiD/Ih+7vYmvh11toFGyfp/ArWyCWnbJopKFZUEWlywwFZaINVZcM6wSIq3QCzljuAMyXuRU8Qb/yTEaeeVFEwAAAABJRU5ErkJggg==")';
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
        if (!this.target)
            this.input.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABPUlEQVRIS+2WO0/DMBSF700FDGkGFjakzqwNDo8lwf0RrIgV+CNswIpY+RE17cIjVroyV2JjYUgzAKovslCXVI4tZB6qyJqT8zn36pwEwfGqODsExAMi2kXEWyC6CoW8dHkcXURlL06RgkFdS6iyqF8MbR5OkIqzOwLYrpshwH0o5I4XyIQzMhm1hbQe1CrQ5pMeK4CgOwdCGLX7MvbyJuUeO0KE87mdEBxHN/LCC0SblDzZD4BO9G70LhTgWSTyaxtA33cal4tRk+ZvQHQIFcF6/aQBwpOXMJpCOAN6CePiQD6DuHkKBDEApt/aXT9SkP+Q2Q6dEr8Y43rlycYbTtdMn99laj2viPzxywVZZUmXAipsLYwK43CQj0y6xp3YasW1w34f8pJudZZaSv8KdRpGNn6fBtnq8GFs0nwAvqu3Gvgbt74AAAAASUVORK5CYII=")';
    }

    changeMode(mode) {
        this.mode = mode;
        this.deactivate();
        this.activate();
    }
}

mapboxgl.ekmap.control.Select = Select;