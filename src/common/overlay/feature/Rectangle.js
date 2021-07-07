import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Rectangle extends ShapeParameters {

    constructor(x, y, width, height) {
        super(x, y, width, height);
        
        this.x = !isNaN(x) ? x : 0;

        this.y = !isNaN(x) ? y : 0;

        this.width = !isNaN(width) ? width : 0;

        this.height = !isNaN(height) ? height : 0;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Rectangle";
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;

        super.destroy();
    }

}

Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Rectangle = Rectangle;