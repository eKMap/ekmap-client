import { Util } from '../core/Util';
import L, { map } from 'leaflet';
import { Layer } from 'leaflet';
/**
 * @class ol.ekmap.ImageMapLayer
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
     * @function ol.ekmap.ImageMapLayer.prototype.addTo
     * @description Adds the layer to the given map or layer group.
     * @param {ol.Map} map - Adds the layer to the given map or layer group.
     * @returns this
     */
    addTo(map) {
        var me = this;
        this.service.getExtent(function(extend) {
            var pointMin = L.Projection.SphericalMercator.unproject(L.point(extend.xmin, extend.ymin));
            var pointMax = L.Projection.SphericalMercator.unproject(L.point(extend.xmax, extend.ymax));
            extend = [pointMin.lng, pointMin.lat, pointMax.lng, pointMax.lat]
            var bound = [
                [pointMin.lat, pointMin.lng],
                [pointMax.lat, pointMax.lng]
            ]
            me.extend = extend;
            var size = [];
            size.push(map.getSize().x)
            size.push(map.getSize().y)
            var param = {
                bbox: extend,
                layers: 'show',
                format: 'png32',
                dpi: 96,
                transparent: true,
                f: 'image',
                bboxSR: '4326',
                size: size,
            };
            me.url += 'export?' + Util.serialize(param);
            if (me.options.token) {
                me.url += ('&token=' + me.options.token);
            }
            me.layer = L.imageOverlay(me.url, bound).addTo(map);
            map.fitBounds(bound);
            map.on('moveend', function() {
                var bbox = [map.getBounds()._southWest.lng, map.getBounds()._southWest.lat, map.getBounds()._northEast.lng, map.getBounds()._northEast.lat];
                var nowBounds = [
                    [map.getBounds()._southWest.lat, map.getBounds()._southWest.lng],
                    [map.getBounds()._northEast.lat, map.getBounds()._northEast.lng]
                ];
                var size = [];
                size.push(map.getSize().x)
                size.push(map.getSize().y)
                var param = {
                    bbox: bbox,
                    layers: 'show',
                    format: 'png32',
                    dpi: 96,
                    transparent: true,
                    f: 'image',
                    bboxSR: '4326',
                    size: size,
                };
                // console.log(this.bound.intersects(nowBounds))
                var url = me.options.url;
                url += 'export?' + Util.serialize(param);
                me.layer.setUrl(url);
                me.layer.setBounds(nowBounds)
            })
        })
        return me;
    }
}

L.ekmap.ImageMapLayer = ImageMapLayer;