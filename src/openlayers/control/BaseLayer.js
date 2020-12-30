import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Base from 'ol/control/BaseLayer';
import * as olProj from 'ol/proj';
import AssertionError from 'ol/AssertionError';
import Control from 'ol/control/Control';
import Scale from 'ol/control/ScaleLine';
import { getMap } from 'echarts';
import gclient_element from '../core/Element';


/**
 * @class ol.ekmap.control.BaseLayer
 * @category  Control
 * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a BaseLayer..
 * @extends {ol/control/BaseLayer}
 * @param {options} options Scale line options.
 * @param {string} options.className CSS Class name.
 * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.
 * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 * @param {(ol.control.BaseLayerUnits|string)} options.units='metric' Units.
 * @example
 * var control = new ol.ekmap.control.BaseLayer();
 *      map.addControl(control)
 */
export class BaseLayer {

    constructor(options) {
        options = options || {};
        var element = document.createElement('div');
        if (options.element) element = options.element;
        var className = 'gclient-bl';
        className = className + ' ' + (options.className !== undefined ? options.className : '');

        var cssClasses = className + ' ol-unselectable ol-control';
        element.className = cssClasses;

        Control.call(this, {
            element: element,
            target: options.target
        });
        this.baseLayer = {};
        this.drawBaseLayer();

    }

    resizeScreen_(evt) {
        this.drawBaseLayer();
    }

    drawBaseLayer() {
        this.baseLayer = {};
        if (this.first) {
            this.element.removeChild(this.first);
            this.first = null;
        }
        if (this.btnCollapse) {
            this.element.removeChild(this.btnCollapse);
            this.btnCollapse = null;
        }
        this.element.classList.remove("gclient-bl-layer-open");
        if (!this.isMediumScreen_()) {
            this.btnCollapse = gclient_element.create('div', {
                className: 'gclient-bl-bg gclient-bl-layer-bt ol-hidden',
                parent: this.element
            });
            this.btnCollapse.addEventListener('touchstart', this.handleCollapseClick_.bind(this));
            this.btnCollapse.addEventListener('click', this.handleCollapseClick_.bind(this));
        }

        this.element.querySelectorAll('.gclient-bl-layer').forEach(element => {
            this.element.removeChild(element);
        });
        var baseLayers = [];
        var baseActive;
        var layers = this.getMap().getLayers().getArray(),
            len = layers.length;

        for (var i = len - 1; i >= 0; i--) {
            var layer = layers[i];
            if (layer.get('baseLayer') && layer.get('displayInLayerSwitcher') != false) {
                baseLayers.push(layer);
                if (layer.getVisible()) {
                    baseActive = layer;
                }
            }
        }

        var zIndex = baseLayers.length;

        this.first = gclient_element.create('div', {
            className: 'gclient-bl-bg gclient-bl-layer-first',
            parent: this.element,
            title: baseActive ? (baseActive.get('name') || baseActive.get('title')) : 'Không nền',
            style: {
                "z-index": zIndex + 1,
                "background": "#fff url('" + this.getImageTile_(baseActive) + "') no-repeat",
                "background-size": "cover"
            }
        });
        if (!this.isMediumScreen_()) {
            gclient_element.create('div', {
                className: 'gclient-bl-bg-text',
                parent: this.first,
                uid: baseActive ? baseActive.ol_uid : "",
                html: baseActive ? this.formatString(baseActive.get('name') || baseActive.get('title')) : 'Không có nền',
                title: baseActive ? (baseActive.get('name') || baseActive.get('title')) : 'Không có nền'
            })
        }
        this.first.addEventListener('touchstart', this.handleCollapseClick_.bind(this));
        this.first.addEventListener('click', this.handleCollapseClick_.bind(this));
        baseLayers.forEach((layer, index) => {
            this.baseLayer[index] = layer;
            var cssactive = "";
            if (layer.getVisible())
                cssactive = "active";
            var element = gclient_element.create('div', {
                className: 'gclient-bl-bg gclient-bl-layer ' + cssactive + ' gclient-bl-layer-' + index,
                parent: this.element,
                uid: layer.ol_uid,
                title: layer.get('name') || layer.get('title'),
                style: {
                    "z-index": zIndex,
                    "background": "#fff url('" + this.getImageTile_(layer) + "') no-repeat",
                    "background-size": "cover"
                }
            });
            if (!this.isMediumScreen_()) {
                gclient_element.create('div', {
                    className: 'gclient-bl-bg-text',
                    parent: element,
                    uid: layer.ol_uid,
                    html: this.formatString(layer.get('name') || layer.get('title')),
                    title: layer.get('name')
                })
            }
            element.addEventListener('touchstart', this.setActiveLayer_.bind(this), false);
            element.addEventListener('click', this.setActiveLayer_.bind(this), false);
            zIndex--;
        });
    }

    isMediumScreen_() {
        var x = window.matchMedia("(max-width: 768px)");
        if (x.matches) return true; //kích thước nhỏ hơn 768
        else return false;
    }

    handleCollapseClick_(evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        var tog = this.element.classList.toggle("gclient-bl-layer-open");
        if (this.btnCollapse) this.btnCollapse.classList.toggle("ol-hidden");
        var translate = "translateX(";
        let startIndex = 20;
        if (!this.isMediumScreen_() && this.first)
            this.first.classList.toggle("ol-hidden");
        else {
            translate = "translateY(-";
            startIndex = 50;
        }
        if (tog) { //expan
            var i = 0;
            for (var index in this.baseLayer) {
                this.element.querySelectorAll('.gclient-bl-layer-' + index).forEach(function(element) {
                    var translateX = translate + (index * element.clientWidth + startIndex + (index * 5) + i) + "px)";
                    i += 5;
                    gclient_element.setStyle(element, {
                        transition: "transform .5s,bottom .5s,width .5s,-webkit-transform .5s",
                        WebkitTransform: translateX,
                        msTransform: translateX,
                        transform: translateX
                    })
                });
            }
        } else //collapse
        {
            for (var index in this.baseLayer) {
                this.element.querySelectorAll('.gclient-bl-layer-' + index).forEach(function(element) {
                    var translateX = translate + "0px)";
                    gclient_element.setStyle(element, {
                        transition: "transform .5s,bottom .5s,width .5s,-webkit-transform .5s",
                        WebkitTransform: translateX,
                        msTransform: translateX,
                        transform: translateX
                    })
                });
            }
        }
    }

    /** 
     * @private
     */
    getImageTile_(layer) {
        var anhdaidien = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADhmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY0NTQ5ODZkLTBmMmEtZTk0ZC05Mjc3LWYwODE5MzdmMWFiZSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5N0MzQzAyMDhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N0MzQzAxRjhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI1ZWJmZDcyLWJkYzktYTA0Ny1iYmM5LWNmOTQ2YTE0NzJjMCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRiMGQ1ZWY5LTg2ZDgtMTFlNi1hM2FjLWMzODdkMmFhNjkxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtNVieYAAATBSURBVHhe7ZqHTuQwEIa99N577533fxBA9N577+XuvpENwYAgYIfsyZ+0ymbWTuw/4zKTzfz5hwo8k6OPAU0QxCIIYhEEsQiCWARBLIIgFkEQiyCIRRDEIghi4SWWOTs7U09PT/rMDzk5OaqiokKfucO5IIuLi+r6+loa7BMELy4uVr29vdriBqeCPD4+qqmpKTU8PKzy8/O11Q/39/dqenpajY6OqtzcXG39Oc4fYyaTkY9vfN3Hi197mJbe4Oseiawyd3d3amlpSVx8Y2NDW9OJd0F4knNzczLJNjc3q4uLC5l404p3QY6OjmTS6+rqUlVVVbIqXF5eqoeHB10iXSQyZKKY/UkSE+938C5IbW2tiMAw2d/flyMbKpdLpUsS8ZChoSHZl5ycnIhADJ+0koggeENHR4fq7+9XjY2N2ppOEp9D0k4QxCIIYpFqQVidkt7ZploQdrisTGtra9rin8QFoXMrKyv67GNmZmZUXl6eGhgYkITTV+q4IFFBtre31fn5uSSQlpeXtfUteAY72b6+PlVQUCD7GGIgAkTfJCYIu9S9vT3V09OjBgcH1dXV1btB3vz8vCSaKGPAU0g6IaSp42vrn4ggx8fHamtrS3V3d0vaj8h3ZGRE0gKzs7O6lBIPIBOGR9iwuTOiMISyVhAaz7zBTjWaFKZDzA+tra1yzhxBZxHjo84i5NjYmFzHVxLbqyAMC+aKlpYWVV1dra0v8NTLyspEMOYIhonv5PRneLk7TxjXZ3JsaGhQ9fX1+pe3sM84PT0Vb2Gu+G28CEKWjOi2s7NTsmQfcXBwoA4PDyXoYzVJA179871hEqWurk48o6ioSFt+H6eCmEx4nOQPq853MPdwnX13/uZuYmJCnjwddd1YA3MUKxJDbnx8XFvd4FwQVovNzU1vy6KB1Yglm1XKJc4FyXZ+d9FPIUEQiyCIRWKCEOmye007sQVZWFiQvIaBKJbl7zMQhKUy7cQWhHeybLdvbm6ez8lfAB5A3oNw34YlsrS0VH6nHAKRLALKYzfXAaJk41UIbrzL2ClLHfOOmGvt7u7Ksv8TYgvCKl1ZWfmc0mOTxJ6Ap8/fHRCKhkbzHEAQd3t7K402ddfX16UcUTEf6gPRL+XZy5Aj2dnZkftiN3scPJVrYcdGGXaveOxPEtOxBaExTU1NIgKeQiP40DleUba3t0t8glC8+TdQxuQ5KGeiYIJAvIdAkN+JfPmQQOI+JiVgEkMkiYyd8jwA84qUchxpV9Tb4vCtSRU3JRXIXMJTp2HYCgsLdQkl3z9qlBEG6IQBO4JHbcA513/PzlDiSF1zv7a2tlf3iENsQXBRPuQuiFlwdTrBd5JB/PeDMc9Tq6mp0bVegjBT3xD9znVKSkrEmxgePH2GA2KwRafjeCJ2M6TKy8ul8wjD/TjiYYgTnfy/SmxByFsY9XFd4xUMARpEB3BtUoF0zGDyHdH6dDD6b0V+QyDqclxdXZXUgAkUo3aEoD4dx45IzCt4LLlbzr8zwWZVLIPXMEeZ4TE5OSnRLsK4IqsEwfuYMPEYJlk8FM90SdZFu3gGYiBKdEi6IoT/Fu4G339CEMQiCGIRBLEIglgEQSyCIBZBEIsgiEUQxCII8gql/gKvssAfZKH1AAAAAABJRU5ErkJggg==';
        if (!layer) return anhdaidien;
        if (layer.metadata.image != null)
            anhdaidien = layer.metadata.image;
        // else {
        //     try {
        //         var source = layer.getSource();
        //         var coord = [5, 25, 14]; //lấy tile Việt Nam làm đại diện
        //         var fn = source.getTileUrlFunction(); //chỉ áp dụng với source tile xyz
        //         anhdaidien = fn.call(source, coord, source.getProjection());
        //     } catch (ex) {
        //         console.log(ex);
        //     }
        // }
        return anhdaidien;
    }

    /** 
     * @private
     */
    formatString(str, length) {
        if (!str) return "";
        if (length == undefined) length = 25;
        if (str.length > length) str = str.substr(0, 24) + '...';
        return str;
    }

    /** 
     * @private
     */
    setActiveLayer_(evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        var target = evt.target;
        var uid = target.getAttribute("uid");
        var layerActive = false;
        this.element.querySelectorAll('.gclient-bl-layer').forEach((element, index) => {
            var hasActive = element.classList.contains("active");
            var id = element.getAttribute("uid");
            if (id == uid) {
                if (!hasActive) {
                    layerActive = this.baseLayer[index];
                    gclient_element.setStyle(this.first, {
                        "background": "#fff url('" + this.getImageTile_(layerActive) + "') no-repeat",
                        "background-size": "cover"
                    })
                } else {
                    gclient_element.setStyle(this.first, {
                        "background": "#fff url('" + this.getImageTile_() + "') no-repeat",
                        "background-size": "cover"
                    })
                }
                element.classList.toggle("active");
            } else {
                element.classList.remove("active");
            }
        });
        var arr = [];
        var layers = this._map.getStyle().layers,
            len = layers.length;
        for (var i = len - 1; i >= 0; i--) {
            var layer = layers[i];
            if (layer.metadata && layer.metadata.type && layer.metadata.type == 'baselayer') {
                arr.push(layer);
            }
        }
        var baselayer = arr;
        for (var i = 0; i < baselayer.length; i++) {
            if (layerActive != baselayer[i]) {
                this._map.setLayoutProperty(baselayer[i].id, 'visibility', 'none');
                // baselayer[i].setVisible(false);
            }
        }
        if (layerActive) this._map.setLayoutProperty(layerActive.id, 'visibility', 'visible'); //layerActive.setVisible(true);
        if (!this.isMediumScreen_() && this.first) {
            var text = 'Không có nền';
            var title = 'Không có nền';
            if (layerActive) {
                text = this.formatString(layerActive.metadata.name);
                title = layerActive.metadata.name;
            }
            this.first.querySelectorAll('.gclient-bl-bg-text').forEach(element => {
                element.setAttribute('title', title);
                element.innerHTML = text;
            })
        }
        this.handleCollapseClick_();
    }
}