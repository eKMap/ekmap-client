import { Util } from '../core/Util';
import L from 'leaflet';
import vectorTileLayer from 'leaflet-vector-tile-layer';
import convertStyle from '../../../dist/stylefunction'

export class VectorTiledMapLayer{
    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (options.url) {
                options = Util.getUrlParams(options);
                this.url = Util.cleanUrl(options.url)
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + this.url + 'tile/{z}/{y}/{x}.pbf';
                this.styleUrl = this.url + 'resources/styles'
            }
            if (options.token) {
                this.tileUrl += ('?token=' + this.options.token);
                this.styleUrl += ('?token=' + this.options.token);
            }
        }
        // this.map = '';
        // this.arr = [];
        // this.name = [];
        // this.objectLayer = {};
        // this.layerPointLine = [];
        // this.featuresCheck = '';
        // this.layer = null;
        // this.urlFeatureService = options.url.replace("VectorTileServer", "FeatureServer")
        // this.urlMapService = options.url.replace("VectorTileServer", "MapServer")
    }

    /**
     * @function ol.ekmap.VectorTiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        const tileLayer = vectorTileLayer(this.tileUrl, {
            eachFeatureLayer: function(feature,layer){
                var label = L.marker(layer.getBounds().getCenter(), {
                    icon: L.divIcon({
                      className: 'label',
                      html: feature.properties.ten_tinh,
                      iconSize: [100, 40]
                    })
                  }).addTo(map);
            }
        });
        fetch(this.styleUrl)
        .then(r => r.json())
        .then((glStyle) => {
      convertStyle(tileLayer,glStyle,'145')
      tileLayer.addTo(map);
    }) 
        return this;
    }
}

L.ekmap.VectorTiledMapLayer = VectorTiledMapLayer;