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
            //return new ol.ekmap.MapService(this.tileUrl);
            // init layer by calling TileLayers initialize method
            //TileLayer.prototype.initialize.call(this, this.tileUrl, options);
        }
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        map.addLayer(new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: this.tileUrl
            }),
            title: this.options.name
        }));
        return this;
    }

    /**
     * @function ol.ekmap.TiledMapLayer.prototype.identity
     * @description Returns a new ol.ekmap.IdentifyFeatures object that can be used to identify features on this layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
     * @returns this
     */
    identify() {
        return this.service.identify();
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
}