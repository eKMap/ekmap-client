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
 * @param {string} options.pointColor Color of marker.
 * @param {string} options.scale=1 The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of 41px and a width of 27px.
 * @param {Boolean} options.setStyle=true If setStyle = false, the Reverseed feature will not set style and vice versa it will set style default.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Reverse#selectfeatures
 * @fires mapboxgl.ekmap.control.Reverse#startReverse
 * @fires mapboxgl.ekmap.control.Reverse#unReverse
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.Reverse({  target: // the id attribute of target,
 *             provider: 'OSM',
 *             tokenKey: '83F55C73-7D2A-4C97-903C-7BA6559DC0A4' }),'bottom-right');
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
        this.pointColor = this.options.pointColor != undefined ? this.options.pointColor : '#3FB1CE';
        this.scale = this.options.scale != undefined ? this.options.scale : 1;
        this.listeners = {};
        if (this.provider == 'eKGIS')
            this.url = 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address';
        if (this.provider == 'OSM')
            this.url = 'https://nominatim.openstreetmap.org/reverse/';
        this.marker = '';
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
        this._container.style.fontSize = "14px";
        this.featuresCheck = map.queryRenderedFeatures();
        let input = this.createLayerInputToggle();
        var cursorDom = $('.mapboxgl-canvas-container')
        var me = this;
        if (!me.target)
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
                    me.offEvent();
                    me.listeners["click"] = me.onClick.bind(me);
                    me._map.on('click', me.listeners["click"]);
                    me.fire('startReverse', me);
                } else {
                    cursorDom[0].style.cursor = '';
                    /**
                     * @event mapboxgl.ekmap.control.Reverse#unReverse
                     * @description Fired when cancel control.
                     */
                    // me._map.off('click', me.onClick)
                    me.offEvent();
                    me.fire('unReverse', me);
                }
            });
        }

        me._container.addEventListener("click", function(e) {
            me.active = !me.active
            if (me.active) {
                cursorDom[0].style.cursor = 'crosshair';
                me.offEvent();
                me.listeners["click"] = me.onClick.bind(me);
                me._map.on('click', me.listeners["click"]);
                me.fire('startReverse', me);
            } else {
                cursorDom[0].style.cursor = '';
                //me._map.off('click', me.onClick)

                me.offEvent();
                me.fire('unReverse', me);
            }
        });
        return me._container
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this.deactivate();
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

        var service = new mapboxgl.ekmap.ServiceBase({
            url: me.url,
            tokenKey: me.options.tokenKey
        });
        if (me.marker)
            me.marker.remove()
        me.marker = new mapboxgl.Marker({
            scale: me.scale,
            color: me.pointColor
        }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(me._map);
        if (me.provider == 'eKGIS') {
            var params = {
                latlng: [e.lngLat.lat, e.lngLat.lng]
            }
            service.request('json', params, function(error, response) {
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
            service.request('reverse', params, function(error, response) {
                me.fire("selectfeatures", { result: response });
            }, me);
        }
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.deactivate
     * @description Deactivate control Reverse.
     */
    deactivate() {
        var cursorDom = $('.mapboxgl-canvas-container')
        cursorDom[0].style.cursor = '';
        this.offEvent();
        if (this.marker)
            this.marker.remove()
            // this._map.off('click', this.onClick);
            // this.fire('unReverse', this);
        this.active = false;
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.activate
     * @description Activate control Reverse.
     */
    activate() {
        var cursorDom = $('.mapboxgl-canvas-container')
        cursorDom[0].style.cursor = 'crosshair';
        this.offEvent();
        this.listeners["click"] = this.onClick.bind(this);
        this._map.on('click', this.listeners["click"]);
        // this.fire('startReverse', this);
        this.active = true;
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.setProvider
     * @description Set provider for control.
     */
    setProvider(nameProvider) {
        this.provider = nameProvider;
        if (this.provider == 'eKGIS')
            this.url = 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address';
        if (this.provider == 'OSM')
            this.url = 'https://nominatim.openstreetmap.org/reverse/';
        this.deactivate();
        this.activate();
    }
}

mapboxgl.ekmap.control.Reverse = Reverse;