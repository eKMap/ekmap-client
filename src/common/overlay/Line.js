import { Ekmap } from '../Ekmap';
import { ShapeFactory } from './feature/ShapeFactory';
import { Point } from './feature/Point';
import { Line as RenderLine } from './feature/Line';
import { Graph } from './Graph';

export class Line extends Graph {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
        this.CLASS_NAME = "Ekmap.Feature.Theme.Line";
    }

    /**
     * @function Ekmap.Feature.Theme.Line.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    assembleShapes() {
        var sets = this.setting;

        if (!sets.dataViewBoxParameter) {
            if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        if (!this.initBaseParameter()) {
            return;
        }

        var dvb = this.dataViewBox;

        var codomain = this.DVBCodomain;
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        var uv = this.DVBUnitValue;
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }

        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        var xsLoc = xShapeInfo.xPositions;

        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));


        var xPx;
        var yPx;
        var poiLists = []; 

        var shapePois = [];
        for (var i = 0, len = fv.length; i < len; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                // isDataEffective = false;
                return null;
            }

            xPx = xsLoc[i];
            yPx = dvb[1] - (fv[i] - codomain[0]) / uv;

            var poiSP = new Point(xPx, yPx);
            poiSP.style = ShapeFactory.ShapeStyleTool({ fillColor: "#ee9900" }, sets.pointStyle, sets.pointStyleByFields, sets.pointStyleByCodomain, i, fv[i]);
            poiSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.pointHoverStyle);

            if (typeof(sets.pointHoverAble) !== "undefined") {
                poiSP.hoverable = sets.pointHoverAble;
            }
            if (typeof(sets.pointClickAble) !== "undefined") {
                poiSP.clickable = sets.pointClickAble;
            }

            poiSP.refDataID = this.data.id;
            poiSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            shapePois.push(this.shapeFactory.createShape(poiSP));

            var poi = [xPx, yPx];
            poiLists.push(poi);
        }

        var lineSP = new RenderLine(poiLists);
        lineSP.style = ShapeFactory.ShapeStyleTool({ strokeColor: "#ee9900" }, sets.lineStyle);
        lineSP.clickable = false;
        lineSP.hoverable = false;
        var shapeLine = this.shapeFactory.createShape(lineSP);
        this.shapes.push(shapeLine);

        this.shapes = this.shapes.concat(shapePois);
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
        var unitOffset = 0; 

        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length == 2) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[1]);
            if (xsLen <= fvc) {
                return null;
            }
            unitOffset = xsLen / (fvc - 1);
        } else {
            unitOffset = dvbWidth / (fvc + 1);
            xBlank = [unitOffset, unitOffset, unitOffset];
        }

        var xOffset = 0
        for (var i = 0; i < fvc; i++) {
            if (i == 0) {
                xOffset = xBlank[0];
            } else {
                xOffset += unitOffset;
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }

}
Ekmap.Feature.Theme.Line = Line;