import { Shape } from './Shape';

export class SmicRectangle extends Shape {

    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicRectangle.prototype.type
         * @description Graphic type.
         */
        this.type ='smicrectangle';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicRectangle";
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRectangle.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * APIMethod: _buildRadiusPath
     * Create a rectangular path with rounded corners.
     *
     * Parameters:
     * ctx-{CanvasRenderingContext2D} Context2D context.
     * style-{Object} style.
     *
     */
    _buildRadiusPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // The radius of the upper left, upper right, lower right, and lower left corners are r1, r2, r3, r4
        // r is abbreviated as 1 which is equivalent to [1, 1, 1, 1]
        // r is abbreviated as [1] which is equivalent to [1, 1, 1, 1]
        // r is abbreviated as [1, 2] which is equivalent to [1, 2, 1, 2]
        // r is abbreviated as [1, 2, 3] which is equivalent to [1, 2, 3, 2]
        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var width = style.width;
        var height = style.height;
        var r = style.radius;
        var r1;
        var r2;
        var r3;
        var r4;

        if (typeof r ==='number') {
            r1 = r2 = r3 = r4 = r;
        } else if (r instanceof Array) {
            if (r.length === 1) {
                r1 = r2 = r3 = r4 = r[0];
            } else if (r.length === 2) {
                r1 = r3 = r[0];
                r2 = r4 = r[1];
            } else if (r.length === 3) {
                r1 = r[0];
                r2 = r4 = r[1];
                r3 = r[2];
            } else {
                r1 = r[0];
                r2 = r[1];
                r3 = r[2];
                r4 = r[3];
            }
        } else {
            r1 = r2 = r3 = r4 = 0;
        }

        var total;
        if (r1 + r2> width) {
            total = r1 + r2;
            r1 *= width / total;
            r2 *= width / total;
        }
        if (r3 + r4> width) {
            total = r3 + r4;
            r3 *= width / total;
            r4 *= width / total;
        }
        if (r2 + r3> height) {
            total = r2 + r3;
            r2 *= height / total;
            r3 *= height / total;
        }
        if (r1 + r4> height) {
            total = r1 + r4;
            r1 *= height / total;
            r4 *= height / total;
        }
        ctx.moveTo(x + r1, y);
        ctx.lineTo(x + width-r2, y);
        r2 !== 0 && ctx.quadraticCurveTo(
            x + width, y, x + width, y + r2
        );
        ctx.lineTo(x + width, y + height-r3);
        r3 !== 0 && ctx.quadraticCurveTo(
            x + width, y + height, x + width-r3, y + height
        );
        ctx.lineTo(x + r4, y + height);
        r4 !== 0 && ctx.quadraticCurveTo(
            x, y + height, x, y + height-r4
        );
        ctx.lineTo(x, y + r1);
        r1 !== 0 && ctx.quadraticCurveTo(x, y, x + r1, y);
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRectangle.prototype.buildPath
     * @description creates a rectangular path.
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

        if (!style.radius) {
            ctx.moveTo(style.x + __OP[0], style.y + __OP[1]);
            ctx.lineTo((style.x + __OP[0]) + style.width, (style.y + __OP[1]));
            ctx.lineTo((style.x + __OP[0]) + style.width, (style.y + __OP[1]) + style.height);
            ctx.lineTo((style.x + __OP[0]), (style.y + __OP[1]) + style.height);
            ctx.lineTo(style.x + __OP[0], style.y + __OP[1]);
            // ctx.rect(style.x, style.y, style.width, style.height);
        } else {
            this._buildRadiusPath(ctx, style);
        }
        ctx.closePath();
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicRectangle.prototype.getRect
     * @description The calculation returns the rectangular bounding box matrix. The bounding box is calculated directly from the four control points, not the minimum bounding box.
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
            x: Math.round((style.x + __OP[0])-lineWidth / 2),
            y: Math.round((style.y + __OP[1])-lineWidth / 2),
            width: style.width + lineWidth,
            height: style.height + lineWidth
        };

        return style.__rect;
    }

}