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
var tokenKey = "1-xR0cZaCFcuj5XpxgYVKUCGeCpGO2auVl";
var tokenVN = "1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm";
var tokenOGC = "1-zaGe5eE5aNsCVWB5qo1RsXitJTkJ3iXu";
var tokenVectorTile = "1-oh5dhZCF12zVtrB9GI8NWQd0buuXf0Iq";
// var tokenForSDK = "1-xR0cZaCFcuj5XpxgYVKUCGeCpGO2auVl"

var urlOSMStandard = [
    "https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm",
    "https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png?apikey=1-jTI0sSpMOTopJEjPuWySWW4FTc1pPEPm"
]
var TestUrls = 'https://server.ekgis.vn/ekmapserver/rest/services/87/MapServer'
var urlMapService = 'https://server.ekgis.vn/ekmapserver/rest/services/147/MapServer' //Khu bảo tồn quốc gia Việt Nam
var urlVectSer_overlay = 'https://server.ekgis.vn/ekmapserver/rest/services/100/VectorTileServer' //Bản đồ camera Tam Dương - Vĩnh Phúc
var urLVectorServiceTest = 'https://server.ekgis.vn/ekmapserver/rest/services/147/VectorTileServer' // bản đồ khu bảo tồn Test Vector tile
var urlMapLayerId = 'https://server.ekgis.vn/ekmapserver/rest/services/147/MapServer/1904' //Khu bảo tồn quốc gia Việt Nam
var urlFeatureLayer = 'https://server.ekgis.vn/ekmapserver/rest/services/147/FeatureServer/1904' //Khu bảo tồn quốc gia Việt Nam
var urlFeatureLayerEdit = 'https://server.ekgis.vn/ekmapserver/rest/services/148/FeatureServer/1905' //Cảng hàng không Việt Nam

var urlMapService145 = 'https://server.ekgis.vn/ekmapserver/rest/services/145/MapServer' // bản đồ hành chính Việt Nam
var urlFeatureService145 = 'https://server.ekgis.vn/ekmapserver/rest/services/145/FeatureServer' //Khu bảo tồn quốc gia Việt Nam
var urlVectorService145 = 'https://server.ekgis.vn/ekmapserver/rest/services/145/VectorTileServer' //Bản đồ hành chính Việt Nam

var urlVectorService185 = 'https://server.ekgis.vn/ekmapserver/rest/services/185/VectorTileServer' //Bản đồ nền Thái Bình
var urlMapService185 = 'https://server.ekgis.vn/ekmapserver/rest/services/185/MapServer' //Bản đồ nền Thái Bình

var urlWMS = 'https://server.ekgis.vn/ekmapserver/rest/services/169/WMS' //Quy hoạch chung Hà Nội (WMS).
var urlWMS32 = 'https://server.ekgis.vn/ekmapserver/rest/services/32/WMS' //Tai nạn giao thông.
var urlWFS = 'https://server.ekgis.vn/ekmapserver/rest/services/169/WFS' //Quy hoạch chung Hà Nội (WMS).

var geojsonUrl = 'https://server.ekgis.vn/ekmapserver/rest/services/145/FeatureServer/1902/query?where=1=1&outFields=*&returnGeometry=true&f=geojson&token=1-xR0cZaCFcuj5XpxgYVKUCGeCpGO2auVl'

const svg$7 = `
<svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z"/>
        <path fill="#f44336" d="M12 3l4 8H8z"/>
        <path fill="#9E9E9E" d="M12 21l-4-8h8z"/>
    </g>
</svg>
`;

function iconPointer () {
    return (new DOMParser().parseFromString(svg$7, 'image/svg+xml')).firstChild;
}

mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
