/**
 * @class ol.ekmap.TiledOSMapLayer
 * @classdesc The TiledOSMapLayer class use url of {@link https://www.openstreetmap.org|openstreetmap}.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name=OSMap Name of layer.
 * @param {string} options.visible=true Show or hide layer.
 * 
 * @extends {ol.ekmap.TileLayer}
 * @example
 * var map = new ol.Map({
 *     container: 'divMapId',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var OSMap = new ol.ekmap.TiledOSMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledOSMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        this.urls = [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ]
        this.TileLayer = new ol.ekmap.TileLayer({
            urls: this.urls,
            attribution: "<a href='https://www.openstreetmap.org/' target='_blank' style='color: blue'>© OpenStreetMap </a>" +
                "contributors",
            id: this.options.id,
            token: this.options.token,
            name: this.options.name != undefined ? this.options.name : 'OS Map',
            visible: this.options.visible != undefined ? this.options.visible : true
        })
    }

    /**
     * @function ol.ekmap.TiledOSMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}