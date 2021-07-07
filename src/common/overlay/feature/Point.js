import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';


export class Point extends ShapeParameters {

    constructor(x, y) {
        super(x, y);
        
        this.x = !isNaN(x) ? x : 0;

        this.y = !isNaN(y) ? y : 0;

        this.r = 6;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Point";
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;

        super.destroy();
    }

}

Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Point = Point;