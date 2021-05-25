window.initI18N = function(callback) {
    var path = getCommonScriptPath();
    Localization.initializeI18N(path, function() {
        if (window.isSite) {
            localize();
        }
        $('html').attr("lang", utils.getLanguage());
        Localization.localize();
        onLoadCallBack();
        callback && callback();
    });
    $('.ekmapclient-header').on('click', '.lang-option', function() {
        var value = $(this).data('lang');
        utils.setLanguage(value);
        $('#lang').html($(this).html());
        i18next.changeLanguage(value);
        if (window.isSite) {
            localize();
            return;
        }
        window.location.reload();
    });
}

function onLoadCallBack() {
    var lan = utils.getLanguage();
    var lang_text = $("[data-lang=" + lan + "]").html() || "VietNamese";
    $('#lang').html(lang_text);

    setCurrentVersion();
    resetCurrentVersionLink();
}

function setCurrentVersion() {
    var version = getVersion();
    if (!version && window.preRelease) {
        version = window.preRelease;
    }
    var versionText = version ? "" + version : "&nbsp;";
    $('#version').html(versionText);
}

function getVersion() {
    var pathname = window.location.pathname.replace("/en/", "/");
    var match = pathname.match(/^\/(dev|(?:\d+\.)+\d)\/.*/);
    return match && match[1] ? match[1] : null;
}


function resetCurrentVersionLink() {
    if (!window.version) {
        return;
    }

    var version = window.version;
    version = version.toString();
    $(".ekmapclient-nav-version").each(function(key, item) {
        if (item.href) {
            var reg = new RegExp("(.*)\/(" + version + ")(\/.*)");
            var match = item.href.match(reg);
            if (match && match[1] && match[3]) {
                item.href = match[1] + match[3];
            }
        }
    });
}

function localize() {
    var lang = utils.getLanguage();
    var pathname = window.location.pathname.replace("/en/", "/");
    var hash = window.location.hash;
    var href = window.location.origin + pathname;
    if (lang === "en-US") {
        if (getVersion()) {
            href = window.location.origin + pathname.replace(/([^\/]*\/){1}([^\/]*)/, '$1$2/en');
        } else if (window.isLocal) {
            href = window.location.origin + pathname.replace(/(([^\/]*\/){3})([^\/]*)/, '$1$3/en')
        } else {
            href = window.location.origin + pathname.replace(/([^\/]*\/){1}([^\/]*)/, '/en/$2');
        }

    }
    if ((window.location.origin + window.location.pathname + hash) === href + hash) {
        return;
    }
    window.location = href + hash;
}

function getCommonScriptPath() {
    var r = new RegExp("(^|(.*?\\/))(common\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        relativePath;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                relativePath = m[1] ? m[1].replace("js/", "") : "./";
                break;
            }
        }
    }
    return relativePath;
}

function guid12() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4();
}

function getRadius(data, minData, maxData, minRadius, maxRadius) {
    return (data - minData) / (maxData - minData) * (maxRadius - minRadius) + minRadius
}

function ekmap_inherits(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};

//var tokenKey = "";
var tokenKey = "1-70EXlhFRzL5KI2qc98B0mQawwKHTAD3x";
var tokenVN = "1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm";
var tokenOGC = "1-zaGe5eE5aNsCVWB5qo1RsXitJTkJ3iXu";
var tokenVectorTile = "1-oh5dhZCF12zVtrB9GI8NWQd0buuXf0Iq";
var tokenForSDK = "1-xR0cZaCFcuj5XpxgYVKUCGeCpGO2auVl"

var urlOSMStandard = [
    "https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm"
]
var TestUrls = 'https://server.ekgis.vn/ekmapserver/rest/services/87/MapServer'
var ImageTileZYX = 'https://server.ekgis.vn/ekmapserver/rest/services/145/MapServer' // bản đồ hành chính Việt Nam
var urlMapService = 'https://server.ekgis.vn/ekmapserver/rest/services/147/MapServer' //Bản đồ về khu bản tồn tại Việt Nam
var urlVectSer_overlay = 'https://server.ekgis.vn/ekmapserver/rest/services/100/VectorTileServer' //Bản đồ camera Tam Dương - Vĩnh Phúc
var urlVectorService = 'https://server.ekgis.vn/ekmapserver/rest/services/145/VectorTileServer' //Bản đồ hành chính Việt Nam
var urLVectorServiceTest = 'https://server.ekgis.vn/ekmapserver/rest/services/147/VectorTileServer' // bản đồ khu bảo tồn Test Vector tile