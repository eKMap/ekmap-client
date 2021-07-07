import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
  * @class Ekmap.GetFeaturesParametersBase
  * @category eKServer Data FeatureResults
  * @classdesc The base class of element query parameters.
  * @param {Object} options-parameters.
  * @param {Array.<string>} options.datasetNames-The list of dataset names in the dataset collection.
  * @param {boolean} [options.returnContent=true] Whether to return the query result directly.
  * @param {number} [options.fromIndex=0] The minimum index number of the query result.
  * @param {number} [options.toIndex=19] The maximum index number of the query result.
  * @param {string|number} [options.targetEpsgCode] The EPSG Code corresponding to the target coordinate system of the dynamic projection. When using this parameter, the returnContent parameter must be true.
  * @param {Object} [options.targetPrj] The target coordinate system for dynamic projection. When using this parameter, the returnContent parameter needs to be true. Such as: prjCoordSys={"epsgCode":3857}. When the targetEpsgCode parameter is set at the same time, this parameter does not take effect.
  */
export class GetFeaturesParametersBase {


    constructor(options) {
        /**
         * @member {Array.<string>} Ekmap.GetFeaturesParametersBase.prototype.datasetName
         * @description The list of dataset names in the dataset collection.
         */
        this.datasetNames = null;

        /**
         * @member {string} Ekmap.GetFeaturesParametersBase.prototype.targetEpsgCode
         * @description The EPSG Code corresponding to the target coordinate system of the dynamic projection should be set to true when the returnContent parameter is used.
         */
        this.targetEpsgCode = null;

        /**
         * @member {Object} Ekmap.GetFeaturesParametersBase.prototype.targetEpsgCode
         * @description The target coordinate system for dynamic projection. When using, you need to set the returnContent parameter to true. For example: prjCoordSys={"epsgCode":3857}. When the targetEpsgCode parameter is set at the same time, this parameter does not take effect.
         */
        this.targetPrj = null;

        /**
         * @member {boolean} [Ekmap.GetFeaturesParametersBase.prototype.returnContent=true]
         * @description Whether to return the description of the newly created resource immediately or the URI of the new resource.
         * If it is true, it will directly return the newly created resource, that is, the expression of the query result.
         * If false, the URI of the query result resource is returned.
         */
        this.returnContent = true;

        /**
         * @member {number} [Ekmap.GetFeaturesParametersBase.prototype.fromIndex=0]
         * @description The minimum index number of the query result. If the value is greater than the maximum index number of the query result, the query result is empty.
         */
        this.fromIndex = 0;

        /**
         * @member {number} [Ekmap.GetFeaturesParametersBase.prototype.toIndex=19]
         * @description The maximum index number of the query result. If the value is greater than the maximum index number of the query result, the maximum index number of the query result is used as the end index number.
         */
        this.toIndex = 19;

        /**
         * @member {boolean} [Ekmap.GetFeaturesParametersBase.prototype.returnCountOnly=false]
         * @description only returns the total number of query results.
         */
        this.returnCountOnly = false;

        /**
         * @member {number} [Ekmap.GetFeaturesParametersBase.prototype.maxFeatures=1000]
         * @description is used to set the number of query result entries returned by the server during SQL query.
         */
        this.maxFeatures = null;

        /**
         * @member {Object} Ekmap.GetFeaturesParametersBase.prototype.aggregations
         * @description aggregate query parameter, this parameter only supports the data service of the data source Elasticsearch service.
         */
        this.aggregations = null;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.GetFeaturesParametersBase";
    }

    /**
     *
     * @function Ekmap.GetFeaturesParametersBase.prototype.destroy
     * @description releases the resource and blanks the attribute of the referenced resource.
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
        me.targetEpsgCode = null;
        me.targetPrj = null;
        if (me.aggregation) {
            me.aggregation = null;
        }
    }
}

Ekmap.GetFeaturesParametersBase = GetFeaturesParametersBase;