import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { Util } from '../core/Util';

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
        if (me.showButton)
            me._container.appendChild(input);
        else {
            input.addEventListener("click", function(e) {
                me.active = !me.active
                if (me.active) {
                    cursorDom[0].style.cursor = 'crosshair';
                    /**
                     * @event mapboxgl.ekmap.control.Select#startselect
                     * @description Fired when start control.
                     */
                    me.fire('startselect', me);
                    me._map.on('click', onClick);
                } else {
                    cursorDom[0].style.cursor = 'grab';
                    /**
                     * @event mapboxgl.ekmap.control.Select#unselect
                     * @description Fired when cancel control.
                     */
                    me._map.off('click', onClick)
                    me.fire('unselect', me);
                }
            });
        }

        me._container.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                me.fire('startselect', me);
                me._map.on('click', onClick);
            } else {
                cursorDom[0].style.cursor = 'grab';
                me._map.off('click', onClick)
                me.fire('unselect', me);
            }
        });
        return me._container

        function onClick(e) {
            var bbox = [
                [e.point.x - 5, e.point.y - 5],
                [e.point.x + 5, e.point.y + 5]
            ];
            me.featuresCheck = map.queryRenderedFeatures();
            me.featuresCheck.forEach(feature => {
                if (feature.state.hover != undefined) {
                    map.removeFeatureState({
                        source: feature.source,
                        sourceLayer: feature.sourceLayer,
                        id: feature.id
                    })
                }
            });
            var features = map.queryRenderedFeatures(bbox);
            /**
             * @event mapboxgl.ekmap.control.Select#selectfeatures
             * @description Fired when the feature is selected.
             */
            me.fire("selectfeatures", { features: features });
            if (me.setStyle) {
                features.forEach(feature => {
                    map.setFeatureState({
                        source: feature.source,
                        sourceLayer: feature.sourceLayer,
                        id: feature.id
                    }, {
                        hover: true
                    });
                })
            }
        }
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