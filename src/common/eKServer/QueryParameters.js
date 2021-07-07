import {
    Ekmap
} from '../Ekmap';
import {
    Util
} from '../commontypes/Util';
import './FilterParameter';
import {
    GeometryType,
    QueryOption
} from '../REST';

/**
 * @class Ekmap.QueryParameters
 * @category eKServer Map QueryResults
 * @classdesc Query parameter base class. The parameters of distance query, SQL query, geometric feature query, etc. all inherit this class.
 * @param {Object} options-parameters.
 * @param {Array.<Ekmap.FilterParameter>} options.queryParams-query filter parameter array.
 * @param {string} [options.customParams] custom parameters for extended use.
 * @param {Object} [options.prjCoordSys] custom parameters for the dynamic projection query extension provided by Ekmap Online. Such as {"epsgCode":3857}.
 * @param {number} [options.expectCount=100000] The number of result records expected to be returned.
 * @param {Ekmap.GeometryType} [options.networkType=Ekmap.GeometryType.LINE] the query type corresponding to the network dataset.
 * @param {Ekmap.QueryOption} [options.queryOption=Ekmap.ATTRIBUTEANDGEOMETRY] enumeration type of query result type.
 * @param {number} [options.startRecord=0] Query the starting record number.
 * @param {number} [options.holdTime=10] The time the resource is saved on the server, in minutes.
 * @param {boolean} [options.returnCustomResult=false] Only for 3D use.
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] Whether the returned feature field identifier of the query result is a field alias. When it is false, it returns the field name; when it is true, it returns the field alias.
 */
export class QueryParameters {
    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} [Ekmap.QueryParameters.prototype.customParams]
         * @description custom parameters for extended use.
         */
        this.customParams = null;

        /**
         * @member {Object} [Ekmap.QueryParameters.prototype.prjCoordSys]
         * @description custom parameters for the dynamic projection query expansion provided by Ekmap Online. Such as {"epsgCode":3857}
         */
        this.prjCoordSys = null;

        /**
         * @member {number} [Ekmap.QueryParameters.prototype.expectCount=100000]
         * @description expects to return the number of result records, the default returns 100000 query records,
         * If the actual number of records is less than 100,000, the actual number of records will be returned.
         */
        this.expectCount = 100000;

        /**
         * @member {Ekmap.GeometryType} [Ekmap.QueryParameters.prototype.networkType=Ekmap.GeometryType.LINE]
         * @description The query type corresponding to the network dataset is divided into two types: point and line.
         */
        this.networkType = GeometryType.LINE;

        /**
         * @member {Ekmap.QueryOption} [Ekmap.QueryParameters.prototype.queryOption=Ekmap.QueryOption.ATTRIBUTEANDGEOMETRY]
         * @description enumerated class of query result type.
         * This class describes the return type of query results, including only returning attributes,
         * Only return geometric entities and return attributes and geometric entities.
         */
        this.queryOption = QueryOption.ATTRIBUTEANDGEOMETRY;

        /**
         * @member {Array.<Ekmap.FilterParameter>} Ekmap.QueryParameters.prototype.queryParams
         * @description Query the filter condition parameter array.
         * This class is used to set the query filter parameters of the query data set.
         */
        this.queryParams = null;

        /**
         * @member {number} [Ekmap.QueryParameters.prototype.startRecord=0]
         * @description Query the starting record number.
         */
        this.startRecord = 0;

        /**
         * @member {number} [Ekmap.QueryParameters.prototype.holdTime=10]
         * @description The time the resource is saved on the server, in minutes.
         */
        this.holdTime = 10;

        /**
         * @member {boolean} [Ekmap.QueryParameters.prototype.returnCustomResult=false]
         * @description is for 3D use only.
         */
        this.returnCustomResult = false;
        /**
         * @member {boolean} [Ekmap.QueryParameters.prototype.returnFeatureWithFieldCaption=false]
         * @description Whether the feature field identifier of the query result returned by @description is a field alias. When it is false, it returns the field name; when it is true, it returns the field alias.
         */
        this.returnFeatureWithFieldCaption = false;
        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.QueryParameters";
    }

    /**
     * @function Ekmap.QueryParameters.prototype.destroy
     * @description releases the resource and blanks the attribute of the referenced resource.
     */
    destroy() {
        var me = this;
        me.customParams = null;
        me.expectCount = null;
        me.networkType = null;
        me.queryOption = null;
        if (me.queryParams) {
            for (var i = 0, qps = me.queryParams, len = qps.length; i <len; i++) {
                qps[i].destroy();
            }
            me.queryParams = null;
        }
        me.startRecord = null;
        me.holdTime = null;
        me.returnCustomResult = null;
        me.prjCoordSys = null;
    }
}

Ekmap.QueryParameters = QueryParameters;