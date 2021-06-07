import { Ekmap } from '../../Ekmap';
import { Collection } from './Collection';

export class MultiPolygon extends Collection {


    constructor(components) {
        super(components);
        this.componentTypes = ["Ekmap.Geometry.Polygon"];
        this.CLASS_NAME = "Ekmap.Geometry.MultiPolygon";
        this.geometryType = "MultiPolygon";
    }


}

Ekmap.Geometry.MultiPolygon = MultiPolygon;