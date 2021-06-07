import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { OverlayAnalystParameters } from './OverlayAnalystParameters';
import { ServerGeometry } from './ServerGeometry';

/**
 * @class Ekmap.GeometryOverlayAnalystParameters
 * @category  iServer SpatialAnalyst OverlayAnalyst
 * @classdesc
 * 几何对象叠加分析参数类。对指定的某两个几何对象做叠加分析。通过该类可以指定要做叠加分析的几何对象、叠加操作类型。
 * @param {Object} options - 参数。 
 * @param {Object} options.operateGeometry - 叠加分析的操作几何对象。 </br>
 *                                   点类型可以是：{@link Ekmap.Geometry.Point}|{@link L.Point}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。</br>
 *                                   线类型可以是：{@link Ekmap.Geometry.LineString}|{@link Ekmap.Geometry.LinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link GeoJSONObject}。</br>
 *                                   面类型可以是：{@link Ekmap.Geometry.Polygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link GeoJSONObject}。 
 * @param {Object} options.sourceGeometry - 叠加分析的源几何对象。 
 * @param {Array.<Object>} [options.operateGeometries] - 批量叠加分析的操作几何对象数组。 
 * @param {Array.<Object>} [options.sourceGeometries] -批量叠加分析的源几何对象数组。 
 * @param {Ekmap.OverlayOperationType} [options.operation] - 叠加操作枚举值。 
 * @extends {Ekmap.OverlayAnalystParameters}
 */
export class GeometryOverlayAnalystParameters extends OverlayAnalystParameters {

    constructor(options) {
        super(options);
        if (options && options.operateGeometry) {
            this.operateGeometry = options.operateGeometry;
        }
        if (options && options.sourceGeometry) {
            this.sourceGeometry = options.sourceGeometry;
        }
        if (options && options.operateGeometries) {
            this.operateGeometries = options.operateGeometries;
        }
        if (options && options.sourceGeometries) {
            this.sourceGeometries = options.sourceGeometries;
        }

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "Ekmap.GeometryOverlayAnalystParameters";
    }

    /**
     * @function Ekmap.GeometryOverlayAnalystParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }

        if (me.sourceGeometries) {
            me.sourceGeometries.destroy();
            me.sourceGeometries = null;
        }
        if (me.sourceGeometry) {
            me.sourceGeometry.destroy();
            me.sourceGeometry = null;
        }

        if (me.operateGeometries) {
            me.operateGeometries.destroy();
            me.operateGeometries = null;
        }
    }

    /**
     * @function Ekmap.GeometryOverlayAnalystParameters.toObject
     * @param {Ekmap.GeometryOverlayAnalystParameters} geometryOverlayAnalystParameters - 几何对象叠加分析参数类。
     * @param {Ekmap.GeometryOverlayAnalystParameters} tempObj - 几何对象叠加分析参数对象。
     * @description 将几何对象叠加分析参数对象转换为 JSON 对象。
     * @returns {Object} JSON 对象。
     */
    static toObject(geometryOverlayAnalystParameters, tempObj) {
        for (var name in geometryOverlayAnalystParameters) {
            if (name === "sourceGeometry") {
                tempObj.sourceGeometry = ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometry);

            } else if (name === "sourceGeometries") {
                var sourceGeometries = [];
                for (var i = 0; i < geometryOverlayAnalystParameters.sourceGeometries.length; i++) {
                    sourceGeometries.push(ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.sourceGeometries[i]));
                }
                tempObj.sourceGeometries = sourceGeometries;

            } else if (name === "operateGeometry") {
                tempObj.operateGeometry = ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometry);

            } else if (name === "operateGeometries") {
                var operateGeometries = [];
                for (var j = 0; j < geometryOverlayAnalystParameters.operateGeometries.length; j++) {
                    operateGeometries.push(ServerGeometry.fromGeometry(geometryOverlayAnalystParameters.operateGeometries[j]));
                }
                tempObj.operateGeometries = operateGeometries;

            } else {
                tempObj[name] = geometryOverlayAnalystParameters[name];
            }
        }
    }
}

Ekmap.GeometryOverlayAnalystParameters = GeometryOverlayAnalystParameters;