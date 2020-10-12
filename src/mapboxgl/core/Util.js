import mapboxgl from "mapbox-gl";
import "../core/Base";
import { Parse } from "../core/Parse";
/**
 * @class mapboxgl.ekmap.Util
 * @category BaseType Util
 * @classdesc The tool class.
 */
export class Util {

    static isNumber(value) {
        if (value === "") {
            return false;
        }
        let mdata = Number(value);
        if (mdata === 0) {
            return true;
        }
        return !isNaN(mdata);
    }

    static isString(str) {
        return (typeof str === 'string') && str.constructor === String;
    }
    
    static newGuid(attr) {
        let len = attr || 32;
        let guid = "";
        for (let i = 1; i < len; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    }
    
    static hexToRgba(hex, opacity) {
        var color = [],
            rgba = [];
        hex = hex.replace(/#/, "");
        if (hex.length == 3) {
            var tmp = [];
            for (let i = 0; i < 3; i++) {
                tmp.push(hex.charAt(i) + hex.charAt(i));
            }
            hex = tmp.join("");
        }
        for (let i = 0; i < 6; i += 2) {
            color[i] = "0x" + hex.substr(i, 2);
            rgba.push(parseInt(Number(color[i])));
        }
        rgba.push(opacity);
        return "rgba(" + rgba.join(",") + ")";
    }

    static bind(fn, obj) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    }

    static serialize(params) {
        var data = '';
        var i = 0;
        params.f = params.f || 'json';
        for (var key in params) {
            i++;
            if (params.hasOwnProperty(key)) {
                var param = params[key];
                var type = Object.prototype.toString.call(param);
                var value;

                if (data.length) {
                    data += '&';
                }
                if (type === '[object Array]') {
                    value = (Object.prototype.toString.call(param[0]) === '[object Object]') ? JSON.stringify(param) : param.join(',');
                } else if (type === '[object Object]') {
                    value = JSON.stringify(param);
                } else if (type === '[object Date]') {
                    value = param.valueOf();
                } else {
                    value = param;
                }
                data += encodeURIComponent(key) + '=' + value;
            }
        }
        return data;
    }

    static _setGeometry(geometry) {
        var params = {
            geometry: null,
            geometryType: null
        };
        if (geometry instanceof mapboxgl.LngLat) {
            geometry = {
                type: 'Point',
                coordinates: [geometry.lng, geometry.lat] 
            };
        }

        if (geometry instanceof mapboxgl.LngLatBounds) {
            // set geometry + geometryType
            params.geometry = this.boundsToExtent(geometry);
            params.geometryType = 'esriGeometryEnvelope';
            return params;
        }

        // confirm that our GeoJSON is a point, line or polygon
        if (geometry.type === 'Point' || geometry.type === 'LineString' || geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
            params.geometry = Parse.geojsonToArcGIS(geometry);
            params.geometryType = this.geojsonTypeToArcGIS(geometry.type);
            return params;
        }

        // convert L.Marker > L.LatLng
        if (geometry.getLatLng) {
            geometry = geometry.getLatLng();
        }
        // handle L.GeoJSON, pull out the first geometry
        //if (geometry instanceof GeoJSON) {
        //    // reassign geometry to the GeoJSON value  (we are assuming that only one feature is present)
        //    geometry = geometry.getLayers()[0].feature.geometry;
        //    params.geometry = geojsonToArcGIS(geometry);
        //    params.geometryType = geojsonTypeToArcGIS(geometry.type);
        //}

        // Handle L.Polyline and L.Polygon
        //if (geometry.toGeoJSON) {
        //    geometry = geometry.toGeoJSON();
        //}

        // handle GeoJSON feature by pulling out the geometry
        if (geometry.type === 'Feature') {
            // get the geometry of the geojson feature
            geometry = geometry.geometry;
        }
      
    }

    static boundsToExtent(bounds) {
        return {
            'xmin': bounds.getSouthWest().lng,
            'ymin': bounds.getSouthWest().lat,
            'xmax': bounds.getNorthEast().lng,
            'ymax': bounds.getNorthEast().lat,
            'spatialReference': {
                'wkid': 4326
            }
        };
    }

    static geojsonTypeToArcGIS(geoJsonType) {
        var arcgisGeometryType;
        switch (geoJsonType) {
            case 'Point':
                arcgisGeometryType = 'esriGeometryPoint';
                break;
            case 'MultiPoint':
                arcgisGeometryType = 'esriGeometryMultipoint';
                break;
            case 'LineString':
                arcgisGeometryType = 'esriGeometryPolyline';
                break;
            case 'MultiLineString':
                arcgisGeometryType = 'esriGeometryPolyline';
                break;
            case 'Polygon':
                arcgisGeometryType = 'esriGeometryPolygon';
                break;
            case 'MultiPolygon':
                arcgisGeometryType = 'esriGeometryPolygon';
                break;
        }

        return arcgisGeometryType;
    }

    static isArray(obj) {
        return (Object.prototype.toString.call(obj) === '[object Array]');
    };

    static setOptions(obj, options) {
        if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
            obj.options = obj.options ? create(obj.options) : {};
        }
        for (var i in options) {
            obj.options[i] = options[i];
        }
        return obj.options;
    }

    static getUrlParams(options) {
        if (options.url.indexOf('?') !== -1) {
            options.requestParams = options.requestParams || {};
            var queryString = options.url.substring(options.url.indexOf('?') + 1);
            options.url = options.url.split('?')[0];
            options.requestParams = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        }
        options.url = this.cleanUrl(options.url.split('?')[0]);
        return options;
    }

    static getUrl(options) {
        if (options.url.indexOf('/0') != '-1') 
            option.url = options.url.split('/0').join('');
        if (options.url.indexOf('/1') != '-1')
            option.url = options.url.split('/1').join('');
        if (options.url.indexOf('/2') != '-1')
            option.url = options.url.split('/2').join('');
        if (options.url.indexOf('/3') != '-1')
            option.url = options.url.split('/3').join('');
        return options;
    }

    static getUrlsParams(options) {
        var string = options.urls.split(".")[0];
        var indexCut = string.indexOf("{") - 1;
        var stringCut = string.split(string[indexCut])[2];
        var urls = [];
        for (var i = stringCut[1]; i <= stringCut[3]; i++)
            urls.push(options.urls.split(stringCut).join(i));
        options.urls = urls
        return options;
    }

    static cleanUrl(url) {
        // trim leading and trailing spaces, but not spaces inside the url
        // add a trailing slash to the url if the user omitted it
        if (url[url.length - 1] !== '/') {
            url += '/';
        }
        return url;
    }

    static splitWords(str) {
        return this.trim(str).split(/\s+/);
    }

    static trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }



    // @function stamp(obj: Object): Number
    // Returns the unique ID of an object, assigning it one if it doesn't have it.
    static stamp(obj) {
        /*eslint-disable */
        var lastId = 0;
        obj._leaflet_id = obj._leaflet_id || ++lastId;
        return obj._leaflet_id;
        /* eslint-enable */
    }

    static bind(fn, obj) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    }

    static cancelAnimFrame(id) {
        var cancelFn = window.cancelAnimationFrame || this.getPrefixed('CancelAnimationFrame') ||
            this.getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };
        if (id) {
            cancelFn.call(window, id);
        }
    }

    static getPrefixed(name) {
        return window['webkit' + name] || window['moz' + name] || window['ms' + name];
    }

    static formatNum(num, digits) {
        var pow = Math.pow(10, (digits === undefined ? 6 : digits));
        return Math.round(num * pow) / pow;
    }

    static extend(dest) {
        var i, j, len, src;

        for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j];
            for (i in src) {
                dest[i] = src[i];
            }
        }
        return dest;
    }
}

mapboxgl.ekmap.Util = Util;
