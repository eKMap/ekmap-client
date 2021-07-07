import { Shape } from './Shape';
import { SUtil } from './SUtil';

export class SmicSector extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicSector.prototype.style
     * @description drawing style.
     *
     * @param {number} style.x-The x coordinate of the center of the circle, a required parameter.
     * @param {number} style.y-The y coordinate of the center of the circle, a required parameter.
     * @param {number} style.r-The radius of the outer circle, a required parameter.
     * @param {number} style.r0-the radius of the inner circle, an inner arc will appear when specified, and the fan side length is `r-r0`. Value range [0, r), default value: 0.
     * @param {number} style.startAngle-starting angle, a required parameter. The value range is [0, 360).
     * @param {number} style.endAngle-the end angle, a required parameter. The value range is (0, 360.
     * @param {boolean} style.clockWise-whether it is clockwise. Default value: false.
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
     * @function Ekmap.LevelRenderer.Shape.SmicSector.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicSector.protptype.type
         * @description Graphic type.
         */
        this.type ='smicsector';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicSector";
    }

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicSector.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicSector.prototype.buildPath
     * @description creates a fan-shaped path.
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

        var x = style.x + __OP[0]; // center x
        var y = style.y + __OP[1]; // center y
        var r0 = style.r0 || 0; // Shape inner radius [0,r)
        var r = style.r; // The outer radius of the sector (0,r)
        var startAngle = style.startAngle; // start angle[0,360)
        var endAngle = style.endAngle; // end angle (0,360)
        var clockWise = style.clockWise || false;

        startAngle = SUtil.Util_math.degreeToRadian(startAngle);
        endAngle = SUtil.Util_math.degreeToRadian(endAngle);

        if (!clockWise) {
            // The fan shape is counterclockwise by default, and the Y axis is up
            // This is different from the arc standard, in order to be compatible with echarts
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        var unitX = SUtil.Util_math.cos(startAngle);
        var unitY = SUtil.Util_math.sin(startAngle);
        ctx.moveTo(
            unitX * r0 + x,
            unitY * r0 + y
        );

        ctx.lineTo(
            unitX * r + x,
            unitY * r + y
        );

        ctx.arc(x, y, r, startAngle, endAngle, !clockWise);

        ctx.lineTo(
            SUtil.Util_math.cos(endAngle) * r0 + x,
            SUtil.Util_math.sin(endAngle) * r0 + y
        );

        if (r0 !== 0) {
            ctx.arc(x, y, r0, endAngle, startAngle, clockWise);
        }

        ctx.closePath();

        return;
    }

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicSector.prototype.getRect
     * @description returns the fan-shaped bounding box rectangle
     *
     * @param {Object} style-style
     * @return {Object} Border object. Contains attributes: x, y, width, height.
     *
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var min0 = SUtil.Util_vector.create();
        var min1 = SUtil.Util_vector.create();
        var max0 = SUtil.Util_vector.create();var max1 = SUtil.Util_vector.create();

        var x = style.x + __OP[0]; // center x
        var y = style.y + __OP[1]; // center y
        var r0 = style.r0 || 0; // Shape inner radius [0,r)
        var r = style.r; // The outer radius of the sector (0,r)
        var startAngle = SUtil.Util_math.degreeToRadian(style.startAngle);
        var endAngle = SUtil.Util_math.degreeToRadian(style.endAngle);
        var clockWise = style.clockWise;

        if (!clockWise) {
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        if (r0> 1) {
            SUtil.Util_computeBoundingBox.arc(
                x, y, r0, startAngle, endAngle, !clockWise, min0, max0
            );
        } else {
            min0[0] = max0[0] = x;
            min0[1] = max0[1] = y;
        }
        SUtil.Util_computeBoundingBox.arc(
            x, y, r, startAngle, endAngle, !clockWise, min1, max1
        );

        SUtil.Util_vector.min(min0, min0, min1);
        SUtil.Util_vector.max(max0, max0, max1);
        style.__rect = {
            x: min0[0],
            y: min0[1],
            width: max0[0]-min0[0],
            height: max0[1]-min0[1]
        };
        return style.__rect;
    }

}