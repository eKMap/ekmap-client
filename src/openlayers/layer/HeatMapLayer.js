import '../core/Base';
import VectorLayer from 'ol/layer/Vector';
import { Util } from '../core/Util';

/**
 * @class ol.ekmap.HeatMapLayer
 * @classdesc The class of the thermal layer.
 * @category  Visualization HeatMap
 * @param {string} name The layer name
 * @param {Object} options Construction parameters.
 * @param {ol/Map} options.map The map object for OpenLayers.
 * @param {string} options.id Theme layer ID. The theme layer ID is created by default using CommonUtil.createUniqueID("HeatMapSource_").
 * @param {string} options.featureWeight Corresponds to the hotspot weight field name in the feature attribute, and the weight value type is float.
 * @param {number} options.radius=50 The maximum radius of the hotspot rendering (hotspot pixel radius) in px. When the useGeoUnit parameter is true, the unit uses the current layer geographic coordinate unit.<br> When the hotspot is displayed, the radiation attenuation is started to the periphery with the precise point as the center point, and the attenuation radius and the weight value are in a ratio.
 * @param {number} options.opacity=1 The opacity.
 * @param {Array.<string>} options.colors=['blue','cyan','lime','yellow','red'] Color linear gradient array, the color value must be supported by canvas.
 * @param {boolean} options.useGeoUnit=false Use the geographic unit, which is the default pixel radius by default. When set to true, the hotspot radius and the layer's geographic coordinates are consistent.
 * @extends {ol.layer.Vector}
 */
export class HeatMapLayer extends VectorLayer {

    constructor(name, options) {
        super();
        var _options = options ? options : {};

        this.layer = new ol.layer.Heatmap({
            source: _options.source,
            blur: _options.blur,
            radius: _options.radius
        });

        this.layer.setProperties({
            'id': name
        });
        return this.layer;
    }

    /**
     * @function ol.ekmap.HeatMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map Adds the layer to the given map or layer group.
     * @returns {this}
     */
    addTo(map) {
        map.addLayer(this.layer)
        return this.layer
    }
}