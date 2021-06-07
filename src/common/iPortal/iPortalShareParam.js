import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalShareParam
 * @classdesc iPortal 资源共享参数。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 资源共享具体参数。
 * @param {Ekmap.ResourceType} [params.resourceType] - 资源类型。
 * @param {Array} [params.ids] - 资源的id数组。
 * @param {Ekmap.iPortalShareEntity} [params.entities] - 资源的实体共享参数
 */
export class IPortalShareParam {

    constructor(params) {
        params = params || {};
        this.ids = [];
        this.entities = [];
        this.resourceType = ""; // MAP SERVICE SCENE DATA INSIGHTS_WORKSPACE MAP_DASHBOARD
        Util.extend(this, params);
    }
}
Ekmap.iPortalShareParam = IPortalShareParam;