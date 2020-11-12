import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.WMS
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
 * @extends {mapboxgl.Evented}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'divMapId',
 *     zoom: 3.9996619013972636,
 *     center: [-96.52559859275812, 39.21792880745451]
 * });
 * var wms = new mapboxgl.ekmap.WMS('https://demo.geo-solutions.it/geoserver/topp/wms', {
 *     layers: 'topp:states',
 *     transparent: true
 * }).addTo(map);
 */
export class WMS extends mapboxgl.Evented {

    constructor(url, options) {
        super();
        this._url = url;
        this.defaultWmsParams = {
            service: 'WMS',
            request: 'GetMap',
            layers: '',
            styles: '',
            format: 'image/jpeg',
            transparent: false,
            version: '1.1.1',
            tileSize: 256,
            bbox: '{bbox-epsg-3857}',
            onClick: true
        }
        var wmsParams = Util.extend({}, this.defaultWmsParams);
        // all keys that are not TileLayer options go to WMS params
        for (var i in options) {
            wmsParams[i] = options[i];
        }

        this.options = Util.setOptions(this, options);
        var realRetina = this.options.detectRetina && retina ? 2 : 1;
        var tileSize = this.getTileSize();
        wmsParams.width = tileSize.x * realRetina;
        wmsParams.height = tileSize.y * realRetina;

        this.wmsParams = wmsParams;
    }

    /**
     * @function mapboxgl.ekmap.WMS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;

        this._map = map;
        this._crs = this.options.crs;
        this._wmsVersion = parseFloat(this.wmsParams.version);
        var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = 'EPSG:900913';
        var baseUrl = this._url + '?' + Util.serialize(this.wmsParams);
        map.addSource('wms', {
            'type': 'raster',
            'tiles': [baseUrl],
            'tileSize': 256
        });
        map.addLayer(
            {
                'id': 'wms',
                'type': 'raster',
                'source': 'wms',
                'paint': {}
            }
        );
        if (this.wmsParams.onClick)
            this._map.on('click',function (e) {
                me.getFeatureInfo(e)
            });
        return this;
    }

    /**
     * @private
     * @function mapboxgl.ekmap.WMS.prototype.getTileSize
     * @returns mapboxgl.Point
     */
    getTileSize() {
        var s = this.defaultWmsParams.tileSize;
        return s instanceof mapboxgl.Point ? s : new mapboxgl.Point(s, s);
    }

    /**
     * @function mapboxgl.ekmap.WMS.prototype.getFeatureInfo
     * @description Get feature infomation.
     * @param {MapMouseEvent} evt The event object (e) of MapMouseEvent.
     * @param {RequestCallback} callback
     */
    getFeatureInfo(evt, callback) {
        var sw = new mapboxgl.LngLat(evt.lngLat.lng - 1, evt.lngLat.lat - 1);
        var ne = new mapboxgl.LngLat(evt.lngLat.lng + 1, evt.lngLat.lat + 1);
        var bounds = new mapboxgl.LngLatBounds(sw, ne);
        var url = this.getFeatureInfoUrl(bounds)
        var showResults = Util.bind(this.showGetFeatureInfo, this);
        $.ajax({
            url: url,
            success: function (data, status, xhr) {
                var err = typeof data === 'string' ? null : data;
                showResults(err, evt.lngLat, data, callback);
            },
            error: function (xhr, status, error) {
                showResults(error);
            }
        });
    }

    /**
     * @private
     * @function mapboxgl.ekmap.WMS.prototype.getFeatureInfoUrl
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    getFeatureInfoUrl(bounds) {
        // Construct a GetFeatureInfo request URL given a point
        // var point = this._map.latLngToContainerPoint(lngLat, this._map.getZoom()),
        var realRetina = this.options.detectRetina && retina ? 2 : 1;
        var bounds = bounds;
        var tileSize = this.getTileSize();
        var params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: this.wmsParams.styles,
            transparent: this.wmsParams.transparent,
            version: this.wmsParams.version,
            format: this.wmsParams.format,
            bbox: bounds.getSouthWest().lng + ',' + bounds.getSouthWest().lat + ',' + bounds.getNorthEast().lng + ',' + bounds.getNorthEast().lat,
            height: tileSize.y * realRetina,
            width: tileSize.x * realRetina,
            layers: this.wmsParams.layers,
            query_layers: this.wmsParams.layers,
            info_format: this.wmsParams.onClick ? 'text/html' : 'application/json'
        };

        params[params.version === '1.3.0' ? 'i' : 'x'] = 50;
        params[params.version === '1.3.0' ? 'j' : 'y'] = 50;

        return this._url + Util.getParamString(params, this._url, true);
    }

    /**
     * @private
     * @function mapboxgl.ekmap.WMS.prototype.showGetFeatureInfo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    showGetFeatureInfo(err, latlng, content, callback) {
        //content: json
        if (err) {
            return callback(err);
        }
        //content: html
        var content = String(content);
        // Otherwise show the content in a popup, or something.
        new mapboxgl.Popup({ maxWidth: 800 })
            .setLngLat(latlng)
            .setHTML(content)
            .addTo(this._map)
    }
}

mapboxgl.ekmap.WMS = WMS;
