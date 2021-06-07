import { Ekmap } from '../../Ekmap';
import { Geometry } from '../Geometry';
import { Bounds } from '../Bounds';

/**
 * @class  Ekmap.Geometry.Rectangle
 * @classdesc 矩形几何对象类。
 * @category BaseTypes Geometry
 * @param {float} x - 矩形左下角点的横坐标。
 * @param {float} y - 矩形左下角点的纵坐标。
 * @param {float} width - 矩形的宽度。
 * @param {float} height -  矩形的高度。
 * @extends {Ekmap.Geometry}
 * @example
 *  //x 为矩形左下角点的横坐标；y 为矩形左下角点的纵坐标；w 为矩形的宽度；h 为矩形的高度
 *  var x = 1;
 *  var y = 2;
 *  var w = 10;
 *  var h = 20;
 *  var recttangle = new Ekmap.Geometry.Rectangle(x, y, w, h);
 */

export class Rectangle extends Geometry {


    constructor(x, y, width, height) {
        super(x, y, width, height);
        /**
         * @member {float} Ekmap.Geometry.Rectangle.prototype.x
         * @description 矩形左下角点的横坐标。
         */
        this.x = x;

        /**
         * @member {float} Ekmap.Geometry.Rectangle.prototype.y
         * @description 矩形左下角点的纵坐标。
         */
        this.y = y;

        /**
         * @member {float} Ekmap.Geometry.Rectangle.prototype.width
         * @description 矩形的宽度。
         */
        this.width = width;

        /**
         * @member {float} Ekmap.Geometry.Rectangle.prototype.height
         * @description 矩形的高度。
         */
        this.height = height;

        this.CLASS_NAME = "Ekmap.Geometry.Rectangle";
        this.geometryType = "Rectangle";
    }

    /**
     * @function Ekmap.Geometry.Rectangle.prototype.calculateBounds
     * @description 计算出此矩形对象的 bounds。
     */
    calculateBounds() {
        this.bounds = new Bounds(this.x, this.y,
            this.x + this.width,
            this.y + this.height);
    }


    /**
     * @function Ekmap.Geometry.Rectangle.prototype.getArea
     * @description 获取矩形对象的面积。
     * @returns {float} 矩形对象面积。
     */
    getArea() {
        var area = this.width * this.height;
        return area;
    }


}

Ekmap.Geometry.Rectangle = Rectangle;