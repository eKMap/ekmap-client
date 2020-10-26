import mapboxgl from 'mapbox-gl';
import { TiledMapLayer } from './TiledMapLayer';

/**
 * @class mapboxgl.ekmap.TiledAdminMapLayer
 * @classdesc The TiledAdminMapLayer class.
 * @category  Layer
 * @param {Object} options  Construction parameters.
 * @param {string} options.token  Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.ekmap.TiledMapLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledVietNamMapLayer extends TiledMapLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png"
        ];
        this.urlsToken = [];
        if (options)
            this.urls.forEach(url => {
                url += "?apikey=" + options.token;
                this.urlsToken.push(url);
            })
        if (this.urlsToken.length > 0) {
            this.tiledMapLayer = new mapboxgl.ekmap.TiledMapLayer({
                urls: this.urlsToken
            })
        }
        else {
            this.tiledMapLayer = new mapboxgl.ekmap.TiledMapLayer({
                urls: this.urls
            })
        }
    }

    /**
     * @function mapboxgl.ekmap.TiledAdminMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.tiledMapLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledVietNamMapLayer = TiledVietNamMapLayer;
