import { Ekmap } from '../../Ekmap';
import { Geometry } from '../Geometry';
import { Bounds } from '../Bounds';

export class Rectangle extends Geometry {


    constructor(x, y, width, height) {
        super(x, y, width, height);
        
        this.x = x;

        this.y = y;

        this.width = width;

        this.height = height;

        this.CLASS_NAME = "Ekmap.Geometry.Rectangle";
        this.geometryType = "Rectangle";
    }

    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x + this.width,
            this.y + this.height);
    }

    getArea() {
        var area = this.width * this.height;
        return area;
    }


}

Ekmap.Geometry.Rectangle = Rectangle;