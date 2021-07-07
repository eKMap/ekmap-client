import { Shape } from './Shape';
import { SUtil } from './SUtil';

export class SmicText extends Shape {

    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.LevelRenderer.Shape.SmicText.prototype.type
         * @description Graphic type.
         */
        this.type ='smictext';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape.SmicText";
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.type = null;

        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.brush
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
        var __OP = this.refOriginalPosition;

        var style = this.style;
        if (isHighlight) {
            // Expand the default highlight style according to style
            style = this.getHighlightStyle(
                style, this.highlightStyle || {}
            );
        }

        if (typeof(style.text) =='undefined' || style.text === false) {
            return;
        }

        ctx.save();
        this.doClip(ctx);

        this.setContext(ctx, style);

        // set transform
        this.setTransform(ctx);

        if (style.textFont) {
            ctx.font = style.textFont;
        }
        ctx.textAlign = style.textAlign ||'start';
        ctx.textBaseline = style.textBaseline ||'middle';

        var text = (style.text +'').split('\n');
        var lineHeight = SUtil.Util_area.getTextHeight('ZH', style.textFont);
        var rect = this.getRectNoRotation(style);
        // var x = style.x;
        var x = style.x + __OP[0];
        var y;
        if (style.textBaseline =='top') {
            y = rect.y;
        } else if (style.textBaseline =='bottom') {
            y = rect.y + lineHeight;
        } else {
            y = rect.y + lineHeight / 2;
        }
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //Text drawing
        for (var i = 0, l = text.length; i <l; i++) {
            //Whether to render the rectangular background and color
            if (style.labelRect) {
                //+4,-2 is to make the text a little spaced from the left and right edges of the border
                ctx.fillRect(rect.x-2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.strokeColor;
                ctx.strokeRect(rect.x-2, rect.y, rect.width + 4, rect.height);
                ctx.fillStyle = style.textColor;
            }

            switch (style.brushType) {
                case'stroke':
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline =='top') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline =='bottom') {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.strokeText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
                    break;
                case'both':
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);if (style.textBaseline =='top') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * i);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else if (style.textBaseline =='bottom') {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        } else {
                            if (style.maxWidth) {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2, style.maxWidth);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            } else {
                                this.setCtxGlobalAlpha(ctx, "fill", style);
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);

                                this.setCtxGlobalAlpha(ctx, "stroke", style);
                                ctx.strokeText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2);
                                this.setCtxGlobalAlpha(ctx, "reset", style);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y, style.maxWidth);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        } else {
                            this.setCtxGlobalAlpha(ctx, "fill", style);
                            ctx.fillText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);

                            this.setCtxGlobalAlpha(ctx, "stroke", style);
                            ctx.strokeText(text[i], x, y);
                            this.setCtxGlobalAlpha(ctx, "reset", style);
                        }
                    }
                    break;
                default:
                    //fill or others
                    this.setCtxGlobalAlpha(ctx, "fill", style);
                    if (style.textRotation && style.textRotation !== 0) {
                        ctx.save();
                        ctx.translate(ox, oy);
                        ctx.rotate(style.textRotation * Math.PI / 180);
                        if (style.textBaseline =='top') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * i, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * i);
                            }
                        } else if (style.textBaseline =='bottom') {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height);
                            }
                        } else {
                            if (style.maxWidth) {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2, style.maxWidth);
                            } else {
                                ctx.fillText(text[i], 0, lineHeight * (i + 1)-rect.height / 2-lineHeight / 2);
                            }
                        }
                        ctx.restore();
                    } else {
                        if (style.maxWidth) {
                            ctx.fillText(text[i], x, y, style.maxWidth);
                        } else {
                            ctx.fillText(text[i], x, y);
                        }
                    }
                    this.setCtxGlobalAlpha(ctx, "reset", style);
            }
            y += lineHeight;
        }

        ctx.restore();
        return;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.getRect
     * @description returns the text bounding box rectangle
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        var left, top, right, bottom
        var tbg = this.getTextBackground(style, true);
        for (var i = 0, len = tbg.length; i <len; i++) {
            var poi = tbg[i];

            //Initialize with the first point
            if (i == 0) {
                left = poi[0];
                right = poi[0];
                top = poi[1];
                bottom = poi[1];
            } else {
                if (poi[0] <left) {
                    left = poi[0]
                }
                if (poi[0]> right) {
                    right = poi[0]
                }
                if (poi[1] <top) {
                    top = poi[1]
                }
                if (poi[1]> bottom) {
                    bottom = poi[1]
                }
            }
        }

        style.__rect = {
            x: left,
            y: top,
            width: right-left,
            height: bottom-top
        };

        return style.__rect;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.getRectNoRotation
     * @description returns the text bounding box rectangle when rotation and maxWidth are ignored
     */
    getRectNoRotation(style) {

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineHeight = SUtil.Util_area.getTextHeight('ZH', style.textFont);

        var width = SUtil.Util_area.getTextWidth(style.text, style.textFont);
        var height = SUtil.Util_area.getTextHeight(style.text, style.textFont);

        //Process the text position, note: the drawing of the text is determined by this rect
        var textX = style.x + __OP[0]; // default start == left
        if (style.textAlign =='end' || style.textAlign =='right') {
            textX -= width;
        } else if (style.textAlign =='center') {
            textX -= (width / 2);
        }

        var textY;
        if (style.textBaseline =='top') {
            // textY = style.y;
            textY = style.y + __OP[1];
        } else if (style.textBaseline =='bottom') {
            textY = (style.y + __OP[1])-height;
        } else {
            // middle
            textY = (style.y + __OP[1])-height / 2;
        }

        var isWidthChangeByMaxWidth = false;
        var widthBeforeChangeByMaxWidth;

        //Handle maxWidth
        if (style.maxWidth) {
            var maxWidth = parseInt(style.maxWidth);
            if (maxWidth <width) {
                widthBeforeChangeByMaxWidth = width;
                isWidthChangeByMaxWidth = true;
                width = maxWidth;
            }

            textX = style.x + __OP[0];
            if (style.textAlign =='end' || style.textAlign =='right') {
                textX -= width;
            } else if (style.textAlign =='center') {
                textX -= (width / 2);
            }
        }

        //Handle italics
        if (style.textFont) {
            var textFont = style.textFont;
            var textFontStr = textFont.toLowerCase()
            if (textFontStr.indexOf("italic")> -1) {
                if (isWidthChangeByMaxWidth === true) {
                    width += (lineHeight / 3) * (width / widthBeforeChangeByMaxWidth);
                } else {
                    width += lineHeight / 3;
                }
            }
        }

        var rect = {
            x: textX,
            y: textY,
            width: width,
            height: height
        };

        return rect;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.getTextBackground
     * @description Get the range of the text background box
     *
     * @param {Object} style-style.
     * @param {boolean} redo-whether to force the textBackground to be recalculated.
     */
    getTextBackground(style, redo) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if ((!redo) && style.__textBackground) {
            return style.__textBackground;
        }

        //Rectangular frame when not rotating
        var rect = this.getRectNoRotation(style);

        //Rotation center point
        var ox = style.x + __OP[0];
        var oy = style.y + __OP[1];

        //Background frame
        var background = [];

        if (style.textRotation && style.textRotation !== 0) {
            let textRotation = style.textRotation;
            let ltPoi = this.getRotatedLocation(rect.x, rect.y, ox, oy, textRotation);
            let rtPoi = this.getRotatedLocation(rect.x + rect.width, rect.y, ox, oy, textRotation);
            let rbPoi = this.getRotatedLocation(rect.x + rect.width, rect.y + rect.height, ox, oy, textRotation);
            let lbPoi = this.getRotatedLocation(rect.x, rect.y + rect.height, ox, oy, textRotation);

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        } else {
            let ltPoi = [rect.x, rect.y];
            let rtPoi = [rect.x + rect.width, rect.y];
            let rbPoi = [rect.x + rect.width, rect.y + rect.height];
            let lbPoi = [rect.x, rect.y + rect.height];

            background.push(ltPoi);
            background.push(rtPoi);
            background.push(rbPoi);
            background.push(lbPoi);
        }

        style.__textBackground = background;

        return style.__textBackground;
    }


    /**
     * @function Ekmap.LevelRenderer.Shape.SmicText.prototype.getRotatedLocation
     * @description Gets the position of a point after rotating clockwise around the center of rotation. (This method is used for screen coordinates)
     *
     * @param {number} x-The abscissa of the rotation point.
     * @param {number} y-The ordinate of the rotation point.
     * @param {number} rx-The abscissa of the center of rotation.
     * @param {number} ry-the ordinate of the center of rotation.
     * @param {number} angle-rotation angle (degrees).
     * @return {Array} The rotated coordinate position, a one-dimensional array of length 2. The first element of the array represents the x coordinate, and the second element represents the y coordinate.
     */
    getRotatedLocation(x, y, rx, ry, angle) {
        var loc = new Array(),
            x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle; //Rotate clockwise
        x0 = (x-rx) * Math.cos((angle / 180) * Math.PI)-(y-ry) * Math.sin((angle / 180) * Math.PI) + rx;
        y0 = (x-rx) * Math.sin((angle / 180) * Math.PI) + (y-ry) * Math.cos((angle / 180) * Math.PI) + ry;

        loc[0] = x0;
        loc[1] = -y0;
        return loc;
    }

}