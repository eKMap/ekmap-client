/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.ThiessenAnalystParameters
 * @category  iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc 泰森多边形分析参数基类。
 * @param {Object} options - 参数。
 * @param {(Ekmap.Geometry.Polygon|L.Polygon|ol.geom.Polygon)} [options.clipRegion] - 结果数据裁剪区域，可以为 null，表示不对结果进行裁剪。
 * @param {boolean} [options.createResultDataset=false] - 是否返回结果数据集。
 * @param {string} [options.resultDatasetName] - 指定结果数据集名称。
 * @param {string} [options.resultDatasourceName] - 指定结果数据集所在数据源，默认为当前数据源。
 * @param {boolean} [options.returnResultRegion=true] - 是否返回分析得到的多边形面数组。
 */
export class ThiessenAnalystParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {(Ekmap.Geometry.Polygon|L.Polygon|ol.geom.Polygon)} [Ekmap.ThiessenAnalystParameters.prototype.clipRegion]
         * @description 结果数据裁剪区域，可以为 null，表示不对结果进行裁剪。
         */
        this.clipRegion = null;

        /**
         *  @member {boolean} [Ekmap.ThiessenAnalystParameters.prototype.createResultDataset=false]
         *  @description 是否返回结果数据集。如果为 true，则必须设置属性 resultDatasetName 和 resultDatasourceName。
         */
        this.createResultDataset = false;

        /**
         * @member {string} Ekmap.ThiessenAnalystParameters.prototype.resultDatasetName
         * @description 指定结果数据集名称。
         */
        this.resultDatasetName = null;

        /**
         * @member {string} Ekmap.ThiessenAnalystParameters.prototype.resultDatasourceName
         * @description 指定结果数据集所在数据源。
         */
        this.resultDatasourceName = null;

        /**
         * @member {boolean} Ekmap.ThiessenAnalystParameters.prototype.returnResultRegion
         * @description 是否返回分析得到的多边形面数组。
         */
        this.returnResultRegion = true;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.ThiessenAnalystParameters";
    }

    /**
     * @function Ekmap.ThiessenAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }
        me.createResultDataset = null;
        me.resultDatasetName = null;
        me.resultDatasourceName = null;
        me.returnResultRegion = null;
    }

}

Ekmap.ThiessenAnalystParameters = ThiessenAnalystParameters;