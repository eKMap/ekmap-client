/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { SummaryType, AnalystSizeUnit } from '../REST';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class Ekmap.SummaryRegionJobParameter
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(Ekmap.Bounds|L.Bounds|ol.extent)} [options.query] - 分析范围（默认为全图范围）。
 * @param {string} [options.standardFields] - 标准属性字段名称。
 * @param {string} [options.weightedFields] - 权重字段名称。
 * @param {Ekmap.StatisticAnalystMode} [options.standardStatisticModes] - 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
 * @param {Ekmap.StatisticAnalystMode} [options.weightedStatisticModes] - 权重字段的统计模式。weightedSummaryFields 为 true 时必填。 
 * @param {boolean} [options.sumShape=true] - 是否统计长度或面积。
 * @param {boolean} [options.standardSummaryFields=false] - 是否以标准属字段统计。
 * @param {boolean} [options.weightedSummaryFields=false] - 是否以权重字段统计。
 * @param {number} [options.resolution=100] - 网格大小。
 * @param {number} [options.meshType=0] - 网格面汇总类型。
 * @param {Ekmap.AnalystSizeUnit} [options.meshSizeUnit=Ekmap.AnalystSizeUnit.METER] - 网格大小单位。
 * @param {Ekmap.SummaryType} [options.type=Ekmap.SummaryType.SUMMARYMESH] - 汇总类型。
 * @param {Ekmap.OutputSetting} [options.output] - 输出参数设置。
 * @param {Ekmap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。   
 */
export class SummaryRegionJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} Ekmap.SummaryRegionJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {string} Ekmap.SummaryRegionJobParameter.prototype.regionDataset
         * @description 汇总数据源（多边形汇总时用到的参数）。
         */
        this.regionDataset = "";

        /**
         * @member {boolean} [Ekmap.SummaryRegionJobParameter.prototype.sumShape=true]
         * @description 是否统计长度或面积。
         */
        this.sumShape = true;

        /**
         * @member {(Ekmap.Bounds|L.Bounds|ol.extent)} Ekmap.SummaryRegionJobParameter.prototype.query
         * @description 分析范围。
         */
        this.query = "";

        /**
         * @member {boolean} [Ekmap.SummaryRegionJobParameter.prototype.standardSummaryFields=false]
         * @description 是否以标准属字段统计。
         */
        this.standardSummaryFields = false;

        /**
         * @member {string} Ekmap.SummaryRegionJobParameter.prototype.standardFields
         * @description 标准属性字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。standardSummaryFields 为 true 时必填。 
         */
        this.standardFields = "";

        /**
         * @member {Ekmap.StatisticAnalystMode} Ekmap.SummaryRegionJobParameter.prototype.standardStatisticModes
         * @description 标准属性字段的统计模式。standardSummaryFields 为 true 时必填。
         */
        this.standardStatisticModes = "";

        /**
         * @member {boolean} [Ekmap.SummaryRegionJobParameter.prototype.weightedSummaryFields=false]
         * @description 是否以权重字段统计。
         */
        this.weightedSummaryFields = false;

        /**
         * @member {string} Ekmap.SummaryRegionJobParameter.prototype.weightedFields
         * @description 权重字段名称。仅支持系统字段以外的整形、长整形、浮点型的字段的名称。weightedSummaryFields 为 true 时必填。 
         */
        this.weightedFields = "";

        /**
         * @member {Ekmap.StatisticAnalystMode} Ekmap.SummaryRegionJobParameter.prototype.weightedStatisticModes
         * @description 以权重字段统计的统计模式。权重字段的统计模式。weightedSummaryFields 为 true 时必填。 
         */
        this.weightedStatisticModes = "";

        /**
         * @member {number} [Ekmap.SummaryRegionJobParameter.prototype.meshType=0]
         * @description 网格面汇总类型。
         */
        this.meshType = 0;

        /**
         * @member {number} [Ekmap.SummaryRegionJobParameter.prototype.resolution=100]
         * @description 网格大小。
         */
        this.resolution = 100;

        /**
         * @member {Ekmap.AnalystSizeUnit} [Ekmap.SummaryRegionJobParameter.prototype.meshSizeUnit=Ekmap.AnalystSizeUnit.METER]
         * @description 网格大小单位。
         */
        this.meshSizeUnit = AnalystSizeUnit.METER;

        /**
         * @member {Ekmap.SummaryType} [Ekmap.SummaryRegionJobParameter.prototype.type=Ekmap.SummaryType.SUMMARYMESH]
         * @description 汇总类型。
         */
        this.type = SummaryType.SUMMARYMESH;

        /**
         * @member {Ekmap.OutputSetting} Ekmap.SummaryRegionJobParameter.prototype.output
         * @description 输出参数设置类
         */
        this.output = null;

        /**
         * @member {Ekmap.MappingParameters} [Ekmap.SummaryRegionJobParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。   
         */
        this.mappingParameters = null;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.SummaryRegionJobParameter";
    }

    /**
     * @function Ekmap.SummaryRegionJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.sumShape = null;
        this.regionDataset = null;
        this.query = null;
        this.standardSummaryFields = null;
        this.standardFields = null;
        this.standardStatisticModes = null;
        this.weightedSummaryFields = null;
        this.weightedFields = null;
        this.weightedStatisticModes = null;
        this.meshType = null;
        this.resolution = null;
        this.meshSizeUnit = null;
        this.type = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters) {
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function Ekmap.SummaryRegionJobParameter.toObject
     * @param {Object} summaryRegionJobParameter - 矢量裁剪分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成区域汇总分析服务对象。
     */
    static toObject(summaryRegionJobParameter, tempObj) {
        for (var name in summaryRegionJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = summaryRegionJobParameter[name];
                continue;
            }
            if (name === "type") {
                tempObj['type'] = summaryRegionJobParameter[name];
                continue;
            }
            if (name === "type") {
                tempObj['type'] = summaryRegionJobParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = summaryRegionJobParameter[name];
                continue;
            }
            if (summaryRegionJobParameter.type === "SUMMARYREGION" || summaryRegionJobParameter.type === "SUMMARYMESH" && name !== "regionDataset") {
                tempObj['analyst'] = tempObj['analyst'] || {};
                if (name === 'query' && summaryRegionJobParameter[name]) {
                    tempObj['analyst'][name] = summaryRegionJobParameter[name].toBBOX();
                } else {
                    tempObj['analyst'][name] = summaryRegionJobParameter[name];
                }
                if (name === 'mappingParameters') {
                    tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                    tempObj['analyst']['mappingParameters'] = summaryRegionJobParameter[name];
                }

            }
        }
    }

}

Ekmap.SummaryRegionJobParameter = SummaryRegionJobParameter;