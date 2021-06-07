import { Ekmap } from '../../Ekmap';
import { MultiPoint } from './MultiPoint';

export class Curve extends MultiPoint {

    constructor(components) {
        super(components);
        this.componentTypes = ["Ekmap.Geometry.Point", "Ekmap.PointWithMeasure"];
        this.CLASS_NAME = "Ekmap.Geometry.Curve";
        this.geometryType = "Curve";

    }


}

Ekmap.Geometry.Curve = Curve;