import Observable from 'ol/Observable'
/**
 * @class ol.ekmap.Overlay
 * @classdesc ol.ekmap.Overlay 
 * @category  Layer
 * @param {Object} options - Construction parameters.
 * @param {ol.Map} options.map Adds the layer to the given map or layer group.
 * 
 * @extends {ol.Observable}
 */
export default class Overlay extends Observable {

    constructor(opts) {
        super(opts);
        this.opts = opts ? opts : {};
        if (this.opts && this.opts.map) {
            this.map = this.opts.map;
        }
    }

    /**
     * to be overwrite in subClass
     */
    _init() {

    }

    /**
     * @private
     * @function ol.ekmap.Overlay.prototype.setMap
     * @description set map for overlay.
     * @returns {ol.Map}
     */
    static setMap(map) {
        this.map = map;
        return this;
    }

    /**
     * @private
     * @function ol.ekmap.Overlay.prototype.lnglat2pix
     * @description use Global map or this.map instance to project.
     */
    lnglat2pix(lng, lat) {
        if (this.map != undefined) {
            var lnglat = this.map.getPixelFromCoordinate([lng, lat]);
            let x = Math.round(lnglat[0]),
                y = Math.round(lnglat[1]);
            return [x, y];
        }
        return [lng, lat];
    }
}