import { Ekmap } from '../../Ekmap';
import { Eventful } from './Eventful';
import { Transformable } from './Transformable';
import { Util as CommonUtil } from '../../commontypes/Util';
import { SUtil } from './SUtil';

export class Shape extends Ekmap.mixin(Eventful, Transformable) {

    constructor(options) {
        super(options);

        options = options || {};
       
        this.id = null;

        this.style = {};

        this.highlightStyle = null;

        this.parent = null;

        this.__dirty = true;
       
        this.__clipShapes = [];

        this.invisible = false;

        this.ignore = false;

        this.zlevel = 0;

        this.draggable = false;

        this.clickable = false;

        this.hoverable = true;

        this.z = 0;

        this.refOriginalPosition = [0, 0];

        this.refDataID = null;

        this.isHoverByRefDataID = false;

        this.refDataHoverGroup = null;

        this.dataInfo = null;
        CommonUtil.extend(this, options);
        this.id = this.id || CommonUtil.createUniqueID("smShape_");
        this.CLASS_NAME = "Ekmap.LevelRenderer.Shape";
      
        this.getTansform = (function() {
            var invTransform = [];

            return function(x, y) {
                var originPos = [x, y];
                if (this.needTransform && this.transform) {
                    SUtil.Util_matrix.invert(invTransform, this.transform);

                    SUtil.Util_matrix.mulVector(originPos, invTransform, [x, y, 1]);

                    if (x == originPos[0] && y == originPos[1]) {
                        this.updateNeedTransform();
                    }
                }
                return originPos;
            };
        })();

    }

    destroy() {
        this.id = null;
        this.style = null;
        this.highlightStyle = null;
        this.parent = null;
        this.__dirty = null;
        this.__clipShapes = null;
        this.invisible = null;
        this.ignore = null;
        this.zlevel = null;
        this.draggable = null;
        this.clickable = null;
        this.hoverable = null;
        this.z = null;

        this.refOriginalPosition = null;
        this.refDataID = null;
        this.refDataHoverGroup = null;
        this.isHoverByRefDataID = null;
        this.dataInfo = null;
        super.destroy();
    }

    brush(ctx, isHighlight) {

        var style = this.beforeBrush(ctx, isHighlight);

        ctx.beginPath();
        this.buildPath(ctx, style);

        switch (style.brushType) {
            /* jshint ignore:start */
            case 'both':
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                if (style.lineWidth > 0) {
                    this.setCtxGlobalAlpha(ctx, "stroke", style);
                    ctx.stroke();
                }
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
            case 'stroke':
                this.setCtxGlobalAlpha(ctx, "stroke", style);
                style.lineWidth > 0 && ctx.stroke();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
                /* jshint ignore:end */
            default:
                this.setCtxGlobalAlpha(ctx, "fill", style);
                ctx.fill();
                this.setCtxGlobalAlpha(ctx, "reset", style);
                break;
        }

        this.drawText(ctx, style, this.style);

        this.afterBrush(ctx);
    }

    beforeBrush(ctx, isHighlight) {
        var style = this.style;

        if (this.brushTypeOnly) {
            style.brushType = this.brushTypeOnly;
        }

        if (isHighlight) {
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {},
                this.brushTypeOnly
            );
        }

        if (this.brushTypeOnly == 'stroke') {
            style.strokeColor = style.strokeColor || style.color;
        }

        ctx.save();

        this.doClip(ctx);

        this.setContext(ctx, style);

        this.setTransform(ctx);

        return style;
    }

    afterBrush(ctx) {
        ctx.restore();
    }

    setContext(ctx, style) {
        var STYLE_CTX_MAP = [
            ['color', 'fillStyle'],
            ['strokeColor', 'strokeStyle'],
            ['opacity', 'globalAlpha'],
            ['lineCap', 'lineCap'],
            ['lineJoin', 'lineJoin'],
            ['miterLimit', 'miterLimit'],
            ['lineWidth', 'lineWidth'],
            ['shadowBlur', 'shadowBlur'],
            ['shadowColor', 'shadowColor'],
            ['shadowOffsetX', 'shadowOffsetX'],
            ['shadowOffsetY', 'shadowOffsetY']
        ];

        for (var i = 0, len = STYLE_CTX_MAP.length; i < len; i++) {
            var styleProp = STYLE_CTX_MAP[i][0];
            var styleValue = style[styleProp];
            var ctxProp = STYLE_CTX_MAP[i][1];

            if (typeof styleValue != 'undefined') {
                ctx[ctxProp] = styleValue;
            }
        }
    }

    doClip(ctx) {
        var clipShapeInvTransform = SUtil.Util_matrix.create();

        if (this.__clipShapes) {
            for (var i = 0; i < this.__clipShapes.length; i++) {
                var clipShape = this.__clipShapes[i];
                if (clipShape.needTransform) {
                    let m = clipShape.transform;
                    SUtil.Util_matrix.invert(clipShapeInvTransform, m);
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
                ctx.beginPath();
                clipShape.buildPath(ctx, clipShape.style);
                ctx.clip();
                // Transform back
                if (clipShape.needTransform) {
                    let m = clipShapeInvTransform;
                    ctx.transform(
                        m[0], m[1],
                        m[2], m[3],
                        m[4], m[5]
                    );
                }
            }
        }
    }

    getHighlightStyle(style, highlightStyle, brushTypeOnly) {
        var newStyle = {};
        for (let k in style) {
            newStyle[k] = style[k];
        }

        var highlightColor = SUtil.Util_color.getHighlightColor();
        if (style.brushType != 'stroke') {
            newStyle.strokeColor = highlightColor;
            newStyle.lineWidth = (style.lineWidth || 1);
            
            newStyle.brushType = 'both';
        } else {
            if (brushTypeOnly != 'stroke') {
                newStyle.strokeColor = highlightColor;
                newStyle.lineWidth = (style.lineWidth || 1);
            } else {
                newStyle.strokeColor = highlightStyle.strokeColor ||
                    SUtil.Util_color.mix(
                        style.strokeColor,
                        SUtil.Util_color.toRGB(highlightColor)
                    );
            }
        }

        for (let k in highlightStyle) {
            if (typeof highlightStyle[k] != 'undefined') {
                newStyle[k] = highlightStyle[k];
            }
        }

        return newStyle;
    }

    getHighlightZoom() {
        return this.type != 'text' ? 6 : 2;
    }

    drift(dx, dy) {
        this.position[0] += dx;
        this.position[1] += dy;
    }

    buildPath(ctx, style) { 
        SUtil.Util_log('buildPath not implemented in ' + this.type);
    }

    getRect(style) { 
        SUtil.Util_log('getRect not implemented in ' + this.type);
    }

    isCover(x, y) {
        var originPos = this.getTansform(x, y);
        x = originPos[0];
        y = originPos[1];

        var rect = this.style.__rect;
        if (!rect) {
            rect = this.style.__rect = this.getRect(this.style);
        }

        if (x >= rect.x &&
            x <= (rect.x + rect.width) &&
            y >= rect.y &&
            y <= (rect.y + rect.height)
        ) {
            return SUtil.Util_area.isInside(this, this.style, x, y);
        }

        return false;
    }

    drawText(ctx, style, normalStyle) {
        if (typeof(style.text) == 'undefined' || style.text === false) {
            return;
        }
        var textColor = style.textColor || style.color || style.strokeColor;
        ctx.fillStyle = textColor;

        var dd = 10;
        var al; 
        var bl; 
        var tx;
        var ty; 

        var textPosition = style.textPosition
            ||
            this.textPosition
            ||
            'top'; 

        var __OP = [];
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            __OP = [0, 0];
        } else {
            __OP = this.refOriginalPosition;
        }

        switch (textPosition) {
            case 'inside':
            case 'top':
            case 'bottom':
            case 'left':
            case 'right':
                if (this.getRect) {
                    var rect = (normalStyle || style).__rect ||
                        this.getRect(normalStyle || style);

                    switch (textPosition) {
                        case 'inside':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height / 2;
                            al = 'center';
                            bl = 'middle';
                            if (style.brushType != 'stroke' &&
                                textColor == style.color
                            ) {
                                ctx.fillStyle = '#fff';
                            }
                            break;
                        case 'left':
                            tx = rect.x - dd;
                            ty = rect.y + rect.height / 2;
                            al = 'end';
                            bl = 'middle';
                            break;
                        case 'right':
                            tx = rect.x + rect.width + dd;
                            ty = rect.y + rect.height / 2;
                            al = 'start';
                            bl = 'middle';
                            break;
                        case 'top':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y - dd;
                            al = 'center';
                            bl = 'bottom';
                            break;
                        case 'bottom':
                            tx = rect.x + rect.width / 2;
                            ty = rect.y + rect.height + dd;
                            al = 'center';
                            bl = 'top';
                            break;
                    }
                }
                break;
            case 'start':
            case 'end':
                var xStart = 0;
                var xEnd = 0;
                var yStart = 0;
                var yEnd = 0;
                if (typeof style.pointList != 'undefined') {
                    var pointList = style.pointList;
                    if (pointList.length < 2) {
                        return;
                    }
                    var length = pointList.length;
                    switch (textPosition) {
                        case 'start':
                            xStart = pointList[0][0] + __OP[0];
                            xEnd = pointList[1][0] + __OP[0];
                            yStart = pointList[0][1] + __OP[1];
                            yEnd = pointList[1][1] + __OP[1];
                            break;
                        case 'end':
                            xStart = pointList[length - 2][0] + __OP[0];
                            xEnd = pointList[length - 1][0] + __OP[0];
                            yStart = pointList[length - 2][1] + __OP[1];
                            yEnd = pointList[length - 1][1] + __OP[1];
                            break;
                                               }
                } else {
                    xStart = (style.xStart + __OP[0]) || 0;
                    xEnd = (style.xEnd + __OP[0]) || 0;
                    yStart = (style.yStart + __OP[1]) || 0;
                    yEnd = (style.yEnd + __OP[1]) || 0;
                                  }

                switch (textPosition) {
                    case 'start':
                        al = xStart < xEnd ? 'end' : 'start';
                        bl = yStart < yEnd ? 'bottom' : 'top';
                        tx = xStart;
                        ty = yStart;
                        break;
                    case 'end':
                        al = xStart < xEnd ? 'start' : 'end';
                        bl = yStart < yEnd ? 'top' : 'bottom';
                        tx = xEnd;
                        ty = yEnd;
                        break;
                }
                dd -= 4;
                if (xStart && xEnd && xStart != xEnd) {
                    tx -= (al == 'end' ? dd : -dd);
                } else {
                    al = 'center';
                }

                if (yStart != yEnd) {
                    ty -= (bl == 'bottom' ? dd : -dd);
                } else {
                    bl = 'middle';
                }
                break;
            case 'specific':
                tx = style.textX || 0;
                ty = style.textY || 0;
                al = 'start';
                bl = 'middle';
                break;
        }

        if (style.labelXOffset && !isNaN(style.labelXOffset)) {
            tx += style.labelXOffset;
        }
        if (style.labelYOffset && !isNaN(style.labelYOffset)) {
            ty += style.labelYOffset;
        }

        if (tx != null && ty != null) {
            Shape._fillText(
                ctx,
                style.text,
                tx, ty,
                style.textFont,
                style.textAlign || al,
                style.textBaseline || bl
            );
        }
    }

    modSelf() {
        this.__dirty = true;
        if (this.style) {
            this.style.__rect = null;
        }
        if (this.highlightStyle) {
            this.highlightStyle.__rect = null;
        }
    }

    isSilent() {
        return !(
            this.hoverable || this.draggable || this.clickable ||
            this.onmousemove || this.onmouseover || this.onmouseout ||
            this.onmousedown || this.onmouseup || this.onclick ||
            this.ondragenter || this.ondragover || this.ondragleave ||
            this.ondrop
        );
    }

    setCtxGlobalAlpha(_ctx, type, style) {
        if (type === "fill") {
            _ctx.globalAlpha = typeof(style["fillOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['fillOpacity'];
        } else if (type === "stroke") {
            _ctx.globalAlpha = typeof(style["strokeOpacity"]) === "undefined" ? (typeof(style["opacity"]) === "undefined" ? 1 : style['opacity']) : style['strokeOpacity'];
        } else {
            _ctx.globalAlpha = typeof(style["opacity"]) === "undefined" ? 1 : style['opacity'];
        }
    }

    static _fillText(ctx, text, x, y, textFont, textAlign, textBaseline) {
        if (textFont) {
            ctx.font = textFont;
        }
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        var rect = Shape._getTextRect(
            text, x, y, textFont, textAlign, textBaseline
        );

        text = (text + '').split('\n');

        var lineHeight = SUtil.Util_area.getTextHeight('ZH', textFont);

        switch (textBaseline) {
            case 'top':
                y = rect.y;
                break;
            case 'bottom':
                y = rect.y + lineHeight;
                break;
            default:
                y = rect.y + lineHeight / 2;
        }

        for (var i = 0, l = text.length; i < l; i++) {
            ctx.fillText(text[i], x, y);
            y += lineHeight;
        }
    }

    static _getTextRect(text, x, y, textFont, textAlign, textBaseline) {
        var width = SUtil.Util_area.getTextWidth(text, textFont);
        var lineHeight = SUtil.Util_area.getTextHeight('ZH', textFont);

        text = (text + '').split('\n');

        switch (textAlign) {
            case 'end':
            case 'right':
                x -= width;
                break;
            case 'center':
                x -= (width / 2);
                break;
        }

        switch (textBaseline) {
            case 'top':
                break;
            case 'bottom':
                y -= lineHeight * text.length;
                break;
            default:
                y -= lineHeight * text.length / 2;
        }

        return {
            x: x,
            y: y,
            width: width,
            height: lineHeight * text.length
        };
    }

}