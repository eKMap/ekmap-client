import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { OverlayOperationType } from '../REST';

/**
 * @class Ekmap.OverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc 叠加分析参数基类。数据集叠加分析参数和几何对象叠加分析参数均继承此基类。
 * @param {Object} options - 参数。
 */
export class OverlayAnalystParameters {


    constructor(options) {
        /**
         * @member {Ekmap.OverlayOperationType} [Ekmap.OverlayAnalystParameters.prototype.operation=Ekmap.OverlayOperationType.UNION]
         * @description 指定叠加分析操作类型。
         */
        this.operation = OverlayOperationType.UNION;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "Ekmap.OverlayAnalystParameters";
    }

    /**
     * @function Ekmap.OverlayAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.operation = null;
    }


}

Ekmap.OverlayAnalystParameters = OverlayAnalystParameters;