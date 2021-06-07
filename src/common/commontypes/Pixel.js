import { Ekmap } from '../Ekmap';
export class Pixel {


    constructor(x, y, mode) {
        this.x = x ? parseFloat(x) : 0.0;
        this.y = y ? parseFloat(y) : 0.0;
        this.mode = mode;
        this.CLASS_NAME = "Ekmap.Pixel";
        Ekmap.Pixel.Mode = {
            LeftTop: "lefttop",
            RightTop: "righttop",
            RightBottom: "rightbottom",
            LeftBottom: "leftbottom"
        };
    }

    toString() {
        return ("x=" + this.x + ",y=" + this.y);
    }

    clone() {
        return new Pixel(this.x, this.y, this.mode);
    }

    equals(px) {
        var equals = false;
        if (px != null) {
            equals = ((this.x == px.x && this.y == px.y) ||
                (isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y)));
        }
        return equals;
    }

    distanceTo(px) {
        return Math.sqrt(
            Math.pow(this.x - px.x, 2) +
            Math.pow(this.y - px.y, 2)
        );
    }

    add(x, y) {
        if ((x == null) || (y == null)) {
            throw new TypeError('Pixel.add cannot receive null values');
        }
        return new Pixel(this.x + x, this.y + y);
    }

    offset(px) {
        var newPx = this.clone();
        if (px) {
            newPx = this.add(px.x, px.y);
        }
        return newPx;
    }

    destroy() {
        this.x = null;
        this.y = null;
        this.mode = null;
    }
}

Ekmap.Pixel = Pixel;