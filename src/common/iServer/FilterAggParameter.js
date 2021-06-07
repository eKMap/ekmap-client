import { Ekmap } from "../Ekmap";
import { AggregationType } from '../REST';
import { Util } from '../commontypes/Util';
import { AggregationParameter } from "./AggregationParameter";
import "./AggQueryBuilderParameter";

/**
 * @class Ekmap.FilterAggParameter
 * @classdesc 过滤条件参数设置，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {Ekmap.AggQueryBuilderParameter} options.filterParam - 过滤条件参数设置类。
 * @param {Ekmap.AggregationType} [options.aggType=AggregationType.FILTER] - 聚合类型。
 */
export class FilterAggParameter extends AggregationParameter {

    constructor(options) {
        super(options);
        /**
         * @member {Ekmap.AggQueryBuilderParameter} Ekmap.FilterAggParameter.prototype.filterParam
         * @description 过滤条件参数设置类。
         */
        this.filterParam = null;
        /**
         * @member {Ekmap.AggregationType} [Ekmap.FilterAggParameter.prototype.aggType=AggregationType.FILTER]
         * @description 聚合类型。
         */
        this.aggType = AggregationType.FILTER;
        this.CLASS_NAME = "Ekmap.FilterAggParameter";
        Util.extend(this, options);
    }

    destroy() {
        super.destroy();
        var me = this;
        if (me.filterParam) {
            me.filterParam = null;
        }
    }
}

Ekmap.FilterAggParameter = FilterAggParameter;