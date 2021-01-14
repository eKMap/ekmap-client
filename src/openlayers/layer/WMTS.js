import { Util } from '../core/Util';
import Observable from 'ol/Observable';

/**
 * @class ol.ekmap.WMTS
 * @classdesc The WMTS class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url WMTS service URL.
 * @param {string} options.params WMTS request parameters. At least a LAYERS param is required. STYLES is '' by default. VERSION is 1.3.0 by default. WIDTH, HEIGHT, BBOX and CRS (SRS for WMTS version < <br> 1.3.0) will be set dynamically.
 * @param {string} options.attribution Attributions.
 * @param {string} options.id Id of layer and source.
 * @extends {ol.Observable}
 */
export class WMTS extends Observable {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            this.url = Util.cleanUrl(this.options.url);
            this.params = this.options.params
            this.nodeChild = -1;
        }
    }

    /**
     * @function ol.ekmap.WMTS.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        this.data = '';
        fetch(this.url + 'data/WMTSCapabilities.xml')
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                var parser = new ol.format.WMTSCapabilities();
                var result = parser.read(text);
                var layer = result.Contents.Layer[0].Identifier;
                me.data = ol.source.WMTS.optionsFromCapabilities(result, {
                    layer: layer,
                    matrixSet: 'EPSG:3857',
                });
                me.data.crossOrigin = "Anonymous";
                var layer = new ol.layer.Tile({
                    source: new ol.source.WMTS(me.data),
                });
                map.addLayer(layer);
            });
        return this;
    }

    /**
     * @function ol.ekmap.WMTS.prototype.getLayers
     * @description Tree layers.
     */
    getLayers() {
        var me = this;
        me.files = []
        me.file = [{
            "data": {
                "name": "",
                "id": ""
            },
            "children": []
        }];
        fetch(this.url + '?request=GetCapabilities&service=WMTS')
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                var parser = new ol.format.WMTSCapabilities();
                var result = parser.read(text);
                var layers = result.Capability.Layer;
                me.file[0].data.name = layers.Title;
                var arr = layers.Layer;
                for (var i = 0; i < arr.length; i++) {
                    me.getChildren(arr[i], i)
                }
            });
        return me.file;
    }

    getChildren(arr, i) {
        if (this.nodeChild == -1)
            this.file[0].children.push({
                "data": {
                    "name": arr.Title,
                    "id": arr.Name
                },
                "children": []
            })
        else
            this.file[0].children[this.nodeChild].children.push({
                "data": {
                    "name": arr.Title,
                    "id": arr.Name
                },
                "children": []
            })
        if (arr.Layer) {
            this.nodeChild = i;
            for (var z = 0; z < arr.Layer.length; z++)
                this.getChildren(arr.Layer[z], z)
        } else {
            this.nodeChild = -1;
        }
    }
}