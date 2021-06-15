import { Ekmap } from '../Ekmap';
import { ShapeFactory } from './feature/ShapeFactory';
import { Sector } from './feature/Sector';
import { Graph } from './Graph';

/**
 * @class Ekmap.Feature.Theme.Ring
 * @classdesc Ring graph.
 * @category Visualization Theme
 * @description The parameter class for calculating the M value of the specified point based on the route object. Provide parameter information through this class.
 
 * @param {Ekmap.Feature.Vector} data User data.
 * @param {Ekmap.Layer.Graph} layer The layer of this thematic feature.
 * @param {Array.<string>} fields The name of the field in the data that participated in the generation of this chart.
 * @param {Ekmap.Feature.Theme.Ring.setting} setting Chart configuration object.
 * @param {Ekmap.LonLat} lonlat Geographic location of thematic elements. The default is the Bounds center of the geographic feature referred to by data.
 * @example
 * // sectorStyleByCodomain Each element of is an object containing range information and style information corresponding to the range. This object (must) have three attributes:
 * // start: The lower limit of the value range (inclusive);
 * // end: The upper limit of the value range (not included);
 * // style: The style of the data visualization graph, the settable attributes of this style object: <Ekmap.Feature.ShapeParameters.Sector.style>.
 * // sectorStyleByCodomain The array looks like:
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
 * @param {Object} sectorHoverStyle=true The style of the circle graph in the fan-shaped hover state, valid when sectorHoverAble is true.
 * @param {boolean} sectorHoverAble=true Whether to allow the circle graph sector to use the hover state. At the same time, setting sectorHoverAble and sectorClickAble to false can directly block the response of the ring graph sector to thematic layer events.
 * @param {boolean} sectorClickAble=true Whether to allow the circular graph sector to be clicked. At the same time, setting sectorHoverAble and sectorClickAble to false can directly block the response of the ring graph sector to thematic layer events.
 *
 * @extends {Ekmap.Feature.Theme.Graph}
 */
export class Ring extends Graph {

    constructor(data, layer, fields, setting, lonlat) {
        super(data, layer, fields, setting, lonlat);
        this.CLASS_NAME = "Ekmap.Feature.Theme.Ring";
    }

    /**
     * @function Ekmap.Feature.Theme.Ring.prototype.destroy
     * @description Destroy this thematic element. After calling destroy, all properties of this object are set to null.
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.Feature.Theme.Ring.prototype.assembleShapes
     * @description Assembly graphics (extension interface).
     */
    assembleShapes() {
        if (!this.initBaseParameter()) {
            return;
        }

        var defaultStyleGroup = [
            { fillColor: "#ff9277" }, { fillColor: "#dddd00" }, { fillColor: "#ffc877" }, { fillColor: "#bbe3ff" }, { fillColor: "#d5ffbb" },
            { fillColor: "#bbbbff" }, { fillColor: "#ddb000" }, { fillColor: "#b0dd00" }, { fillColor: "#e2bbff" }, { fillColor: "#ffbbe3" },
            { fillColor: "#ff7777" }, { fillColor: "#ff9900" }, { fillColor: "#83dd00" }, { fillColor: "#77e3ff" }, { fillColor: "#778fff" },
            { fillColor: "#c877ff" }, { fillColor: "#ff77ab" }, { fillColor: "#ff6600" }, { fillColor: "#aa8800" }, { fillColor: "#77c7ff" },
            { fillColor: "#ad77ff" }, { fillColor: "#ff77ff" }, { fillColor: "#dd0083" }, { fillColor: "#777700" }, { fillColor: "#00aa00" },
            { fillColor: "#0088aa" }, { fillColor: "#8400dd" }, { fillColor: "#aa0088" }, { fillColor: "#dd0000" }, { fillColor: "#772e00" }
        ];

        var sets = this.setting;

        if (sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        } 

        var codomain = this.DVBCodomain;
        for (let i = 0; i < fv.length; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        var valueSum = 0;
        for (let i = 0; i < fv.length; i++) {
            valueSum += Math.abs(fv[i]);
        }

        this.DVBUnitValue = 360 / valueSum;
        var uv = this.DVBUnitValue;

        var dvbCenter = this.DVBCenterPoint; 

        var startAngle = 0; 
        var endAngle = 0;
        var startAngleTmp = startAngle;
        var r
        if(sets.radius)
            r = sets.radius
        else
            r = this.DVBHeight < this.DVBWidth ? this.DVBHeight / 2 : this.DVBWidth / 2;

        var isInRange = sets.innerRingRadius >= 0 && sets.innerRingRadius < r;
        var r0 = (
            typeof(sets.innerRingRadius) !== "undefined" &&
            !isNaN(sets.innerRingRadius) &&
            isInRange
        ) ? sets.innerRingRadius : 0;

        for (var i = 0; i < fv.length; i++) {
            var fvi = Math.abs(fv[i]);

            if (i === 0) {
                endAngle = startAngle + fvi * uv;
            } else if (i === fvi.length - 1) {
                endAngle = startAngleTmp;
            } else {
                endAngle = startAngle + fvi * uv;
            }

            var sectorSP = new Sector(dvbCenter[0], dvbCenter[1], r, startAngle, endAngle, r0);
            if (typeof(sets.sectorStyleByFields) === "undefined") {
                var colorIndex = i % defaultStyleGroup.length;
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, defaultStyleGroup, null, colorIndex);
            } else {
                sectorSP.style = ShapeFactory.ShapeStyleTool(null, sets.sectorStyle, sets.sectorStyleByFields, sets.sectorStyleByCodomain, i, fv[i]);
            }
            sectorSP.highlightStyle = ShapeFactory.ShapeStyleTool(null, sets.sectorHoverStyle);
            if (typeof(sets.sectorHoverAble) !== "undefined") {
                sectorSP.hoverable = sets.sectorHoverAble;
            }
            if (typeof(sets.sectorClickAble) !== "undefined") {
                sectorSP.clickable = sets.sectorClickAble;
            }
            sectorSP.refDataID = this.data.id;
            sectorSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };
            //Text
            sectorSP.showText = sets.showText;
            sectorSP.textColor = sets.textColor;
            sectorSP.textFont = sets.textFont;
            sectorSP.textPosition = sets.textPosition;
            sectorSP.textAlign = sets.textAlign;
            sectorSP.fontWeight = sets.fontWeight;
            sectorSP.fontSize = sets.fontSize;
            sectorSP.fontOpacity = sets.fontOpacity;

            this.shapes.push(this.shapeFactory.createShape(sectorSP));

            startAngle = endAngle;
        }

        this.shapesConvertToRelativeCoordinate();
    }

}

/**
 * @typedef {Object} Ekmap.Feature.Theme.Ring.setting
 * @property {number} width Thematic element (chart) width.
 * @property {number} height The height of thematic elements (charts).
 * @property {Array.<number>} codomain The data range that the chart allows to display is a one-dimensional array of length 2. The first element represents the lower limit of the value range, and the second element represents the upper limit of the value range.
 * @property {number} XOffset The offset value of the thematic element (chart) in the X direction, in pixels.
 * @property {number} YOffset The offset value of the thematic element (chart) in the Y direction, in pixels.
 * @property {Array.<number>} dataViewBoxParameter=[0, 0, 0, 0] Data View Box dataViewBox parameter, it refers to the inner offset value of the chart box chartBox (chart range box composed of chart position, chart width, and chart height) in the left, bottom, right, and top directions.
 * @property {number} decimalNumber Data value array dataValues element value decimal places, data decimal place processing parameters, value range: [0, 16]. If this parameter is not set, the data will not be processed with decimal places when fetching the data value.
 * @property {boolean} useBackground=false Whether to use the chart background frame.
 * @property {Ekmap.Feature.ShapeParameters.Rectangle.style} backgroundStyle Background style, this style object can set attributes.
 * @property {Array.<number>} backgroundRadius=[0, 0, 0, 0] The corner radius of the background frame rectangle, you can use an array to specify the corner radius of the four corners, set: the radius of the upper left, upper right, lower right, and lower left corners are r1, r2, r3, r4, then backgroundRadius is [r1 r2, r3, r4 ].
 * @property {number} innerRingRadius=0 The radius of the inner ring of the ring graph, the value range is greater than 0 and smaller than the radius of the outer ring (outer ring radius: one half of the smaller value of the data view frame length and width).
 * @property {Ekmap.Feature.ShapeParameters.Sector.style} sectorStyleThe basic style of the sector in the ring chart. This parameter controls the basic style of the sector in the ring chart. The priority is lower than sectorStyleByFields and sectorStyleByCodomain.
 * @property {Array.<Ekmap.Feature.ShapeParameters.Sector.style>} sectorStyleByFields By theme field themeFields ({@link Ekmap.Layer.Graph.themeFields}|{@link L.Ekmap.graphThemeLayer.themeFields}|{@link ol.source.Graph.themeFields}|{@link mapboxgl.Ekmap.GraphThemeLayer .themeFields}) Assign style to the circle graph sector. This parameter controls the circle graph sector style according to the field. The priority is lower than sectorStyleByCodomain and higher than sectorStyle. The elements in this array are style objects. The style in this parameter corresponds to the fields in themeFields one-to-one. For example: themeFields (<Ekmap.Layer.Graph.themeFields>) is ["POP_1992", "POP_1995", "POP_1999"], sectorStyleByFields is [style1, style2, style3], then in the chart, the field POP_1992 corresponds to the ring The graph sector uses style1, the circular graph sector corresponding to the field POP_1995 uses style2, and the circular graph sector corresponding to the field POP_1999 uses style3.
 * @property {Array.<Ekmap.Feature.ShapeParameters.Sector.style>} sectorStyleByCodomain  Control the fan-shaped style of the ring-shaped chart according to the range of the data value represented by the fan-shaped ring-shaped chart, and the priority is higher than that of sectorStyle and sectorStyleByFields.
 
 */

Ekmap.Feature.Theme.Ring = Ring;