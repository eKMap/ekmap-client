import { Shape } from './Shape';

export class SmicPoint extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicPoint.prototype.style
     * @description drawing style.
     *
     * @param {number} style.x-The x coordinate of the center of the circle, a required parameter.
     * @param {number} style.y-The y coordinate of the center of the circle, a required parameter.
     * @param {number} style.r-radius, a required parameter.
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
     * @function Ekmap.LevelRenderer.Shape.SmicPoint.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicPoint.prototype.type
         * @description Graphic type.
         */
        this.type ='smicpoint';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicPoint";
    }


    /**
     * @function cdestroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPoint.prototype.buildPath
     * @description Create a touch.
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

        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, true);
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicPoint.prototype.getRect
     * @description Calculates the bounding box rectangle of the returned point. The bounding box is calculated directly from the four control points, not the minimum bounding box.
     *
     * @param {Object} style-style
     * @return {Object} Border object. Contains attributes: x, y, width, height.
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if (style.__rect) {
            return style.__rect;
        }

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