import '../../core/Base';
import { CommonUtil as Util, ThemeVector as Vector, ShapeFactory } from '../../../common';
import { Theme } from './ThemeLayer';

/**
 * @class mapboxgl.ekmap.GeoFeatureThemeLayer
 * @category Visualization Theme
 * @classdesc Geographic geometry thematic feature-type thematic layer.
 * @param {string} name The layer name.
 * @param {Object} opt_options Parameters.
 * @param {mapboxgl.Map} opt_options.map The current mapboxgl map object.
 * @param {string} opt_options.id Thematic layer ID. By default, CommonUtil.createUniqueID("themeLayer_") is used to create the thematic layer ID.
 * @param {boolean} opt_options.loadWhileAnimating=true Whether to redraw in real time.
 * @param {number} opt_options.nodesClipPixel=2 The node thins out the pixel distance.
 * @param {boolean} opt_options.isHoverAble=false Whether the graphics are highlighted when hovering.
 * @param {boolean} opt_options.isMultiHover=false Whether to highlight multiple graphics at the same time, it is used to highlight all graphics corresponding to the same data (such as multiple faces).
 * @param {boolean} opt_options.isClickAble=true Whether the graphics are clickable.
 * @param {boolean} opt_options.isAllowFeatureStyle=false Whether to allow valid attributes in feature style (style) to be applied to thematic layers。
 *                                        It is forbidden to use the style of the data (feature) for thematic elements.
 *                                        This attribute can force the effective attributes in the style of the data feature to be applied to the thematic features, and has a higher priority than the layer style and styleGroups, so that the thematic features
 *                                        The style is out of the control of the thematic layer. In this way, independent styles can be assigned to special data (feature) corresponding thematic elements.
 * @param {number} opt_options.opacity=1 Layer transparency.
 * @extends {mapboxgl.ekmap.ThemeLayer}
 * @fires mapboxgl.ekmap.GeoFeatureThemeLayer#beforefeaturesadded
 */

export class GeoFeature extends Theme {

    constructor(name, opt_options) {
        super(name, opt_options);
        /**
         * @member {string} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.name 
         * @description The name of the thematic map layer.
         */
        this.name = null;
        /**
         * @member {ekmap.ThemeStyle} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.style 
         * @description The global style of the thematic map layer.
         */
        this.style = null;

        /**
         * @member {ekmap.ThemeStyle} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.highlightStyle 
         * @description The highlight style of the thematic map layer.
         */
        this.highlightStyle = null;

        /**
         * @member {number} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.nodesClipPixel=2
         * @description The node thins out the pixel distance.
         */
        this.nodesClipPixel = 2;

        /**
         * @member {boolean} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.isHoverAble=false
         * @description Whether the graphics are highlighted when hovering.
         */
        this.isHoverAble = false;
        /**
         * @member {boolean} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.isMultiHover=false
         * @description Whether to highlight multiple graphics at the same time, it is used to highlight all graphics corresponding to the same data (such as multiple faces).
         */
        this.isMultiHover = false;
        /**
         * @member {boolean} mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.isClickAble=true
         * @description  Whether the graphics are clickable。
         */
        this.isClickAble = true;

        /**
         * @member {boolean} [mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.isAllowFeatureStyle=false]
         * @description  Whether to allow the valid attributes in the feature style (style) to be applied to the thematic layer. </br>
         *              It is forbidden to use the style of the data (feature) for thematic elements. This attribute can force the effective attributes in the style of the data feature to be applied to the thematic features, and has a higher priority than the layer style and styleGroups, so that the thematic features
         *               The style is out of the control of the thematic layer. In this way, independent styles can be assigned to special data (feature) corresponding thematic elements.
         */
        this.isAllowFeatureStyle = false;
        Util.extend(this, opt_options);
        this.cache = opt_options.cache || {};
        this.cacheFields = opt_options.cacheFields || [];
        this.maxCacheCount = opt_options.maxCacheCount || 0;
        this.isCustomSetMaxCacheCount = opt_options.isCustomSetMaxCacheCount === undefined ? false : opt_options.isCustomSetMaxCacheCount;

    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.addFeatures
     * @description Add elements.
     * @param {mapboxgl.ekmap.ThemeFeature|ekmap.ServerFeature} features Feature object.
     */
    addFeatures(features) {
        /**
         * @event mapboxgl.ekmap.GeoFeatureThemeLayer#beforefeaturesadded
         * @description Triggered before the element is added.
         * @property {mapboxgl.ekmap.ThemeFeature|ekmap.ServerFeature} features Elements to be added.
         */
        mapboxgl.Evented.prototype.fire('beforefeaturesadded', { features: features });
        this.features = this.toiClientFeature(features);

        if (!this.isCustomSetMaxCacheCount) {
            this.maxCacheCount = this.features.length * 5;
        }
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.removeFeatures
     * @description Delete feature from the thematic map. This function deletes all the vector elements passed in.
     * @param {ekmap.Feature.Vector} features The feature object to be deleted.
     */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.clearCache();
        Theme.prototype.removeFeatures.apply(this, arguments);
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.removeAllFeatures
     * @description Clear all the vector features of the current layer.
     */
    removeAllFeatures() {
        this.clearCache();
        Theme.prototype.removeAllFeatures.apply(this, arguments);
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.redrawThematicFeatures
     * @description Redraw all thematic elements.
     * @param {mapboxgl.LngLatBounds} extent The scope of redrawing.
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
        this.clearCache();
        var hoverone = this.renderer.getHoverOne();
        var hoverFid = null;
        if (hoverone && hoverone.refDataID) {
            hoverFid = hoverone.refDataID;
        }
        this.renderer.clearAll();

        var features = this.features;
        var cache = this.cache;
        var cacheFields = this.cacheFields;
        var cmZoom = this.map.getZoom();

        var maxCC = this.maxCacheCount;

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            var fields = feature.id + "_zoom_" + cmZoom.toString();
            var thematicFeature;
            if (cache[fields]) {
                cache[fields].updateAndAddShapes();
            } else {
                thematicFeature = this.createThematicFeature(features[i]);
                if (thematicFeature.getShapesCount() < 1) {
                    continue;
                }
                cache[fields] = thematicFeature;
                cacheFields.push(fields);
                if (cacheFields.length > maxCC) {
                    var fieldsTemp = cacheFields[0];
                    cacheFields.splice(0, 1);
                    delete cache[fieldsTemp];
                }
            }

        }
        this.renderer.render();

        if (hoverFid && this.isHoverAble && this.isMultiHover) {
            var hShapes = this.getShapesByFeatureID(hoverFid);
            this.renderer.updateHoverShapes(hShapes);
        }
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.createThematicFeature
     * @description Create thematic elements.
     * @param {ekmap.Feature.Vector} feature Feature object.
     */
    createThematicFeature(feature) {
        var style = Util.copyAttributesWithClip(this.style);
        if (feature.style && this.isAllowFeatureStyle === true) {
            style = Util.copyAttributesWithClip(feature.style);
        }
        var options = {};
        options.nodesClipPixel = this.nodesClipPixel;
        options.isHoverAble = this.isHoverAble;
        options.isMultiHover = this.isMultiHover;
        options.isClickAble = this.isClickAble;
        options.highlightStyle = ShapeFactory.transformStyle(this.highlightStyle);
        var thematicFeature = new Vector(feature, this, ShapeFactory.transformStyle(style), options);
        for (var m = 0; m < thematicFeature.shapes.length; m++) {
            this.renderer.addShape(thematicFeature.shapes[m]);
        }
        return thematicFeature;
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.clearCache
     * @description clear cache.
     */
    clearCache() {
        this.cache = {};
        this.cacheFields = [];
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.clear
     * @description The contents to be cleared include data (features), thematic elements and cache.
     */
    clear() {
        this.renderer.clearAll();
        this.renderer.refresh();
        this.removeAllFeatures();
        this.clearCache();
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.getCacheCount
     * @description Get the current cache number.
     * @returns {number}The current cache amount.
     */
    getCacheCount() {
        return this.cacheFields.length;
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param {number} cacheCount The total number of caches.
     * @descriptionSet the maximum number of cache entries.
     */
    setMaxCacheCount(cacheCount) {
        if (!isNaN(cacheCount)) {
            this.maxCacheCount = cacheCount;
            this.isCustomSetMaxCacheCount = true;
        }
    }

    /**
     * @function mapboxgl.ekmap.GeoFeatureThemeLayer.prototype.setMaxCacheCount
     * @param {number} featureID=si.refDataID Feature ID.
     * @description Get all the graphics associated with feature through FeatureID. If this parameter is not passed in, the function will return all graphics.
     */
    getShapesByFeatureID(featureID) {
        var list = [];
        var shapeList = this.renderer.getAllShapes();
        if (!featureID) {
            return shapeList
        }
        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    }

}

mapboxgl.ekmap.GeoFeatureThemeLayer = GeoFeature;