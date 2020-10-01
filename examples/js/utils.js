var utils = {
    setLanguage: null,
    getLanguage: null,
    setCookie: null,
    getCookie: null,

    getLocalPairs: null,
    loadTemplate: null
};
(function (utils) {
    var cKey = "language";

    function setLanguage(language) {
        setCookie(cKey, language, 60 * 60 * 1000);
    }

    function getLanguage() {
        var lang = getCookie(cKey);
        if (lang) {
            return lang;
        }
        if (navigator.appName === 'Netscape') {
            lang = navigator.language;
        } else {
            lang = navigator.browserLanguage;
        }
        if (lang) {
            if (lang.indexOf('vi') === 0) {
                return 'vi-VN';
            }
            if (lang.indexOf('en') === 0) {
                return 'en-US';
            }
        }
        return 'vi-VN';
    }

    function setCookie(cKey, cValue, exp, domain) {
        var cookie = cKey + "=" + cValue;
        if (exp) {
            var d = new Date();
            d.setTime(d.getTime() + exp);
            cookie += ";expires=" + d.toUTCString();
        }
        cookie += domain ? ";path=" + domain : ";path=/";
        document.cookie = cookie;
    }

    function getCookie(cKey) {
        var name = cKey + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function clearCookie(name) {
        setCookie(name, "", -1);
    }

    function getLocalKey(key) {
        var lang = getLanguage();
        var localKey = key;
        if (lang === "en-US") {
            localKey = key + "_" + "en";
        }
        return localKey;
    }

    function getLocalPairs(obj, key) {
        if (!obj) {
            return;
        }
        var localKey = getLocalKey(key);
        return obj[localKey] != null ? obj[localKey] : obj[key];
    }

    function loadTemplate(element, templateFilePath, data) {
        if (!window.$ || !window.jQuery) {
            throw new Error("jQuery is required")
        }
        if (!window.template) {
            throw new Error("art-template.js is required")
        }
        if (!element) {
            throw new Error("element is required")
        }
        $.get(templateFilePath, function (html) {
            $(element).html(window.template.compile(html)(data));
        });

    }

    utils.setLanguage = setLanguage;
    utils.getLanguage = getLanguage;
    utils.setCookie = setCookie;
    utils.getCookie = getCookie;
    utils.getLocalPairs = getLocalPairs;
    utils.loadTemplate = loadTemplate;

})(utils);