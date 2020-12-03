export class Parse {
    static arcgisToGeoJSON(arcgis, idAttribute) {
        var geojson = {};

        if (arcgis.features) {
            geojson.type = 'FeatureCollection';
            geojson.features = [];
            for (var i = 0; i < arcgis.features.length; i++) {
                geojson.features.push(arcgisToGeoJSON(arcgis.features[i], idAttribute));
            }
        }

        if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
            geojson.type = 'Point';
            geojson.coordinates = [arcgis.x, arcgis.y];
            if (typeof arcgis.z === 'number') {
                geojson.coordinates.push(arcgis.z);
            }
        }

        if (arcgis.points) {
            geojson.type = 'MultiPoint';
            geojson.coordinates = arcgis.points.slice(0);
        }

        if (arcgis.paths) {
            if (arcgis.paths.length === 1) {
                geojson.type = 'LineString';
                geojson.coordinates = arcgis.paths[0].slice(0);
            } else {
                geojson.type = 'MultiLineString';
                geojson.coordinates = arcgis.paths.slice(0);
            }
        }

        if (arcgis.rings) {
            geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
        }

        if (
            typeof arcgis.xmin === 'number' &&
            typeof arcgis.ymin === 'number' &&
            typeof arcgis.xmax === 'number' &&
            typeof arcgis.ymax === 'number'
        ) {
            geojson.type = 'Polygon';
            geojson.coordinates = [[
                [arcgis.xmax, arcgis.ymax],
                [arcgis.xmin, arcgis.ymax],
                [arcgis.xmin, arcgis.ymin],
                [arcgis.xmax, arcgis.ymin],
                [arcgis.xmax, arcgis.ymax]
            ]];
        }

        if (arcgis.geometry || arcgis.attributes) {
            geojson.type = 'Feature';
            geojson.geometry = (arcgis.geometry) ? arcgisToGeoJSON(arcgis.geometry) : null;
            geojson.properties = (arcgis.attributes) ? shallowClone(arcgis.attributes) : null;
            if (arcgis.attributes) {
                try {
                    geojson.id = getId(arcgis.attributes, idAttribute);
                } catch (err) {
                    // don't set an id
                }
            }
        }

        // if no valid geometry was encountered
        if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
            geojson.geometry = null;
        }

        if (
            arcgis.spatialReference &&
            arcgis.spatialReference.wkid &&
            arcgis.spatialReference.wkid !== 4326
        ) {
            console.warn('Object converted in non-standard crs - ' + JSON.stringify(arcgis.spatialReference));
        }

        return geojson;
    }

    static geojsonToArcGIS(geojson, idAttribute) {
        idAttribute = idAttribute || 'OBJECTID';
        var spatialReference = { wkid: 4326 };
        var result = {};
        var i;
        var geojson = geojson;
        switch (geojson.type) {
            case 'Point':
                result.x = geojson.coordinates[0];
                result.y = geojson.coordinates[1];
                result.spatialReference = spatialReference;
                break;
            case 'MultiPoint':
                result.points = geojson.coordinates.slice(0);
                result.spatialReference = spatialReference;
                break;
            case 'LineString':
                result.paths = [geojson.coordinates.slice(0)];
                result.spatialReference = spatialReference;
                break;
            case 'MultiLineString':
                result.paths = geojson.coordinates.slice(0);
                result.spatialReference = spatialReference;
                break;
            case 'Polygon':
                result.rings = orientRings(geojson.coordinates.slice(0));
                result.spatialReference = spatialReference;
                break;
            case 'MultiPolygon':
                result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));
                result.spatialReference = spatialReference;
                break;
            case 'Feature':
                if (geojson.geometry && geojson.geometry.type != 'Polyline') {
                    result.geometry = this.geojsonToArcGIS(geojson.geometry, idAttribute);
                }
                if (geojson.properties) 
                    result.attributes = (geojson.properties) ? this.shallowClone(geojson.properties) : {};
                //if (geojson.id)
                //    result.attributes[idAttribute] = geojson.id;
                break;
            case 'FeatureCollection':
                result = [];
                for (i = 0; i < geojson.features.length; i++) {
                    result.push(this.geojsonToArcGIS(geojson.features[i], idAttribute));
                }
                break;
            case 'GeometryCollection':
                result = [];
                for (i = 0; i < geojson.geometries.length; i++) {
                    result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
                }
                break;
        }
        return result;
    }

    static shallowClone(obj) {
        var target = {};
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                target[i] = obj[i];
            }
        }
        return target;
    }
}

mapboxgl.ekmap.Parse = Parse;
