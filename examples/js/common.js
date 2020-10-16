window.initI18N = function (callback) {
    var path = getCommonScriptPath();
    Localization.initializeI18N(path, function () {
        if (window.isSite) {
            localize();
        }
        $('html').attr("lang", utils.getLanguage());
        Localization.localize();
        onLoadCallBack();
        callback && callback();
    });
    $('.ekmapclient-header').on('click', '.lang-option', function () {
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
    $(".ekmapclient-nav-version").each(function (key, item) {
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
        s = document.getElementsByTagName('script'), relativePath;
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


//var tokenKey = "";
var tokenKey = "1-70EXlhFRzL5KI2qc98B0mQawwKHTAD3x";

var urlOSMStandard = [
    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
]

var urlServicesHost = "https://viegisserver.ekgis.vn";
//var urlFeatureLayer = 'http://s2.cloudgis.vn/arcgis/rest/services/GIS/DuongSat/FeatureServer/0'
var urlFeatureLayer = urlServicesHost + '/gserver/rest/services/35/FeatureServer/478'


//var urlMapLayer = 'http://s2.cloudgis.vn/arcgis/rest/services/GIS/DuongSat/MapServer/0'
var urlMapLayer = urlServicesHost + '/gserver/rest/services/35/MapServer/478'
var urlMapService = urlServicesHost + '/gserver/rest/services/35/MapServer'
//var urlMapService = 'http://s2.cloudgis.vn/arcgis/rest/services/GIS/DuongSat/MapServer'

var urlVectorService = urlServicesHost + '/gserver/rest/services/35/VectorTileServer';


