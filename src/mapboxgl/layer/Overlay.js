import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.Overlay
 * @classdesc mapboxgl.ekmap.Overlay 
 * @category  Layer
 * @param {Object} options - Construction parameters.
 * @param {mapboxgl.Map} options.map Adds the layer to the given map or layer group.
 * 
 * @extends {mapboxgl.Overlay}
 */
export default class Overlay extends mapboxgl.Evented{
    
    constructor(opts){
        super(opts);
        this.opts = opts ? opts : {};
        if(this.opts && this.opts.map){
            this.map = this.opts.map;
        }
    }

    /**
     * to be overwrite in subClass
     */
    _init(){

    }

    /**
     * @private
     * @function mapboxgl.ekmap.Overlay.prototype.setMap
     * @description set map for overlay.
     * @returns {mapboxgl.Map}
     */
    static setMap(map) {
        this.map = map;
        return this;
    }

    /**
     * @private
     * @function mapboxgl.ekmap.Overlay.prototype.lnglat2pix
     * @description use Global map or this.map instance to project.
     */
    lnglat2pix(lng, lat) {
        if (this.map != undefined && this.map.project instanceof Function) {
            let lnglat = this.map.project(new mapboxgl.LngLat(
                lng, lat));
            let x = Math.round(lnglat.x), y = Math.round(lnglat.y);
            return [x, y];
        }
        return [lng, lat];
    }
}

mapboxgl.ekmap.Overlay = Overlay;
