import { Util } from '../core/Util';
import L, { map, point } from 'leaflet';
import { Layer, LatLngBounds } from 'leaflet';
/**
 * @class ol.ekmap.ImageMapLayert
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
            this.projection = this.options.projection != undefined ? this.options.projection : 4326;
            if (this.projection == 4326)
                this.proj = 'EPSG:4326'
            else
                this.proj = 'EPSG:3857'
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
            if (me.projection == 4326) {
                var pointMin = L.Projection.SphericalMercator.unproject(L.point(extend.xmin, extend.ymin));
                var pointMax = L.Projection.SphericalMercator.unproject(L.point(extend.xmax, extend.ymax));
                extend = [pointMin.lng, pointMin.lat, pointMax.lng, pointMax.lat];
                var bound = [
                    [pointMin.lat, pointMin.lng],
                    [pointMax.lat, pointMax.lng]
                ];
            }
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
                bboxSR: me.projection,
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
                var bounds = map.getBounds();
                var newBounds = [
                    [bounds._southWest.lat, bounds._southWest.lng],
                    [bounds._northEast.lat, bounds._northEast.lng]
                ];
                var bbox = [bounds._southWest.lng, bounds._southWest.lat, bounds._northEast.lng, bounds._northEast.lat];
                var arrSize = [];
                arrSize.push(map.getSize().x);
                arrSize.push(map.getSize().y);
                var params = {
                    bbox: bbox,
                    layers: 'show:' + arr.toString(),
                    format: 'png32',
                    dpi: 96,
                    transparent: true,
                    f: 'image',
                    bboxSR: me.projection,
                    size: arrSize
                };
                if (L.latLngBounds(newBounds).intersects(bound) == true) {
                    var url = me.options.url;
                    url += 'export?' + Util.serialize(params);
                    me.layer.setUrl(url);
                }
            })
        })
        return me;
    }

}

L.ekmap.ImageMapLayer = ImageMapLayer;
L.ekmap.LatLngBounds = LatLngBounds;