import '../core/Base';
import Control from 'ol/control/Control';
import ekmap_common from '../core/Common';


/**
 * @class ol.ekmap.control.Location
 * @category  Control
 * @classdesc Location.
 * @param {Object} options Construction parameters.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {String} options.tooltip=Mylocation Tooltip of button.
 * @param {String} options.className Your style fix.
 * 
 * @extends {ol.control.Control}
 * @example
 * (start code)
 *  map.addControl(new ol.ekmap.control.Location());
 * (end)
 */

var Location = /*@__PURE__*/ (function(Control) {
    function Location(opt_options) {
        this.options = opt_options ? opt_options : {};
        this.target = this.options.target;
        this.locationLayer = null;
        this.element = document.createElement('div');
        var className = 'gclient-bl';
        className = className + ' ' + (this.options.className !== undefined ? this.options.className : '');
        var cssClasses = className + ' ol-unselectable ol-control';
        this.element.className = cssClasses;
        let input = this.createLayerInputToggle();
        if (ekmap_common.isMobile()) {
            input.addEventListener("touchstart", this.handleClick_.bind(this), false);
        } else {
            input.addEventListener("click", this.handleClick_.bind(this), false);
        }
        if (!this.target)
            this.element.appendChild(input);
        else
            this.element.style.display = 'none';
        Control.call(this, {
            element: this.element,
            target: this.target
        });
    }

    if (Control) Location.__proto__ = Control;
    Location.prototype = Object.create(Control && Control.prototype);
    Location.prototype.constructor = Location;

    Location.prototype.handleClick_ = function handleClick_(e) {
        var self = this;
        e.preventDefault();
        var map = self.getMap();
        var view = map.getView();
        var fly = this.mylocationfly;
        if (navigator.geolocation && (fly == true || fly == undefined || fly == null)) {
            navigator.geolocation.getCurrentPosition(function(position) {
                if (position && position.coords) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    var view = map.getView();

                    function callback(complete) {
                        var layer = null;
                        if (!self.locationLayer) {
                            layer = new ol.layer.Vector({
                                name: 'locationLayer',
                                displayInLayerSwitcher: false,
                                source: new ol.source.Vector()
                            })
                            map.addLayer(layer);
                            self.locationLayer = layer;
                        } else
                            layer = self.locationLayer;
                        layer.getSource().clear();
                        if (view.getProjection().code_ == 'EPSG:3857')
                            var feature = new ol.Feature({
                                geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
                            })
                        if (view.getProjection().code_ == 'EPSG:4326')
                            var feature = new ol.Feature(new ol.geom.Point([lon, lat]))
                        var white = [255, 255, 255, 1];
                        var blue = [0, 153, 255, 1];
                        var width = 3;
                        var circle = new ol.style.Circle({
                            radius: width * 2,
                            fill: new ol.style.Fill({ color: blue }),
                            stroke: new ol.style.Stroke({ color: white, width: width / 2 })
                        });
                        var style = new ol.style.Style({
                            image: circle,
                            stroke: new ol.style.Stroke({ color: blue, width: width }),
                            fill: new ol.style.Fill({
                                color: [255, 255, 255, 0.5]
                            })
                        })
                        feature.setStyle(style);
                        layer.getSource().addFeatures([feature]);
                    }
                    if (view.getProjection().code_ == 'EPSG:3857')
                        view.animate({
                            zoom: map.getView().getZoom() - 1,
                            rotation: view.getRotation(),
                            duration: 1000
                        }, {
                            zoom: map.getView().getZoom(),
                            center: ol.proj.fromLonLat([lon, lat]),
                            duration: 1000
                        }, callback);
                    if (view.getProjection().code_ == 'EPSG:4326')
                        view.animate({
                            zoom: map.getView().getZoom() - 1,
                            rotation: view.getRotation(),
                            duration: 1000
                        }, {
                            zoom: map.getView().getZoom(),
                            center: [lon, lat],
                            duration: 1000
                        }, callback);
                }
            })
        } else
            map.dispatchEvent({ type: 'mylocationclick' });
    }

    Location.prototype.createLayerInputToggle = function createLayerInputToggle() {
            if (!this.target) {
                var button = document.createElement("button");
                button.title = this.options.tooltip != undefined ? this.options.tooltip : 'My location'
                button.style.backgroundImage = 'url(data:image/png;base64,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)';
                button.style.backgroundSize = '1.14em';
                button.style.backgroundPosition = 'center';
                button.style.backgroundRepeat = 'no-repeat';
            } else {
                var button = document.getElementById(this.target);
            }
            return button
        }
        // var mapService = new ol.ekmap.MapService({
        //     url: me.options.url,
        //     token: me.options.token
        // });
        // mapService.identify().on(me._map).at(e.lngLat).run(function(error, obj) {
        // if (listFeatures) {
        //     me.dispatchEvent({ type: "selectfeature", features: listFeatures });
        //     listFeatures.forEach(feature => {
        //         if (feature.getGeometry().flatCoordinates.length == 2)
        //             feature.setStyle(stylePoint)
        //         else
        //             feature.setStyle(styleFill)
        //     });
        // }
    return Location;
}(Control));

export default Location;