/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { Theme } from './Theme';
import { ThemeFlow } from './ThemeFlow';
import { ThemeOffset } from './ThemeOffset';
import { ThemeGraduatedSymbolStyle } from './ThemeGraduatedSymbolStyle';
import { GraduatedMode } from '../REST';

/**
 * @class Ekmap.ThemeGraduatedSymbol
 * @category  iServer Map Theme
 * @classdesc 等级符号专题图。
 * @extends {Ekmap.Theme}
 * @param {Object} options - 参数。
 * @param {Ekmap.ThemeGraduatedSymbolStyle} options.style - 用于设置等级符号图正负和零值显示风格。
 * @param {string} options.expression - 等级符号专题图的字段或字段表达式。
 * @param {number} [options.baseValue=0] - 等级符号专题图的基准值，单位同专题变量的单位。
 * @param {Ekmap.ThemeFlow} [options.flow] - 等级符号专题图符号流动显示与牵引线设置类。
 * @param {Ekmap.GraduatedMode} [options.graduatedMode=Ekmap.GraduatedMode.CONSTANT] - 等级符号专题图分级模式。
 * @param {Ekmap.ThemeOffset} [options.offset] - 用于设置标签专题图中标记文本相对于要素内点的偏移量对象。
 * @param {Ekmap.ThemeMemoryData} [options.memoryData] - 专题图内存数据。
 */
export class ThemeGraduatedSymbol extends Theme {

    constructor(options) {
        super("GRADUATEDSYMBOL", options);
        /**
         * @member {number} [Ekmap.ThemeGraduatedSymbol.prototype.baseValue=0]
         * @description 等级符号专题图的基准值，单位同专题变量的单位。<br>
         *              依据此值系统会自动根据分级方式计算其余值对应的符号大小，每个符号的显示大小等于 
         *              ThemeValueSection.positiveStyle（或 zeroStyle，negativeStyle）.markerSize * value / basevalue， 
         *              其中 value 是 expression 所指定字段对应的值经过分级计算之后的值。默认值为0，建议通过多次尝试设置该值才能达到较好的显示效果。
         */
        this.baseValue = 0;

        /**
         * @member {string} Ekmap.ThemeGraduatedSymbol.prototype.expression
         * @description 用于创建等级符号专题图的字段或字段表达式，字段或字段表达式应为数值型。
         */
        this.expression = null;

        /**
         * @member {Ekmap.ThemeFlow} Ekmap.ThemeGraduatedSymbol.prototype.flow
         * @description 等级符号专题图符号流动显示与牵引线设置类。<br>
         *              通过该字段可以设置等级符号是否流动显示和牵引线风格。
         */
        this.flow = new ThemeFlow();

        /**
         * @member {Ekmap.GraduatedMode} [Ekmap.ThemeGraduatedSymbol.prototype.graduatedMode=Ekmap.GraduatedMode.CONSTANT]
         * @description 等级符号专题图分级模式。<br>
         *              分级主要是为了减少制作等级符号专题图中数据大小之间的差异。如果数据之间差距较大，则可以采用对数或者平方根的分级方式来进行，
         *              这样就减少了数据之间的绝对大小的差异，使得等级符号图的视觉效果比较好，同时不同类别之间的比较也是有意义的。
         *              有三种分级模式：常数、对数和平方根，对于有值为负数的字段，在用对数或平方根方式分级时，默认对负数取正。
         *              不同的分级模式用于确定符号大小的数值是不相同的：常数按照字段的原始数据进行；对数则是对每条记录对应的专题变量取自然对数；
         *              平方根则是对其取平方根，然后用最终得到的结果来确定其等级符号的大小。
         */
        this.graduatedMode = Ekmap.GraduatedMode.CONSTAN;

        /**
         * @member {Ekmap.ThemeOffset} [Ekmap.ThemeGraduatedSymbol.prototype.offset]
         * @description 用于设置等级符号图相对于要素内点的偏移量。
         */
        this.offset = new ThemeOffset();

        /**
         * @member {Ekmap.ThemeGraduatedSymbolStyle} Ekmap.ThemeGraduatedSymbol.prototype.style
         * @description 用于设置等级符号图正负和零值显示风格。
         */
        this.style = new ThemeGraduatedSymbolStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.ThemeGraduatedSymbol";
    }

    /**
     * @function Ekmap.ThemeGraduatedSymbol.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        me.expression = null;
        if (me.flow) {
            me.flow.destroy();
            me.flow = null;
        }
        me.graduatedMode = GraduatedMode.CONSTANT;
        if (me.offset) {
            me.offset.destroy();
            me.offset = null;
        }
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
    }


    /**
     * @function Ekmap.ThemeGraduatedSymbol.prototype.toJSON
     * @description 将 themeLabel 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        return Util.toJSON(this.toServerJSONObject());
    }


    /**
     * @function Ekmap.ThemeGraduatedSymbol.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj.type = this.type;
        obj.memoryData = this.memoryData;
        obj.baseValue = this.baseValue;
        obj.expression = this.expression;
        obj.graduatedMode = this.graduatedMode;
        if (this.flow) {
            obj.flowEnabled = this.flow.flowEnabled;
            obj.leaderLineDisplayed = this.flow.leaderLineDisplayed;
            obj.leaderLineStyle = this.flow.leaderLineStyle;
        }
        if (this.offset) {
            obj.offsetFixed = this.offset.offsetFixed;
            obj.offsetX = this.offset.offsetX;
            obj.offsetY = this.offset.offsetY;
        }
        if (this.style) {
            obj.negativeStyle = this.style.negativeStyle;
            obj.negativeDisplayed = this.style.negativeDisplayed;
            obj.positiveStyle = this.style.positiveStyle;
            obj.zeroDisplayed = this.style.zeroDisplayed;
            obj.zeroStyle = this.style.zeroStyle;
        }
        return obj;
    }

    /**
     * @function Ekmap.ThemeGraduatedSymbol.fromObj
     * @description 从传入对象获取等级符号专题图。
     * @param {Object} obj - 传入对象。
     * @returns {Ekmap.ThemeGraduatedSymbol} 等级符号专题图对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new Ekmap.ThemeGraduatedSymbol();
        Util.copy(res, obj);
        res.flow = ThemeFlow.fromObj(obj);
        res.offset = ThemeOffset.fromObj(obj);
        res.style = ThemeGraduatedSymbolStyle.fromObj(obj);
        return res;
    }

}

Ekmap.ThemeGraduatedSymbol = ThemeGraduatedSymbol;