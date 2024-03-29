
export class Matrix {

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.constructor
     * @description Constructor.
     */

     constructor() {
        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Matrix.prototype.ArrayCtor
         * @description array type control
         */
        this.ArrayCtor = typeof Float32Array ==='undefined'?
            Array:
            Float32Array;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Matrix";
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.create
     * @description creates an identity matrix.
     * @returns {(Float32Array|Array.<number>)} identity matrix.
     */
    create() {
        var ArrayCtor = this.ArrayCtor;

        var out = new ArrayCtor(6);
        this.identity(out);

        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.identity
     * @description sets the matrix as the identity matrix.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @returns {(Float32Array|Array.<number>)} identity matrix.
     */
    identity(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = 0;
        out[5] = 0;
        return out;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.copy
     * @description Copy the matrix.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @returns {(Float32Array|Array.<number>)} Clone the matrix.
     */
    copy(out, m) {
        out[0] = m[0];
        out[1] = m[1];
        out[2] = m[2];
        out[3] = m[3];
        out[4] = m[4];
        out[5] = m[5];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.mul
     * @description Matrix multiplication.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @param {(Float32Array|Array.<number>)} m1-matrix m1.
     * @param {(Float32Array|Array.<number>)} m2- matrix m2.
     * @returns {(Float32Array|Array.<number>)} Result matrix.
     */
    mul(out, m1, m2) {
        out[0] = m1[0] * m2[0] + m1[2] * m2[1];
        out[1] = m1[1] * m2[0] + m1[3] * m2[1];
        out[2] = m1[0] * m2[2] + m1[2] * m2[3];
        out[3] = m1[1] * m2[2] + m1[3] * m2[3];
        out[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
        out[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.mul
     * @description Translation transformation.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @param {(Float32Array|Array.<number>)} a-matrix.
     * @param {(Float32Array|Array.<number>)} v- translation parameter.
     * @returns {(Float32Array|Array.<number>)} Result matrix.
     */
    translate(out, a, v) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4] + v[0];
        out[5] = a[5] + v[1];
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.rotate
     * @description Translation transformation.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @param {(Float32Array|Array.<number>)} a-matrix.
     * @param {(Float32Array|Array.<number>)} rad-Rotation parameter.
     * @returns {(Float32Array|Array.<number>)} Result matrix.
     */
    rotate(out, a, rad) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];
        var st = Math.sin(rad);
        var ct = Math.cos(rad);

        out[0] = aa * ct + ab * st;
        out[1] = -aa * st + ab * ct;
        out[2] = ac * ct + ad * st;
        out[3] = -ac * st + ct * ad;
        out[4] = ct * atx + st * aty;
        out[5] = ct * aty-st * atx;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.scale
     * @description zoom transformation.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @param {(Float32Array|Array.<number>)} a-matrix.
     * @param {(Float32Array|Array.<number>)} v-scaling parameter.
     * @returns {(Float32Array|Array.<number>)} Result matrix.
     */
    scale(out, a, v) {
        var vx = v[0];
        var vy = v[1];
        out[0] = a[0] * vx;
        out[1] = a[1] * vy;
        out[2] = a[2] * vx;
        out[3] = a[3] * vy;
        out[4] = a[4] * vx;
        out[5] = a[5] * vy;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.invert
     * @description Find the inverse matrix.
     * @param {(Float32Array|Array.<number>)} out-the identity matrix.
     * @param {(Float32Array|Array.<number>)} a-matrix.
     * @returns {(Float32Array|Array.<number>)} Result matrix.
     */
    invert(out, a) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        var det = aa * ad-ab * ac;
        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty-ad * atx) * det;
        out[5] = (ab * atx-aa * aty) * det;
        return out;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Matrix.prototype.mulVector
      * @description Matrix left multiplied by vector.
      * @param {(Float32Array|Array.<number>)} out-the identity matrix.
      * @param {(Float32Array|Array.<number>)} a-matrix.
      * @param {(Float32Array|Array.<number>)} v-scaling parameter.
      * @returns {(Float32Array|Array.<number>)} Result matrix.
      */
     mulVector(out, a, v) {
        var aa = a[0];
        var ac = a[2];
        var atx = a[4];
        var ab = a[1];
        var ad = a[3];
        var aty = a[5];

        out[0] = v[0] * aa + v[1] * ac + atx;
        out[1] = v[0] * ab + v[1] * ad + aty;

        return out;
    }

}