import '../core/Base';
import L from 'leaflet';
import { Util } from '../core/Util';
/**
 * @class L.ekmap.control.Legend
 * @category  Control
 * @classdesc Legend.
 * @param {Object} options Construction parameters.
 * @param {Array<L.Map>} options.layers List of layers for which you want to display legend.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {string} options.title=LEGEND Name of header.
 * @param {boolean} options.showLabel=true Show label of legend.
 * @param {string} options.tooltip=Legend Tooltip of button.
 *
 * @example
 *  var map = new L.Map({
 *      //config....
 *  });
 *  var tiledMap = new L.ekmap.TiledMapLayer({
 *       url: 'https://viegisserver.ekgis.vn/gserver/rest/services/35/MapServer'
 *  }).addTo(map);
 *  var legend = new L.ekmap.control.Legend({
 *      layers: [tiledMap]
 *  });
 *  map.addControl(legend,"top-left");
 */
export class Legend extends L.Control {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.layers = Util.isArray(this.options.layers) ? this.options.layers : [this.options.layers];
        this.target = this.options.target;
        this.showLabel = this.options.showLabel != undefined ? this.options.showLabel : true;
    }

    /**
     * @function L.ekmap.control.Legend.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        if (!this.target) {
            this.button = document.createElement("a");
            this.button.attributes.role = 'button';
            this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Legend';
            this.button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAd0lEQVRYR+2UsQ2AMBADL2vQpckG7N8zRTYJIggJGOAvxUdKbcu+d0F+RdZnKQMN2IIS6cD1PwkcwB5ooP4NjCDxR2bW/2ZAN6BXoEMYjMAtt9QOZAI6hPoZ6kOkG9Ar0CHMHcgEdAj1M9SHSDegV6BDmDugJHACFLYeISqYdm0AAAAASUVORK5CYII=")';
            this.button.style.backgroundPosition = 'center';
            this.button.style.backgroundRepeat = 'no-repeat';
            this.button.style.backgroundSize = '60%';
            this.button.addEventListener("click", function(e) {
                console.log(e);
                event.preventDefault();
                event.stopPropagation();
                if (me._panel) {
                    me._div.removeChild(me._panel);
                }
                me.button.style.display = "none";
                me._panel = me.createLayerInputToggle();
                me._div.appendChild(me._panel);
            })
        } else {
            var panel = document.getElementById(this.target);
            this.createLayerInputToggle(panel)
        }
        this._div = document.createElement('div');
        this._div.setAttribute("id", "container");
        me._div.style.overflow = "auto";
        me._div.style.overflowX = "hidden";
        me._div.style.fontSize = "14px";
        me._div.style.background = "#fff";
        var className = 'leaflet-bar ';
        this._div.className = className + (this.options.className !== undefined ? this.options.className : '');;
        //this._div.style.padding = "8px";
        $(document).click((event) => {
            if (!$(event.target).closest('#container').length) {
                me.close();
            }
        });
        if (this.button)
            this._div.appendChild(this.button);
        if (this.target)
            this._div.style.display = 'none';
        return this._div;
    }

    /**
     * @function L.ekmap.control.Legend.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove(map) {
        this._map = map;
        this._div.parentNode.removeChild(this._div);
        this._map = undefined;
    }


    /**
     * @private
     * @description Create layer input
     */
    createLayerInputToggle(divTarget) {
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
            this.closeButton.style.borderBottom = 'none';
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
                    // var strong = document.createElement("strong");
                    // strong.className = 'col-sm-9';
                    // strong.innerHTML = listLenged[i].layerName;
                    for (var j = 0; j < listLenged[i].legend.length; j++) {
                        var img = document.createElement("img");
                        img.width = 20;
                        img.height = 20;
                        if (!me.showLabel)
                            img.style.width = 'auto';
                        img.style.display = 'block';
                        img.style.margin = '0 10px';
                        img.src = "data:image/png;base64," + listLenged[i].legend[j].imageData;
                        var span
                        if (me.showLabel) {
                            span = document.createElement("span");
                            span.innerHTML = listLenged[i].legend[j].label != '' ? listLenged[i].legend[j].label : listLenged[i].layerName;
                            span.style.paddingLeft = '15px';
                        }
                        var li1 = document.createElement("li");
                        li1.appendChild(img);
                        if (span)
                            li1.appendChild(span);
                        var ul1 = document.createElement("ul");
                        ul1.className = 'col-12'
                        ul1.style.listStyleType = "none";
                        ul1.appendChild(li1);
                        // li.appendChild(strong);
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
    close() {
        if (this._panel) {
            this._div.removeChild(this._panel);
            this._panel = null;
        }
        this.button.style.display = "";
    }
}

L.ekmap.control.Legend = Legend;