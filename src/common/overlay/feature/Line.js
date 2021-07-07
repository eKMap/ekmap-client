import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Line extends ShapeParameters {

    constructor(pointList) {
        super(pointList);
        
        this.pointList = pointList;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Line";

    }

    destroy() {
        this.pointList = null;
        super.destroy();
    }

}

Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Line = Line;