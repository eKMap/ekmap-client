import { Util } from '../core/Util';
/**
 * @class ol.ekmap.TiledMapLayer
 * @classdesc The TiledMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @param {string} options.id Id of layer and source.
 * @extends {ol.Evented}
 */
export class TiledMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? Util.getParamString(options.requestParams) : '');
                //if (options.url.indexOf('{s}') !== -1 && options.subdomains && options.url)
                //    options.url = options.url.replace('{s}', options.subdomains[0]);
                this.service = new ol.ekmap.MapService(options);
            }
            this.identifies = this.service.identify();
            if (options.urls)
                this.tileUrls = options.urls
                // Remove subdomain in url
                // https://github.com/Esri/esri-leaflet/issues/991
                //this.service.addEventParent(this);
                //var arcgisonline = new RegExp(/tiles.arcgis(online)?\.com/g);
                //if (arcgisonline.test(options.url)) {
                //    this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}');
                //    options.subdomains = ['1', '2', '3', '4'];
                //}
            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);

            }
            this.layer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: this.tileUrl,
                    crossOrigin: "Anonymous"
                }),
                title: this.options.name,
                type: 'TileLayer',
                url: this.options.url,
                token: this.options.token
            })
        } else {
            this.layer = new ol.layer.Tile({
                source: new ol.source.XYZ({
                    crossOrigin: "Anonymous"
                }),
                type: 'TileLayer'
            })
        }
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        map.addLayer(this.layer);
        return this;
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.setUrls
     * @description setUrls the layer to the given map or layer group.
     * @param {ol.Map} map - setUrls the layer to the given map or layer group.
     * @returns this
     */
    setUrls(url, token) {
        if (typeof(url) == 'string') {
            this.options = Util.getUrlParams(this.options);
            this.tileUrl = (this.options.proxy ? this.options.proxy + '?' : '') + url + '/tile/{z}/{y}/{x}' + '?token=' + token;
            this.layer.getSource().setUrl(this.tileUrl);
        } else {
            this.tileUrls = url;
            this.layer.getSource().setUrls(this.tileUrls)
        }
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.identity
     * @description Returns a new ol.ekmap.IdentifyFeatures object that can be used to identify features on this layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
     * @returns this
     */
    identify() {
        return this.identifies;
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.find
     * @description Adds the layer to the given map or layer group.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback 
     */
    find(params, callback, context) {
        return this.service.find(params, callback, context);
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    legend(callback, context) {
        return this.service.legend(callback, context);
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.getExtent
     * @description extend of layer.
     * @param {RequestCallback} callback
     *
     */
    getExtent(callback, context) {
        return this.service.getExtent(callback, context);
    }

}