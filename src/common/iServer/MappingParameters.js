import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { RangeMode, ColorGradientType } from '../REST';

/**
 * @class Ekmap.MappingParameters
 * @category  iServer ProcessingService
 * @classdesc 分析后结果可视化的参数类。
 * @param {Object} options - 参数。
 * @param {Array.<Ekmap.ThemeGridRangeItem>} [options.items] - 栅格分段专题图子项数组。
 * @param {number} [options.numericPrecision=1] - 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
 * @param {Ekmap.RangeMode} [options.rangeMode=Ekmap.RangeMode.EQUALINTERVAL] - 专题图分段模式。
 * @param {number} [options.rangeCount] - 专题图分段个数。
 * @param {Ekmap.ColorGradientType} [options.colorGradientType=Ekmap.ColorGradientType.YELLOW_RED] - 专题图颜色渐变模式。
 */
export class MappingParameters {

    constructor(options) {

        /**
         * @member {Array.<Ekmap.ThemeGridRangeItem>} [Ekmap.MappingParameters.prototype.items]
         * @description 栅格分段专题图子项数组。
         */
        this.items = null;

        /**
         * @member {number} [Ekmap.MappingParameters.prototype.numericPrecision=1]
         * @description 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
         */
        this.numericPrecision = 1;

        /**
         * @member {Ekmap.RangeMode} [Ekmap.MappingParameters.prototype.RangeMode=Ekmap.RangeMode.EQUALINTERVAL]
         * @description 专题图分段模式。
         */
        this.rangeMode = RangeMode.EQUALINTERVAL;

        /**
         * @member {number} [Ekmap.MappingParameters.prototype.rangeCount]
         * @description 专题图分段个数。
         */
        this.rangeCount = "";

        /**
         * @member {Ekmap.ColorGradientType} [Ekmap.MappingParameters.prototype.colorGradientType=Ekmap.ColorGradientType.YELLOW_RED]
         * @description 专题图颜色渐变模式。
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        Util.extend(this, options);
        this.CLASS_NAME = "Ekmap.MappingParameters";
    }

    /**
     * @function Ekmap.MappingParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }
        me.numericPrecision = null;
        me.rangeMode = null;
        me.rangeCount = null;
        me.colorGradientType = null;
    }

}

Ekmap.MappingParameters = MappingParameters;