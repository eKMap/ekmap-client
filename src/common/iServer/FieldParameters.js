import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.FieldParameters
 * @category iServer Data Field
 * @classdesc 字段信息查询参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasource - 数据源名称。
 * @param {string} options.dataset - 数据集名称。
 */
export class FieldParameters {


    constructor(options) {
        /**
         * @member {string} Ekmap.FieldParameters.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} Ekmap.FieldParameters.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.FieldParameters";
    }

    /**
     * @function Ekmap.FieldParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

}

Ekmap.FieldParameters = FieldParameters;