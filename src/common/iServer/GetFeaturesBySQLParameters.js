import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';
import './FilterParameter';

/**
 * @class Ekmap.GetFeaturesBySQLParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据服务中数据集 SQL 查询参数类。
 * @param {Object} options - 参数。 
 * @param {Ekmap.FilterParameter} options.queryParameter - 查询过滤条件参数。 
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。 
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。 
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。 
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。 
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。 如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @extends {Ekmap.GetFeaturesParametersBase}
 */
export class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {


    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.GetFeaturesBySQLParameters.prototype.getFeatureMode
         * @description 数据集查询模式。
         */
        this.getFeatureMode = "SQL";

        /**
         * @member {Ekmap.FilterParameter} Ekmap.GetFeaturesBySQLParameters.prototype.queryParameter
         * @description 查询过滤条件参数类。
         */
        this.queryParameter = null;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.GetFeaturesBySQLParameters";
    }

    /**
     * @function Ekmap.GetFeaturesBySQLParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.getFeatureMode = null;
        if (me.queryParameter) {
            me.queryParameter.destroy();
            me.queryParameter = null;
        }
    }

    /**
     * @function Ekmap.GetFeaturesBySQLParameters.prototype.toJsonParameters
     * @description 将 Ekmap.GetFeaturesBySQLParameters 对象转换为 JSON 字符串。
     * @param {Ekmap.GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var paramsBySql = {
            datasetNames: params.datasetNames,
            getFeatureMode: "SQL",
            queryParameter: params.queryParameter
        };
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsBySql.maxFeatures = params.maxFeatures;
        }
        if (params.aggregations) {
            paramsBySql.aggregations = params.aggregations;
        }
        if (params.targetEpsgCode) {
            paramsBySql.targetEpsgCode = params.targetEpsgCode;
        }
        if (!params.targetEpsgCode && params.targetPrj) {
            paramsBySql.targetPrj = params.targetPrj;
        }
        return Util.toJSON(paramsBySql);
    }

}

Ekmap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;