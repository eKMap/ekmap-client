import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalAddDataParam
 * @classdesc iPortal 上传/注册数据所需的参数。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 上传/注册数据所需的具体参数。
 * @param {string} params.fileName - 文件名称
 * @param {Ekmap.DataItemType} params.type - 数据类型。
 * @param {Array} [params.tags] - 数据的标签
 * @param {Ekmap.iPortalDataMetaInfoParam} [params.dataMetaInfo] - 数据元信息
 */
export class IPortalAddDataParam {

    constructor(params) {
        params = params || {};
        this.fileName = "";
        this.type = "";
        this.tags = [];
        this.dataMetaInfo = {};
        Util.extend(this, params);
    }
}
Ekmap.iPortalAddDataParam = IPortalAddDataParam;