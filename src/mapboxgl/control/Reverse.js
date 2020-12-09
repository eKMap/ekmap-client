import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Reverse
 * @category  Control
 * @classdesc Reverse.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {string} options.provider=eKGIS
 * @param {string} options.tokenkey Will use this token to authenticate all calls to the service.
 * @param {Boolean} options.showButton=true If showButton = false, button control is not displayed.
 * @param {Boolean} options.setStyle=true If setStyle = false, the Reverseed feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * 
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.Reverse({ setStyle: true }),'bottom-right');
 * (end)
 */

export class Reverse extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.target = this.options.target;
        this.provider = this.options.provider != undefined ? this.options.provider : 'eKGIS';
        if (this.provider == 'eKGIS')
            this.url = 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address';
        if (this.provider == 'OSM')
            this.url = 'https://nominatim.openstreetmap.org/reverse/';
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.onAdd
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
                     * @event mapboxgl.ekmap.control.Reverse#startReverse
                     * @description Fired when start control.
                     */
                    me.fire('startReverse', me);
                    me._map.on('click', onClick);
                } else {
                    cursorDom[0].style.cursor = 'grab';
                    /**
                     * @event mapboxgl.ekmap.control.Reverse#unReverse
                     * @description Fired when cancel control.
                     */
                    me._map.off('click', onClick)
                    me.fire('unReverse', me);
                }
            });
        }

        me._container.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                me.fire('startReverse', me);
                me._map.on('click', onClick);
            } else {
                cursorDom[0].style.cursor = 'grab';
                me._map.off('click', onClick)
                me.fire('unReverse', me);
            }
        });
        return me._container

        function onClick(e) {

            var service = new mapboxgl.ekmap.ServiceBase({
                url: me.url,
                tokenKey: me.options.tokenKey
            });
            if (me.provider == 'eKGIS') {
                var params = {
                    latlng: [e.lngLat.lat, e.lngLat.lng]
                }
                service.request('json', params, function(response) {
                    /**
                     * @event mapboxgl.ekmap.control.Reverse#selectfeatures
                     * @description Fired when the feature is selected.
                     */
                    me.fire("selectfeatures", { result: response });
                }, me);
            }


            if (me.provider == 'OSM') {
                var params = {
                    format: 'json',
                    lat: e.lngLat.lat,
                    lon: e.lngLat.lng,
                    addressdetails: 1
                }
                service.request('reverse', params, function(response) {
                    /**
                     * @event mapboxgl.ekmap.control.Reverse#selectfeatures
                     * @description Fired when the feature is selected.
                     */
                    me.fire("selectfeatures", { result: response });
                }, me);
            }

        }
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.onRemove
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

mapboxgl.ekmap.control.Reverse = Reverse;