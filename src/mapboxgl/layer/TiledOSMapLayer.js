import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';
import { TiledMapLayer } from './TiledMapLayer';

/**
 * @class mapboxgl.ekmap.TiledOSMapLayer
 * @classdesc The TiledOSMapLayer class.
 * @category Visualization TiledMap
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.ekmap.TiledMapLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'divMapId',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var OSMap = new mapboxgl.ekmap.TiledOSMapLayer({})
 *   .addTo(map);
 */
export class TiledOSMapLayer extends TiledMapLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ]
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
     * @function mapboxgl.ekmap.TiledOSMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.tiledMapLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledOSMapLayer = TiledOSMapLayer;
