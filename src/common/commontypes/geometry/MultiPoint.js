import { Ekmap } from '../../Ekmap';
import { Collection } from './Collection';

export class MultiPoint extends Collection {


    constructor(components) {
        super(components);
        this.componentTypes = ["Ekmap.Geometry.Point"];
        this.CLASS_NAME = "Ekmap.Geometry.MultiPoint";
        this.geometryType = "MultiPoint";
    }

    addPoint(point, index) {
        this.addComponent(point, index);
    }

    removePoint(point) {
        this.removeComponent(point);
    }


}

Ekmap.Geometry.MultiPoint = MultiPoint;