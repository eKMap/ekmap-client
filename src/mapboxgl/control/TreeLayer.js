import '../core/Base';
import mapboxgl from 'mapbox-gl';
/**
 * @class mapboxgl.ekmap.control.TreeLayer
 * @category  Control
 * @classdesc TreeLayer.
 * @param {Object} options Construction parameters.
 * @param {Array} options.baseLayers=null List of baselayer for which you want to display TreeLayer.
 * @param {Array} options.overLayers=null List of overlayer for which you want to display TreeLayer.
 * @param {Boolean} options.opacityControl=false Display opacity.
 * @param {String} options.tooltip=Treelayer Tooltip of button.
 * 
 *
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....
 *  });
 * map.on('load', function() {
            var vnMap = new mapboxgl.ekmap.TiledVietNamMapLayer({
                token: tokenVN,
                id: 'vnMap'
            }).addTo(map);
            var adminMap = new mapboxgl.ekmap.TiledAdminMapLayer({
                id: 'adminMap'
            }).addTo(map);
            var roadMap = new mapboxgl.ekmap.TiledRoadMapLayer({
                id: 'roadMap'
            }).addTo(map);
            var tiledMap = new mapboxgl.ekmap.TiledMapLayer({
                url: urlMapService,
                token: tokenKey,
                id: 'tilelayer'
            }).addTo(map);
                //BaseLayer
            const mapBaseLayer = {
                roadMap: "Road Map",
                adminMap: "Admin Map",
                vnMap: "VietNam Map",
            };

            // OverLayer
            const mapOverLayer = {
                tilelayer: "Tile Layer"
            };

            // TreeLayerControl
            let Opacity = new mapboxgl.ekmap.control.TreeLayer({
                baseLayers: mapBaseLayer,
                overLayers: mapOverLayer,
                opacityControl: true,
                className: 'class-fix'
            });
            map.addControl(Opacity, 'bottom-right');
        })
 *
 */
export class TreeLayer extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options || {};
        this._baseLayersOption = options.baseLayers || null;
        this._overLayersOption = options.overLayers || null;
        this._vectorTiledOption = options.vectorTiledMapLayer || null;
        this.listLayer = this._vectorTiledOption;
        if (this._vectorTiledOption !== null)
            this._vectorTiledOption = this._vectorTiledOption.objectLayer
        this._opacityControlOption = options.opacityControl || false;
        this.className = 'mapboxgl-ctrl mapboxgl-ctrl-group' + ' ' + (options.className !== undefined ? options.className : '');
    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayer.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        this.div = document.createElement("div");
        this.button = document.createElement("button");
        this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Tree layer';
        this.button.className = 'mapboxgl-btn-treelayer';
        this._map.on('zoom', function() {
            if (me._panel) {
                var zoom = me._map.getZoom();
                var listId = me.listLayer.arr;
                listId.forEach(id => {
                    var checkDom = document.getElementById(id);
                    var layer = me._map.getLayer(id);
                    if (checkDom.value != 'change' || checkDom.checked == true) {
                        if (zoom < layer.minzoom || zoom > layer.maxzoom) {
                            checkDom.checked = false
                            checkDom.disabled = true;
                        } else {
                            checkDom.checked = true
                            checkDom.disabled = false;
                        }
                    }
                    if (checkDom.value == 'change' && checkDom.checked == false) {
                        if (zoom < layer.minzoom || zoom > layer.maxzoom) {
                            checkDom.checked = false;
                            checkDom.disabled = false;
                        } else {
                            checkDom.checked = false;
                            checkDom.disabled = false;
                        }
                    }
                    if (checkDom.value == 'change' && checkDom.checked == true) {
                        checkDom.value = ''
                    }
                });
            }
        })
        this.button.addEventListener("click", function(e) {
            event.preventDefault();
            event.stopPropagation();
            if (me._panel) {
                me._container.removeChild(me._panel);
            }
            me.button.style.display = "none";
            me.currentZoom = me._map.getZoom()
            me._panel = me.createLayerInputToggle();
            me._container.appendChild(me._panel);
        })
        this._container = document.createElement('div');
        this._container.setAttribute("id", "container");
        me._container.style.overflow = "auto";
        me._container.style.overflowX = "hidden";
        me._container.style.fontSize = "14px";
        me._container.style.background = "#fff";
        this._container.className = this.className;
        //this._container.style.padding = "8px";
        $(document).click((event) => {
            if (!$(event.target).closest('#container').length) {
                me.close();
            }
        });
        this._container.appendChild(this.button);
        return this._container;
    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayer.prototype.onRemove
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
        div.id = 'opacity-control';
        div.style.maxHeight = "300px";
        div.style.maxWidth = "300px";
        div.style.padding = "20px";
        div.className = 'scrollbar';
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
        this.closeButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            me.close();
        })
        if (this._baseLayersOption !== null) {
            Object.keys(this._baseLayersOption).forEach((layer) => {
                const layerId = layer;
                const br = document.createElement('br');
                this._radioButtonControlAdd(layerId, div);
                div.appendChild(br);
            });
        }

        if ((this._baseLayersOption !== null && this._overLayersOption !== null) || (this._baseLayersOption !== null && this._vectorTiledOption !== null) || this._vectorTiledOption !== null) {
            const hr = document.createElement('hr');
            div.appendChild(hr);
        }

        if (this._overLayersOption !== null) {
            Object.keys(this._overLayersOption).forEach((layer) => {
                const layerId = layer;
                const br = document.createElement('br');
                this._checkBoxControlAdd(layerId, div);
                div.appendChild(br);
                if (this._opacityControlOption) {
                    this._rangeControlAdd(layerId, div);
                    div.appendChild(br);
                }
            });
        }

        if (this._vectorTiledOption !== null) {
            Object.keys(this._vectorTiledOption).forEach((layer) => {
                const layerId = layer;
                const br = document.createElement('br');
                this._checkBoxControlAdd(layerId, div);
                div.appendChild(br);
                if (this._opacityControlOption) {
                    this._rangeControlAdd(layerId, div);
                    div.appendChild(br);
                }
            });
        }
        return div;
    }

    _radioButtonControlAdd(layerId, div) {
        const radioButton = document.createElement('input');
        radioButton.setAttribute('type', 'radio');
        radioButton.style.marginRight = '1rem';
        radioButton.style.height = '0.8rem';
        radioButton.style.width = '0.8rem';
        radioButton.id = layerId;
        if (layerId === Object.keys(this._baseLayersOption)[0]) {
            radioButton.checked = true;
            this._map.setLayoutProperty(layerId, 'visibility', 'visible');
        } else {
            this._map.setLayoutProperty(layerId, 'visibility', 'none');
        }
        div.appendChild(radioButton);

        radioButton.addEventListener('change', (event) => {
            event.target.checked = true;
            this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            Object.keys(this._baseLayersOption).forEach((layer) => {
                if (layer !== event.target.id) {
                    document.getElementById(layer).checked = false;
                    this._map.setLayoutProperty(layer, 'visibility', 'none');
                }
            });
        });

        const layerName = document.createElement('span');
        layerName.appendChild(document.createTextNode(this._baseLayersOption[layerId]));
        div.appendChild(layerName);
    }

    _checkBoxControlAdd(layerId, div) {
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.id = layerId;
        checkBox.style.marginRight = '1rem';
        checkBox.style.height = '0.8rem';
        checkBox.style.width = '0.8rem';
        var layer = this._map.getLayer(layerId);
        // this._map.getLayoutProperty(layerId, 'visibility')
        if (this.currentZoom < layer.minzoom || this.currentZoom > layer.maxzoom) {
            checkBox.checked = false;
            checkBox.disabled = true;
        } else {
            checkBox.checked = true;

        }
        // if (layer.visibility == 'none')
        //     checkBox.checked = false;
        // else
        //     checkBox.checked = true;

        checkBox.addEventListener('change', (event) => {
            const ckFlag = event.target.checked;
            checkBox.value = 'change';
            if (ckFlag) {
                this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            } else {
                this._map.setLayoutProperty(layerId, 'visibility', 'none');
            }
        });

        const layerName = document.createElement('span');
        if (this._vectorTiledOption !== null) {
            layerName.appendChild(document.createTextNode(this._vectorTiledOption[layerId]));
        }

        if (this._overLayersOption !== null)
            layerName.appendChild(document.createTextNode(this._overLayersOption[layerId]));
        var divInput = document.createElement('div');
        divInput.appendChild(checkBox)
        divInput.appendChild(layerName)
        div.appendChild(divInput);
    }

    _rangeControlAdd(layerId, div) {
        const range = document.createElement('input');
        range.type = 'range';
        range.min = 0;
        range.max = 100;
        range.value = 100;
        range.style.width = '100%';
        range.style.height = '1rem';
        range.style.borderRadius = '1rem';
        range.style.margin = '.2rem 0 1rem';
        range.style.border = 'none';
        range.style.padding = '1px 2px';
        range.style.outline = '0';
        div.appendChild(range);

        range.addEventListener('input', (event) => {
            const rgValue = event.target.value;
            if (this._map.getLayer(layerId).type == 'raster')
                this._map.setPaintProperty(layerId, 'raster-opacity', Number(rgValue / 100));
            if (this._map.getLayer(layerId).type == 'symbol') {
                this._map.setPaintProperty(layerId, 'icon-opacity', Number(rgValue / 100));
                this._map.setPaintProperty(layerId, 'text-opacity', Number(rgValue / 100));
            }
            if (this._map.getLayer(layerId).type == 'circle')
                this._map.setPaintProperty(layerId, 'circle-opacity', Number(rgValue / 100));
            if (this._map.getLayer(layerId).type == 'line')
                this._map.setPaintProperty(layerId, 'line-opacity', Number(rgValue / 100));
            if (this._map.getLayer(layerId).type == 'fill')
                this._map.setPaintProperty(layerId, 'fill-opacity', Number(rgValue / 100));
        });

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

mapboxgl.ekmap.control.TreeLayer = TreeLayer;