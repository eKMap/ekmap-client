import mapboxgl from 'mapbox-gl';
import { TileLayer } from './TileLayer';

/**
 * @class mapboxgl.ekmap.TiledVietNamMapLayer
 * @classdesc The TiledVietNamMapLayer class.
 * @category  Layer
 * @param {Object} options  Construction parameters.
 * @param {string} options.token  Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name=VietNamMap Name of layer.
 * @param {string} options.image=https://map.ekgis.vn/Common/images/vnmap.png Thumbnail of layer.
 * * @param {Number} options.minzoom The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden (between 0 and 24 inclusive).
 * @param {Number} options.maxzoom The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden (between 0 and 24 inclusive).
 * @param {string} options.visibility=visible Show or hide layer.
 * 
 * @extends {mapboxgl.ekmap.TileLayer}
 * @example
 * var map = new mapboxgl.Map({
 *     container: 'map',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledVietNamMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.urls = [
            "https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png"
        ];

        this.TileLayer = new mapboxgl.ekmap.TileLayer({
            urls: this.urls,
            attribution: "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Map </a>" +
                "by <a href='http://ekgis.com.vn/' target='_blank' style='color: blue'>eKGIS</a>",
            id: this.options.id,
            token: this.options.token,
            name: this.options.name != undefined ? this.options.name : 'VietNam Map',
            visibility: this.options.visibility,
            image: this.options.image != undefined ? this.options.image : 'https://map.ekgis.vn/Common/images/vnmap.png',
            minzoom: this.options.minzoom != undefined ? this.options.minzoom : 0,
            maxzoom: this.options.maxzoom != undefined ? this.options.maxzoom : 24,
        })
    }

    /**
     * @function mapboxgl.ekmap.TiledVietNamMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

mapboxgl.ekmap.TiledVietNamMapLayer = TiledVietNamMapLayer;