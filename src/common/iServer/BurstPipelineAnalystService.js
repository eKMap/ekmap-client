import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { BurstPipelineAnalystParameters } from './BurstPipelineAnalystParameters';

/**
 * @class Ekmap.BurstPipelineAnalystService
 * @category iServer NetworkAnalyst BurstAnalyse
 * @classdesc 爆管分析服务类，即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组、普通结点 ID 数组及其上下游弧段 ID 数组。
 * @extends {Ekmap.NetworkAnalystServiceBase}
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}，
 *                       例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class BurstPipelineAnalystService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "Ekmap.BurstPipelineAnalystService";
    }

    /**
     * @function Ekmap.BurstPipelineAnalystService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Ekmap.BurstPipelineAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @params {Ekmap.BurstPipelineAnalystParameters} params - 爆管分析参数类
     */
    processAsync(params) {
        if (!(params instanceof BurstPipelineAnalystParameters)) {
            return null;
        }
        var me = this,
            jsonObject;
        me.url = Util.urlPathAppend(me.url, 'burstAnalyse');
        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        //必传参数不正确，就终止
        if (params.edgeID !== null && params.nodeID !== null) {
            throw new Error('edgeID and nodeID cannot be null at the same time.');
        }
        if (params.edgeID === null && params.nodeID === null) {
            throw new Error('edgeID and nodeID cannot be null at the same time.');
        }
        if (params.edgeID !== null) {
            jsonObject.edgeID = params.edgeID;
        } else {
            jsonObject.nodeID = params.nodeID;
        }

        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


}

Ekmap.BurstPipelineAnalystService = BurstPipelineAnalystService;