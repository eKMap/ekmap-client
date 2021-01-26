import { Util } from '../core/Util';
import L from 'leaflet';
import { TileLayer } from './TileLayer';

/**
 * @class L.ekmap.TiledRoadMapLayer
 * @classdesc Provide map layer with Traffic Tile pattern XYZ built by eKGIS.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.name=RoadMap Name of layer.
 * @param {string} options.image=https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9 Thumbnail of layer.
 * @param {string} options.zIndex The explicit zIndex of the tile layer.
 * 
 * @extends {L.TileLayer}
 * @example
 * var map = new L.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var roadMap = new L.ekmap.TiledRoadMapLayer({
 *      zIndex: //1,2,3,4
 * })
 *   .addTo(map);
 */
export class TiledRoadMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.url = "https://g{s}.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png";
        this.options.metadata = {
            "type": "baselayer",
            "image": this.options.image != undefined ? this.options.image : 'https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9',
            "name": this.options.name != undefined ? this.options.name : 'Road Map'
        }
        this.options.subdomains = ['1', '2', '3', '4'];
        this.TileLayer = new L.tileLayer(this.url, this.options);
    }

    /**
     * @function L.ekmap.TiledRoadMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

L.ekmap.TiledRoadMapLayer = TiledRoadMapLayer;