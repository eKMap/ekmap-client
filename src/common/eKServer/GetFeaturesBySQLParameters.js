import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';
import './FilterParameter';

/**
 * @class Ekmap.GetFeaturesBySQLParameters
 * @category eKServer Data FeatureResults
 * @classdesc Data set SQL query parameter class in data service.
 * @param {Object} options-parameters.
 * @param {Ekmap.FilterParameter} options.queryParameter-query filter condition parameters.
 * @param {Array.<string>} options.datasetNames-The list of dataset names in the dataset collection.
 * @param {boolean} [options.returnContent=true] Whether to return the query result directly.
 * @param {number} [options.fromIndex=0] The minimum index number of the query result.
 * @param {number} [options.toIndex=19] The maximum index number of the query result.
 * @param {string|number} [options.targetEpsgCode] The EPSG Code corresponding to the target coordinate system of dynamic projection. When using this parameter, the returnContent parameter must be true.
 * @param {Object} [options.targetPrj] The target coordinate system for dynamic projection. When using this parameter, the returnContent parameter needs to be true. For example: prjCoordSys={"epsgCode":3857}. When the targetEpsgCode parameter is set at the same time, this parameter does not take effect.
 * @extends {Ekmap.GetFeaturesParametersBase}
 */
export class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {


    constructor(options) {
        super(options);
        /**
         * @member {string} Ekmap.GetFeaturesBySQLParameters.prototype.getFeatureMode
         * @description Data set query mode.
         */
        this.getFeatureMode = "SQL";

        /**
         * @member {Ekmap.FilterParameter} Ekmap.GetFeaturesBySQLParameters.prototype.queryParameter
         * @description Query filter condition parameter class.
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
     * @description converts the Ekmap.GetFeaturesBySQLParameters object into a JSON string.
     * @param {Ekmap.GetFeaturesBySQLParameters} params-Data set SQL query parameter object.
     * @returns {string} The converted JSON string.
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