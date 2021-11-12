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
                    var param = param + '';
                    // if (param.indexOf(':') && key != 'layerDefs') {
                    //     param = param.replace(":", "%3A");
                    // }
                    // if (param.indexOf('/'))
                    //     param = param.replace("/", "%2F");
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
        if (options.url) {
            if (options.url.indexOf('?') !== -1) {
                options.requestParams = options.requestParams || {};
                var queryString = options.url.substring(options.url.indexOf('?') + 1);
                options.url = options.url.split('?')[0];
                options.requestParams = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
            }
            options.url = this.cleanUrl(options.url.split('?')[0]);
        }
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

    static cleanUrlNew(url) {
        if (url[url.length - 1] == '/') {
            url = url.substring(0, url.length - 1);
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

    static deepClone(obj) {
        let cloned = {};
        if (typeof obj !== 'object') return obj;
        if (obj instanceof Array) return obj.map((ele) => this.deepClone(ele));
        for (let k in obj) {
            if (obj.hasOwnProperty(k) && typeof obj[k] !== 'object') {
                cloned[k] = obj[k];
            } else if (obj[k].constructor.toString().indexOf("Object") > 0) {
                cloned[k] = this.deepClone(obj[k]);
            } else if (Array.isArray(obj[k])) {
                cloned[k] = obj[k].map((ele) => {
                    // let ret = null;
                    if (typeof ele !== 'object') return ele;
                    else return this.deepClone(ele);
                });
                // cloned[k] = [].concat(obj[k]);
            }
        }
        return cloned;
    }

    /**
     * @private
     * @description add img, video element to domContainer.
     * @param {Array} dom dom container..
     * @param {Array} res urls of img/video loaded to dom.
     */
    static setResource(dom, res) {
        if (!(res instanceof Array)) return;
        dom.innerHTML = '';
        for (let i = 0; i < res.length; i++) {
            let filetype = this.getFiletype(res[i]);
            if (filetype !== "") {
                let ele = document.createElement(filetype);
                ele.style.width = ele.style.height = dom.style.width = dom.style.height = '60px';
                ele.style.borderRadius = "50%";
                ele.src = res[i];
                dom.style.borderRadius = "50%";
                dom.appendChild(ele);
            }
            if (filetype == 'video') {
                ele.setAttribute('autoplay', true);
            }
        }
    }

    /**
     * return iconposition style by iconName
     */
    static setIconDiv(dom, iconName) {
        let icons = Const.Sprites;
        if (iconName && icons[iconName]) {
            let iconStyle = icons[iconName],
                iconDiv = document.createElement("div");
            iconDiv.style.width = iconStyle.width + "px";
            iconDiv.style.height = iconStyle.height + "px";
            iconDiv.style.overflow = 'hidden';
            let iconImg = document.createElement("img");
            iconImg.src = Const.SpritesUrl + ".png";
            iconImg.style.marginLeft = "-" + iconStyle.x + "px";
            iconImg.style.marginTop = "-" + iconStyle.y + "px";
            iconDiv.appendChild(iconImg);
            dom.appendChild(iconDiv);
        }
    }

    static isChanged(lastData, data) {
        if (JSON.stringify(lastData) == JSON.stringify(data))
            return false;
        else {
            return true;
        }
    }

    static setChart(dom, data, type, width, height, backgroundColor, toolTip) {
        if (!Chart) {
            return;
        }
        let div = document.createElement('div')
        div.className = 'chart-container'
        let canv = document.createElement('canvas'),
            ctx = canv.getContext('2d');
        div.appendChild(canv);
        if (type == 'bar')
            canv.style.backgroundColor = backgroundColor ? backgroundColor : 'rgb(245, 222, 179)';
        else
            canv.style.backgroundColor = 'rgba(0,0,0,0.0)';

        let chart = new Chart(ctx, {
            type: type,
            data: data,
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: toolTip
                }
                // plugins: {
                //     labels: {
                //         render: function (args) {
                //             return args.value;
                //         },
                //         fontSize: 10,
                //         fontStyle: 'normal',
                //         fontColor: '#fff',
                //         fontFamily: '"Lucida Console", Monaco, monospace'
                //     }
                // }
            }
        });
        chart.canvas.parentNode.style.height = height + 'px';
        chart.canvas.parentNode.style.width = width + 'px';
        canv.height = height;
        canv.width = width;
        dom.appendChild(div);
        return chart;
    }

    static getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i in obj) {
            params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
        }
        return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
    }

    static getSourceId(map) {
        var layers = map.getStyle().layers;
        var idCheck = layers[0].id % 2;
        if (!isNaN(idCheck)) {
            var lay = map.getLayer(layers[0].id);
            return lay.source;
        }
    }

    /**
     * @function mapboxgl.ekmap.Util.toSuperMapGeometry
     * @description 将 GeoJSON 对象转为 Ekmap 几何图形。
     * @param {GeoJSONObject} geoJSON - GeoJSON 对象。
     * @returns {Ekmap.Geometry}
     */
    static toEkmapGeometry(geoJSON) {
        if (geoJSON && geoJSON.type) {
            var format = new GeoJSONFormat();
            var result = format.read(geoJSON, "FeatureCollection");
            return result[0].geometry;
        }
    }
}

mapboxgl.ekmap.Util = Util;