import '../core/Base';
import Control from 'ol/control/Control';

/**
 * @class ol.ekmap.control.Reverse
 * @category  Control
 * @classdesc Reverse.
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {string} options.provider=eKGIS
 * @param {string} options.tokenkey Will use this token to authenticate all calls to the service.
 * @param {string} options.anchor=[0.5, 1] Anchor. Default value is the icon center.
 * @param {string} options.scale=0.07 Scale.
 * @param {Boolean} options.setStyle=true If setStyle = false, the Reverseed feature will not set style and vice versa it will set style default.
 * @param {String} options.tooltip=Reverse Tooltip of button.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {ol.Evented}
 * @fires ol.ekmap.control.Reverse#selectfeatures
 * @fires ol.ekmap.control.Reverse#startReverse
 * @fires ol.ekmap.control.Reverse#unReverse
 * @example
 * (start code)
 *  map.addControl(new ol.ekmap.control.Reverse({  target: // the id attribute of target,
 *             provider: 'OSM',
 *             tokenKey: '83F55C73-7D2A-4C97-903C-7BA6559DC0A4' }),'bottom-right');
 * (end)
 */
var Reverse = /*@__PURE__*/ (function(Control) {
    function Reverse(opt_options) {
        this.options = opt_options ? opt_options : {};
        this.icon = this.options.icon ? this.options.icon : 'fa fa-flickr';
        this.showButton = this.options.showButton != undefined ? this.options.showButton : true;
        this.target = this.options.target;
        this.provider = this.options.provider != undefined ? this.options.provider : 'eKGIS';
        this.styleIcon = this.options.styleIcon != undefined ? this.options.styleIcon : './img/marker.png';
        this.scale = this.options.scale != undefined ? this.options.scale : 0.7;
        this.anchor = this.options.anchor != undefined ? this.options.anchor : [0.5, 1];
        this.listeners = {};
        this.url = this.options.url;
        if (!this.url) {
            if (this.provider == 'eKGIS')
                this.url = 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address';
            if (this.provider == 'OSM')
                this.url = 'https://nominatim.openstreetmap.org/reverse/';
        }
        this.marker = '';

        this.element = document.createElement('div');
        var className = 'gclient-bl';
        className = className + ' ' + (this.options.className !== undefined ? this.options.className : '');
        var cssClasses = className + ' ol-unselectable ol-control';
        this.element.className = cssClasses;
        let input = this.createLayerInputToggle();
        input.addEventListener("click", this.handleClick_.bind(this), false);
        if (!this.target)
            this.element.appendChild(input);
        else
            this.element.style.display = 'none'

        Control.call(this, {
            element: this.element,
            target: this.target
        });

    }

    if (Control) Reverse.__proto__ = Control;
    Reverse.prototype = Object.create(Control && Control.prototype);
    Reverse.prototype.constructor = Reverse;

    /**
     * @private
     * @description Create layer input
     */
    Reverse.prototype.createLayerInputToggle = function createLayerInputToggle(divTarget) {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = this.icon;
            button.className = "ol-ctrl-zoom-in";
            button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Reverse';
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button
    }

    Reverse.prototype.handleClick_ = function handleClick_() {
        var me = this;
        var map = this.getMap();
        me.active = !me.active
        if (me.active) {
            map.getViewport().style.cursor = 'crosshair';
            /**
             * @event ol.ekmap.control.Reverse#startReverse
             * @description Fired when start control.
             */
            me.offEvent();
            me.listeners["singleclick"] = me.onClick.bind(me);
            map.on('singleclick', me.listeners["singleclick"]);
            me.dispatchEvent({ type: "startReverse", value: me });
        } else {
            map.getViewport().style.cursor = 'grab';
            /**
             * @event ol.ekmap.control.Reverse#unReverse
             * @description Fired when cancel control.
             */
            // me._map.off('click', me.onClick)
            me.offEvent();
            me.dispatchEvent({ type: "unReverse", value: me });
        }
    }

    Reverse.prototype.offEvent = function() {
        var map = this.getMap();
        for (var evt in this.listeners) {
            map.un('singleclick', this.listeners[evt]);
        }
        this.listeners = {};
    }

    Reverse.prototype.onClick = function onClick(e) {
        var me = this;
        var map = this.getMap();
        var service = new ol.ekmap.ServiceBase({
            url: me.url,
            tokenKey: me.options.tokenKey
        });
        if (me.marker)
            map.removeLayer(me.marker);
        me.marker = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature(new ol.geom.Point(e.coordinate))]
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    src: me.styleIcon,
                    anchor: me.anchor,
                    scale: me.scale,
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                }),
            })
        })
        map.addLayer(me.marker);
        // if (me.marker)
        //     me.marker.remove()
        // me.marker = new ol.Marker({
        //     scale: me.scale,
        //     color: me.pointColor
        // }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(me._map);
        if (me.url == 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address') {
            var params = {
                latlng: [e.coordinate[1], e.coordinate[0]]
            }
            service.request('json', params, function(error, response) {
                /**
                 * @event ol.ekmap.control.Reverse#selectfeatures
                 * @description Fired when the feature is selected.
                 */
                me.dispatchEvent({ type: "selectfeatures", result: response });

            }, me);
        }


        if (me.url == 'https://nominatim.openstreetmap.org/reverse/') {
            console.log(e.coordinate)
            var params = {
                format: 'json',
                lat: e.coordinate[1],
                lon: e.coordinate[0],
                addressdetails: 1
            }
            service.request('reverse', params, function(error, response) {
                me.dispatchEvent({ type: "selectfeatures", result: response });
            }, me);
        }
    }

    /**
     * @function ol.ekmap.control.Reverse.prototype.setProvider
     * @description Set provider for control.
     */
    Reverse.prototype.setProvider = function setProvider(nameProvider) {
        this.provider = nameProvider;
        if (this.provider == 'eKGIS')
            this.url = 'https://g1.cloudgis.vn/gservices/rest/geoname/gsv_data/address';
        if (this.provider == 'OSM')
            this.url = 'https://nominatim.openstreetmap.org/reverse/';
        this.deactivate();
        this.activate();
    }

    /**
     * @function ol.ekmap.control.Reverse.prototype.deactivate
     * @description Deactivate control Reverse.
     */
    Reverse.prototype.deactivate = function deactivate() {
        var map = this.getMap();
        map.getViewport().style.cursor = '';
        this.offEvent();
        if (this.marker)
            map.removeLayer(this.marker)
            // this._map.off('click', this.onClick);
            // this.fire('unReverse', this);
        this.active = false;
    }

    /**
     * @function ol.ekmap.control.Reverse.prototype.activate
     * @description Activate control Reverse.
     */
    Reverse.prototype.activate = function activate() {
        var map = this.getMap();
        map.getViewport().style.cursor = 'crosshair';
        this.offEvent();
        this.listeners["singleclick"] = this.onClick.bind(this);
        map.on('singleclick', this.listeners["singleclick"]);
        // this.fire('startReverse', this);
        this.active = true;
    }


    return Reverse;
}(Control));

export default Reverse;