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
        this.service.getExtent(function(extend) {
            var id = 'image-layer';
            var bounds = map.getBounds();
            var bbox = [bounds.getSouthWest().lng, bounds.getSouthWest().lat, bounds.getNorthEast().lng, bounds.getNorthEast().lat]
            var bbox1 = [extend.xmin, extend.ymin, extend.xmax, extend.ymax]
            var poly = turf.bboxPolygon(bbox1);
            var coordinates1 = [];
            var meters2degress = function(x, y) {
                var lon = x * 180 / 20037508.34;
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
                return [lon, lat]
            }
            coordinates1 = poly.geometry.coordinates[0];
            var polygon1 = turf.polygon([
                [
                    meters2degress(coordinates1[0][0], coordinates1[0][1]),
                    meters2degress(coordinates1[1][0], coordinates1[1][1]),
                    meters2degress(coordinates1[2][0], coordinates1[2][1]),
                    meters2degress(coordinates1[3][0], coordinates1[3][1]),
                    meters2degress(coordinates1[4][0], coordinates1[4][1])
                ]
            ])
            var arrSize = [];
            arrSize.push(map.getCanvas().width);
            arrSize.push(map.getCanvas().height);
            var param = {
                bbox: bbox,
                layers: 'show',
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
            map.addSource(id, {
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
                'id': id,
                'type': 'raster',
                'source': id,
                'paint': {
                    'raster-fade-duration': 0
                }
            });
            map.on('moveend', function() {
                var arr = [];
                arr.push(me.listIndex);
                var url = me.options.url;
                var bounds = map.getBounds();
                var bbox1 = [bounds.getSouthWest().lng, bounds.getSouthWest().lat, bounds.getNorthEast().lng, bounds.getNorthEast().lat]
                var arrSi = [];
                arrSi.push(map.getCanvas().width);
                arrSi.push(map.getCanvas().height);
                var param = {
                    bbox: bbox1,
                    layers: 'show:' + arr.toString(),
                    format: 'png32',
                    dpi: 96,
                    transparent: true,
                    f: 'image',
                    bboxSR: '4326',
                    size: arrSi
                };
                var poly1 = turf.bboxPolygon(bbox1);
                var coordinates2 = [];
                coordinates2 = poly1.geometry.coordinates[0];
                var polygon2 = turf.polygon([
                    [
                        coordinates2[0],
                        coordinates2[1],
                        coordinates2[2],
                        coordinates2[3],
                        coordinates2[4],
                    ]
                ])
                if (turf.intersect(polygon1, polygon2) != null) {
                    url += 'export?' + Util.serialize(param);
                    map.getSource(id).updateImage({
                        url: url,
                        coordinates: [
                            [bounds.getSouthWest().lng, bounds.getNorthEast().lat],
                            [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
                            [bounds.getNorthEast().lng, bounds.getSouthWest().lat],
                            [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
                        ]
                    })
                }

            })
        })
        return me;
    }
}

mapboxgl.ekmap.ImageMapLayer = ImageMapLayer;