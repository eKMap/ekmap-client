import { Ekmap } from '../Ekmap';
import { Util } from './Util';
export class Geometry {
    constructor() {
        this.CLASS_NAME = "Ekmap.Geometry";
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");
        this.parent = null;
        this.bounds = null;
        this.SRID = null;
    }

    destroy() {
        this.id = null;
        this.bounds = null;
        this.SRID = null;
    }

    clone() {
        return new Geometry();
    }

    setBounds(bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    }

    clearBounds() {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds();
        }
    }

    extendBounds(newBounds) {
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds);
        } else {
            this.bounds.extend(newBounds);
        }
    }

    getBounds() {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    }

    calculateBounds() {
        //
        // This should be overridden by subclasses.
        //
    }

    getVertices(nodes) { // eslint-disable-line no-unused-vars
    }

    getArea() {
        //to be overridden by geometries that actually have an area
        //
        return 0.0;
    }


    // /**
    //  * @function Ekmap.Geometry.prototype.toString
    //  * @description 返回geometry对象的字符串表述，需要引入{@link Ekmap.Format.WKT}。此方法只能在子类实现，在父类使用会报错。
    //  * @returns {string} geometry对象的字符串表述(Well-Known Text)
    //  */
    // toString() {
    // var string;
    // if (WKT) {
    //     var wkt = new WKT();
    //     string = wkt.write(new Vector(this));
    // } else {
    //     string = Object.prototype.toString.call(this);
    // }
    // return string;
    // }
}

Ekmap.Geometry = Geometry;