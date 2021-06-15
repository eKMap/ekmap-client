import ekmap_inherits from './ext/inherits'
import { unByKey as ol_Observable_unByKey } from 'ol/Observable'
import ol_Collection from 'ol/Collection'
import ol_View from 'ol/View'
import ol_Overlay from 'ol/Overlay'
import ol_Map from 'ol/Map'
import ekmap_element from '../core/Element';
import ekmap_common from '../core/Common';

/**
 * @classdesc
 * Lớp Magnify thêm hiệu ứng "kính lúp" vào bản đồ
 * . Một phần của bản đồ được xem ở mức thu phóng khác
 *
 * @constructor
 * @category  Control
 * @extends {ol_Overlay}
 * @param {} options Kế thừa toàn bộ option từ ol_Overlay và bổ sung một số lựa chọn mở rộng sau
 *	@param {String} options.className CSS
 *	@param {Number} options.radius Bán kính của kính lúp. Mặc định 75
 *	@param {Element} options.target Vị trí nội dung hiển thị kính lúp, mặc định hiển thị trên bản đồ
 *	@param {Number} options.zoomOffset Mức zoom cần thu phóng, mặc định 1
 *	@param {ol.layer|Array<ol.layer>} options.layers Danh sách lớp bản đồ cần thu phóng
 * @api stable
 */
var Magnify = function(options) {
    var elt = document.createElement("div");
    elt.className = options.className ? options.className + ' ol-magnify' : "ol-magnify";
    this._elt = elt;
    this.radius = options.radius || 75;
    ol_Overlay.call(this, {
        positioning: options.positioning || "center-center",
        element: this._elt,
        stopEvent: false
    });
    // Create magnify map
    if (options.layers && !(options.layers instanceof Array)) options.layers = [options.layers];
    this.mgmap_ = new ol_Map({
        controls: new ol_Collection(),
        interactions: new ol_Collection(),
        target: options.target || this._elt,
        view: new ol_View({ projection: options.projection }),
        layers: options.layers
    });
    this.mgview_ = this.mgmap_.getView();

    this.external_ = options.target ? true : false;

    this.set("zoomOffset", options.zoomOffset || 1);
    this.set("active", true);
    this.on("propertychange", this.setView_.bind(this));
};
ekmap_inherits(Magnify, ol_Overlay);

/**
 * Overwride
 * @param {ol.Map} map
 * @private
 */
Magnify.prototype.setMap = function(map) {
    if (this.getMap()) {
        this.getMap().getViewport().removeEventListener("mousemove", this.onMouseMove_);
    }
    if (this._listener) ol_Observable_unByKey(this._listener);
    this._listener = null;

    ol_Overlay.prototype.setMap.call(this, map);
    map.getViewport().addEventListener("mousemove", this.onMouseMove_.bind(this));
    this._listener = map.getView().on('propertychange', this.setView_.bind(this));

    this.setView_();
    this.setRadius(this.radius);
};


/** Thiết lập bán kính magnify
 *	@param {integer} radius Bán kính
 */
Magnify.prototype.setRadius = function(radius) {
    this.radius = radius;
    var target = this.getMagMap().getTarget();
    ekmap_element.setStyle(target, {
        width: this.radius * 2,
        height: this.radius * 2
    })
    this.getMagMap().updateSize();
}

/** Thêm lớp bản đồ
 *	@param {ol.layer|Array<ol.layer>} layers Lớp bản đồ
 */
Magnify.prototype.addLayer = function(layers) {
    if (layers && !(layers instanceof Array)) layers = [layers];
    layers.forEach(layer => {
        this.getMagMap().addLayer(layer);
    });
}

/** Xóa lớp bản đồ
 *	@param {ol.layer|Array<ol.layer>} layers Lớp bản đồ
 */
Magnify.prototype.removeLayer = function(layers) {
    if (layers && !(layers instanceof Array)) layers = [layers];
    layers.forEach(layer => {
        this.getMagMap().removeLayer(layer);
    });
}

/** Lấy danh sách lớp bản đồ
 *	@return {Array<ol.layer>} Lớp bản đồ
 */
Magnify.prototype.getLayers = function(layers) {
    return this.mgmap_.getLayers().getArray();
}


/**
 *	@return {_ol_Map_}
 * @private
 */
Magnify.prototype.getMagMap = function() {
    return this.mgmap_;
};

/**
 *	@return {boolean}
 * @private
 */
Magnify.prototype.getActive = function() {
    return this.get("active");
};

/** 
 *	@param {boolean} active
 * @private
 */
Magnify.prototype.setActive = function(active) {
    return this.set("active", active);
};

/** Mouse move
 * @private
 */
Magnify.prototype.onMouseMove_ = function(e) {
    var self = this;
    if (!self.get("active")) {
        self.setPosition();
    } else {
        var px = self.getMap().getEventCoordinate(e);
        if (!self.external_) self.setPosition(px);
        self.mgview_.setCenter(px);
        if (!self._elt.querySelector('canvas') || self._elt.querySelector('canvas').style.display == "none") self.mgmap_.updateSize();
    }
};

/** View has changed
 * @private
 */
Magnify.prototype.setView_ = function(e) {
    if (!this.get("active")) {
        this.setPosition();
        return;
    }

    if (!e) {
        // refresh all
        this.setView_({ key: 'rotation' });
        this.setView_({ key: 'resolution' });
        return;
    }

    // Set the view params
    switch (e.key) {
        case 'rotation':
            this.mgview_.setRotation(this.getMap().getView().getRotation());
            break;
        case 'zoomOffset':
        case 'resolution':
            {
                var z = Math.max(0, this.getMap().getView().getZoom() + Number(this.get("zoomOffset")));
                this.mgview_.setZoom(z);
                break;
            }
        default:
            break;
    }
};

export default Magnify