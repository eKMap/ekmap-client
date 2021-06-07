import { Ekmap } from '../../Ekmap';
import { Point } from '../../commontypes/geometry/Point';
import { GeoText } from '../../commontypes/geometry/GeoText';
import { LonLat } from '../../commontypes/LonLat';
import { Util } from '../../commontypes/Util';

export class Theme {
    constructor(data, layer) {

        if (!data) {
            return;
        }
        if (!layer || !layer.map || !layer.renderer) {
            return;
        }
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");
        this.lonlat = null;
        this.location = [];
        this.data = data;
        this.shapes = [];
        this.layer = layer;

        this.CLASS_NAME = "Ekmap.Feature.Theme";

    }

    destroy() {
        this.data = null;
        this.id = null;
        this.lonlat = null;
        this.location = null;
        this.shapes = null;
        this.layer = null;
    }

    getLocalXY(coordinate) {
        var resolution = this.layer.map.getResolution();
        var extent = this.layer.map.getExtent();

        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let x = (coordinate.x / resolution + (-extent.left / resolution));
            let y = ((extent.top / resolution) - coordinate.y / resolution);
            return [x, y];
        } else if (coordinate instanceof LonLat) {
            let x = (coordinate.lon / resolution + (-extent.left / resolution));
            let y = ((extent.top / resolution) - coordinate.lat / resolution);
            return [x, y];
        } else {
            return null;
        }
    }

}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.Theme = Theme;