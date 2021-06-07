import { Ekmap } from '../../Ekmap';
import { Bounds } from '../Bounds';
import { Geometry } from '../Geometry';
import { Util } from '../Util';

export class Collection extends Geometry {


    constructor(components) {
        super();
        this.components = [];
        this.componentTypes = null;
        if (components != null) {
            this.addComponents(components);
        }
        this.CLASS_NAME = "Ekmap.Geometry.Collection";
        this.geometryType = "Collection";
    }

    destroy() {
        this.components.length = 0;
        this.components = null;
        super.destroy();
    }

    clone() {
        var geometry = new Collection();
        for (var i = 0, len = this.components.length; i < len; i++) {
            geometry.addComponent(this.components[i].clone());
        }

        // catch any randomly tagged-on properties
        Util.applyDefaults(geometry, this);

        return geometry;
    }

    getComponentsString() {
        var strings = [];
        for (var i = 0, len = this.components.length; i < len; i++) {
            strings.push(this.components[i].toShortString());
        }
        return strings.join(",");
    }

    calculateBounds() {
        this.bounds = null;
        var bounds = new Bounds();
        var components = this.components;
        if (components) {
            for (var i = 0, len = components.length; i < len; i++) {
                bounds.extend(components[i].getBounds());
            }
        }
        // to preserve old behavior, we only set bounds if non-null
        // in the future, we could add bounds.isEmpty()
        if (bounds.left != null && bounds.bottom != null &&
            bounds.right != null && bounds.top != null) {
            this.setBounds(bounds);
        }
    }

    addComponents(components) {
        if (!(Util.isArray(components))) {
            components = [components];
        }
        for (var i = 0, len = components.length; i < len; i++) {
            this.addComponent(components[i]);
        }
    }

    addComponent(component, index) {
        var added = false;
        if (component) {
            if (this.componentTypes == null ||
                (Util.indexOf(this.componentTypes,
                    component.CLASS_NAME) > -1)) {

                if (index != null && (index < this.components.length)) {
                    var components1 = this.components.slice(0, index);
                    var components2 = this.components.slice(index,
                        this.components.length);
                    components1.push(component);
                    this.components = components1.concat(components2);
                } else {
                    this.components.push(component);
                }
                component.parent = this;
                this.clearBounds();
                added = true;
            }
        }
        return added;
    }

    removeComponents(components) {
        var removed = false;

        if (!(Util.isArray(components))) {
            components = [components];
        }
        for (var i = components.length - 1; i >= 0; --i) {
            removed = this.removeComponent(components[i]) || removed;
        }
        return removed;
    }

    removeComponent(component) {
        Util.removeItem(this.components, component);

        // clearBounds() so that it gets recalculated on the next call
        // to this.getBounds();
        this.clearBounds();
        return true;
    }

    getArea() {
        var area = 0.0;
        for (var i = 0, len = this.components.length; i < len; i++) {
            area += this.components[i].getArea();
        }
        return area;
    }

    equals(geometry) {
        var equivalent = true;
        if (!geometry || !geometry.CLASS_NAME ||
            (this.CLASS_NAME !== geometry.CLASS_NAME)) {
            equivalent = false;
        } else if (!(Util.isArray(geometry.components)) ||
            (geometry.components.length !== this.components.length)) {
            equivalent = false;
        } else {
            for (var i = 0, len = this.components.length; i < len; ++i) {
                if (!this.components[i].equals(geometry.components[i])) {
                    equivalent = false;
                    break;
                }
            }
        }
        return equivalent;
    }

    getVertices(nodes) {
        var vertices = [];
        for (var i = 0, len = this.components.length; i < len; ++i) {
            Array.prototype.push.apply(
                vertices, this.components[i].getVertices(nodes)
            );
        }
        return vertices;
    }

}

Ekmap.Geometry.Collection = Collection;