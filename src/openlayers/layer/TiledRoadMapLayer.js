/**
 * @class ol.ekmap.TiledRoadMapLayer
 * @classdesc Provide map layer with Traffic Tile pattern XYZ built by eKGIS.
 * @category Layer
 * @param {Object} options - Control options.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name=RoadMap Name of layer.
 * @param {string} options.visible=true Show or hide layer.
 * 
 * @extends {ol.ekmap.TileLayer}
 * @example
 * var map = new ol.Map({
 *     container: 'map1',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var roadMap = new ol.ekmap.TiledRoadMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledRoadMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        this.urls = [
            "https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g2.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png",
            "https://g4.cloudgis.vn/gservices/rest/maps/roadmap/tile/{z}/{x}/{y}.png"
        ];
        this.TileLayer = new ol.ekmap.TileLayer({
            urls: this.urls,
            id: this.options.id,
            name: this.options.name != undefined ? this.options.name : 'Road Map',
            visible: this.options.visible != undefined ? this.options.visible : true,
            token: this.options.token,
            image: 'https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9'
        })

    }

    /**
     * @function ol.ekmap.TiledRoadMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        return this.TileLayer.addTo(map);
    }
}