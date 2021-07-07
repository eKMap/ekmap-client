import { Ekmap } from '../../Ekmap';
import { Point } from './Point';
import { Line } from './Line';
import { Polygon } from './Polygon';
import { Rectangle } from './Rectangle';
import { Sector } from './Sector';
import { Label } from './Label';
import { Image } from './Image';
import { Circle } from './Circle';
import { SmicPoint } from '../levelRenderer/SmicPoint';
import { SmicText } from '../levelRenderer/SmicText';
import { SmicCircle } from '../levelRenderer/SmicCircle';
import { SmicBrokenLine } from '../levelRenderer/SmicBrokenLine';
import { SmicImage } from '../levelRenderer/SmicImage';
import { SmicPolygon } from '../levelRenderer/SmicPolygon';
import { SmicRectangle } from '../levelRenderer/SmicRectangle';
import { SmicSector } from '../levelRenderer/SmicSector';
import { Util } from '../../commontypes/Util';

export class ShapeFactory {

    constructor(shapeParameters) {
        this.shapeParameters = shapeParameters;

        this.CLASS_NAME = "Ekmap.Feature.ShapeFactory";
    }

    destroy() {
        this.shapeParameters = null;
    }

    createShape(shapeParameters) {
        if (shapeParameters) {
            this.shapeParameters = shapeParameters;
        }

        if (!this.shapeParameters) {
            return null;
        }

        var sps = this.shapeParameters;
        if (sps instanceof Point) { 
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y']);

            let shape = new SmicPoint();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Line) { 
            if (!sps.pointList) {
                return null;
            }

            let style = new Object();
            style["pointList"] = sps.pointList;
            style = Util.copyAttributesWithClip(style, sps.style, ['pointList']);

            let shape = new SmicBrokenLine();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['pointList', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Polygon) { // 面
            if (!sps.pointList) {
                return null;
            }
            var data = sps.dataInfo.value;
            let style = new Object();
            style["pointList"] = sps.pointList;
            if(sps.showText){
                style["text"] = data;
                style["textPosition"] = sps.textPosition;
                style["textAlign"] = sps.textAlign;
                style["textFont"] = sps.textFont;
                style["textColor"] = sps.textColor;
                style["fontWeight"] = sps.fontWeight;
                style["fontSize"] = sps.fontSize;
                style["fontOpacity"] = sps.fontOpacity;
            }
            style = Util.copyAttributesWithClip(style, sps.style, ['pointList']);

            let shape = new SmicPolygon();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['pointList', 'style', "highlightStyle"]);
            return shape;
        } else if (sps instanceof Rectangle) { 
            if (!sps.x && !sps.y & !sps.width & !sps.height) {
                return null;
            }

            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["width"] = sps.width;
            style["height"] = sps.height;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'width', 'height']);

            let shape = new SmicRectangle();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Sector) {
            var data = sps.dataInfo.value;
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["r"] = sps.r;
            style["startAngle"] = sps.startAngle;
            style["endAngle"] = sps.endAngle;
            if(sps.showText){
                style["text"] = data;
                style["textPosition"] = sps.textPosition;
                style["textAlign"] = sps.textAlign;
                style["textFont"] = sps.textFont;
                style["textColor"] = sps.textColor;
                style["fontWeight"] = sps.fontWeight;
                style["fontSize"] = sps.fontSize;
                style["fontOpacity"] = sps.fontOpacity;
            }
           
            if (sps["r0"]) {
                style["r0"] = sps.r0
            }

            if (sps["clockWise"]) {
                style["clockWise"] = sps.clockWise
            }


            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle']);
            let shape = new SmicSector();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'r', 'startAngle', 'endAngle', 'r0', 'endAngle', 'style', 'highlightStyle']);
            return shape;
        } else if (sps instanceof Label) { 
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            style["text"] = sps.text;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'text']);

            let shape = new SmicText();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'text', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Image) { 
            let style = new Object();
            style["x"] = sps.x;
            style["y"] = sps.y;
            if (sps["image"]) {
                style["image"] = sps.image;
            }
            if (sps["width"]) {
                style["width"] = sps.width;
            }
            if (sps["height"]) {
                style["height"] = sps.height;
            }
            if (sps["sx"]) {
                style["sx"] = sps.sx;
            }
            if (sps["sy"]) {
                style["sy"] = sps.sy;
            }
            if (sps["sWidth"]) {
                style["sWidth"] = sps.sWidth
            }
            if (sps["sHeight"]) {
                style["sHeight"] = sps.sHeight
            }

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'image', 'width', 'height', 'sx', 'sy', 'sWidth', 'sHeight']);

            let shape = new SmicImage();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'image', 'width', 'height', 'style', 'highlightStyle']);

            return shape;
        } else if (sps instanceof Circle) {
            let style = new Object();
            style["x"] = sps.x;
            style["r"] = sps.r;
            style["y"] = sps.y;

            style = Util.copyAttributesWithClip(style, sps.style, ['x', 'y', 'r']);
            let shape = new SmicCircle();
            shape.style = ShapeFactory.transformStyle(style);
            shape.highlightStyle = ShapeFactory.transformStyle(sps.highlightStyle);
            Util.copyAttributesWithClip(shape, sps, ['x', 'y', 'r', 'style', 'highlightStyle', 'lineWidth', 'text', 'textPosition']);

            return shape;
        }

        return null
    }

    static transformStyle(style) {
        var newStyle = {};
        var fontStr = ["normal", "normal", "normal", "12", "arial,sans-serif"];

        var brushType = [true, false];

        for (var ss in style) {
            switch (ss) {
                case "fill":
                    brushType[0] = style[ss];
                    break;
                case "fillColor":
                    newStyle["color"] = style[ss];
                    break;
                case "stroke":
                    brushType[1] = style[ss];
                    break;
                case "strokeWidth":
                    newStyle["lineWidth"] = style[ss];
                    break;
                case "strokeLinecap":
                    newStyle["lineCap"] = style[ss];
                    break;
                case "strokeLineJoin":
                    newStyle["lineJoin"] = style[ss];
                    break;
                case "strokeDashstyle":
                    newStyle["lineType"] = style[ss];
                    break;
                case "pointRadius":
                    newStyle["r"] = style[ss];
                    break;
                case "label":
                    newStyle["text"] = style[ss];
                    break;
                case "labelRect":
                    newStyle["labelRect"] = style[ss];
                    break;
                case "fontColor":
                    newStyle["textColor"] = style[ss];
                    break;
                case "fontStyle":
                    fontStr[0] = style[ss];
                    break;
                case "fontVariant":
                    fontStr[1] = style[ss];
                    break;
                case "fontWeight":
                    fontStr[2] = style[ss];
                    break;
                case "fontSize":
                    var unit = "";
                    if (style[ss] && style[ss].toString().indexOf("px") < 0) {
                        unit = "px";
                    }
                    fontStr[3] = style[ss] + unit;
                    break;
                case "fontFamily":
                    fontStr[4] = style[ss];
                    break;
                case "fontOpacity":
                    newStyle["opacity"] = style[ss];
                    break;
                case "labelPosition":
                    newStyle["textPosition"] = style[ss];
                    break;
                case "labelAlign":
                    newStyle["textAlign"] = style[ss];
                    break;
                case "labelBaseline":
                    newStyle["textBaseline"] = style[ss];
                    break;
                case "labelRotation":
                    newStyle["textRotation"] = style[ss];
                    break;

                default:
                    newStyle[ss] = style[ss];
                    break;
            }
        }
        newStyle["textFont"] = fontStr.join(" ");

        if (brushType[0] === true && brushType[1] === false) {
            newStyle["brushType"] = "fill";
        } else if (brushType[0] === false && brushType[1] === true) {
            newStyle["brushType"] = "stroke";
        } else if (brushType[0] === true && brushType[1] === true) {
            newStyle["brushType"] = "both";
        } else {
            newStyle["brushType"] = "fill";
        }

        if (newStyle["lineWidth"] == null) {
            newStyle["lineWidth"] = 1;
        }

        return newStyle;
    }

    static Background(shapeFactory, box, setting) {
        var sets = setting ? setting : {};

        var bgSP = new Rectangle(box[0], box[3], Math.abs(box[2] - box[0]), Math.abs(box[3] - box[1]));

        bgSP.style = {
            fillColor: "#f3f3f3"
        };

        if (sets.backgroundStyle) {
            Util.copyAttributesWithClip(bgSP.style, sets.backgroundStyle);
        }

        if (sets.backgroundRadius) {
            bgSP.style["radius"] = sets.backgroundRadius;
        }

        bgSP.clickable = false;
        bgSP.hoverable = false;

        return shapeFactory.createShape(bgSP);
    }

    static GraphAxis(shapeFactory, dataViewBox, setting, xShapeInfo) {
        var dvb = dataViewBox;
        var sets = setting ? setting : {};

        var refLines = [];
        var arrows = [];
        var isAddRefLine = sets.useXReferenceLine ? sets.useXReferenceLine : false;
        var axisytick = (sets.axisYTick && !isNaN(sets.axisYTick)) ? sets.axisYTick : 0;
        var pois = [];
        var zArrowPois = [];
        var xMainPois = [];
        if (axisytick == 0) {
            xMainPois.push([dvb[0], dvb[3] - 5]);
            xMainPois.push([dvb[0], dvb[1]]);

            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                if (sets.axisUseArrow) { 
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }
            xMainPois.push([dvb[2] + 5, dvb[1]]);
        } else {
            var unitTick = Math.abs(dvb[1] - dvb[3]) / axisytick;
            var thckY = dvb[3];

            xMainPois.push([dvb[0], thckY - 5]);

            for (var i = 0; i < axisytick; i++) {
                xMainPois.push([dvb[0], thckY]);
                xMainPois.push([dvb[0] - 5, thckY]);
                xMainPois.push([dvb[0], thckY]);

                if (isAddRefLine) {
                    var refLineSP = new Line([
                        [dvb[0], thckY],
                        [dvb[2], thckY]
                    ]);
                    refLineSP.style = {
                        strokeColor: "#cfcfcf",
                        strokeLinecap: "butt",
                        strokeLineJoin: "round",
                        strokeWidth: 1
                    };
                    refLineSP.clickable = false;
                    refLineSP.hoverable = false;
                    if (sets.xReferenceLineStyle) {
                        Util.copyAttributesWithClip(refLineSP.style, sets.xReferenceLineStyle);
                    }
                    refLines.push(shapeFactory.createShape(refLineSP))
                }

                thckY += unitTick;
            }

            xMainPois.push([dvb[0], dvb[1]]);

            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                let axis3DParameter = parseInt(sets.axis3DParameter);
                let axis3DPoi = [dvb[0] - axis3DParameter, dvb[1] + axis3DParameter];

                if (sets.axisUseArrow) { 
                    zArrowPois.push([axis3DPoi[0] + 1.5, axis3DPoi[1] - 7.5]);
                    zArrowPois.push([axis3DPoi[0] - 1, axis3DPoi[1] + 1]);
                    zArrowPois.push([axis3DPoi[0] + 7.5, axis3DPoi[1] - 1.5]);
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                } else {
                    xMainPois.push([axis3DPoi[0], axis3DPoi[1]]);
                }

                xMainPois.push([dvb[0], dvb[1]]);
            }

            xMainPois.push([dvb[2] + 5, dvb[1]]);
        }
        if (sets.axisUseArrow) {
            var xArrowPois = [
                [dvb[2] + 5, dvb[1] + 4],
                [dvb[2] + 13, dvb[1]],
                [dvb[2] + 5, dvb[1] - 4]
            ];

            var yArrowPois = [
                [dvb[0] - 4, dvb[3] - 5],
                [dvb[0], dvb[3] - 13],
                [dvb[0] + 4, dvb[3] - 5]
            ];

            var xSP = new Polygon(xArrowPois);
            xSP.style = { fillColor: "#008acd" };
            Util.copyAttributesWithClip(xSP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(xSP));

            var ySP = new Polygon(yArrowPois);
            ySP.style = { fillColor: "#008acd" };
            Util.copyAttributesWithClip(ySP.style, sets.axisStyle);
            arrows.push(shapeFactory.createShape(ySP));

            if (sets.axis3DParameter && !isNaN(sets.axis3DParameter) && sets.axis3DParameter >= 15) {
                var zSP = new Polygon(zArrowPois);
                zSP.style = { fillColor: "#008acd" };
                Util.copyAttributesWithClip(zSP.style, sets.axisStyle);
                arrows.push(shapeFactory.createShape(zSP));
            }

        }
        pois = xMainPois;

        var axisSP = new Line(pois);
        axisSP.style = {
            strokeLinecap: "butt",
            strokeLineJoin: "round",
            strokeColor: "#008acd",
            strokeWidth: 1
        };
        if (sets.axisStyle) {
            Util.copyAttributesWithClip(axisSP.style, sets.axisStyle);
        }
        axisSP.clickable = false;
        axisSP.hoverable = false;
        var axisMain = [shapeFactory.createShape(axisSP)];

        var yLabels = [];
        if (sets.axisYLabels && sets.axisYLabels.length && sets.axisYLabels.length > 0) {
            var axisYLabels = sets.axisYLabels;
            let len = axisYLabels.length;

            var ylOffset = [0, 0];
            if (sets.axisYLabelsOffset && sets.axisYLabelsOffset.length) {
                ylOffset = sets.axisYLabelsOffset;
            }

            if (len == 1) {
                let labelYSP = new Label(dvb[0] - 5 + ylOffset[0], dvb[3] + ylOffset[1], axisYLabels[0]);
                labelYSP.style = {
                    labelAlign: "right"
                };
                if (sets.axisYLabelsStyle) {
                    Util.copyAttributesWithClip(labelYSP.style, sets.axisYLabelsStyle);
                }
                labelYSP.clickable = false;
                labelYSP.hoverable = false;
                yLabels.push(shapeFactory.createShape(labelYSP));
            } else {
                var labelY = dvb[3];
                var yUnit = Math.abs(dvb[1] - dvb[3]) / (len - 1);

                for (var j = 0; j < len; j++) {
                    let labelYSP = new Label(dvb[0] - 5 + ylOffset[0], labelY + ylOffset[1], axisYLabels[j]);
                    labelYSP.style = {
                        labelAlign: "right"
                    };
                    if (sets.axisYLabelsStyle) {
                        Util.copyAttributesWithClip(labelYSP.style, sets.axisYLabelsStyle);
                    }
                    labelYSP.clickable = false;
                    labelYSP.hoverable = false;
                    yLabels.push(shapeFactory.createShape(labelYSP));
                    labelY += yUnit;
                }
            }
        }

        var xLabels = [];
        if (sets.axisXLabels && sets.axisXLabels.length && sets.axisXLabels.length > 0) {
            let axisXLabels = sets.axisXLabels;
            let len = axisXLabels.length;

            let xlOffset = [0, 0];
            if (sets.axisXLabelsOffset && sets.axisXLabelsOffset.length) {
                xlOffset = sets.axisXLabelsOffset;
            }

            if (xShapeInfo && xShapeInfo.xPositions && xShapeInfo.xPositions.length && xShapeInfo.xPositions.length == len) {
                let xsCenter = xShapeInfo.xPositions;
                for (let K = 0; K < len; K++) {
                    let labelXSP = new Label(xsCenter[K] + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[K]);
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    if (sets.axisXLabelsStyle) {
                        Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    xLabels.push(shapeFactory.createShape(labelXSP));
                }
            } else {
                if (len == 1) {
                    let labelXSP = new Label(dvb[0] - 5 + xlOffset[0], dvb[1] + xlOffset[0], axisXLabels[0]);
                    labelXSP.style = {
                        labelAlign: "center",
                        labelBaseline: "top"
                    };
                    if (sets.axisXLabelsStyle) {
                        Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                    }
                    labelXSP.clickable = false;
                    labelXSP.hoverable = false;
                    xLabels.push(shapeFactory.createShape(labelXSP));
                } else {
                    let labelX = dvb[0];
                    let xUnit = Math.abs(dvb[2] - dvb[0]) / (len - 1);

                    for (let m = 0; m < len; m++) {
                        let labelXSP = new Label(labelX + xlOffset[0], dvb[1] + xlOffset[1], axisXLabels[m]);
                        labelXSP.style = {
                            labelAlign: "center",
                            labelBaseline: "top"
                        };
                        if (sets.axisXLabelsStyle) {
                            Util.copyAttributesWithClip(labelXSP.style, sets.axisXLabelsStyle);
                        }
                        labelXSP.clickable = false;
                        labelXSP.hoverable = false;
                        xLabels.push(shapeFactory.createShape(labelXSP));
                        labelX += xUnit;
                    }
                }
            }
        }

        return ((refLines.concat(axisMain)).concat(yLabels)).concat(xLabels).concat(arrows);
    }

    static ShapeStyleTool(defaultStyle, style, styleGroup, styleByCodomain, index, value) {
        var finalStyle = defaultStyle ? defaultStyle : {};

        if (style) {
            Util.copyAttributesWithClip(finalStyle, style);
        }

        if (styleGroup && styleGroup.length && typeof(index) !== "undefined" && !isNaN(index) && index >= 0) {
            if (styleGroup[index]) {
                Util.copyAttributesWithClip(finalStyle, styleGroup[index]);
            }
        }

        if (styleByCodomain && styleByCodomain.length && typeof(value) !== "undefined") {
            var dsc = styleByCodomain;
            var dscLen = dsc.length;
            var v = parseFloat(value);
            for (var i = 0; i < dscLen; i++) {
                if (dsc[i].start <= v && v < dsc[i].end) {
                    Util.copyAttributesWithClip(finalStyle, dsc[i].style);
                    break;
                }
            }
        }

        return finalStyle;
    }

}
Ekmap.Feature = Ekmap.Feature || {};
Ekmap.Feature.ShapeFactory = ShapeFactory;