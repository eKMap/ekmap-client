import { Ekmap } from '../../Ekmap';
import { LineString } from './LineString';

export class LinearRing extends LineString {


    constructor(points) {
        super(points);
        this.componentTypes = ["Ekmap.Geometry.Point"];
        this.CLASS_NAME = "Ekmap.Geometry.LinearRing";
        this.geometryType = "LinearRing";
    }

    addComponent(point, index) {
        var added = false;

        //remove last point
        var lastPoint = this.components.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if (index != null || !point.equals(lastPoint)) {
            added = super.addComponent.apply(this, arguments);
        }

        //append copy of first point
        var firstPoint = this.components[0];
        super.addComponent.apply(this, [firstPoint]);

        return added;
    }

    removeComponent(point) { // eslint-disable-line no-unused-vars
        var removed = this.components && (this.components.length > 3);
        if (removed) {
            //remove last point
            this.components.pop();

            //remove our point
            super.removeComponent.apply(this, arguments);
            //append copy of first point
            var firstPoint = this.components[0];
            super.addComponent.apply(this, [firstPoint]);
        }
        return removed;
    }

    getArea() {
        var area = 0.0;
        if (this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i = 0, len = this.components.length; i < len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i + 1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = -sum / 2.0;
        }
        return area;
    }

    getVertices(nodes) {
        return (nodes === true) ? [] : this.components.slice(0, this.components.length - 1);
    }


}

Ekmap.Geometry.LinearRing = LinearRing;