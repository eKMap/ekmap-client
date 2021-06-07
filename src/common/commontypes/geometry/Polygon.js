import { Ekmap } from '../../Ekmap';
import { Collection } from './Collection';
import './Point';
import './LineString';
import './LinearRing';

export class Polygon extends Collection {


    constructor(components) {
        super(components);
        this.componentTypes = ["Ekmap.Geometry.LinearRing"];
        this.CLASS_NAME = "Ekmap.Geometry.Polygon";
        this.geometryType = "Polygon";
    }

    getArea() {
        var area = 0.0;
        if (this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getArea());
            for (var i = 1, len = this.components.length; i < len; i++) {
                area -= Math.abs(this.components[i].getArea());
            }
        }
        return area;
    }


}

Ekmap.Geometry.Polygon = Polygon;