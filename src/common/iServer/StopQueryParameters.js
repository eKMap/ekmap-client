/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.StopQueryParameters
 * @category  iServer TrafficTransferAnalyst TransferStops
 * @classdesc 站点查询参数类。
 * @param {Object} options - 参数。
 * @param {string} options.keyWord - 站点名称关键字。
 * @param {boolean} [options.returnPosition=false] - 是否返回站点坐标信息。
 */
export class StopQueryParameters {

    constructor(options) {
        options = options || {};
        /**
         *  @member {string} Ekmap.StopQueryParameters.prototype.keyWord
         *  @description 站点名称关键字。
         */
        this.keyWord = null;

        /**
         * @member {boolean} [Ekmap.StopQueryParameters.prototype.returnPosition=false]
         * @description 是否返回站点坐标信息。
         */
        this.returnPosition = false;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.StopQueryParameters";
    }

    /**
     * @function Ekmap.StopQueryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

}

Ekmap.StopQueryParameters = StopQueryParameters;