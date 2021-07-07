import { Util } from './Util';
export class Color {
    constructor() {
        this.util = new Util();

        this._ctx = null;

        this.palette = [
            '#ff9277', ' #dddd00', ' #ffc877', ' #bbe3ff', ' #d5ffbb',
            '#bbbbff', ' #ddb000', ' #b0dd00', ' #e2bbff', ' #ffbbe3',
            '#ff7777', ' #ff9900', ' #83dd00', ' #77e3ff', ' #778fff',
            '#c877ff', ' #ff77ab', ' #ff6600', ' #aa8800', ' #77c7ff',
            '#ad77ff', ' #ff77ff', ' #dd0083', ' #777700', ' #00aa00',
            '#0088aa', ' #8400dd', ' #aa0088', ' #dd0000', ' #772e00'
        ];

        this._palette = this.palette;

        this.highlightColor = 'rgba(0,0,255,1)';

        this._highlightColor = this.highlightColor;

        this.colorRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i;

        this._nameColors = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#0ff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000',
            blanchedalmond: '#ffebcd',
            blue: '#00f',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#0ff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgrey: '#a9a9a9',
            darkgreen: '#006400',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkslategrey: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#f0f',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            gold: '#ffd700',
            goldenrod: '#daa520',
            gray: '#808080',
            grey: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavender: '#e6e6fa',
            lavenderblush: '#fff0f5',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgrey: '#d3d3d3',
            lightgreen: '#90ee90',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#789',
            lightslategrey: '#789',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#0f0',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#f0f',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370d8',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#d87093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            red: '#f00',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#fff',
            whitesmoke: '#f5f5f5',
            yellow: '#ff0',
            yellowgreen: '#9acd32'
        };

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Color";
    }

   /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.customPalette
     * @description Custom color palette.
     * @param {Array} userPalete-color palette.
     */
    customPalette(userPalete) {
        this.palette = userPalete;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.resetPalette
     * @description Reset the default color palette.
     */
    resetPalette() {
        this.palette = this._palette;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getColor
     * @description Get the color of the swatch.
     * @param {number} idx-Color swatch position.
     * @param {Array} userPalete-color palette.
     * @returns {string} Color value.
     */
    getColor(idx, userPalete) {
        idx = idx | 0;
        userPalete = userPalete || this.palette;
        return userPalete[idx% userPalete.length];
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.customHighlight
     * @description Customize the default highlight color.
     * @param {string} userHighlightColor-custom highlight color.
     */
    customHighlight(userHighlightColor) {
        this.highlightColor = userHighlightColor;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.resetHighlight
     * @description Reset the default highlight color. Use the current highlight color as the default highlight color
     */
    resetHighlight() {
        this.highlightColor = this._highlightColor;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getHighlightColor
     * @description Get the default highlight color
     * @returns {string} Color value.
     */
    getHighlightColor() {
        return this.highlightColor;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getRadialGradient
     * @description Radial gradient.
     * @param {number} x0-The abscissa of the starting point of the gradient.
     * @param {number} y0-the ordinate of the starting point of the gradient.
     * @param {number} r0-radius
     * @param {number} x1-The abscissa of the end point of the gradient.
     * @param {number} y1-The ordinate of the end point of the gradient.
     * @param {number} r1-radius
     * @param {Array} colorList-color list.
     * @returns {CanvasGradient} Cavans gradient color.
     */
    getRadialGradient(x0, y0, r0, x1, y1, r1, colorList) {
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
        for (var i = 0, l = colorList.length; i <l; i++) {

            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getLinearGradient
     * @description Linear gradient.
     * @param {number} x0-The abscissa of the starting point of the gradient.
     * @param {number} y0-the ordinate of the starting point of the gradient.
     * @param {number} x1-The abscissa of the end point of the gradient.
     * @param {number} y1-The ordinate of the end point of the gradient.
     * @param {Array} colorList-color list.
     * @returns {CanvasGradient} Cavans gradient color.
     */
    getLinearGradient(x0, y0, x1, y1, colorList) {
        var util = this.util;

        if (!this._ctx) {
            this._ctx = util.getContext();
        }
        var gradient = this._ctx.createLinearGradient(x0, y0, x1, y1);
        for (var i = 0, l = colorList.length; i <l; i++) {
            gradient.addColorStop(colorList[i][0], colorList[i][1]);
        }
        gradient.__nonRecursion = true;
        return gradient;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getStepColors
     * @description Get the gradient color array between two colors.
     * @param {Object} start-the starting color object.
     * @param {Object} end-end the color object.
     * @param {number} step-the number of gradients.
     * @returns {Array} The color array.
     */
    getStepColors(start, end, step) {
        start = this.toRGBA(start);
        end = this.toRGBA(end);
        start = this.getData(start);
        end = this.getData(end);

        var colors = [];
        var stepR = (end[0]-start[0]) / step;
        var stepG = (end[1]-start[1]) / step;
        var stepB = (end[2]-start[2]) / step;
        var stepA = (end[3]-start[3]) / step;
        // Generate color collection
        // fix by linfeng color accumulation
        for (var i = 0, r = start[0], g = start[1], b = start[2], a = start[3]; i <step; i++) {
            colors[i] = this.toColor([
                this.adjust(Math.floor(r), [0, 255]),
                this.adjust(Math.floor(g), [0, 255]),
                this.adjust(Math.floor(b), [0, 255]),
                a.toFixed(4)-0
            ],'rgba');
            r += stepR;
            g += stepG;
            b += stepB;
            a += stepA;
        }
        r = end[0];
        g = end[1];
        b = end[2];
        a = end[3];
        colors[i] = this.toColor([r, g, b, a],'rgba');
        return colors;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.getGradientColors
     * @description Get the gradient color array of the specified series.
     * @param {Array.<string>} colors-an array of colors.
     * @param {number} [step=20] The number of gradients.
     * @returns {Array.<string>} The color array.
     */
    getGradientColors(colors, step) {
        var ret = [];
        var len = colors.length;
        if (step === undefined) {
            step = 20;
        }
        if (len === 1) {
            ret = this.getStepColors(colors[0], colors[0], step);
        } else if (len> 1) {
            for (var i = 0, n = len-1; i <n; i++) {
                var steps = this.getStepColors(colors[i], colors[i + 1], step);
                if (i <n-1) {
                    steps.pop();
                }
                ret = ret.concat(steps);
            }
        }
        return ret;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toColor
     * @description The color value array is converted to the specified format color.
     * @param {Array} data-color value array.
     * @param {string} format-format, default'rgb'
     * @returns {string} color.
     */
    toColor(data, format) {
        format = format ||'rgb';
        if (data && (data.length === 3 || data.length === 4)) {
            data = this.map(data,
                function(c) {
                    return c> 1? Math.ceil(c): c;
                }
            );

            if (format.indexOf('hex')> -1) {
                return'#' + ((1 << 24) + (data[0] << 16) + (data[1] << 8) + (+data[2])).toString(16).slice(1 );
            } else if (format.indexOf('hs')> -1) {
                var sx = this.map(data.slice(1, 3),
                    function(c) {
                        return c +'%';
                    }
                );
                data[1] = sx[0];
                data[2] = sx[1];
            }

            if (format.indexOf('a')> -1) {
                if (data.length === 3) {
                    data.push(1);
                }
                data[3] = this.adjust(data[3], [0, 1]);
                return format +'(' + data.slice(0, 4).join(',') +')';
            }

            return format +'(' + data.slice(0, 3).join(',') +')';
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toArray
     * @description color string is converted to rgba array.
     * @param {string} color-color.
     * @returns {Array.<number>} Array of color values.
     */
    toArray(color) {
        color = this.trim(color);
        if (color.indexOf('rgba') <0) {
            color = this.toRGBA(color);
        }

        var data = [];
        var i = 0;
        color.replace(/[\d.]+/g, function(n) {
            if (i <3) {
                n = n | 0;
            } else {
                // Alpha
                n = +n;
            }
            data[i++] = n;
        });
        return data;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.convert
     * @description color format conversion.
     * @param {Array} data-color value array.
     * @param {string} format-format, default'rgb'
     * @returns {string} color.
     */
    convert(color, format) {
        if (!this.isCalculableColor(color)) {
            return color;
        }
        var data = this.getData(color);
        var alpha = data[3];
        if (typeof alpha ==='undefined') {
            alpha = 1;
        }

        if (color.indexOf('hsb')> -1) {
            data = this._HSV_2_RGB(data);
        } else if (color.indexOf('hsl')> -1) {
            data = this._HSL_2_RGB(data);
        }

        if (format.indexOf('hsb')> -1 || format.indexOf('hsv')> -1) {
            data = this._RGB_2_HSB(data);
        } else if (format.indexOf('hsl')> -1) {
            data = this._RGB_2_HSL(data);
        }

        data[3] = alpha;

        return this.toColor(data, format);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toRGBA
     * @description is converted to color in rgba format.
     * @param {string} color-color.
     * @returns {string} color.
     */
    toRGBA(color) {
        return this.convert(color,'rgba');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toRGB
     * @description The color converted to rgb number format.
     * @param {string} color-color.
     * @returns {string} color.
     */
    toRGB(color) {
        return this.convert(color,'rgb');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHex
     * @description is converted to hexadecimal color.
     * @param {string} color-color.
     * @returns {string} Hexadecimal color, #rrggbb format
     */
    toHex(color) {
        return this.convert(color,'hex');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSVA
     * @description is converted to HSV color.
     * @param {string} color-color.
     * @returns {string} HSVA color, hsva(h,s,v,a)
     */
    toHSVA(color) {
        return this.convert(color,'hsva');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSV
     * @description is converted to HSV color.
     * @param {string} color-color.
     * @returns {string} HSV color, hsv(h,s,v)
     */
    toHSV(color) {
        return this.convert(color,'hsv');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSBA
     * @description is converted to HSBA color.
     * @param {string} color-color.
     * @returns {string} HSBA color, hsba(h,s,b,a)
     */
    toHSBA(color) {
        return this.convert(color,'hsba');
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSB
     * @description is converted to HSB color.
     * @param {string} color-color.
     * @returns {string} HSB color, hsb(h,s,b)
     */
    toHSB(color) {return this.convert(color,'hsb');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSLA
 * @description is converted to HSLA color.
 * @param {string} color-color.
 * @returns {string} HSLA color, hsla(h,s,l,a)
 */
toHSLA(color) {
    return this.convert(color,'hsla');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.toHSL
 * @description is converted to HSL color.
 * @param {string} color-color.
 * @returns {string} HSL color, hsl(h,s,l)
 */
toHSL(color) {
    return this.convert(color,'hsl');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.toName
 * @description converts the color name.
 * @param {string} color-color.
 * @returns {string} color name
 */
toName(color) {
    for (var key in this._nameColors) {
        if (this.toHex(this._nameColors[key]) === this.toHex(color)) {
            return key;
        }
    }
    return null;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.trim
 * @description Remove extra spaces in the color.
 * @param {string} color-color.
 * @returns {string} color without spaces
 */
trim(color) {
    return String(color).replace(/\s+/g,'');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.normalize
 * @description Color standardization.
 * @param {string} color-color.
 * @returns {string} normalized color
 */
normalize(color) {
    // color name
    if (this._nameColors[color]) {
        color = this._nameColors[color];
    }
    // remove spaces
    color = this.trim(color);
    // hsv is equivalent to hsb
    color = color.replace(/hsv/i,'hsb');
    // rgb to rrggbb
    if (/^#[\da-f]{3}$/i.test(color)) {
        color = parseInt(color.slice(1), 16);
        var r = (color & 0xf00) << 8;
        var g = (color & 0xf0) << 4;
        var b = color & 0xf;

        color ='#' + ((1 << 24) + (r << 4) + r + (g << 4) + g + (b << 4) + b).toString(16).slice(1 );
    }
    // Or use the following regular replacement, but the performance under chrome is relatively poor
    // color = color.replace(/^#([\da-f])([\da-f])([\da-f])$/i,'#$1$1$2$2$3$3');
    return color;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.lift
 * @description The color is darkened or lightened. When level>0, it will deepen and when level<0, it will lighten.
 * @param {string} color-color.
 * @param {number} level-the level of rise and fall, the value range is [-1,1].
 * @returns {string} The color value after darkening or lightening
 */
lift(color, level) {
    if (!this.isCalculableColor(color)) {
        return color;
    }
    var direct = level> 0? 1: -1;
    if (typeof level ==='undefined') {
        level = 0;
    }
    level = Math.abs(level)> 1? 1: Math.abs(level);
    color = this.toRGB(color);
    var data = this.getData(color);
    for (var i = 0; i <3; i++) {
        if (direct === 1) {
            data[i] = data[i] * (1-level) | 0;
        } else {
            data[i] = ((255-data[i]) * level + data[i]) | 0;
        }
    }
    return'rgb(' + data.join(',') +')';
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.reverse
 * @description The color is flipped. [255-r,255-g,255-b,1-a]
 * @param {string} color-color.
 * @returns {string} reverse color
 */
reverse(color) {
    if (!this.isCalculableColor(color)) {
        return color;
    }
    var data = this.getData(this.toRGBA(color));
    data = this.map(data,
        function(c) {
            return 255-c;
        }
    );
    return this.toColor(data,'rgb');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.mix
 * @description Simple mixing of two colors
 * @param {string} color1-the first color.
 * @param {string} color2-The second color.
 * @param {number} weight-the mixed weight [0-1].
 * @returns {string} Result color. rgb(r,g,b) or rgba(r,g,b,a)
 */
mix(color1, color2, weight) {
    if (!this.isCalculableColor(color1) || !this.isCalculableColor(color2)) {
        return color1;
    }

    if (typeof weight ==='undefined') {
        weight = 0.5;
    }
    weight = 1-this.adjust(weight, [0, 1]);

    var w = weight * 2-1;
    var data1 = this.getData(this.toRGBA(color1));
    var data2 = this.getData(this.toRGBA(color2));

    var d = data1[3]-data2[3];

    var weight1 = (((w * d === -1)? w: (w + d) / (1 + w * d)) + 1) / 2;
    var weight2 = 1-weight1;

    var data = [];

    for (var i = 0; i <3; i++) {
        data[i] = data1[i] * weight1 + data2[i] * weight2;
    }

    var alpha = data1[3] * weight + data2[3] * (1-weight);
    alpha = Math.max(0, Math.min(1, alpha));

    if (data1[3] === 1 && data2[3] === 1) {// Do not consider transparency
        return this.toColor(data,'rgb');
    }
    data[3] = alpha;
    return this.toColor(data,'rgba');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.random
 * @description random color
 * @returns {string} color value, #rrggbb format
 */
 random() {
    return'#' + Math.random().toString(16).slice(2, 8);
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.getData
 * @description Get an array of color values ​​and return value range.
 * RGB range [0-255]
 * HSL/HSV/HSB range [0-1]
 * A transparency range [0-1]
 * Support format:
 * #rgb
 * #rrggbb
 * rgb(r,g,b)
 * rgb(r%,g%,b%)
 * rgba(r,g,b,a)
 * hsb(h,s,b) // hsv is equivalent to hsb
 * hsb(h%,s%,b%)
 * hsba(h,s,b,a)
 * hsl(h,s,l)
 * hsl(h%,s%,l%)
 * hsla(h,s,l,a)
 * @param {string} color-color.
 * @returns {Array.<number>} color value array or null
 */
getData(color) {
    color = this.normalize(color);
    var r = color.match(this.colorRegExp);
    if (r === null) {
        throw new Error('The color format error'); // Color format error
    }
    var d;
    var a;
    var data = [];
    var rgb;

    if (r[2]) {
        // #rrggbb
        d = r[2].replace('#','').split('');
        rgb = [d[0] + d[1], d[2] + d[3], d[4] + d[5]];
        data = this.map(rgb,
            function(c) {
                return Color.prototype.adjust.call(this, parseInt(c, 16), [0, 255]);
            }
        );

    } else if (r[4]) {
        // rgb rgba
        var rgba = (r[4]).split(',');
        a = rgba[3];
        rgb = rgba.slice(0, 3);
        data = this.map(
            rgb,
            function(c) {
                c = Math.floor(
                    c.indexOf('%')> 0? parseInt(c, 0) * 2.55: c
                );
                return Color.prototype.adjust.call(this, c, [0, 255]);
            }
        );

        if (typeof a !=='undefined') {
            data.push(this.adjust(parseFloat(a), [0, 1]));
        }
    } else if (r[5] || r[6]) {
        // hsb hsba hsl hsla
        var hsxa = (r[5] || r[6]).split(',');
        var h = parseInt(hsxa[0], 0) / 360;
        var s = hsxa[1];
        var x = hsxa[2];
        a = hsxa[3];
        data = this.map([s, x],
            function(c) {
                return Color.prototype.adjust.call(this, parseFloat(c) / 100, [0, 1]);
            }
        );
        data.unshift(h);
        if (typeof a !=='undefined') {
            data.push(this.adjust(parseFloat(a), [0, 1]));
        }
    }
    return data;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.alpha
 * @description set color transparency
 * @param {string} color-color.
 * @param {number} a-Transparency, interval [0,1].
 * @returns {string} rgba color value
 */
alpha(color, a) {
    if (!this.isCalculableColor(color)) {
        return color;
    }
    if (a === null) {
        a = 1;
    }
    var data = this.getData(this.toRGBA(color));
    data[3] = this.adjust(Number(a).toFixed(4), [0, 1]);

    return this.toColor(data,'rgba');
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.map
 * @description array mapping
 * @param {Array} array-array.
 * @param {function} fun-function.
 * @returns {string} Array mapping result
 */
map(array, fun) {
    if (typeof fun !=='function') {
        throw new TypeError();
    }
    var len = array? array.length: 0;
    for (var i = 0; i <len; i++) {
        array[i] = fun(array[i]);
    }
    return array;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.adjust
 * @description adjustment value range
 * @param {Array.<number>} value-array.
 * @param {Array.<number>} region-region.
 * @returns {number} adjusted value
 */
adjust(value, region) {
    // <to <= &> to >=
    // modify by linzhifeng 2014-05-25 because -0 == 0
    if (value <= region[0]) {
        value = region[0];
    } else if (value >= region[1]) {
        value = region[1];
    }
    return value;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype.isCalculableColor
 * @description determines whether it is a computable color
 * @param {string} color-color.
 * @returns {boolean} is it a computable color
 */
isCalculableColor(color) {
    return color instanceof Array || typeof color ==='string';
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype._HSV_2_RGB. See {@link http://www.easyrgb.com/index.php?X=MATH}
 */
_HSV_2_RGB(data) {
    var H = data[0];
    var S = data[1];
    var V = data[2];
    // HSV from 0 to 1
    var R;
    var G;
    var B;
    if (S === 0) {
        R = V * 255;
        G = V * 255;
        B = V * 255;
    } else {
        var h = H * 6;
        if (h === 6) {
            h = 0;
        }
        var i = h | 0;
        var v1 = V * (1-S);
        var v2 = V * (1-S * (h-i));
        var v3 = V * (1-S * (1-(h-i)));
        var r = 0;
        var g = 0;
        var b = 0;

        if(i === 0) {
            r = V;
            g = v3;
            b = v1;
        } else if (i === 1) {
            r = v2;
            g = V;
            b = v1;
        } else if (i === 2) {
            r = v1;
            g = V;
            b = v3;
        } else if (i === 3) {
            r = v1;
            g = v2;
            b = V;
        } else if (i === 4) {
            r = v3;
            g = v1;
            b = V;
        } else {
            r = V;
            g = v1;
            b = v2;
        }

        // RGB results from 0 to 255
        R = r * 255;
        G = g * 255;
        B = b * 255;
    }
    return [R, G, B];
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype._HSL_2_RGB. See {@link http://www.easyrgb.com/index.php?X=MATH}
 */
_HSL_2_RGB(data) {
    var H = data[0];
    var S = data[1];
    var L = data[2];
    // HSL from 0 to 1
    var R;
    var G;
    var B;
    if (S === 0) {
        R = L * 255;
        G = L * 255;
        B = L * 255;
    } else {
        var v2;
        if (L <0.5) {
            v2 = L * (1 + S);
        } else {
            v2 = (L + S)-(S * L);
        }

        var v1 = 2 * L-v2;

        R = 255 * this._HUE_2_RGB(v1, v2, H + (1 / 3));
        G = 255 * this._HUE_2_RGB(v1, v2, H);
        B = 255 * this._HUE_2_RGB(v1, v2, H-(1 / 3));
    }
    return [R, G, B];
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype._HUE_2_RGB. See {@link http://www.easyrgb.com/index.php?X=MATH}
 */
_HUE_2_RGB(v1, v2, vH) {
    if (vH <0) {
        vH += 1;
    }
    if (vH> 1) {
        vH -= 1;
    }
    if ((6 * vH) <1) {
        return (v1 + (v2-v1) * 6 * vH);
    }
    if ((2 * vH) <1) {
        return (v2);
    }
    if ((3 * vH) <2) {
        return (v1 + (v2-v1) * ((2 / 3)-vH) * 6);
    }
    return v1;
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype._RGB_2_HSB. See {@link http://www.easyrgb.com/index.php?X=MATH}
 */
_RGB_2_HSB(data) {
    // RGB from 0 to 255
    var R = (data[0] / 255);
    var G = (data[1] / 255);
    var B = (data[2] / 255);

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax-vMin; // Delta RGB value
    var V = vMax;
    var H;
    var S;

    // HSV results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    } else {
        S = delta / vMax;

        var deltaR = (((vMax-R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax-G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax-B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB-deltaG;
        } else if (G === vMax) {
            H = (1 / 3) + deltaR-deltaB;
        } else if (B === vMax) {
            H = (2 / 3) + deltaG-deltaR;
        }

        if (H <0) {
            H += 1;
        }
        if (H> 1) {
            H -= 1;
        }
    }
    H = H * 360;
    S = S * 100;
    V = V * 100;
    return [H, S, V];
}

/**
 * @function Ekmap.LevelRenderer.Tool.Color.prototype._RGB_2_HSL. See {@link http://www.easyrgb.com/index.php?X=MATH}
 */
_RGB_2_HSL(data) {

    // RGB from 0 to 255
    var R = (data[0] / 255);
    var G = (data[1] / 255);
    var B = (data[2] / 255);

    var vMin = Math.min(R, G, B); // Min. value of RGB
    var vMax = Math.max(R, G, B); // Max. value of RGB
    var delta = vMax-vMin; // Delta RGB value

    var L = (vMax + vMin) / 2;
    var H;
    var S;
    // HSL results from 0 to 1
    if (delta === 0) {
        H = 0;
        S = 0;
    } else {
        if (L <0.5) {
            S = delta / (vMax + vMin);
        } else {
            S = delta / (2-vMax-vMin);
        }

        var deltaR = (((vMax-R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax-G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax-B) / 6) + (delta / 2)) / delta;

        if (R === vMax) {
            H = deltaB-deltaG;
        } else if (G === vMax) {
            H = (1 / 3) + deltaR-deltaB;
        } else if (B === vMax) {
            H = (2 / 3) + deltaG-deltaR;
        }

        if (H <0) {
            H += 1;
        }

        if (H> 1) {
            H -= 1;
        }
    }

    H = H * 360;
    S = S * 100;
    L = L * 100;

    return [H, S, L];
}

}