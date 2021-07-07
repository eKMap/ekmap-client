import { Ekmap } from '../../Ekmap';

export class ShapeParameters {

    constructor() {
        this.refOriginalPosition = [0, 0];

        this.refDataID = null;

        this.isHoverByRefDataID = false;

        this.refDataHoverGroup = null;

        this.dataInfo = null;

        this.clickable = true;

        this.hoverable = true;

        this.style = null;

        this.highlightStyle = {};

        this.CLASS_NAME = "Ekmap.Feature.ShapeParameters";
    }

    destroy() {
        this.refOriginalPosition = null;
        this.refDataID = null;
        this.isHoverByRefDataID = null;
        this.refDataHoverGroup = null;
        this.dataInfo = null;
        this.clickable = null;
        this.hoverable = null;
        this.style = null;
        this.highlightStyle = null;
    }

}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeParameters = ShapeParameters;