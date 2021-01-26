import L from 'leaflet';
import { TileLayer } from 'leaflet';

/**
 * @class L.ekmap.TiledOSMapLayer
 * @classdesc The TiledOSMapLayer class use url of {@link https://www.openstreetmap.org|openstreetmap}.
 * @category Layer
 * @param {Object} options Control options.
 * @param {string} options.name=OpenStreetMap Name of layer.
 * @param {Object} options.zIndex The explicit zIndex of the tile layer.
 * 
 * 
 * @extends {L.TileLayer}
 * @example
 * var map = new L.Map({
 *     container: 'divMapId',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var OSMap = new L.ekmap.TiledOSMapLayer({
 *       zIndex: //1,2,3,4
 * })
 *   .addTo(map);
 */
export class TiledOSMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        this.options['attribution'] = "<a href='https://www.openstreetmap.org/' target='_blank' style='color: blue'>© OpenStreetMap </a>" + "contributors";
        this.options.metadata = {
            "type": "baselayer",
            "image": this.options.image != undefined ? this.options.image : 'https://a.tile.openstreetmap.org/5/25/14.png',
            "name": this.options.name != undefined ? this.options.name : 'Open Street Map'
        }
        this.TileLayer = new L.tileLayer(this.url, this.options)
    }

    /**
     * @function L.ekmap.TiledOSMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

L.ekmap.TiledOSMapLayer = TiledOSMapLayer;