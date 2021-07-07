import { Shape } from './Shape';

export class SmicImage extends Shape {

    constructor(options) {
        super(options);
       
        this.type = 'smicimage';

        this._imageCache = {};
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicImage";
    }

    destroy() {
        this.type = null;
        this._imageCache = null;
        super.destroy();
    }


    brush(ctx, isHighlight, refresh) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var style = this.style || {};

        if (isHighlight) {
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        var image = style.image;
        var me = this;

        if (typeof(image) === 'string') {
            var src = image;
            if (this._imageCache[src]) {
                image = this._imageCache[src];
            } else {
                image = new Image();
                image.onload = function() {
                    image.onload = null;
                    clearTimeout(SmicImage._refreshTimeout);
                    SmicImage._needsRefresh.push(me);
                    SmicImage._refreshTimeout = setTimeout(function() {
                        refresh && refresh(SmicImage._needsRefresh);
                        SmicImage._needsRefresh = [];
                    }, 10);
                };

                image.src = src;
                this._imageCache[src] = image;
            }
        }
        if (image) {
            if (image.nodeName.toUpperCase() == 'IMG') {
                if (window.ActiveXObject) {
                    if (image.readyState != 'complete') {
                        return;
                    }
                } else {
                    if (!image.complete) {
                        return;
                    }
                }
            }
            var width = style.width || image.width;
            var height = style.height || image.height;
            var x = style.x + __OP[0];
            var y = style.y + __OP[1];

            if (!image.width || !image.height) {
                return;
            }

            ctx.save();

            this.doClip(ctx);

            this.setContext(ctx, style);

            this.setTransform(ctx);

            if (style.sWidth && style.sHeight) {
                let sx = (style.sx + __OP[0]) || 0;
                let sy = (style.sy + __OP[1]) || 0;
                ctx.drawImage(
                    image,
                    sx, sy, style.sWidth, style.sHeight,
                    x, y, width, height
                );
            } else if (style.sx && style.sy) {
                let sx = style.sx + __OP[0];
                let sy = style.sy + __OP[1];
                var sWidth = width - sx;
                var sHeight = height - sy;
                ctx.drawImage(
                    image,
                    sx, sy, sWidth, sHeight,
                    x, y, width, height
                );
            } else {
                ctx.drawImage(image, x, y, width, height);
            }
            if (!style.width) {
                style.width = width;
            }
            if (!style.height) {
                style.height = height;
            }
            if (!this.style.width) {
                this.style.width = width;
            }
            if (!this.style.height) {
                this.style.height = height;
            }

            this.drawText(ctx, style, this.style);

            ctx.restore();
        }
    }

    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        return {
            x: style.x + __OP[0],
            y: style.y + __OP[1],
            width: style.width,
            height: style.height
        };
    }

    clearCache() {
        this._imageCache = {};
    }

}
SmicImage._needsRefresh = [];
SmicImage._refreshTimeout = null;