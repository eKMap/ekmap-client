import '../core/Base';
import mapboxgl from 'mapbox-gl';
import Tree from '@widgetjs/tree';
/**
 * @class mapboxgl.ekmap.control.TreeLayerGroup
 * @category  Control
 * @classdesc TreeLayer.
 * @param {Object} options Construction parameters.
 * @param {Array} options.baseLayers=null List of baselayer for which you want to display TreeLayerGroup.
 * @param {Array} options.overLayers=null List of overlayer for which you want to display TreeLayerGroup.
 * @param {Boolean} options.opacityControl=false Display opacity.
 * @param {string} options.title=TREELAYER Name of header.
 * @param {String} options.tooltip=Treelayer Tooltip of button.
 *
 */
export class TreeLayerGroup extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options || {};
        this._url = this.options.url;
        if (this.options) {
            this._url = this.options.url || {};
        }
        this.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayerGroup.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this;
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.button.className = 'mapboxgl-btn-treelayer';
        this.button.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (me._panel) {
                me._container.removeChild(me._panel);
            }
            me.button.style.display = "none";
            me._panel = me.createLayerInputToggle();
            me._container.appendChild(me._panel);
            var service = new mapboxgl.ekmap.MapService({
                url: me.options.url
            });
            var treeData = [];
            service.getLayers(function(e) {
                var layerData = e.layers;
                layerData.forEach(f => {
                    treeData.push({
                        id: f.id,
                        text: f.name,
                        children: [],
                    });
                });
                var myTree = new Tree('#content', {
                    data: treeData,
                })
            });
        })
        this._container = document.createElement('div');
        this._container.setAttribute("id", "container");
        me._container.style.overflow = "auto";
        me._container.style.overflowX = "hidden";
        me._container.style.fontSize = "14px";
        me._container.style.background = "#fff";
        this._container.className = this.className;
        $(document).click((event) => {
            if (!$(event.target).closest('#container').length) {
                me.close();
            }
        });
        this._container.appendChild(this.button);
        return this._container;
    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayerGroup.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove(map) {
        this._map = map;
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }


    /**
     * @private
     * @description Create layer input
     */
    createLayerInputToggle() {

        var me = this;
        var div = document.createElement("div");
        div.id = 'content-control';
        div.style.maxHeight = "500px";
        div.style.maxWidth = "300px";
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.padding = "0px 1rem";
        div.className = 'scrollbar';
        var header = document.createElement("div");
        header.style.textAlign = "center";
        header.style.fontWeight = "700";
        header.style.borderBottom = "1px solid #dddcdb";
        header.style.padding = "10px";
        header.innerHTML = this.options.title != undefined ? this.options.title : "Trees Layer Group";
        this.closeButton = document.createElement('a');
        this.closeButton.style.position = 'absolute';
        this.closeButton.style.top = '0';
        this.closeButton.style.right = '5px';
        this.imgClose = document.createElement('img');
        this.imgClose.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAACCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4MVktI5AAAAMnRSTlMAAQIDBAUGBwgJCg0ODxARJXV7hYiLj5GUmJ6go6aqsrS1w8XIytHT19nc4ubo6ev5+yWLQbAAAABzSURBVBgZncFHEoJAAATA2YBgFhQTBpBkAnX+/zjZpSiult34xeasYfmFgnHkRaOx5EvBkAlTDaxYz9CSMTMvZDVFR8b88DlBz3mTC/TEnuR1iI448DaPeB+hJU8sXIgdH2NYEfMBGmtWCsY2cWAFpcI/vj+FCU1mGENhAAAAAElFTkSuQmCC");
        this.imgClose.style.padding = '5px';
        this.imgClose.style.cursor = 'pointer';
        this.closeButton.appendChild(this.imgClose);
        div.appendChild(this.closeButton);
        div.appendChild(header);
        this.closeButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            me.close();
        })
        var div1 = document.createElement('div');
        div1.id = "content";
        div.appendChild(div1);
        return div;
    }

    /**
     * @private
     * @description Close layer input
     */
    close() {
        if (this._panel) {
            this._container.removeChild(this._panel);
            this._panel = null;
        }
        this.button.style.display = "";
    }
}
mapboxgl.ekmap.control.TreeLayerGroup = TreeLayerGroup;