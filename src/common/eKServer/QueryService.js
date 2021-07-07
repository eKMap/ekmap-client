import {
    Ekmap
} from '../Ekmap';
import {
    Util
} from '../commontypes/Util';
import {
    CommonServiceBase
} from './CommonServiceBase';
import {
    QueryParameters
} from './QueryParameters';
import {
    GeoJSON
} from '../format/GeoJSON';
import {
    DataFormat
} from '../REST';

/**
 * @class Ekmap.QueryService
 * @category eKServer Map QueryResults
 * @classdesc Query the service base class.
 * @extends {Ekmap.CommonServiceBase}
 * @param {string} url-service address. The URL for requesting the map query service should be: http://{server address}:{service port number}/eKServer/services/{map service name}/rest/maps/{map name};
 * @param {Object} options-parameters.
 * @param {Object} options.eventListeners-event listener object. The processCompleted attribute can be passed into the callback function after the processing is completed. The processFailed attribute is passed into the callback function after processing failure.
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.EKSERVER] Server type, EKSERVER.
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] query result return format, currently supports eKServerJSON and GeoJSON two formats. The parameter format is "EKSERVER", "GEOJSON".
 * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
 * @param {Object} [options.headers] request headers.
 * @example
 * var myService = new Ekmap.QueryService(url, {
 * eventListeners: {
 * "processCompleted": queryCompleted,
 * "processFailed": queryError
 *}
 * };
 */
export class QueryService extends CommonServiceBase {

    /**
     * @function Ekmap.QueryService.prototype.constructor
     * @description Query the service base class constructor.
     * @param {string} url-service address. The URL for requesting the map query service should be: http://{server address}:{service port number}/eKServer/services/{map service name}/rest/maps/{map name};
     * @param {Object} options-parameters.
     * @param {Object} options.eventListeners-the listener objects that need to be registered.
     */
     constructor(url, options) {
        super(url, options);

        /**
         * @member {boolean} Ekmap.QueryService.prototype.returnContent
         * @description Whether to return the description of the newly created resource immediately or the URI of the new resource.
         */
        this.returnContent = false;

        /**
         * @member {string} Ekmap.QueryService.prototype.format
         * @description Query result return format, currently supports eKServerJSON and GeoJSON two formats. The parameter format is "EKSERVER", "GEOJSON".
         */
        this.format = DataFormat.GEOJSON;

        this.returnFeatureWithFieldCaption = false;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.QueryService";
        if (!this.url) {
            return;
        }
        if (options && options.format) {
            this.format = options.format.toUpperCase();
        }
        this.url = Util.urlPathAppend(this.url,'queryResults');
    }

    /**
     * @function Ekmap.QueryService.prototype.destroy
     * @description releases the resource and blanks the attribute of the referenced resource.
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.format = null;
    }

    /**
     * @function Ekmap.QueryService.prototype.processAsync
     * @description is responsible for passing the query parameters of the client to the server.
     * @param {Ekmap.QueryParameters} params-query parameters.
     */
    processAsync(params) {
        if (!(params instanceof QueryParameters)) {
            return;
        }
        var me = this,
            returnCustomResult = null,
            jsonParameters = null;
        me.returnContent = params.returnContent;

        jsonParameters = me.getJsonParameters(params);
        if (me.returnContent) {
            me.url = Util.urlAppend(me.url,'returnContent=' + me.returnContent);
        } else {
            //Only for 3D use Get bounds of the highlighted picture
            returnCustomResult = params.returnCustomResult;
            if (returnCustomResult) {
                me.url = Util.urlAppend(me.url,'returnCustomResult=' + returnCustomResult);
            }
        }
        me.returnFeatureWithFieldCaption = params.returnFeatureWithFieldCaption;
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function Ekmap.QueryService.prototype.serviceProcessCompleted
     * @description After the query is complete, execute this method.
     * @param {Object} result-the result object returned by the server.
     */
    serviceProcessCompleted(result) {
        var me = this;
        result = Util.transformResult(result);
        var geoJSONFormat = new GeoJSON();
        if (result && result.recordsets) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i <len; i++) {
                if (recordsets[i].features) {
                    if (me.returnFeatureWithFieldCaption === true) {
                        recordsets[i].features.map((feature) => {
                            feature.fieldNames = recordsets[i].fieldCaptions;
                            return feature;
                        })
                    }
                    if (me.format === DataFormat.GEOJSON) {
                        recordsets[i].features = geoJSONFormat.toGeoJSON(recordsets[i].features);
                    }
                }
            }
        }

        me.events.triggerEvent("processCompleted", {
            result: result
        });
    }

    /**
     * @function Ekmap.QueryService.prototype.getQueryParameters
     * @description converts the query parameters represented by the JSON object into a QueryParameters object.
     * @param {Object} params-query parameters represented by JSON string.
     * @returns {Ekmap.QueryParameters} Returns the converted QueryParameters object.
     */
    getQueryParameters(params) {
        return new QueryParameters({
            customParams: params.customParams,
            expectCount: params.expectCount,
            networkType: params.networkType,
            queryOption: params.queryOption,
            queryParams: params.queryParams,
            startRecord: params.startRecord,
            prjCoordSys: params.prjCoordSys,
            holdTime: params.holdTime
        });
    }
}

Ekmap.QueryService = QueryService;