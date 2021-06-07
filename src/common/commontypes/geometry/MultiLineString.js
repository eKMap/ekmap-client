import { Ekmap } from '../../Ekmap';
import { Collection } from './Collection';
import './LineString';

export class MultiLineString extends Collection {


    constructor(components) {
        super(components);
        /**
         * @member {Array.<string>} [Ekmap.Geometry.MultiLineString.prototype.componentTypes=["Ekmap.Geometry.LineString"]]
         * @description components 存储的的几何对象所支持的几何类型数组。
         * @readonly
         */
        this.componentTypes = ["Ekmap.Geometry.LineString"];
        this.CLASS_NAME = "Ekmap.Geometry.MultiLineString";
        this.geometryType = "MultiLineString";
    }


}

Ekmap.Geometry.MultiLineString = MultiLineString;