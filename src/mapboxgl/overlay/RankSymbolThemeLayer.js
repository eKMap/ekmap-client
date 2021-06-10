import '../core/Base';
import { GraphThemeLayer } from './GraphThemeLayer';
import { FeatureTheme } from '../../common';

/**
 * @class mapboxgl.ekmap.RankSymbolThemeLayer
 * @category  Visualization Theme
 * @classdesc Thematic layer of graduated symbols.
 * @param {string} name The layer name.
 * @param {string} symbolType Symbol type.
 * @param {Object} opt_options Parameters.
 * @param {string} opt_options.id Thematic layer ID. By default, CommonUtil.createUniqueID("themeLayer_") is used to create the thematic layer ID.
 * @param {boolean} opt_options.loadWhileAnimating=true Whether to redraw in real time.
 * @param {mapboxgl.Map} opt_options.map The current mapboxgl map object.
 * @param {number} opt_options.opacity=1 Layer transparency.
 * @param {string} opt_options.themeFields Specify the fields for creating thematic maps.
 * @param {boolean} opt_options.cluster=true Whether to perform capping processing. If set to true, the chart that has capped the chart drawn in the layer will be hidden during the chart drawing process.
 * @param {string} opt_options.chartsType Chart type. Currently available: "Bar", "Line", "Pie".
 * @param {Object} opt_options.symbolSetting For the settable attributes of the symbolSetting object of each type of chart, please refer to the description of the settable attributes of the symbolSetting object in the notes of the specific chart model class. The symbolSetting object usually has the following 5 basic settable properties:
 * @param {number} opt_options.symbolSetting.width Thematic element (chart) width.
 * @param {number} opt_options.symbolSetting.height The height of thematic elements (charts).
 * @param {Array.<number>} opt_options.symbolSetting.codomain Value range, a one-dimensional array of length 2. The first element represents the lower limit of the value range, and the second element represents the upper limit of the value range.
 * @param {number} opt_options.symbolSetting.XOffset The offset value of the thematic element (chart) in the X direction, in pixels.
 * @param {number} opt_options.symbolSetting.YOffset The offset value of the thematic element (chart) in the Y direction, in pixels.
 * @param {Array.<number>} opt_options.symbolSetting.dataViewBoxParameterThe dataViewBox parameter of the data view box, which refers to the internal offset value of the chart box (the chart range box composed of chart position, chart width, and chart height) in the left, bottom, right, and top directions, and the length is 4 One-dimensional array of.
 * @param {number} opt_options.symbolSetting.decimalNumber Data value array dataValues element value decimal places, data decimal place processing parameters, value range: [0, 16]. If this parameter is not set, the data will not be processed with decimal places when fetching the data value.
 * @extends {mapboxgl.ekmap.GraphThemeLayer}
 */
export class RankSymbol extends GraphThemeLayer {

    constructor(name, symbolType, opt_options) {
        super(name, symbolType, opt_options);
        this.symbolType = symbolType;
        this.symbolSetting = opt_options.symbolSetting;
        this.themeField = opt_options.themeField;
    }

    /**
     * @function mapboxgl.ekmap.RankSymbolThemeLayer.prototype.setSymbolType
     * @description Set glyph.
     * @param {string} symbolType Symbol type.
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @function mapboxgl.ekmap.RankSymbolThemeLayer.prototype.createThematicFeature
     * @description Create thematic graphic elements.
     * @param {Object} feature Thematic graphic elements to be created.
     */
    createThematicFeature(feature) {
        var thematicFeature;
        if (FeatureTheme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new FeatureTheme[this.symbolType](feature, this, [this.themeField], this.symbolSetting);
        }
        if (!thematicFeature) {
            return false;
        }
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

}

mapboxgl.ekmap.RankSymbolThemeLayer = RankSymbol;