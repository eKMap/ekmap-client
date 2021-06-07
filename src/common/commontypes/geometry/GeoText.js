import { Ekmap } from '../../Ekmap';
import { Geometry } from '../Geometry';
import { Bounds } from '../Bounds';
import { Util } from '../Util';
import { Point } from './Point';
import './LineString';
import '../Pixel';
import '../LonLat';

export class GeoText extends Geometry {

    constructor(x, y, text) {
        super(x, y, text);
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.text = text.toString();
        this.bsInfo = {
            "h": null,
            "w": null
        };
        this.element = document.createElement('span');
        this.CLASS_NAME = "Ekmap.Geometry.GeoText";
        this.geometryType = "GeoText";
    }

    destroy() {
        super.destroy();
        this.x = null;
        this.y = null;
        this.text = null;
    }

    getCentroid() {
        return new Point(this.x, this.y);
    }

    clone(obj) {
        if (obj == null) {
            obj = new GeoText(this.x, this.y, this.text);
        }
        Util.applyDefaults(obj, this);
        return obj;
    }

    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x, this.y);
    }

    getLabelPxBoundsByLabel(locationPixel, labelWidth, labelHeight, style) {
        var labelPxBounds, left, bottom, top, right;
        var locationPx = Util.cloneObject(locationPixel);

        var theText = style.label || this.text;
        var textRows = theText.split('\n');
        var laberRows = textRows.length;

        labelWidth = parseFloat(labelWidth);
        labelHeight = parseFloat(labelHeight);
        if (laberRows > 1) {
            labelHeight = parseFloat(labelHeight) * laberRows;
        }
        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelWidth / 2;
                    locationPx.y += labelHeight / 2;
                    break;
                case "lm":
                    locationPx.x += labelWidth / 2;
                    break;
                case "lb":
                    locationPx.x += labelWidth / 2;
                    locationPx.y -= labelHeight / 2;
                    break;
                case "ct":
                    locationPx.y += labelHeight / 2;
                    break;
                case "cb":
                    locationPx.y -= labelHeight / 2;
                    break;
                case "rt":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y += labelHeight / 2;
                    break;
                case "rm":
                    locationPx.x -= labelWidth / 2;
                    break;
                case "rb":
                    locationPx.x -= labelWidth / 2;
                    locationPx.y -= labelHeight / 2;
                    break;
                default:
                    break;
            }
        }

        this.bsInfo.h = labelHeight;
        this.bsInfo.w = labelWidth;
        left = locationPx.x - parseFloat(labelWidth) / 2;
        bottom = locationPx.y + parseFloat(labelHeight) / 2;
        right = locationPx.x + parseFloat(labelWidth) / 2;
        top = locationPx.y - parseFloat(labelHeight) / 2;

        labelPxBounds = new Bounds(left, bottom, right, top);

        return labelPxBounds;
    }

    getLabelPxBoundsByText(locationPixel, style) {
        var labelPxBounds, left, bottom, top, right;
        var labelSize = this.getLabelPxSize(style);
        var locationPx = Util.cloneObject(locationPixel);

        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "lm":
                    locationPx.x += labelSize.w / 2;
                    break;
                case "lb":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "ct":
                    locationPx.y += labelSize.h / 2;
                    break;
                case "cb":
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "rt":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "rm":
                    locationPx.x -= labelSize.w / 2;
                    break;
                case "rb":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                default:
                    break;
            }
        }

        this.bsInfo.h = labelSize.h;
        this.bsInfo.w = labelSize.w;


        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        if (style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labelPxBounds = new Bounds(left, bottom, right, top);

        return labelPxBounds;
    }

    getLabelPxSize(style) {
        var text,
            fontSize,
            spacing = 1,
            lineSpacing = 0.2,
            bgstrokeWidth = parseFloat(style.strokeWidth);

        text = style.label || this.text;
        if (style.fontSize) {
            fontSize = parseFloat(style.fontSize);
        } else {
            fontSize = parseFloat("12px");
        }

        var labelW, labelH;

        var textRows = text.split('\n');
        var numRows = textRows.length;

        if (numRows > 1) {
            labelH = fontSize * numRows + numRows + bgstrokeWidth + lineSpacing * fontSize;
        } else {
            labelH = fontSize + bgstrokeWidth + lineSpacing * fontSize + 1;
        }

        labelW = 0;
        if (this.labelWTmp && labelW < this.labelWTmp) {
            labelW = this.labelWTmp;
        }
        for (var i = 0; i < numRows; i++) {
            var textCharC = this.getTextCount(textRows[i]);
            var labelWTmp = this.labelWTmp = Util.getTextBounds(style, textRows[i], this.element).textWidth + textCharC.textC * spacing + bgstrokeWidth;
            if (labelW < labelWTmp) {
                labelW = labelWTmp;
            }
        }

        var labelSize = new Object();
        labelSize.h = labelH;
        labelSize.w = labelW;

        return labelSize;
    }

    getTextCount(text) {
        var textCharCount = {};

        var cnCount = 0;
        var enCount = 0;

        for (var i = 0; i < text.length; i++) {
            if (text.charCodeAt(i) > 255) {
                cnCount++;
            } else {
                enCount++;
            }
        }
        textCharCount.cnC = cnCount;
        textCharCount.enC = enCount;
        textCharCount.textC = text.length;

        return textCharCount;
    }


}

Ekmap.Geometry.GeoText = GeoText;