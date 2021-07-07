import { Vector } from './Vector';

export class Curve {

    constructor() {
        
        this.vector = new Vector();

        this.EPSILON = 1e-4;

        
        this.THREE_SQRT = Math.sqrt(3);

      
        this.ONE_THIRD = 1 / 3;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Curve";
    }

    isAroundZero(val) {
        return val > -this.EPSILON && val < this.EPSILON;
    }

    isNotAroundZero(val) {
        return val > this.EPSILON || val < -this.EPSILON;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicAt
     * @description calculates the three-time Bezier value
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} p3-point p3.
     * @param {number} t-t value.
     * @returns {number} Cubic Bezier value.
     */
     cubicAt(p0, p1, p2, p3, t) {
        var onet = 1-t;
        return onet * onet * (onet * p0 + 3 * t * p1) +
            t * t * (t * p3 + 3 * onet * p2);
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicDerivativeAt
     * @description calculates the value of the cubic Bessel derivative
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} p3-point p3.
     * @param {number} t-t value.
     * @returns {number} The value of the cubic Bessel derivative.
     */
    cubicDerivativeAt(p0, p1, p2, p3, t) {
        var onet = 1-t;
        return 3 * (
            ((p1-p0) * onet + 2 * (p2-p1) * t) * onet +
            (p3-p2) * t * t
        );
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicRootAt
     * @description Calculate the roots of cubic Bessel equation, using Shengjin formula
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} p3-point p3.
     * @param {number} val-value.
     * @param {Array.<number>} roots-the number of effective roots.
     * @returns {number} valid root.
     */
    cubicRootAt(p0, p1, p2, p3, val, roots) {
        // Evaluate roots of cubic functions
        var a = p3 + 3 * (p1-p2)-p0;
        var b = 3 * (p2-p1 * 2 + p0);
        var c = 3 * (p1-p0);
        var d = p0-val;

        var A = b * b-3 * a * c;
        var B = b * c-9 * a * d;
        var C = c * c-3 * b * d;

        var n = 0;

        if (this.isAroundZero(A) && this.isAroundZero(B)) {
            if (this.isAroundZero(b)) {
                roots[0] = 0;
            } else {
                let t1 = -c / b; //t1, t2, t3, b is not zero
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = B * B-4 * A * C;

            if (this.isAroundZero(disc)) {
                var K = B / A;
                let t1 = -b / a + K; // t1, a is not zero
                let t2 = -K / 2; // t2, t3
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            } else if (disc> 0) {
                let discSqrt = Math.sqrt(disc);
                let Y1 = A * b + 1.5 * a * (-B + discSqrt);
                let Y2 = A * b + 1.5 * a * (-B-discSqrt);
                if (Y1 <0) {
                    Y1 = -Math.pow(-Y1, this.ONE_THIRD);
                } else {
                    Y1 = Math.pow(Y1, this.ONE_THIRD);
                }
                if (Y2 <0) {
                    Y2 = -Math.pow(-Y2, this.ONE_THIRD);
                } else {
                    Y2 = Math.pow(Y2, this.ONE_THIRD);
                }
                let t1 = (-b-(Y1 + Y2)) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else {
                var T = (2 * A * b-3 * a * B) / (2 * Math.sqrt(A * A * A));
                var theta = Math.acos(T) / 3;
                var ASqrt = Math.sqrt(A);
                var tmp = Math.cos(theta);

                let t1 = (-b-2 * ASqrt * tmp) / (3 * a);
                let t2 = (-b + ASqrt * (tmp + this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                let t3 = (-b + ASqrt * (tmp-this.THREE_SQRT * Math.sin(theta))) / (3 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
                if (t3 >= 0 && t3 <= 1) {
                    roots[n++] = t3;
                }
            }
        }
        return n;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicRootAt
     * @description Calculate the position of the limit value of the cubic Bessel equation
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} p3-point p3.
     * @param {Array.<number>} extrema-value.
     * @returns {number} valid number.
     */
    cubicExtrema(p0, p1, p2, p3, extrema) {
        var b = 6 * p2-12 * p1 + 6 * p0;
        var a = 9 * p1 + 3 * p3-3 * p0-9 * p2;
        var c = 3 * p1-3 * p0;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                let t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
            }
        } else {
            var disc = b * b-4 * a * c;
            if (this.isAroundZero(disc)) {
                extrema[0] = -b / (2 * a);
            } else if (disc> 0) {
                let discSqrt = Math.sqrt(disc);
                let t1= (-b + discSqrt) / (2 * a);
                let t2 = (-b-discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    extrema[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    extrema[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicSubdivide
     * @description subdivided cubic Bézier curve
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} p3-point p3.
     * @param {number} t-t value.
     * @param {Array.<number>} out-projection point.
     * @returns {number} projection point.
     */
    cubicSubdivide(p0, p1, p2, p3, t, out) {
        var p01 = (p1-p0) * t + p0;
        var p12 = (p2-p1) * t + p1;
        var p23 = (p3-p2) * t + p2;

        var p012 = (p12-p01) * t + p01;
        var p123 = (p23-p12) * t + p12;

        var p0123 = (p123-p012) * t + p012;
        // Seg0
        out[0] = p0;
        out[1] = p01;
        out[2] = p012;
        out[3] = p0123;
        // Seg1
        out[4] = p0123;
        out[5] = p123;
        out[6] = p23;
        out[7] = p3;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.cubicProjectPoint
     * @description Project the point onto the cubic Bezier curve and return the projection distance. There may be one or more projection points, and only the one with the shortest distance is returned here.
     * @param {number} x0-the abscissa of point p0.
     * @param {number} y0-the ordinate of point p0.
     * @param {number} x1-the abscissa of point p1.
     * @param {number} y1-the ordinate of point p1.
     * @param {number} x2-the abscissa of point p2.
     * @param {number} y2-the ordinate of point p2.
     * @param {number} x3-the abscissa of point p3.
     * @param {number} y3-the ordinate of point p3.
     * @param {number} x-the abscissa of point p.
     * @param {number} y-the vertical coordinate of point p.
     * @param {Array.<number>} out-projection point.
     * @returns {number} projection point.
     */
    cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
        // Temporary variables
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();
        // var _v3 = vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // first roughly estimate the t value of the smallest possible distance
        // PENDING
        for (let _t = 0; _t <1; _t += 0.05) {
            _v1[0] = this.cubicAt(x0, x1, x2, x3, _t);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 <d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i <32; i++) {
            if (interval <this.EPSILON) {
                break;
            }
            let prev = t-interval;
            let next = t + interval;
            // t-interval
            _v1[0] = this.cubicAt(x0, x1, x2, x3, prev);
            _v1[1] = this.cubicAt(y0, y1, y2, y3, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 <d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.cubicAt(x0, x1, x2, x3, next);
                _v2[1] = this.cubicAt(y0, y1, y2, y3, next);
                let d2 = this.vector.distSquare(_v2, _v0);

                if (next <= 1 && d2 <d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.cubicAt(x0, x1, x2, x3, t);
            out[1] = this.cubicAt(y0, y1, y2, y3, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.quadraticAt
     * @description Calculates the quadratic Bessel value.
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} t-t value.
     * @returns {number} Quadratic Bessel value.
     */
    quadraticAt(p0, p1, p2, t) {
        var onet = 1-t;
        return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.quadraticAt
     * @description Calculate the value of the quadratic Bessel derivative.
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} t-t value.
     * @returns {number} Quadratic Bessel derivative value.
     */
    quadraticDerivativeAt(p0, p1, p2, t) {
        return 2 * ((1-t) * (p1-p0) + t * (p2-p1));
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.quadraticRootAt
     * @description Calculate the root of the quadratic Bessel equation
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @param {number} val-value.
     * @param {Array.<number>} roots-the number of effective roots.
     * @returns {number} The number of effective roots.
     */
    quadraticRootAt(p0, p1, p2, val, roots) {
        var a = p0-2 * p1 + p2;
        var b = 2 * (p1-p0);
        var c = p0-val;

        var n = 0;
        if (this.isAroundZero(a)) {
            if (this.isNotAroundZero(b)) {
                var t1 = -c / b;
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            }
        } else {
            var disc = b * b-4 * a * c;
            if (this.isAroundZero(disc)) {
                let t1 = -b / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
            } else if (disc> 0) {
                let discSqrt = Math.sqrt(disc);
                let t1 = (-b + discSqrt) / (2 * a);
                let t2 = (-b-discSqrt) / (2 * a);
                if (t1 >= 0 && t1 <= 1) {
                    roots[n++] = t1;
                }
                if (t2 >= 0 && t2 <= 1) {
                    roots[n++] = t2;
                }
            }
        }
        return n;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.quadraticExtremum
     * @description Calculate the limit value of the quadratic Bessel equation
     * @param {number} p0-point p0.
     * @param {number} p1-point p1.
     * @param {number} p2-point p2.
     * @returns {number} The limit value of the quadratic Bessel equation.
     */
    quadraticExtremum(p0, p1, p2) {
        var divider = p0 + p2-2 * p1;
        if (divider === 0) {
            // p1 is center of p0 and p2
            return 0.5;
        } else {
            return (p0-p1) / divider;
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Curve.prototype.quadraticProjectPoint
     * @description Project the point onto the quadratic Bezier curve and return the projection distance. There may be one or more projection points, and only the one with the shortest distance is returned here.
     * @param {number} x0-the abscissa of point p0.
     * @param {number} y0-the ordinate of point p0.
     * @param {number} x1-the abscissa of point p1.
     * @param {number} y1-the ordinate of point p1.
     * @param {number} x2-the abscissa of point p2.
     * @param {number} y2-the ordinate of point p2.
     * @param {number} x-the abscissa of point p.
     * @param {number} y-the vertical coordinate of point p.
     * @param {Array.<number>} out-projection point.
     * @returns {number} Projection distance.
     */
    quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
        // Temporary variables
        var _v0 = this.vector.create();
        var _v1 = this.vector.create();
        var _v2 = this.vector.create();

        // http://pomax.github.io/bezierinfo/#projections
        var t;
        var interval = 0.005;
        var d = Infinity;

        _v0[0] = x;
        _v0[1] = y;

        // first roughly estimate the t value of the smallest possible distance
        // PENDING
        for (let _t = 0; _t <1; _t += 0.05) {
            _v1[0] = this.quadraticAt(x0, x1, x2, _t);
            _v1[1] = this.quadraticAt(y0, y1, y2, _t);
            let d1 = this.vector.distSquare(_v0, _v1);
            if (d1 <d) {
                t = _t;
                d = d1;
            }
        }
        d = Infinity;

        // At most 32 iteration
        for (let i = 0; i <32; i++) {
            if (interval <this.EPSILON) {
                break;
            }
            let prev = t-interval;
            let next = t + interval;
            // t-interval
            _v1[0] = this.quadraticAt(x0, x1, x2, prev);
            _v1[1] = this.quadraticAt(y0, y1, y2, prev);

            let d1 = this.vector.distSquare(_v1, _v0);

            if (prev >= 0 && d1 <d) {
                t = prev;
                d = d1;
            } else {
                // t + interval
                _v2[0] = this.quadraticAt(x0, x1, x2, next);
                _v2[1] = this.quadraticAt(y0, y1, y2, next);
                let d2 = this.vector.distSquare(_v2, _v0);
                if (next <= 1 && d2 <d) {
                    t = next;
                    d = d2;
                } else {
                    interval *= 0.5;
                }
            }
        }
        // t
        if (out) {
            out[0] = this.quadraticAt(x0, x1, x2, t);
            out[1] = this.quadraticAt(y0, y1, y2, t);
        }
        // console.log(interval, i);
        return Math.sqrt(d);
    }
}