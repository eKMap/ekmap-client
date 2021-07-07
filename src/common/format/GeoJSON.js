import {
    Ekmap
} from '../Ekmap';
import {
    Vector
} from '../commontypes/Vector';
import {
    Util
} from '../commontypes/Util';
import {
    Bounds
} from '../commontypes/Bounds';
import {
    Collection
} from '../commontypes/geometry/Collection';
import {
    JSONFormat
} from './JSON';
import {
    Point
} from '../commontypes/geometry/Point';
import {
    MultiPoint
} from '../commontypes/geometry/MultiPoint';
import {
    LineString
} from '../commontypes/geometry/LineString';
import {
    MultiLineString
} from '../commontypes/geometry/MultiLineString';
import {
    LinearRing
} from '../commontypes/geometry/LinearRing';
import {
    Polygon
} from '../commontypes/geometry/Polygon';
import {
    MultiPolygon
} from '../commontypes/geometry/MultiPolygon';
import {
    ServerGeometry
} from '../eKServer/ServerGeometry';

/**
 * @class Ekmap.Format.GeoJSON
 * @classdesc GeoJSON reading and writing. Use the {@link Ekmap.Format.GeoJSON} constructor to create a GeoJSON parser.
 * @category BaseTypes Format
 * @param {Object} [options] parameters.
 * @param {string} [options.indent=" "] used to format the output, the indent string will be used once for each indentation.
 * @param {string} [options.space=" "] used to format the output, the space string will be added after the ":" in the name-value pair.
 * @param {string} [options.newline="\n"] used to format the output, the newline string will be used at the end of each name-value pair or array item.
 * @param {number} [options.level=0] used to format the output, indicating the indentation level.
 * @param {boolean} [options.pretty=false] Whether to use extra space control structure when serializing. Used in the write method.
 * @param {boolean} [options.nativeJSON] The listener object that needs to be registered.
 * @param {boolean} [options.ignoreExtraDims=true] Ignore geometric features whose dimensions exceed 2.
 * @extends {Ekmap.Format.JSON}
 */
export class GeoJSON extends JSONFormat {

    constructor(options) {
        super(options);
       
        this.ignoreExtraDims = true;

        this.CLASS_NAME = "Ekmap.Format.GeoJSON";
        
        this.parseCoords = {
          
            "point": function(array) {
                if (this.ignoreExtraDims === false &&
                    array.length != 2) {
                    throw "Only 2D points are supported: " + array;
                }
                return new Point(array[0], array[1]);
            },

         
            "multipoint": function(array) {
                var points = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["point"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    points.push(p);
                }
                return new MultiPoint(points);
            },

            "linestring": function(array) {
                var points = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["point"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    points.push(p);
                }
                return new LineString(points);
            },

            "multilinestring": function(array) {
                var lines = [];
                var l = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        l = this.parseCoords["linestring"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    lines.push(l);
                }
                return new MultiLineString(lines);
            },

            "polygon": function(array) {
                var rings = [];
                var r, l;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        l = this.parseCoords["linestring"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    r = new LinearRing(l.components);
                    rings.push(r);
                }
                return new Polygon(rings);
            },

            "multipolygon": function(array) {
                var polys = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["polygon"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    polys.push(p);
                }
                return new MultiPolygon(polys);
            },

            "box": function(array) {
                if (array.length != 2) {
                    throw "GeoJSON box coordinates must have 2 elements";
                }
                return new Polygon([
                    new LinearRing([
                        new Point(array[0][0], array[0][1]),
                        new Point(array[1][0], array[0][1]),
                        new Point(array[1][0], array[1][1]),
                        new Point(array[0][0], array[1][1]),
                        new Point(array[0][0], array[0][1])
                    ])
                ]);
            }

        };
        this.extract = {
            'feature': function(feature) {
                var geom = this.extract.geometry.apply(this, [feature.geometry]);
                var json = {
                    "type": "Feature",
                    "properties": this.createAttributes(feature),
                    "geometry": geom
                };

                if (feature.geometry && feature.geometry.type === 'TEXT') {
                    json.properties.texts = feature.geometry.texts;
                    json.properties.textStyle = feature.geometry.textStyle;
                }
                if (feature.fid) {
                    json.id = feature.fid;
                }
                if (feature.ID) {
                    json.id = feature.ID;
                }
                return json;
            },
            'geometry': function(geometry) {
                if (geometry == null) {
                    return null;
                }
                if (!geometry.parts && geometry.points) {
                    geometry.parts = [geometry.points.length];
                }
                var geo = new ServerGeometry(geometry).toGeometry() || geometry;
                var geometryType = geo.geometryType || geo.type;
                var data;
                if (geometryType === "LinearRing") {
                    geometryType = "LineString";
                }
                if (geometryType === "LINEM") {
                    geometryType = "MultiLineString";
                }
                data = this.extract[geometryType.toLowerCase()].apply(this, [geo]);
                geometryType = geometryType === 'TEXT' ? 'Point' : geometryType;
                var json;
                if (geometryType === "Collection") {
                    json = {
                        "type": "GeometryCollection",
                        "geometries": data
                    };
                } else {
                    json = {
                        "type": geometryType,
                        "coordinates": data
                    };
                }
                return json;
            },

            'point': function(point) {
                var p = [point.x, point.y];
                for (var name in point) {
                    if (name !== "x" && name !== "y" && point[name] !== null && !isNaN(point[name])) {
                        p.push(point[name]);
                    }
                }
                return p;
            },

            'text': function(geo) {
                return [geo.points[0].x, geo.points[0].y];
            },

            'multipoint': function(multipoint) {
                var array = [];
                for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [multipoint.components[i]]));
                }
                return array;
            },

            'linestring': function(linestring) {
                var array = [];
                for (var i = 0, len = linestring.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [linestring.components[i]]));
                }
                return array;
            },

            'multilinestring': function(multilinestring) {
                var array = [];
                for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [multilinestring.components[i]]));
                }
                return array;
            },

            'polygon': function(polygon) {
                var array = [];
                for (var i = 0, len = polygon.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [polygon.components[i]]));
                }
                return array;
            },

            'multipolygon': function(multipolygon) {
                var array = [];
                for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                    array.push(this.extract.polygon.apply(this, [multipolygon.components[i]]));
                }
                return array;
            },

            'collection': function(collection) {
                var len = collection.components.length;
                var array = new Array(len);
                for (var i = 0; i < len; ++i) {
                    array[i] = this.extract.geometry.apply(this, [collection.components[i]]);
                }
                return array;
            }
        };
    }

    read(json, type, filter) {
        type = (type) ? type : "FeatureCollection";
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = super.read(json, filter);
        } else {
            obj = json;
        }
        if (!obj) {
            //Ekmap.Console.error("Bad JSON: " + json);
        } else if (typeof(obj.type) != "string") {
            //Ekmap.Console.error("Bad GeoJSON - no type: " + json);
        } else if (this.isValidType(obj, type)) {
            switch (type) {
                case "Geometry":
                    try {
                        results = this.parseGeometry(obj);
                    } catch (err) {
                        //Ekmap.Console.error(err);
                    }
                    break;
                case "Feature":
                    try {
                        results = this.parseFeature(obj);
                        results.type = "Feature";
                    } catch (err) {
                        //Ekmap.Console.error(err);
                    }
                    break;
                case "FeatureCollection":
                    // for type FeatureCollection, we allow input to be any type
                    results = [];
                    switch (obj.type) {
                        case "Feature":
                            try {
                                results.push(this.parseFeature(obj));
                            } catch (err) {
                                results = null;
                                //Ekmap.Console.error(err);
                            }
                            break;
                        case "FeatureCollection":
                            for (var i = 0, len = obj.features.length; i < len; ++i) {
                                try {
                                    results.push(this.parseFeature(obj.features[i]));
                                } catch (err) {
                                    results = null;
                                    // Ekmap.Console.error(err);
                                }
                            }
                            break;
                        default:
                            try {
                                var geom = this.parseGeometry(obj);
                                results.push(new Vector(geom));
                            } catch (err) {
                                results = null;
                                //Ekmap.Console.error(err);
                            }
                    }
                    break;
                default:
                    break;
            }
        }
        return results;
    }

    write(obj, pretty) {
            return super.write(this.toGeoJSON(obj), pretty);
        }
      
    fromGeoJSON(json, type, filter) {
        let feature = this.read(json, type, filter);
        if (!Util.isArray(feature)) {
            return this._toiSevrerFeature(feature);
        }
        return feature.map((element) => {
            return this._toiSevrerFeature(element);
        })
    }

    toGeoJSON(obj) {
            var geojson = {
                "type": null
            };
            if (Util.isArray(obj)) {
                geojson.type = "FeatureCollection";
                var numFeatures = obj.length;
                geojson.features = new Array(numFeatures);
                for (var i = 0; i < numFeatures; ++i) {
                    var element = obj[i];
                    if (isGeometry(element)) {
                        let feature = {};
                        feature.geometry = element;
                        geojson.features[i] = this.extract.feature.apply(this, [feature]);
                    } else {
                        geojson.features[i] = this.extract.feature.apply(this, [element]);
                    }
                }
            } else if (isGeometry(obj)) {
                let feature = {};
                feature.geometry = obj;
                geojson = this.extract.feature.apply(this, [feature]);
            } else {
                geojson = this.extract.feature.apply(this, [obj]);
            }

            function isGeometry(input) {
                return input.hasOwnProperty("parts") && input.hasOwnProperty("points");
            }

            return geojson;

        }
   
    isValidType(obj, type) {
        var valid = false;
        switch (type) {
            case "Geometry":
                if (Util.indexOf(
                        ["Point", "MultiPoint", "LineString", "MultiLineString",
                            "Polygon", "MultiPolygon", "Box", "GeometryCollection"
                        ],
                        obj.type) == -1) {
                    // unsupported geometry type
                    //Ekmap.Console.error("Unsupported geometry type: " +
                    // obj.type);
                } else {
                    valid = true;
                }
                break;
            case "FeatureCollection":
                // allow for any type to be converted to a feature collection
                valid = true;
                break;
            default:
                // for Feature types must match
                if (obj.type == type) {
                    valid = true;
                } else {
                    //Ekmap.Console.error("Cannot convert types from " +
                    //obj.type + " to " + type);
                }
        }
        return valid;
    }

    parseFeature(obj) {
        var feature, geometry, attributes, bbox;
        attributes = (obj.properties) ? obj.properties : {};
        bbox = (obj.geometry && obj.geometry.bbox) || obj.bbox;
        try {
            geometry = this.parseGeometry(obj.geometry);
        } catch (err) {
            // deal with bad geometries
            throw err;
        }
        feature = new Vector(geometry, attributes);
        if (bbox) {
            feature.bounds = Bounds.fromArray(bbox);
        }
        if (obj.id) {
            feature.fid = obj.id;
        }
        return feature;
    }

    parseGeometry(obj) {
        if (obj == null) {
            return null;
        }
        var geometry;
        if (obj.type == "GeometryCollection") {
            if (!(Util.isArray(obj.geometries))) {
                throw "GeometryCollection must have geometries array: " + obj;
            }
            var numGeom = obj.geometries.length;
            var components = new Array(numGeom);
            for (var i = 0; i < numGeom; ++i) {
                components[i] = this.parseGeometry.apply(
                    this, [obj.geometries[i]]
                );
            }
            geometry = new Collection(components);
        } else {
            if (!(Util.isArray(obj.coordinates))) {
                throw "Geometry must have coordinates array: " + obj;
            }
            if (!this.parseCoords[obj.type.toLowerCase()]) {
                throw "Unsupported geometry type: " + obj.type;
            }
            try {
                geometry = this.parseCoords[obj.type.toLowerCase()].apply(
                    this, [obj.coordinates]
                );
            } catch (err) {
                // deal with bad coordinates
                throw err;
            }
        }
        return geometry;
    }

    createCRSObject(object) {
        var proj = object.layer.projection.toString();
        var crs = {};
        if (proj.match(/epsg:/i)) {
            var code = parseInt(proj.substring(proj.indexOf(":") + 1));
            if (code == 4326) {
                crs = {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                };
            } else {
                crs = {
                    "type": "name",
                    "properties": {
                        "name": "EPSG:" + code
                    }
                };
            }
        }
        return crs;
    }
    _toiSevrerFeature(feature) {
        const attributes = feature.attributes;
        const attrNames = [];
        const attrValues = [];
        for (var attr in attributes) {
            attrNames.push(attr);
            attrValues.push(attributes[attr]);
        }
        const newFeature = {
            fieldNames: attrNames,
            fieldValues: attrValues,
            geometry: ServerGeometry.fromGeometry(feature.geometry)
        };
        newFeature.geometry.id = feature.fid;
        return newFeature;
    }
    createAttributes(feature) {
        if (!feature) {
            return null;
        }
        var attr = {};
        processFieldsAttributes(feature, attr);
        var exceptKeys = ["fieldNames", "fieldValues", "geometry", "stringID", "ID"];
        for (var key in feature) {
            if (exceptKeys.indexOf(key) > -1) {
                continue;
            }
            attr[key] = feature[key];
        }

        function processFieldsAttributes(feature, attributes) {
            if (!(feature.hasOwnProperty("fieldNames") && feature.hasOwnProperty("fieldValues"))) {
                return;
            }
            var names = feature.fieldNames,
                values = feature.fieldValues;
            for (var i in names) {
                attributes[names[i]] = values[i];
            }
        }

        return attr;
    }
}

Ekmap.Format.GeoJSON = GeoJSON;