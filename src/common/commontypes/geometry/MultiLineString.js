import { Ekmap } from '../../Ekmap';
import { Collection } from './Collection';
import './LineString';

export class MultiLineString extends Collection {


    constructor(components) {
        super(components);
        /**
          * @member {Array.<string>} [Ekmap.Geometry.MultiLineString.prototype.componentTypes=["Ekmap.Geometry.LineString"]]
          * @description components The array of geometry types supported by the stored geometry objects.
          * @readonly
          */
        this.componentTypes = ["Ekmap.Geometry.LineString"];
        this.CLASS_NAME = "Ekmap.Geometry.MultiLineString";
        this.geometryType = "MultiLineString";
    }


}

Ekmap.Geometry.MultiLineString = MultiLineString;