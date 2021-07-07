import { Shape } from './Shape';
import { SmicPolygon } from './SmicPolygon';
import { SUtil } from './SUtil';

export class SmicBrokenLine extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.style
     * @description drawing style.
     *
     * @param {Array} pointList-node array, two-dimensional array. Default value: null, parameter is required. Its form is as follows:
     * (code)
     * (start code)
     * [
     * [10, 20], //Single node
     * [30, 40],
     * [25, 30]
     *]
     * (end)
     * @param {string} smooth-Whether to do smooth interpolation, the smoothing algorithm can be "bezier", "spline". Defaults:"";
     * @param {number} smoothConstraint-smoothing constraint.
     * @param {string} strokeColor-stroke color. Default value: "#000000'".
     * @param {string} lineCape-line cap style. Possible settings: "butt", "round", "square". Default value: "butt".
     * @param {number} lineWidth-stroke width. Default value: 1.
     * @param {number} opacity-draw transparency. Default value: 1.
     * @param {number} shadowBlur-shadow blur degree, greater than 0 is valid. Default value: 0.
     * @param {number} shadowColor-the color of the shadow. Default value: "#000000'".
     * @param {number} shadowOffsetX-the horizontal offset of the shadow. Default value: 0.
     * @param {number} shadowOffsetY-The shadow offset in the vertical direction. Default value: 0.
     * @param {string} text-additional text in the graphic. Defaults:"".
     * @param {string} textColor-text color. Default value: "#000000'".
     * @param {string} textFont-additional text style. Example:'bold 18px verdana'.
     * @param {string} textPosition-additional text position. Possible settings: "inside", "left", "right", top", "bottom", "end". Default value: "end".
     * @param {string} textAlign-The horizontal alignment of the additional text. Possible values: "start", "end", "left", "right", "center". By default, it is automatically set according to textPosition.
     * @param {string} textBaseline-The additional text is aligned vertically. Possible settings: "top", "bottom", "middle", "alphabetic", "hanging", "ideographic". By default, it is automatically set according to textPosition.
     */
    //Open the interface style

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicBrokenLine.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.brushTypeOnly
         * @description Lines can only be stroked.
         */
        this.brushTypeOnly ='stroke';

        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.textPosition
         * @description text position.
         */
        this.textPosition ='end';

        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.type
         * @description Graphic type.
         */
        this.type ='smicbroken-line';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicBrokenLine";
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.brushTypeOnly = null;
        this.textPosition = null;
        this.type = null;

        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.buildPath
     * @description creates a polyline path.
     *
     * @param {CanvasRenderingContext2D} ctx-Context2D context.
     * @param {Object} style-style.
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var __OP = this.refOriginalPosition;

        var pointList = style.pointList;
        if (pointList.length <2) {
            // Don't draw less than 2 points~
            return;
        }

        var len = Math.min(style.pointList.length, Math.round(style.pointListLength || style.pointList.length));

        if (style.smooth && style.smooth !=='spline') {
            var controlPoints = SUtil.SUtil_smoothBezier(pointList, style.smooth, false, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            for (let i = 0; i <len-1; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[i + 1][0] + __OP[0], pointList[i + 1][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth ==='spline') {
                pointList = SUtil.SUtil_smoothSpline(pointList, null, null, __OP);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType ==='solid') {
                // The default is a solid line
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i <len; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
            } else if (style.lineType ==='dashed' ||
                style.lineType ==='dotted' ||
                style.lineType ==='dot' ||
                style.lineType ==='dash' ||
                style.lineType ==='longdash'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;

                //dashed
                if (style.lineType ==='dashed') {
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //dotted
                if (style.lineType ==='dotted') {
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dot
                if (style.lineType ==='dot') {
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dash
                if (style.lineType ==='dash') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //longdash
                if (style.lineType ==='longdash') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i <len; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i-1][0] + __OP[0], pointList[i-1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength, [pattern1, pattern2]
                    );
                }
            } else if (style.lineType ==='dashdot' ||
                style.lineType ==='longdashdot'
            ) {
                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;
                let pattern3 = dashLength;
                let pattern4 = dashLength;

                //dashdot
                if (style.lineType ==='dashdot') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                //longdashdot
                if (style.lineType ==='longdashdot') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                dashLength = (style.lineWidth || 1) *
                    (style.lineType ==='dashed'? 5: 1);
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i <len; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i-1][0] + __OP[0], pointList[i-1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength, [pattern1, pattern2, pattern3, pattern4]
                    );
                }
            }

        }
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicBrokenLine.prototype.getRect
     * @description The calculation returns the bounding box rectangle of the polyline. The bounding box is calculated directly from the four control points, not the minimum bounding box.
     *
     * @param {Object} style-style
     * @return {Object} Border object. Contains attributes: x, y, width, height.
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;
        return SmicPolygon.prototype.getRect.apply(this, [style, __OP]);
    }

}