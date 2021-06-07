import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { BufferEndType, BufferRadiusUnit } from '../REST';
import { BufferDistance } from './BufferDistance';

/**
 * @class Ekmap.BufferSetting
 * @category iServer SpatialAnalyst BufferAnalyst
 * @classdesc 缓冲区分析通用设置类。
 * @param {Object} options - 参数。 
 * @param {Ekmap.BufferEndType} [options.endType=Ekmap.BufferEndType.FLAT] - 缓冲区端点枚举值。 
 * @param {Ekmap.BufferDistance} [options.leftDistance=100] - 左侧缓冲距离。 
 * @param {Ekmap.BufferDistance} [options.rightDistance=100] - 右侧缓冲距离。 
 * @param {number} [options.semicircleLineSegment=4] - 圆头缓冲圆弧处线段的个数。 
 * @param {Ekmap.BufferRadiusUnit} [options.radiusUnit=Ekmap.BufferRadiusUnit.METER] - 缓冲半径单位。
 */
export class BufferSetting {


    constructor(options) {
        /**
         * @member {Ekmap.BufferEndType} [Ekmap.BufferSetting.prototype.endType = Ekmap.BufferEndType.FLAT]
         * @description 缓冲区端点枚举值。分为平头和圆头两种。
         */
        this.endType = BufferEndType.FLAT;

        /**
         * @member {Ekmap.BufferDistance} [Ekmap.BufferSetting.prototype.leftDistance=100]
         * @description 左侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting.radiusUnit}设置（默认全部为米）。
         */
        this.leftDistance = new BufferDistance();

        /**
         * @member {Ekmap.BufferDistance} [Ekmap.BufferSetting.prototype.rightDistance=100]
         * @description 右侧缓冲距离。
         * 当为 GeometryBufferAnalyst 时，单位为默认地图的投影系的单位（如3857为米，4326为度），
         * 当为 DatasetBufferAnalyst 时，单位通过{@link BufferSetting.radiusUnit}设置（默认全部为米）。
         */
        this.rightDistance = new BufferDistance();

        /**
         * @member {number} [Ekmap.BufferSetting.prototype.semicircleLineSegment=4]
         * @description 圆头缓冲圆弧处线段的个数。即用多少个线段来模拟一个半圆。
         */
        this.semicircleLineSegment = 4;

        /**
         * @member {Ekmap.BufferRadiusUnit} [Ekmap.BufferSetting.prototype.radiusUnit = Ekmap.BufferRadiusUnit.METER]
         * @description 缓冲半径单位，可以是{@link Ekmap.BufferRadiusUnit.METER}、{@link Ekmap.BufferRadiusUnit.MILIMETER}、
         * {@link Ekmap.BufferRadiusUnit.CENTIMETER}、{@link Ekmap.BufferRadiusUnit.DECIMETER}、{@link Ekmap.BufferRadiusUnit.KILOMETER}、
         * {@link Ekmap.BufferRadiusUnit.FOOT}、{@link Ekmap.BufferRadiusUnit.INCH}、{@link Ekmap.BufferRadiusUnit.MILE}、{@link Ekmap.BufferRadiusUnit.YARD}。
         * 仅对BufferAnalyst有效。
         */
        this.radiusUnit = BufferRadiusUnit.METER;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "Ekmap.BufferSetting";
    }


    /**
     * @function Ekmap.BufferSetting.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        let me = this;
        me.endType = null;
        if (me.leftDistance) {
            me.leftDistance.destroy();
            me.leftDistance = null;
        }
        if (me.rightDistance) {
            me.rightDistance.destroy();
            me.rightDistance = null;
        }
        me.semicircleLineSegment = null;
        me.radiusUnit = null;
    }
}

Ekmap.BufferSetting = BufferSetting;