import { Util } from '../core/Util';
import Observable from 'ol/Observable';

/**
 * @class ol.ekmap.WMS
 * @classdesc The WMS class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url WMS service URL.
 * @param {string} options.params WMS request parameters. At least a LAYERS param is required. STYLES is '' by default. VERSION is 1.3.0 by default. WIDTH, HEIGHT, BBOX and CRS (SRS for WMS version < <br> 1.3.0) will be set dynamically.
 * @param {string} options.attribution Attributions.
 * @param {string} options.id Id of layer and source.
 * @extends {ol.Observable}
 */
export class WMS extends Observable {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            this.url = this.options.url;
            this.params = this.options.params
        }
    }

    /**
     * @function ol.ekmap.WMS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var layer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: this.url,
                params: this.params,
                serverType: 'geoserver',
                transition: 0
            })
        });
        map.addLayer(layer);
        return this;
    }

    /**
     * @function ol.ekmap.WMS.prototype.getLayers
     * @description Get layer name of map service.
     */
    getLayers() {
        var parser = new ol.format.WMSCapabilities();
        fetch(this.url + '?apikey=' + this.params.apikey + '&request=GetCapabilities&service=WMS')
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                var result = parser.read(text, null, 2);
                return result;
            });
    }


    /**
     * @function ol.ekmap.WMS.prototype.getFeatureInfoUrl
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    getFeatureInfoUrl(coordinate) {
        var me = this;
        me.result = [];
        var viewResolution = /** @type {number} */ map.getView().getResolution();
        var wms_source = map.getLayers().item(1).getSource();
        var url = wms_source.getFeatureInfoUrl(
            coordinate,
            viewResolution,
            'EPSG:3857', {
                'INFO_FORMAT': "application/json",
                'REQUEST': "GetFeatureInfo",
                'FEATURE_COUNT': '80',
            }
        );
        if (url) {
            return fetch(url).then(resp => resp.json())
        }
        return "";
    }
}