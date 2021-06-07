import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalDataConnectionInfoParam
 * @classdesc iPortal HBASE数据源连接信息类。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal HBASE数据源连接信息类具体参数。
 * @param {string} params.dataBase - 数据源连接的数据库名。
 * @param {string} params.server - 服务地址。
 */
export class IPortalDataConnectionInfoParam {

    constructor(params) {
        params = params || {};
        this.dataBase = "";
        this.server = "";
        Util.extend(this, params);
    }
}
Ekmap.iPortalDataConnectionInfoParam = IPortalDataConnectionInfoParam;