import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';
import { MeasureParameters } from './MeasureParameters';
import { ServerGeometry } from './ServerGeometry';
import { MeasureMode } from '../REST';

/**
 * @class Ekmap.MeasureService
 * @category iServer Map Measure
 * @classdesc 量算服务类。
 *            该类负责将量算参数传递到服务端，并获取服务端返回的量算结果。
 * @extends {Ekmap.CommonServiceBase}
 * @example
 * var myMeasuerService = new Ekmap.MeasureService(url, {
 *      measureMode: Ekmap.MeasureMode.DISTANCE,
 *      eventListeners:{
 *          "processCompleted": measureCompleted
 *      }
 * });
 * @param {string} url - 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.ISERVER] - 服务器类型，ISERVER|IPORTAL|ONLINE。 
 * @param {Ekmap.DataFormat} [options.format=Ekmap.DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {MeasureMode} options.measureMode - 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {Ekmap.MeasureMode} [Ekmap.MeasureService.prototype.measureMode=MeasureMode.DISTANCE]
         * @description 量算模式，包括距离量算模式和面积量算模式。
         */
        this.measureMode = MeasureMode.DISTANCE;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.MeasureService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.measureMode = null;
    }

    /**
     * @function Ekmap.MeasureService.prototype.processAsync
     * @description 负责将客户端的量算参数传递到服务端。
     * @param {Ekmap.MeasureParameters} params - 量算参数。
     */
    processAsync(params) {
        if (!(params instanceof MeasureParameters)) {
            return;
        }
        var me = this,
            geometry = params.geometry,
            pointsCount = 0,
            point2ds = null;
        if (!geometry) {
            return;
        }
        me.url = Util.urlPathAppend(me.url, me.measureMode === MeasureMode.AREA ? 'area' : 'distance');
        var serverGeometry = ServerGeometry.fromGeometry(geometry);
        if (!serverGeometry) {
            return;
        }
        pointsCount = serverGeometry.parts[0];
        point2ds = serverGeometry.points.splice(0, pointsCount);

        var prjCoordSysTemp, prjCodeTemp, paramsTemp;
        if (params.prjCoordSys) {
            if (typeof(params.prjCoordSys) === "object") {
                prjCodeTemp = params.prjCoordSys.projCode;
                prjCoordSysTemp = '{"epsgCode"' + prjCodeTemp.substring(prjCodeTemp.indexOf(":"), prjCodeTemp.length) + "}";
            } else if (typeof(params.prjCoordSys) === "string") {
                prjCoordSysTemp = '{"epsgCode"' + params.prjCoordSys.substring(params.prjCoordSys.indexOf(":"), params.prjCoordSys.length) + "}";
            }
            paramsTemp = {
                "point2Ds": Util.toJSON(point2ds),
                "unit": params.unit,
                "prjCoordSys": prjCoordSysTemp
            };
        } else {
            paramsTemp = { "point2Ds": Util.toJSON(point2ds), "unit": params.unit };
        }

        me.request({
            method: "GET",
            params: paramsTemp,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });

    }

}

Ekmap.MeasureService = MeasureService;