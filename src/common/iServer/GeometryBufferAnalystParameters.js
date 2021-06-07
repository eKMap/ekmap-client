import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { BufferAnalystParameters } from './BufferAnalystParameters';
import { ServerGeometry } from './ServerGeometry';

/**
 * @class Ekmap.GeometryBufferAnalystParameters
 * @category  iServer SpatialAnalyst BufferAnalyst
 * @classdesc 几何对象缓冲区分析参数类
 * 对指定的某个几何对象做缓冲区分析。通过该类可以指定要做缓冲区分析的几何对象、缓冲区参数等。
 * @param {Object} options - 参数。 
 * @param {Object} options.sourceGeometry - 要做缓冲区分析的几何对象。
 * @param {number} options.sourceGeometrySRID - 缓冲区几何对象投影坐标参数, 如 4326，3857。
 * @param {Ekmap.BufferSetting} [options.bufferSetting] - 设置缓冲区通用参数。
 * @extends {Ekmap.BufferAnalystParameters}
 */
export class GeometryBufferAnalystParameters extends BufferAnalystParameters {


    constructor(options) {
        super(options);
        /**
         * @member {Object} Ekmap.GeometryBufferAnalystParameters.prototype.sourceGeometry
         * @description 要做缓冲区分析的几何对象。<br>
         * 点类型可以是：{@link Ekmap.Geometry.Point}|{@link L.Point}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。</br>
         * 线类型可以是：{@link Ekmap.Geometry.LineString}|{@link Ekmap.Geometry.LinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}。</br>
         * 面类型可以是：{@link Ekmap.Geometry.Polygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}。 
         */
        this.sourceGeometry = null;

        /**
         * @member {number} Ekmap.GeometryBufferAnalystParameters.prototype.sourceGeometrySRID
         * @description 缓冲区几何对象投影坐标参数, 如 4326，3857。
         */
        this.sourceGeometrySRID = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = " Ekmap.GeometryBufferAnalystParameters";
    }

    /**
     * @function Ekmap.GeometryBufferAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }
    }

    /**
     * @function Ekmap.GeometryBufferAnalystParameters.toObject
     * @param {Ekmap.GeometryBufferAnalystParameters} geometryBufferAnalystParameters - 几何对象缓冲区分析参数类。
     * @param {Ekmap.GeometryBufferAnalystParameters} tempObj - 几何对象缓冲区分析参数对象。
     * @description 将几何对象缓冲区分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(geometryBufferAnalystParameters, tempObj) {
        for (var name in geometryBufferAnalystParameters) {
            if (name === "bufferSetting") {
                var tempBufferSetting = {};
                for (var key in geometryBufferAnalystParameters.bufferSetting) {
                    tempBufferSetting[key] = geometryBufferAnalystParameters.bufferSetting[key];
                }
                tempObj.analystParameter = tempBufferSetting;
            } else if (name === "sourceGeometry") {
                tempObj.sourceGeometry = ServerGeometry.fromGeometry(geometryBufferAnalystParameters.sourceGeometry);

            } else {
                tempObj[name] = geometryBufferAnalystParameters[name];
            }
        }
    }

}

Ekmap.GeometryBufferAnalystParameters = GeometryBufferAnalystParameters;