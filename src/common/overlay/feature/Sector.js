import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Sector extends ShapeParameters {

    constructor(x, y, r, startAngle, endAngle, r0, clockWise) {
        super(x, y, r, startAngle, endAngle, r0, clockWise);
        
        this.x = !isNaN(x) ? x : 0;

        this.y = !isNaN(y) ? y : 0;

        this.r = !isNaN(r) ? r : 0;

        this.startAngle = !isNaN(startAngle) ? startAngle : 0;

        this.endAngle = !isNaN(endAngle) ? endAngle : 0;

        this.r0 = !isNaN(r0) ? r0 : 0;

        this.clockWise = clockWise;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Sector";
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.r = null;
        this.startAngle = null;
        this.endAngle = null;
        this.r0 = null;
        this.clockWise = null;

        super.destroy();
    }

}

Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Sector = Sector;