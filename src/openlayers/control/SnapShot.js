import '../core/Base';
import Control from 'ol/control/Control';

/**
 * @class ol.ekmap.control.SnapShot
 * @category  Control
 * @classdesc SnapShot.
* @param {Object} options Construction parameters.
 * @param {Array} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default.
 * @param {String} options.tooltip=Snapshot Tooltip of button.

 * @example
 *  var map = new ol.Map({
 *      //config....,
 *      preserveDrawingBuffer: true
 *  })
 *  map.addControl(new ol.ekmap.control.SnapShot(),'bottom-right');
 */
var SnapShot = /*@__PURE__*/ (function(Control) {
    function SnapShot(opt_options) {
        this.options = opt_options ? opt_options : {};
        this.target = this.options.target | null;
        var me = this;

        this.element = document.createElement('div');
        var className = 'gclient-bl';
        className = className + ' ' + (this.options.className !== undefined ? this.options.className : '');
        var cssClasses = className + ' ol-unselectable ol-control';
        this.element.className = cssClasses;
        let input = this.createLayerInputToggle();
        input.addEventListener("click", this.handleClick_.bind(this), false);

        var a = document.createElement('a');
        a.setAttribute("id", "image-download");
        a.setAttribute("download", "map.png");

        if (!this.target)
            this.element.appendChild(input);
        else
            this.element.style.display = 'none';
        this.element.appendChild(a)
        Control.call(this, {
            element: this.element,
            target: this.target
        });

    }

    if (Control) SnapShot.__proto__ = Control;
    SnapShot.prototype = Object.create(Control && Control.prototype);
    SnapShot.prototype.constructor = SnapShot;

    /**
     * @private
     * @description Create layer input
     */
    SnapShot.prototype.createLayerInputToggle = function createLayerInputToggle(divTarget) {
        if (!this.target) {
            var button = document.createElement("button");
            button.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABmElEQVRYR9WXPUseQRSFn/M7NKIg0UYbg7aCIWAr2CsWWmhjEUsNgmDKoAg20VYLez+wFxWMCIqFQsyfkMCRSXblRdSZfX1ldGCbnXvPfXbunTuzIvNQ5vgkA9j+AQwC7RHoM2Bb0nTKxyUB2P4KLKYI1thMSlqO+aQCXAAfY2IP5n9Laon5RAFsDwC7MaEn5ockbT3n+w/A9hwwBjTXGaiq2zWwLmlORfDZqgoNsv8WAK6A1gYJVpW5CQCu6tVI+3oB/gCXwDnwF+gAOoEPVeHqARiVtPZYoHr6RVWANkmhgsPO6QHCcwscS/pV8/4wdSWqAHySdGS7F1gAQn+oHafAvKRN26GoQ3FHRyrAjKTvtoeBjYhqn6QD2yPAzxhBCsB9S7UdlrkrIron6XORjhug6dlOmLANdyR9sd0NnMS+qJgv07UP9L8UYEnSVOqSFsHGJa3aXgEm3j1A9hRkL8KQwqzbsKyhrI2ohMjaikuIrIdRCZH1OE5shmlmb+JKFm7E+S6lxamV71qelqnXs4r+Gb1e6P/KdyPSCaKKGQlmAAAAAElFTkSuQmCC")';
            button.style.backgroundPosition = 'center';
            button.style.backgroundRepeat = 'no-repeat';
            button.style.backgroundSize = '70%';
            button.className = "ol-ctrl-zoom-in";
            button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Snap shot';
        } else {
            var button = document.getElementById(this.target);
        }
        return button;
    }

    SnapShot.prototype.handleClick_ = function handleClick_() {
        var me = this;
        var map = this.getMap();

        map.once('rendercomplete', function() {
            var mapCanvas = document.createElement('canvas');
            var size = map.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            var mapContext = mapCanvas.getContext('2d');
            Array.prototype.forEach.call(
                document.querySelectorAll('.ol-layer canvas'),
                function(canvas) {
                    if (canvas.width > 0) {
                        var opacity = canvas.parentNode.style.opacity;
                        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                        var transform = canvas.style.transform;
                        // Get the transform parameters from the style's transform matrix
                        var matrix = transform
                            .match(/^matrix\(([^\(]*)\)$/)[1]
                            .split(',')
                            .map(Number);
                        // Apply the transform to the export map context
                        CanvasRenderingContext2D.prototype.setTransform.apply(
                            mapContext,
                            matrix
                        );
                        mapContext.drawImage(canvas, 0, 0);
                    }
                }
            );
            if (navigator.msSaveBlob) {
                // link download attribuute does not work on MS browsers
                navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
            } else {
                var link = document.getElementById('image-download');
                link.href = mapCanvas.toDataURL();
                link.click();
            }
        });
        map.renderSync();
    }
    return SnapShot;
}(Control));

export default SnapShot;