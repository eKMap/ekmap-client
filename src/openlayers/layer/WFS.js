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
            this.url = this.options.url;
            this.params = this.options.params;
        }
    }

    /**
     * @function ol.ekmap.WFS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */

    getFeatures() {
        var bound = map.getView().calculateExtent(map.getSize());
        var baseUrl = this.url + '?service=WFS&version=1.1.0&request=GetFeature' + '&typename=' + this.params.typename + '&outputFormat=application/json&srsname=EPSG:3857&bbox=' + bound + '&apikey=' + this.params.apikey;
        if (baseUrl) {
            return fetch(baseUrl)
                .then(res => res.json());
        }
    }
}