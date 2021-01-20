import { Style as ol_style_Style, Fill as ol_style_Fill, Stroke as ol_style_Stroke, Icon as ol_style_Icon, Text as ol_style_Text, Circle as ol_style_Circle, RegularShape as ol_style_RegularShape } from 'ol/style';
var ekmap_common = {};

/* IE Polyfill */
// NodeList.forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
// Element.remove
if (window.Element && !Element.prototype.remove) {
    Element.prototype.remove = function() {
        if (this.parentNode) this.parentNode.removeChild(this);
    }
}
/* End Polyfill */

ekmap_common.extImgs = {};

/** Kiểm tra thiết bị truy cập trên mobile hoặc desktop
 * @api
 */
ekmap_common.isMobile = function() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}
ekmap_common.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
ekmap_common.convertStyleToRGB = function(hex, opacity) {
    if (!hex || hex == "") return null;
    var rgbStyle = ekmap_common.hexToRgb(hex);
    var rgbColor = 'rgba(' + rgbStyle.r + ', ' + rgbStyle.g + ', ' + rgbStyle.b + ', ' + opacity + ')';
    return rgbColor;
}

ekmap_common.isCompletelyContain = function(arrayID, id) {
    var flag = false;
    if (typeof(arrayID) === 'undefined') return flag;
    if (typeof(arrayID) === 'object') {
        if (id && id.indexOf(',') != -1) { //object clustered 
            var objids = id.split(',');
            var foundindex = 0;
            for (var i = 0; i < arrayID.length; i++) {
                for (var j = 0; j < objids.length; j++) {
                    if (arrayID[i] == objids[j]) {
                        foundindex++;
                        if (foundindex == objids.length)
                            return true;
                        else
                            break;
                    }
                }
            }
            return false;
        } else {
            for (var i = 0; i < arrayID.length; i++) {
                if (arrayID[i] == id) {
                    flag = true;
                    break;
                }
            }
            return flag; // arrayID.toString().indexOf(id) !== -1;
        }
    } else if (typeof(arrayID) === 'string') {
        if (arrayID === id) {
            return true;
        } else if (arrayID.indexOf(',') != -1) {
            var strArrayID = arrayID.split(',');
            for (var i = 0; i < strArrayID.length; i++) {
                if (strArrayID[i] == id) {
                    flag = true;
                    break;
                }
            }
        } else {
            if (arrayID == id)
                flag = true;
        }
    } else if (typeof(arrayID) === 'number') {
        if (arrayID == id)
            flag = true;
    }
    return flag;
}

//URL: https://github.com/anomal/RainbowVis-JS
ekmap_common.Rainbow = function(options) {
    options = options || {};
    var gradients = null;
    var minNum = options.minValue || 0;
    var maxNum = options.maxValue || 100;
    var minColor = options.minColor || 'ff0000';
    var maxColor = options.maxColor || '0000ff';
    var colours = [minColor, maxColor]; //mặc định theo màu cầu vồng
    setColours(colours);

    function setColours(spectrum) {
        if (spectrum.length < 2) {
            throw new Error('Rainbow must have two or more colours.');
        } else {
            var increment = (maxNum - minNum) / (spectrum.length - 1);
            var firstGradient = new ekmap_common.ColourGradient(options);
            firstGradient.setGradient(spectrum[0], spectrum[1]);
            firstGradient.setNumberRange(minNum, minNum + increment);
            gradients = [firstGradient];

            for (var i = 1; i < spectrum.length - 1; i++) {
                var colourGradient = new ekmap_common.ColourGradient(options);
                colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
                colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1));
                gradients[i] = colourGradient;
            }

            colours = spectrum;
        }
    }

    this.setSpectrum = function() {
        setColours(arguments);
        return this;
    }

    this.setSpectrumByArray = function(array) {
        setColours(array);
        return this;
    }

    this.colourAt = function(number) {
        if (isNaN(number)) {
            throw new TypeError(number + ' is not a number');
        } else if (gradients.length === 1) {
            return gradients[0].colourAt(number);
        } else {
            var segment = (maxNum - minNum) / (gradients.length);
            var index = Math.min(Math.floor((Math.max(number, minNum) - minNum) / segment), gradients.length - 1);
            return gradients[index].colourAt(number);
        }
    }

    this.colorAt = this.colourAt;

    this.setNumberRange = function(minNumber, maxNumber) {
        if (maxNumber > minNumber) {
            minNum = minNumber;
            maxNum = maxNumber;
            setColours(colours);
        } else {
            throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
        }
        return this;
    }
}

ekmap_common.ColourGradient = function(options) {
    options = options || {};
    var startColour = 'ff0000';
    var endColour = '0000ff';
    var minNum = options.minValue || 0;
    var maxNum = options.minValue || 100;

    this.setGradient = function(colourStart, colourEnd) {
        startColour = getHexColour(colourStart);
        endColour = getHexColour(colourEnd);
    }

    this.setNumberRange = function(minNumber, maxNumber) {
        if (maxNumber > minNumber) {
            minNum = minNumber;
            maxNum = maxNumber;
        } else {
            throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
        }
    }

    this.colourAt = function(number) {
        return calcHex(number, startColour.substring(0, 2), endColour.substring(0, 2)) +
            calcHex(number, startColour.substring(2, 4), endColour.substring(2, 4)) +
            calcHex(number, startColour.substring(4, 6), endColour.substring(4, 6));
    }

    function calcHex(number, channelStart_Base16, channelEnd_Base16) {
        var num = number;
        if (num < minNum) {
            num = minNum;
        }
        if (num > maxNum) {
            num = maxNum;
        }
        var numRange = maxNum - minNum;
        var cStart_Base10 = parseInt(channelStart_Base16, 16);
        var cEnd_Base10 = parseInt(channelEnd_Base16, 16);
        var cPerUnit = (cEnd_Base10 - cStart_Base10) / numRange;
        var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
        return formatHex(c_Base10.toString(16));
    }

    function formatHex(hex) {
        if (hex.length === 1) {
            return '0' + hex;
        } else {
            return hex;
        }
    }

    function isHexColour(string) {
        var regex = /^#?[0-9a-fA-F]{6}$/i;
        return regex.test(string);
    }

    function getHexColour(string) {
        if (isHexColour(string)) {
            return string.substring(string.length - 6, string.length);
        } else {
            var name = string.toLowerCase();
            if (colourNames.hasOwnProperty(name)) {
                return colourNames[name];
            }
            throw new Error(string + ' is not a valid colour.');
        }
    }

    var colourNames = {
        aliceblue: "F0F8FF",
        antiquewhite: "FAEBD7",
        aqua: "00FFFF",
        aquamarine: "7FFFD4",
        azure: "F0FFFF",
        beige: "F5F5DC",
        bisque: "FFE4C4",
        black: "000000",
        blanchedalmond: "FFEBCD",
        blue: "0000FF",
        blueviolet: "8A2BE2",
        brown: "A52A2A",
        burlywood: "DEB887",
        cadetblue: "5F9EA0",
        chartreuse: "7FFF00",
        chocolate: "D2691E",
        coral: "FF7F50",
        cornflowerblue: "6495ED",
        cornsilk: "FFF8DC",
        crimson: "DC143C",
        cyan: "00FFFF",
        darkblue: "00008B",
        darkcyan: "008B8B",
        darkgoldenrod: "B8860B",
        darkgray: "A9A9A9",
        darkgreen: "006400",
        darkgrey: "A9A9A9",
        darkkhaki: "BDB76B",
        darkmagenta: "8B008B",
        darkolivegreen: "556B2F",
        darkorange: "FF8C00",
        darkorchid: "9932CC",
        darkred: "8B0000",
        darksalmon: "E9967A",
        darkseagreen: "8FBC8F",
        darkslateblue: "483D8B",
        darkslategray: "2F4F4F",
        darkslategrey: "2F4F4F",
        darkturquoise: "00CED1",
        darkviolet: "9400D3",
        deeppink: "FF1493",
        deepskyblue: "00BFFF",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1E90FF",
        firebrick: "B22222",
        floralwhite: "FFFAF0",
        forestgreen: "228B22",
        fuchsia: "FF00FF",
        gainsboro: "DCDCDC",
        ghostwhite: "F8F8FF",
        gold: "FFD700",
        goldenrod: "DAA520",
        gray: "808080",
        green: "008000",
        greenyellow: "ADFF2F",
        grey: "808080",
        honeydew: "F0FFF0",
        hotpink: "FF69B4",
        indianred: "CD5C5C",
        indigo: "4B0082",
        ivory: "FFFFF0",
        khaki: "F0E68C",
        lavender: "E6E6FA",
        lavenderblush: "FFF0F5",
        lawngreen: "7CFC00",
        lemonchiffon: "FFFACD",
        lightblue: "ADD8E6",
        lightcoral: "F08080",
        lightcyan: "E0FFFF",
        lightgoldenrodyellow: "FAFAD2",
        lightgray: "D3D3D3",
        lightgreen: "90EE90",
        lightgrey: "D3D3D3",
        lightpink: "FFB6C1",
        lightsalmon: "FFA07A",
        lightseagreen: "20B2AA",
        lightskyblue: "87CEFA",
        lightslategray: "778899",
        lightslategrey: "778899",
        lightsteelblue: "B0C4DE",
        lightyellow: "FFFFE0",
        lime: "00FF00",
        limegreen: "32CD32",
        linen: "FAF0E6",
        magenta: "FF00FF",
        maroon: "800000",
        mediumaquamarine: "66CDAA",
        mediumblue: "0000CD",
        mediumorchid: "BA55D3",
        mediumpurple: "9370DB",
        mediumseagreen: "3CB371",
        mediumslateblue: "7B68EE",
        mediumspringgreen: "00FA9A",
        mediumturquoise: "48D1CC",
        mediumvioletred: "C71585",
        midnightblue: "191970",
        mintcream: "F5FFFA",
        mistyrose: "FFE4E1",
        moccasin: "FFE4B5",
        navajowhite: "FFDEAD",
        navy: "000080",
        oldlace: "FDF5E6",
        olive: "808000",
        olivedrab: "6B8E23",
        orange: "FFA500",
        orangered: "FF4500",
        orchid: "DA70D6",
        palegoldenrod: "EEE8AA",
        palegreen: "98FB98",
        paleturquoise: "AFEEEE",
        palevioletred: "DB7093",
        papayawhip: "FFEFD5",
        peachpuff: "FFDAB9",
        peru: "CD853F",
        pink: "FFC0CB",
        plum: "DDA0DD",
        powderblue: "B0E0E6",
        purple: "800080",
        red: "FF0000",
        rosybrown: "BC8F8F",
        royalblue: "4169E1",
        saddlebrown: "8B4513",
        salmon: "FA8072",
        sandybrown: "F4A460",
        seagreen: "2E8B57",
        seashell: "FFF5EE",
        sienna: "A0522D",
        silver: "C0C0C0",
        skyblue: "87CEEB",
        slateblue: "6A5ACD",
        slategray: "708090",
        slategrey: "708090",
        snow: "FFFAFA",
        springgreen: "00FF7F",
        steelblue: "4682B4",
        tan: "D2B48C",
        teal: "008080",
        thistle: "D8BFD8",
        tomato: "FF6347",
        turquoise: "40E0D0",
        violet: "EE82EE",
        wheat: "F5DEB3",
        white: "FFFFFF",
        whitesmoke: "F5F5F5",
        yellow: "FFFF00",
        yellowgreen: "9ACD32"
    }
}

ekmap_common.defaultStyle = {
    "styles": {
        "rules": [],
        "defaultStyle": {
            "externalGraphic": "",
            "graphicName": "circle",
            "pointRadius": 5,
            "graphicWidth": 25,
            "graphicHeight": 25,
            "graphicXOffset": -12.5,
            "graphicYOffset": -12.5,
            "strokeWidth": 2,
            "fillColor": "#ff0000",
            "fillOpacity": 0.8,
            "strokeColor": "#0c8a33",
            "strokeOpacity": 1,
            "typeStyle": "",
            "title": ""
        }
    }
};


/** Chuyển đổi đối tượng trình bày thành dạng image
 * @param {object} symbol : 
 * {
        "externalGraphic": "",
        "graphicName": "circle",
        "pointRadius": 5,
        "graphicWidth": 25,
        "graphicHeight": 25,
        "graphicXOffset": -12.5,
        "graphicYOffset": -12.5,
        "strokeWidth": 0.5,
        "fillColor": "#0c8a33",
        "fillOpacity": 0.7,
        "strokeColor": "#6BD2DB",
        "strokeOpacity": 0.8,
        "typeStyle": "GRAPHIC",
        "label": "Label",
        "fontColor": "#fff",
        "fontSize": "12px",
        "fontFamily": "Courier New, monospace",
        "fontWeight": "bold",
        "labelAlign": "center",
        "labelXOffset": 10,
        "labelYOffset": 10,
        "labelOutlineColor": "white",
        "labelOutlineWidth": 3
    }
 */
ekmap_common.generateCanvas = function(symbol) {
    var isChromeBrower = navigator.userAgent.indexOf("Chrome") != -1;
    var r = symbol.pointRadius;
    var canvas = document.createElement('canvas');
    canvas.width = 2 * r;
    canvas.height = 2 * r;
    var ctx = canvas.getContext('2d');
    var x = r,
        y = r;
    ctx.fillStyle = symbol.fillColor;
    ctx.strokeStyle = symbol.strokeColor;
    var lineWidth = symbol.strokeWidth;
    ctx.lineWidth = symbol.strokeWidth;
    ctx.globalAlpha = symbol.fillOpacity;
    if (symbol.strokeDashstyle) {
        if (isChromeBrower) {
            if (symbol.strokeDashstyle == "dot")
                ctx.setLineDash([1, 1 + lineWidth]);
            else if (symbol.strokeDashstyle == "dash")
                ctx.setLineDash([2 + lineWidth, 4 + lineWidth]);
            else if (symbol.strokeDashstyle == "dashdot")
                ctx.setLineDash([2 + lineWidth, 4 + lineWidth, 1]);
            else if (symbol.strokeDashstyle == "longdash")
                ctx.setLineDash([4 + lineWidth, 8 + lineWidth]);
            else if (symbol.strokeDashstyle == "longdashdot")
                ctx.setLineDash([4 + lineWidth, 8 + lineWidth, 1]);
            else if (symbol.strokeDashstyle == "solid")
                ctx.mozDash = null;

        } else {
            if (symbol.strokeDashstyle == "dot")
                ctx.mozDash = [1, 1 + lineWidth];
            else if (symbol.strokeDashstyle == "dash")
                ctx.mozDash = [2 + lineWidth, 4 + lineWidth];
            else if (symbol.strokeDashstyle == "dashdot")
                ctx.mozDash = [2 + lineWidth, 4 + lineWidth, 1];
            else if (symbol.strokeDashstyle == "longdash")
                ctx.mozDash = [4 + lineWidth, 8 + lineWidth];
            else if (symbol.strokeDashstyle == "longdashdot")
                ctx.mozDash = [4 + lineWidth, 8 + lineWidth, 1];
            else if (symbol.strokeDashstyle == "solid")
                ctx.mozDash = null;
        }

    }
    if (typeof(drawSymbol) != undefined)
        ekmap_common.drawSymbol(ctx, x, y, symbol);
    ctx.fill();
    ctx.stroke();
    return canvas;
};

ekmap_common.drawSymbol = function(ctx, x, y, c) {
    if (c.fillColor)
        ctx.fillStyle = c.fillColor;
    if (c.strokeColor)
        ctx.strokeStyle = c.strokeColor;
    ctx.globalAlpha = c.fillOpacity;
    ctx.strokeWidth = c.strokeWidth;
    var r = c.pointRadius;
    var w = c.graphicWidth;
    if (c.graphicName == 'star') {
        ekmap_common.star(ctx, x, y, r);
    } else if (c.graphicName == 'cross') {
        r = w / 4;
        ekmap_common.cross(ctx, x, y, r, w);
    } else if (c.graphicName == 'x') {
        r = w / 4;
        ekmap_common.xsymbol(ctx, x, y, r, w);
    } else if (c.graphicName == 'square') {
        ekmap_common.square(ctx, x, y, r);
    } else if (c.graphicName == 'triangle') {
        ekmap_common.triangle(ctx, x, y, r);
    } else if (c.graphicName == 'circle') {
        ekmap_common.circle(ctx, x, y, r);
    }
};

ekmap_common.star = function(ctx, x, y, r) {
    var r1 = r * 0.39;
    var sinb = 0.5877;
    var cosb = 0.8090;
    var sina = 0.9510;
    var cosa = 0.3090;
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r1 * sinb, y - r1 * cosb);
    ctx.lineTo(x + r * sina, y - r * cosa);
    ctx.lineTo(x + r1 * sina, y + r1 * cosa);
    ctx.lineTo(x + r * sinb, y + r * cosb);
    ctx.lineTo(x, y + r1);
    ctx.lineTo(x - r * sinb, y + r * cosb);
    ctx.lineTo(x - r1 * sina, y + r1 * cosa);
    ctx.lineTo(x - r * sina, y - r * cosa);
    ctx.lineTo(x - r1 * sinb, y - r1 * cosb);
    ctx.lineTo(x, y - r);
};
ekmap_common.cross = function(ctx, x, y, r, w) {
    ctx.moveTo(x + r / 2, y + r / 2);
    ctx.lineTo(x + r / 2, y + r / 2 + w / 2);
    ctx.lineTo(x - r / 2, y + r / 2 + w / 2);
    ctx.lineTo(x - r / 2, y + r / 2);
    ctx.lineTo(x - r / 2 - w / 2, y + r / 2);
    ctx.lineTo(x - r / 2 - w / 2, y - r / 2);
    ctx.lineTo(x - r / 2, y - r / 2);
    ctx.lineTo(x - r / 2, y - r / 2 - w / 2);
    ctx.lineTo(x + r / 2, y - r / 2 - w / 2);
    ctx.lineTo(x + r / 2, y - r / 2);
    ctx.lineTo(x + r / 2 + w / 2, y - r / 2);
    ctx.lineTo(x + r / 2 + w / 2, y + r / 2);
    ctx.lineTo(x + r / 2, y + r / 2);
};
ekmap_common.xsymbol = function(ctx, x, y, r, w) {
    ctx.moveTo(x + r / 2, y); //////////
    ctx.lineTo(x + r / 2 + w / 2, y + w / 2);
    ctx.lineTo(x + w / 2 - r / 2, y + w / 2);
    ctx.lineTo(x, y + r / 2); //////////
    ctx.lineTo(x - w / 2, y + w / 2);
    ctx.lineTo(x - r - w / 2, y + w / 2);
    ctx.lineTo(x - r / 2, y); /////////
    ctx.lineTo(x - r - w / 2, y - w / 2);
    ctx.lineTo(x - w / 2, y - w / 2);
    ctx.lineTo(x, y - r / 2); /////
    ctx.lineTo(x + w / 2, y - w / 2);
    ctx.lineTo(x + r + w / 2, y - w / 2);
    ctx.lineTo(x + r / 2, y);
};
ekmap_common.square = function(ctx, x, y, r) {
    ctx.rect(x - r, y - r, 2 * r, 2 * r);
};
ekmap_common.triangle = function(ctx, x, y, r) {
    ctx.moveTo(x, y - r);
    ctx.lineTo(x - r, y + r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x, y - r);
};
ekmap_common.circle = function(ctx, x, y, r) {
    ctx.moveTo(x + r, y);
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);

};

ekmap_common.convertStrokeDashstyle = function(strokeStyle) {
    strokeStyle = strokeStyle || "";
    strokeStyle = strokeStyle.toLowerCase();
    switch (strokeStyle) {
        case "dot":
            return [0.1, 10];
        case "dash":
            return [5, 5];
        case "dashdot":
            return [5, 0.1, 5];
        case "longdash":
            return [10, 10];
        case "longdashdot":
            return [10, 0.1, 10];
        default:
            return null;
    }
}

ekmap_common.convertStyle = function(defaultStyle) {
    var imageDefault = new ol_style_Circle({
        radius: defaultStyle.pointRadius,
        fill: new ol_style_Fill({
            color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
        }),
        stroke: new ol_style_Stroke({
            color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
            width: defaultStyle.strokeWidth,
            lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
        }),
    });
    if (defaultStyle.externalGraphic && defaultStyle.externalGraphic != "") {
        imageDefault = new ol_style_Icon({
            src: defaultStyle.externalGraphic,
            anchor: [0.5, 1],
        })
    } else if (defaultStyle.graphicName && defaultStyle.graphicName != "") {
        var graphicName = defaultStyle.graphicName;
        switch (graphicName) {
            case 'star':
                imageDefault = new ol_style_RegularShape({
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
                        width: defaultStyle.strokeWidth,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                    points: 5,
                    radius: defaultStyle.pointRadius,
                    radius2: parseInt(defaultStyle.pointRadius) / 2 - 1,
                    angle: 0
                });
                break;
            case 'cross':
                imageDefault = new ol_style_RegularShape({
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity),
                        width: defaultStyle.strokeWidth,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                    points: 4,
                    radius: 10,
                    radius2: 0,
                    angle: 0
                });
                break;
            case 'x':
                imageDefault = new ol_style_RegularShape({
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity),
                        width: defaultStyle.pointRadius,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                    points: 4,
                    radius: 10,
                    radius2: 0,
                    angle: Math.PI / 4
                });
                break;
            case 'square':
                imageDefault = new ol_style_RegularShape({
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
                        width: defaultStyle.strokeWidth,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                    points: 4,
                    radius: defaultStyle.pointRadius,
                    angle: Math.PI / 4
                });
                break;
            case 'triangle':
                imageDefault = new ol_style_RegularShape({
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
                        width: defaultStyle.strokeWidth,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                    points: 3,
                    radius: defaultStyle.pointRadius,
                    rotation: 0,
                    angle: 0
                });
                break;
            case 'circle':
                imageDefault = new ol_style_Circle({
                    radius: defaultStyle.pointRadius,
                    fill: new ol_style_Fill({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
                    }),
                    stroke: new ol_style_Stroke({
                        color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
                        width: defaultStyle.strokeWidth,
                        lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
                    }),
                })
                break;
        }
    }
    var style = new ol_style_Style({
        fill: new ol_style_Fill({
            color: ekmap_common.convertStyleToRGB(defaultStyle.fillColor, defaultStyle.fillOpacity)
        }),
        stroke: new ol_style_Stroke({
            color: ekmap_common.convertStyleToRGB(defaultStyle.strokeColor, defaultStyle.strokeOpacity),
            width: defaultStyle.strokeWidth,
            lineDash: ekmap_common.convertStrokeDashstyle(defaultStyle.strokeDashstyle)
        }),
        image: imageDefault
    })

    //style text
    if (defaultStyle.label && defaultStyle.label != "") {
        var fontColor = defaultStyle.fontColor || "#000";
        var fontSize = defaultStyle.fontSize || "12";
        var fontFamily = defaultStyle.fontFamily || "Arial";
        var fontWeight = defaultStyle.fontWeight || "normal";
        var labelAlign = defaultStyle.labelAlign || "center";
        var labelXOffset = defaultStyle.labelXOffset || 0;
        var labelYOffset = defaultStyle.labelYOffset || 0;
        var labelOutlineColor = defaultStyle.labelOutlineColor || "#fff";
        var labelOutlineWidth = defaultStyle.labelOutlineWidth || 2;
        fontSize = parseFloat(fontSize) + "px";
        var text = new ol_style_Text({
            overflow: true,
            text: defaultStyle.label,
            offsetX: labelXOffset,
            offsetY: labelYOffset,
            fill: new ol_style_Fill({ color: fontColor }),
            stroke: new ol_style_Stroke({ color: labelOutlineColor, width: labelOutlineWidth }),
            font: fontWeight + " " + fontSize + " " + fontFamily,
            textAlign: labelAlign
        })
        style.setText(text);
    }
    return style;
}
export default ekmap_common