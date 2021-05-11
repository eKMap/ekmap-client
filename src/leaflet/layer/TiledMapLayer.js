import { Util } from '../core/Util';
import { TileLayer } from 'leaflet';
import L from "leaflet";
/**
 * @class L.ekmap.TiledMapLayer
 * @classdesc The TiledMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @param {string} options.id Id of layer and source.
 * @extends {L.TileLayer}
 */
export class TiledMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? Util.getParamString(options.requestParams) : '');
                this.options.metadata = {
                    url: this.options.url,
                    token: this.options.token,
                    type: 'tileLayer'
                }

                this.service = new L.ekmap.MapService(options);
            }
            if (options.urls)
                this.tileUrls = options.urls
            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);
            }

            this.tileLayer = new L.tileLayer(this.tileUrl, this.options);
        }
    }

    /**
     * @function L.ekmap.TiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.tileLayer.addTo(map);;
    }

    /**
     * @function L.ekmap.TiledMapLayer.prototype.identity
     * @description Returns a new L.ekmap.IdentifyFeatures object that can be used to identify features on this layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
     * @returns this
     */
    identify() {
        return this.service.identify();
    }

    /**
     * @function L.ekmap.TiledMapLayer.prototype.setUrl
     * @description Updates the layer's URL template and redraws it (unless noRedraw is set to true). If the URL does not change, the layer will not be redrawn unless the noRedraw parameter is set to false.
     * @returns this
     */
    setUrl(url, token) {
        this.options = Util.getUrlParams(this.options);
        this.tileUrl = (this.options.proxy ? this.options.proxy + '?' : '') + url + '/tile/{z}/{y}/{x}' + '?token=' + token;
        this.options.metadata = {
            url: url,
            token: token,
            type: 'tileLayer'
        }
        return this.tileLayer.setUrl(this.tileUrl);
    }

    /**
     * @function L.ekmap.TiledMapLayer.prototype.find
     * @description Adds the layer to the given map or layer group.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback 
     */
    find(params, callback, context) {
        return this.service.find(params, callback, context);
    }

    /**
     * @function L.ekmap.TiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    legend(callback, context) {
        return this.service.legend(callback, context);
    }
}

L.ekmap.TiledMapLayer = TiledMapLayer;