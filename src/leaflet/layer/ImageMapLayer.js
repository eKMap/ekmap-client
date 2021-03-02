import { Util } from '../core/Util';
import L from 'leaflet';
import { Layer } from 'leaflet';

/**
 * @class L.ekmap.ImageMapLayert
 * @classdesc The ImageMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * 
 * 
 * @extends {Layer}
 */
export class ImageMapLayer extends Layer {
    constructor(options) {
        super();
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);

            this.options = Util.getUrlParams(options);
            if (this.options.url)
                this.url = this.options.url;
            this.service = new L.ekmap.MapService(this.options);
            this.layer = null;
            this.listIndex = null;
        }
    }

    /**
     * @function L.ekmap.ImageMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        this.service.getExtent(function(extend) {
            var meters2degress = function(x, y) {
                var lon = x * 180 / 20037508.34;
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
                return [lon, lat]
            }
            var pointMin = meters2degress(extend.xmin, extend.ymin);
            var pointMax = meters2degress(extend.xmax, extend.ymax);
            var extend = [pointMin[0], pointMin[1], pointMax[0], pointMax[1]];
            var bound = [
                [pointMin[1], pointMin[0]],
                [pointMax[1], pointMax[0]]
            ];
            var size = [];
            size.push(map.getSize().x);
            size.push(map.getSize().y);
            var param = {
                bbox: extend,
                layers: 'show',
                format: 'png32',
                dpi: 96,
                transparent: true,
                bboxSR: '4326',
                f: 'image',
                size: size,
            };
            me.url += 'export?' + Util.serialize(param);
            if (me.options.token) {
                me.url += ('&token=' + me.options.token);
            }
            me.layer = L.imageOverlay(me.url, bound).addTo(map);
            map.fitBounds(bound);
            map.on('moveend', function() {
                var arr = [];
                arr.push(me.listIndex);
                var newBounds = [
                    [map.getBounds()._southWest.lat, map.getBounds()._southWest.lng],
                    [map.getBounds()._northEast.lat, map.getBounds()._northEast.lng]
                ];
                var bbox = [map.getBounds()._southWest.lng, map.getBounds()._southWest.lat, map.getBounds()._northEast.lng, map.getBounds()._northEast.lat];
                var arrSize = [];
                arrSize.push(map.getSize().x);
                arrSize.push(map.getSize().y);
                var params = {
                    bbox: bbox,
                    layers: 'show:' + arr.toString(),
                    format: 'png32',
                    dpi: 96,
                    transparent: true,
                    bboxSR: '4326',
                    f: 'image',
                    size: arrSize
                };
                if (L.latLngBounds(newBounds).intersects(bound) == true) {
                    var url = me.options.url;
                    url += 'export?' + Util.serialize(params);
                    me.layer.setUrl(url);
                    me.layer.setBounds(newBounds);
                }
            })
        })
        return me;
    }

}

L.ekmap.ImageMapLayer = ImageMapLayer;