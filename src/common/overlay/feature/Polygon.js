import { Ekmap } from '../../Ekmap';
import { ShapeParameters } from './ShapeParameters';

export class Polygon extends ShapeParameters {

    constructor(pointList) {
        super(pointList);
        this.pointList = pointList;

        this.holePolygonPointLists = null;

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters.Polygon";
    }

    destroy() {
        this.pointList = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }
}

Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters.Polygon = Polygon;