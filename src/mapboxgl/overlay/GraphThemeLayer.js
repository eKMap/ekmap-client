import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {
    CommonUtil,
    FeatureTheme
} from "../../common";

import {
    Theme
} from './theme/ThemeLayer';

/**
 * @class mapboxgl.ekmap.GraphThemeLayer
 * @category Visualization Theme
 * @classdesc Statistics thematic layer
 * @param {string} name The layer name.
 * @param {string} chartsType Chart category.
 * @param {Object} opt_options Parameters.
 * @param {string} opt_options.id Thematic layer ID. By default, CommonUtil.createUniqueID("themeLayer_") is used to create the thematic layer Id.
 * @param {boolean} opt_options.loadWhileAnimating=true Whether to redraw in real time
 * @param {mapboxgl.Map} opt_options.map Current mapboxgl map object.
 * @param {number} opt_options.opacity=1 Layer transparency
 * @param {string} opt_options.themeFields Specify the field for creating thematic map.
 * @param {boolean} opt_options.cluster=true Whether to perform capping processing. If set to true, the chart that has capped the chart drawn in the layer will be hidden during the chart drawing process
 * @param {string} opt_options.chartsType Chart type. Currently available: "Bar", "Line", "Pie".
 * @param {Object} opt_options.chartsSetting Symbol Circle configuration object.
 * @param {Array.<number>} opt_options.chartsSetting.codomain The data range allowed to be displayed in the chart is a one-dimensional array with a length of 2. The first element represents the lower limit of the value range, and the second element represents the upper limit of the value range.
 * @param {number} opt_options.chartsSetting.maxR The maximum radius of the circle.
 * @param {number} opt_options.chartsSetting.minR Minimum radius of circle.
 * @param {string} opt_options.chartsSetting.fillColor The fill color of the circle, such as：fillColor: "#FFB980".
 * @param {Object} opt_options.chartsSetting.circleStyle The basic style of the circle, this parameter controls the basic style of the circle, the priority is lower than circleStyleByFields and circleStyleByCodomain.
 * @param {number} opt_options.chartsSetting.decimalNumber Data value array dataValues Decimal place of element value, data decimal place processing parameter, value range: [0, 16]. If this parameter is not set, the data will not be processed with decimal places when fetching the data value.
 * @param {Object} opt_options.chartsSetting.circleHoverStyle The style of the circle hover state, valid when circleHoverAble is true.
 * @param {boolean} opt_options.chartsSetting.circleHoverAble=true Whether to allow the circle to use the hover state. At the same time, setting circleHoverAble and circleClickAble to false can directly shield the response of the graphics to thematic layer events.
 * @param {boolean} opt_options.chartsSetting.circleClickAble=true Whether to allow the circle to be clicked. At the same time, setting circleHoverAble and circleClickAble to false can directly shield the response of the graphics to thematic layer events.
 * @param {boolean} opt_options.chartsSetting.showText=false Additional text in the graphic, default: false.
 * @param {string} opt_options.chartsSetting.textColor Text color. Default value: "#ffffff'"
 * @param {string} opt_options.chartsSetting.textFont Additional text styles ["font-style", "font-variant", "font-weight", "font-size / line-height", "font-family"]. Example:'normal normal normal 12 arial,sans-serif'。
 * @param {string} opt_options.chartsSetting.textPosition Additional text position. Settable value:"inside", "left", "right", top", "bottom", "end". Default value："inside"。
 * @param {string} opt_options.chartsSetting.textAlign Horizontal alignment of additional text. Possible values: "start", "end", "left", "right", "center". By default, it is automatically set according to textPosition.
 * @param {string} opt_options.chartsSetting.fontWeight=normal
 * @param {string} opt_options.chartsSetting.fontSize=12
 * @param {string} opt_options.chartsSetting.fontOpacity=1 
 * 
 * @extends {mapboxgl.ekmap.Theme}
 * @fires mapboxgl.ekmap.GraphThemeLayer#beforefeaturesadded
 */
export class GraphThemeLayer extends Theme {

    constructor(name, chartsType, opt_options) {
        super(name, opt_options);
        this.chartsSetting = opt_options.chartsSetting || {};
        this.themeFields = opt_options.themeFields || null;
        this.overlayWeightField = opt_options.overlayWeightField || null;
        this.cluster = opt_options.cluster === undefined ? true : opt_options.cluster;
        //Text
        this.chartsSetting.showText = this.chartsSetting.showText === undefined ? false : this.chartsSetting.showText;
        this.chartsSetting.textColor = this.chartsSetting.textColor === undefined ? '#ffffff' : this.chartsSetting.textColor;
        this.chartsSetting.textFont = this.chartsSetting.textFont === undefined ? 'normal normal normal 12 arial,sans-serif' : this.chartsSetting.textFont;
        this.chartsSetting.textPosition = this.chartsSetting.textPosition === undefined ? 'inside' : this.chartsSetting.textPosition;
        this.chartsSetting.textAlign = this.chartsSetting.textAlign === undefined ? 'center' : this.chartsSetting.textAlign;
        this.chartsSetting.fontWeight = this.chartsSetting.fontWeight === undefined ? 'normal' : this.chartsSetting.fontWeight;
        this.chartsSetting.fontSize = this.chartsSetting.fontSize === undefined ? 12 : this.chartsSetting.fontSize;
        this.chartsSetting.fontOpacity = this.chartsSetting.fontOpacity === undefined ? 1 : this.chartsSetting.fontOpacity;

        this.charts = opt_options.charts || [];
        this.cache = opt_options.cache || {};
        this.chartsType = chartsType;
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.setChartsType
     * @description Set the chart type, this function can dynamically change the chart type. Before calling this function, please make relevant configuration for the new type of chart through chartsSetting.
     * @param {string} chartsType Chart type. Currently available: "Bar", "Line", "Pie".
     */
    setChartsType(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.addFeatures
     * @description Add data to the thematic map layer. The supported feature type is: the feature JSON object returned by eKServer.
     * @param {ekmap.ServerFeature} features Elements to be added.
     */
    addFeatures(features) {
        /**
         * @event mapboxgl.ekmap.GraphThemeLayer#beforefeaturesadded
         * @description Triggered before the element is added.
         * @property {ekmap.ServerFeature} features The element to be added.
         */
        var ret = mapboxgl.Evented.prototype.fire('beforefeaturesadded', {
            features: features
        });
        if (ret === false) {
            return;
        }
        this.features = this.toiClientFeature(features);

        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.redrawThematicFeatures
     * @description Redraw all thematic elements.
     *              This method includes all the steps of drawing thematic elements, including the conversion of user data to thematic elements, thinning out, and caching.
     *              Call this method to refresh the layer when the map is roaming.
     * @param {mapboxgl.LngLatBounds} extent The scope of the redraw.
     */
    redrawThematicFeatures(extent) { // eslint-disable-line no-unused-vars
        this.clearCache();
        this.renderer.clearAll();
        var features = this.features;
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            var cache = this.cache;
            var cacheField = feature.id;
            if (cache[cacheField]) {
                continue;
            }
            cache[cacheField] = cacheField;
            var chart = this.createThematicFeature(feature);
            if (chart && this.overlayWeightField) {
                if (feature.attributes[this.overlayWeightField] && !isNaN(feature.attributes[this.overlayWeightField])) {
                    chart["__overlayWeight"] = feature.attributes[this.overlayWeightField];
                }
            }
            if (chart) {
                this.charts.push(chart);
            }
        }
        this.drawCharts();
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.createThematicFeature
     * @description  To add data to the thematic map layer, the supported feature type is: the feature json object returned by eKServer.
     * @param {Object} feature Elements to be added.
     *
     */
    createThematicFeature(feature) {
        var thematicFeature;
        if(feature.data.radius)
            this.chartsSetting.radius = feature.data.radius;
        if (FeatureTheme[this.chartsType] && this.themeFields && this.chartsSetting) {
            thematicFeature = new FeatureTheme[this.chartsType](feature, this, this.themeFields, this.chartsSetting);
        }
        if (!thematicFeature) {
            return false;
        }
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.drawCharts
     * @description Draw a chart. Including gland processing.
     *
     */
    drawCharts() {
        if (!this.renderer) {
            return;
        }
        var charts = this.charts;
        if (this.overlayWeightField) {
            charts.sort(function(cs, ce) {
                if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return 0;
                } else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) == "undefined") {
                    return -1;
                } else if (typeof(cs["__overlayWeight"]) == "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
                    return 1;
                } else if (typeof(cs["__overlayWeight"]) != "undefined" && typeof(ce["__overlayWeight"]) != "undefined") {
                    if (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return 0;
            });
        }
        if (!this.cluster) {
            for (var m = 0, len_m = charts.length; m < len_m; m++) {
                var chart_m = charts[m];
                var shapeROP_m = chart_m.resetLocation();
                var shapes_m = chart_m.shapes;
                for (var n = 0, slen_n = shapes_m.length; n < slen_n; n++) {
                    shapes_m[n].refOriginalPosition = shapeROP_m;
                    this.renderer.addShape(shapes_m[n]);
                }
            }
        } else {
            var chartsBounds = [];
            for (let i = 0, len = charts.length; i < len; i++) {
                var chart = charts[i];
                var shapeROP = chart.resetLocation();
                var cbs = chart.chartBounds;
                var cBounds = [{
                    "x": cbs.left,
                    "y": cbs.top
                }, {
                    "x": cbs.left,
                    "y": cbs.bottom
                }, {
                    "x": cbs.right,
                    "y": cbs.bottom
                }, {
                    "x": cbs.right,
                    "y": cbs.top
                }, {
                    "x": cbs.left,
                    "y": cbs.top
                }];
                var isOL = false;
                if (i !== 0) {
                    for (let j = 0; j < chartsBounds.length; j++) {
                        if (this.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                            isOL = true;
                            break;
                        }
                    }
                }
                if (isOL) {
                    continue;
                } else {
                    chartsBounds.push(cBounds);
                }
                var shapes = chart.shapes;
                for (let j = 0, slen = shapes.length; j < slen; j++) {
                    shapes[j].refOriginalPosition = shapeROP;
                    this.renderer.addShape(shapes[j]);
                }
            }
        }
        this.renderer.render();
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.getShapesByFeatureID
     * @description Get all the graphics associated with feature through FeatureID. If this parameter is not passed in, the function will return all graphics.
     * @param {number} featureID Feature ID.
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

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.isQuadrilateralOverLap
     * @description  Determine whether the two quadrilaterals have glands.
     * @param {Array.<Object>} quadrilateral An array of quadrilateral nodes.
     * @param {Array.<Object>} quadrilateral2 The second quadrilateral node array.
     */
    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        }

        var OverLap = false;
        for (let i = 0; i < quadLen; i++) {
            if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quadLen - 1; i++) {
            if (OverLap) {
                break;
            }
            for (let j = 0; j < quad2Len - 1; j++) {
                var isLineIn = CommonUtil.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "ekmap.Geometry.Point") {
                    OverLap = true;
                    break;
                }
            }
        }
        return OverLap;
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.isPointInPoly
     * @description Determine whether a point is inside the polygon. (Ray method)
     * @param {Object} pt The point object to be judged, the object contains the attribute x (abscissa) and attribute y (ordinate).
     * @param {Array.<Object>} poly An array of polygon nodes.
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
            (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) &&
            (isIn = !isIn);
        }
        return isIn;
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.isChartInMap
     * @description  Determine whether the chart is in the map.
     * @param {ekmap.Bounds} mapPxBounds The pixel range of the map.
     * @param {Array.<Object>} chartPxBounds An array of quadrilateral nodes of the chart range.
     */
    isChartInMap(mapPxBounds, chartPxBounds) {
        var mb = mapPxBounds;
        var isIn = false;
        for (var i = 0, len = chartPxBounds.length; i < len; i++) {
            var cb = chartPxBounds[i];

            if (cb.x >= mb.left && cb.x <= mb.right && cb.y >= mb.top && cb.y <= mb.bottom) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.clearCache
     * @description Clear cache
     */
    clearCache() {
        this.cache = {};
        this.charts = [];
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.removeFeatures
     * @description Delete feature from the thematic map. This function deletes all the vector elements passed in. Each item in the features array in the parameter must be a feature that has been added to the current layer.
     * @param {ekmap.Feature.Vector} features The element to be deleted.
     */
    removeFeatures(features) {
        this.clearCache();
        super.removeFeatures(features);
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.removeAllFeatures
     * @description  Remove all elements.
     */
    removeAllFeatures() {
        this.clearCache();
        super.removeAllFeatures();
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.redraw
     * @description  Redraw the layer.
     */
    redraw() {
        this.clearCache();
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
            return true;
        }
        return false
    }

    /**
     * @function mapboxgl.ekmap.GraphThemeLayer.prototype.clear
     * @description The contents to be cleared include data (features), thematic elements, and cache.
     */
    clear() {
        if (this.renderer) {
            this.renderer.clearAll();
            this.renderer.refresh();
        }
        this.removeAllFeatures();
        this.clearCache();
    }
}

mapboxgl.ekmap.GraphThemeLayer = GraphThemeLayer;