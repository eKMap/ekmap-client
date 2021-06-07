import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { FacilityAnalyst3DParameters } from './FacilityAnalyst3DParameters';

/**
 * @class Ekmap.FacilityAnalystUpstream3DParameters
 * @category iServer FacilityAnalyst3D UpstreamCriticalFacilities
 * @classdesc 上游关键设施查找资源参数类。
 * @extends {Ekmap.FacilityAnalyst3DParameters}
 * @param {Object} options - 参数。 
 * @param {Array.<number>} options.sourceNodeIDs - 指定的设施点 ID 数组。 
 * @param {number} [options.edgeID] - 指定的弧段ID。edgeID 与 nodeID 必须指定一个。  
 * @param {number} [options.nodeID] - 指定的结点ID。edgeID 与 edgeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。 
 */
export class FacilityAnalystUpstream3DParameters extends FacilityAnalyst3DParameters {


    constructor(options) {
        super(options);
        options = options || {};
        this.sourceNodeIDs = null;
        Util.extend(this, options);
        this.CLASS_NAME = "Ekmap.FacilityAnalystUpstream3DParameters";
    }


    /**
     * @function Ekmap.FacilityAnalystUpstream3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.sourceNodeIDs = null;
    }


}

Ekmap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;