import { Util } from './Util';
import { Curve } from './Curve';

export class Area {

   /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.constructor
     * @description Constructor.
     */
    constructor() {
        /**
         * @member {Ekmap.LevelRenderer.Tool.Util} Ekmap.LevelRenderer.Tool.Areal.prototype.util
         * @description basic tool object.
         */
        this.util = new Util();

        /**
         * @member {Ekmap.LevelRenderer.Tool.Curve} Ekmap.LevelRenderer.Tool.Areal.prototype.curve
         * @description curve tool object
         */
        this.curve = new Curve();

        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Areal.prototype._ctx
         * @description Cavans2D rendering context
         */
        this._ctx = null;

        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Areal.prototype._textWidthCache
         * @description text width cache
         */
        this._textWidthCache = {};

        /**
         * @member {Object} Ekmap.LevelRenderer.Tool.Areal.prototype._textHeightCache
         * @description text height cache
         */
        this._textHeightCache = {};

        /**
         * @member {number} Ekmap.LevelRenderer.Tool.Areal.prototype._textWidthCacheCounter
         * @description text width cache number
         */
        this._textWidthCacheCounter = 0;

        /**
         * @member {number} Ekmap.LevelRenderer.Tool.Areal.prototype._textHeightCacheCounter
         * @description text height cache number
         */
        this._textHeightCacheCounter = 0;

        /**
         * @member {number} Ekmap.LevelRenderer.Tool.Areal.prototype.TEXT_CACHE_MAX
         * @description Maximum number of text buffers
         */
        this.TEXT_CACHE_MAX = 5000;

        /**
         * @member {number} Ekmap.LevelRenderer.Tool.Areal.prototype.PI2
         * @description 2*PI value
         */
        this.PI2 = Math.PI * 2;

        /**
         * @member {Array} Ekmap.LevelRenderer.Tool.Areal.prototype.roots
         * @description temporary array
         */
        this.roots = [-1, -1, -1];

        /**
         * @member {Array} Ekmap.LevelRenderer.Tool.Areal.prototype.extrema
         * @description temporary array
         */
        this.extrema = [-1, -1];

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Area";
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.normalizeRadian
     * @description Radian normalization function.
     * @param {number} angle-the radian value.
     * @returns {number} The normalized radian value.
     */
    normalizeRadian(angle) {
        angle %= this.PI2;
        if (angle < 0) {
            angle += this.PI2;
        }
        return angle;
    }

    /**
      * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInside
      * @description contains judgment.
      * @param {Object} shape-shape.
      * @param {number} area-target area.
      * @param {number} x-the abscissa.
      * @param {number} y-the ordinate.
      * @returns {boolean} Whether the graphic includes the mouse position.
      */
    isInside(shape, area, x, y) {
        if (!area || !shape) {
            return false;
        }
        var zoneType = shape.type;

        this._ctx = this._ctx || this.util.getContext();

        var _mathReturn = this._mathMethod(shape, area, x, y);
        if (typeof _mathReturn != 'undefined') {
            return _mathReturn;
        }

        if (shape.buildPath && this._ctx.isPointInPath) {
            return this._buildPathMethod(shape, this._ctx, area, x, y);
        }

        switch (zoneType) {
            case 'ellipse':
            case 'smicellipse':
                return true;
            case 'trochoid':
                var _r = area.location == 'out' ?
                    area.r1 + area.r2 + area.d :
                    area.r1 - area.r2 + area.d;
                return this.isInsideCircle(area, x, y, _r);
            case 'rose':
                return this.isInsideCircle(area, x, y, area.maxr);
            default:
                return false; 
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype._mathMethod
     * @description contains judgment. Judging by mathematical methods, the three methods are the fastest, but the supported shapes are few.
     * @param {Object} shape-shape.
     * @param {number} area-target area.
     * @param {number} x-the abscissa.
     * @param {number} y-the ordinate.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
     _mathMethod(shape, area, x, y) {
        var zoneType = shape.type;
        // In the rectangle, some graphics need further judgment
        switch (zoneType) {
            // Bezier curve
            case'bezier-curve':
                if (typeof(area.cpX2) ==='undefined') {
                    return this.isInsideQuadraticStroke(
                        area.xStart, area.yStart,
                        area.cpX1, area.cpY1,
                        area.xEnd, area.yEnd,
                        area.lineWidth, x, y
                    );
                }
                return this.isInsideCubicStroke(
                    area.xStart, area.yStart,
                    area.cpX1, area.cpY1,
                    area.cpX2, area.cpY2,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
                // line
            case'line':
                return this.isInsideLine(
                    area.xStart, area.yStart,
                    area.xEnd, area.yEnd,
                    area.lineWidth, x, y
                );
                // Polyline
            case'broken-line':
                return this.isInsideBrokenLine(
                    area.pointList, area.lineWidth, x, y
                );
                // Expand polyline
            case'smicbroken-line':
                {
                    // SMIC-modify-start
                    let icX = x;
                    let icY = y;
                    if (shape.refOriginalPosition) {
                        icX = x-shape.refOriginalPosition[0];
                        icY = y-shape.refOriginalPosition[1];
                    }
                    return this.isInsideBrokenLine(
                        area.pointList, area.lineWidth, icX, icY
                    );
                }
                //Initial code:
                // return isInsideBrokenLine(
                // area.pointList, area.lineWidth, x, y
                // );
                // SMIC-modify-end
                // ring
            case'ring':
                return this.isInsideRing(
                    area.x, area.y, area.r0, area.r, x, y
                );
            case'smicring':
                {
                    let areaX = area.x;
                    let areaY = area.y;
                    if (shape.refOriginalPosition) {
                        areaX = area.x + shape.refOriginalPosition[0];
                        areaY = area.y + shape.refOriginalPosition[1];
                    }
                    return this.isInsideRing(
                        areaX, areaY, area.r0, area.r, x, y
                    );
                }
                // round
            case'circle':
                return this.isInsideCircle(
                    area.x, area.y, area.r, x, y
                );
                // extension-point
            case'smicpoint':
                {
                    // SMIC-modify-start
                    let icX = x;
                    let icY = y;
                    if (shape.refOriginalPosition) {
                        icX = x-shape.refOriginalPosition[0];
                        icY = y-shape.refOriginalPosition[1];
                    }
                    return this.isInsideCircle(
                        area.x, area.y, area.r, icX, icY
                    );
                }
                //Initial code:
                // None
                // SMIC-modify-end
                // sector
            case'sector':
                {
                    let startAngle = area.startAngle * Math.PI / 180;
                    let endAngle = area.endAngle * Math.PI / 180;
                    if (!area.clockWise) {
                        startAngle = -startAngle;
                        endAngle = -endAngle;
                    }
                    return this.isInsideSector(
                        area.x, area.y, area.r0, area.r,
                        startAngle, endAngle, !area.clockWise,
                        x, y
                    );
                }
                //Initial code:
                // None
                // SMIC-Increase-end
                // sector
            case'smicsector':
                {
                    let startAngle = area.startAngle * Math.PI / 180;
                    let endAngle = area.endAngle * Math.PI / 180;
                    if (!area.clockWise) {
                        startAngle = -startAngle;
                        endAngle = -endAngle;
                    }

                    let areaX = area.x;
                    let areaY = area.y;
                    if (shape.refOriginalPosition) {
                        areaX = area.x + shape.refOriginalPosition[0];
                        areaY = area.y + shape.refOriginalPosition[1];
                    }

                    return this.isInsideSector(
                        areaX, areaY, area.r0, area.r,
                        startAngle, endAngle, !area.clockWise,
                        x, y
                    );
                }
                // Polygon
            case'path':
                return this.isInsidePath(
                    area.pathArray, Math.max(area.lineWidth, 5),
                    area.brushType, x, y
                );
            case'polygon':
            case'star':
            case'smicstar':
            case'isogon':
            case'smicisogon':
                return this.isInsidePolygon(area.pointList, x, y);
                // extended polygon
            case'smicpolygon':
                {
                    // SMIC-modify-start
                    let icX = x;
                    let icY = y;
                    if (shape.refOriginalPosition) {
                        icX = x-shape.refOriginalPosition[0];
                        icY = y-shape.refOriginalPosition[1];
                    }

                    //Island cave noodles
                    if (shape.holePolygonPointLists && shape.holePolygonPointLists.length> 0) {
                        var isOnBase = this.isInsidePolygon(area.pointList, icX, icY);

                        // Traverse the island cave face
                        var holePLS = shape.holePolygonPointLists;
                        var isOnHole = false;
                        for (var i = 0, holePLSen = holePLS.length; i <holePLSen; i++) {
                            var holePL = holePLS[i];
                            var isOnSubHole = this.isInsidePolygon(holePL, icX, icY);
                            if (isOnSubHole === true) {
                                isOnHole = true;
                            }
                        }

                        // Capture judgment
                        return isOnBase === true && isOnHole === false;
                    } else {
                        return this.isInsidePolygon(area.pointList, icX, icY);
                    }
                }
                // Initial code:
                // None
                // SMIC-modify-end
                // text
            case'text':
                var rect = area.__rect || shape.getRect(area);
                return this.isInsideRect(
                    rect.x, rect.y, rect.width, rect.height, x, y
                );
                // extended text
            case'smictext':
                //Use the text background rectangle to judge
                var textBg = shape.getTextBackground(area);
                return this.isInsidePolygon(textBg, x, y);
                //Initial code:
                // None
                // SMIC-modify-end
                // rectangle
            case'rectangle':
            case'image':
                // Picture
                return this.isInsideRect(
                    area.x, area.y, area.width, area.height, x, y
                );
            case'smicimage':
                {
                    let areaX = area.x;
                    let areaY = area.y;
                    if (shape.refOriginalPosition) {
                        areaX = area.x + shape.refOriginalPosition[0];
                        areaY = area.y + shape.refOriginalPosition[1];
                    }
                    return this.isInsideRect(
                        areaX, areaY, area.width, area.height, x, y
                    );
                }
                //// Extended rectangle
                //case'smicpolygon':
                // // SMIC-modify-start
                // var icX = x;
                // var icY = y;
                // if(shape.refOriginalPosition) {
                // icX = x-shape.refOriginalPosition[0];
                // icY = y-shape.refOriginalPosition[1];
                //}
                // return this.isInsideRect(
                // area.x, area.y, area.width, area.height, icX, icY
                // );
                //Initial code:
                // None
                // SMIC-modify-end
        }
    }

   /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype._buildPathMethod
     * @description contains judgment. Judging by the buildPath method, the three methods are faster, but the shape of the line type is not supported.
     * @param {Object} shape-shape.
     * @param {Object} context-context.
     * @param {number} area-target area.
     * @param {number} x-the abscissa.
     * @param {number} y-the ordinate.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    _buildPathMethod(shape, context, area, x, y) {
        // The implementation path of the graphics class creates the path of the class
        context.beginPath();
        shape.buildPath(context, area);
        context.closePath();
        return context.isPointInPath(x, y);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isOutside
     * @description Whether the graphic does not include the mouse position.
     * @param {Object} shape-shape.
     * @param {number} area-target area.
     * @param {number} x-the abscissa.
     * @param {number} y-the ordinate.
     * @returns {boolean} Whether the graphic does not include the mouse position, true means the coordinates are outside the graphic.
     */
    isOutside(shape, area, x, y) {
        return !this.isInside(shape, area, x, y);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideLine
     * @description The line segment contains judgment.
     * @param {number} x0-the abscissa of the starting point of the line.
     * @param {number} y0-the ordinate of the starting point of the line.
     * @param {number} x1-the abscissa of the end point of the line.
     * @param {number} y1-the ordinate of the end of the line.
     * @param {number} lineWidth-line width.
     * @param {number} x-the abscissa of the mouse position.
     * @param {number} y-the ordinate of the mouse position.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideLine(x0, y0, x1, y1, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        var _a = 0;
        var _b = 0;
        // Quick reject
        if (
            (y> y0 + _l && y> y1 + _l) ||
            (y <y0-_l && y <y1-_l) ||
            (x> x0 + _l && x> x1 + _l) ||
            (x <x0-_l && x <x1-_l)
        ) {
            return false;
        }

        if (x0 !== x1) {
            _a = (y0-y1) / (x0-x1);
            _b = (x0 * y1-x1 * y0) / (x0-x1);
        } else {
            return Math.abs(x-x0) <= _l / 2;
        }
        var tmp = _a * x-y + _b;
        var _s = tmp * tmp / (_a * _a + 1);
        return _s <= _l / 2 * _l / 2;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideCubicStroke
     * @description The stroke of the cubic Bezier curve contains judgment.
     * @param {number} x0-the abscissa of point 1.
     * @param {number} y0-the ordinate of point 1.
     * @param {number} x1-The abscissa of point 2.
     * @param {number} y1-the ordinate of point 2.
     * @param {number} x2-The ordinate of point 3.
     * @param {number} y2-the ordinate of point 3.
     * @param {number} lineWidth-line width.
     * @param {number} x-the abscissa of the mouse position.
     * @param {number} y-the ordinate of the mouse position.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideCubicStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y> y0 + _l && y> y1 + _l && y> y2 + _l && y> y3 + _l) ||
            (y <y0-_l && y <y1-_l && y <y2-_l && y <y3-_l) ||
            (x> x0 + _l && x> x1 + _l && x> x2 + _l && x> x3 + _l) ||
            (x <x0-_l && x <x1-_l && x <x2-_l && x <x3-_l)
        ) {
            return false;
        }
        var d = this.curve.cubicProjectPoint(
            x0, y0, x1, y1, x2, y2, x3, y3,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideQuadraticStroke
     * @description The stroke of the quadratic Bezier curve contains judgment.
     * @param {number} x0-the abscissa of point 1.
     * @param {number} y0-the ordinate of point 1.
     * @param {number} x1-The abscissa of point 2.
     * @param {number} y1-the ordinate of point 2.
     * @param {number} x2-The ordinate of point 3.
     * @param {number} y2-the ordinate of point 3.
     * @param {number} lineWidth-line width.
     * @param {number} x-the abscissa of the mouse position.
     * @param {number} y-the ordinate of the mouse position.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideQuadraticStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);
        // Quick reject
        if (
            (y> y0 + _l && y> y1 + _l && y> y2 + _l) ||
            (y <y0-_l && y <y1-_l && y <y2-_l) ||
            (x> x0 + _l && x> x1 + _l && x> x2 + _l) ||
            (x <x0-_l && x <x1-_l && x <x2-_l)
        ) {
            return false;
        }
        var d = this.curve.quadraticProjectPoint(
            x0, y0, x1, y1, x2, y2,
            x, y, null
        );
        return d <= _l / 2;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideArcStroke
     * @description The arc stroke contains judgment.
     * @param {number} cx-the abscissa of the center of the circle.
     * @param {number} cy-the ordinate of the center of the circle.
     * @param {number} r-the radius of the circle.
     * @param {number} startAngle-the starting angle.
     * @param {number} endAngle-end angle.
     * @param {number} anticlockwise-clockwise or anticlockwise.
     * @param {number} lineWidth-line width.
     * @param {number} x-The abscissa of the mouse position.
     * @param {number} y-the ordinate of the mouse position.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideArcStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
        var PI2 = this.PI2;

        if (lineWidth === 0) {
            return false;
        }
        var _l = Math.max(lineWidth, 5);

        x -= cx;
        y -= cy;
        var d = Math.sqrt(x * x + y * y);
        if ((d-_l> r) || (d + _l <r)) {
            return false;
        }
        if (Math.abs(startAngle-endAngle) >= PI2) {
            // Is a circle
            return true;
        }
        if (anticlockwise) {
            var tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle> endAngle) {
            endAngle += PI2;
        }

        var angle = Math.atan2(y, x);
        if (angle <0) {
            angle += PI2;
        }
        return (angle >= startAngle && angle <= endAngle) ||
            (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideBrokenLine
     * @description Whether the BrokenLine graphic contains the mouse position, true means the coordinates are in the graphic.
     * @param {Array} points-the curve point object.
     * @param {number} lineWidth-line width.
     * @param {number} x-the abscissa of the mouse position.
     * @param {number} y-the ordinate of the mouse position.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideBrokenLine(points, lineWidth, x, y) {
        var _lineWidth = Math.max(lineWidth, 10);
        for (var i = 0, l = points.length-1; i <l; i++) {
            var x0 = points[i][0];
            var y0 = points[i][1];
            var x1 = points[i + 1][0];
            var y1 = points[i + 1][1];

            if (this.isInsideLine(x0, y0, x1, y1, _lineWidth, x, y)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideRing
     * @description Whether the graphic Ring contains the mouse position, true means the coordinates are in the graphic.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideRing(cx, cy, r0, r, x, y) {
        var d = (x-cx) * (x-cx) + (y-cy) * (y-cy);
        return (d <r * r) && (d> r0 * r0);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideRect
     * @description Whether the graphic Rect includes the mouse position, true means the coordinates are in the graphic.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideRect(x0, y0, width, height, x, y) {
        return x >= x0 && x <= (x0 + width) && y >= y0 && y <= (y0 + height);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideCircle
     * @description Whether the graphic Circle contains the mouse position, true means the coordinates are in the graphic.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideCircle(x0, y0, r, x, y) {
        return (x-x0) * (x-x0) + (y-y0) * (y-y0) <r * r;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsideSector
     * @description Whether the graphic sector contains the mouse position, true means the coordinates are in the graphic.
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsideSector(cx, cy, r0, r, startAngle, endAngle, anticlockwise, x, y) {
        return this.isInsideArcStroke(cx, cy, (r0 + r) / 2, startAngle, endAngle, anticlockwise, r-r0, x, y);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsidePolygon
     * @description Whether the graphic Polygon contains the mouse position, true means the coordinates are in the graphic. Use non-zero winding rule like canvas
     * @returns {boolean} Whether the graphic contains the mouse position, true means the coordinates are in the graphic.
     */
    isInsidePolygon(points, x, y) {
        var N = points.length;
        var w = 0;

        for (var i = 0, j = N-1; i <N; i++) {
            var x0 = points[j][0];
            var y0 = points[j][1];
            var x1 = points[i][0];
            var y1 = points[i][1];
            w += this.windingLine(x0, y0, x1, y1, x, y);
            j = i;
        }
        return w !== 0;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.windingLine
     */
    windingLine(x0, y0, x1, y1, x, y) {
        if ((y> y0 && y> y1) || (y <y0 && y <y1)) {
            return 0;
        }
        if (y1 == y0) {
            return 0;
        }
        var dir = y1 <y0? 1: -1;
        var t = (y-y0) / (y1-y0);
        var x_ = t * (x1-x0) + x0;

        return x_> x? dir: 0;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.swapExtrema
     */
    swapExtrema() {
        var tmp = this.extrema[0];
        this.extrema[0] = this.extrema[1];
        this.extrema[1] = tmp;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.windingCubic
     */
    windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
        var curve = this.curve;
        var roots = this.roots;
        var extrema = this.extrema;

        // Quick reject
        if (
            (y> y0 && y>y1 && y> y2 && y> y3) ||
            (y <y0 && y <y1 && y <y2 && y <y3)
        ) {
            return 0;
        }
        var nRoots = curve.cubicRootAt(y0, y1, y2, y3, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var w = 0;
            var nExtrema = -1;
            var y0_, y1_;
            for (var i = 0; i <nRoots; i++) {
                var t = roots[i];
                var x_ = curve.cubicAt(x0, x1, x2, x3, t);
                if (x_ <x) {// Quick reject
                    continue;
                }
                if (nExtrema <0) {
                    nExtrema = curve.cubicExtrema(y0, y1, y2, y3, extrema);
                    if (extrema[1] <extrema[0] && nExtrema> 1) {
                        this.swapExtrema();
                    }
                    y0_ = curve.cubicAt(y0, y1, y2, y3, extrema[0]);
                    if (nExtrema> 1) {
                        y1_ = curve.cubicAt(y0, y1, y2, y3, extrema[1]);
                    }
                }
                if (nExtrema == 2) {
                    // Divided into three monotonic functions
                    if (t <extrema[0]) {
                        w += y0_ <y0? 1: -1;
                    } else if (t <extrema[1]) {
                        w += y1_ <y0_? 1: -1;
                    } else {
                        w += y3 <y1_? 1: -1;
                    }
                } else {
                    // Divide into two monotonic functions
                    if (t <extrema[0]) {
                        w += y0_ <y0? 1: -1;
                    } else {
                        w += y3 <y0_? 1: -1;
                    }
                }
            }
            return w;
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.windingQuadratic
     */
    windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
        var curve = this.curve;
        var roots = this.roots;

        // Quick reject
        if (
            (y> y0 && y> y1 && y> y2) ||
            (y <y0 && y <y1 && y <y2)
        ) {
            return 0;
        }
        var nRoots = curve.quadraticRootAt(y0, y1, y2, y, roots);
        if (nRoots === 0) {
            return 0;
        } else {
            var t = curve.quadraticExtremum(y0, y1, y2);
            if (t >= 0 && t <= 1) {
                var w = 0;
                var y_ = curve.quadraticAt(y0, y1, y2, t);
                for (let i = 0; i <nRoots; i++) {
                    let x_ = curve.quadraticAt(x0, x1, x2, roots[i]);
                    if (x_> x) {
                        continue;
                    }
                    if (roots[i] <t) {
                        w += y_ <y0? 1: -1;
                    } else {
                        w += y2 <y_? 1: -1;
                    }
                }
                return w;
            } else {
                let x_ = curve.quadraticAt(x0, x1, x2, roots[0]);
                if (x_> x) {
                    return 0;
                }
                return y2 <y0? 1: -1;
            }
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.windingArc
     * // TODO Arc rotation
     */
    windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
        var roots = this.roots;
        var PI2 = this.PI2;

        y -= cy;
        if (y> r || y <-r) {
            return 0;
        }
        let tmp = Math.sqrt(r * r-y * y);
        roots[0] = -tmp;
        roots[1] = tmp;

        if (Math.abs(startAngle-endAngle) >= PI2) {
            // Is a circle
            startAngle = 0;
            endAngle = PI2;
            var dir = anticlockwise? 1: -1;
            if (x >= roots[0] + cx && x <= roots[1] + cx) {
                return dir;
            } else {
                return 0;
            }
        }

        if (anticlockwise) {
            let tmp = startAngle;
            startAngle = this.normalizeRadian(endAngle);
            endAngle = this.normalizeRadian(tmp);
        } else {
            startAngle = this.normalizeRadian(startAngle);
            endAngle = this.normalizeRadian(endAngle);
        }
        if (startAngle> endAngle) {
            endAngle += PI2;
        }

        var w = 0;
        for (let i = 0; i <2; i++) {
            var x_ = roots[i];
            if (x_ + cx> x) {
                let angle = Math.atan2(y, x_);
                let dir = anticlockwise? 1: -1;
                if (angle <0) {
                    angle = PI2 + angle;
                }
                if (
                    (angle >= startAngle && angle <= endAngle) ||
                    (angle + PI2 >= startAngle && angle + PI2 <= endAngle)
                ) {
                    if (angle> Math.PI / 2 && angle <Math.PI * 1.5) {
                        dir = -dir;
                    }
                    w += dir;
                }
            }
        }
        return w;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.isInsidePath
     * @description uses the non-zero winding rule the same as canvas
     */
    isInsidePath(pathArray, lineWidth, brushType, x, y) {
        var w = 0;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        var beginSubpath = true;
        var firstCmd = true;

        brushType = brushType ||'fill';

        var hasStroke = brushType ==='stroke' || brushType ==='both';
        var hasFill = brushType ==='fill' || brushType ==='both';

        // var roots = [-1, -1, -1];
        for (var i = 0; i <pathArray.length; i++) {
            var seg = pathArray[i];
            var p = seg.points;
            // Begin a new subpath
            if (beginSubpath || seg.command ==='M') {
                if (i> 0) {
                    // Close previous subpath
                    if (hasFill) {
                        w += this.windingLine(xi, yi, x0, y0, x, y);
                    }
                    if (w !== 0) {
                        return true;
                    }
                }
                x0 = p[p.length-2];
                y0 = p[p.length-1];
                beginSubpath = false;
                if (firstCmd && seg.command !=='A') {
                    // If the first command is not M, it is lineTo, bezierCurveTo
                    // If you wait for the drawing command, it will start from the starting point of the drawing
                    // Arc will be processed separately later, so ignore it here
                    firstCmd = false;
                    xi = x0;
                    yi = y0;
                }
            }
            switch (seg.command) {
                case'M':
                    xi = p[0];
                    yi = p[1];
                    break;
                case'L':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, p[0], p[1], lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingLine(xi, yi, p[0], p[1], x, y);
                    }
                    xi = p[0];
                    yi = p[1];
                    break;
                case'C':
                    if (hasStroke) {
                        if (this.isInsideCubicStroke(
                                xi, yi, p[0], p[1], p[2], p[3], p[4], p[5],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingCubic(
                            xi, yi, p[0], p[1], p[2], p[3], p[4], p[5], x, y
                        );
                    }
                    xi = p[4];
                    yi = p[5];
                    break;
                case'Q':
                    if (hasStroke) {
                        if (this.isInsideQuadraticStroke(
                                xi, yi, p[0], p[1], p[2], p[3],
                                lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingQuadratic(
                            xi, yi, p[0], p[1], p[2], p[3], x, y
                        );
                    }
                    xi = p[2];
                    yi = p[3];
                    break;
                case'A':
                    // TODO Arc rotation
                    // The cost of TODO Arc judgment is relatively large
                    var cx = p[0];
                    var cy = p[1];
                    var rx = p[2];
                    var ry = p[3];
                    var theta = p[4];
                    var dTheta = p[5];
                    var x1 = Math.cos(theta) * rx + cx;
                    var y1 = Math.sin(theta) * ry + cy;
                    // not directly use the arc command
                    if (!firstCmd) {
                        w += this.windingLine(xi, yi, x1, y1);
                    } else {
                        firstCmd = false;
                        // The starting point of the first command has not been defined
                        x0 = x1;
                        y0 = y1;
                    }
                    // zr uses scale to simulate an ellipse, here is also a certain scaling of x
                    var _x = (x-cx) * ry / rx + cx;
                    if (hasStroke) {
                        if (this.isInsideArcStroke(
                                cx, cy, ry, theta, theta + dTheta, 1-p[7],
                                lineWidth, _x, y
                            )) {
                            return true;
                        }
                    }
                    if (hasFill) {
                        w += this.windingArc(
                            cx, cy, ry, theta, theta + dTheta, 1-p[7],
                            _x, y
                        );
                    }
                    xi = Math.cos(theta + dTheta) * rx + cx;
                    yi = Math.sin(theta + dTheta) * ry + cy;
                    break;
                case'z':
                    if (hasStroke) {
                        if (this.isInsideLine(
                                xi, yi, x0, y0, lineWidth, x, y
                            )) {
                            return true;
                        }
                    }
                    beginSubpath = true;
                    break;
            }
        }
        if (hasFill) {
            w += this.windingLine(xi, yi, x0, y0, x, y);
        }
        return w !== 0;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.getTextWidth
     * @description measures the width of multi-line text
     */
    getTextWidth(text, textFont) {
        var key = text +':' + textFont;
        if (this._textWidthCache[key]) {
            return this._textWidthCache[key];
        }
        this._ctx = this._ctx || this.util.getContext();
        this._ctx.save();

        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text +'').split('\n');
        var width = 0;
        for (var i = 0, l = text.length; i <l; i++) {
            width = Math.max(
                this._ctx.measureText(text[i]).width,
                width
            );
        }
        this._ctx.restore();

        this._textWidthCache[key] = width;
        if (++this._textWidthCacheCounter> this.TEXT_CACHE_MAX) {
            // memory release
            this._textWidthCacheCounter = 0;
            this._textWidthCache = {};
        }

        return width;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Areal.prototype.getTextHeight
     * @description measures the height of multi-line text
     */
    getTextHeight(text, textFont) {
        var key = text +':' + textFont;
        if (this._textHeightCache[key]) {
            return this._textHeightCache[key];
        }

        this._ctx = this._ctx || this.util.getContext();

        this._ctx.save();
        if (textFont) {
            this._ctx.font = textFont;
        }

        text = (text +'').split('\n');
        // Rough
        //var height = (this._ctx.measureText('国').width + 2) * text.length; //Packing does not support Chinese, replace it
        var height = (this._ctx.measureText('ZH').width + 2) * text.length;

        this._ctx.restore();

        this._textHeightCache[key] = height;
        if (++this._textHeightCacheCounter> this.TEXT_CACHE_MAX) {
            // memory release
            this._textHeightCacheCounter = 0;
            this._textHeightCache = {};
        }
        return height;
    }
}