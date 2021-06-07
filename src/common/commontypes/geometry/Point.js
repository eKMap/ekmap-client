import { Ekmap } from '../../Ekmap';
import { Geometry } from '../Geometry';
import { Bounds } from '../Bounds';
import { Util } from '../Util';

export class Point extends Geometry {


    constructor(x, y, type, tag) {
        super(x, y, type, tag);
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.tag = (tag || tag == 0) ? parseFloat(tag) : null;
        this.type = type || "Point";
        this.CLASS_NAME = "Ekmap.Geometry.Point";
        this.geometryType = "Point";
    }
    clone(obj) {
        if (obj == null) {
            obj = new Point(this.x, this.y);
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(obj, this);

        return obj;
    }

    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    equals(geom) {
        var equals = false;
        if (geom != null) {
            equals = ((this.x === geom.x && this.y === geom.y) ||
                (isNaN(this.x) && isNaN(this.y) && isNaN(geom.x) && isNaN(geom.y)));
        }
        return equals;
    }

    move(x, y) {
        this.x = this.x + x;
        this.y = this.y + y;
        this.clearBounds();
    }

    toShortString() {
        return (this.x + ", " + this.y);
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.tag = null;
        super.destroy();
    }

    getVertices(nodes) { // eslint-disable-line no-unused-vars
        return [this];
    }


}

Ekmap.Geometry.Point = Point;