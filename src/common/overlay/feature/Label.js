import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Label extends ShapeParameters {

    constructor(x, y, text) {
        super(x, y, text);
       
        this.x = x;

        this.y = y;

        this.text = text;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Label";
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.text = null;

        super.destroy();
    }


}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Label = Label;