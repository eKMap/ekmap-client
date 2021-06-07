/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.UpdateEdgeWeightParameters
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 边的耗费权重更新服务参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.edgeId - 所在边的 ID。 
 * @param {string} options.fromNodeId - 起始转向点的 ID。 
 * @param {string} options.toNodeId - 终止转向点的 ID。 
 * @param {string} options.weightField - 边的耗费字段。 
 * @param {string} options.edgeWeight - 耗费权重。
 */
export class UpdateEdgeWeightParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} Ekmap.UpdateEdgeWeightParameters.prototype.edgeId
         * @description 所在边的 ID。
         */
        this.edgeId = "";

        /**
         * @member {string} Ekmap.UpdateEdgeWeightParameters.prototype.fromNodeId
         * @description 起始转向点的 ID。
         */
        this.fromNodeId = "";

        /**
         * @member {string} Ekmap.UpdateEdgeWeightParameters.prototype.toNodeId
         * @description 终止转向点的 ID。
         */
        this.toNodeId = "";

        /**
         * @member {string} Ekmap.UpdateEdgeWeightParameters.prototype.weightField
         * @description 边的耗费字段。
         */
        this.weightField = "";

        /**
         * @member {string} Ekmap.UpdateEdgeWeightParameters.prototype.edgeWeight
         * @description 耗费权重。
         */
        this.edgeWeight = "";

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.UpdateEdgeWeightParameters";
    }


    /**
     * @function Ekmap.UpdateEdgeWeightParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.edgeId = null;
        this.fromNodeId = null;
        this.toNodeId = null;
        this.weightField = null;
        this.edgeWeight = null;
    }

}

Ekmap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;