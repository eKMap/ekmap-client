import mapboxgl from 'mapbox-gl';

export default class Overlayer extends mapboxgl.Evented{
    
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

    // @setter
    static setMap(map) {
        this.map = map;
        return this;
    }
    /**
     * use Global map or this.map instance to project
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

mapboxgl.ekmap.Overlayer = Overlayer;
