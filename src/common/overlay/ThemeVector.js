import { Ekmap } from '../Ekmap';
import { Geometry } from '../commontypes/Geometry';
import { Util as CommonUtil } from '../commontypes/Util';
import { Theme } from './feature/Theme';
import { Rectangle } from '../commontypes/geometry/Rectangle';
import { Point } from '../commontypes/geometry/Point';
import { Collection } from '../commontypes/geometry/Collection';
import { MultiPoint } from '../commontypes/geometry/MultiPoint';
import { LineString } from '../commontypes/geometry/LineString';
import { MultiLineString } from '../commontypes/geometry/MultiLineString';
import { LinearRing } from '../commontypes/geometry/LinearRing';
import { Polygon } from '../commontypes/geometry/Polygon';
import { MultiPolygon } from '../commontypes/geometry/MultiPolygon';
import { Curve } from '../commontypes/geometry/Curve';
import { GeoText } from '../commontypes/geometry/GeoText';
import { SmicPoint } from './levelRenderer/SmicPoint';
import { SmicBrokenLine } from './levelRenderer/SmicBrokenLine';
import { SmicText } from './levelRenderer/SmicText';
import { SmicRectangle } from './levelRenderer/SmicRectangle';
import { SmicPolygon } from './levelRenderer/SmicPolygon';
import { LonLat } from '../commontypes/LonLat';

export class ThemeVector extends Theme {

    constructor(data, layer, style, options, shapeOptions) {
        super(data, layer);
        if (!data.geometry) {
            return;
        }
        if (!(data.geometry instanceof Geometry)) {
            return;
        }
       
        this.dataBounds = data.geometry.getBounds();
      
        this.nodesClipPixel = 2;

        this.isHoverAble = true;

        this.isMultiHover = true;

        this.isClickAble = true;

        this.highlightStyle = null;

        this.shapeOptions = {};

        this.style = style || {};


        this.CLASS_NAME = "Ekmap.Feature.Theme.Vector";
        this.style = style ? style : {};
        if (options) {
            CommonUtil.copyAttributesWithClip(this, options, ["shapeOptions", "dataBounds"])
        }
        if (shapeOptions) {
            CommonUtil.copyAttributesWithClip(this.shapeOptions, shapeOptions);
        }

        var geometry = data.geometry;
        this.lonlat = this.dataBounds.getCenterLonLat();
        this.location = this.getLocalXY(this.lonlat);

        if (geometry instanceof LinearRing) {
            this.lineToTF(geometry);
        } else if (geometry instanceof LineString) {
            this.lineToTF(geometry);
        } else if (geometry instanceof Curve) {
        } else if (geometry instanceof MultiPoint) {
            this.multiPointToTF(geometry);
        } else if (geometry instanceof MultiLineString) {
            this.multiLineStringToTF(geometry);
        } else if (geometry instanceof MultiPolygon) {
            this.multiPolygonToTF(geometry);
        } else if (geometry instanceof Polygon) {
            this.polygonToTF(geometry);
        } else if (geometry instanceof Collection) {
        } else if (geometry instanceof Point) {
            this.pointToTF(geometry);
        } else if (geometry instanceof Rectangle) {
            this.rectangleToTF(geometry);
        } else if (geometry instanceof GeoText) {
            this.geoTextToTF(geometry);
        }

    }

    destroy() {
        this.style = null;
        this.dataBounds = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.highlightStyle = null;
        this.shapeOptions = null;
        super.destroy();
    }

    lineToTF(geometry) {
        var components = geometry.components;
        var localLX = [];
        var refLocal = [];
        var location = this.location;
        var pointList = [];
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            pointList.push(refLocal);
        }

        if (pointList.length < 2) {
            return null;
        }

        var style = new Object();
        style = CommonUtil.copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        var shape = new SmicBrokenLine({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        shape.refOriginalPosition = this.location;

        shape.refDataID = this.data.id;

        shape.isHoverByRefDataID = this.isMultiHover;

        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    multiPointToTF(geometry) {

        var components = geometry.components;

        var localLX = [];
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            pointList.push(refLocal);

            var style = new Object();
            style.r = 6;
            style = CommonUtil.copyAttributesWithClip(style, this.style);
            style.x = refLocal[0];
            style.y = refLocal[1];

            var shape = new SmicPoint({
                style: style,
                clickable: this.isClickAble,
                hoverable: this.isHoverAble
            });

            if (this.highlightStyle) {
                shape.highlightStyle = this.highlightStyle;
            }

            shape.refOriginalPosition = location;

            shape.refDataID = this.data.id;

            shape.isHoverByRefDataID = this.isMultiHover;
            if (this.shapeOptions) {
                CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
            }

            this.shapes.push(shape);
        }
    }

    multiLineStringToTF(geometry) {
        var components = geometry.components;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            this.lineToTF(components_i);
        }
    }

    multiPolygonToTF(geometry) {
        var components = geometry.components;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            this.polygonToTF(components_i);
        }
    }

    pointToTF(geometry) {
        var location = this.location;
        var localLX = this.getLocalXY(geometry);

        var style = new Object();
        style.r = 6;
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        style.x = localLX[0] - location[0];
        style.y = localLX[1] - location[1];

        var shape = new SmicPoint({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        shape.refOriginalPosition = location;

        shape.refDataID = this.data.id;

        shape.isHoverByRefDataID = this.isMultiHover;

        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    polygonToTF(geometry) {
        var components = geometry.components;
        var localLX = [];
        var refLocal = [];
        var location = this.location;
        var pointList = [];
        var holePolygonPointList = [];
        var holePolygonPointLists = [];

        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i].components;


            if (i === 0) {
                pointList = [];

                for (var j = 0; j < components_i.length; j++) {
                    refLocal = [];
                    localLX = this.getLocalXY(components_i[j]);

                    refLocal[0] = localLX[0] - location[0];
                    refLocal[1] = localLX[1] - location[1];

                    if (pointList.length > 0) {
                        var lastLocalXY = pointList[pointList.length - 1];
                        if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                            continue;
                        }
                    }

                    pointList.push(refLocal);
                }
            } else {
                holePolygonPointList = [];

                for (var k = 0; k < components_i.length; k++) {
                    refLocal = [];
                    localLX = this.getLocalXY(components_i[k]);

                    refLocal[0] = localLX[0] - location[0];
                    refLocal[1] = localLX[1] - location[1];

                    if (holePolygonPointList.length > 0) {
                        var lastXY = holePolygonPointList[holePolygonPointList.length - 1];
                        if ((Math.abs(lastXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastXY[1] - refLocal[1]) <= nCPx)) {
                            continue;
                        }
                    }

                    holePolygonPointList.push(refLocal);
                }
            }

            if (holePolygonPointList.length < 2) {
                continue;
            }

            holePolygonPointLists.push(holePolygonPointList);
        }

        if (pointList.length < 2) {
            return;
        }
        var style = {};
        style = CommonUtil.copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        var shape = new SmicPolygon({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        shape.refOriginalPosition = this.location;

        shape.refDataID = this.data.id;

        shape.isHoverByRefDataID = this.isMultiHover;

        if (holePolygonPointLists.length > 0) {
            shape.holePolygonPointLists = holePolygonPointLists;
        }
        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    rectangleToTF(geometry) {
        var location = this.location;
        var ll = new LonLat(geometry.x, geometry.y);

        var res = this.layer.map.getResolution();

        var localLX = this.getLocalXY(ll);

        var style = new Object();
        style.r = 6;
        style = CommonUtil.copyAttributesWithClip(style, this.style);
        style.x = localLX[0] - location[0];
        style.y = (localLX[1] - location[1]) - 2 * geometry.width / res;
        style.width = geometry.width / res;
        style.height = geometry.height / res;

        var shape = new SmicRectangle({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        shape.refOriginalPosition = location;

        shape.refDataID = this.data.id;

        shape.isHoverByRefDataID = this.isMultiHover;

        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    geoTextToTF(geometry) {
        var location = this.location;
        var localLX = this.getLocalXY(geometry);

        var style = new Object();
        style.r = 6;
        style = CommonUtil.copyAttributesWithClip(style, this.style, ["x", "y", "text"]);
        style.x = localLX[0] - location[0];
        style.y = localLX[1] - location[1];
        style.text = geometry.text;

        var shape = new SmicText({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        shape.refOriginalPosition = location;

        shape.refDataID = this.data.id;

        shape.isHoverByRefDataID = this.isMultiHover;

        if (this.shapeOptions) {
            CommonUtil.copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    updateAndAddShapes() {
        var newLocalLX = this.getLocalXY(this.lonlat);
        this.location = newLocalLX;

        var render = this.layer.renderer;
        for (var i = 0, len = this.shapes.length; i < len; i++) {
            var shape = this.shapes[i];
            shape.refOriginalPosition = newLocalLX;
            render.addShape(shape);
        }
    }

    getShapesCount() {
        return this.shapes.length;
    }

    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }

}

Ekmap.Feature.Theme.ThemeVector = ThemeVector;