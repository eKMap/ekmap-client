import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalAddResourceParam
 * @classdesc iPortal 添加资源参数。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 添加资源具体参数。
 * @param {String} [params.rootUrl] - 服务地址。
 * @param {Array} [params.tags] - 标签。
 * @param {Ekmap.iPortalShareEntity} [params.entities] - 资源的实体共享参数
 */
export class IPortalAddResourceParam {

    constructor(params) {
        params = params || {};
        this.rootUrl = "";
        this.tags = [];
        this.entities = [];
        Util.extend(this, params);
    }
}
Ekmap.iPortalAddResourceParam = IPortalAddResourceParam;