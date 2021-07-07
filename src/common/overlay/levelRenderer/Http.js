export class Http {

    constructor() {
        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Http"
    }

    get(url, onsuccess, onerror) {
        if (typeof(url) === 'object') {
            var obj = url;
            url = obj.url;
            onsuccess = obj.onsuccess;
            onerror = obj.onerror;

        }
        var xhr = window.XMLHttpRequest ?
            new XMLHttpRequest() :
            new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    onsuccess && onsuccess(xhr.responseText);
                } else {
                    onerror && onerror();
                }
                xhr.onreadystatechange = new Function();
                xhr = null;
            }
        };

        xhr.send(null);
    }

}