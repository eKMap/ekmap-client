import { Ekmap } from '../Ekmap';
import { Point } from '../commontypes/geometry/Point';
import { MultiPoint } from '../commontypes/geometry/MultiPoint';
import { LinearRing } from '../commontypes/geometry/LinearRing';
import { LineString } from '../commontypes/geometry/LineString';
import { MultiLineString } from '../commontypes/geometry/MultiLineString';
import { Polygon } from '../commontypes/geometry/Polygon';
import { MultiPolygon } from '../commontypes/geometry/MultiPolygon';
import { Util } from '../commontypes/Util';
import { GeometryType } from '../REST';

/**
  * @class Ekmap.ServerGeometry
  * @category eKServer
  * @classdesc The server-side geometric object class. This class describes the characteristic data of geometric objects (vectors) (coordinate point pairs, types of geometric objects, etc.). GIS service functions based on server-side spatial analysis, spatial relationship calculation, and query use server-side geometric objects.
  * @param {Object} options-parameters.
  * @param {string} options.id-The unique identifier of the geometric object on the server.
  * @param {Array.<number>} options.parts-The number of nodes contained in each sub-object in the server geometry object.
  * @param {Array.<Ekmap.Geometry.Point>} options.points-the coordinate pair array of the nodes that make up the geometric object.
  * @param {Ekmap.GeometryType} options.type-the type of geometry object.
*/
export class ServerGeometry {

    constructor(options) {

        /**
         * @member {string} Ekmap.ServerGeometry.prototype.id
         * @description The unique identifier of the geometric object on the server side.
         */
        this.id = 0;

        /**
         * @member {Array.<number>} Ekmap.ServerGeometry.prototype.parts
         * @description The number of nodes contained in each sub-object in the geometric object of the server. <br>
         * 1. Geometric objects can be divided into simple geometric objects and complex geometric objects in terms of structure.
         * The difference between simple geometric objects and complex geometric objects: simple geometric objects are generally single objects,
         * And complex geometric objects are composed of multiple simple objects or generated after certain spatial operations,
         * For example: the rectangle is a simple area object, and the hollow rectangle is a complex area object. <br>
         * 2. Normally, the sub-object of a simple geometric object is itself,
         * Therefore, for simple objects, this field is an integer array of length 1.
         * The value of this field is the number of nodes of this simple object.
         * If a geometric object is composed of several simple objects,
         * For example, an island-shaped geometric object is composed of 3 simple polygons,
         * Then the value of the Parts field of this island-shaped geometric object is an integer array of length 3.
         * The value of each member in the array represents the number of nodes contained in the three polygons.
         */
        this.parts = null;

        /**
         * @member {Array.<Ekmap.Geometry.Point>} Ekmap.ServerGeometry.prototype.points
         * @description An array of coordinate pairs of the nodes that make up the geometric object. <br>
         * 1. All geometric objects (points, lines, surfaces) are composed of some simple point coordinates,
         * This field stores the array of point coordinates composing the geometric object.
         * For a simple area object, the coordinates of its start point and end point are the same. <br>
         * 2. For complex geometric objects, determine the number of nodes corresponding to each simple object that composes the complex geometric object according to the Parts property.
         * So as to determine the attribution of the coordinate pair in the Points field.
         */
        this.points = null;

        /**
         * @member {Ekmap.GeometryType} Ekmap.ServerGeometry.prototype.type
         * @description The type of geometry object (GeometryType).
         */
        this.type = null;

        /**
         * @member {Object} Ekmap.ServerGeometry.prototype.prjCoordSys
         * @description Projection coordinate parameter, which is only valid in buffer analysis now.
         */
        this.prjCoordSys = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.ServerGeometry";
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.destroy
     * @description Release the resource and leave the attribute of the referenced resource blank.
     */
    destroy() {
        var me = this;
        me.id = null;
        me.style = null;
        me.parts = null;
        me.partTopo = null;
        me.points = null;
        me.type = null;
        me.prjCoordSys = null;
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeometry
     * @description Converts the server-side geometric object ServerGeometry to the client-side geometric object Geometry.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeometry() {
        var me = this,
            geoType = me.type;
        switch (geoType.toUpperCase()) {
            case GeometryType.POINT:
                return me.toGeoPoint();
            case GeometryType.LINE:
                return me.toGeoLine();
            case GeometryType.REGION:
                return me.toGeoRegion();
            case GeometryType.POINTEPS:
                return me.toGeoPoint();
            case GeometryType.LINEEPS:
                return me.toGeoLineEPS();
            case GeometryType.REGIONEPS:
                return me.toGeoRegionEPS();
        }
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeoPoint
     * @description converts the point geometry object on the server side to the client side geometry object. Including Point, MultiPoint.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeoPoint() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                return new Point(geoPoints[0].x, geoPoints[0].y);
            } else {
                var pointList = [];
                for (let i = 0; i < len; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
                }
                return new MultiPoint(pointList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeoLine
     * @description Converts the line geometry object on the server side to the client side geometry object. Including LinearRing, LineString, MultiLineString.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeoLine() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                let pointList = [];
                for (let i = 0; i < geoParts[0]; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
                }
                //Determine whether the line is closed, if it is closed, return LinearRing, otherwise return LineString
                if (pointList[0].equals(pointList[geoParts[0] - 1])) {
                    return new LinearRing(pointList);
                } else {
                    return new LineString(pointList);
                }
            } else {
                let lineList = [];
                for (let i = 0; i < len; i++) {
                    let pointList = [];
                    for (let j = 0; j < geoParts[i]; j++) {
                        pointList.push(new Point(geoPoints[j].x, geoPoints[j].y));
                    }
                    lineList.push(new LineString(pointList));
                    geoPoints.splice(0, geoParts[i]);
                }
                return new MultiLineString(lineList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeoLineEPS
     * @description Converts the line geometry object on the server side to the client side geometry object. Including LinearRing, LineString, MultiLineString.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeoLineEPS() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            i,
            j,
            pointList,
            lineList,
            lineEPS,
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                for (i = 0, pointList = []; i < geoParts[0]; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y, geoPoints[i].type));
                }
                //Determine whether the line is closed, if it is closed, return LinearRing, otherwise return LineString
                if (pointList[0].equals(pointList[geoParts[0] - 1])) {
                    lineEPS = LineString.createLineEPS(pointList);
                    return new LinearRing(lineEPS);
                } else {
                    lineEPS = LineString.createLineEPS(pointList);
                    return new LineString(lineEPS);
                }
            } else {
                for (i = 0, lineList = []; i < len; i++) {
                    for (j = 0, pointList = []; j < geoParts[i]; j++) {
                        pointList.push(new Point(geoPoints[j].x, geoPoints[j].y));
                    }
                    lineEPS = LineString.createLineEPS(pointList);
                    lineList.push(new LineString(lineEPS));
                    geoPoints.splice(0, geoParts[i]);
                }
                return new MultiLineString(lineList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeoRegion
     * @description Converts the surface geometry object on the server side to the client side geometry object. The type is Polygon.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeoRegion() {
        var me = this,
            geoParts = me.parts || [],
            geoTopo = me.partTopo || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len <= 0) {
            return null;
        }
        var polygonArray = [];
        var pointList = [];
        if (len == 1) {
            for (let i = 0; i < geoPoints.length; i++) {
                pointList.push(
                    new Point(geoPoints[i].x, geoPoints[i].y))
            }
            polygonArray.push(
                new Polygon(
                    [new LinearRing(pointList)]
                )
            );
            return new MultiPolygon(polygonArray);
        }
        //Handle complex surface
        var CCWArray = [];
        var areaArray = [];
        var polygonArrayTemp = [];
        var polygonBounds = [];
        //Polyon island hole identification array, initially all islands.
        var CCWIdent = [];
        for (let i = 0, pointIndex = 0; i < len; i++) {
            for (let j = 0; j < geoParts[i]; j++) {
                pointList.push(
                    new Point(geoPoints[pointIndex + j].x, geoPoints[pointIndex + j].y)
                );
            }
            pointIndex += geoParts[i];
            var polygon = new Polygon(
                [new LinearRing(pointList)]
            );
            pointList = [];
            polygonArrayTemp.push(polygon);
            if (geoTopo.length === 0) {
                polygonBounds.push(polygon.getBounds());
            }
            CCWIdent.push(1);
            areaArray.push(polygon.getArea());
        }
        //Sort by area
        ServerGeometry.bubbleSort(areaArray, polygonArrayTemp, geoTopo, polygonBounds);
        //eKServer 9D new field
        if (geoTopo.length === 0) {
            //The principle of judging the bottom of the island cave: sort all the sub-objects according to their area, the largest area is directly judged as the island (1), starting from the second largest area,
            // If the object is found in an object whose area is larger than it (that is, contained), then specify its identity (-1 or 1) according to the identity of the object that contains it (1 or -1),
            // After processing all objects in turn, you get an identification array, 1 means island, -1 means hole
            //The target polygon index list -1 indicates that it is not included by any polygon,
            var targetArray = [];
            for (let i = 1; i < polygonArrayTemp.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    targetArray[i] = -1;
                    if (polygonBounds[j].containsBounds(polygonBounds[i])) {
                        CCWIdent[i] = CCWIdent[j] * -1;
                        if (CCWIdent[i] < 0) {
                            targetArray[i] = j;
                        }
                        break;
                    }
                }
            }
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (CCWIdent[i] > 0) {
                    polygonArray.push(polygonArrayTemp[i]);
                } else {
                    polygonArray[targetArray[i]].components = polygonArray[targetArray[i]].components.concat(polygonArrayTemp[i].components);
                    //Occupy
                    polygonArray.push('');
                }
            }
        } else {
            //Sort by area
            //ServerGeometry.bubbleSort(areaArray, polygonArrayTemp,geoTopo);
            polygonArray = new Array();
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (geoTopo[i] && geoTopo[i] == -1) {
                    CCWArray = CCWArray.concat(polygonArrayTemp[i].components);
                } else {
                    if (CCWArray.length > 0 && polygonArray.length > 0) {
                        polygonArray[polygonArray.length - 1].components = polygonArray[polygonArray.length - 1].components.concat(CCWArray);
                        CCWArray = [];
                    }
                    polygonArray.push(
                        polygonArrayTemp[i]
                    );
                }
                if (i == len - 1) {
                    var polyLength = polygonArray.length;
                    if (polyLength) {
                        polygonArray[polyLength - 1].components = polygonArray[polyLength - 1].components.concat(CCWArray);
                    } else {
                        for (let k = 0, length = CCWArray.length; k < length; k++) {
                            polygonArray.push(
                                new Polygon(CCWArray)
                            );
                        }
                    }
                }
            }
        }
        return new MultiPolygon(polygonArray);
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.toGeoRegionEPS
     * @description Converts the surface geometry object on the server side to the client side geometry object. The type is Polygon.
     * @returns {Ekmap.Geometry} The client geometry object after conversion.
     */
    toGeoRegionEPS() {
        var me = this,
            geoParts = me.parts || [],
            geoTopo = me.partTopo || [],
            geoPoints = me.points || [],
            len = geoParts.length;

        if (len <= 0) {
            return null;
        }
        var polygonArray = [];
        var pointList = [];
        var lineEPS;
        if (len == 1) {
            for (var i = 0; i < geoPoints.length; i++) {
                pointList.push(
                    new Point(geoPoints[i].x, geoPoints[i].y))
            }

            lineEPS = LineString.createLineEPS(pointList);
            polygonArray.push(
                new Polygon(
                    [new LinearRing(lineEPS)]
                )
            );
            return new MultiPolygon(polygonArray);
        }
        //Handle complex surface
        var CCWArray = [];
        var areaArray = [];
        var polygonArrayTemp = [];
        var polygonBounds = [];
        //Polyon island hole identification array, initially all islands.
        var CCWIdent = [];
        for (let i = 0, pointIndex = 0; i < len; i++) {
            for (let j = 0; j < geoParts[i]; j++) {
                pointList.push(
                    new Point(geoPoints[pointIndex + j].x, geoPoints[pointIndex + j].y)
                );
            }
            pointIndex += geoParts[i];

            lineEPS = LineString.createLineEPS(pointList);
            var polygon = new Polygon(
                [new LinearRing(lineEPS)]
            );
            pointList = [];
            polygonArrayTemp.push(polygon);
            if (geoTopo.length === 0) {
                polygonBounds.push(polygon.getBounds());
            }
            CCWIdent.push(1);
            areaArray.push(polygon.getArea());
        }
        //Sort by area
        ServerGeometry.bubbleSort(areaArray, polygonArrayTemp, geoTopo, polygonBounds);
        //eKServer 9D new field
        if (geoTopo.length === 0) {
            //The principle of judging the bottom of the island cave: sort all the sub-objects according to their area, the largest area is directly judged as the island (1), starting from the second largest area,
            // If the object is found in an object whose area is larger than it (that is, contained), then specify its identity (-1 or 1) according to the identity of the object that contains it (1 or -1),
            // After processing all objects in turn, you get an identification array, 1 means island, -1 means hole
            //The target polygon index list -1 indicates that it is not included by any polygon,
            var targetArray = [];
            for (let i = 1; i < polygonArrayTemp.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    targetArray[i] = -1;
                    if (polygonBounds[j].containsBounds(polygonBounds[i])) {
                        CCWIdent[i] = CCWIdent[j] * -1;
                        if (CCWIdent[i] < 0) {
                            targetArray[i] = j;
                        }
                        break;
                    }
                }
            }
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (CCWIdent[i] > 0) {
                    polygonArray.push(polygonArrayTemp[i]);
                } else {
                    polygonArray[targetArray[i]].components = polygonArray[targetArray[i]].components.concat(polygonArrayTemp[i].components);
                    //Occupy
                    polygonArray.push('');
                }
            }
        } else {
            //Sort by area
            polygonArray = new Array();
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (geoTopo[i] && geoTopo[i] == -1) {
                    CCWArray = CCWArray.concat(polygonArrayTemp[i].components);
                } else {
                    if (CCWArray.length > 0 && polygonArray.length > 0) {
                        polygonArray[polygonArray.length - 1].components = polygonArray[polygonArray.length - 1].components.concat(CCWArray);
                        CCWArray = [];
                    }
                    polygonArray.push(
                        polygonArrayTemp[i]
                    );
                }
                if (i == len - 1) {
                    var polyLength = polygonArray.length;
                    if (polyLength) {
                        polygonArray[polyLength - 1].components = polygonArray[polyLength - 1].components.concat(CCWArray);
                    } else {
                        for (let k = 0, length = CCWArray.length; k < length; k++) {
                            polygonArray.push(
                                new Polygon(CCWArray)
                            );
                        }
                    }
                }
            }
        }
        return new MultiPolygon(polygonArray);
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.fromJson
     * @description Converts the JSON object that represents the server-side geometric object to ServerGeometry.
     * @param {Object} jsonObject-The JSON object to be converted.
     * @returns {Ekmap.ServerGeometry} The converted ServerGeometry object.
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new ServerGeometry({
            id: jsonObject.id,
            parts: jsonObject.parts,
            partTopo: jsonObject.partTopo,
            points: jsonObject.points,
            center: jsonObject.center,
            length: jsonObject.length,
            maxM: jsonObject.maxM,
            minM: jsonObject.minM,
            type: jsonObject.type
        });

    }

    /**
     * @function Ekmap.ServerGeometry.prototype.fromGeometry
     * @description converts the client-side Geometry into the server-side ServerGeometry.
     * @param {Ekmap.Geometry} geometry-The client Geometry object to be converted.
     * @returns {Ekmap.ServerGeometry} The converted ServerGeometry object.
     */
    static fromGeometry(geometry) {
        if (!geometry) {
            return;
        }
        var id = 0,
            parts = [],
            points = [],
            type = null,
            icomponents = geometry.components,
            className = geometry.CLASS_NAME,
            prjCoordSys = { "epsgCode": geometry.SRID };

        if (!isNaN(geometry.id)) {
            id = geometry.id;
        }
        //It’s impossible to change the cheating method. In order to support the situation plotting, you have to change it when you have time.
        if (className != "Ekmap.Geometry.LinearRing" && className != "Ekmap.Geometry.LineString" && (geometry instanceof MultiPoint || geometry instanceof MultiLineString)) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                let partPointsCount = icomponents[i].getVertices().length;
                parts.push(partPointsCount);
                for (let j = 0; j < partPointsCount; j++) {
                    points.push(new Point(icomponents[i].getVertices()[j].x, icomponents[i].getVertices()[j].y));
                }
            }
            //Here className is not multiple points, it is all counted lines
            type = (className == "Ekmap.Geometry.MultiPoint") ? GeometryType.POINT : GeometryType.LINE;
        } else if (geometry instanceof MultiPolygon) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                let polygon = icomponents[i],
                    linearRingOfPolygon = polygon.components,
                    linearRingOfPolygonLen = linearRingOfPolygon.length;
                for (let j = 0; j < linearRingOfPolygonLen; j++) {
                    let partPointsCount = linearRingOfPolygon[j].getVertices().length + 1;
                    parts.push(partPointsCount);
                    for (let k = 0; k < partPointsCount - 1; k++) {
                        points.push(new Point(linearRingOfPolygon[j].getVertices()[k].x, linearRingOfPolygon[j].getVertices()[k].y));
                    }
                    points.push(new Point(linearRingOfPolygon[j].getVertices()[0].x, linearRingOfPolygon[j].getVertices()[0].y));
                }
            }
            type = GeometryType.REGION;
        } else if (geometry instanceof Polygon) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                let partPointsCount = icomponents[i].getVertices().length + 1;
                parts.push(partPointsCount);
                for (let j = 0; j < partPointsCount - 1; j++) {
                    points.push(new Point(icomponents[i].getVertices()[j].x, icomponents[i].getVertices()[j].y));
                }
                points.push(new Point(icomponents[i].getVertices()[0].x, icomponents[i].getVertices()[0].y));
            }
            type = GeometryType.REGION;
        } else {
            let geometryVerticesCount = geometry.getVertices().length;
            for (let j = 0; j < geometryVerticesCount; j++) {
                points.push(new Point(geometry.getVertices()[j].x, geometry.getVertices()[j].y));
            }
            if (geometry instanceof LinearRing) {
                points.push(new Point(geometry.getVertices()[0].x, geometry.getVertices()[0].y));
                geometryVerticesCount++;
            }
            parts.push(geometryVerticesCount);
            type = (geometry instanceof Point) ? GeometryType.POINT : GeometryType.LINE;
        }

        return new ServerGeometry({
            id: id,
            style: null,
            parts: parts,
            points: points,
            type: type,
            prjCoordSys: prjCoordSys
        });
    }

    /**
     * @function Ekmap.ServerGeometry.prototype.IsClockWise
     * @description Determines the order of points in linearRing. The return value is greater than 0, counterclockwise; less than 0, clockwise.
     * @param {Ekmap.Geometry} geometry-The client Geometry object to be converted.
     * @returns {number} The return value is greater than 0, counterclockwise; less than 0, clockwise.
     */
    static IsClockWise(points) {
        var length = points.length;
        if (length < 3) {
            return 0.0;
        }
        var s = points[0].y * (points[length - 1].x - points[1].x);
        points.push(points[0]);
        for (var i = 1; i < length; i++) {
            s += points[i].y * (points[i - 1].x - points[i + 1].x);
        }
        return s * 0.5;
    }

    static bubbleSort(areaArray, pointList, geoTopo, polygonBounds) {
        for (var i = 0; i < areaArray.length; i++) {
            for (var j = 0; j < areaArray.length; j++) {
                if (areaArray[i] > areaArray[j]) {
                    var d = areaArray[j];
                    areaArray[j] = areaArray[i];
                    areaArray[i] = d;
                    var b = pointList[j];
                    pointList[j] = pointList[i];
                    pointList[i] = b;
                    if (geoTopo && geoTopo.length > 0) {
                        var c = geoTopo[j];
                        geoTopo[j] = geoTopo[i];
                        geoTopo[i] = c;
                    }
                    if (polygonBounds && polygonBounds.length > 0) {
                        var f = polygonBounds[j];
                        polygonBounds[j] = polygonBounds[i];
                        polygonBounds[i] = f;
                    }
                }
            }
        }
    }

}

Ekmap.ServerGeometry = ServerGeometry;