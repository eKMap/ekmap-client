import '../core/Base';
import mapboxgl from 'mapbox-gl';
import Sortable from 'sortablejs';
/**
 * @class mapboxgl.ekmap.control.TreeLayerPreview
 * @category  Control
 * @classdesc TreeLayerPreview.
 * @param {Object} options Construction parameters.
 * @param {Array} options.baseLayers=null List of baselayer for which you want to display TreeLayerPreview.
 * @param {Array} options.overLayers=null List of overlayer for which you want to display TreeLayerPreview.
 * @param {Array} options.vectorTiledMapLayer=null List of vectorlayer for which you want to display TreeLayerPreview.
 * @param {Boolean} options.opacityControl=false Display opacity.
 * @param {string} options.title=TreeLayerPreview Name of header.
 * @param {string} options.width=220px width of TreeLayerPreview.
 * @param {String} options.tooltip=TreeLayerPreview Tooltip of button.
 * @param {Boolean} options.showHeader=true Show/hide header.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {Array<String>} options.layerIdHidden Array layerId you not show on TreeLayerPreview.
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
            let Opacity = new mapboxgl.ekmap.control.TreeLayerPreview({
                baseLayers: mapBaseLayer,
                overLayers: mapOverLayer,
                opacityControl: true,
                className: 'class-fix'
            });
            map.addControl(Opacity, 'bottom-right');
        })
 *
 */
export class TreeLayerPreview extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options || {};
        this.target = this.options.target;
        this.showHeader = this.showHeader != undefined ? this.showHeader : true;
        this._opacityControlOption = options.opacityControl != undefined ?  options.opacityControl : false;
        this.className = 'mapboxgl-ctrl mapboxgl-ctrl-group' + ' ' + (options.className !== undefined ? options.className : '');
        this.layers = undefined;
        this.widthDiv = options.width != undefined ? options.width : '220px';
    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayerPreview.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        if(!this.target){
            this.button = document.createElement("button");
            this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Tree layer';
            this.button.className = 'mapboxgl-btn-TreeLayerPreview';
            this.button.addEventListener("click", function(e) {
                event.preventDefault();
                event.stopPropagation();
                if (me._panel) {
                    me._container.removeChild(me._panel);
                }
                me.button.style.display = "none";
                me._panel = me.createLayerInputToggle();
                me._container.appendChild(me._panel);
            })
        }else{
            var panel = document.getElementById(this.target);
            this.createLayerInputToggle(panel)
        }
      
        this._container = document.createElement('div');
        this._container.setAttribute("id", "container");
        me._container.style.overflow = "auto";
        me._container.style.overflowX = "hidden";
        me._container.style.fontSize = "14px";
        me._container.style.background = "#fff";
        this._container.className = this.className;
        //this._container.style.padding = "8px";
        
        if(this.button){
            this._container.appendChild(this.button);
            $(document).click((event) => {
                if (!$(event.target).closest('#container').length) {
                    me.close();
                }
            });
        }
        else
            this._container.style.display = 'none';
        return this._container;
    }

    /**
     * @function mapboxgl.ekmap.control.TreeLayerPreview.prototype.onRemove
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
    createLayerInputToggle(divTarget) {
        var me = this;
        var div;
        if(!divTarget){
            div = document.createElement("div");
            div.id = 'opacity-control'
            div.style.maxHeight = "300px";
            div.style.maxWidth = "500px";
            div.style.width = this.widthDiv;
            div.style.padding = "0px 1rem";
            div.style.border = "2px solid rgba(0,0,0,0.2)";
            div.style.backgroundClip = "padding-box";
            div.className = 'scrollbar';
            if(me.showHeader){
                var header = document.createElement("div");
                header.style.textAlign = 'center';
                header.style.fontWeight = '700';
                header.style.borderBottom = '1px solid #dddcdb';
                header.style.padding = '10px';
                header.innerHTML = this.options.title != undefined ? this.options.title : 'TreeLayerPreview';
                div.appendChild(header);
            }
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
        }else
            div = divTarget;    
        var divDrop = document.createElement("div");
        divDrop.id = 'drop-control';
        divDrop.style.width = '100%';
        divDrop.className = 'container';
        div.appendChild(divDrop);
        var layers = me._map.getStyle().layers;
            me.layers = _.remove(layers,function(layer){
                return (layer.type != 'raster' || (layer.metadata && layer.metadata.type != 'baselayer'))
            });
            if(me.layers.length > 0){
                var i = 0;
                _.forEach(me.layers, function(layer){
                    const br = document.createElement('br');
                    if(layer.type != 'raster'){
                        layer['sorter'] = i++;
                        me._checkBoxControlAdd(layer.id, divDrop);
                    }else {
                        if(layer.metadata && layer.metadata.type != 'baselayer'){
                            layer['sorter'] = i++;
                            me._checkBoxControlAdd(layer.id, divDrop);
                        }
                    }
                })
            } 
            Sortable.create(divDrop, {
                animation: 100,
                handle: '.handle',
                onEnd: function (/**Event*/evt) {
                    var oldIndex = evt.oldIndex;
                    var newIndex = evt.newIndex;
                    var idOldIndex;
                    var idNewIndex ;
                    if(newIndex > oldIndex){
                        if(newIndex == me.layers.length - 1){
                            idOldIndex = me.layers[_.findIndex(me.layers, ['sorter', oldIndex])].id;
                            idNewIndex = me.layers[_.findIndex(me.layers, ['sorter', newIndex])].id;
                            map.moveLayer(idOldIndex,idNewIndex);
                                me.updateSorter();
                                map.moveLayer(me.layers[me.layers.length - 1].id,me.layers[me.layers.length - 2].id);
                        }else{
                            idOldIndex = me.layers[_.findIndex(me.layers, ['sorter', oldIndex])].id;
                            idNewIndex = me.layers[_.findIndex(me.layers, ['sorter', newIndex + 1])].id;
                            map.moveLayer(idOldIndex, idNewIndex);
                        }
                    }else{
                            idOldIndex = me.layers[_.findIndex(me.layers, ['sorter', oldIndex])].id;
                            idNewIndex = me.layers[_.findIndex(me.layers, ['sorter', newIndex])].id;
                            map.moveLayer(idOldIndex,idNewIndex);
                        
                    }
                    me.updateSorter();
                   
                }
            });  
        // if (this._baseLayersOption !== null) {
        //     Object.keys(this._baseLayersOption).forEach((layer) => {
        //         const layerId = layer;
        //         const br = document.createElement('br');
        //         this._radioButtonControlAdd(layerId, div);
        //         div.appendChild(br);
        //     });
        // }

        // if ((this._baseLayersOption !== null && this._overLayersOption !== null) || (this._baseLayersOption !== null && this._vectorTiledOption !== null) || this._vectorTiledOption !== null) {
        //     const br = document.createElement('br');
        //     div.appendChild(br);
        // }

        // if (this._overLayersOption !== null) {
        //     Object.keys(this._overLayersOption).forEach((layer) => {
        //         const layerId = layer;
        //         const br = document.createElement('br');
        //         this._checkBoxControlAdd(layerId, div);
        //         div.appendChild(br);
        //         if (this._opacityControlOption) {
        //             this._rangeControlAdd(layerId, div);
        //             div.appendChild(br);
        //         }
        //     });
        // }
        return div;
    }

    updateSorter(){
        var layers = this._map.getStyle().layers;
        this.layers = _.remove(layers,function(layer){
            return (layer.type != 'raster' || (layer.metadata && layer.metadata.type != 'baselayer'))
        });
        var i = 0;
        _.forEach(this.layers, function(layer){
            layer['sorter'] = i++;
        })
    }

    _checkBoxControlAdd(layerId, div, leg) {
        var me = this;
        var divSwitch = document.createElement('div');
        divSwitch.className = 'row';
        divSwitch.alignItems = 'center';
        divSwitch.paddingBottom = '5px!important';
        divSwitch.paddingTop = '5px!important';

        var label = document.createElement('label');
        label.className = 'switch';
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.id = layerId;
        checkBox.style.marginRight = '1rem';
        checkBox.style.height = '1.2rem';
        checkBox.style.width = '1.2rem';
        var span = document.createElement('span');
        span.className = 'slider round';
        label.appendChild(checkBox);
        label.appendChild(span);
        divSwitch.appendChild(label);
        var layer = this._map.getLayer(layerId);
        var currentZoom = me._map.getZoom()
        if(layer){
            if (currentZoom < layer.minzoom || currentZoom > layer.maxzoom) {
                checkBox.checked = false;
                checkBox.disabled = true;
            } else {
                checkBox.checked = true;
    
            }
        }
        checkBox.addEventListener('change', (event) => {
            const ckFlag = event.target.checked;
            checkBox.value = 'change';
            if (ckFlag) {
                this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            } else {
                this._map.setLayoutProperty(layerId, 'visibility', 'none');
            }
        });
        var divMore = document.createElement('div');
        divMore.style.width = '1.8rem';
        divMore.style.cursor = 'move';
        var iMore = document.createElement('i');
        iMore.className ='fa fa-arrows handle';
        divMore.appendChild(iMore);
        var divDropdown = document.createElement('div');
        divDropdown.className = 'dropdown';
        var button = document.createElement('button');
        button.className = 'btn btn-lg btn-link-dark dropdown-toggle';
        // button.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAEZElEQVR4Xu2buc4UVxCFv/8JLAJyB06RIILHIAEEYpERYt93Y7MJbDaz2mIRi0AsYkmQn4CMFCFB6IgHQMQEqNA0GvA/w3T1PbdrrGppsq6qU+fr6p7pe2eGPEI5MBNKTYohgQS7CBJIAgnmQDA5OSEJJJgDweTkhCSQYA4Ek5MTkkCCORBMTk5IAgnmQDA5OSEJJJgDweTkhCSQYA4Ek5MTkkCCORBMTk5IAgnmQDA5OSEJJJgDweTkhCSQYA4Ek5MTkkCCORBMTk5IAgnmQDA5tSdkPvAv8CGYD6PkzAXs87aW3lpAdgJbgJ8Gjf0DXARe1Gq0ZZ3FwAFg0SDuDXALuNQyT+vTawB5CiwZoew4cKy1am2A6Tk6osQzYKmyvBrIOBhNX5GgjIPR6JVCUQKZBEYkKJPAkENRAWkDIwKUNjAavQ+AVaVvXwogHhh9QvHAaPSeBn4pCaU0kC7N9QGlhF57yNtzpchREsgPwPsiqqDGg74EjKbdOaV6LwlkHvC6EBBLo4RSEoZpXQC8KtF7ZCAqKKVhhAVS8pY1fLGVnBQFDNMa8pZlwlQNW14D0+VQaQv7UG/MeiJ6vdAFigpGyen97F/JZ8jw1fsYWNblch4R64GignECOFK6RxUQ0/kIWF5a8OC2OOntSwXjD+BXQW+yCWm0PgRWCIRPMikqGMV/nQ/7o5yQps59YGVlKCoY54D9gl6+pKwBxIrdA1YLGpltUlQwzgN7BT18lbIWECt6F1gjaGgYigqGrW7uFmj/T8qaQKz4HeBnQWMGwnoZtdLXpeQVYEeXBG1iawMxbbeBtW1E9nju38C2mvX7AGL93QTW1WzUUesasNkR1ymkLyAm+gawvpN6XbBp26hLPzpzn0BM1XVgQx+Nj6nZGwzT1DcQ03AV2BQESi+3qeHeIwAxPfbwtI10fR52YfStIcSENBD+Arb2RKT6t6lRfUaZkEbfZWB7ZSh2IdSuObLFaEBMqO2frfVDzC4A23cc5ogIxMy5AOwSu1TtdUibPqICsR7sZZ7q/ZEB39PGqFrnRgZiHtjr7tJvWP8E9tUyuG2d6ECsnzMF1yDk6xltAXx7/jQAMc22Smd/oOlyGNiDXRLUiJ0WIOaFrWN7NzafAg7VMLRrjWkCYr3+7jBWtiGhq/mzxU8bEOvBtt/8NqEZJ4HDE54b4rRpBGLG2Tag7+2JkuybUlObViDmy7j18+I7CtUgmvzTDMR6sL8v2zenhYOGXgJngee1DCxdZ9qBNH78CHwE3pU2qHa+/wuQ2r7J6iUQmbW+xAnE55ssKoHIrPUlTiA+32RRCURmrS9xAvH5JotKIDJrfYkTiM83WVQCkVnrS5xAfL7JohKIzFpf4gTi800WlUBk1voSJxCfb7KoBCKz1pc4gfh8k0UlEJm1vsQJxOebLCqByKz1JU4gPt9kUQlEZq0vcQLx+SaLSiAya32JE4jPN1lUApFZ60ucQHy+yaISiMxaX+IE4vNNFvUJg2N/ZcpH6BUAAAAASUVORK5CYII=)';
        // button.style.backgroundPosition = 'center';
        // button.style.backgroundRepeat = 'no-repeat';
        // button.style.backgroundSize = '60%';
        button.style.backgroundColor = 'transparent';
        button.id = 'dropdownMenuButton';
        button.type = 'button';
        button.setAttribute("data-toggle", "dropdown");
        button.setAttribute("aria-haspopup", true);
        button.setAttribute("aria-expanded", false);
        var divButoon =document.createElement('div');

        divButoon.className = 'dropdown-menu';
        divButoon.setAttribute("aria-labelledby", 'dropdownMenuButton');
        var a1 = document.createElement('a');
        a1.href = 'javascript:;';
        a1.className = 'btn btn-secondary dropdown-item';
        var i1 = document.createElement('i');
        i1.className = 'fa fa-columns';
        i1.innerHTML = "    Opacity";
        i1.style.marginRight = '10px';
        a1.appendChild(i1);
        var label1 = document.createElement('label');
        label1.className = 'switch';
        const checkBox1 = document.createElement('input');
        checkBox1.setAttribute('type', 'checkbox');
        checkBox1.id = layerId + '_opacity_check';
        checkBox1.style.marginRight = '1rem';
        checkBox1.style.height = '1.2rem';
        checkBox1.style.width = '1.2rem';
        checkBox1.addEventListener('change', (event) => {
            var dom = document.getElementById(layerId + '_opacity');
            dom.style.display = dom.style.display == 'none' ? 'flex' : 'none';
            checkBox1.checked = dom.style.display == 'none' ? false : true;
        });
        var span1 = document.createElement('span');
        span1.className = 'slider round';
        label1.appendChild(checkBox1);
        label1.appendChild(span1);
        a1.appendChild(label1);
        a1.addEventListener("click", function(){
            var dom = document.getElementById(layerId + '_opacity');
            dom.style.display = dom.style.display == 'none' ? 'flex' : 'none';
            var domCheckBox = document.getElementById(layerId + '_opacity_check');
            domCheckBox.checked = dom.style.display == 'none' ? false : true;
        });
        var a2 = document.createElement('a');
        a2.href = 'javascript:;'
        a2.className = 'btn btn-secondary dropdown-item';
        var i2 = document.createElement('i');
        i2.className = 'fa fa-location-arrow';
        i2.innerHTML = "    Fit bounds";
        a2.appendChild(i2); 
        a2.addEventListener("click", function(){
           if(me._map.getSource(layerId) && me._map.getSource(layerId).bounds){
               var bounds = me._map.getSource(layerId).bounds;
               var bbox = [[bounds[0],bounds[1]],[bounds[2],bounds[3]]];
               me._map.fitBounds(bbox)
           }
        });
        divButoon.appendChild(a1);
        divButoon.appendChild(a2);
        divDropdown.appendChild(button);
        divDropdown.appendChild(divButoon);
        var divLayerName = document.createElement('div');
        divLayerName.className = 'col';
        divLayerName.style.padding  = '0px 0px 0px 0px';
        const layerName = document.createElement('strong');
            layerName.appendChild(document.createTextNode(layerId));
            divLayerName.appendChild(layerName);
        var divCount = document.createElement('div');
        divCount.style.height = '70px';
        divCount.style.alignItems = 'center';
        divCount.style.borderBottom = '1px dashed #cccccc';
        divCount.className="row";
        divCount.style.display = 'flex';
        var divInput = document.createElement('div');
        divInput.className="col";
        divInput.style.padding  = '10px 10px 10px 10px';

        if (leg && layer.metadata.name == leg.layerName) {
            var img = document.createElement("img");
            img.width = 20;
            img.height = 20;
            img.style.display = 'block';
            img.style.margin = '0px 5px 0px 0px';
            img.src = "data:image/png;base64," + leg.legend[0].imageData;
            divInput.appendChild(img);
        }

        var divOpacity = document.createElement('div');
        divOpacity.style.display = 'none';
        divOpacity.id = layerId + '_opacity';
        var labelOpacity = document.createElement('label');
        labelOpacity.style.marginRight = '0.5rem';
        labelOpacity.style.fontWeight = '500';
        labelOpacity.innerHTML = "Opacity: ";
        divOpacity.appendChild(labelOpacity)
        me._rangeControlAdd(layerId, divOpacity);
        divSwitch.appendChild(divLayerName);
        divSwitch.appendChild(divDropdown);
        divInput.appendChild(divSwitch);
        divInput.appendChild(divOpacity);
        divCount.appendChild(divMore);
        divCount.appendChild(divInput);
        // if (me._opacityControlOption) 
        //     me._rangeControlAdd(layerId, divCount);
        div.appendChild(divCount);
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

mapboxgl.ekmap.control.TreeLayerPreview = TreeLayerPreview;