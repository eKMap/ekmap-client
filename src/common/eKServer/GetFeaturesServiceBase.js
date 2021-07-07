import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { DataFormat } from '../REST';
import { CommonServiceBase } from './CommonServiceBase';
import { GeoJSON } from '../format/GeoJSON';

/**
 * @class Ekmap.GetFeaturesServiceBase
 * @category eKServer Data FeatureResults
 * @classdesc Data set query service base class in data service. The result data type is Object. Contains the result attribute. The data format of the result is determined to be GeoJSON or eKServerJSON according to the format parameter.
 * @extends Ekmap.CommonServiceBase
 * @param {string} url-The resource address of the data query result. Request the data set query service in the data service,
 * The URL should be: http://{server address}:{service port number}/eKServer/services/{data service name}/rest/data/
 * For example: "http://localhost:8090/eKServer/services/data-jingjin/rest/data/"
 * @param {Object} options-parameters.
 * @param {Object} options.eventListeners-event listener object. The processCompleted attribute can be passed into the callback function after the processing is completed. The processFailed attribute is passed into the callback function after processing failure.
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.EKSERVER] Server type, EKSERVER
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] query result return format, currently supports eKServerJSON and GeoJSON two formats. The parameter format is "EKSERVER", "GEOJSON".
 * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
 * @param {Object} [options.headers] request headers.
 * @example
 * var myService = new Ekmap.GetFeaturesServiceBase(url, {
 * eventListeners: {
 * "processCompleted": getFeatureCompleted,
 * "processFailed": getFeatureError
 *}
 * });
 */
export class GetFeaturesServiceBase extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        options = options || {};

        /**
         * @member {boolean} [Ekmap.GetFeaturesServiceBase.prototype.returnContent=true]
         * @description Whether to return the description of the newly created resource immediately or the URI of the new resource.
         * If it is true, it will directly return the newly created resource, that is, the expression of the query result.
         * If false, the URI of the query result resource is returned.
         */
        this.returnContent = true;

        /**
         * @member {number} [Ekmap.GetFeaturesServiceBase.prototype.fromIndex=0]
         * @description The minimum index number of the query result. If the value is greater than the maximum index number of the query result, the query result is empty.
         */
        this.fromIndex = 0;

        /**
         * @member {number} [Ekmap.GetFeaturesServiceBase.prototype.toIndex=19]
         * @description The maximum index number of the query result.
         * If the value is greater than the maximum index number of the query result, the maximum index number of the query result will be the end index number.
         */
        this.toIndex = 19;

        /**
         * @member {number} [Ekmap.GetFeaturesServiceBase.prototype.maxFeatures=1000]
         * @description is used to set the number of query result entries returned by the server during SQL query.
         */
        this.maxFeatures = null;

        /**
         * @member {string} [Ekmap.GetFeaturesServiceBase.prototype.format=Ekmap.DataFormat.GEOJSON]
         * @description Query result return format, currently supports eKServerJSON and GeoJSON two formats.
         * The parameter format is "EKSERVER", "GEOJSON".
         */
        this.format = DataFormat.GEOJSON;

        Util.extend(this, options);
        this.url = Util.urlPathAppend(this.url,'featureResults');

        this.CLASS_NAME = "Ekmap.GetFeaturesServiceBase";
    }

    /**
     * @function Ekmap.GetFeaturesServiceBase.prototype.destroy
     * @description releases the resource and blanks the attribute of the referenced resource.
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
        me.format = null;
    }

    /**
     * @function Ekmap.GetFeaturesServiceBase.prototype.processAsync
     * @description passes the query parameters of the client to the server.
     * @param {Object} params-query parameters.
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters = null,
            firstPara = true;

        me.returnContent = params.returnContent;
        me.fromIndex = params.fromIndex;
        me.toIndex = params.toIndex;
        me.maxFeatures = params.maxFeatures;
        if (me.returnContent) {
            me.url = Util.urlAppend(me.url,'returnContent=' + me.returnContent);
            firstPara = false;
        }
        var isValidNumber = me.fromIndex != null && me.toIndex != null && !isNaN(me.fromIndex) && !isNaN(me.toIndex);
        if (isValidNumber && me.fromIndex >= 0 && me.toIndex >= 0 && !firstPara) {
            me.url = Util.urlAppend(me.url, `fromIndex=${me.fromIndex}&toIndex=${me.toIndex}`);
        }

        if (params.returnCountOnly) {
            me.url = Util.urlAppend(me.url, "&returnCountOnly=" + params.returnContent)
        }
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function Ekmap.GetFeaturesServiceBase.prototype.getFeatureComplete
     * @description After the query is complete, execute this method.
     * @param {Object} result-the result object returned by the server.
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        if (me.format === DataFormat.GEOJSON && result.features) {
            var geoJSONFormat = new GeoJSON();
            result.features = geoJSONFormat.toGeoJSON(result.features);
        }
        me.events.triggerEvent("processCompleted", {result: result });
    }
}

Ekmap.GetFeaturesServiceBase = GetFeaturesServiceBase;