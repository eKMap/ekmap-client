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
 * @param {string} options.id Id of source and layer.
 * @param {mapboxgl.LngLatBounds} option.bounds Default the geographical bounds of the map.
 * @param {string} options.projection=4326 Will use this token to authenticate all calls to the service.
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
        var nameID = 'image-layer' + guid12();
        if (this.options.id)
            this.id = this.options.id;
        else
            this.id = nameID;

        if (this.options.bounds) {
            var bounds = this.options.bounds;
            map.addSource(this.id, {
                type: 'image',
                url: me.url,
                coordinates: [
                    [bounds.getSouthWest().lng, bounds.getNorthEast().lat],
                    [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                    [bounds.getNorthEast().lng, bounds.getSouthWest().lat],
                    [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
                ]
            });
            map.addLayer({
                'id': this.id,
                'type': 'raster',
                'source': this.id,
                'paint': {
                    'raster-fade-duration': 0
                }
            });
        } else {
            throw "Error: bounds: array length 4 expected, length 2 found";
        }


        return me;
    }

    /**
     * @function mapboxgl.ekmap.ThemeMapLayer.prototype.setCoordinates
     * @description Sets the image's bounds and re-renders the map.
     * @param {Array<Array<number>>} option.coordinates Four geographical coordinates, represented as arrays of longitude and latitude numbers, which define the corners of the image. The coordinates start at the top left corner of the image and proceed in clockwise order. They do not have to represent a rectangle.
     * @returns this
     */
    setCoordinates(coordinates) {
        var mySource = this.map.getSource(this.id);
        if (mySource)
            mySource.setCoordinates(coordinates);
    }
}

mapboxgl.ekmap.ThemeMapLayer = ThemeMapLayer;