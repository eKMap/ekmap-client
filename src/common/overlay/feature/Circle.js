import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Circle extends ShapeParameters {

    constructor(x, y, r) {
        super(x, y, r);
      
        this.x = !isNaN(x) ? x : 0;

        this.y = !isNaN(y) ? y : 0;

        this.r = !isNaN(r) ? r : 0;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Circle";

    }

    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        super.destroy();
    }

}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Circle = Circle;