import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Select
 * @category  Control
 * @classdesc Select.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {Boolean} options.showButton=true If showButton = false, button control is not displayed.
 * @param {Boolean} options.setStyle=true If setStyle = false, the selected feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.Select#selectfeatures
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
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.active = false;
        this.target = this.options.target;
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
        if (me.setStyle) {
            map.addLayer({
                'id': 'areaSelect',
                'type': 'line',
                'source': '35',
                'source-layer': '480',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#90c258',
                    'line-width': 2,
                },
                'filter': ["get", "CODE"]
            })
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
            var arr = []
            var layers = map.getStyle().layers;
            layers.forEach(layer => {
                arr.push(layer.id)
            });
            var bbox = [
                [e.point.x - 5, e.point.y - 5],
                [e.point.x + 5, e.point.y + 5]
            ];
            var features = map.queryRenderedFeatures(bbox, {
                layers: arr
            });
            var fea = null;
            var filter = features.reduce(
                function(memo, feature) {
                    fea = feature;
                    return memo;
                }, ['get', 'CODE']
            );
            /**
             * @event mapboxgl.ekmap.control.Select#selectfeatures
             * @description Fired when the feature is selected.
             */
            me.fire("selectfeatures", fea);
            if (me.setStyle) {
                var code = fea.properties.CODE;
                var coordinates = [fea.properties.xDaiDien, fea.properties.yDaiDien];
                var description = '<h4>' + fea.properties.NAME + '</h4>';
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                map.setFilter('areaSelect', ["==", ['get', 'CODE'], code])
            }
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
     * @function mapboxgl.ekmap.control.Select.prototype.onRemove
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

mapboxgl.ekmap.control.Select = Select;