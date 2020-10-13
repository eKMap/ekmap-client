import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.VectorTiledMapLayer
 * @classdesc The VectorTiledMapLayer class.
 * @category Layer
 * @param {string} url - Url Vector Tile Services.
 * @extends {mapboxgl.Evented}
 */
export class VectorTiledMapLayer extends mapboxgl.Evented {
    constructor(url) {
        super(); 
        this.url = url;
    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        map.setStyle(this.url);
        return this;
    }
}

mapboxgl.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;
