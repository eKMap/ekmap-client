import { Ekmap } from '../Ekmap';
import { SpatialAnalystBase } from './SpatialAnalystBase';
import { AreaSolarRadiationParameters } from './AreaSolarRadiationParameters';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.AreaSolarRadiationService
 * @category iServer SpatialAnalyst SolarRadiationAnalyst
 * @classdesc 地区太阳辐射服务类。
 * @param {string} url - 服务的访问地址。如：</br>http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst。</br>
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myAreaSolarRadiationService = new Ekmap.AreaSolarRadiationService(url);
 * myAreaSolarRadiationService.on({
 *     "processCompleted": processCompleted,
 *     "processFailed": processFailed
 *     }
 * );
 * (end)
 *
 */
export class AreaSolarRadiationService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.AreaSolarRadiationService";
    }

    /**
     * @function Ekmap.AreaSolarRadiationService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.AreaSolarRadiationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {Ekmap.AreaSolarRadiationParameters} parameter - 地区太阳辐射参数。
     */
    processAsync(parameter) {
        if (!(parameter instanceof AreaSolarRadiationParameters)) {
            return;
        }
        var me = this;
        var parameterObject = {};

        if (parameter instanceof AreaSolarRadiationParameters) {
            me.url = Util.urlPathAppend(me.url, `datasets/${parameter.dataset}/solarradiation`);
        }
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        AreaSolarRadiationParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);

        me.request({
            method: 'POST',
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

Ekmap.AreaSolarRadiationService = AreaSolarRadiationService;