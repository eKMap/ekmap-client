import TileImage from 'ol/source/TileImage';

/**
 * @class ol.ekmap.TileLayer
 * @classdesc The TileLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name Name of layer.
 * @param {string} options.visibility=visible show or hide layer.
 * 
 */
export class TileLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            if (options.urls)
                this.tileUrls = options.urls
        }
    }

    /**
     * @function ol.ekmap.TileLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        map.addLayer(new ol.layer.Tile({
            source: new ol.source.XYZ({
                urls: this.tileUrls
            }),
            baseLayer: true,
            title: this.options.name
        }));
        return this;
    }
}