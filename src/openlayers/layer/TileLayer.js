import { Util } from '../core/Util';
/**
 * @class ol.ekmap.TileLayer
 * @classdesc The TileLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name Name of layer.
 * @param {string} options.visible=true show or hide layer.
 * 
 */
export class TileLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? Util.getParamString(options.requestParams) : '');
                if (options.token) {
                    this.tileUrl += ('?token=' + options.token);
                }
            }
            if (options.urls) {
                this.tileUrls = [];
                var urls = options.urls
                if (!options.token)
                    this.tileUrls = urls
                else {
                    urls.forEach(url => {
                        url += "?apikey=" + options.token;
                        this.tileUrls.push(url);
                    })
                }
            }
        }
    }

    /**
     * @function ol.ekmap.TileLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        if (this.tileUrls)
            map.addLayer(new ol.layer.Tile({
                source: new ol.source.XYZ({
                    urls: this.tileUrls,
                    attributions: this.options.attribution,
                    crossOrigin: "Anonymous"
                }),
                baseLayer: true,
                visible: this.options.visible != undefined ? this.options.visible : true,
                title: this.options.name,
            }));
        if (this.tileUrl)
            map.addLayer(new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: this.tileUrl,
                    attributions: this.options.attribution,
                    crossOrigin: "Anonymous"
                }),
                baseLayer: true,
                visible: this.options.visible != undefined ? this.options.visible : true,
                title: this.options.name
            }));
        return this;
    }
}