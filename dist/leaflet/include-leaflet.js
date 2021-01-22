/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
(function() {
    var r = new RegExp("(^|(.*?\\/))(include-leaflet\.js)(\\?|$)"),
        s = document.getElementsByTagName('script'),
        targetScript;
    for (var i = 0; i < s.length; i++) {
        var src = s[i].getAttribute('src');
        if (src) {
            var m = src.match(r);
            if (m) {
                targetScript = s[i];
                break;
            }
        }
    }

    function inputScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"><' + '/script>';
        document.writeln(script);
    }

    function inputCSS(url) {
        var css = '<link rel="stylesheet" href="' + url + '">';
        document.writeln(css);
    }

    function inArray(arr, item) {
        for (i in arr) {
            if (arr[i] == item) {
                return true;
            }
        }
        return false;
    }

    function supportES6() {
        var code = "'use strict'; class Foo {}; class Bar extends Foo {};";
        try {
            (new Function(code))();
        } catch (err) {
            return false;
        }
        if (!Array.from) {
            return false;
        }
        return true;
    }

    //加载类库资源文件
    function load() {
        var includes = (targetScript.getAttribute('include') || "").split(",");
        var excludes = (targetScript.getAttribute('exclude') || "").split(",");
        // 在线
        if (!inArray(excludes, 'leaflet')) {
            inputCSS('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
            inputScript('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js');
        }
        if (!inArray(excludes, 'jquery')) {
            inputScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
        }
        if (!inArray(excludes, 'bootstrap')) {
            inputCSS('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
            inputScript('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
        }
        if (inArray(includes, 'leaflet.heat')) {
            inputScript("https://cdn.bootcss.com/leaflet.heat/0.2.0/leaflet-heat.js");
        }
        if (inArray(includes, 'leaflet.markercluster')) {
            inputCSS("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.Default.css");
            inputCSS("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/MarkerCluster.css");
            inputScript("https://cdn.bootcss.com/leaflet.markercluster/1.4.1/leaflet.markercluster.js");
        }
        if (inArray(includes, 'leaflet.draw')) {
            inputCSS("https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.css");
            inputScript("https://cdn.bootcss.com/leaflet.draw/1.0.4/leaflet.draw.js");
        }
        if (inArray(includes, 'leaflet-geoman')) {
            inputCSS('https://cdn.jsdelivr.net/npm/@geoman-io/leaflet-geoman-free@2.3.0/dist/leaflet-geoman.css');
            inputScript('https://cdn.jsdelivr.net/npm/@geoman-io/leaflet-geoman-free@2.3.0/dist/leaflet-geoman.min.js');
        }
        if (inArray(includes, 'leaflet.miniMap')) {
            inputCSS("https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.css");
            inputScript("https://cdn.bootcss.com/leaflet-minimap/3.6.1/Control.MiniMap.min.js");
        }
        if (inArray(includes, 'mapv')) {
            inputScript("https://cdn.jsdelivr.net/npm/mapv@2.0.43/build/mapv.min.js");
        }
        if (inArray(includes, 'turf')) {
            inputScript("https://cdn.bootcss.com/Turf.js/5.1.6/turf.min.js");
        }
        if (inArray(includes, 'echarts')) {
            inputScript('https://cdn.jsdelivr.net/npm/echarts@4.5.0/dist/echarts.min.js');
        }
        if (inArray(includes, 'elasticsearch')) {
            inputScript('https://cdn.bootcss.com/elasticsearch/16.5.0/elasticsearch.js');
        }
        if (inArray(includes, 'xlsx')) {
            inputScript('https://cdn.jsdelivr.net/npm/xlsx@0.15.4/dist/xlsx.core.min.js');
        }
        if (inArray(includes, 'd3')) {
            inputScript('https://cdn.bootcss.com/d3/5.14.2/d3.min.js');
        }
        if (inArray(includes, 'd3-hexbin')) {
            inputScript("https://d3js.org/d3-hexbin.v0.2.min.js");
        }

        if (!inArray(excludes, 'ekmap-leaflet')) {
            if (supportES6()) {
                inputScript("../../dist/leaflet/ekmap-leaflet-es6.min.js");
            } else {
                inputScript("../../dist/leaflet/ekmap-leaflet.min.js");
            }
        }
        if (inArray(includes, 'ekmap-leaflet-css')) {
            inputCSS("../../dist/leaflet/ekmap-leaflet.min.css");
        }
        if (inArray(includes, 'ant-design-vue')) {
            inputCSS("https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.css");
            inputScript("https://cdn.jsdelivr.net/npm/ant-design-vue@1.3.9/dist/antd.min.js");
        }

    }


    load();
    window.isLocal = false;
    window.server = document.location.toString().match(/file:\/\//) ? "http://localhost:8090" : document.location.protocol + "//" + document.location.host;
})();