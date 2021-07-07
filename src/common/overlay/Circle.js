import { Ekmap } from '../Ekmap';
import { Theme } from './feature/Theme';
import { Circle as RenderCircle } from './feature/Circle';
import { ShapeFactory } from './feature/ShapeFactory';
import { RankSymbol } from './RankSymbol';
export class Circle extends RankSymbol {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "Ekmap.Feature.Theme.Circle";
    }

    /**
     * @function Ekmap.Feature.Theme.Circle.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    assembleShapes() {
        var defaultFillColor = "#ff9277";

        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        if (!(sets.codomain)) {
            return false;
        }

        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = Theme.getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        var fv = this.dataValues;
      
        if (!sets.maxR) {
            sets.maxR = 100;
        }
        if (!sets.minR) {
            sets.minR = 0;
        }

        var codomain = this.DVBCodomain;

        if (codomain && codomain[1] - codomain[0] > 0) {
            this.DVBUnitValue = sets.maxR / (codomain[1] - codomain[0]);
        } else {
            //this.DVBUnitValue = sets.maxR / maxValue;
            this.DVBUnitValue = sets.maxR;
        }

        var uv = this.DVBUnitValue;
        var r = fv[0] * uv + sets.minR;
        this.width = 2 * r;
        this.height = 2 * r;

        if (!this.initBaseParameter()) {
            return;
        }

        if (codomain) {
            if (fv[0] < codomain[0] || fv[0] > codomain[1]) {
                return;
            }
        }

        var dvbCenter = this.DVBCenterPoint; 

        var circleSP = new RenderCircle(dvbCenter[0], dvbCenter[1], r);

        circleSP.style = ShapeFactory.ShapeStyleTool(null, sets.circleStyle, null, null, 0);
        if (typeof(sets.fillColor) !== "undefined") {
            circleSP.style.fillColor = sets.fillColor;
        } else {
            circleSP.style.fillColor = defaultFillColor;
        }
        circleSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.circleHoverStyle);
        if (typeof(sets.circleHoverAble) !== "undefined") {
            circleSP.hoverable = sets.circleHoverAble;
        }
        if (typeof(sets.circleClickAble) !== "undefined") {
            circleSP.clickable = sets.circleClickAble;
        }

        circleSP.refDataID = this.data.id;
        circleSP.dataInfo = {
            field: this.fields[0],
            r: r,
            value: fv[0]
        };

        this.shapes.push(this.shapeFactory.createShape(circleSP));
        this.shapesConvertToRelativeCoordinate();
    }

}

Ekmap.Feature.Theme.Circle = Circle;