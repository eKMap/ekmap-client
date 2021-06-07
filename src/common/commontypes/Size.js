import { Ekmap } from '../Ekmap';

export class Size {

    constructor(w, h) {
        this.w = w ? parseFloat(w) : 0.0;
        this.h = w ? parseFloat(h) : 0.0;
        this.CLASS_NAME = "Ekmap.Size";
    }

    toString() {
        return ("w=" + this.w + ",h=" + this.h);
    }

    clone() {
        return new Size(this.w, this.h);
    }

    equals(sz) {
        var equals = false;
        if (sz != null) {
            equals = ((this.w === sz.w && this.h === sz.h) ||
                (isNaN(this.w) && isNaN(this.h) && isNaN(sz.w) && isNaN(sz.h)));
        }
        return equals;
    }

    destroy() {
        this.w = null;
        this.h = null;
    }
}

Ekmap.Size = Size;