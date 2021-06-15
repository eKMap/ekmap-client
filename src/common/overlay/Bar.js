import { Ekmap } from '../Ekmap';
import { ShapeFactory } from './feature/ShapeFactory';
import { Polygon } from './feature/Polygon';
import { Color } from './levelRenderer/Color';
import { Util as CommonUtil } from '../commontypes/Util';
import { Graph } from './Graph';
import './feature/Label';
import './feature/Line';





/**
 * @class Ekmap.Feature.Theme.Bar
 * @classdesc Histogram.
 * @category Visualization Theme
 * @example
 * // barStyleByCodomain The parameter usage is as follows:
 * // barStyleByCodomain Each element of is an object containing range information and style information corresponding to the range. This object (must) have three attributes:
 * // start: The lower limit of the value range (inclusive);
 * // end: The upper limit of the value range (not included);
 * // style: The style of the data visualization graph, the settable attributes of this style object: <Ekmap.Feature.ShapeParameters.Polygon.style>.
 * // barStyleByCodomain The array looks like:
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 * @extends Ekmap.Feature.Theme.Graph
 * @param {Ekmap.Feature.Vector} data User data.
 * @param {Ekmap.Layer.Graph} layer The layer of this thematic feature.
 * @param {Array.<string>} fields The name of the attribute field in the data attribute that participates in the generation of this chart.
 * @param {Ekmap.Feature.Theme.Bar.setting} setting Chart configuration object.
 * @param {Ekmap.LonLat} lonlat Geographic location of thematic elements. The default is the Bounds center of the geographic feature referred to by data.
 */
export class Bar extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "Ekmap.Feature.Theme.Bar";
    }

    /**
     * @function Ekmap.Feature.Theme.Bar.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.Feature.Theme.Bar.prototype.assembleShapes
     * @description Chart graph assembly function.
     */
    assembleShapes() {
        var deafaultColors = [
            ["#00FF00", "#00CD00"],
            ["#00CCFF", "#5E87A2"],
            ["#00FF66", "#669985"],
            ["#CCFF00", "#94A25E"],
            ["#FF9900", "#A2945E"]
        ];

        var deafaultShawdow = {
            showShadow: true,
            shadowBlur: 8,
            shadowColor: "rgba(100,100,100,0.8)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
        };

        var sets = this.setting;
        if (!sets.barLinearGradient) {
            sets.barLinearGradient = deafaultColors;
        }

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

        // 背景框，默认启用
        if (typeof(sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        if (typeof(sets.useAxis) === "undefined" || sets.useAxis) {
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        for (var i = 0; i < fv.length; i++) {
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;

            var poiLists = [
                [xsLoc[i] - xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, yPx],
                [xsLoc[i] - xsWdith / 2, yPx]
            ];

            var barParams = new Polygon(poiLists);

            if (typeof(sets.showShadow) === "undefined" || sets.showShadow) {
                if (sets.barShadowStyle) {
                    var sss = sets.barShadowStyle;
                    if (sss.shadowBlur) {
                        deafaultShawdow.shadowBlur = sss.shadowBlur;
                    }
                    if (sss.shadowColor) {
                        deafaultShawdow.shadowColor = sss.shadowColor;
                    }
                    if (sss.shadowOffsetX) {
                        deafaultShawdow.shadowOffsetX = sss.shadowOffsetX;
                    }
                    if (sss.shadowOffsetY) {
                        deafaultShawdow.shadowOffsetY = sss.shadowOffsetY;
                    }
                }
                barParams.style = {};
                CommonUtil.copyAttributesWithClip(barParams.style, deafaultShawdow);
            }

            barParams.refDataID = this.data.id;
            barParams.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            if (typeof(sets.barHoverAble) !== "undefined") {
                barParams.hoverable = sets.barHoverAble;
            }
            if (typeof(sets.barClickAble) !== "undefined") {
                barParams.clickable = sets.barClickAble;
            }
            //Text
            barParams.showText = sets.showText;
            barParams.textColor = sets.textColor;
            barParams.textFont = sets.textFont;
            barParams.textPosition = sets.textPosition;
            barParams.textAlign = sets.textAlign;
            barParams.fontWeight = sets.fontWeight;
            barParams.fontSize = sets.fontSize;
            barParams.fontOpacity = sets.fontOpacity;
            this.shapes.push(this.shapeFactory.createShape(barParams));
        }

        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function Ekmap.Feature.Theme.Bar.prototype.calculateXShapeInfo
     * @description Calculate the graphic information on the X axis. This information is an object and contains two attributes,
      * The attribute xPositions is a one-dimensional array, the array element represents the pixel coordinate value of the graphic in the x-axis direction,
      * If the graph has a certain width in the x direction, the center point of the graph in the x direction is usually taken as the coordinate value of the graph in the x direction.
      * width represents the width of the graph (special attention: the width of the point is always 0, not its diameter).
      * Attributes of the graphic configuration object setting in this function can be set:
      * xShapeBlank-{Array.<number>} The graphic blank interval parameter in the horizontal direction.
      * An array of length 3, the first element represents the blank space between the left end of the first graph and the left end of the data view frame, and the second element represents the blank space between the graphs.
      * The third element represents the blank space between the right end of the last graph and the right end of the data view frame.
     * @returns {Object} If the calculation fails, return null; if the calculation succeeds, return the graphic information in the X-axis direction. This information is an object and contains the following two properties:
      * xPositions-{Array.<number>} represents the pixel coordinate value of the graphic in the x-axis direction. If the graphic has a certain width in the x direction, usually the center point of the graphic in the x direction is taken as the coordinate of the graphic in the x direction value.
      * width-{number} represents the width of the graph (special note: the width of the point is always 0, not its diameter).
     *
     */
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
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1]);
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

    /**
     * @function Ekmap.Feature.Theme.Bar.prototype.resetLinearGradient
     * @description When the relative coordinates of the chart exist, recalculate the color of the gradient (currently used for two-dimensional histograms, so subclasses implement this method).
     */
    resetLinearGradient() {
        if (this.RelativeCoordinate) {
            var shpelength = this.shapes.length;
            var barLinearGradient = this.setting.barLinearGradient;
            var index = -1;
            for (var i = 0; i < shpelength; i++) {
                var shape = this.shapes[i];
                if (shape.CLASS_NAME === "Ekmap.LevelRenderer.Shape.SmicPolygon") {
                    var style = shape.style;
                    var x1 = this.location[0] + style.pointList[0][0];
                    var x2 = this.location[0] + style.pointList[1][0];

                    index++;
                    if (index >= barLinearGradient.length) {
                        index = index % barLinearGradient.length;
                    }
                    var color1 = barLinearGradient[index][0];
                    var color2 = barLinearGradient[index][1];

                    var zcolor = new Color();
                    var linearGradient = zcolor.getLinearGradient(x1, 0, x2, 0, [
                        [0, color1],
                        [1, color2]
                    ]);

                    shape.style.color = linearGradient;
                }
            }
        }
    }

}

/**
 * @typedef {Object} Ekmap.Feature.Theme.Bar.setting
 * @property {number} width Thematic element (chart) width.
 * @property {number} height Thematic element (chart) height.
 * @property {Array.<number>} codomain The data range that the chart allows to display is a one-dimensional array of length 2. The first element represents the lower limit of the value range, and the second element represents the upper limit of the value range.
 * @property {number} XOffset The offset value of the thematic element (chart) in the X direction, in pixels.
 * @property {number} YOffset The offset value of the thematic element (chart) in the Y direction, in pixels.
 * @property {Array.<number>} dataViewBoxParameter The data view box dataViewBox parameter, which refers to the chart box chartBox (the chart range box composed of chart position, chart width, and chart height)
  * The internal offset values in the left, down, right, and up directions. When using coordinate axes, the default value of dataViewBoxParameter is: [45, 15, 15, 15];
  * When the coordinate axis is not used, the default value of dataViewBoxParameter is: [5, 5, 5, 5].
 * @property {number} decimalNumber Data value array dataValues element value decimal places, data decimal place processing parameters, value range: [0, 16]. If this parameter is not set, the data will not be processed with decimal places when fetching the data value.
 * @property {boolean} useBackground=true Whether to use the chart background frame.
 * @property {Ekmap.Feature.ShapeParameters.Rectangle.style} backgroundStyle Background style。
 * @property {Array.<number>} backgroundRadius=[0, 0, 0, 0] The corner radius of the background frame rectangle, you can use an array to specify the corner radius of the four corners, set: the radius of the upper left, upper right, lower right, and lower left corners are r1, r2, r3, r4,
  * The backgroundRadius is [r1, r2, r3, r4].
 * @property {Array.<number>} xShapeBlank Graphical blank interval parameter in the horizontal direction. An array of length 3. The first element represents the blank space between the left end of the first graph and the left end of the data view frame, and the second element represents the blank space between the graphs.
  * The third element represents the blank space between the right end of the last graph and the right end of the data view frame.
 * @property {boolean} showShadow=true Shadow switch.
 * @property {Object} barShadowStyle Shadow style, such as: {shadowBlur: 8, shadowOffsetX: 2, shadowOffsetY: 2, shadowColor: "rgba(100,100,100,0.8)"}
 * @property {Array.<string>} barLinearGradient Set the bar style according to the field [gradient start color, gradient end color] corresponds to the fields in themeLayer.themeFields one by one),
  * For example: [["#00FF00","#00CD00"],["#00CCFF","#5E87A2"],["#00FF66","#669985"],["#CCFF00","#94A25E" ],["#FF9900","#A2945E"]]
 * @property {boolean} useAxis=true Whether to use coordinate axes. </br>
 * @property {Ekmap.Feature.ShapeParameters.Line.style} axisStyle Axis style.
 * @property {boolean} axisUseArrow=false Whether to use arrows for the axis.
 * @property {number} axisYTick=0 The number of y-axis ticks.
 * @property {Array.<string>}  axisYLabels The content of the label group on the y-axis, the label sequence is arranged equidistantly from top to bottom along the left side of the data view frame. For example: ["1000", "750", "500", "250", "0"].
 * @property {Ekmap.Feature.ShapeParameters.Label.style} axisYLabelsStyle The label group style on the y-axis.
 * @property {Array.<number>} axisYLabelsOffset=[0,0] The offset of the label group on the y-axis. An array of length 2. The first item of the array represents the horizontal offset of the y-axis label group, and the left is positive; the second item of the array represents the vertical offset of the y-axis label group, and the downward is positive.
 * @property {Array.<string>}  axisXLabels The content of the label group on the x-axis, the label sequence is arranged from left to right along the bottom of the data view frame, for example: ["92 years", "95 years", "99 years"]. Label arrangement rules: when the number of labels is the same as the number of attributes xShapeCenter in xShapeInfo (that is, the number of labels is equal to the number of data), the labels are arranged according to the position provided by xShapeCenter, otherwise they are arranged equidistantly along the edge of the data view frame label.
 * @property {Ekmap.Feature.ShapeParameters.Label.style} [axisXLabelsStyle] - x 轴上的标签组样式。
 * @property {Array.<number>} axisXLabelsOffset=[0,0] The offset of the label group on the x-axis. An array of length 2. The first item of the array represents the horizontal offset of the x-axis label group, and the left is positive; the second item of the array represents the vertical offset of the x-axis label group, and the downward is positive.
 * @property {boolean} useXReferenceLine Whether to use the horizontal reference line. If true, it is valid when axisYTick is greater than 0. The horizontal reference line is the extension of the y-axis scale in the data view frame.
 * @property {Ekmap.Feature.ShapeParameters.Line.style} xReferenceLineStyle Horizontal guide line style.
 * @property {Object} barStyle The basic style of the bar of the histogram, this parameter controls the basic style of the bar, the priority is lower than barStyleByFields and barStyleByCodomain.
 * @property {Array.<Ekmap.Feature.ShapeParameters.Polygon.style>} barStyleByFields According to the theme field themeFields (<Ekmap.Layer.Graph.themeFields|L.Ekmap.graphThemeLayer.themeFields|ol.source.Graph.themeFields|mapboxgl.Ekmap.GraphThemeLayer.themeFields>) to assign style to the column, this parameter is based on the field Control the bar style, priority is lower than barStyleByCodomain, higher than barStyle. The elements in this array are style objects. The style in this parameter corresponds to the fields in themeFields one-to-one. For example: themeFields (<Ekmap.Layer.Graph.themeFields>) is ["POP_1992", "POP_1995", "POP_1999"], barStyleByFields is [style1, style2, style3], then in the chart, the column corresponding to the field POP_1992 Use style1, the column corresponding to the field POP_1995 uses style2, and the column corresponding to the field POP_1999 uses style3.
 * @property {Array.<Ekmap.Feature.ShapeParameters.Polygon.style>} barStyleByCodomain The bar style is controlled according to the range of the data value represented by the bar, and the priority is higher than barStyle and barStyleByFields.
 * @property {Object} barHoverStyle The style of the bar in hover state, valid when barHoverAble is true.
 * @property {Object} barHoverAble Whether to allow the bar to use hover state, it is allowed by default. At the same time, setting barHoverAble and barClickAble to false can directly block the bar's response to thematic layer events.
 * @property {Object} barClickAble Whether to allow the bar to be clicked, it is allowed by default. At the same time, setting barHoverAble and barClickAble to false can directly block the bar's response to thematic layer events.
 */

Ekmap.Feature.Theme.Bar = Bar;