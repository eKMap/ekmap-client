import TileImage from 'ol/source/TileImage';

/**
 * @class ol.ekmap.TiledVietNamMapLayer
 * @classdesc The TiledVietNamMapLayer class.
 * @category  Layer
 * @param {Object} options  Construction parameters.
 * @param {string} options.token  Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @extends {ol.ekmap.TileLayer}
 * @example
 * var map = new ol.Map({
 *     container: 'map',
 *     center: [103.9, 22.2],
 *     zoom: 6
 * });
 * var vnMap = new ol.ekmap.TiledVietNamMapLayer({
 *      token: {YOUR_API_KEY}
 * })
 *   .addTo(map);
 */
export class TiledVietNamMapLayer extends TileImage {

    constructor(options) {
        options = options || {};

        options.attributions = options.attributions || "<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Map </a>" +
            "by <a href='http://ekgis.com.vn/' target='_blank' style='color: blue'>eKGIS</a>";

        options.urls = [
            "https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png",
            "https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png"
        ];
        options.urlsToken = [];
        if (options)
            options.urls.forEach(url => {
                url += "?apikey=" + options.token;
                options.urlsToken.push(url);
            })
        super({
            attributions: options.attributions,
            urls: options.urlsToken,
        });
    }
}