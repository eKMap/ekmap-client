export class Vector {

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.constructor
     * @description constructor
     */
    constructor() {
        this.ArrayCtor = typeof Float32Array ==='undefined'?
            Array:
            Float32Array;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Vector";
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.create
     * @description creates a vector.
     *
     * @param {number} x-x coordinate
     * @param {number} y-Y coordinate
     * @return {Vector2} vector.
     */
    create(x, y) {
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(2);
        out[0] = x || 0;
        out[1] = y || 0;

        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.copy
     * @description copies a vector.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v-vector.
     * @return {Vector2} clone vector.
     */
    copy(out, v) {
        out[0] = v[0];
        out[1] = v[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.set
     * @description sets the two items of the vector.
     *
     * @param {Vector2} out-basic vector.
     * @param {number} a-item a.
     * @param {number} b-item b.
     * @return {Vector2} result.
     */
    set(out, a, b) {
        out[0] = a;
        out[1] = b;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.add
     * @description Vector addition.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    add(out, v1, v2) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.scaleAndAdd
     * @description The vectors are scaled and added.
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-vector v2 (scale vector).
     * @param {number} a-zoom parameter.
     * @return {Vector2} result.
     */
    scaleAndAdd(out, v1, v2, a) {
        out[0] = v1[0] + v2[0] * a;
        out[1] = v1[1] + v2[1] * a;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.sub
     * @description Vector subtraction.
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    sub(out, v1, v2) {
        out[0] = v1[0]-v2[0];
        out[1] = v1[1]-v2[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.len
     * @description Vector length.
     * @param {Vector2} v-vector.
     * @return {number} Vector length.
     */
    len(v) {
        return Math.sqrt(this.lenSquare(v));
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.lenSquare
     * @description The square of the length of the vector.
     * @param {Vector2} v-vector.
     * @return {number} The square of the vector length.
     */
    lenSquare(v) {
        return v[0] * v[0] + v[1] * v[1];
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.mul
     * @description Vector multiplication.
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    mul(out, v1, v2) {
        out[0] = v1[0] * v2[0];
        out[1] = v1[1] * v2[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.div
     * @description Vector division.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    div(out, v1, v2) {
        out[0] = v1[0] / v2[0];
        out[1] = v1[1] / v2[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.dot
     * @description Vector dot product.
     *
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {number} Vector dot product.
     */
    dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.scale
     * @description Vector zoom.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v-vector v.
     * @param {number} s-zoom parameter.
     * @return {Vector2} result.
     */
    scale(out, v, s) {
        out[0] = v[0] * s;
        out[1] = v[1] * s;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.normalize
     * @description Vector normalization.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v-vector v.
     * @return {Vector2} result.
     */
    normalize(out, v) {
        var d = this.len(v);
        if (d === 0) {
            out[0] = 0;
            out[1] = 0;
        } else {
            out[0] = v[0] / d;
            out[1] = v[1] / d;
        }
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.distance
     * @description Calculate the distance between vectors.
     *
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {number} The distance between vectors.*/
    distance(v1, v2) {
        return Math.sqrt(
            (v1[0]-v2[0]) * (v1[0]-v2[0]) +
            (v1[1]-v2[1]) * (v1[1]-v2[1])
        );
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.distanceSquare
     * @description Vector distance squared.
     *
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {number} The square of the vector distance.
     */
    distanceSquare(v1, v2) {
        return (v1[0]-v2[0]) * (v1[0]-v2[0]) +
            (v1[1]-v2[1]) * (v1[1]-v2[1]);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.negate
     * @description Find the negative vector.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v-vector v.
     * @return {Vector2} Negative vector.
     */
    negate(out, v) {
        out[0] = -v[0];
        out[1] = -v[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.lerp
     * @description Linear interpolation between two points.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @param {number} t
     * @return {Vector2} result.
     */
    lerp(out, v1, v2, t) {
        out[0] = v1[0] + t * (v2[0]-v1[0]);
        out[1] = v1[1] + t * (v2[1]-v1[1]);
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.applyTransform
     * @description Matrix left multiplied by vector.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    applyTransform(out, v, m) {
        var x = v[0];
        var y = v[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.min
     * @description Find the minimum of two vectors.
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    min(out, v1, v2) {
        out[0] = Math.min(v1[0], v2[0]);
        out[1] = Math.min(v1[1], v2[1]);
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.max
     * @description Find the maximum value of two vectors.
     *
     * @param {Vector2} out-basic vector.
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {Vector2} result.
     */
    max(out, v1, v2) {
        out[0] = Math.max(v1[0], v2[0]);
        out[1] = Math.max(v1[1], v2[1]);
        return out;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.length
     * @description Vector length.
     *
     * @param {Vector2} v-vector.
     * @return {number} Vector length.
     */
    length(v) {
        return this.len(v);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.lengthSquare
     * @description The square of the length of the vector.
     *
     * @param {Vector2} v-vector.
     * @return {number} The square of the vector length.
     */
    lengthSquare(v) {
        return this.lenSquare(v);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.dist
     * @description Calculate the distance between vectors.
     *
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {number} The distance between vectors.
     */
    dist(v1, v2) {
        return this.distance(v1, v2);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Vector.prototype.distSquare
     * @description Vector distance squared.
     *
     * @param {Vector2} v1-vector v1.
     * @param {Vector2} v2-Vector v2.
     * @return {number} vector distance square
     */
    distSquare(v1, v2) {
        return this.distanceSquare(v1, v2);
    }

}