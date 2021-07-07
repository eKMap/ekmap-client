import { Ekmap } from '../Ekmap';
import { Util as CommonUtil } from '../commontypes/Util';
import { ShapeFactory } from './feature/ShapeFactory';
import { Polygon } from './feature/Polygon';
import { Graph } from './Graph';

export class Bar3D extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "Ekmap.Feature.Theme.Bar3D";
    }

   
    destroy() {
        super.destroy();
    }

 
    assembleShapes() {
        var sets = this.setting;

        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 25, 20, 20];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        sets.axisUseArrow = (typeof(sets.axisUseArrow) !== "undefined") ? sets.axisUseArrow : true;
        sets.axisXLabelsOffset = (typeof(sets.axisXLabelsOffset) !== "undefined") ? sets.axisXLabelsOffset : [-10, 10];

        if (!this.initBaseParameter()) {
            return;
        }

        var codomain = this.DVBCodomain;
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        var dvb = this.dataViewBox;
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        } 
        
        for (let i = 0, fvLen = fv.length; i < fvLen; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }
      
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        var xsLoc = xShapeInfo.xPositions;
        var xsWdith = xShapeInfo.width;
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }
        if (!sets.axis3DParameter || isNaN(sets.axis3DParameter) || sets.axis3DParameter < 15) {
            sets.axis3DParameter = 20;
        }
        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        var offset3d = (sets.bar3DParameter && !isNaN(sets.bar3DParameter)) ? sets.bar3DParameter : 10;

        for (let i = 0; i < fv.length; i++) {
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;
            var iPoiL = xsLoc[i] - xsWdith / 2;
            var iPoiR = xsLoc[i] + xsWdith / 2;

            var bar3DTopPois = [
                [iPoiL, yPx],
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];

            var bar3DSidePois = [
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR, dvb[1]]
            ];

            var bar3DFacePois = [
                [iPoiL - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];
            if (offset3d <= 0) { 
                bar3DFacePois = [
                    [iPoiL, dvb[1]],
                    [iPoiR, dvb[1]],
                    [iPoiR, yPx],
                    [iPoiL, yPx]
                ];
            }

            var polyTopSP = new Polygon(bar3DTopPois);
            var polySideSP = new Polygon(bar3DSidePois);
            var polyFaceSP = new Polygon(bar3DFacePois);


            sets.barSideStyle = sets.barSideStyle ? sets.barSideStyle : sets.barFaceStyle;
            sets.barSideStyleByFields = sets.barSideStyleByFields ? sets.barSideStyleByFields : sets.barFaceStyleByFields;
            sets.barSideStyleByCodomain = sets.barSideStyleByCodomain ? sets.barSideStyleByCodomain : sets.barFaceStyleByCodomain;
            sets.barTopStyle = sets.barTopStyle ? sets.barTopStyle : sets.barFaceStyle;
            sets.barTopStyleByFields = sets.barTopStyleByFields ? sets.barTopStyleByFields : sets.barFaceStyleByFields;
            sets.barTopStyleByCodomain = sets.barTopStyleByCodomain ? sets.barTopStyleByCodomain : sets.barFaceStyleByCodomain;
            polyFaceSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barFaceStyle, sets.barFaceStyleByFields, sets.barFaceStyleByCodomain, i, fv[i]);
            polySideSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barSideStyle, sets.barSideStyleByFields, sets.barSideStyleByCodomain, i, fv[i]);
            polyTopSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barTopStyle, sets.barTopStyleByFields, sets.barTopStyleByCodomain, i, fv[i]);

            sets.barSideHoverStyle = sets.barSideHoverStyle ? sets.barSideHoverStyle : sets.barFaceHoverStyle;
            sets.barTopHoverStyle = sets.barTopHoverStyle ? sets.barTopHoverStyle : sets.barFaceHoverStyle;
            polyFaceSP.highlightStyle = ShapeFactory.ShapeStyleTool({ stroke: true }, sets.barFaceHoverStyle);
            polySideSP.highlightStyle = ShapeFactory.ShapeStyleTool({ stroke: true }, sets.barSideHoverStyle);
            polyTopSP.highlightStyle = ShapeFactory.ShapeStyleTool({ stroke: true }, sets.barTopHoverStyle);

            polyTopSP.refDataID = polySideSP.refDataID = polyFaceSP.refDataID = this.data.id;
            polyTopSP.isHoverByRefDataID = polySideSP.isHoverByRefDataID = polyFaceSP.isHoverByRefDataID = true;
            polyTopSP.refDataHoverGroup = polySideSP.refDataHoverGroup = polyFaceSP.refDataHoverGroup = CommonUtil.createUniqueID("lr_shg");
            polyTopSP.dataInfo = polySideSP.dataInfo = polyFaceSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            if (typeof(sets.barHoverAble) !== "undefined") {
                polyTopSP.hoverable = polySideSP.hoverable = polyFaceSP.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                polyTopSP.clickable = polySideSP.clickable = polyFaceSP.clickable = sets.barClickAble;
            }

            this.shapes.push(this.shapeFactory.createShape(polySideSP));
            this.shapes.push(this.shapeFactory.createShape(polyTopSP));
            this.shapes.push(this.shapeFactory.createShape(polyFaceSP));
        }
        this.shapesConvertToRelativeCoordinate();
    }

    calculateXShapeInfo() {
        var dvb = this.dataViewBox; 
        var sets = this.setting;
        var fvc = this.dataValues.length; 

        if (fvc < 1) {
            return null;
        }

        var xBlank;
        var xShapePositions = []; 
        var xShapeWidth = 0; 
        var dvbWidth = this.DVBWidth; 

        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 3) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1])
            if (xsLen <= fvc) {
                return null;
            }
            xShapeWidth = xsLen / fvc
        } else {
            xShapeWidth = dvbWidth / (2 * fvc + 1);
            xBlank = [xShapeWidth, xShapeWidth, xShapeWidth];
        }

        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0] + xShapeWidth / 2;
            } else {
                xOffset += (xShapeWidth + xBlank[1]);
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }
}

Ekmap.Feature.Theme.Bar3D = Bar3D;