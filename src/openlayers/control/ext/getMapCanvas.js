/** Canvas
 * @param {ol.Map} map
 * @return {canvas}
 */
var ekmap_getMapCanvas = function(map) {
    if (!map) return null;
    var canvas = map.getViewport().getElementsByClassName('ol-fixedoverlay')[0];
    if (!canvas) {
        if (map.getViewport().querySelector('.ol-layers')) {
            // Add a fixed canvas layer on top of the map
            canvas = document.createElement('canvas');
            canvas.className = 'ol-fixedoverlay';
            map.getViewport().querySelector('.ol-layers').after(canvas);
            // Clear before new compose
            map.on('precompose', function(e) {
                canvas.width = map.getSize()[0] * e.frameState.pixelRatio;
                canvas.height = map.getSize()[1] * e.frameState.pixelRatio;
            });
        } else {
            canvas = map.getViewport().querySelector('canvas');
        }
    }
    return canvas;
};

export default ekmap_getMapCanvas