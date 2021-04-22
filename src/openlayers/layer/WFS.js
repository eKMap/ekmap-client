import { Util } from '../core/Util';
import Observable from 'ol/Observable';

/**
 * @class ol.ekmap.WFS
 * @classdesc The WFS class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url WFS service URL.
 * @param {string} options.params WFS request parameters. At least a LAYERS param is required. STYLES is '' by default. VERSION is 1.3.0 by default. WIDTH, HEIGHT, BBOX and CRS (SRS for WFS version < <br> 1.3.0) will be set dynamically.
 * @param {string} options.attribution Attributions.
 * @param {string} options.id Id of layer and source.
 * @extends {ol.Observable}
 */
export class WFS extends Observable {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            this.url = Util.cleanUrl(this.options.url);
            this.params = this.options.params;
        }
    }

    /**
     * @function ol.ekmap.WFS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */


    addTo(map) {
        var bound = map.getView().calculateExtent(map.getSize());
        var layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.GeoJSON(),
                url: this.url + 'service=WFS&version=1.1.0&request=GetFeature&outputFormat=application/json&srsname=EPSG:4326&bbox=' + bound + ',EPSG:4326' + '&typename=' + this.params.typename + '&apikey=' + this.params.apikey,
                strategy: ol.loadingstrategy.bbox
            }),
        });
        map.addLayer(layer);
        return this;
    }
}