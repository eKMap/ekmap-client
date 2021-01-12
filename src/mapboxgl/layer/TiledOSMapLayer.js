import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.TiledOSMapLayer
 * @classdesc The TiledOSMapLayer class use url of {@link https://www.openstreetmap.org|openstreetmap}.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name=OSMap Name of layer.
 * @param {string} options.visibility=visible Show or hide layer.
 * 
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'divMapId',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var OSMap = new mapboxgl.ekmap.TiledOSMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledOSMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ]
        this.TileLayer = new mapboxgl.ekmap.TileLayer({
            urls: this.urls,
            attribution: "<a href='https://www.openstreetmap.org/' target='_blank' style='color: blue'>© OpenStreetMap </a>" +
                "contributors",
            id: this.options.id,
            token: this.options.token,
            name: this.options.name != undefined ? this.options.name : 'OS Map',
            visibility: this.options.visibility
        })
    }

    /**
     * @function mapboxgl.ekmap.TiledOSMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledOSMapLayer = TiledOSMapLayer;