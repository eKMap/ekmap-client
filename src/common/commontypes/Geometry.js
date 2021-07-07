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
}

Ekmap.Geometry = Geometry;