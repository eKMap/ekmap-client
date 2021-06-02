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
 * @param {Array} options.bounds=[-180,-85.051129,180,85.051129] An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following <br> order: [sw.lng, sw.lat, ne.lng, ne.lat]. When this property is included in a source, no tiles outside of the given bounds are requested<br> by Mapbox GL.
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
            }
            this.service = new mapboxgl.ekmap.MapService(options);
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
        this.map = null;
        this.layer = null;
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        this.map = map;
        if (me.options.id)
            me.id = me.options.id;
        else {
            me.id = 'raster-tiles' + guid12();
        }
        if (this.options.bounds) {
            if (me.tileUrl) {
                map.addSource(me.id, {
                    "attribution": me.options.attribution ? me.options.attribution : '',
                    "type": "raster",
                    "tiles": [me.tileUrl],
                    "tileSize": 256,
                    "bounds": me.options.bounds
                });
                map.addLayer({
                    "id": me.id,
                    "type": "raster",
                    "source": me.id,
                    "minzoom": 0,
                    "maxzoom": 22,
                    'layout': {
                        'visibility': 'visible'
                    },
                    'metadata': {
                        'type': 'overlayer',
                        'url': me.options.url,
                        'token': me.options.token ? me.options.token : "",
                    }
                })
            }
            if (me.tileUrls) {
                map.addSource(me.id, {
                    "attribution": me.options.attribution ? me.options.attribution : '',
                    "type": "raster",
                    "tiles": me.tileUrls,
                    "tileSize": 256,
                    "bounds": me.options.bounds
                });
                map.addLayer({
                    "id": me.id,
                    "type": "raster",
                    "source": me.id,
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
            me.layer = map.getLayer(me.id);
        } else {
            this.getExtent(function(obj) {
                var bounds = [];
                if (obj)
                    bounds = [obj.xmin, obj.ymin, obj.xmax, obj.ymax];
                //Có bbox
                if (bounds.length > 0) {
                    if (me.tileUrl) {
                        map.addSource(me.id, {
                            "attribution": me.options.attribution ? me.options.attribution : '',
                            "type": "raster",
                            "tiles": [me.tileUrl],
                            "tileSize": 256,
                            "bounds": bounds
                        });
                        map.addLayer({
                            "id": me.id,
                            "type": "raster",
                            "source": me.id,
                            "minzoom": 0,
                            "maxzoom": 22,
                            'layout': {
                                'visibility': 'visible'
                            },
                            'metadata': {
                                'type': 'overlayer',
                                'url': me.options.url,
                                'token': me.options.token ? me.options.token : "",
                            }
                        })
                    }
                    if (me.tileUrls) {
                        map.addSource(me.id, {
                            "attribution": me.options.attribution ? me.options.attribution : '',
                            "type": "raster",
                            "tiles": me.tileUrls,
                            "tileSize": 256,
                            "bounds": bounds
                        });
                        map.addLayer({
                            "id": me.id,
                            "type": "raster",
                            "source": me.id,
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
                    if (me.tileUrl) {
                        map.addSource(me.id, {
                            "attribution": me.options.attribution ? me.options.attribution : '',
                            "type": "raster",
                            "tiles": [me.tileUrl],
                            "tileSize": 256
                        });
                        map.addLayer({
                            "id": me.id,
                            "type": "raster",
                            "source": me.id,
                            "minzoom": 0,
                            "maxzoom": 22,
                            'layout': {
                                'visibility': 'visible'
                            },
                            'metadata': {
                                'type': 'overlayer',
                                'url': me.options.url,
                                'token': me.options.token ? me.options.token : "",
                            }
                        })
                    }
                    if (me.tileUrls) {
                        map.addSource(me.id, {
                            "attribution": me.options.attribution ? me.options.attribution : '',
                            "type": "raster",
                            "tiles": me.tileUrls,
                            "tileSize": 256
                        });
                        map.addLayer({
                            "id": me.id,
                            "type": "raster",
                            "source": me.id,
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
                }
                me.layer = map.getLayer(me.id);
            })
        }
        return me;
    }

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.removeFromMap
     * @description Removes the layer and source with the given ID from the map's style.If not user layer.addTo, an error event is fired.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    removeFromMap() {
            if (this.map.getLayer(this.id)) {
                this.map.removeLayer(this.id);
                this.map.removeSource(this.id);
            } else {
                throw "Error: The layer '" + this.id + "' does not exist in the map's style and cannot be removed.";
            }
        }
        /**
         * @function mapboxgl.ekmap.TiledMapLayer.prototype.setUrls
         * @description Updates the layer's URL template and redraws it.
         * @returns this
         */
    setUrls(url, token) {
        var source = this.map.getSource(this.id);
        if (typeof(url) == 'string') {
            this.options = Util.getUrlParams(this.options);
            this.tileUrl = (this.options.proxy ? this.options.proxy + '?' : '') + url + '/tile/{z}/{y}/{x}' + '?token=' + token;
            //  (this.options.requestParams && Object.keys(this.options.requestParams).length > 0 ? Util.getParamString(this.options.requestParams) : '');
            this.map.removeLayer(this.id);
            this.map.removeSource(this.id);
            this.map.addSource(this.id, {
                "attribution": this.options.attribution ? this.options.attribution : '',
                "type": "raster",
                "tiles": [this.tileUrl],
                "tileSize": 256
            });
            this.map.addLayer({
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

    /**
     * @function mapboxgl.ekmap.TiledMapLayer.prototype.legend
     * @description legend of Tiled Map Layer.
     * @param {RequestCallback} callback
     *
     */
    getExtent(callback, context) {
        return this.service.getExtent(callback, context);
    }


}

mapboxgl.ekmap.TiledMapLayer = TiledMapLayer;