import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { InterpolationAnalystParameters } from './InterpolationAnalystParameters';

/**
 * @class Ekmap.InterpolationDensityAnalystParameters
 * @category iServer SpatialAnalyst InterpolationAnalyst
 * @classdesc 点密度差值分析参数类。
 * @param {Object} options - 参数。
 * @param {(Ekmap.Bounds|L.Bounds|ol.extent)} options.bounds - 插值分析的范围，用于确定结果栅格数据集的范围。
 * @param {string} options.outputDatasourceName - 插值分析结果数据源的名称。 
 * @param {string} options.outputDatasetName - 插值分析结果数据集的名称。 
 * @param {number} [options.searchRadius=0] - 查找半径，即参与运算点的查找范围，与点数据集单位相同。
 * @param {string} [options.zValueFieldName] - 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型( Ekmap.InterpolationAnalystType)为 dataset 时。此为必选参数。 
 * @param {number} [options.zValueScale=1] - 用于进行插值分析值的缩放比率。 
 * @param {number} [options.resolution] - 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
 * @param {Ekmap.FilterParameter} [options.filterQueryParameter] - 属性过滤条件。
 * @param {string} [options.pixelFormat] - 指定结果栅格数据集存储的像素格式。
 * @param {string} [options.dataset] - 用来做插值分析的数据源中数据集的名称，该名称用形如 "数据集名称@数据源别名" 形式来表示。当插值分析类型（SuperMap.InterpolationAnalystType）为 dataset 时，必设参数。 
 * @param {Array.<Ekmap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point>} [options.inputPoints] - 用于做插值分析的离散点集合。当插值分析类型（SuperMap.InterpolationAnalystType）为 geometry 时，必设参数。
 * @extends {Ekmap.InterpolationAnalystParameters}
 * @example
 * var myInterpolationDensityAnalystParameters = new Ekmap.InterpolationDensityAnalystParameters({
 *      dataset: "SamplesP@Interpolation",
 *      searchRadius: "100000",
 *      pixelFormat: "BIT16",
 *      zValueFieldName: "AVG_TMP",
 *      resolution: 3000,
 *      filterQueryParameter: {
 *          attributeFilter: ""
 *      },
 *      outputDatasetName: "myDensity"
 * });
 */
export class InterpolationDensityAnalystParameters extends InterpolationAnalystParameters {


    constructor(options) {
        super(options);
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "Ekmap.InterpolationDensityAnalystParameters";
    }

    /**
     * @function Ekmap.InterpolationDensityAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
    }
}

Ekmap.InterpolationDensityAnalystParameters = InterpolationDensityAnalystParameters;