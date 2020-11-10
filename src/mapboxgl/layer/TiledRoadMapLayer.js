import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.TiledRoadMapLayer
 * @classdesc The TiledRoadMapLayer class.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var roadMap = new mapboxgl.ekmap.TiledRoadMapLayer({})
 *   .addTo(map);
 */
export class TiledRoadMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g2.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g4.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png"
        ];
        this.urlsToken = [];
        if (options)
            this.urls.forEach(url => {
                url += "?apikey=" + options.token;
                this.urlsToken.push(url);
            })
        if (this.urlsToken.length > 0) {
            this.TileLayer = new mapboxgl.ekmap.TileLayer({
                urls: this.urlsToken
            })
        }
        else {
            this.TileLayer = new mapboxgl.ekmap.TileLayer({
                urls: this.urls
            })
        }
    }

    /**
     * @function mapboxgl.ekmap.TiledRoadMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledRoadMapLayer = TiledRoadMapLayer;
