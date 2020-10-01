import mapboxgl from 'mapbox-gl';
import '../core/Base';

/**
 * @class mapboxgl.ekmap.HeatMapLayer
 * @classdesc The class of the thermal layer.
 * @category  Visualization
 */
export class HeatMapLayer extends mapboxgl.Evented {

    constructor(name, options) {
        super(name, options);
    }

    /**
     * @function mapboxgl.ekmap.HeatMapLayer.prototype.onAdd
     * @description on Add
     */
    onAdd(map) {
    }
}

mapboxgl.ekmap.HeatMapLayer = HeatMapLayer;
