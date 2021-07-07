import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { QueryParameters } from './QueryParameters';

/**
 * @class Ekmap.QueryBySQLParameters
 * @category eKServer Map QueryResults
 * @classdesc SQL query parameter class.
 * This class is used to set the relevant parameters of the SQL query.
 * @extends {Ekmap.QueryParameters}
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
 * @param {boolean} [options.returnContent=true] Whether to return the description of the newly created resource immediately or the URI of the new resource.
 * @param {boolean} [options.returnFeatureWithFieldCaption = false] Whether the returned feature field identifier of the query result is a field alias. When it is false, it returns the field name; when it is true, it returns the field alias.
 */
export class QueryBySQLParameters extends QueryParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        super(options);
        /**
         * @member {boolean} [Ekmap.QueryBySQLParameters.prototype.returnContent=true]
         * @description Whether to return the description of the newly created resource immediately or the URI of the new resource.
         * If it is true, it will directly return the newly created resource, that is, the expression of the query result.
         * Is false, the URI of the query result resource is returned.
         */
        this.returnContent = true;
        Util.extend(this, options);
        this.CLASS_NAME = "Ekmap.QueryBySQLParameters";
    }

    /**
     * @function Ekmap.QueryBySQLParameters.prototype.destroy
     * @description releases the resource and blanks the attribute of the referenced resource.
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
    }
}
Ekmap.QueryBySQLParameters = QueryBySQLParameters;