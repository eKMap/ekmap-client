import { Util } from '../core/Util';
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl';
/**
 * @class mapboxgl.ekmap.ThemeMapLayer
 * @classdesc The ThemeMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * 
 * 
 * @extends {mapboxgl.Evented}
 */
export class ThemeMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);
            if (this.options.url)
                this.url = this.options.url;
        }
        this.map = null;
        this.id = null;
    }

    /**
     * @function mapboxgl.ekmap.ThemeMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        this.map = map;
        return me;
    }

    /**
     * @function mapboxgl.ekmap.ThemeMapLayer.prototype.addFeatures
     * @description Abstract method, instantiable subclass must implement this method. Add data to the theme map layer.
     * @param {GeoJSONObject | Array<Object>} data Elements to be added.
     */
    addFeatures(data){
        if (this.map){
            var features
            if (data.length && data.length > 0) {
                features = data;
            }else
                features = data.features;
            for(var i = 0; i < features.length; i ++){
                var lng = features[i].properties.longtitude;
                var lat = features[i].properties.latitude;
                var sw = new mapboxgl.LngLat(lng - 0.2, lat - 0.2);
                var ne = new mapboxgl.LngLat(lng + 0.2, lat + 0.2);
                var bounds = new mapboxgl.LngLatBounds(sw, ne);
                var id = 'image_' + guid12();
                map.addSource(id, {
                    type: 'image',
                    url: features[i].properties.chartUrl,
                    coordinates: [
                        [bounds.getSouthWest().lng, bounds.getNorthEast().lat],
                        [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                        [bounds.getNorthEast().lng, bounds.getSouthWest().lat],
                        [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
                    ]
                });
                map.addLayer({
                    'id': id,
                    'type': 'raster',
                    'source': id,
                    'paint': {
                        'raster-fade-duration': 0
                    }
                });
            }
        }else {
            throw "Error: ThemeMapLayer not yet added to the map.";
        }
    }
}

mapboxgl.ekmap.ThemeMapLayer = ThemeMapLayer;