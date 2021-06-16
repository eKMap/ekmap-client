import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ChartQueryFilterParameter } from './ChartQueryFilterParameter';

/**
 * @class Ekmap.ChartQueryParameters
 * @category iServer Map Chart
 * @classdesc 海图查询参数类，该类用于设置海图查询时的相关参数，海图查询分为海图属性查询和海图范围查询两类，通过属性 queryMode 指定查询模式。
 *            必设属性有：queryMode、chartLayerNames、chartQueryFilterParameters。当进行海图范围查询时，必设属性还包括 bounds。
 * @param {Object} options - 参数。 
 * @param {string} options.queryMode - 海图查询模式类型，支持两种查询方式：海图属性查询（"ChartAttributeQuery"）和海图空间查询（"ChartBoundsQuery"）。 
 * @param {Array.<string>} options.chartLayerNames - 查询的海图图层的名称。
 * @param {Array.<{Ekmap.ChartQueryFilterParameter}>} options.chartQueryFilterParameters - 海图查询过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。 
 * @param {(Ekmap.Bounds|L.Bounds|ol.extent)} [options.bounds] - 海图查询范围。当进行海图范围查询时，此参数为必选。
 * @param {boolean} [options.returnContent=true] - 获取或设置是返回查询结果记录集 recordsets，还是返回查询结果的资源 resourceInfo。 
 * @param {number} [options.startRecord=0] - 查询起始记录位置。 
 * @param {number} [options.expectCount] - 期望查询结果返回的记录数，该值大于0。
 */
export class ChartQueryParameters {


    constructor(options) {
        /**
         * @member {string} Ekmap.ChartQueryParameters.prototype.queryMode
         * @description 海图查询模式类型，支持两种查询方式：海图属性查询（"ChartAttributeQuery"）和海图空间查询（"ChartBoundsQuery"） 。
         */
        this.queryMode = null;

        /**
         * @member {(Ekmap.Bounds|L.Bounds|ol.extent)} Ekmap.ChartQueryParameters.prototype.bounds
         * @description 海图查询范围。
         */
        this.bounds = null;

        /**
         * @member {Array.<string>} Ekmap.ChartQueryParameters.prototype.chartLayerNames
         * @description 查询的海图图层的名称。
         */
        this.chartLayerNames = null;

        /**
         * @member {Array.<Ekmap.ChartQueryFilterParameter>} Ekmap.ChartQueryParameters.prototype.chartQueryFilterParameters
         * @description 海图查询过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
         */
        this.chartQueryFilterParameters = null;

        /**
         * @member {boolean} [Ekmap.ChartQueryParameters.prototype.returnContent=true]
         * @description 获取或设置是返回查询结果记录集 recordsets，还是返回查询结果的资源 resourceInfo。
         */
        this.returnContent = true;

        /**
         * @member {number} [Ekmap.ChartQueryParameters.prototype.startRecord=0]
         * @description 查询起始记录位置。
         */
        this.startRecord = 0;

        /**
         * @member {number} [Ekmap.ChartQueryParameters.prototype.expectCount]
         * @description 期望查询结果返回的记录数，该值大于0。
         */
        this.expectCount = null;
        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.ChartQueryParameters";
    }

    /**
     * @function Ekmap.ChartQueryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.queryMode = null;
        me.bounds = null;
        me.chartLayerNames = null;
        me.chartQueryFilterParameters = null;
        me.returnContent = true;
        me.startRecord = 0;
        me.expectCount = null;
    }

    /**
     * @function Ekmap.ChartQueryParameters.prototype.getVariablesJson
     * @description 将属性信息转换成能够被服务识别的 JSON 格式字符串。
     * @returns {string} JSON 字符串。
     */
    getVariablesJson() {
        var json = "";

        json += "\"queryMode\":\"" + this.queryMode + "\",";

        if (this.chartLayerNames && this.chartLayerNames.length) {
            var chartLayersArray = [];
            var layerLength = this.chartLayerNames.length;
            for (var i = 0; i < layerLength; i++) {
                chartLayersArray.push("\"" + this.chartLayerNames[i] + "\"");
            }
            var layerNames = "[" + chartLayersArray.join(",") + "]";
            json += "\"chartLayerNames\":" + layerNames + ",";
        }

        if (this.queryMode === "ChartBoundsQuery" && this.bounds) {
            json += "\"bounds\":" + "{" + "\"leftBottom\":" + "{" + "\"x\":" + this.bounds.left + "," +
                "\"y\":" + this.bounds.bottom + "}" + "," + "\"rightTop\":" + "{" + "\"x\":" + this.bounds.right + "," +
                "\"y\":" + this.bounds.top + "}" + "},";
        }

        if (this.chartQueryFilterParameters && this.chartQueryFilterParameters.length) {
            var chartParamArray = [];
            var chartLength = this.chartQueryFilterParameters.length;
            for (var j = 0; j < chartLength; j++) {
                var chartQueryFilterParameter = this.chartQueryFilterParameters[j];
                if (!(chartQueryFilterParameter instanceof ChartQueryFilterParameter)) {
                    continue;
                }
                chartParamArray.push(chartQueryFilterParameter.toJson());
            }
            var chartParamsJson = "[" + chartParamArray.join(",") + "]";
            chartParamsJson = "\"chartQueryParams\":" + chartParamsJson + ",";
            chartParamsJson += "\"startRecord\":" + this.startRecord + ",";
            chartParamsJson += "\"expectCount\":" + this.expectCount;
            chartParamsJson = "{" + chartParamsJson + "}";
            json += "\"chartQueryParameters\":" + chartParamsJson;
        }
        json = "{" + json + "}";
        return json;
    }
}

Ekmap.ChartQueryParameters = ChartQueryParameters;