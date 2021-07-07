import { Shape } from './Shape';
import { Util as CommonUtil } from '../../commontypes/Util';
import { SUtil } from './SUtil';

export class SmicPolygon extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.style
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
     * @param {string} style.smooth-Whether to do smooth interpolation, the smoothing algorithm can be "bezier", "spline". Defaults:"";
     * @param {number} style.smoothConstraint-smoothing constraint.
     * @param {string} style.brushType-brush type. Possible values: "fill", "stroke", "both". Default value: "fill".
     * @param {string} style.color-fill color. Default value: "#000000'".
     * @param {string} style.strokeColor-stroke color. Default value: "#000000'".
     * @param {string} style.lineCape-line cap style. Possible settings: "butt", "round", "square". Default value: "butt".
     * @param {number} style.lineWidth-stroke width. Default value: 1.
     * @param {number} style.opacity-drawing transparency. Default value: 1.
     * @param {number} style.shadowBlur-the blur degree of the shadow, greater than 0 is valid. Default value: 0.
     * @param {number} style.shadowColor-shadow color. Default value: "#000000'".
     * @param {number} style.shadowOffsetX-the horizontal offset of the shadow. Default value: 0.
     * @param {number} style.shadowOffsetY-the vertical offset of the shadow. Default value: 0.
     * @param {string} style.text-additional text in the graphic. Defaults:"".
     * @param {string} style.textColor-text color. Default value: "#000000'".
     * @param {string} style.textFont-additional text style. Example:'bold 18px verdana'.
     * @param {string} style.textPosition-additional text position. Possible settings: "inside", "left", "right", top", "bottom", "end". Default value: "end".
     * @param {string} style.textAlign-horizontal alignment of additional text. Possible values: "start", "end", "left", "right", "center". By default, it is automatically set according to textPosition.
     * @param {string} style.textBaseline-The additional text is aligned vertically. Possible settings: "top", "bottom", "middle", "alphabetic", "hanging", "ideographic". By default, it is automatically set according to textPosition.
     */
    //Open the interface style

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPolygon.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.type
         * @description Graphic type.
         */
        this.type ='smicpolygon';

        /**
         * @member {Array} Ekmap.LevelRenderer.Shape.SmicPolygon.prototype._holePolygonPointList
         * @description Island cave surface polygon vertex array (three-dimensional array)
         *
         */
        this.holePolygonPointLists = null;

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicPolygon";
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.brush
     * @description strokes.
     *
     * @param {CanvasRenderingContext2D} ctx-Context2D context.
     * @param {boolean} isHighlight-Whether to use the highlight attribute.
     *
     */
    brush(ctx, isHighlight) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var style = this.style;
        if (isHighlight) {
            // Expand the default highlight style according to style
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {}
            );
        }

        ctx.save();
        this.setContext(ctx, style);

        // set transform
        this.setTransform(ctx);

        // fill first and then stroke
        var hasPath = false;
        if (style.brushType =='fill' || style.brushType =='both' || typeof style.brushType =='undefined') {// The default is fill
            ctx.beginPath();
            if (style.lineType =='dashed' ||
                style.lineType =='dotted' ||
                style.lineType =='dot' ||
                style.lineType =='dash' ||
                style.lineType =='dashdot' ||
                style.lineType =='longdash' ||
                style.lineType =='longdashdot'
            ) {
                // Special treatment, the dashed line does not form a path, the solid line builds again
                this.buildPath(ctx, {
                    lineType:'solid',
                    lineWidth: style.lineWidth,
                    pointList: style.pointList
                });
            } else {
                this.buildPath(ctx, style);
                hasPath = true; // This path can be used
            }
            ctx.closePath();
            this.setCtxGlobalAlpha(ctx, "fill", style);
            ctx.fill();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        if (style.lineWidth> 0 && (style.brushType =='stroke' || style.brushType =='both')) {
            if (!hasPath) {
                ctx.beginPath();
                this.buildPath(ctx, style);
            }
            this.setCtxGlobalAlpha(ctx, "stroke", style);
            ctx.stroke();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        this.drawText(ctx, style, this.style);

        //Island Cave
        var hpStyle = CommonUtil.cloneObject(style);

        if (hpStyle.pointList) {
            if (this.holePolygonPointLists && this.holePolygonPointLists.length> 0) {
                var holePLS = this.holePolygonPointLists;
                var holePLSen = holePLS.length;
                for (var i = 0; i <holePLSen; i++) {
                    var holePL = holePLS[i];
                    //Island cave noodles
                    hpStyle.pointList = holePL;

                    ctx.globalCompositeOperation = "destination-out";
                    // fill first and then stroke
                    hasPath = false;
                    if (hpStyle.brushType =='fill' || hpStyle.brushType =='both' || typeof hpStyle.brushType =='undefined') {// The default is fill
                        ctx.beginPath();
                        if (hpStyle.lineType =='dashed' ||
                            hpStyle.lineType =='dotted' ||
                            hpStyle.lineType =='dot' ||
                            hpStyle.lineType =='dash' ||
                            hpStyle.lineType =='dashdot' ||
                            hpStyle.lineType =='longdash' ||
                            hpStyle.lineType =='longdashdot'
                        ) {
                            // Special treatment, the dashed line does not form a path, the solid line builds again
                            this.buildPath(ctx, {
                                lineType:'solid',
                                lineWidth: hpStyle.lineWidth,
                                pointList: hpStyle.pointList
                            });
                        } else {
                            this.buildPath(ctx, hpStyle);
                            hasPath = true; // This path can be used
                        }
                        ctx.closePath();
                        this.setCtxGlobalAlpha(ctx, "fill", hpStyle);
                        ctx.fill();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    }

                    if (hpStyle.lineWidth> 0 && (hpStyle.brushType =='stroke' || hpStyle.brushType =='both')) {
                        if (!hasPath) {
                            ctx.beginPath();
                            this.buildPath(ctx, hpStyle);
                        }
                        //If you stroke, first restore the default value of globalCompositeOperation and then stroke.
                        ctx.globalCompositeOperation = "source-over";
                        this.setCtxGlobalAlpha(ctx, "stroke", hpStyle);
                        ctx.stroke();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    } else {
                        ctx.globalCompositeOperation = "source-over";
                    }
                }
            }

        }
        ctx.restore();
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.buildPath
     * @description creates a polygonal path.
     *
     * @param {CanvasRenderingContext2D} ctx-Context2D context.
     * @param {Object} style-style.
     *
     */
    buildPath(ctx, style) {
        if (style.showShadow) {
            ctx.shadowBlur = style.shadowBlur;
            ctx.shadowColor = style.shadowColor;
            ctx.shadowOffsetX = style.shadowOffsetX;
            ctx.shadowOffsetY = style.shadowOffsetY;
        }
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // Although brokenLine can be reused, but the underlying graphics is based on performance considerations, repeat the code to reduce calls
        var pointList = style.pointList;

        if (pointList.length <2) {
            // Don't draw less than 2 points~
            return;
        }

        if (style.smooth && style.smooth !=='spline') {
            var controlPoints = SUtil.SUtil_smoothBezier(pointList, style.smooth, true, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            var len = pointList.length;
            for (var i = 0; i <len; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[(i + 1)% len][0] + __OP[0], pointList[(i + 1)% len][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth ==='spline') {
                pointList = SUtil.SUtil_smoothSpline(pointList, true, null, __OP);
            }

            if (!style.lineType || style.lineType =='solid') {
                // The default is a solid line
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i <pointList.length; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
                ctx.lineTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            } else if (style.lineType ==='dashed' ||
                style.lineType ==='dotted' ||
                style.lineType ==='dot' ||
                style.lineType ==='dash' ||
                style.lineType ==='longdash'
            ) {
                // SMIC-method modification-start
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType =='dashed'? 5: 1);
                style._dashLength = dashLengthForStyle;

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
                for (let i = 1; i <pointList.length; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i-1][0] + __OP[0],
                        pointList[i-1][1] + __OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength, [pattern1, pattern2]
                    );
                }
                SUtil.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length-1][0] + __OP[0],
                    pointList[pointList.length-1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength, [pattern1, pattern2]
                );
            } else if (style.lineType ==='dashdot' ||
                style.lineType ==='longdashdot'
            ) {
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType =='dashed'? 5: 1);
                style._dashLength = dashLengthForStyle;

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


                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i <pointList.length; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i-1][0] + __OP[0],
                        pointList[i-1][1] +__OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength, [pattern1, pattern2, pattern3, pattern4]
                    );
                }
                SUtil.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length-1][0] + __OP[0],
                    pointList[pointList.length-1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength, [pattern1, pattern2, pattern3, pattern4]
                );
            }

        }
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPolygon.prototype.getRect
     * @description calculation returns the polygon bounding box matrix. The bounding box is calculated directly from the four control points, not the minimum bounding box.
     *
     * @param {Object} style-style
     * @return {Object} Border object. Contains attributes: x, y, width, height.
     *
     */
    getRect(style, refOriginalPosition) {
        var __OP;
        if (!refOriginalPosition) {
            if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
                this.refOriginalPosition = [0, 0];
            }
            __OP = this.refOriginalPosition;
        } else {
            __OP = refOriginalPosition;
        }

        if (style.__rect) {
            return style.__rect;
        }

        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        var pointList = style.pointList;
        for (var i = 0, l = pointList.length; i <l; i++) {
            if (pointList[i][0] + __OP[0] <minX) {
                minX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][0] + __OP[0]> maxX) {
                maxX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][1] + __OP[1] <minY) {
                minY = pointList[i][1] + __OP[1];
            }
            if (pointList[i][1] + __OP[1]> maxY) {
                maxY = pointList[i][1] + __OP[1];
            }
        }

        var lineWidth;
        if (style.brushType =='stroke' || style.brushType =='fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }

        style.__rect = {
            x: Math.round(minX-lineWidth / 2),
            y: Math.round(minY-lineWidth / 2),
            width: maxX-minX + lineWidth,
            height: maxY-minY + lineWidth
        };
        return style.__rect;
    }

}