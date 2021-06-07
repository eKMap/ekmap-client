import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { DatasourceConnectionInfo } from './DatasourceConnectionInfo';
import { OutputType } from "../REST";

/**
 * @class Ekmap.OutputSetting
 * @category  iServer ProcessingService
 * @classdesc 分布式分析输出类型设置类。
 * @param {Object} options - 参数。
 * @param {Ekmap.DatasourceConnectionInfo} options.datasourceInfo - 数据源连接信息。
 * @param {string} [options.datasetName='analystResult'] - 结果数据集名称。
 * @param {Ekmap.OutputType} [options.type=Ekmap.OutputType.UDB] - 输出类型。
 * @param {string} [options.outputPath] - 分析结果输出路径。
 */
export class OutputSetting {

    constructor(options) {

        /**
         * @member {Ekmap.OutputType} Ekmap.OutputSetting.prototype.type
         * @description 分布式分析的输出类型。
         */
        this.type = OutputType.UDB;

        /**
         * @member {string} [Ekmap.OutputSetting.prototype.datasetName='analystResult']
         * @description 分布式分析的输出结果数据集名称。
         */
        this.datasetName = "analystResult";

        /**
         * @member {Ekmap.DatasourceConnectionInfo} Ekmap.OutputSetting.prototype.datasourceInfo
         * @description 分布式分析的输出结果数据源连接信息。
         */
        this.datasourceInfo = null;

        /**
         * @member {string} [Ekmap.OutputSetting.prototype.outputPath]
         * @description 分布式分析的分析结果输出路径。
         */
        this.outputPath = "";

        Util.extend(this, options);
        this.CLASS_NAME = "Ekmap.OutputSetting";
    }

    /**
     * @function Ekmap.OutputSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.type = null;
        me.datasetName = null;
        me.outputPath = null;
        if (me.datasourceInfo instanceof DatasourceConnectionInfo) {
            me.datasourceInfo.destroy();
            me.datasourceInfo = null;
        }
    }

}

Ekmap.OutputSetting = OutputSetting;