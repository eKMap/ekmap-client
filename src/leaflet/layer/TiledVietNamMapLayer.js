import L from 'leaflet';
import { TileLayer } from './TileLayer';

/**
 * @class L.ekmap.TiledVietNamMapLayer
 * @classdesc The TiledVietNamMapLayer class.
 * @category  Layer
 * @param {Object} options  Construction parameters.
 * @param {string} options.token  Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @param {string} options.name=VietNamMap Name of layer.
 * @param {string} options.image=https://map.ekgis.vn/Common/images/vnmap.png Thumbnail of layer.
 * @param {string} options.zIndex The explicit zIndex of the tile layer.
 * 
 * @extends {L.TileLayer}
 * @example
 * var map = new L.Map({
 *     container: 'map',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var vnMap = new L.ekmap.TiledVietNamMapLayer({
 *      token: {YOUR_API_KEY},
 *      zIndex: //1,2,3,4
 * })
 *   .addTo(map);
 */
export class TiledVietNamMapLayer extends TileLayer {

    constructor(options) {
        super();
        this.options = options ? options : {};
        this.url = "https://mt{s}.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm";
        this.options['attribution'] = "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Map </a>" +
            "by <a href='http://ekgis.com.vn/' target='_blank' style='color: blue'>eKGIS</a>";
        this.options.metadata = {
            "type": "baselayer",
            "image": this.options.image != undefined ? this.options.image : 'https://map.ekgis.vn/Common/images/vnmap.png',
            "name": this.options.name != undefined ? this.options.name : 'VietNam Map'
        }
        this.options.subdomains = ['0', '1', '2', '3'];
        this.TileLayer = new L.tileLayer(this.url, this.options)
    }

    /**
     * @function L.ekmap.TiledVietNamMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {L.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}

L.ekmap.TiledVietNamMapLayer = TiledVietNamMapLayer;