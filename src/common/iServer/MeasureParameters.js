import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { Unit } from '../REST';

/**
 * @class Ekmap.MeasureParameters
 * @category iServer Map Measure
 * @classdesc 量算参数类。
 * @param {Object} geometry - 要量算的几何对象。
 * @param {Object} options - 参数。
 * @param {Ekmap.Unit} [options.unit=Ekmap.Unit.METER] - 量算单位。
 * @param {string} [options.prjCoordSys] - 用来指定该量算操作所使用的投影。
 * @param {string} [options.distanceMode="Geodesic"] - 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
 */
export class MeasureParameters {



    constructor(geometry, options) {
        if (!geometry) {
            return;
        }
        /**
         * @member {Object} Ekmap.MeasureParameters.prototype.geometry
         * @description 要量算的几何对象。<br>
         * 点类型可以是：{@link Ekmap.Geometry.Point}|{@link L.Point}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}。<br>
         * 线类型可以是：{@link Ekmap.Geometry.LineString}|{@link Ekmap.Geometry.LinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}。<br>
         * 面类型可以是：{@link Ekmap.Geometry.Polygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}。
         */
        this.geometry = geometry;

        /**
         * @member {Ekmap.Unit} [Ekmap.MeasureParameters.prototype.unit=Ekmap.Unit.METER]
         * @description 量算单位。即量算结果以米为单位。
         */
        this.unit = Unit.METER;

        /**
         * @member {string} [Ekmap.MeasureParameters.prototype.prjCoordSys]
         * @description 用来指定该量算操作所使用的投影。
         */
        this.prjCoordSys = null;

        /**
         * @member {string} [Ekmap.MeasureParameters.prototype.distanceMode="Geodesic"]
         * @description 用来指定量算的方式为按球面长度 'Geodesic' 或者平面长度 'Planar' 来计算。
         * @example
         * var param = new Ekmap.MeasureParameters(getmetry,{distanceMode:'Planar'});
         */
        this.distanceMode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "Ekmap.MeasureParameters";
    }

    /**
     * @function Ekmap.MeasureParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.geometry = null;
        me.unit = null;
        me.prjCoordSys = null;
    }
}

Ekmap.MeasureParameters = MeasureParameters;