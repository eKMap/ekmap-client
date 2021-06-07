import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { AnalystSizeUnit } from '../REST';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class Ekmap.BuffersAnalystJobsParameter
 * @category iServer ProcessingService BufferAnalyst
 * @classdesc 缓冲区分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(Ekmap.Bounds|L.Bounds|ol.extent)} [options.bounds] - 分析范围（默认为全图范围）。
 * @param {string} [options.distance='15'] - 缓冲距离，或缓冲区半径。
 * @param {string} [options.distanceField='pickup_latitude'] - 缓冲区分析距离字段。
 * @param {Ekmap.AnalystSizeUnit} [options.distanceUnit=Ekmap.AnalystSizeUnit.METER] - 缓冲距离单位单位。
 * @param {Ekmap.OutputSetting} [options.output] - 输出参数设置。
 * @param {Ekmap.MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 */
export class BuffersAnalystJobsParameter {
    constructor(options) {
        /**
         * @member {string} Ekmap.BuffersAnalystJobsParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = '';

        /**
         * @member {(Ekmap.Bounds|L.Bounds|ol.extent)} Ekmap.BuffersAnalystJobsParameter.prototype.bounds
         * @description 分析范围。
         */
        this.bounds = '';

        /**
         * @member {string} [Ekmap.BuffersAnalystJobsParameter.prototype.distance='15']
         * @description 缓冲距离，或称为缓冲区半径。当缓冲距离字段位空时，此参数有效。
         */
        this.distance = '';

        /**
         * @member {string} [Ekmap.BuffersAnalystJobsParameter.prototype.distanceField='pickup_latitude']
         * @description 缓冲距离字段。
         */
        this.distanceField = '';

        /**
         * @member {Ekmap.AnalystSizeUnit} [Ekmap.BuffersAnalystJobsParameter.prototype.distanceUnit=Ekmap.AnalystSizeUnit.METER]
         * @description 缓冲距离单位。
         */
        this.distanceUnit = AnalystSizeUnit.METER;

        /**
         * @member {string} Ekmap.BuffersAnalystJobsParameter.prototype.dissolveField
         * @description 融合字段，根据字段值对缓冲区结果面对象进行融合。
         */
        this.dissolveField = '';

        /**
         * @member {Ekmap.OutputSetting} [Ekmap.BuffersAnalystJobsParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
         * @member {Ekmap.MappingParameters} [Ekmap.BuffersAnalystJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        if (!options) {
            return this;
        }
        Util.extend(this, options);

        this.CLASS_NAME = 'Ekmap.BuffersAnalystJobsParameter';
    }

    /**
     * @function Ekmap.BuffersAnalystJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.bounds = null;
        this.distance = null;
        this.distanceField = null;
        this.distanceUnit = null;
        this.dissolveField = null;
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
     * @function Ekmap.BuffersAnalystJobsParameter.toObject
     * @param {Ekmap.BuffersAnalystJobsParameter} BuffersAnalystJobsParameter - 缓冲区分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成缓冲区分析任务对象。
     */
    static toObject(BuffersAnalystJobsParameter, tempObj) {
        for (var name in BuffersAnalystJobsParameter) {
            if (name === 'datasetName') {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = BuffersAnalystJobsParameter[name];
                continue;
            }
            if (name === 'output') {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = BuffersAnalystJobsParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            if (name === 'bounds' && BuffersAnalystJobsParameter[name]) {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name].toBBOX();
            } else {
                tempObj['analyst'][name] = BuffersAnalystJobsParameter[name];
            }
            if (name === 'mappingParameters') {
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = BuffersAnalystJobsParameter[name];
            }
        }
    }
}

Ekmap.BuffersAnalystJobsParameter = BuffersAnalystJobsParameter;