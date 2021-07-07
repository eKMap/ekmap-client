import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { QueryService } from './QueryService';
import { QueryBySQLParameters } from './QueryBySQLParameters';

/**
 * @class Ekmap.QueryBySQLService
 * @category eKServer Map QueryResults
 * @classdesc SQL query service class. Query spatial feature information that meets SQL conditions on one or more specified layers.
 * @extends {Ekmap.QueryService}
 * @example
 * var queryParam = new Ekmap.FilterParameter({
 * name: "Countries@World.1",
 * attributeFilter: "Pop_1994>1000000000 and SmArea>900"
 * });
 * var queryBySQLParams = new Ekmap.QueryBySQLParameters({
 * queryParams: [queryParam]
 * });
 * var myQueryBySQLService = new Ekmap.QueryBySQLService(url, {eventListeners: {
 * "processCompleted": queryCompleted,
 * "processFailed": queryError
 *}
 * });
 * queryBySQLService.processAsync(queryBySQLParams);
 * function queryCompleted(object){//todo};
 * function queryError(object){//todo};
 * @param {string} url-The access address of the service. To access the World Map service, just set the url to: http://localhost:8090/eKServer/services/map-world/rest/maps/World+Map.
 * @param {Object} options-parameters.
 * @param {Object} options.eventListeners-event listener object. The processCompleted attribute can be passed into the callback function after the processing is completed. The processFailed attribute is passed into the callback function after processing failure.
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.EKSERVER] Server type, EKSERVER.
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] query result return format, currently supports eKServerJSON and GeoJSON two formats. The parameter format is "EKSERVER", "GEOJSON".
 * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
 * @param {Object} [options.headers] request headers.
 */
export class QueryBySQLService extends QueryService {

    /**
     * @function Ekmap.QueryBySQLService.prototype.constructor
     * @description SQL query service class constructor.
     * @param {string} url-The access address of the service. To access the World Map service, just set the url to: http://localhost:8090/eKServer/services/map-world/rest/maps/World+Map.
     * @param {Object} options-parameters.
     * @param {Object} options.eventListeners-the listener objects that need to be registered.
     */
     constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.QueryBySQLService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.QueryBySQLService.prototype.getJsonParameters
     * @description converts query parameters into JSON strings.
     * Override this method in this class to achieve different types of queries (sql, geometry, distance, bounds, etc.).
     * @param {Ekmap.QueryBySQLParameters} params-SQL query parameter class.
     * @returns {Object} The converted JSON string.
     */
    getJsonParameters(params) {
        if (!(params instanceof QueryBySQLParameters)) {
            return;
        }
        var me = this,
            jsonParameters = "",
            qp = null;
        qp = me.getQueryParameters(params);
        jsonParameters += "'queryMode':'SqlQuery','queryParameters':";
        jsonParameters += Util.toJSON(qp);
        jsonParameters = "{" + jsonParameters + "}";
        return jsonParameters;
    }
}

Ekmap.QueryBySQLService = QueryBySQLService;