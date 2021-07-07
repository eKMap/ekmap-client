import { Shape } from './Shape';
import { SUtil } from './SUtil';

export class SmicStar extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicStar.prototype.style
     * @description drawing style.
     *
     * @param {number} style.x-n The x coordinate of the circumscribed center of the corner star, a required parameter.
     * @param {number} style.y-n The y coordinate of the circumcenter of the corner star, a required parameter.
     * @param {number} style.r-n The radius of the circumcircle of the corner star, a required parameter.
     * @param {number} style.r0-n The radius of the circumcircle of the inner vertex (concave point) of the corner star. If this parameter is not specified, it will be calculated automatically: take the intersection of the outer vertex line as the inner vertex.
     * @param {number} style.n-Indicate the number of stars, parameters are required.
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
     * @function Ekmap.LevelRenderer.Shape.SmicStar.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicStar.prototype.type
         * @description Graphic type.
         */
        this.type ='smicstar';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicStar";
    }

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicStar.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicStar.prototype.buildPath
     * @description creates an n-point star (n>3) path.
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

        var n = style.n;
        if (!n || n <2) {
            return;
        }

        var sin = SUtil.Util_math.sin;
        var cos = SUtil.Util_math.cos;
        var PI = Math.PI;

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;
        var r0 = style.r0;

        // If the radius of the circumcircle of the inner vertex is not specified, it is automatically calculated
        if (r0 == null) {
            r0 = n> 4
                // The intersection of the lines of separated external vertices,
                // is taken as the internal intersection to calculate r0
                ?
                r * cos(2 * PI / n) / cos(PI / n)
                // Special treatment of two, three, four-pointed stars
                :
                r / 3;
        }

        var dStep = PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // Record boundary points, used to judge inside
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (var i = 0, end = n * 2-1, ri; i <end; i++) {
            ri = i% 2 === 0? r0: r;
            pointList.push([x + ri * cos(deg), y + ri * sin(deg)]);
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
     * @function Ekmap.LevelRenderer.Shape.SmicStar.prototype.getRect
     * @description returns the bounding box rectangle of the n-point star.
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
        } else {lineWidth = 0;
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