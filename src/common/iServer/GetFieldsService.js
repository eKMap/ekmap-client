import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class Ekmap.GetFieldsService
 * @category iServer Data Field
 * @classdesc 字段查询服务，支持查询指定数据集的中所有属性字段（field）的集合。
 * @param {string} url - 服务的访问地址。如访问World Map服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。 
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string}options.datasource - 要查询的数据集所在的数据源名称。</br>
 * @param {string}options.dataset - 要查询的数据集名称。</br>
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {Ekmap.CommonServiceBase}
 * @example
 * var myService = new Ekmap.GetFieldsService(url, {eventListeners: {
 *     "processCompleted": getFieldsCompleted,
 *     "processFailed": getFieldsError
 *     },
 *     datasource: "World",
 *     dataset: "Countries"
 * };
 *
 */
export class GetFieldsService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} Ekmap.GetFieldsService.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} Ekmap.GetFieldsService.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.GetFieldsService";
    }


    /**
     * @function Ekmap.GetFieldsService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }


    /**
     * @function Ekmap.GetFieldsService.prototype.processAsync
     * @description 执行服务，查询指定数据集的字段信息。
     */
    processAsync() {
        var me = this;
        me.url = Util.urlPathAppend(me.url, `datasources/${me.datasource}/datasets/${me.dataset}/fields`);
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

Ekmap.GetFieldsService = GetFieldsService;