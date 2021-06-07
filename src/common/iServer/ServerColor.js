/* Copyright© 2000 - 2020 Ekmap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Ekmap } from '../Ekmap';

/**
 * @class Ekmap.ServerColor
 * @category iServer Map Theme
 * @classdesc 颜色类。该类使用三原色（ RGB ）来表达颜色。
 * @param {Object} options - 参数。
 * @param {number} [options.red=255] - 获取或设置红色值。
 * @param {number} [options.green=0] - 获取或设置绿色值。
 * @param {number} [options.blue=0] - 获取或设置蓝色值。
 */
export class ServerColor {

    constructor(red, green, blue) {

        /**
         * @member {number} [Ekmap.ServerColor.prototype.red=255]
         * @description 获取或设置红色值。
         */
        this.red = (!red && red != 0) ? 255 : red;

        /**
         * @member {number} [Ekmap.ServerColor.prototype.green=0]
         * @description 获取或设置绿色值。
         */
        this.green = green || 0;

        /**
         * @member {number} [Ekmap.ServerColor.prototype.blue=0]
         * @description 获取或设置蓝色值。
         */
        this.blue = blue || 0;

        this.CLASS_NAME = "Ekmap.ServerColor";
    }

    /**
     * @function Ekmap.ServerColor.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.red = null;
        me.green = null;
        me.blue = null;
    }


    /**
     * @function Ekmap.ServerColor.formJson
     * @description 将 JSON 对象转化为 ServerColor 对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {Ekmap.ServerColor} 转化后的 ServerColor 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        var color = new ServerColor();
        var red = 255;
        if (jsonObject.red !== null) {
            red = Number(jsonObject.red);
        }
        color.red = red;

        var green = 0;
        if (jsonObject.green !== null) {
            green = Number(jsonObject.green);
        }
        color.green = green;

        var blue = 0;
        if (jsonObject.blue !== null) {
            blue = Number(jsonObject.blue);
        }
        color.blue = blue;
        return color;
    }

}

Ekmap.ServerColor = ServerColor;