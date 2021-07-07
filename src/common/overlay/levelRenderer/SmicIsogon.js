import { Shape } from './Shape';
import { SUtil } from './SUtil';

export class SmicIsogon extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicIsogon.prototype.style
     * @description drawing style.
     *
     * @param {number} x-The x coordinate of the center of the circumscribed circle of a positive n polygon, a required parameter.
     * @param {number} y-The y coordinate of the circumscribed circle center of a positive n-sided polygon. A parameter is required.
     * @param {number} r-The radius of the circumcircle of a regular n-sided polygon, a parameter is required.
     * @param {number} n-Indicate the regular polygon, the parameter must be set (n>=3).
     * @param {string} brushType-brush type. Possible values: "fill", "stroke", "both". Default value: "fill".
     * @param {string} color-fill color. Default value: "#000000'".
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
     * @function Ekmap.LevelRenderer.Shape.SmicIsogon.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicIsogon.prototype.type
         * @description Graphic type.
         */
        this.type ='smicisogon';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicIsogon";
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicIsogon.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicIsogon.prototype.buildPath
     * @description creates an n-point star (n>=3) path.
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

        var sin = SUtil.Util_math.sin;
        var cos = SUtil.Util_math.cos;
        var PI = Math.PI;

        var n = style.n;
        if (!n || n <2) {
            return;
        }

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;

        var dStep = 2 * PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // Record boundary points, used to judge insight
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (let i = 0, end = n-1; i <end; i++) {
            pointList.push([x + r * cos(deg), y + r * sin(deg)]);
            deg += dStep;
        }
        pointList.push([xStart, yStart]);

        // draw
        ctx.moveTo(pointList[0][0], pointList[0][1]);
        for (let i = 0; i <pointList.length; i++) {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
        }
        ctx.closePath();

        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicIsogon.prototype.getRect
     * @description Calculates and returns the bounding box rectangle of the regular polygon.
     *
     * @param {Object} style-style
     * @return {Object} Border object. Contains attributes: x, y, width, height.
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType =='stroke' || style.brushType =='fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0])-style.r-lineWidth / 2),
            y: Math.round((style.y + __OP[1])-style.r-lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }

}