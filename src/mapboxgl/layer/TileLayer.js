import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.TileLayer
 * @classdesc The TileLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @extends {mapboxgl.Evented}
 */
export class TileLayer extends mapboxgl.Evented {

    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? Util.getParamString(options.requestParams) : '');
                this.service = new mapboxgl.ekmap.MapService(options);
            }
            if (options.urls)
                this.tileUrls = options.urls
            if (this.options.token) {
                this.tileUrl += ('?token=' + this.options.token);
            }
        }
    }

    /**
     * @function mapboxgl.ekmap.TileLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var nameID = 'raster-tiles';
        var id = Math.round(Math.random() * 100);
        if (this.tileUrl) {
            map.addSource(nameID + id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": [this.tileUrl],
                "tileSize": 256
            });
            map.addLayer({
                "id": nameID + id,
                "type": "raster",
                "source": nameID + id,
                "minzoom": 0,
                "maxzoom": 22,
                'layout': {
                    'visibility': 'visible'
                },
                'metadata': {
                    'type': 'overlayer',
                    'url': this.options.url,
                    'token': this.options.token ? this.options.token : ""
                }
            })
        }

        if (this.tileUrls) {
            map.addSource(nameID + id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": this.tileUrls,
                "tileSize": 256
            });
            map.addLayer({
                "id": nameID + id,
                "type": "raster",
                "source": nameID + id,
                "minzoom": 0,
                "maxzoom": 22,
                'layout': {
                    'visibility': 'visible'
                },
                'metadata': {
                    'type': 'overlayer',
                    'url': ''
                }
            })
        }
        return this;
    }
}

mapboxgl.ekmap.TileLayer = TileLayer;