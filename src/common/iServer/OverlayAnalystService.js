import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { SpatialAnalystBase } from './SpatialAnalystBase';
import { DatasetOverlayAnalystParameters } from './DatasetOverlayAnalystParameters';
import { GeometryOverlayAnalystParameters } from './GeometryOverlayAnalystParameters';

/**
 * @class Ekmap.OverlayAnalystService
 * @category iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 叠加分析服务类。
 * 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 * 叠加分析结果通过该类支持的事件的监听函数参数获取
 * @param {string} url - 服务的访问地址。如http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.CommonServiceBase}
 * @example 例如：
 * (start code)
 * var myOverlayAnalystService = new Ekmap.OverlayAnalystService(url, {
 *     eventListeners: {
 *	       "processCompleted": OverlayCompleted,
 *		   "processFailed": OverlayFailed
 *		   }
 * });
 * (end)
 */

export class OverlayAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        /**
         * @member {string} Ekmap.OverlayAnalystService.prototype.mode
         * @description 叠加分析类型
         */
        this.mode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.OverlayAnalystService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function Ekmap.OverlayAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.OverlayAnalystParameters} parameter - 叠加分析参数类。
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        if (parameter instanceof DatasetOverlayAnalystParameters) {
            me.mode = "datasets";
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.sourceDataset + '/overlay');
            DatasetOverlayAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryOverlayAnalystParameters) {
            me.mode = "geometry";
            //支持传入多个几何要素进行叠加分析
            if (parameter.operateGeometries && parameter.sourceGeometries) {
                me.url = Util.urlPathAppend(me.url, 'geometry/overlay/batch');
                me.url = Util.urlAppend(me.url, 'ignoreAnalystParam=true');
            } else {
                me.url = Util.urlPathAppend(me.url, 'geometry/overlay');
            }
            GeometryOverlayAnalystParameters.toObject(parameter, parameterObject);
        }
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        var jsonParameters = Util.toJSON(parameterObject);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

Ekmap.OverlayAnalystService = OverlayAnalystService;