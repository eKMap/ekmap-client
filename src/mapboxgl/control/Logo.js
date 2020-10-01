/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';

/**
 * @class mapboxgl.supermap.LogoControl
 * @category  Control
 * @classdesc Logo 控件。默认不显示。
 *
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.supermap.LogoControl(),'bottom-right');
 * (end)
 * @param {Object} options - logo 控件配置项。
 * @param {string} [options.imageUrl] - logo 图片地址。
 * @param {string} [options.width] - logo 图片宽。
 * @param {string} [options.height] - logo 图片高。
 * @param {string} [options.link] - logo 图片跳转链接。
 * @param {string} [options.alt='SuperMap iClient'] - logo 图片失效时显示文本。
 */
export class Logo {
    constructor(options) {
    }

    /**
     * @function mapboxgl.supermap.LogoControl.prototype.onAdd
     * @description 添加一个 logo。
     * @returns {HTMLElement} 返回创建的 logo 元素。
     */
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        return this._container;
    }
}

mapboxgl.ekmap.LogoControl = Logo;