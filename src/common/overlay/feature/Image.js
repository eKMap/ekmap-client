import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Image extends ShapeParameters {

    constructor(x, y, image, width, height, sx, sy, sWidth, sHeight) {
        super(x, y, image, width, height, sx, sy, sWidth, sHeight);
       
        this.x = x;

        this.y = y;

        this.image = image;

        this.width = width;

        this.height = height;

        this.sx = sx;

        this.sy = sy;

        this.sWidth = sWidth;

        this.sHeight = sHeight;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Image";

    }

    destroy() {
        this.x = null;
        this.y = null;
        this.image = null;
        this.width = null;
        this.height = null;
        this.sx = null;
        this.sy = null;
        this.sWidth = null;
        this.sHeight = null;
        super.destroy();
    }
}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Image = Image;