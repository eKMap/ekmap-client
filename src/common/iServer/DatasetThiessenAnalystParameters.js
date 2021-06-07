import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ThiessenAnalystParameters } from './ThiessenAnalystParameters';
import { ServerGeometry } from './ServerGeometry';

/**
 * @class Ekmap.DatasetThiessenAnalystParameters
 * @category iServer SpatialAnalyst ThiessenAnalyst
 * @classdesc 数据集泰森多边形分析参数类。
 * @param {Object} options - 参数。 
 * @param {Ekmap.FilterParameter} [options.filterQueryParameter] - 对待分析数据集中的点进行过滤，即对数据集中的所有点进行分析。
 * @extends {Ekmap.ThiessenAnalystParameters}
 */
export class DatasetThiessenAnalystParameters extends ThiessenAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {Ekmap.FilterParameter} [Ekmap.DatasetThiessenAnalystParameters.prototype.filterQueryParameter]
         * @description 过滤条件，对待分析数据集中的点进行过滤，即对数据集中的所有点进行分析。
         * @example
         *  var filterQueryParameter = new Ekmap.FilterParameter({
         *   name: "Countries@World",
         *   attributeFilter: "SmID>100"
         *  });
         */
        this.filterQueryParameter = null;

        /**
         * @member {string} Ekmap.DatasetThiessenAnalystParameters.prototype.dataset
         * @description 数据集名称待分析的数据集名称，请使用 "datasetName@datasourceName" 格式来表示。
         */
        this.dataset = null;

        if (options) {
            Util.extend(this, options);
        }


        this.CLASS_NAME = "Ekmap.DatasetThiessenAnalystParameters";
    }

    /**
     * @function Ekmap.DatasetThiessenAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
    }

    /**
     * @function Ekmap.DatasetThiessenAnalystParameters.toObject
     * @param {Ekmap.DatasetThiessenAnalystParameters} datasetThiessenAnalystParameters - 泰森多边形分析服务参数类。
     * @param {Ekmap.DatasetThiessenAnalystParameters} tempObj - 泰森多边形分析服务参数对象。
     * @description 将泰森多边形分析服务参数对象转换为 JSON 对象。
     * @returns JSON 对象。
     */
    static toObject(datasetThiessenAnalystParameters, tempObj) {
        for (var name in datasetThiessenAnalystParameters) {
            if (name === "clipRegion") {
                tempObj.clipRegion = ServerGeometry.fromGeometry(datasetThiessenAnalystParameters.clipRegion);
            } else {
                tempObj[name] = datasetThiessenAnalystParameters[name];
            }
        }
    }

}

Ekmap.DatasetThiessenAnalystParameters = DatasetThiessenAnalystParameters;