import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.TileLayer
 * @classdesc The TileLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.id Id of layer and source.
 * @param {string} options.name Name of layer.
 * @param {string} options.visibility=visible show or hide layer.
 * 
 * 
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
                if (options.token) {
                    this.tileUrl += ('?token=' + options.token);
                }
                this.service = new mapboxgl.ekmap.MapService(options);
            }
            if (options.urls) {
                this.tileUrls = [];
                var urls = options.urls
                if (!options.token)
                    this.tileUrls = urls
                else {
                    urls.forEach(url => {
                        url += "?apikey=" + options.token;
                        this.tileUrls.push(url);
                    })
                }
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
        var nameID = 'raster-tiles' + guid12();
        if (this.options.id)
            var id = this.options.id;
        else
            var id = nameID;
        if (this.tileUrl) {
            map.addSource(id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": [this.tileUrl],
                "tileSize": 256
            });
            map.addLayer({
                "id": id,
                "type": "raster",
                "source": id,
                "minzoom": 0,
                "maxzoom": 22,
                'layout': {
                    'visibility': this.options.visibility ? this.options.visibility : 'visible'
                },
                'metadata': {
                    'type': 'baselayer',
                    'name': this.options.name,
                    'url': this.options.url,
                    'image': this.options.image,
                    'token': this.options.token ? this.options.token : "",
                }
            })
        }

        if (this.tileUrls) {
            map.addSource(id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": this.tileUrls,
                "tileSize": 256
            });
            map.addLayer({
                "id": id,
                "type": "raster",
                "source": id,
                "minzoom": 0,
                "maxzoom": 22,
                'layout': {
                    'visibility': this.options.visibility ? this.options.visibility : 'visible'
                },
                'metadata': {
                    'type': 'baselayer',
                    'name': this.options.name,
                    'image': this.options.image,
                    'url': ''
                }
            })
        }
        return this;
    }
}

mapboxgl.ekmap.TileLayer = TileLayer;