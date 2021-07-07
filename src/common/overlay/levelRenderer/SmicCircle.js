import { Shape } from './Shape';

export class SmicCircle extends Shape {

    constructor(options) {
        super(options);
        this.type = 'smiccircle';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicCircle";
    }

    destroy() {
        this.type = null;
        super.destroy();
    }

    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];
        var y = style.y + __OP[1]; 

        ctx.moveTo(x + style.r, y);
        ctx.arc(x, y, style.r, 0, Math.PI * 2, true);

        return true;
    }

    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0]; 
        var y = style.y + __OP[1]; 
        var r = style.r; 

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round(x - r - lineWidth / 2),
            y: Math.round(y - r - lineWidth / 2),
            width: r * 2 + lineWidth,
            height: r * 2 + lineWidth
        };

        return style.__rect;
    }
}