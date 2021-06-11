import { Util } from '../core/Util';
import { intersects } from 'ol/extent';
/**
 * @class ol.ekmap.ImageMapLayer
 * @classdesc The ImageMapLayer class.
 * @category  Layer
 * @param {Object} options Construction parameters.
 * @param {string} options.url Required: URL of the {@link https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm|Map Service} with a tile cache.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.projection=4326 Will use this token to authenticate all calls to the service.
 * 
 * 
 * @extends {ol.Evented}
 */
export class ImageMapLayer {

    constructor(options) {
        this.options = options ? options : {};
        if (options) {
            options = Util.setOptions(this, options);

            this.options = Util.getUrlParams(options);
            if (this.options.url)
                this.url = this.options.url;
            this.service = new ol.ekmap.MapService(this.options);
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
            extend = [extend.xmin, extend.ymin, extend.xmax, extend.ymax];
            var param = {
                bbox: extend,
                layers: '',
                format: 'png32',
                dpi: 96,
                transparent: true,
                f: 'image',
                size: map.getSize()
            };
            me.url += 'export?' + Util.serialize(param);
            if (me.options.token) {
                me.url += ('&token=' + me.options.token);
            }
            me.layer = new ol.layer.Image({
                source: new ol.source.ImageStatic({
                    url: me.url,
                    imageExtent: extend
                })
            });
            map.addLayer(me.layer);
            map.getView().fit(extend);
            map.on('moveend', function() {
                var arr = [];
                arr.push(me.listIndex);
                var bbox = map.getView().calculateExtent();
                var param = {
                    bbox: bbox,
                    layers: 'show:' + arr.toString(),
                    format: 'png32',
                    dpi: 96,
                    transparent: true,
                    f: 'image',
                    size: map.getSize()
                };
                if (intersects(bbox, extend) == true) {
                    var url = me.options.url;
                    url += 'export?' + Util.serialize(param);
                    if (me.options.token) {
                        url += ('&token=' + me.options.token);
                    }
                    me.layer.setSource(new ol.source.ImageStatic({
                        url: url,
                        imageExtent: bbox
                    }));
                    // map.getView().fit(bbox);
                }
            })
        })
        return me;
    }
}