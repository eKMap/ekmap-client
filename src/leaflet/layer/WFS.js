import { Util } from '../core/Util';
import L from 'leaflet';

/**
 * @class L.ekmap.WFS
 * @classdesc Instantiates a WFS tile layer object given a base URL of the WFS service and a WFS parameters/options object..
 * @category Layer
 * @param {string} baseUrl  a base URL of the WFS service.
 * @param {Object} options  Control options.
 * @param {string} options.service='WFS' (required) Comma-separated list of WFS layers to show.
 * @param {string} options.typeName type name.
 * @param {string} options.request='GetFeature' Comma-separated list of WFS styles.
 * @param {string} options.maxFeatures=50 Limit the amount of features returned
 * @param {string} options.format='image/jpeg' WFS image format (use 'image/png' for layers with transparency).
 * @param {boolean} options.outputFormat='application/json' 
 * @param {string} options.version='1.0.0' Version of the WFS service to use.
 * @extends {L.Evented}
 * @example
 * var map = new L.Map({
 *     container: 'divMapId',
 *     zoom: 3.9996619013972636,
 *     center: [-96.52559859275812, 39.21792880745451]
 * });
 * var wfs = new L.ekmap.WFS('https://demo.geo-solutions.it/geoserver/topp/ows', {
 *     typeName: 'topp:states'
 * })
 * wfs.getFeature(function(e){
 *     //JSON data
 * })
 */
export class WFS extends L.Evented {

    constructor(url, options) {
        super();
        this._url = url;
        this.defaultWFSParams = {
            service: 'WFS',
            request: 'GetFeature',
            typeName: '',
            maxFeatures: '200',
            outputFormat: 'application/json',
            version: '1.0.0',
            apikey: '',
        }
        var WFSParams = Util.extend({}, this.defaultWFSParams);
        for (var i in options) {
            WFSParams[i] = options[i];
        }
        this.WFSParams = WFSParams;
    }

    /**
     * @function L.ekmap.WFS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        this._map = map;
        var URL = this._url + Util.getParamString(this.WFSParams);
        var WFSLayer = null;
        $.ajax({
            url: URL,
            dataType: 'json',
            jsonpCallback: 'getJson',
            success: function(data) {
                WFSLayer = new L.geoJson(data, {
                    style: function(feature) {
                        return {};
                    }
                }).addTo(map);
            }
        });
        return this;
    }

    /**
     * @function L.ekmap.WFS.prototype.getFeature
     * @description Adds the layer to the given map or layer group.
     * @returns geojson
     */
    getFeature(callback) {
        var URL = this._url + '?' + Util.serialize(this.WFSParams);
        var result;
        $.get(URL, function(res) {
            result = res;
        }).done(function() {
            return callback(result);
        })
    }
}

L.ekmap.WFS = WFS;