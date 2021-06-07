import { Ekmap } from '../Ekmap';
import { Util } from './Util';

export class Feature {


    constructor(layer, lonlat, data) {
        this.CLASS_NAME = "Ekmap.Feature";
        this.layer = layer;
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");

        this.lonlat = lonlat;

        this.data = (data != null) ? data : {};

    }

    destroy() {
        this.id = null;
        this.lonlat = null;
        this.data = null;
    }
}

Ekmap.Feature = Feature;