import { Ekmap } from '../Ekmap';
import { Size } from './Size';
import { Pixel } from './Pixel';
import { LonLat } from './LonLat';
import { Util } from './Util';

/**
 * @class Ekmap.Bounds
 * @category BaseTypes Geometry
 * @classdesc Represents an instance of a boundary class. Before using bounds, you need to set the four properties left, bottom, right, and top. The initial value of these properties is null.
 * @param {number} left The left margin, pay attention to the width, which is theoretically smaller than the right value.
 * @param {number} bottom  Lower boundary. Consider the height, which is theoretically smaller than the top value.
 * @param {number} right Right border.
 * @param {number} top Upper boundary.
 * @param {Array.<number>} array] [left, bottom, right, top], if multiple parameters are passed at the same time, the array consisting of the bottom left and top right will be used.
 * @example
 * var bounds = new Ekmap.Bounds();
 * bounds.extend(new Ekmap.LonLat(4,5));
 * bounds.extend(new Ekmap.LonLat(5,6));
 * bounds.toBBOX(); // returns 4,5,5,6
 */
export class Bounds {


    constructor(left, bottom, right, top) {
        if (Util.isArray(left)) {
            top = left[3];
            right = left[2];
            bottom = left[1];
            left = left[0];
        }
        /**
         * @member {number} Ekmap.Bounds.prototype.left
         * @description The smallest horizontal coordinate system.
         */
        this.left = left != null ? Util.toFloat(left) : this.left;

        /**
         * @member {number} Ekmap.Bounds.prototype.bottom
         * @description Smallest vertical coordinate system。
         */
        this.bottom = bottom != null ? Util.toFloat(bottom) : this.bottom;

        /**
         * @member {number} Ekmap.Bounds.prototype.right
         * @description Largest horizontal coordinate system
         */
        this.right = right != null ? Util.toFloat(right) : this.right;

        /**
         * @member {number} Ekmap.Bounds.prototype.top
         * @description The largest vertical coordinate system.
         */
        this.top = top != null ? Util.toFloat(top) : this.top;

        /**
         * @member {Ekmap.LonLat} Ekmap.Bounds.prototype.centerLonLat
         * @description The center point of the bounds of the map space. Obtained with getCenterLonLat().
         */
        this.centerLonLat = null;
        this.CLASS_NAME = "Ekmap.Bounds";
    }

    clone() {
        return new Bounds(this.left, this.bottom,
            this.right, this.top);
    }

    equals(bounds) {
        var equals = false;
        if (bounds != null) {
            equals = ((this.left === bounds.left) &&
                (this.right === bounds.right) &&
                (this.top === bounds.top) &&
                (this.bottom === bounds.bottom));
        }
        return equals;
    }

    toString() {
        return [this.left, this.bottom, this.right, this.top].join(",");
    }

    toArray(reverseAxisOrder) {
        if (reverseAxisOrder === true) {
            return [this.bottom, this.left, this.top, this.right];
        } else {
            return [this.left, this.bottom, this.right, this.top];
        }
    }

    toBBOX(decimal, reverseAxisOrder) {
        if (decimal == null) {
            decimal = 6;
        }
        var mult = Math.pow(10, decimal);
        var xmin = Math.round(this.left * mult) / mult;
        var ymin = Math.round(this.bottom * mult) / mult;
        var xmax = Math.round(this.right * mult) / mult;
        var ymax = Math.round(this.top * mult) / mult;
        if (reverseAxisOrder === true) {
            return ymin + "," + xmin + "," + ymax + "," + xmax;
        } else {
            return xmin + "," + ymin + "," + xmax + "," + ymax;
        }
    }

    getWidth() {
        return (this.right - this.left);
    }

    getHeight() {
        return (this.top - this.bottom);
    }

    getSize() {
        return new Size(this.getWidth(), this.getHeight());
    }

    getCenterPixel() {
        return new Pixel((this.left + this.right) / 2,
            (this.bottom + this.top) / 2);
    }

    getCenterLonLat() {
        if (!this.centerLonLat) {
            this.centerLonLat = new LonLat(
                (this.left + this.right) / 2, (this.bottom + this.top) / 2
            );
        }
        return this.centerLonLat;
    }

    scale(ratio, origin) {
        ratio = ratio ? ratio : 1;
        if (origin == null) {
            origin = this.getCenterLonLat();
        }

        var origx, origy;

        // get origin coordinates
        if (origin.CLASS_NAME === "Ekmap.LonLat") {
            origx = origin.lon;
            origy = origin.lat;
        } else {
            origx = origin.x;
            origy = origin.y;
        }

        var left = (this.left - origx) * ratio + origx;
        var bottom = (this.bottom - origy) * ratio + origy;
        var right = (this.right - origx) * ratio + origx;
        var top = (this.top - origy) * ratio + origy;

        return new Bounds(left, bottom, right, top);
    }

    add(x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Bounds.add cannot receive null values');
        }
        return new Bounds(this.left + x, this.bottom + y,
            this.right + x, this.top + y);
    }

    extend(object) {
        var bounds = null;
        if (object) {
            // clear cached center location
            switch (object.CLASS_NAME) {
                case "Ekmap.LonLat":
                    bounds = new Bounds(object.lon, object.lat,
                        object.lon, object.lat);
                    break;
                case "Ekmap.Geometry.Point":
                    bounds = new Bounds(object.x, object.y,
                        object.x, object.y);
                    break;

                case "Ekmap.Bounds":
                    bounds = object;
                    break;
            }

            if (bounds) {
                this.centerLonLat = null;
                if ((this.left == null) || (bounds.left < this.left)) {
                    this.left = bounds.left;
                }
                if ((this.bottom == null) || (bounds.bottom < this.bottom)) {
                    this.bottom = bounds.bottom;
                }
                if ((this.right == null) || (bounds.right > this.right)) {
                    this.right = bounds.right;
                }
                if ((this.top == null) || (bounds.top > this.top)) {
                    this.top = bounds.top;
                }
            }
        }
    }

    containsLonLat(ll, options) {
        if (typeof options === "boolean") {
            options = { inclusive: options };
        }
        options = options || {};
        var contains = this.contains(ll.lon, ll.lat, options.inclusive),
            worldBounds = options.worldBounds;
        //日界线以外的也有可能算包含，
        if (worldBounds && !contains) {
            var worldWidth = worldBounds.getWidth();
            var worldCenterX = (worldBounds.left + worldBounds.right) / 2;
            //这一步很关键
            var worldsAway = Math.round((ll.lon - worldCenterX) / worldWidth);
            contains = this.containsLonLat({
                lon: ll.lon - worldsAway * worldWidth,
                lat: ll.lat
            }, { inclusive: options.inclusive });
        }
        return contains;
    }

    containsPixel(px, inclusive) {
        return this.contains(px.x, px.y, inclusive);
    }

    contains(x, y, inclusive) {
        //set default
        if (inclusive == null) {
            inclusive = true;
        }

        if (x == null || y == null) {
            return false;
        }

        //x = Util.toFloat(x);
        //y = Util.toFloat(y);

        var contains = false;
        if (inclusive) {
            contains = ((x >= this.left) && (x <= this.right) &&
                (y >= this.bottom) && (y <= this.top));
        } else {
            contains = ((x > this.left) && (x < this.right) &&
                (y > this.bottom) && (y < this.top));
        }
        return contains;
    }

    intersectsBounds(bounds, options) {
        if (typeof options === "boolean") {
            options = { inclusive: options };
        }
        options = options || {};
        if (options.worldBounds) {
            var self = this.wrapDateLine(options.worldBounds);
            bounds = bounds.wrapDateLine(options.worldBounds);
        } else {
            self = this;
        }
        if (options.inclusive == null) {
            options.inclusive = true;
        }
        var intersects = false;
        var mightTouch = (
            self.left === bounds.right ||
            self.right === bounds.left ||
            self.top === bounds.bottom ||
            self.bottom === bounds.top
        );

        // if the two bounds only touch at an edge, and inclusive is false,
        // then the bounds don't *really* intersect.
        if (options.inclusive || !mightTouch) {
            // otherwise, if one of the boundaries even partially contains another,
            // inclusive of the edges, then they do intersect.
            var inBottom = (
                ((bounds.bottom >= self.bottom) && (bounds.bottom <= self.top)) ||
                ((self.bottom >= bounds.bottom) && (self.bottom <= bounds.top))
            );
            var inTop = (
                ((bounds.top >= self.bottom) && (bounds.top <= self.top)) ||
                ((self.top > bounds.bottom) && (self.top < bounds.top))
            );
            var inLeft = (
                ((bounds.left >= self.left) && (bounds.left <= self.right)) ||
                ((self.left >= bounds.left) && (self.left <= bounds.right))
            );
            var inRight = (
                ((bounds.right >= self.left) && (bounds.right <= self.right)) ||
                ((self.right >= bounds.left) && (self.right <= bounds.right))
            );
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        // document me
        if (options.worldBounds && !intersects) {
            var world = options.worldBounds;
            var width = world.getWidth();
            var selfCrosses = !world.containsBounds(self);
            var boundsCrosses = !world.containsBounds(bounds);
            if (selfCrosses && !boundsCrosses) {
                bounds = bounds.add(-width, 0);
                intersects = self.intersectsBounds(bounds, { inclusive: options.inclusive });
            } else if (boundsCrosses && !selfCrosses) {
                self = self.add(-width, 0);
                intersects = bounds.intersectsBounds(self, { inclusive: options.inclusive });
            }
        }
        return intersects;
    }

    containsBounds(bounds, partial, inclusive) {
        if (partial == null) {
            partial = false;
        }
        if (inclusive == null) {
            inclusive = true;
        }
        var bottomLeft = this.contains(bounds.left, bounds.bottom, inclusive);
        var bottomRight = this.contains(bounds.right, bounds.bottom, inclusive);
        var topLeft = this.contains(bounds.left, bounds.top, inclusive);
        var topRight = this.contains(bounds.right, bounds.top, inclusive);

        return (partial) ? (bottomLeft || bottomRight || topLeft || topRight) :
            (bottomLeft && bottomRight && topLeft && topRight);
    }

    determineQuadrant(lonlat) {

        var quadrant = "";
        var center = this.getCenterLonLat();

        quadrant += (lonlat.lat < center.lat) ? "b" : "t";
        quadrant += (lonlat.lon < center.lon) ? "l" : "r";

        return quadrant;
    }

    wrapDateLine(maxExtent, options) {
        options = options || {};

        var leftTolerance = options.leftTolerance || 0;
        var rightTolerance = options.rightTolerance || 0;

        var newBounds = this.clone();

        if (maxExtent) {
            var width = maxExtent.getWidth();
            while (newBounds.left < maxExtent.left &&
                newBounds.right - rightTolerance <= maxExtent.left) {
                newBounds = newBounds.add(width, 0);
            }
            while (newBounds.left + leftTolerance >= maxExtent.right &&
                newBounds.right > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
            var newLeft = newBounds.left + leftTolerance;
            if (newLeft < maxExtent.right && newLeft > maxExtent.left &&
                newBounds.right - rightTolerance > maxExtent.right) {
                newBounds = newBounds.add(-width, 0);
            }
        }

        return newBounds;
    }

    toServerJSONObject() {
        var jsonObject = {
            rightTop: { x: this.right, y: this.top },
            leftBottom: { x: this.left, y: this.bottom },
            left: this.left,
            right: this.right,
            top: this.top,
            bottom: this.bottom
        }
        return jsonObject;
    }

    destroy() {
        this.left = null;
        this.right = null;
        this.top = null;
        this.bottom = null;
        this.centerLonLat = null;
    }

    static fromString(str, reverseAxisOrder) {
        var bounds = str.split(",");
        return Bounds.fromArray(bounds, reverseAxisOrder);
    }

    static fromArray(bbox, reverseAxisOrder) {
        return reverseAxisOrder === true ?
            new Bounds(bbox[1], bbox[0], bbox[3], bbox[2]) :
            new Bounds(bbox[0], bbox[1], bbox[2], bbox[3]);
    }

    static fromSize(size) {
        return new Bounds(0,
            size.h,
            size.w,
            0);
    }

    static oppositeQuadrant(quadrant) {
        var opp = "";

        opp += (quadrant.charAt(0) === 't') ? 'b' : 't';
        opp += (quadrant.charAt(1) === 'l') ? 'r' : 'l';

        return opp;
    }

}

Ekmap.Bounds = Bounds;