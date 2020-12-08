import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Geocoder
 * @category  Control
 * @classdesc Geocoder.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {string} options.provider=eKGIS 
 * @param {Boolean} options.showButton=true If showButton = false, button control is not displayed.
 * @param {Boolean} options.setStyle=true If setStyle = false, the Geocodered feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * 
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.Geocoder({ setStyle: true }),'bottom-right');
 * (end)
 */

export class Geocoder extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.target = this.options.target;
        if (options.provider == 'eKGIS')
            this.url = 'http://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address/json';
        if (options.provider == 'OSM')
            this.url = 'https://nominatim.openstreetmap.org/reverse';
        if (this.options.token) {
            this.tileUrl += ('?token=' + this.options.token);

        }
    }

    /**
     * @function mapboxgl.ekmap.control.Geocoder.prototype.onAdd
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
                     * @event mapboxgl.ekmap.control.Geocoder#startGeocoder
                     * @description Fired when start control.
                     */
                    me.fire('startGeocoder', me);
                    me._map.on('click', onClick);
                } else {
                    cursorDom[0].style.cursor = 'grab';
                    /**
                     * @event mapboxgl.ekmap.control.Geocoder#unGeocoder
                     * @description Fired when cancel control.
                     */
                    me._map.off('click', onClick)
                    me.fire('unGeocoder', me);
                }
            });
        }

        me._container.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                me.fire('startGeocoder', me);
                me._map.on('click', onClick);
            } else {
                cursorDom[0].style.cursor = 'grab';
                me._map.off('click', onClick)
                me.fire('unGeocoder', me);
            }
        });
        return me._container

        function onClick(e) {

        }
    }

    /**
     * @function mapboxgl.ekmap.control.Geocoder.prototype.onRemove
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

    /**
     * @function mapboxgl.ekmap.control.Geocoder.prototype.flyTo
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
    flyTo(featureId, params) {
        this._map.flyTo(params)
        this.featuresCheck = this._map.queryRenderedFeatures();
        this.featuresCheck.forEach(feature => {
            if (feature.state.hover != undefined) {
                this._map.removeFeatureState({
                    source: feature.source,
                    sourceLayer: feature.sourceLayer,
                    id: feature.id
                })
            }
            if (feature.id == featureId) {
                this._map.setFeatureState({
                    source: feature.source,
                    sourceLayer: feature.sourceLayer,
                    id: featureId
                }, {
                    hover: true
                });
            }
        });

    }
}

mapboxgl.ekmap.control.Geocoder = Geocoder;