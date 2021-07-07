import { Shape } from './Shape';

export class SmicEllipse extends Shape {
    constructor(options) {
        super(options);

        this.type = 'smicellipse';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicEllipse";
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

        var k = 0.5522848;
        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var a = style.a;
        var b = style.b;
        var ox = a * k;
        var oy = b * k; 
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    }

    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.a - lineWidth / 2),
            y: Math.round((style.x + __OP[1]) - style.b - lineWidth / 2),
            width: style.a * 2 + lineWidth,
            height: style.b * 2 + lineWidth
        };

        return style.__rect;
    }

}