import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { TransportationAnalystParameter } from './TransportationAnalystParameter';

/**
 * @class Ekmap.ComputeWeightMatrixParameters
 * @category iServer NetworkAnalyst WeightMatrix
 * @classdesc 耗费矩阵分析参数类。根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 * @param {Object} options - 参数。 
 * @param {boolean} [options.isAnalyzeById=false] - 是否通过节点 ID 指定路径分析的结点。 
 * @param {Array.<Ekmap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number>} options.nodes - 要计算耗费矩阵的点数组。 
 * @param {Ekmap.TransportationAnalystParameter} [options.parameter] - 交通网络分析通用参数。
 */
export class ComputeWeightMatrixParameters {


    constructor(options) {
        /**
         * @member {boolean} [Ekmap.ComputeWeightMatrixParameters.prototype.isAnalyzeById=false]
         * @description 是否通过节点 ID 指定路径分析的结点，即通过坐标点指定。
         */
        this.isAnalyzeById = false;

        /**
         * @member {Array.<Ekmap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point|number>} Ekmap.ComputeWeightMatrixParameters.prototype.nodes
         * @description 要计算耗费矩阵的点数组。
         *              当 {@link Ekmap.ComputeWeightMatrixParameters.isAnalyzeById} = false 时，nodes 应为点的坐标数组；
         *              当 {@link Ekmap.ComputeWeightMatrixParameters.isAnalyzeById} = true 时，nodes 应为点的 ID 数组。
         */
        this.nodes = null;

        /**
         * @member {Ekmap.TransportationAnalystParameter} Ekmap.ComputeWeightMatrixParameters.prototype.parameter
         * @description 交通网络分析通用参数。
         */
        this.parameter = new TransportationAnalystParameter();

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.ComputeWeightMatrixParameters";
    }

    /**
     * @function Ekmap.ComputeWeightMatrixParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isAnalyzeById = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }
}

Ekmap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;