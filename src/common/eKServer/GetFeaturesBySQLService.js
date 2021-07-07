import { Ekmap } from '../Ekmap';
import { GetFeaturesServiceBase } from './GetFeaturesServiceBase';
import { GetFeaturesBySQLParameters } from './GetFeaturesBySQLParameters';

/**
 * @class Ekmap.GetFeaturesBySQLService
 * @constructs Ekmap.GetFeaturesBySQLService
 * @category eKServer Data FeatureResults
 * @classdesc Data set SQL query service class in data service. Query spatial feature information that meets SQL conditions on one or more specified layers.
 * @param {string} url-The resource address of the data query result. Request the data set query service in the data service,
 * The URL should be: http://{server address}:{service port number}/eKServer/services/{data service name}/rest/data/;</br>
 * For example: "http://localhost:8090/eKServer/services/data-jingjin/rest/data/"
 * @param {Object} options-parameters. </br>
 * @param {Object} options.eventListeners-event listener object. The processCompleted attribute can be passed into the callback function after the processing is completed. The processFailed attribute is passed into the callback function after processing failure.
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.EKSERVER] Server type, EKSERVER.
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] query result return format, currently supports eKServerJSON and GeoJSON two formats. The parameter format is "EKSERVER", "GEOJSON".
 * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
 * @param {Object} [options.headers] request headers.
 * @extends {Ekmap.GetFeaturesServiceBase}
 * @example
 * var myGetFeaturesBySQLService = new Ekmap.GetFeaturesBySQLService(url, {
 * eventListeners: {
 * "processCompleted": GetFeaturesCompleted,
 * "processFailed": GetFeaturesError
 *}
 * });
 * function getFeaturesCompleted(object){//todo};
 * function getFeaturesError(object){//todo};
 *
 */
export class GetFeaturesBySQLService extends GetFeaturesServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.GetFeaturesBySQLService";
    }

    /**
     * @function Ekmap.GetFeaturesBySQLService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /*
     * @function Ekmap.GetFeaturesBySQLService.prototype.getJsonParameters
     * @description converts query parameters into JSON strings.
     * Override this method in this class to achieve different types of queries (ID, SQL, Buffer, Geometry, etc.).
     * @param {Ekmap.GetFeaturesBySQLParameters} params-Data set SQL query parameter class.
     * @returns {string} The converted JSON string.
     */
    getJsonParameters(params) {
        return GetFeaturesBySQLParameters.toJsonParameters(params);
    }
}

Ekmap.GetFeaturesBySQLService = GetFeaturesBySQLService;