import '../core/Base';
import { Util } from '../core/Util';
import Control from 'ol/control/Control';

/**
 * @class ol.ekmap.control.Legend
 * @category  Control
 * @classdesc Legend.
 * @param {Object} options Construction parameters.
 * @param {Array<ol.Map>} options.layers List of layers for which you want to display legend.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {string} options.title=LEGEND Name of header.
 * @param {string} options.tooltip=Legend Tooltip of button.
 * @param {string} options.className Style css of button.
 *
 * @example
 *  var map = new ol.Map({
 *      //config....
 *  });
 *  var tiledMap = new ol.ekmap.TiledMapLayer({
 *       url: 'https://viegisserver.ekgis.vn/gserver/rest/services/35/MapServer'
 *  }).addTo(map);
 *  var legend = new ol.ekmap.control.Legend({
 *      layers: [tiledMap]
 *  });
 *  map.addControl(legend,"top-left");
 */
var Legend = /*@__PURE__*/ (function(Control) {
    function Legend(opt_options) {
        this.options = opt_options ? opt_options : {};
        this.layers = Util.isArray(this.options.layers) ? this.options.layers : [this.options.layers];
        this.target = this.options.target;
        var me = this;
        if (!this.target) {
            this.button = document.createElement("button");
            this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Legend';
            this.button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdklEQVRYR+2WwQ2AMAwD7TX48WED9v8zRTcxog9UMUAcCXeBc5zqFML8aOajTwBJB4CtqJFBcjystwFJF4CzMMD+DaAi+MSQnMOvDdgD2Ffg/YSV+19ZfTyQBmJCSXYR2QPEhBYVxIR9GogJY8IOZ3luwn+q+Ab2OFQhhZ5ZtgAAAABJRU5ErkJggg==")';
            this.button.style.backgroundPosition = 'center';
            this.button.style.backgroundRepeat = 'no-repeat';
            this.button.style.backgroundSize = '70%';
            this.button.className = "ol-ctrl-zoom-in"
            this.button.addEventListener("click", function(e) {
                event.preventDefault();
                event.stopPropagation();
                if (me._panel) {
                    me.element.removeChild(me._panel);
                }
                me.button.style.display = "none";
                me._panel = me.createLayerInputToggle();
                me.element.appendChild(me._panel);
            })
        } else {
            var panel = document.getElementById(this.target);
            this.createLayerInputToggle(panel)
        }

        this.element = document.createElement('div');
        var className = 'gclient-bl';
        className = className + ' ' + (this.options.className !== undefined ? this.options.className : '');
        var cssClasses = className + ' ol-unselectable ol-control';
        this.element.className = cssClasses;
        this.element.setAttribute("id", "container");
        this.element.style.overflow = "auto";
        this.element.style.overflowX = "hidden";
        $(document).click((event) => {
            if (!$(event.target).closest('#container').length) {
                me.close();
            }
        });

        if (this.button)
            this.element.appendChild(this.button);

        if (this.target)
            this.element.style.display = 'none';

        Control.call(this, {
            element: this.element,
            target: this.target
        });

    }

    if (Control) Legend.__proto__ = Control;
    Legend.prototype = Object.create(Control && Control.prototype);
    Legend.prototype.constructor = Legend;

    /**
     * @private
     * @description Create layer input
     */
    Legend.prototype.createLayerInputToggle = function createLayerInputToggle(divTarget) {
        var me = this;
        if (!divTarget) {
            var div = document.createElement("div");
            div.className = 'scrollbar';
            div.id = 'opacity-control';
            var header = document.createElement("div");
            header.style.textAlign = 'center';
            header.style.fontWeight = '700';
            header.style.borderBottom = '1px solid #dddcdb';
            header.style.padding = '10px';
            header.innerHTML = this.options.title != undefined ? this.options.title : 'LEGEND';
            this.closeButton = document.createElement('a');
            this.closeButton.style.position = 'absolute';
            this.closeButton.style.top = '0';
            this.closeButton.style.right = '0';
            this.imgClose = document.createElement('img');
            this.imgClose.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAACCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4MVktI5AAAAMnRSTlMAAQIDBAUGBwgJCg0ODxARJXV7hYiLj5GUmJ6go6aqsrS1w8XIytHT19nc4ubo6ev5+yWLQbAAAABzSURBVBgZncFHEoJAAATA2YBgFhQTBpBkAnX+/zjZpSiult34xeasYfmFgnHkRaOx5EvBkAlTDaxYz9CSMTMvZDVFR8b88DlBz3mTC/TEnuR1iI448DaPeB+hJU8sXIgdH2NYEfMBGmtWCsY2cWAFpcI/vj+FCU1mGENhAAAAAElFTkSuQmCC");
            this.imgClose.style.padding = '5px';
            this.imgClose.style.cursor = 'pointer';
            this.closeButton.appendChild(this.imgClose);
            div.appendChild(header);
            div.appendChild(this.closeButton);
            this.closeButton.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                me.close();
            })
        } else
            var div = divTarget;
        div.style.maxHeight = "500px";
        div.style.maxWidth = "300px";
        div.style.width = "220px";
        div.style.padding = "0px 1rem";
        div.style.background = "#fff";
        div.style.boxShadow = '0 0 0 2px rgba(0,0,0,.1)'

        var ul = document.createElement("ul");
        ul.style.padding = "10px";
        ul.style.margin = "0";
        ul.style.listStyleType = "none"
        this.layers.forEach(layer => {
            layer.legend(function(list) {
                var listLenged = list.layers.slice();
                for (var i = 0; i < listLenged.length; i++) {
                    var li = document.createElement("li");
                    li.className = 'row';
                    li.style.paddingBottom = '10px';
                    var strong = document.createElement("strong");
                    strong.className = 'col-sm-9';
                    strong.innerHTML = listLenged[i].layerName;
                    for (var j = 0; j < listLenged[i].legend.length; j++) {
                        var img = document.createElement("img");
                        img.width = 20;
                        img.height = 20;
                        img.style.display = 'block';
                        img.style.margin = '0 auto';
                        img.src = "data:image/png;base64," + listLenged[i].legend[j].imageData;
                        // var span = document.createElement("span");
                        // span.innerHTML = listLenged[i].legend[j].label;
                        // span.style.paddingLeft = '15px';
                        var li1 = document.createElement("li");
                        li1.appendChild(img);
                        // li1.appendChild(span);
                        var ul1 = document.createElement("ul");
                        ul1.className = 'col-sm-3'
                        ul1.style.listStyleType = "none";
                        ul1.appendChild(li1);
                        li.appendChild(strong);
                        li.appendChild(ul1);
                        ul.appendChild(li);
                        div.appendChild(ul);
                    }
                }
            })
        })
        return div;
    }

    /**
     * @private
     * @description Close layer input
     */
    Legend.prototype.close = function close() {
        if (this._panel) {
            this.element.removeChild(this._panel);
            this._panel = null;
        }
        this.button.style.display = "";
    }
    return Legend;
}(Control));

export default Legend;