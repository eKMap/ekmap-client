import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ServerStyle } from './ServerStyle';
import { LabelMatrixCell } from './LabelMatrixCell';

/**
 * @class Ekmap.LabelSymbolCell
 * @category  iServer Map Theme 
 * @classdesc 符号类型的矩阵标签元素类。
 * @description 该类继承自 {@link Ekmap.LabelMatrixCell}类，主要对矩阵标签中的专题图类型的矩阵标签元素进行设置。
 * 矩阵标签专题图是标签专题图（{@link Ekmap.ThemeLabel}）的一种，其中矩阵标签中的填充元素又可分为图片类型（{@link Ekmap.LabelImageCell}）、
 * 符号类型（{@link Ekmap.LabelSymbolCell}）、专题图类型（{@link Ekmap.LabelThemeCell}）三种，该类是这三种类型的矩阵标签元素其中的一种，
 * 用于定义符号类型的矩阵标签，如符号 ID 字段名称（符号 ID 与 Ekmap 桌面产品中点、线、面符号的 ID 对应） 、大小等。
 * 用户在实现矩阵标签专题图时只需将定义好的矩阵标签元素赋值予 {@link Ekmap.ThemeLabel.matrixCells} 属性即可。matrixCells 属是一个二维数组，
 * 每一维可以是任意类型的矩阵标签元素组成的数组（也可是单个标签元素组成的数组，即数组中只有一个元素）。
 * @extends {Ekmap.LabelMatrixCell}
 * @param {Object} options - 参数。 
 * @param {Ekmap.ServerStyle} options.style - 获取或设置符号样式。 
 * @param {string} options.symbolIDField - 符号 ID 或符号 ID 所对应的字段名称。
 */
export class LabelSymbolCell extends LabelMatrixCell {

    constructor(options) {
        super(options);
        /**
         * @member {Ekmap.ServerStyle} Ekmap.LabelSymbolCell.prototype.style
         * @description 获取或设置符号样式—— {@link Ekmap.ServerStyle} 对象，包括符号大小（{@link Ekmap.ServerStyle.markerSize}）
         *              和符号旋转（{@link Ekmap.ServerStyle.markerAngle}）角度，其中用于设置符号 ID 的属性（{@link Ekmap.ServerStyle.markerSymbolID}）在此处不起作用。
         */
        this.style = new ServerStyle();

        /**
         * @member {string} Ekmap.LabelSymbolCell.prototype.symbolIDField
         * @description 获取或设置符号 ID 或符号 ID 所对应的字段名称。
         */
        this.symbolIDField = null;

        /**
         * @member {string} Ekmap.LabelSymbolCell.prototype.type
         * @description 制作矩阵专题图时是必须的。
         */
        this.type = "SYMBOL";

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.LabelSymbolCell";
    }

    /**
     * @function Ekmap.LabelSymbolCell.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.symbolIDField = null;
    }

}

Ekmap.LabelSymbolCell = LabelSymbolCell;