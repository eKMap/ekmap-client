import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { EditType } from '../REST';
import { CommonServiceBase } from './CommonServiceBase';
import { EditFeaturesParameters } from './EditFeaturesParameters';

/**
 * @class Ekmap.EditFeaturesService
 * @category  iServer Data Feature
 * @classdesc 数据服务中数据集添加、更新、删除服务类。
 * @extends {Ekmap.CommonServiceBase}
 * @param {string} url - 服务端的数据服务资源地址。请求数据服务中数据集编辑服务，URL 应为：</br>
 * http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/datasources/name/{数据源名}/datasets/name/{数据集名} 。</br>
 * 例如：http://localhost:8090/iserver/services/data-jingjin/rest/data/datasources/name/Jingjin/datasets/name/Landuse_R
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。
 * @param {Ekmap.DataFormat} [format] -查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myService = new Ekmap.EditFeaturesService(url, {eventListeners: {
 *     "processCompleted": editFeatureCompleted,
 *     "processFailed": editFeatureError
 *       }
 * };
 *
 */
export class EditFeaturesService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {boolean} [Ekmap.EditFeaturesService.prototype.returnContent=false]
         * @description要素添加时，isUseBatch 不传或传为 false 的情况下有效。true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。
         */
        this.returnContent = false;

        /**
         * @member {boolean} [Ekmap.EditFeaturesService.prototype.isUseBatch=false]
         * @description 是否使用批量添加要素功能，要素添加时有效。
         *              批量添加能够提高要素编辑效率。
         *              true 表示批量添加；false 表示不使用批量添加。
         */
        this.isUseBatch = false;

        if (options) {
            Util.extend(this, options);
        }
        this.url = Util.urlPathAppend(this.url, 'features');

        this.CLASS_NAME = "Ekmap.EditFeaturesService";
    }


    /**
     * @function Ekmap.EditFeaturesService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.returnContent = null;
        me.isUseBatch = null;
        me.fromIndex = null;
        me.toIndex = null;
    }


    /**
     * @function Ekmap.EditFeaturesService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param {Ekmap.EditFeaturesParameters} params - 编辑要素参数。
     */
    processAsync(params) {
        if (!(params instanceof EditFeaturesParameters)) {
            return;
        }
        var me = this,
            method = "POST",
            ids = "",
            editType = params.editType,
            jsonParameters = null;

        me.returnContent = params.returnContent;
        me.isUseBatch = params.isUseBatch;
        jsonParameters = EditFeaturesParameters.toJsonParameters(params);
        if (editType === EditType.DELETE) {
            ids = Util.toJSON(params.IDs);
            me.url = Util.urlAppend(me.url, "ids=" + ids);
            method = "DELETE";
            jsonParameters = ids;
        } else if (editType === EditType.UPDATE) {
            method = "PUT";
        } else {
            if (me.isUseBatch) {
                me.url = Util.urlAppend(me.url, `isUseBatch=${me.isUseBatch}`);
                me.returnContent = false;
            }
            if (me.returnContent) {
                me.url = Util.urlAppend(me.url, 'returnContent=true');
                method = "POST";
            }
        }

        me.request({
            method: method,
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

Ekmap.EditFeaturesService = EditFeaturesService;