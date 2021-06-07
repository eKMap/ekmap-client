import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalRegisterServiceParam
 * @classdesc iPortal 注册服务参数。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 注册服务具体参数。
 * @param {String} [params.type] - 服务类型。
 * @param {Array} [params.tags] - 服务标签。
 * @param {Ekmap.iPortalShareEntity} [params.entities] - 资源的实体共享参数
 * @param {Object} [params.metadata] - 服务元信息。
 * @param {Array} [params.addedMapNames] - 地图服务列表。
 * @param {Array} [params.addedSceneNames] - 场景服务列表。
 */
export class IPortalRegisterServiceParam {

    constructor(params) {
        params = params || {};
        this.type = ""; // SUPERMAP_REST ARCGIS_REST WMS WFS WCS WPS WMTS OTHERS
        this.tags = [];
        this.entities = [];
        this.metadata = {};
        this.addedMapNames = [];
        this.addedSceneNames = [];
        Util.extend(this, params);
    }
}
Ekmap.iPortalRegisterServiceParam = IPortalRegisterServiceParam;