import { Util } from '../core/Util';
import L from 'leaflet';


/**
 * @class L.ekmap.WMS
 * @classdesc Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object..
 * @category Layer
 * @param {string} baseUrl  a base URL of the WMS service.
 * @param {Object} options  Control options.
 * @param {string} options.layers (required) Comma-separated list of WMS layers to show.
 * @param {string} options.styles Comma-separated list of WMS styles.
 * @param {string} options.tileSize=256 
 * @param {string} options.bbox ='{bbox-epsg-3857}'
 * @param {string} options.format='image/jpeg' WMS image format (use 'image/png' for layers with transparency).
 * @param {boolean} options.transparent=false If true, the WMS service will return images with transparency.
 * @param {string} options.version='1.1.1' Version of the WMS service to use.
 * @param {CRS} options.crs=null Coordinate Reference System to use for the WMS requests, defaults to map CRS. Don't change this if you're not sure what it means.
 * @param {boolean} options.uppercase=false If true, WMS request parameter keys will be uppercase.
 * @param {boolean} options.onClick=true Fired when a pointing device (usually a mouse) is pressed and released at the same point on the map.<br> If false, not fired.
 * @extends {L.Evented}
 * @example
 * var map = new L.Map({
 *     container: 'divMapId',
 *     zoom: 3.9996619013972636,
 *     center: {
 *            lon: 103.79882812500001,
 *            lat: 16.762467717941604
 *           }
 * });
 * var wms = new L.ekmap.WMS('https://demo.geo-solutions.it/geoserver/topp/wms', {
 *     layers: 'topp:states',
 *     transparent: true
 * }).addTo(map);
 */
export class WMS extends L.Evented {

    constructor(url, options) {
            super();
            this._url = url;
            this.defaultWmsParams = {
                service: 'WMS',
                layers: '',
                styles: '',
                request: 'GetMap',
                format: 'image/jpeg',
                transparent: 'false',
                version: '1.1.1',
                srs: 'EPSG:3857',
            };
            var wmsParams = Util.extend({}, this.defaultWmsParams);
            for (var i in options) {
                wmsParams[i] = options[i];
            }
            this.options = Util.setOptions(this, options);
            this.wmsParams = wmsParams;
        }
        /**
         * @function L.ekmap.WMS.prototype.addTo
         * @description Adds the layer to the given map or layer group.
         * @param {L.Map} map - Adds the layer to the given map or layer group.
         * @returns this
         */
    addTo(map) {
        this._map = map;
        var layer = new L.tileLayer.wms(this._url, this.wmsParams);
        layer.addTo(map);
        return this;
    }

    /**
     * @private
     * @function L.ekmap.WMS.prototype.getFeatureInfoUrl
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    getFeatureInfoUrl(latlng) {
        var point = this._map.latLngToContainerPoint(latlng),
            size = this._map.getSize(),
            bounds = this._map.getBounds(),
            sw = [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
            ne = [bounds.getNorthEast().lng, bounds.getNorthEast().lat];
        var params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: '',
            styles: this.wmsParams.styles,
            transparent: this.wmsParams.transparent,
            version: this.wmsParams.version,
            format: this.wmsParams.format,
            bbox: [sw, ne],
            height: size.y,
            width: size.x,
            layers: this.wmsParams.layers,
            query_layers: this.wmsParams.layers,
            // dataType: 'json'
            info_format: 'application/json'
        };
        params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
        params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

        var baseUrls = this._url + Util.getParamString(params, this._url, true);
        return fetch(baseUrls).then(res => res.json());
    }

}

L.ekmap.WMS = WMS;