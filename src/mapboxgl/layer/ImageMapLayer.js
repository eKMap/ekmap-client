import { Util } from '../core/Util';
import * as turf from '@turf/turf'
/**
 * @class mapboxgl.ekmap.ImageMapLayer
 * @classdesc The ImageMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.projection=4326 Will use this token to authenticate all calls to the service.
 * 
 * 
 * @extends {mapboxgl.Evented}
 */
export class ImageMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);

            this.options = Util.getUrlParams(options);
            if (this.options.url)
                this.url = this.options.url;
            this.service = new mapboxgl.ekmap.MapService(this.options);
            this.layer = null;
            this.id = null;
            this.listIndex = null;
        }
    }

    /**
     * @function mapboxgl.ekmap.ImageMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {mapboxgl.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        var nameID = 'image-layer' + guid12();
        if (this.options.id)
            this.id = this.options.id;
        else
            this.id = nameID;
        var bounds = map.getBounds();
        var bbox = [bounds.getSouthWest().lng, bounds.getSouthWest().lat, bounds.getNorthEast().lng, bounds.getNorthEast().lat]
        var arrSize = [];
        arrSize.push(map.getCanvas().width);
        arrSize.push(map.getCanvas().height);
        var param = {
            bbox: bbox,
            layers: '',
            format: 'png32',
            dpi: 96,
            transparent: true,
            f: 'image',
            bboxSR: '4326',
            size: arrSize
        };
        me.url += 'export?' + Util.serialize(param);
        if (me.options.token) {
            me.url += ('&token=' + me.options.token);
        }
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

        map.on('moveend', function() {
            var url = me.options.url;
            var bounds = map.getBounds();
            var bbox = [bounds.getSouthWest().lng, bounds.getSouthWest().lat, bounds.getNorthEast().lng, bounds.getNorthEast().lat]
            var arrSi = [];
            arrSi.push(map.getCanvas().width);
            arrSi.push(map.getCanvas().height);
            var param = {
                bbox: bbox,
                layers: '',
                format: 'png32',
                dpi: 96,
                transparent: true,
                f: 'image',
                bboxSR: '4326',
                size: arrSi
            };
            url += 'export?' + Util.serialize(param);
            if (me.options.token)
                url += '&token=' + me.options.token;
            map.getSource(this.id).updateImage({
                url: url,
                coordinates: [
                    [bounds.getSouthWest().lng, bounds.getNorthEast().lat],
                    [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                    [bounds.getNorthEast().lng, bounds.getSouthWest().lat],
                    [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
                ]
            })
        })
        return me;
    }
}

mapboxgl.ekmap.ImageMapLayer = ImageMapLayer;