import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { SpatialAnalystBase } from './SpatialAnalystBase';
import { GeoRelationAnalystParameters } from './GeoRelationAnalystParameters';

/**
 * @class Ekmap.GeoRelationAnalystService
 * @category iServer SpatialAnalyst GeoRelationAnalyst
 * @classdesc 空间关系分析服务类。该类负责将客户设置的空间关系分析服务参数传递给服务端，并接收服务端返回的空间关系分析结果数据。
 * @param {string} url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.SpatialAnalystBase}
 * @example 实例化该类如下例所示：
 * (start code)
 *  function datasetGeoRelationAnalystProcess() {
 *      var referenceFilter = new Ekmap.FilterParameter({
 *                              name:"Frame_R@Changchun",
 *                              attributeFilter:"SmID>0"});
 *      var sourceFilter = new Ekmap.FilterParameter({
 *                          attributeFilter:"SmID>0"});
 *      //初始化服务类
 *      var datasetGeoRelationService = new Ekmap.GeoRelationAnalystService(
 *          "http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst/"),
 *      //构建参数类
 *      datasetGeoRelationParameters = new Ekmap.GeoRelationAnalystParameters({
 *          dataset: "Park@Changchun",
 *          startRecord: 0,
 *          expectCount: 20,
 *          sourceFilter: sourceFilter,
 *          referenceFilter: referenceFilter,
 *          spatialRelationType: Ekmap.SpatialRelationType.INTERSECT,
 *          isBorderInside: true,
 *          returnFeature: true,
 *          returnGeoRelatedOnly: true
 *      });
 *      datasetGeoRelationService.events.on({
 *          "processCompleted": datasetGeoRelationAnalystCompleted,
 *          "processFailed": datasetGeoRelationAnalystFailed});
 *      //执行
 *      datasetGeoRelationService.processAsync(datasetGeoRelationParameters);
 *  }
 *  function Completed(datasetGeoRelationAnalystCompleted){//todo};
 *  function Error(datasetGeoRelationAnalystFailed){//todo};
 * (end)
 *
 */
export class GeoRelationAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.GeoRelationAnalystService";
    }

    /**
     * @function Ekmap.GeoRelationAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.GeoRelationAnalystService.prototype.processAsync
     * @description 负责将客户端的空间关系分析参数传递到服务端
     * @param {Ekmap.GeoRelationAnalystParameters} parameter - 空间关系分析所需的参数信息。
     */
    processAsync(parameter) {
        if (!(parameter instanceof GeoRelationAnalystParameters)) {
            return;
        }
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/georelation');
        var jsonParameters = Ekmap.Util.toJSON(parameter);

        me.url = Util.urlAppend(me.url, 'returnContent=true');

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


}

Ekmap.GeoRelationAnalystService = GeoRelationAnalystService;