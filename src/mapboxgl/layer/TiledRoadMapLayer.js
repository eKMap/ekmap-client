import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.TiledRoadMapLayer
 * @classdesc Provide map layer with Traffic Tile pattern XYZ built by eKGIS.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name=RoadMap Name of layer.
 * @param {string} options.image=https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9 Thumbnail of layer.
 * @param {string} options.visibility=visible Show or hide layer.
 * @param {Number} options.minzoom The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden (between 0 and 24 inclusive).
 * @param {Number} options.maxzoom The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden (between 0 and 24 inclusive).
 * 
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var roadMap = new mapboxgl.ekmap.TiledRoadMapLayer({
 *      token: {YOUR_API_KEY}
 * })
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
        this.TileLayer = new mapboxgl.ekmap.TileLayer({
            urls: this.urls,
            id: this.options.id,
            token: this.options.token,
            name: this.options.name != undefined ? this.options.name : 'Road Map',
            visibility: this.options.visibility,
            image: this.options.image != undefined ? this.options.image : 'https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9',
            minzoom: this.options.minzoom != undefined ? this.options.minzoom : 0,
            maxzoom: this.options.maxzoom != undefined ? this.options.maxzoom : 24,
        })
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