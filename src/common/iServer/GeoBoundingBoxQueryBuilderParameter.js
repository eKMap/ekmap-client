import { Ekmap } from "../Ekmap";
import { Util } from '../commontypes/Util';
import { AggregationQueryBuilderType } from "../REST";
import { AggQueryBuilderParameter } from "./AggQueryBuilderParameter";

/**
 * @class Ekmap.GeoBoundingBoxQueryBuilderParameter
 * @classdesc bounds 查询参数设置类，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 参数。 
 * @param {(Ekmap.Bounds|L.Bounds|ol.extent)} options.bounds - 查询范围。 
 * @param {Ekmap.AggregationQueryBuilderType} [options.queryType=Ekmap.AggregationQueryBuilderType.GEO_BOUNDING_BOX] - 查询类型。 
 */
export class GeoBoundingBoxQueryBuilderParameter extends AggQueryBuilderParameter {
    constructor(options) {
        super(options);
        /**
         * @member {(Ekmap.Bounds|L.Bounds|ol.extent)} Ekmap.GeoBoundingBoxQueryBuilderParameter.prototype.bounds
         * @description 查询范围。
         */
        this.bounds = null;

        /**
         * @member {Ekmap.AggregationQueryBuilderType} [Ekmap.GeoBoundingBoxQueryBuilderParameter.prototype.queryType=Ekmap.AggregationQueryBuilderType.GEO_BOUNDING_BOX]
         * @description 查询类型。
         */
        this.queryType = AggregationQueryBuilderType.GEO_BOUNDING_BOX;
        this.CLASS_NAME = "Ekmap.GeoBoundingBoxQueryBuilderParameter";
        Util.extend(this, options);
    }

    destroy() {
        super.destroy();
        this.bounds = null;
        this.queryType = null;
    }
}

Ekmap.GeoBoundingBoxQueryBuilderParameter = GeoBoundingBoxQueryBuilderParameter