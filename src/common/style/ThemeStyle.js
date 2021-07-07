import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.ThemeStyle
 * @classdesc Client-side thematic map style class.
 * @category Visualization Theme
 * @param {Object} options-optional parameters.
 * @param {boolean} [options.fill=true] Whether to fill or not, set to false if no filling is required. If fill and stroke are both false, the layer will be rendered with the default values ​​of fill and stroke.
 * @param {string} [options.fillColor='#000000'] Hexadecimal fill color.
 * @param {number} [options.fillOpacity=1] Fill opacity. The value range is [0, 1].
 * @param {boolean} [options.stroke=false] Whether to stroke or not, set to false if no stroke is required. If fill and stroke are both false, the layer will be rendered with the default values ​​of fill and stroke.
 * @param {string} [options.strokeColor='#000000'] Hexadecimal stroke color.
 * @param {number} [options.strokeOpacity=1] The opacity of the stroke. The value range is [0, 1].
 * @param {number} [options.strokeWidth=1] line width/stroke width.
 * @param {string} [options.strokeLinecap='butt'] line cap style. There are three types of strokeLinecap "butt", "round", and "square".
 * @param {string} [options.strokeLineJoin='iter'] line segment connection style. There are three types of strokeLineJoin "miter", "round", "bevel".
 * @param {string} [options.strokeDashstyle='solid'] The type of dashed line. There are eight types of strokeDashstyle "dot", "dash", "dashdot", "longdash", "longdashdot", "solid", "dashed", "dotted". solid represents a solid line.
 * @param {number} [options.pointRadius=6] Point radius, in pixels.
 * @param {number} [options.shadowBlur=0] shadow blur degree, (more than 0 valid;). Note: Please use the shadowColor property and the shadowBlur property together to create a shadow.
 * @param {string} [options.shadowColor='#000000'] Shadow color. Note: Please use the shadowColor property and the shadowBlur property together to create a shadow.
 * @param {number} [options.shadowOffsetX=0] The offset value of the shadow in the X direction.
 * @param {number} [options.shadowOffsetY=0] the offset value of the shadow in the Y direction.
 * @param {string} options.label-additional text label content for thematic elements.
 * @param {string} [options.fontColor] Additional text font color.
 * @param {number} [options.fontSize=12] Additional text font size, in pixels.
 * @param {string} [options.fontStyle='normal'] Additional text font style. Possible values: "normal", "italic", "oblique".
 * @param {string} [options.fontVariant='normal'] Additional text font variants. Possible values: "normal", "small-caps".
 * @param {string} [options.fontWeight='normal'] Additional text font weight. Possible settings: "normal", "bold", "bolder", "lighter".
 * @param {string} [options.fontFamily='arial,sans-serif'] additional text font family. The fontFamily value is a priority list of font family names or/and class family names. Each value is separated by a comma.
 * The browser will use the first specific font name ("times", "courier", "arial") or font family name that it can recognize
 * ("Serif", "sans-serif", "cursive", "fantasy", "monospace").
 * @param {string} [options.labelPosition='top'] Additional text position, can be'inside','left','right','top','bottom'.
 * @param {string} [options.labelAlign='center'] Horizontal alignment of additional text. Can be'left','right','center'.
 * @param {string} [options.labelBaseline='middle'] The additional text is aligned vertically. Can be'top','bottom','middle'.
 * @param {number} [options.labelXOffset=0] The offset of the additional text in the x-axis direction.
 * @param {number} [options.labelYOffset=0] The offset of the additional text in the y-axis direction.
 */
export class ThemeStyle {
    constructor(options) {
        options = options || {};
        /**
         * @member {boolean} [Ekmap.ThemeStyle.prototype.fill=true]
         * @description Whether to fill or not, set to false if no filling is required. If fill and stroke are both false, the layer will be rendered with the default values ​​of fill and stroke.
         */
        this.fill = true;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fillColor="#000000"]
         * @description Hexadecimal fill color.
         */
        this.fillColor = "#000000";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.fillOpacity=1]
         * @description Fill opacity. The value range is [0, 1].
         */
        this.fillOpacity = 1;
        /**
         * @member {boolean} [Ekmap.ThemeStyle.prototype.stroke=false]
         * @description Whether to stroke or not, set to false if no stroke is required. If fill and stroke are both false, the layer will be rendered with the default values ​​of fill and stroke.
         */
        this.stroke = false;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.strokeColor="#000000"]
         * @description Hexadecimal stroke color.
         */
        this.strokeColor = "#000000";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.strokeOpacity=1]
         * @description The opacity of the stroke. The value range is [0, 1].
         */
        this.strokeOpacity = 1;
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.strokeWidth=1]
         * @description Line width/stroke width.
         */
        this.strokeWidth = 1;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.strokeLinecap="butt"]
         * @description line cap style; strokeLinecap has three types "butt", "round", "square".
         */
        this.strokeLinecap = "butt";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.strokeLineJoin="miter"]
         * @description line segment connection style; strokeLineJoin has three types "miter", "round", "bevel".
         */
        this.strokeLineJoin = "miter";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.strokeDashstyle="solid"]
         * @description dashed line type; strokeDashstyle has eight types "dot","dash","dashdot","longdash","longdashdot","solid", "dashed", "dotted";
         * solid represents a solid line.
         */
        this.strokeDashstyle = "solid";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.pointRadius=6]
         * @description point radius. The unit is pixel.
         */
        this.pointRadius = 6;
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.shadowBlur=0]
         * @description Shadow ambiguity, (greater than 0 is valid). Note: Please use the shadowColor property and the shadowBlur property together to create a shadow.
         */
        this.shadowBlur = 0;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.shadowColor='#000000']
         * @description The color of the shadow. Note: Please use the shadowColor property and the shadowBlur property together to create a shadow.
         */
        this.shadowColor = "#000000";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.shadowOffsetX=0]
         * @description The offset value of the shadow in the X direction.
         */
        this.shadowOffsetX = 0;
        /**
         * @member {number} Ekmap.ThemeStyle.prototype.shadowOffsetY
         * @description Y-direction offset value.
         */
        this.shadowOffsetY = 0;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.label]
         * @description Additional text label content for thematic elements.
         */
        this.label = "";
        /**
         * @member {boolean} [Ekmap.ThemeStyle.prototype.labelRect=false]
         * @description Whether to display the rectangular background of the text label.
         */
        this.labelRect = false;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fontColor]
         * @description Additional text font color.
         */
        this.fontColor = "";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.fontSize=12]
         * @description Additional text font size, the unit is pixel.
         */
        this.fontSize = 12;
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fontStyle="normal"]
         * @description Additional text font style. Possible values: "normal", "italic", "oblique".
         */
        this.fontStyle = "normal";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fontVariant="normal"]
         * @description Additional text font variants. Possible values: "normal", "small-caps".
         */
        this.fontVariant = "normal";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fontWeight="normal"]
         * @description Additional text font weight. Possible settings: "normal", "bold", "bolder", "lighter".
         */
        this.fontWeight = "normal";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.fontFamily="arial,sans-serif"]
         * @description Additional text font family. The fontFamily value is a priority list of font family names or/and class family names. Each value is separated by a comma, and the browser will use the first one that it can recognize
         * Specific font names ("times", "courier", "arial") or font family names ("serif", "sans-serif", "cursive", "fantasy", "monospace") can be used.
         */
        this.fontFamily = "arial,sans-serif";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.labelPosition='top']
         * @description Additional text position, can be'inside','left','right','top','bottom'.
         */
        this.labelPosition = "top";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.labelAlign='center']
         * @description Horizontal alignment of additional text. Can be'left','right','center'.
         */
        this.labelAlign = "center";
        /**
         * @member {string} [Ekmap.ThemeStyle.prototype.labelBaseline='middle']
         * @description The additional text is aligned vertically. Can be'top','bottom','middle'.
         */
        this.labelBaseline = "middle";
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.labelXOffset=0]
         * @description The offset of the additional text in the X axis direction.
         */
        this.labelXOffset = 0;
        /**
         * @member {number} [Ekmap.ThemeStyle.prototype.labelYOffset=0]
         * @description The offset of the additional text in the Y-axis direction.
         */
        this.labelYOffset = 0;

        Util.extend(this, options);
    }
}

Ekmap.ThemeStyle = ThemeStyle;