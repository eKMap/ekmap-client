import '../core/Base';
import { Util } from '../core/Util';
import Control from 'ol/control/Control';
import Tree from '@widgetjs/tree';
/**
 * @class ol.ekmap.control.TreeLayerGroup
 * @category  Control
 * @classdesc TreeLayerGroup.
 * @param {Object} options Construction parameters.
 * @param {Array<ol.Map>} options.layers List of layers for which you want to display TreeLayerGroup.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {string} options.title=TreeLayerGroup Name of header.
 * @param {string} options.tooltip=TreeLayerGroup Tooltip of button.
 * @param {string} options.className Style css of button.
 *
 * @example
 *  var map = new ol.Map({
 *      //config....
 *  });
 *  var tiledMap = new ol.ekmap.TiledMapLayer({
 *       url: 'https://viegisserver.ekgis.vn/gserver/rest/services/35/MapServer'
 *  }).addTo(map);
 *  var TreeLayerGroup = new ol.ekmap.control.TreeLayerGroup({
 *      layers: [tiledMap]
 *  });
 *  map.addControl(TreeLayerGroup,"top-left");
 */
var TreeLayerGroup = /*@__PURE__*/ (function(Control) {
    function TreeLayerGroup(opt_options) {
        this.options = opt_options ? opt_options : {};
        this.layer = this.options.layer;
        this.target = this.options.target;
        var me = this;
        if (!this.target) {
            this.button = document.createElement("button");
            this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'TreeLayerGroup';
            this.button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdklEQVRYR+2WwQ2AMAwD7TX48WED9v8zRTcxog9UMUAcCXeBc5zqFML8aOajTwBJB4CtqJFBcjystwFJF4CzMMD+DaAi+MSQnMOvDdgD2Ffg/YSV+19ZfTyQBmJCSXYR2QPEhBYVxIR9GogJY8IOZ3luwn+q+Ab2OFQhhZ5ZtgAAAABJRU5ErkJggg==")';
            this.button.style.backgroundPosition = 'center';
            this.button.style.backgroundRepeat = 'no-repeat';
            this.button.style.backgroundSize = '70%';
            this.button.className = "ol-ctrl-zoom-in"
            this.button.addEventListener("click", function(e) {
                var nodeparentArr = [];
                var nodeChild = [];
                var tree = [];
                var nodeParent = -1;
                var map = me.getMap();
                event.preventDefault();
                event.stopPropagation();
                if (me._panel) {
                    me.element.removeChild(me._panel);
                }
                me.button.style.display = "none";
                me._panel = me.createLayerInputToggle();
                me.element.appendChild(me._panel);
                var service = new ol.ekmap.MapService({
                    url: me.layer.options.url
                });
                service.getLayers(function(e) {
                    var layers = e.layers;
                    for (var i = 0; i < layers.length; i++) {
                        getChildren(layers[i], i)
                    }
                    var myTree = new Tree('#content', {
                        data: tree,
                        loaded: function() {
                            if (me.layer.listIndex == null) {
                                this.values = nodeparentArr;
                            } else {
                                this.values = me.layer.listIndex;
                            }
                        },
                        onChange: function() {
                            var param;
                            var bbox = map.getView().calculateExtent();
                            if (this.values.toString() == '') {
                                param = {
                                    bbox: bbox,
                                    layers: 'hide:0',
                                    format: 'png32',
                                    dpi: 96,
                                    transparent: true,
                                    f: 'image',
                                    bboxSR: me.layer.projection,
                                    size: map.getSize()
                                }
                            } else {
                                console.log(me.layer)
                                me.layer.listIndex = this.values;
                                param = {
                                    bbox: bbox,
                                    layers: 'show:' + this.values.toString(),
                                    format: 'png32',
                                    dpi: 96,
                                    transparent: true,
                                    f: 'image',
                                    bboxSR: me.layer.projection,
                                    size: map.getSize()
                                }
                            }
                            me.url = me.layer.options.url;
                            me.layer.listDataOpen = this.values.toString();
                            me.url += 'export?' + Util.serialize(param);
                            me.layer.layer.setSource(
                                new ol.source.ImageStatic({
                                    url: me.url,
                                    projection: me.layer.proj,
                                    imageExtent: bbox
                                })
                            )
                        },

                    })
                });

                function getChildren(arr, i) {
                    if (arr.type == 'Group Layer' && !arr.parentLayer && arr.subLayers.length > 0) {
                        nodeParent++;
                        nodeChild.push(i)
                        nodeparentArr.push(i)
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
                        nodeparentArr.push(i)
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

    if (Control) TreeLayerGroup.__proto__ = Control;
    TreeLayerGroup.prototype = Object.create(Control && Control.prototype);
    TreeLayerGroup.prototype.constructor = TreeLayerGroup;

    /**
     * @private
     * @description Create layer input
     */
    TreeLayerGroup.prototype.createLayerInputToggle = function createLayerInputToggle(divTarget) {
        var me = this;
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
        var div1 = document.createElement("div");
        div1.id = "content"
        div1.style.padding = "15px 20px 0px 0px";
        div.appendChild(div1);
        div.style.maxHeight = "300px";
        div.style.maxWidth = "300px";
        div.style.padding = "0px 1rem";
        div.style.background = "#fff";
        div.style.boxShadow = '0 0 0 2px rgba(0,0,0,.1)'
        return div;
    }

    /**
     * @private
     * @description Close layer input
     */
    TreeLayerGroup.prototype.close = function close() {
        if (this._panel) {
            this.element.removeChild(this._panel);
            this._panel = null;
        }
        this.button.style.display = "";
    }
    return TreeLayerGroup;
}(Control));

export default TreeLayerGroup;