import { Shape } from './Shape';

export class SmicRing extends Shape {

    /**
     * @member {Object} Ekmap.LevelRenderer.Shape.SmicRing.prototype.style
     * @description drawing style.
     *
     * @param {number} x-The x coordinate of the center of the circle, a required parameter.
     * @param {number} y-The y coordinate of the center of the circle, a required parameter.
     * @param {number} r-The radius of the outer circle, a required parameter.
     * @param {number} r0-The radius of the inner circle, a required parameter.
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
     * @param {string} text-Additional text in the graphic. Defaults:"".
     * @param {string} textColor-text color. Default value: "#000000'".
     * @param {string} textFont-additional text style. Example:'bold 18px verdana'.
     * @param {string} textPosition-additional text position. Possible settings: "inside", "left", "right", top", "bottom", "end". Default value: "end".
     * @param {string} textAlign-The horizontal alignment of the additional text. Possible values: "start", "end", "left", "right", "center". By default, it is automatically set according to textPosition.
     * @param {string} textBaseline-The additional text is aligned vertically. Possible settings: "top", "bottom", "middle", "alphabetic", "hanging", "ideographic". By default, it is automatically set according to textPosition.
     */
    //Open the interface style

    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRing.constructor
     * @description Constructor.
     *
     * @param {Array} options-The configuration (options) item of shape, which can be the own attribute of shape or a custom attribute.
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicRing.prototype.type
         * @description Graphic type.
         */
        this.type ='smicring';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicRing";

    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRing.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRing.prototype.buildPath
     * @description creates a circular path.
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

        // Non-zero wrapping optimization
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, false);
        ctx.moveTo((style.x + __OP[0]) + style.r0, style.y + __OP[1]);
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r0, 0, Math.PI * 2, true);
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRing.prototype.getRect
     * @description calculation returns the circle bounding box matrix
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