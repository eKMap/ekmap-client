import '../core/Base';
import {
    GeometryVector as FeatureVector,
    GeoText,
    Bounds,
    CommonUtil as Util,
    ShapeFactory,
    ThemeVector as Vector
} from '../../common';
import {
    GeoFeature
} from './theme/GeoFeatureThemeLayer';

/**
 * @class mapboxgl.ekmap.LabelThemeLayer
 * @category  Visualization Theme
 * @classdesc  Label thematic layer.
 * @param {string} name The layer name.
 * @param {Object} opt_options Parameters.
 * @param {mapboxgl.Map} opt_options.map The current mapboxgl map object.
 * @param {string} opt_options.themeField Specify the fields for creating thematic maps.
 * @param {Object} opt_options.style Thematic map style.
 * @param {Object} opt_options.styleGroups Style groups for each topic type.
 * @param {Object} opt_options.highlightStyle The style that is triggered after the hover event is turned on.
 * @param {string} opt_options.id Thematic layer ID. Thematic layer ID. By default, CommonUtil.createUniqueID("themeLayer_") is used to create the thematic layer ID.
 * @param {boolean} opt_options.loadWhileAnimating=true Whether to redraw in real time.
 * @param {number} opt_options.opacity=1 Layer transparency.
 * @param {boolean} options.isAvoid=true Whether to avoid the edge of the map.
 * @param {boolean} options.cluster=true Whether to perform capping processing. If set to true, the chart that has capped the chart drawn in the layer will be hidden during the chart drawing process.
 * @param {boolean} opt_options.isHoverAble Whether to enable the hover event.
 * @extends {mapboxgl.ekmap.GeoFeatureThemeLayer}
 */
export class Label extends GeoFeature {

    constructor(name, opt_options) {
        super(name, opt_options);
        /**
         * @member {boolean} mapboxgl.ekmap.LabelThemeLayer.prototype.cluster=true 
         * @description Whether to perform capping processing, if set to true, the capped label will be hidden.
         */
        this.cluster = true;
        /**
         * @member {boolean} mapboxgl.ekmap.LabelThemeLayer.prototype.isAvoid=true 
         * @description Whether to avoid the edge of the map, if it is set to true, the label that intersects the edge of the map will be moved to the range of the map, and the edge of the map will be avoided.
         */
        this.isAvoid = true;

        /**
         * @member {string} mapboxgl.ekmap.LabelThemeLayer.prototype.themeField 
         * @description  The name of the attribute field used to specify the thematic feature style. </br>
         *               This attribute field is a field included in user data (feature) attributes, and the type of the value corresponding to the field must be numeric. </br>
         *               The use of label group display also needs to set the styleGroups property.
         */
        this.themeField = null;

        /**
         * @member {Array.<Object>} mapboxgl.ekmap.LabelThemeLayer.prototype.styleGroups 
         * @description Grouping style. To use this property, you need to set the themeField property. </br>
         *              1. If themeField and styleGroups are not set at the same time, all thematic elements will be rendered using the style of this layer;</br>
         *              2. If themeField and styleGroups are set at the same time, the corresponding attribute value in user data (feature) attributes will be obtained according to the field name specified by themeField;</br>
         *              &nbsp;&nbsp;a. If the attribute value is equal to the value defined by an element in the styleGroups array, the thematic element will be rendered in the style defined by the element in the styleGroups array. </br>
         *              &nbsp;&nbsp;b. If the attribute value is not equal to the value defined by any element in the styleGroups array, the thematic feature will be rendered according to the style of this layer. </br>
         *              Each element object of this array must have two attributes: value: the attribute value corresponding to the field themeField; style: thematic element style.
         */
        this.styleGroups = null;

        Util.extend(this, opt_options);
        this.defaultStyle = {
            fontColor: "#000000",
            fontOpacity: 1,
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "normal",
            labelAlign: "cm",
            labelXOffset: 0,
            labelYOffset: 0,
            labelRotation: 0,
            fill: false,
            fillColor: "#ee9900",
            fillOpacity: 0.4,
            stroke: false,
            strokeColor: "#ee9900",
            strokeOpacity: 1,
            strokeWidth: 1,
            strokeLinecap: "round",
            strokeDashstyle: "solid",
            labelRect: true,
            labelSelect: true,
            _isGeoTextStrategyStyle: true
        };
        this.getPxBoundsMode = 0;

        this.labelFeatures = [];
    }


    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.redrawThematicFeatures
     * @description Redraw all thematic elements. </br>
     *              This method includes all the steps of drawing thematic elements, including the conversion of user data to thematic elements, thinning out, and caching. </br>
     *              This method is called to refresh the layer when the map is roaming.
     * @param {mapboxgl.LngLatBounds} bounds Redraw the range.
     */
    redrawThematicFeatures(bounds) {
            if (this.features.length > 0 && this.labelFeatures.length == 0) {
                var feats = this.setLabelsStyle(this.features);
                for (var i = 0, len = feats.length; i < len; i++) {
                    this.labelFeatures.push(feats[i]);
                }
            }
            this.features = this.getDrawnLabels(this.labelFeatures);
            super.redrawThematicFeatures.call(this, bounds);
        }
        /**
         * @function mapboxgl.ekmap.LabelThemeLayer.prototype.removeFeatures
         * @description Delete feature from the thematic map. This function deletes all the vector elements passed in.
         * @param {ekmap.Feature.Vector} features The feature object to be deleted.
         */
    removeFeatures(features) { // eslint-disable-line no-unused-vars
        this.labelFeatures = [];
        super.removeFeatures.call(this, arguments);
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.removeAllFeatures
     * @description Clear all the vector features of the current layer.
     */
    removeAllFeatures() {
        this.labelFeatures = [];
        super.removeAllFeatures.call(this, arguments);
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.createThematicFeature
     * @description Create thematic map elements
     * @param {Object} feature Thematic graphic elements to be created.
     */
    createThematicFeature(feature) {
        var style = this.getStyleByData(feature);
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
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getDrawnLabels
     * @description Get the label elements that will be drawn on the layer after (capping) processing.
     * @param {Array.<ekmap.Feature.Vector>} labelFeatures An array of all label elements.
     * @returns {Array.<ekmap.Feature.Vector>} The final label element array to be drawn.
     */
    getDrawnLabels(labelFeatures) {
        var feas = [],
            fea,
            fi,
            labelsB = [],
            styTmp,
            feaSty,
            styleTemp = {
                labelAlign: "cm",
                labelXOffset: 0,
                labelYOffset: 0
            };

        var map = this.map;
        var zoom = map.getZoom();
        var canvas = map.getCanvas();
        var mapSize = {
            x: parseFloat(canvas.style.width),
            y: parseFloat(canvas.style.height)
        };
        for (var i = 0, len = labelFeatures.length; i < len; i++) {
            fi = labelFeatures[i];
            if (fi.isStyleChange || fi.isStyleChange === undefined) {
                fi = this.setStyle(fi);
            }

            var loc = this.getLabelPxLocation(fi);

            if ((loc.x >= 0 && loc.x <= mapSize.x) && (loc.y >= 0 && loc.y <= mapSize.y)) {
                if (fi.style.minZoomLevel > -1) {
                    if (zoom <= fi.style.minZoomLevel) {
                        continue;
                    }
                }
                if (fi.style.maxZoomLevel > -1) {
                    if (zoom > fi.style.maxZoomLevel) {
                        continue;
                    }
                }

                var boundsQuad = null;
                if (fi.isStyleChange) {
                    fi.isStyleChange = null;
                    boundsQuad = this.calculateLabelBounds(fi, loc);
                } else {
                    if (fi.geometry.bsInfo.w && fi.geometry.bsInfo.h) {
                        boundsQuad = this.calculateLabelBounds2(fi, loc);
                    } else {
                        boundsQuad = this.calculateLabelBounds(fi, loc);
                    }
                }

                var mapViewBounds = new Bounds(0, mapSize.y, mapSize.x, 0),
                    quadlen = boundsQuad.length;

                if (this.isAvoid) {
                    var avoidInfo = this.getAvoidInfo(mapViewBounds, boundsQuad);

                    if (avoidInfo) {
                        if (avoidInfo.aspectW === "left") {
                            fi.style.labelXOffset += avoidInfo.offsetX;

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].x += avoidInfo.offsetX;
                            }
                        } else if (avoidInfo.aspectW === "right") {
                            fi.style.labelXOffset += (-avoidInfo.offsetX);

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].x += (-avoidInfo.offsetX);
                            }
                        }

                        if (avoidInfo.aspectH === "top") {
                            fi.style.labelYOffset += avoidInfo.offsetY;

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].y += avoidInfo.offsetY;
                            }
                        } else if (avoidInfo.aspectH === "bottom") {
                            fi.style.labelYOffset += (-avoidInfo.offsetY);

                            for (let j = 0; j < quadlen; j++) {
                                boundsQuad[j].y += (-avoidInfo.offsetY);
                            }
                        }

                        fi.isStyleChange = true;
                    }
                }
                if (this.cluster) {
                    var isOL = false;

                    if (i != 0) {
                        for (let j = 0; j < labelsB.length; j++) {
                            if (this.isQuadrilateralOverLap(boundsQuad, labelsB[j])) {
                                isOL = true;
                                break;
                            }
                        }
                    }

                    if (isOL) {
                        continue;
                    } else {
                        labelsB.push(boundsQuad);
                    }
                }
                var geoBs = [];
                for (let j = 0; j < quadlen - 1; j++) {
                    geoBs.push(map.unproject(boundsQuad[j]));
                }

                var leftBottom = geoBs[3];
                var rightTop = geoBs[1];
                var bounds = new Bounds(leftBottom.lng, leftBottom.lat, rightTop.lng, rightTop.lat);
                var center = bounds.getCenterLonLat();
                var label = new GeoText(center.lon, center.lat, fi.attributes[this.themeField]);
                label.calculateBounds();
                styTmp = Util.cloneObject(fi.style);
                feaSty = Util.cloneObject(Util.copyAttributes(styTmp, styleTemp));
                fea = new FeatureVector(label, fi.attributes, feaSty);
                fea.id = fi.id;
                fea.fid = fi.fid;
                feas.push(fea);
            }
        }
        return feas;
    }


    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getStyleByData
     * @description Set the style of thematic elements based on user data (feature).
     * @param {ekmap.Feature.Vector} feat Vector feature objects.
     * @returns {Array.<ekmap.ThemeStyle>} Style of thematic elements.
     */
    getStyleByData(feat) {
        var feature = feat;
        feature.style = Util.copyAttributes(feature.style, this.defaultStyle);
        if (this.style && this.style.fontSize && parseFloat(this.style.fontSize) < 12) {
            this.style.fontSize = "12px";
        }
        feature.style = Util.copyAttributes(feature.style, this.style);

        if (this.themeField && this.styleGroups && feature.attributes) {
            var Sf = this.themeField;
            var attributes = feature.attributes;
            var groups = this.styleGroups;
            var isSfInAttrs = false;
            var attr = null;

            for (var property in attributes) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = attributes[property];
                    break;
                }
            }

            if (isSfInAttrs) {
                for (var i = 0, len = groups.length; i < len; i++) {
                    if ((attr >= groups[i].start) && (attr < groups[i].end)) {
                        var sty1 = groups[i].style;
                        if (sty1 && sty1.fontSize && parseFloat(sty1.fontSize) < 12) {
                            sty1.fontSize = "12px";
                        }
                        feature.style = Util.copyAttributes(feature.style, sty1);
                    }
                }
            }
            feature.style.label = feature.attributes[this.themeField]
        }


        return feature.style;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.setLabelsStyle
     * @description Set the style of the label element.
     * @param {Array.<ekmap.Feature.Vector>} labelFeatures The label element array for which Style needs to be set.
     * @returns {Array.<ekmap.Feature.Vector>} The label element array after Style is assigned.
     */
    setLabelsStyle(labelFeatures) {
        var fea, labelFeas = [];
        for (var i = 0, len = labelFeatures.length; i < len; i++) {
            var feature = labelFeatures[i];
            if (feature.geometry.CLASS_NAME === "ekmap.Geometry.GeoText") {
                if (feature.geometry.bsInfo.w || feature.geometry.bsInfo.h) {
                    feature.geometry.bsInfo.w = null;
                    feature.geometry.bsInfo.h = null;
                    feature.geometry.labelWTmp = null;
                }
                fea = this.setStyle(feature);
                fea.layer = this.layer;
                labelFeas.push(fea);
            } else {
                return labelFeatures;
            }
        }
        return labelFeas;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.setStyle
     * @description Set the style of the label element.
     * @param {ekmap.Feature.Vector} feat The elements that need to be given style.
     */
    setStyle(feat) {
        var feature = feat;
        feature.style = Util.copyAttributes(feature.style, this.defaultStyle);
        if (this.style && this.style.fontSize && parseFloat(this.style.fontSize) < 12) {
            this.style.fontSize = "12px";
        }
        feature.style = Util.copyAttributes(feature.style, this.style);

        if (this.groupField && this.styleGroups && feature.attributes) {
            var Sf = this.groupField;
            var Attrs = feature.attributes;
            var Gro = this.styleGroups;
            var isSfInAttrs = false;
            var attr = null;

            for (var property in Attrs) {
                if (Sf === property) {
                    isSfInAttrs = true;
                    attr = Attrs[property];
                    break;
                }
            }

            if (isSfInAttrs) {
                for (var i = 0, len = Gro.length; i < len; i++) {
                    if ((attr >= Gro[i].start) && (attr < Gro[i].end)) {
                        var sty1 = Gro[i].style;
                        if (sty1 && sty1.fontSize && parseFloat(sty1.fontSize) < 12) {
                            sty1.fontSize = "12px";
                        }
                        feature.style = Util.copyAttributes(feature.style, sty1);
                    }
                }
            }
        }

        feature.style.label = feature.geometry.text;

        return feature;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getLabelPxLocation
     * @description Get the pixel coordinates of the label element.
     * @param {ekmap.Feature.Vector} feature Label elements.
     * @returns {mapboxgl.Point} Label location.
     */
    getLabelPxLocation(feature) {
        var geoText = feature.geometry;
        var styleTmp = feature.style;

        var locationTmp = geoText.getCentroid();
        var locTmp = this.map.project(new mapboxgl.LngLat(locationTmp.x, locationTmp.y));
        var loc = new mapboxgl.Point(locTmp.x, locTmp.y);

        if (styleTmp.labelXOffset || styleTmp.labelYOffset) {
            var xOffset = isNaN(styleTmp.labelXOffset) ? 0 : styleTmp.labelXOffset;
            var yOffset = isNaN(styleTmp.labelYOffset) ? 0 : styleTmp.labelYOffset;
            var point = loc.add(new mapboxgl.Point(xOffset, -yOffset));
            return new mapboxgl.Point(point.x, point.y);
        } else {
            return new mapboxgl.Point(loc.x, loc.y);
        }
    }


    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.calculateLabelBounds
     * @description 获得标签要素的最终范围。
     *
     * @param {ekmap.Feature.Vector} feature The number of label elements whose bounds need to be calculated.
     * @param {mapboxgl.Point} loc Label location.
     *
     * @returns {Array.<Object>}  An array of quadrilateral nodes. E.g:[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}].
     */
    calculateLabelBounds(feature, loc) {
        var geoText = feature.geometry;

        var labB = null;
        var labelInfo = null;
        if (this.getPxBoundsMode == 0) {
            labB = geoText.getLabelPxBoundsByText(loc, feature.style);
        } else if (this.getPxBoundsMode === 1) {
            //canvas
            labelInfo = this.getLabelInfo(feature.geometry.getCentroid(), feature.style);
            labB = geoText.getLabelPxBoundsByLabel(loc, labelInfo.w, labelInfo.h, feature.style);
        } else {
            return null;
        }

        var boundsQuad = [];
        if ((feature.style.labelRotation % 180) == 0) {
            boundsQuad = [{
                    "x": labB.left,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.top
                }
            ];
        } else {
            boundsQuad = this.rotationBounds(labB, loc, feature.style.labelRotation);
        }

        geoText.bounds = new Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.calculateLabelBounds2
     * @description Another algorithm to obtain the final extent of the label elements (by recording the width and height of the label) improves the efficiency of calculating bounds.
     *
     * @param {ekmap.Feature.Vector} feature The number of label elements whose bounds need to be calculated.
     * @param {mapboxgl.Point} loc Label location.
     *
     * @returns {Array.<Object>} An array of quadrilateral nodes. E.g:[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    calculateLabelBounds2(feature, loc) {
        var labB, left, bottom, top, right;
        var labelSize = feature.geometry.bsInfo;
        var style = feature.style;
        var locationPx = Util.cloneObject(loc);

        if (style.labelAlign && style.labelAlign !== "cm") {
            switch (style.labelAlign) {
                case "lt":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "lm":
                    locationPx.x += labelSize.w / 2;
                    break;
                case "lb":
                    locationPx.x += labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "ct":
                    locationPx.y += labelSize.h / 2;
                    break;
                case "cb":
                    locationPx.y -= labelSize.h / 2;
                    break;
                case "rt":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y += labelSize.h / 2;
                    break;
                case "rm":
                    locationPx.x -= labelSize.w / 2;
                    break;
                case "rb":
                    locationPx.x -= labelSize.w / 2;
                    locationPx.y -= labelSize.h / 2;
                    break;
                default:
                    break;
            }
        }

        left = locationPx.x - labelSize.w / 2;
        bottom = locationPx.y + labelSize.h / 2;
        if (style.fontStyle && style.fontStyle === "italic") {
            right = locationPx.x + labelSize.w / 2 + parseInt(parseFloat(style.fontSize) / 2);
        } else {
            right = locationPx.x + labelSize.w / 2;
        }
        top = locationPx.y - labelSize.h / 2;

        labB = new Bounds(left, bottom, right, top);

        var boundsQuad = [];
        if ((style.labelRotation % 180) == 0) {
            boundsQuad = [{
                    "x": labB.left,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.top
                },
                {
                    "x": labB.right,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.bottom
                },
                {
                    "x": labB.left,
                    "y": labB.top
                }
            ];
        } else {
            boundsQuad = this.rotationBounds(labB, loc, style.labelRotation);
        }

        feature.geometry.bounds = new Bounds(boundsQuad[1].x, boundsQuad[3].y, boundsQuad[2].x, boundsQuad[4].y);
        return boundsQuad;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getLabelInfo
     * @description Obtain the label information after drawing according to the current position, including the width, height and number of lines of the label.
     * @returns {Object} Label information after drawing.
     */
    getLabelInfo(location, style) {
        var LABEL_ALIGN = {
                "l": "left",
                "r": "right",
                "t": "top",
                "b": "bottom"
            },
            LABEL_FACTOR = {
                "l": 0,
                "r": -1,
                "t": 0,
                "b": -1
            };

        style = Util.extend({
            fontColor: "#000000",
            labelAlign: "cm"
        }, style);
        var pt = this.getLocalXY(location);
        var labelWidth = 0;

        if (style.labelXOffset || style.labelYOffset) {
            var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
            var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
            pt[0] += xOffset;
            pt[1] -= yOffset;
        }

        var canvas = document.createElement('canvas');
        canvas.globalAlpha = 0;
        canvas.lineWidth = 1;

        var ctx = canvas.getContext("2d");

        ctx.fillStyle = style.fontColor;
        ctx.globalAlpha = style.fontOpacity || 1.0;
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
            "normal",
            style.fontWeight ? style.fontWeight : "normal",
            style.fontSize ? style.fontSize : "1em",
            style.fontFamily ? style.fontFamily : "sans-serif"
        ].join(" ");
        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        var vfactor, lineHeight, labelWidthTmp;
        if (ctx.fillText) {
            // HTML5
            ctx.font = fontStyle;
            ctx.textAlign = LABEL_ALIGN[style.labelAlign[0]] ||
                "center";
            ctx.textBaseline = LABEL_ALIGN[style.labelAlign[1]] ||
                "middle";
            vfactor = LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            lineHeight = ctx.measureText('Mg').height ||
                ctx.measureText('xx').width;
            pt[1] += lineHeight * vfactor * (numRows - 1);
            for (let i = 0; i < numRows; i++) {
                labelWidthTmp = ctx.measureText(labelRows[i]).width;
                if (labelWidth < labelWidthTmp) {
                    labelWidth = labelWidthTmp;
                }
            }
        } else if (ctx.mozDrawText) {
            // Mozilla pre-Gecko1.9.1 (<FF3.1)
            ctx.mozTextStyle = fontStyle;
            vfactor = LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            lineHeight = ctx.mozMeasureText('xx');
            pt[1] += lineHeight * (1 + (vfactor * numRows));
            for (let i = 0; i < numRows; i++) {
                labelWidthTmp = ctx.measureText(labelRows[i]).width;
                if (labelWidth < labelWidthTmp) {
                    labelWidth = labelWidthTmp;
                }
            }
        }
        var labelInfo = {};
        if (labelWidth) {
            labelInfo.w = labelWidth;
        } else {
            return null;
        }

        labelInfo.h = style.fontSize;
        labelInfo.rows = labelRows.length;

        return labelInfo;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.rotationBounds
     * @description Rotate bounds.
     *
     * @param {ekmap.Bounds} bounds The bounds to be rotated.
     * @param {Object} rotationCenterPoi Rotation center point object, this object contains attribute X (abscissa) and attribute Y (ordinate).
     * @param {number} angle Rotation angle (clockwise).
     *
     * @returns {Array.<Object>} bounds The polygon node array formed after rotation. Is a quadrilateral, shaped like:[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     */
    rotationBounds(bounds, rotationCenterPoi, angle) {
        var ltPoi = new mapboxgl.Point(bounds.left, bounds.top);
        var rtPoi = new mapboxgl.Point(bounds.right, bounds.top);
        var rbPoi = new mapboxgl.Point(bounds.right, bounds.bottom);
        var lbPoi = new mapboxgl.Point(bounds.left, bounds.bottom);

        var ver = [];
        ver.push(this.getRotatedLocation(ltPoi.x, ltPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rtPoi.x, rtPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(rbPoi.x, rbPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));
        ver.push(this.getRotatedLocation(lbPoi.x, lbPoi.y, rotationCenterPoi.x, rotationCenterPoi.y, angle));

        var quad = [];

        for (var i = 0; i < ver.length; i++) {
            quad.push({
                "x": ver[i].x,
                "y": ver[i].y
            });
        }
        quad.push({
            "x": ver[0].x,
            "y": ver[0].y
        });
        return quad;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getRotatedLocation
     * @description Get the position of a point after rotating clockwise around the center of rotation (this method is used for screen coordinates).
     *
     * @param {number} x The abscissa of the rotation point.
     * @param {number} y The ordinate of the rotation point.
     * @param {number} rx The abscissa of the center of rotation.
     * @param {number} ry The ordinate of the center of rotation.
     * @param {number} angle Rotation angle.
     *
     * @returns {Object} The rotated coordinate position object, the object contains attribute X (abscissa) and attribute Y (ordinate).
     */
    getRotatedLocation(x, y, rx, ry, angle) {
        var loc = {},
            x0, y0;

        y = -y;
        ry = -ry;
        angle = -angle;
        x0 = (x - rx) * Math.cos((angle / 180) * Math.PI) - (y - ry) * Math.sin((angle / 180) * Math.PI) + rx;
        y0 = (x - rx) * Math.sin((angle / 180) * Math.PI) + (y - ry) * Math.cos((angle / 180) * Math.PI) + ry;

        loc.x = x0;
        loc.y = -y0;

        return loc;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.getAvoidInfo
     * @description Obtain information about avoidance.
     *
     * @param {ekmap.Bounds} bounds The pixel range of the map.
     * @param {Array.<Object>} quadrilateral An array of quadrilateral nodes. E.g:[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     *
     * @returns {Object} Avoid information.
     */
    getAvoidInfo(bounds, quadrilateral) {
        if (quadrilateral.length !== 5) {
            return null;
        }

        var bounddQuad = [{
                "x": bounds.left,
                "y": bounds.top
            },
            {
                "x": bounds.right,
                "y": bounds.top
            },
            {
                "x": bounds.right,
                "y": bounds.bottom
            },
            {
                "x": bounds.left,
                "y": bounds.bottom
            },
            {
                "x": bounds.left,
                "y": bounds.top
            }
        ];

        var isIntersection = false,
            bqLen = bounddQuad.length,
            quadLen = quadrilateral.length;

        var offsetX = 0,
            offsetY = 0,
            aspectH = "",
            aspectW = "";
        for (var i = 0; i < bqLen - 1; i++) {
            for (var j = 0; j < quadLen - 1; j++) {
                var isLineIn = Util.lineIntersection(bounddQuad[i], bounddQuad[i + 1], quadrilateral[j], quadrilateral[j + 1]);
                if (isLineIn.CLASS_NAME === "ekmap.Geometry.Point") {
                    setInfo(quadrilateral[j]);
                    setInfo(quadrilateral[j + 1]);
                    isIntersection = true;
                }
            }
        }

        if (isIntersection) {
            return {
                "aspectW": aspectW,
                "aspectH": aspectH,
                "offsetX": offsetX,
                "offsetY": offsetY
            };
        } else {
            return null;
        }

        function setInfo(vec) {
            if (!bounds.contains(vec.x, vec.y)) {
                if (vec.y < bounds.top) {
                    let oY = Math.abs(bounds.top - vec.y);
                    if (oY > offsetY) {
                        offsetY = oY;
                        aspectH = "top";
                    }
                }

                if (vec.y > bounds.bottom) {
                    let oY = Math.abs(vec.y - bounds.bottom);
                    if (oY > offsetY) {
                        offsetY = oY;
                        aspectH = "bottom";
                    }
                }

                if (vec.x < bounds.left) {
                    let oX = Math.abs(bounds.left - vec.x);
                    if (oX > offsetX) {
                        offsetX = oX;
                        aspectW = "left";
                    }
                }

                if (vec.x > bounds.right) {
                    let oX = Math.abs(vec.x - bounds.right);
                    if (oX > offsetX) {
                        offsetX = oX;
                        aspectW = "right";
                    }
                }
            }
        }

    }


    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.isQuadrilateralOverLap
     * @description Determine whether the two quadrilaterals have glands.
     * @param {Array.<Object>} quadrilateral An array of quadrilateral nodes. E.g:[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     * @param {Array.<Object>} quadrilateral2 The second quadrilateral node array.
     * @returns {boolean} Whether to cover, true means cover.
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
            for (var j = 0; j < quad2Len - 1; j++) {
                var isLineIn = Util.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "ekmap.Geometry.Point") {
                    OverLap = true;
                    break;
                }
            }
        }

        return OverLap;
    }

    /**
     * @function mapboxgl.ekmap.LabelThemeLayer.prototype.isPointInPoly
     * @description Determine whether a point is inside the polygon. (Ray method)
     *
     * @param {Object} pt The point object to be judged, the object contains the attribute x (abscissa) and attribute y (ordinate).
     * @param {Array.<Object>} poly An array of polygon nodes. For example, a quadrilateral: [{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     * @returns {boolean} Whether the point is inside the polygon.
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
            (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) &&
            (isIn = !isIn);
        }
        return isIn;
    }

}

mapboxgl.ekmap.LabelThemeLayer = Label;