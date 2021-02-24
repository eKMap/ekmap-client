import '../core/Base';
import L from 'leaflet';
import { Util } from '../core/Util';
import Tree from '@widgetjs/tree';
/**
 * @class L.ekmap.control.TreeLayerGroup
 * @category  Control
 * @classdesc TreeLayerGroup.
 * @param {Object} options Construction parameters.
 * @param {Array<L.Map>} options.layers List of layers for which you want to display TreeLayerGroup.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {string} options.title=TreeLayerGroup Name of header.
 * @param {string} options.tooltip=TreeLayerGroup Tooltip of button.
 *
 * @example
 *  var map = new L.Map({
 *      //config....
 *  });
 *  var tiledMap = new L.ekmap.TiledMapLayer({
 *       url: 'https://viegisserver.ekgis.vn/gserver/rest/services/35/MapServer'
 *  }).addTo(map);
 *  var TreeLayerGroup = new L.ekmap.control.TreeLayerGroup({
 *      layers: [tiledMap]
 *  });
 *  map.addControl(TreeLayerGroup,"top-left");
 */
export class TreeLayerGroup extends L.Control {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.layer = this.options.layer;
        this.target = this.options.target;
    }

    /**
     * @function L.ekmap.control.TreeLayerGroup.prototype.onAdd
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
            this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'TreeLayerGroup';
            this.button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAd0lEQVRYR+2UsQ2AMBADL2vQpckG7N8zRTYJIggJGOAvxUdKbcu+d0F+RdZnKQMN2IIS6cD1PwkcwB5ooP4NjCDxR2bW/2ZAN6BXoEMYjMAtt9QOZAI6hPoZ6kOkG9Ar0CHMHcgEdAj1M9SHSDegV6BDmDugJHACFLYeISqYdm0AAAAASUVORK5CYII=")';
            this.button.style.backgroundPosition = 'center';
            this.button.style.backgroundRepeat = 'no-repeat';
            this.button.style.backgroundSize = '60%';
            this.button.addEventListener("click", function(e) {
                var nodeChild = [];
                var tree = [];
                var nodeParent = -1;
                event.preventDefault();
                event.stopPropagation();
                if (me._panel) {
                    me._div.removeChild(me._panel);
                }
                me.button.style.display = "none";
                me._panel = me.createLayerInputToggle();
                me._div.appendChild(me._panel);

                var service = new L.ekmap.MapService({
                    url: me.layer.options.url
                });
                service.getLayers(function(e) {
                    var layers = e.layers;
                    for (var i = 0; i < layers.length; i++) {
                        getChildren(layers[i], i)
                    }
                    var myTree = new Tree('#content', {
                        data: tree,
                        onChange: function() {
                            var param;
                            var bbox = [map.getBounds()._southWest.lng, map.getBounds()._southWest.lat, map.getBounds()._northEast.lng, map.getBounds()._northEast.lat];
                            var size = [];
                            size.push(map.getSize().x)
                            size.push(map.getSize().y)
                            if (this.values.toString() == '') {
                                param = {
                                    bbox: bbox,
                                    layers: 'hide:0',
                                    format: 'png32',
                                    dpi: 96,
                                    transparent: true,
                                    f: 'image',
                                    bboxSR: me.layer.projection,
                                    size: size
                                }
                            } else {
                                me.layer.listIndex = this.values;
                                param = {
                                    bbox: bbox,
                                    layers: 'show:' + this.values.toString(),
                                    format: 'png32',
                                    dpi: 96,
                                    transparent: true,
                                    f: 'image',
                                    bboxSR: '4326',
                                    size: size
                                }
                            }
                            me.url = me.layer.options.url;
                            me.url += 'export?' + Util.serialize(param);
                            me.layer.layer.setUrl(me.url);
                        },
                        loaded: function() {
                            if (me.layer.listIndex == null) {
                                this.values = nodeChild;
                            } else {
                                this.values = me.layer.listIndex
                            }
                        }
                    })
                });

                function getChildren(arr, i) {
                    if (arr.type == 'Group Layer' && !arr.parentLayer && arr.subLayers.length > 0) {
                        nodeParent++;
                        nodeChild.push(i)
                        tree.push({
                            "id": arr.id,
                            "text": arr.name,
                            "children": []
                        })
                        var subLayers = arr.subLayers
                        subLayers.forEach(layer => {
                            nodeChild.push(layer.id)
                            tree[nodeParent].children.push({
                                "id": layer.id,
                                "text": layer.name,
                                "children": []
                            })
                        });
                    }
                    if (arr.type == 'Group Layer' && arr.parentLayer && arr.subLayers.length > 0) {
                        nodeChild.forEach(element => {
                            if (arr.id == element) {
                                var subLayers = arr.subLayers
                                var childrens = tree[nodeParent].children;
                                subLayers.forEach(layer => {
                                    nodeChild.push(layer.id)
                                    for (var i = 0; i < childrens.length; i++) {
                                        if (childrens[i].id == element) {
                                            tree[nodeParent].children[i].children.push({
                                                "id": layer.id,
                                                "text": layer.name,
                                                "children": []
                                            })
                                        }
                                    }
                                });
                            }
                        });
                    }
                    if (arr.type == 'Feature Layer' && !arr.parentLayer && arr.subLayers.length == 0) {
                        nodeParent++;
                        tree.push({
                            "id": arr.id,
                            "text": arr.name,
                        })
                    }
                }
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
     * @function L.ekmap.control.TreeLayerGroup.prototype.onRemove
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
            header.innerHTML = this.options.title != undefined ? this.options.title : 'TreeLayerGroup';
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
        div.style.maxHeight = "350px";
        div.style.maxWidth = "300px";
        div.style.padding = "0px 1rem";
        var div1 = document.createElement("div");
        div1.id = "content"
        div1.style.padding = "15px 20px 0px 0px";
        div.appendChild(div1);
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

L.ekmap.control.TreeLayerGroup = TreeLayerGroup;