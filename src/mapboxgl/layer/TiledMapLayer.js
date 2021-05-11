import { Util } from '../core/Util';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.TiledMapLayer
 * @classdesc The TiledMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.
 * @param {string} options.id Id of layer and source.
 * @extends {mapboxgl.Evented}
 */
export class TiledMapLayer extends mapboxgl.Evented {

    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            // set the urls
            if (options.url) {
                options = Util.getUrlParams(options);
                this.tileUrl = (options.proxy ? options.proxy + '?' : '') + options.url + 'tile/{z}/{y}/{x}' + (options.requestParams && Object.keys(options.requestParams).length > 0 ? Util.getParamString(options.requestParams) : '');
                //if (options.url.indexOf('{s}') !== -1 && options.subdomains && options.url)
                //    options.url = options.url.replace('{s}', options.subdomains[0]);

                this.service = new mapboxgl.ekmap.MapService(options);
            }
            this.identifies = this.service.identify();
            if (options.urls)
                this.tileUrls = options.urls
                // Remove subdomain in url
                // https://github.com/Esri/esri-leaflet/issues/991
                //this.service.addEventParent(this);
                //var arcgisonline = new RegExp(/tiles.arcgis(online)?\.com/g);
                //if (arcgisonline.test(options.url)) {
                //    this.tileUrl = this.tileUrl.replace('://tiles', '://tiles{s}');
                //    options.subdomains = ['1', '2', '3', '4'];
                //}
            if (this.options.token) {
                this.tileUrl += '?token=' + this.options.token;
            }
            //return new mapboxgl.ekmap.MapService(this.tileUrl);
            // init layer by calling TileLayers initialize method
            //TileLayer.prototype.initialize.call(this, this.tileUrl, options);
        }
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var nameID = 'raster-tiles' + guid12();
        if (this.options.id)
            this.id = this.options.id;
        else
            this.id = nameID;
        if (this.options) {
            if (this.tileUrl) {
                map.addSource(this.id, {
                    "attribution": this.options.attribution ? this.options.attribution : '',
                    "type": "raster",
                    "tiles": [this.tileUrl],
                    "tileSize": 256
                });
                map.addLayer({
                    "id": this.id,
                    "type": "raster",
                    "source": this.id,
                    "minzoom": 0,
                    "maxzoom": 22,
                    'layout': {
                        'visibility': 'visible'
                    },
                    'metadata': {
                        'type': 'overlayer',
                        'url': this.options.url,
                        'token': this.options.token ? this.options.token : "",
                    }
                })
            }

            if (this.tileUrls) {
                map.addSource(this.id, {
                    "attribution": this.options.attribution ? this.options.attribution : '',
                    "type": "raster",
                    "tiles": this.tileUrls,
                    "tileSize": 256
                });
                map.addLayer({
                    "id": this.id,
                    "type": "raster",
                    "source": this.id,
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
        } else {

        }
        return window.map.getLayer(this.id);
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.setUrls
     * @description Updates the layer's URL template and redraws it.
     * @returns this
     */
    setUrls(url, token) {
        var source = window.map.getSource(this.id);
        if (typeof(url) == 'string') {
            this.options = Util.getUrlParams(this.options);
            this.tileUrl = (this.options.proxy ? this.options.proxy + '?' : '') + url + '/tile/{z}/{y}/{x}' + '?token=' + token;
            //  (this.options.requestParams && Object.keys(this.options.requestParams).length > 0 ? Util.getParamString(this.options.requestParams) : '');
            window.map.removeLayer(this.id);
            window.map.removeSource(this.id);
            map.addSource(this.id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": [this.tileUrl],
                "tileSize": 256
            });
            map.addLayer({
                "id": this.id,
                "type": "raster",
                "source": this.id,
                "minzoom": 0,
                "maxzoom": 22,
                'layout': {
                    'visibility': 'visible'
                },
                'metadata': {
                    'type': 'overlayer',
                    'url': url,
                    'token': token ? token : "",
                }
            })
        } else {
            this.tileUrls = url;
            source.tiles = [this.tileUrls];
        }
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.identity
     * @description Returns a new mapboxgl.ekmap.IdentifyFeatures object that can be used to identify features on this layer. Your callback function will be passed a GeoJSON FeatureCollection with the results or an error.
     * @returns this
     */
    identify() {
        return this.identifies;
    }



    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.find
     * @description Adds the layer to the given map or layer group.
     * @param {Object} params - Adds the layer to the given map or layer group.
     * @param {RequestCallback} callback 
     */
    find(params, callback, context) {
        return this.service.find(params, callback, context);
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    legend(callback, context) {
        return this.service.legend(callback, context);
    }
}

mapboxgl.ekmap.TiledMapLayer = TiledMapLayer;