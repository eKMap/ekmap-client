var olapi = "https://openlayers.org/en/v6.1.1/apidoc/";
var lfapi = "https://leafletjs.com/reference-1.5.1.html";
var mbglapi = "https://www.mapbox.com/mapbox-gl-js/api/";
var mapv = "https://github.com/huiyan-fe/mapv/blob/master/src/";
var geojsonapi = "https://geojson.org";
var typeLinks = {

    //mapboxgl
    "mapboxgl.Evented": mbglapi + '#Evented',
    "mapboxgl.Map": mbglapi + '#map',
    "mapboxgl.LngLatbounds": mbglapi + '#lnglatbounds',
    //mapv
    "Mapv.DataSet": mapv + 'data/DataSet.md',
    "Mapv.BaiduMapLayer": mapv + 'map/baidu-map/Layer.md',
    
	//GeoJSON
    "GeoJSONObject": geojsonapi
    
}
exports.typeLinks = typeLinks;