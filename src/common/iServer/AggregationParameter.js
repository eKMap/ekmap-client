import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.AggregationParameter
 * @classdesc 聚合查询参数设置，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {string} options.aggName - 聚合名称。
 * @param {Ekmap.AggregationType} options.aggType - 聚合类型设置。
 * @param {string} options.aggFieldName - 聚合字段。
 * @param {Ekmap.AggregationParameter} options.subAgg - 子聚合类。
 *
 */
export class AggregationParameter {
    constructor(options) {
        /**
         * @member {string} Ekmap.AggregationParameter.prototype.aggName
         * @description 聚合名称。
         */
        this.aggName = null;
        /**
         * @member {Ekmap.AggregationType} Ekmap.AggregationParameter.prototype.aggType
         * @description 聚合类型设置类。
         */
        this.aggType = null;
        /**
         * @member {string} Ekmap.AggregationParameter.prototype.aggFieldName
         * @description 聚合字段。
         */
        this.aggFieldName = null;
        /**
         * @member {Ekmap.AggregationParameter} Ekmap.AggregationParameter.prototype.subAgg
         * @description 子聚合。
         */
        this.subAgg = null;

        this.CLASS_NAME = "Ekmap.AggregationParameter";
        Util.extend(this, options);
    }

    destroy() {
        var me = this;
        me.aggName = null;
        me.aggFieldName = null;
        me.aggType = null;
        if (me.subAgg) {
            me.subAgg = null;
        }
    }
}

Ekmap.AggregationParameter = AggregationParameter;