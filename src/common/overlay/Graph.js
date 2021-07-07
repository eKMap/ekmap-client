
import { Ekmap } from '../Ekmap';
import { Bounds } from '../commontypes/Bounds';
import { Theme } from './feature/Theme';
import { ShapeFactory } from './feature/ShapeFactory';

export class Graph extends Theme {


    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);

      /**
         * @member {Ekmap.Feature.ShapeFactory} Ekmap.Feature.Theme.Graph.prototype.shapeFactory
         * @description Built-in graphics factory object, call its createShape method to create graphics.
         */
       this.shapeFactory = new ShapeFactory();

       /**
        * @member {Object} Ekmap.Feature.Theme.Graph.prototype.shapeParameters
        * @description The current graphics parameter object, a subclass object of <Ekmap.Feature.ShapeParameters>.
        */
       this.shapeParameters = null;

       /**
        * @member {boolean} [Ekmap.Feature.Theme.Graph.prototype.RelativeCoordinate]
        * @description Whether the graphics have calculated relative coordinates.
        */
       this.RelativeCoordinate = false;

       /**
        * @member {Object} Ekmap.Feature.Theme.Graph.prototype.setting
        * @description The chart configuration object, which controls the visual display of the chart.
        * @param {number} width-Thematic element (chart) width.
        * @param {number} height-the height of thematic element (chart).
        * @param {Array.<number>} codomain-range, a one-dimensional array of length 2, the first element represents the lower limit of the range, and the second element represents the upper limit of the range.
        * @param {number} [XOffset]-The offset value of the thematic element (chart) in the X direction, in pixels.
        * @param {number} [YOffset]-The offset value of the thematic element (chart) in the Y direction, in pixels.
        * @param {Array.<number>} [dataViewBoxParameter]-The dataViewBox parameter of the data view box, which refers to the chartBox
        * (Chart range frame composed of chart position, chart width, and chart height) The inner offset value in the four directions of left, bottom, right, and top.
        * @param {number} [decimalNumber]-data value array dataValues ​​element value decimal place, data decimal place processing parameter, value range: [0, 16].
        * If this parameter is not set, the data will not be processed with decimal places when fetching the data value.
        *
        */
       this.setting = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.origonPoint
        * @description The origin of the thematic element (chart), the pixel coordinate of the upper left corner of the chart, is a one-dimensional array of length 2. The first element represents the x coordinate, and the second element represents the y coordinate.
        */
       this.origonPoint = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.chartBox
        * @description Thematic element (chart) area, that is, the chart frame, a one-dimensional array with a length of 4. The 4 elements of the array represent the x coordinate value of the left end of the chart frame,
        * Bottom y coordinate value, right x coordinate value, upper y coordinate value; [left, bottom, right, top].
        */
       this.chartBox = null;

       /**
        * @readonly
        * @member {Ekmap.Bounds} Ekmap.Feature.Theme.Graph.prototype.chartBounds
        * @description Chart Bounds is updated with lonlat, XOffset, and YOffset. Note that chartBounds is the pixel range of the chart, not the geographic range.
        */
       this.chartBounds = null;

       /**
        * @readonly
        * @member {number} Ekmap.Feature.Theme.Graph.prototype.width
        * @description Thematic element (chart) width.
        */
       this.width = null;

       /**
        * @readonly
        * @member {number} Ekmap.Feature.Theme.Graph.prototype.height
        * @description The height of thematic element (chart).
        */
       this.height = null;

       /**
        * @readonly
        * @member {number} Ekmap.Feature.Theme.Graph.prototype.XOffset
        * @description The offset value of the thematic element (chart) in the X direction, in pixels.
        */
       this.XOffset = 0;

       /**
        * @readonly
        * @member {number} Ekmap.Feature.Theme.Graph.prototype.YOffset
        * @description The offset value of the thematic element (chart) in the Y direction, in pixels.
        */
       this.YOffset = 0;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.DVBParameter
        * @description Data view box parameter, a one-dimensional array with a length of 4 (array element value >= 0), [leftOffset, bottomOffset, rightOffset, topOffset], the inner offset value of the chartBox.
        * This attribute is used to specify the range of the dataViewBox.
        */
       this.DVBParameter = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.dataViewBox
        * @description Data view box, a one-dimensional array of length 4, [left, bottom, right, top].
        * dataViewBox is the core content of statistical thematic elements. It is responsible for explaining the visual meaning of data in a pixel area.
        * This meaning is expressed by visual graphics. These graphics representing data and some auxiliary graphics are combined to form statistical thematic charts.
        */
       this.dataViewBox = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.DVBCodomain
        * @description The data range allowed to be displayed in the data view box, a one-dimensional array with a length of 2, the first element represents the lower limit of the value range, and the second element represents the upper limit of the value range.
        * The data range allowed in dataViewBox needs to be processed in assembleShapes to deal with the case of data overflowing the value range.
        */
       this.DVBCodomain = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.DVBCenterPoint
        * @description The center point of the data view frame, a one-dimensional array of length 2. The first element represents the x coordinate, and the second element represents the y coordinate.
        */
       this.DVBCenterPoint = null;

       /**
        * @readonly
        * @member {string} Ekmap.Feature.Theme.Graph.prototype.DVBUnitValue
        * @description unit value. Initialize its specific meaning in assembleShapes(), for example: the DVBUnitValue of the pie chart can be defined as "360/data sum",
        * The DVBUnitValue of the line chart can be defined as "DVBCodomain/DVBHeight".
        */
       this.DVBUnitValue = null;

       /**
        * @readonly
        * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.DVBOrigonPoint
        * @description The origin of the data view box, the upper left corner of the data view box, a one-dimensional array of length 2, the first element represents the x coordinate, and the second element represents the y coordinate.
        */
       this.DVBOrigonPoint = null;

       /**
        * @readonly
        * @member {number} Ekmap.Feature.Theme.Graph.prototype.DVBWidth
         * @description The width of the data view box.
         */
        this.DVBWidth = null;

        /**
         * @readonly
         * @member {number} Ekmap.Feature.Theme.Graph.prototype.DVBHeight
         * @description The height of the data view frame.
         */
        this.DVBHeight = null;

        /**
         * @readonly
         * @member {Array.<number>} Ekmap.Feature.Theme.Graph.prototype.origonPointOffset
         * @description The offset of the origin of the data view frame relative to the origin of the chart frame, a one-dimensional array of length 2, the first element represents the x offset, and the second element represents the y offset.
         */
        this.origonPointOffset = null;

        this.fields = fields || [];

        this.dataValues = null;
        // chart position
        if (lonlat) {
            this.lonlat = lonlat;
        } else {
            // use bounds center by default
            this.lonlat = this.data.geometry.getBounds().getCenterLonLat();
        }

        // Configuration item detection and assignment
        if (setting && setting.width && setting.height && setting.codomain) {
            this.setting = setting;
        }
        this.CLASS_NAME = "Ekmap.Feature.Theme.Graph";

    }

    destroy() {
        this.shapeFactory = null;
        this.shapeParameters = null;
        this.width = null;
        this.height = null;
        this.origonPoint = null;
        this.chartBox = null;
        this.dataViewBox = null;
        this.chartBounds = null;
        this.DVBParameter = null;
        this.DVBOrigonPoint = null;
        this.DVBCenterPoint = null;
        this.DVBWidth = null;
        this.DVBHeight = null;
        this.DVBCodomain = null;
        this.DVBUnitValue = null;
        this.origonPointOffset = null;
        this.XOffset = null;
        this.YOffset = null;
        this.fields = null;
        this.dataValues = null;
        this.setting = null;
        super.destroy();
    }


    initBaseParameter() {
        var isSuccess = true;

        if (!this.setting) {
            return false;
        }
        var sets = this.setting;
        if (!(sets.width && sets.height && sets.codomain)) {
            return false;
        }

        var decimalNumber = (typeof(sets.decimalNumber) !== "undefined" && !isNaN(sets.decimalNumber)) ? sets.decimalNumber : -1;
        var dataEffective = Theme.getDataValues(this.data, this.fields, decimalNumber);
        this.dataValues = dataEffective ? dataEffective : [];

        this.width = parseFloat(sets.width);
        this.height = parseFloat(sets.height);
        this.DVBCodomain = sets.codomain;
        this.XOffset = sets.XOffset ? sets.XOffset : 0;
        this.YOffset = sets.YOffset ? sets.YOffset : 0;

        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter ? sets.dataViewBoxParameter : [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        this.resetLocation();

        var w = this.width;
        var h = this.height;
        var loc = this.location;

        this.origonPoint = [loc[0] - w / 2, loc[1] - h / 2];
        var op = this.origonPoint;

        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        var cb = this.chartBox;

        var dbbP = this.DVBParameter;
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        var dvb = this.dataViewBox;
        if (dvb[0] >= dvb[2] || dvb[1] <= dvb[3]) {
            return false;
        }

        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth / 2, this.DVBOrigonPoint[1] + this.DVBHeight / 2]

        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    }

    resetLocation(lonlat) {
        if (lonlat) {
            this.lonlat = lonlat;
        }

        var newLocalLX = this.getLocalXY(this.lonlat);
        newLocalLX[0] += this.XOffset;
        newLocalLX[1] += this.YOffset;
        this.location = newLocalLX;

        var w = this.width;
        var h = this.height;
        var loc = this.location;
        this.chartBounds = new Bounds(loc[0] - w / 2, loc[1] + h / 2, loc[0] + w / 2, loc[1] - h / 2);

        this.resetLinearGradient();

        return loc;
    }

    resetLinearGradient() {
    }

    shapesConvertToRelativeCoordinate() {
        var shapes = this.shapes;
        var shapeROP = this.location;
        for (var i = 0, len = shapes.length; i < len; i++) {
            shapes[i].refOriginalPosition = shapeROP;

            var style = shapes[i].style;

            for (var sty in style) {
                switch (sty) {
                    case "pointList":
                        var pl = style[sty];
                        for (var j = 0, len2 = pl.length; j < len2; j++) {
                            pl[j][0] -= shapeROP[0];
                            pl[j][1] -= shapeROP[1];
                        }
                        break;
                    case "x":
                        style[sty] -= shapeROP[0];
                        break;
                    case "y":
                        style[sty] -= shapeROP[1];
                        break;
                    default:
                        break;
                }
            }
        }
        this.RelativeCoordinate = true;
    }

    assembleShapes() {
    }

    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

}

Theme.getDataValues = function(data, fields, decimalNumber) {
    if (!data.attributes) {
        return false;
    }

    var fieldsValue = [];

    var attrs = data.attributes;
    for (var i = 0; i < fields.length; i++) {
        for (var field in attrs) {
            if (field !== fields[i]) {
                continue
            }
            try {
                if (!isNaN(decimalNumber) && decimalNumber >= 0) {
                    fieldsValue.push(parseFloat(attrs[field].toString()).toFixed(decimalNumber));
                } else {
                    fieldsValue.push(parseFloat(attrs[field].toString()));
                }
            } catch (e) {
                throw new Error("not a number")
            }
        }
    }

    if (fieldsValue.length === fields.length) {
        return fieldsValue;
    } else {
        return false;
    }
};

Ekmap.Feature.Theme.Graph = Graph;