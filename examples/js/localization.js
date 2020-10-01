
var Localization = {
    initializeI18N: null,
    localize: null,
    initGlobal: null
};
(function (nameSpace, $) {
    var targetScript = (function () {
        var r = new RegExp("(^|(.*?\\/js\\/))(localization\.js)(\\?|$)"),
            s = document.getElementsByTagName('script');
        for (var i = 0; i < s.length; i++) {
            var src = s[i].getAttribute('src');
            if (src && src.match(r)) {
                return s[i];
            }
        }
    })();


    function initializeI18N(path, callback) {
        var localPath = path + "./locales",
            file = "/resources.js";

        var filePathMap = {
            "en-US": localPath + "/en-US" + file,
            "vi-VN": localPath + "/vi-VN" + file
        };

        var lang = utils.getLanguage();

        inputScript(filePathMap[lang], function () {

            i18next.init({
                lng: lang,
                whitelist: ["vi-VN", "en-US"],
                fallbackLng: ["vi-VN", "en-US"]
            },function(){
                if (window.isSite) {
                    var webResourceURL = '../../web/locales/'+lang+'/resources.js';
                    $.get(webResourceURL, function () {
                        for (var name in window.webResources) {
                            var subWeb = window.webResources[name];
                            var subExamples = window.examplesResources[name];
                            if (typeof window.webResources[name] == 'object') {
    
                                if (!subExamples) {
                                    subExamples = {};
                                }
                                for (var name1 in subWeb) {
                                    subExamples[name1] = subWeb[name1];
                                }
                            } else {
                                subExamples[name1] = subWeb[name];
                            }
    
                        }
                        window.resources = window.examplesResources;
                        i18next.addResourceBundle && i18next.addResourceBundle(lang, 'translation', window.resources);
                        callback && callback();
    
                    })
    
                } else {
                    window.resources = window.examplesResources;
                    i18next.addResourceBundle && i18next.addResourceBundle(lang, 'translation', window.resources);
                    callback && callback();
                }
            });
            

        });

    }

    function localize() {
        jqueryI18next.init(i18next, $);
        $("html").localize(); 
    }

    function initGlobal(root) {
        var rootNameSpace = root || window;
        if (rootNameSpace.resources) {
            rootNameSpace.oldResources = rootNameSpace.resources;
        }
        var resources = i18next.getResourceBundle && i18next.getResourceBundle(utils.getLanguage());
        rootNameSpace.resources = resources && resources.resources;
    }

    function inputScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //for IE
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback && callback();
                }
            };
        } else { //for Others
            script.onload = function () {
                callback && callback();
            };
        }
        script.src = url;
        targetScript.parentElement.insertBefore(script, targetScript);
    }

    nameSpace.initializeI18N = initializeI18N;
    nameSpace.localize = localize;
    nameSpace.initGlobal = initGlobal;
})(Localization, jQuery);