import { Ekmap } from '../Ekmap';
import './BaseTypes';

export var Util = Ekmap.Util = Ekmap.Util || {};

Ekmap.Util.extend = function(destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function" &&
            source instanceof window.Event;

        if (!sourceIsEvt &&
            source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

Ekmap.Util.copy = function(des, soc) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in des) {
            v = soc[p];
            if (typeof v !== 'undefined') {
                des[p] = v;
            }
        }
    }
};

Ekmap.Util.reset = function(obj) {
    obj = obj || {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === "object" && obj[p] instanceof Array) {
                for (var i in obj[p]) {
                    if (obj[p][i].destroy) {
                        obj[p][i].destroy();
                    }
                }
                obj[p].length = 0;
            } else if (typeof obj[p] === "object" && obj[p] instanceof Object) {
                if (obj[p].destroy) {
                    obj[p].destroy();
                }
            }
            obj[p] = null;
        }
    }
};

Ekmap.Util.getElement = function() {
    var elements = [];

    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

Ekmap.Util.isElement = function(o) {
    return !!(o && o.nodeType === 1);
};

Ekmap.Util.isArray = function(a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};

Ekmap.Util.removeItem = function(array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1);
            //break;more than once??
        }
    }
    return array;
};

Ekmap.Util.indexOf = function(array, obj) {
    if (array == null) {
        return -1;
    } else {
        // use the build-in function if available.
        if (typeof array.indexOf === "function") {
            return array.indexOf(obj);
        } else {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
};

Ekmap.Util.modifyDOMElement = function(element, id, px, sz, position,
    border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};

Ekmap.Util.applyDefaults = function(to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === "function" &&
        from instanceof window.Event;

    for (var key in from) {
        if (to[key] === undefined ||
            (!fromIsEvt && from.hasOwnProperty &&
                from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (!fromIsEvt && from && from.hasOwnProperty &&
        from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }

    return to;
};

Ekmap.Util.getParameterString = function(params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value !== 'function')) {
            var encodedValue;
            if (Array.isArray(value) || value.toString() === '[object Object]') {
                encodedValue = encodeURIComponent(JSON.stringify(value));
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }

    return paramsArray.join("&");
};

Ekmap.Util.urlAppend = function(url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        if (paramStr.indexOf('?') === 0) {
            paramStr = paramStr.substring(1);
        }
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ?
            paramStr :
            parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};

Ekmap.Util.urlPathAppend = function(url, pathStr) {
        let newUrl = url;
        if (!pathStr) {
            return newUrl;
        }
        if (pathStr.indexOf('/') === 0) {
            pathStr = pathStr.substring(1);
        }
        const parts = url.split('?');
        if (parts[0].indexOf('/', parts[0].length - 1) < 0) {
            parts[0] += '/'
        }
        newUrl = `${parts[0]}${pathStr}${parts.length > 1 ? `?${parts[1]}` : ''}`;
    return newUrl;
};

Ekmap.Util.DEFAULT_PRECISION = 14;

Ekmap.Util.toFloat = function (number, precision) {
    if (precision == null) {
        precision = Ekmap.Util.DEFAULT_PRECISION;
    }
    if (typeof number !== "number") {
        number = parseFloat(number);
    }
    return precision === 0 ? number :
        parseFloat(number.toPrecision(precision));
};

Ekmap.Util.rad = function (x) {
    return x * Math.PI / 180;
};

Ekmap.Util.getParameters = function (url) {
    // if no url specified, take it from the location bar
    url = (url === null || url === undefined) ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (Ekmap.String.contains(url, '?')) {
        var start = url.indexOf('?') + 1;
        var end = Ekmap.String.contains(url, "#") ?
            url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }

            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }

            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }

            parameters[key] = value;
        }
    }
    return parameters;
};

Ekmap.Util.lastSeqID = 0;

Ekmap.Util.createUniqueID = function (prefix) {
    if (prefix == null) {
        prefix = "id_";
    }
    Ekmap.Util.lastSeqID += 1;
    return prefix + Ekmap.Util.lastSeqID;
};

Ekmap.INCHES_PER_UNIT = {
    'inches': 1.0,
    'ft': 12.0,
    'mi': 63360.0,
    'm': 39.3701,
    'km': 39370.1,
    'dd': 4374754,
    'yd': 36
};
Ekmap.INCHES_PER_UNIT["in"] = Ekmap.INCHES_PER_UNIT.inches;
Ekmap.INCHES_PER_UNIT["degrees"] = Ekmap.INCHES_PER_UNIT.dd;
Ekmap.INCHES_PER_UNIT["nmi"] = 1852 * Ekmap.INCHES_PER_UNIT.m;

// Units from CS-Map
Ekmap.METERS_PER_INCH = 0.02540005080010160020;
Ekmap.Util.extend(Ekmap.INCHES_PER_UNIT, {
    "Inch": Ekmap.INCHES_PER_UNIT.inches,
    "Meter": 1.0 / Ekmap.METERS_PER_INCH,   //EPSG:9001
    "Foot": 0.30480060960121920243 / Ekmap.METERS_PER_INCH,   //EPSG:9003
    "IFoot": 0.30480000000000000000 / Ekmap.METERS_PER_INCH,   //EPSG:9002
    "ClarkeFoot": 0.3047972651151 / Ekmap.METERS_PER_INCH,   //EPSG:9005
    "SearsFoot": 0.30479947153867624624 / Ekmap.METERS_PER_INCH,   //EPSG:9041
    "GoldCoastFoot": 0.30479971018150881758 / Ekmap.METERS_PER_INCH,   //EPSG:9094
    "IInch": 0.02540000000000000000 / Ekmap.METERS_PER_INCH,
    "MicroInch": 0.00002540000000000000 / Ekmap.METERS_PER_INCH,
    "Mil": 0.00000002540000000000 / Ekmap.METERS_PER_INCH,
    "Centimeter": 0.01000000000000000000 / Ekmap.METERS_PER_INCH,
    "Kilometer": 1000.00000000000000000000 / Ekmap.METERS_PER_INCH,   //EPSG:9036
    "Yard": 0.91440182880365760731 / Ekmap.METERS_PER_INCH,
    "SearsYard": 0.914398414616029 / Ekmap.METERS_PER_INCH,   //EPSG:9040
    "IndianYard": 0.91439853074444079983 / Ekmap.METERS_PER_INCH,   //EPSG:9084
    "IndianYd37": 0.91439523 / Ekmap.METERS_PER_INCH,   //EPSG:9085
    "IndianYd62": 0.9143988 / Ekmap.METERS_PER_INCH,   //EPSG:9086
    "IndianYd75": 0.9143985 / Ekmap.METERS_PER_INCH,   //EPSG:9087
    "IndianFoot": 0.30479951 / Ekmap.METERS_PER_INCH,   //EPSG:9080
    "IndianFt37": 0.30479841 / Ekmap.METERS_PER_INCH,   //EPSG:9081
    "IndianFt62": 0.3047996 / Ekmap.METERS_PER_INCH,   //EPSG:9082
    "IndianFt75": 0.3047995 / Ekmap.METERS_PER_INCH,   //EPSG:9083
    "Mile": 1609.34721869443738887477 / Ekmap.METERS_PER_INCH,
    "IYard": 0.91440000000000000000 / Ekmap.METERS_PER_INCH,   //EPSG:9096
    "IMile": 1609.34400000000000000000 / Ekmap.METERS_PER_INCH,   //EPSG:9093
    "NautM": 1852.00000000000000000000 / Ekmap.METERS_PER_INCH,   //EPSG:9030
    "Lat-66": 110943.316488932731 / Ekmap.METERS_PER_INCH,
    "Lat-83": 110946.25736872234125 / Ekmap.METERS_PER_INCH,
    "Decimeter": 0.10000000000000000000 / Ekmap.METERS_PER_INCH,
    "Millimeter": 0.00100000000000000000 / Ekmap.METERS_PER_INCH,
    "Dekameter": 10.00000000000000000000 / Ekmap.METERS_PER_INCH,
    "Decameter": 10.00000000000000000000 / Ekmap.METERS_PER_INCH,
    "Hectometer": 100.00000000000000000000 / Ekmap.METERS_PER_INCH,
    "GermanMeter": 1.0000135965 / Ekmap.METERS_PER_INCH,   //EPSG:9031
    "CaGrid": 0.999738 / Ekmap.METERS_PER_INCH,
    "ClarkeChain": 20.1166194976 / Ekmap.METERS_PER_INCH,   //EPSG:9038
    "GunterChain": 20.11684023368047 / Ekmap.METERS_PER_INCH,   //EPSG:9033
    "BenoitChain": 20.116782494375872 / Ekmap.METERS_PER_INCH,   //EPSG:9062
    "SearsChain": 20.11676512155 / Ekmap.METERS_PER_INCH,   //EPSG:9042
    "ClarkeLink": 0.201166194976 / Ekmap.METERS_PER_INCH,   //EPSG:9039
    "GunterLink": 0.2011684023368047 / Ekmap.METERS_PER_INCH,   //EPSG:9034
    "BenoitLink": 0.20116782494375872 / Ekmap.METERS_PER_INCH,   //EPSG:9063
    "SearsLink": 0.2011676512155 / Ekmap.METERS_PER_INCH,   //EPSG:9043
    "Rod": 5.02921005842012 / Ekmap.METERS_PER_INCH,
    "IntnlChain": 20.1168 / Ekmap.METERS_PER_INCH,   //EPSG:9097
    "IntnlLink": 0.201168 / Ekmap.METERS_PER_INCH,   //EPSG:9098
    "Perch": 5.02921005842012 / Ekmap.METERS_PER_INCH,
    "Pole": 5.02921005842012 / Ekmap.METERS_PER_INCH,
    "Furlong": 201.1684023368046 / Ekmap.METERS_PER_INCH,
    "Rood": 3.778266898 / Ekmap.METERS_PER_INCH,
    "CapeFoot": 0.3047972615 / Ekmap.METERS_PER_INCH,
    "Brealey": 375.00000000000000000000 / Ekmap.METERS_PER_INCH,
    "ModAmFt": 0.304812252984505969011938 / Ekmap.METERS_PER_INCH,
    "Fathom": 1.8288 / Ekmap.METERS_PER_INCH,
    "NautM-UK": 1853.184 / Ekmap.METERS_PER_INCH,
    "50kilometers": 50000.0 / Ekmap.METERS_PER_INCH,
    "150kilometers": 150000.0 / Ekmap.METERS_PER_INCH
});

//unit abbreviations supported by PROJ.4
Ekmap.Util.extend(Ekmap.INCHES_PER_UNIT, {
    "mm": Ekmap.INCHES_PER_UNIT["Meter"] / 1000.0,
    "cm": Ekmap.INCHES_PER_UNIT["Meter"] / 100.0,
    "dm": Ekmap.INCHES_PER_UNIT["Meter"] * 100.0,
    "km": Ekmap.INCHES_PER_UNIT["Meter"] * 1000.0,
    "kmi": Ekmap.INCHES_PER_UNIT["nmi"],    //International Nautical Mile
    "fath": Ekmap.INCHES_PER_UNIT["Fathom"], //International Fathom
    "ch": Ekmap.INCHES_PER_UNIT["IntnlChain"],  //International Chain
    "link": Ekmap.INCHES_PER_UNIT["IntnlLink"], //International Link
    "us-in": Ekmap.INCHES_PER_UNIT["inches"], //U.S. Surveyor's Inch
    "us-ft": Ekmap.INCHES_PER_UNIT["Foot"],    //U.S. Surveyor's Foot
    "us-yd": Ekmap.INCHES_PER_UNIT["Yard"],    //U.S. Surveyor's Yard
    "us-ch": Ekmap.INCHES_PER_UNIT["GunterChain"], //U.S. Surveyor's Chain
    "us-mi": Ekmap.INCHES_PER_UNIT["Mile"],   //U.S. Surveyor's Statute Mile
    "ind-yd": Ekmap.INCHES_PER_UNIT["IndianYd37"],  //Indian Yard
    "ind-ft": Ekmap.INCHES_PER_UNIT["IndianFt37"],  //Indian Foot
    "ind-ch": 20.11669506 / Ekmap.METERS_PER_INCH  //Indian Chain
});

Ekmap.DOTS_PER_INCH = 96;

Ekmap.Util.normalizeScale = function (scale) {
    var normScale = (scale > 1.0) ? (1.0 / scale) : scale;
    return normScale;
};

Ekmap.Util.getResolutionFromScale = function (scale, units) {
    var resolution;
    if (scale) {
        if (units == null) {
            units = "degrees";
        }
        var normScale = Ekmap.Util.normalizeScale(scale);
        resolution = 1 / (normScale * Ekmap.INCHES_PER_UNIT[units]
            * Ekmap.DOTS_PER_INCH);
    }
    return resolution;
};

Ekmap.Util.getScaleFromResolution = function (resolution, units) {

    if (units == null) {
        units = "degrees";
    }

    var scale = resolution * Ekmap.INCHES_PER_UNIT[units] *
        Ekmap.DOTS_PER_INCH;
    return scale;
};

Ekmap.IS_GECKO = (function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
})();

Ekmap.Browser = (function () {
    var name = '', version = '', device = 'pc', uaMatch;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") > -1 || (ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1)) {
        name = 'msie';
        uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
    } else if (ua.indexOf("chrome") > -1) {
        name = 'chrome';
        uaMatch = ua.match(/chrome\/([\d.]+)/);
    } else if (ua.indexOf("firefox") > -1) {
        name = 'firefox';
        uaMatch = ua.match(/firefox\/([\d.]+)/);
    } else if (ua.indexOf("opera") > -1) {
        name = 'opera';
        uaMatch = ua.match(/version\/([\d.]+)/);
    } else if (ua.indexOf("safari") > -1) {
        name = 'safari';
        uaMatch = ua.match(/version\/([\d.]+)/);
    }
    version = uaMatch ? uaMatch[1] : '';

    if (ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone") > -1) {
        device = 'apple';
    } else if (ua.indexOf("android") > -1) {
        uaMatch = ua.match(/version\/([\d.]+)/);
        version = uaMatch ? uaMatch[1] : '';
        device = 'android';
    }
    return {name: name, version: version, device: device};
})();

Ekmap.Util.getBrowser = function () {
    return Ekmap.Browser;
};

Ekmap.Util.isSupportCanvas = (function () {
    var checkRes = true, broz = Ekmap.Util.getBrowser();
    if (document.createElement("canvas").getContext) {
        if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
            checkRes = false;
        }
        if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
            checkRes = false;
        }
        if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
            checkRes = false;
        }
        if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
            checkRes = false;
        }
    } else {
        checkRes = false;
    }
    return checkRes;
})();

Ekmap.Util.supportCanvas = function () {
    return Ekmap.Util.isSupportCanvas;
};

Ekmap.INCHES_PER_UNIT["degree"] = Ekmap.INCHES_PER_UNIT.dd;
Ekmap.INCHES_PER_UNIT["meter"] = Ekmap.INCHES_PER_UNIT.m;
Ekmap.INCHES_PER_UNIT["foot"] = Ekmap.INCHES_PER_UNIT.ft;
Ekmap.INCHES_PER_UNIT["inch"] = Ekmap.INCHES_PER_UNIT.inches;
Ekmap.INCHES_PER_UNIT["mile"] = Ekmap.INCHES_PER_UNIT.mi;
Ekmap.INCHES_PER_UNIT["kilometer"] = Ekmap.INCHES_PER_UNIT.km;
Ekmap.INCHES_PER_UNIT["yard"] = Ekmap.INCHES_PER_UNIT.yd;

Ekmap.Util.isInTheSameDomain = function (url) {
    if (!url) {
        return true;
    }
    var index = url.indexOf("//");
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf("//");
    if (index === -1) {
        return true;
    } else {
        var protocol;
        var substring = protocol = url.substring(0, index);
        var documentSubString = documentUrl.substring(documentIndex + 2);
        documentIndex = documentSubString.indexOf("/");
        var documentPortIndex = documentSubString.indexOf(":");
        var documentDomainWithPort = documentSubString.substring(0, documentIndex);
        //var documentPort;

        var documentprotocol = document.location.protocol;
        if (documentPortIndex !== -1) {
            // documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
        } else {
            documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
            return false;
        }
        substring = url.substring(index + 2);
        var portIndex = substring.indexOf(":");
        index = substring.indexOf("/");
        var domainWithPort = substring.substring(0, index);
        var domain;
        if (portIndex !== -1) {
            domain = substring.substring(0, portIndex);
        } else {
            domain = substring.substring(0, index);
            domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        var documentDomain = document.domain;
        if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
            return true;
        }
    }
    return false;
};

Ekmap.Util.calculateDpi = function (viewBounds, viewer, scale, coordUnit, datumAxis) {
    if (!viewBounds || !viewer || !scale) {
        return;
    }
    var ratio = 10000,
        rvbWidth = viewBounds.getWidth(),
        rvbHeight = viewBounds.getHeight(),
        rvWidth = viewer.w,
        rvHeight = viewer.h;
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "degrees";
    var dpi;
    if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
        let num1 = rvbWidth / rvWidth,
            num2 = rvbHeight / rvHeight,
            resolution = num1 > num2 ? num1 : num2;
        dpi = 0.0254 * ratio / resolution / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;

    } else {
        let resolution = rvbWidth / rvWidth;
        dpi = 0.0254 * ratio / resolution / scale / ratio;
    }
    return dpi;
};

Ekmap.Util.toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn = objInn.replace(/\n/g, "\\n");
            objInn = objInn.replace(/\r/g, "\\r");
            objInn = objInn.replace("<", "&lt;");
            objInn = objInn.replace(">", "&gt;");
            objInn = objInn.replace(/%/g, "%25");
            objInn = objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for (var i = 0, len = objInn.length; i < len; i++) {
                arr.push(Ekmap.Util.toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," +
                "'Year':" + objInn.getFullYear() + "," +
                "'Month':" + (objInn.getMonth() + 1) + "," +
                "'Day':" + objInn.getDate() + "," +
                "'Hour':" + objInn.getHours() + "," +
                "'Minute':" + objInn.getMinutes() + "," +
                "'Second':" + objInn.getSeconds() + "," +
                "'Millisecond':" + objInn.getMilliseconds() + "," +
                "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;
        default:
            if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
                return objInn.toJSON();
            }
            if (typeof objInn === "object") {
                if (objInn.length) {
                    let arr = [];
                    for (let i = 0, len = objInn.length; i < len; i++) {
                        arr.push(Ekmap.Util.toJSON(objInn[i]));
                    }
                    return "[" + arr.join(",") + "]";
                }
                let arr = [];
                for (let attr in objInn) {
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME" && attr !== "parent") {
                        arr.push("'" + attr + "':" + Ekmap.Util.toJSON(objInn[attr]));
                    }
                }

                if (arr.length > 0) {
                    return "{" + arr.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};

Ekmap.Util.getResolutionFromScaleDpi = function (scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
        ratio = 10000;
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (scale > 0 && dpi > 0) {
        scale = Ekmap.Util.normalizeScale(scale);
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            //scale = Ekmap.Util.normalizeScale(scale);
            resolution = 0.0254 * ratio / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return resolution;
        } else {
            resolution = 0.0254 * ratio / dpi / scale / ratio;
            return resolution;
        }
    }
    return -1;
};

Ekmap.Util.getScaleFromResolutionDpi = function (resolution, dpi, coordUnit, datumAxis) {
    var scale = null,
        ratio = 10000;
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || "";
    if (resolution > 0 && dpi > 0) {
        if (coordUnit.toLowerCase() === "degree" || coordUnit.toLowerCase() === "degrees" || coordUnit.toLowerCase() === "dd") {
            scale = 0.0254 * ratio / dpi / resolution / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return scale;
        } else {
            scale = 0.0254 * ratio / dpi / resolution / ratio;
            return scale;
        }
    }
    return -1;
};

Ekmap.Util.transformResult = function (result) {
    if (result.responseText && typeof result.responseText === "string") {
        result = JSON.parse(result.responseText);
    }
    return result;
};

Ekmap.Util.copyAttributes = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

Ekmap.Util.copyAttributesWithClip = function (destination, source, clip) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var isInClip = false;
            if (clip && clip.length) {
                for (var i = 0, len = clip.length; i < len; i++) {
                    if (property === clip[i]) {
                        isInClip = true;
                        break;
                    }
                }
            }
            if (isInClip === true) {
                continue;
            }

            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

Ekmap.Util.cloneObject = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        let copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        let copy = obj.slice(0);
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = Ekmap.Util.cloneObject(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

Ekmap.Util.lineIntersection = function (a1, a2, b1, b2) {
    var intersectValue = null;
    var k1;
    var k2;
    var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    if (ab != 0) {
        k1 = b / ab;
        k2 = a / ab;

        if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
            intersectValue = new Ekmap.Geometry.Point(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
        } else {
            intersectValue = "No Intersection";
        }
    } else {

        if (b == 0 && a == 0) {
            var maxy = Math.max(a1.y, a2.y);
            var miny = Math.min(a1.y, a2.y);
            var maxx = Math.max(a1.x, a2.x);
            var minx = Math.min(a1.x, a2.x);
            if (((b1.y >= miny && b1.y <= maxy) || (b2.y >= miny && b2.y <= maxy)) &&
                (b1.x >= minx && b1.x <= maxx) || (b2.x >= minx && b2.x <= maxx)) {
                intersectValue = "Coincident";
            } else {
                intersectValue = "Parallel";
            }

        } else {
            intersectValue = "Parallel";
        }
    }
    return intersectValue;
};

Ekmap.Util.getTextBounds = function (style, text, element) {
    document.body.appendChild(element);
    element.style.width = 'auto';
    element.style.height = 'auto';
    if (style.fontSize) {
        element.style.fontSize = style.fontSize;
    }
    if (style.fontFamily) {
        element.style.fontFamily = style.fontFamily;
    }
    if (style.fontWeight) {
        element.style.fontWeight = style.fontWeight;
    }
    element.style.position = 'relative';
    element.style.visibility = 'hidden';
    element.style.display = 'inline-block';
    element.innerHTML = text;
    var textWidth = element.clientWidth;
    var textHeight = element.clientHeight;
    document.body.removeChild(element);
    return {
        textWidth: textWidth,
        textHeight: textHeight
    };
};