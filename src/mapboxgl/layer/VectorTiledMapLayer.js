import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.VectorTiledMapLayer
 * @classdesc The VectorTiledMapLayer class.
 * @category Layer
 * @param {string} key - Construction parameters.
 * @extends {mapboxgl.Evented}
 */
export class VectorTiledMapLayer extends mapboxgl.Evented {
    constructor(key) {
        super(key);
    }

    /**
     * @function mapboxgl.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        map.setStyle("mapbox://styles/mapbox/streets-v11")
        return this;
    }
}

mapboxgl.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;
