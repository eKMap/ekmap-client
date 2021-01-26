import '../core/Base';
import Control from 'ol/control/Control';
import ekmap_element from '../core/Element';
import ekmap_common from '../core/Common';

/**
 * @class ol.ekmap.control.TreeLayer
 * @category  Control
 * @classdesc TreeLayer.
 * @param {Object} options Construction parameters.
 * @param {Array} options.baseLayers=null List of baselayer for which you want to display TreeLayer.
 * @param {Array} options.overLayers=null List of overlayer for which you want to display TreeLayer.
 * @param {Boolean} options.opacityControl=false Display opacity.
 * @param {string} options.title=TREELAYER Name of header.
 * @param {String} options.tooltip=Treelayer Tooltip of button.
 * 
 *
 * @example
 *  var map = new ol.Map({
 *      //config....
 *  });
 * map.on('load', function() {
            var vnMap = new ol.ekmap.TiledVietNamMapLayer({
                token: tokenVN,
                id: 'vnMap'
            }).addTo(map);
            var adminMap = new ol.ekmap.TiledAdminMapLayer({
                id: 'adminMap'
            }).addTo(map);
            var roadMap = new ol.ekmap.TiledRoadMapLayer({
                id: 'roadMap'
            }).addTo(map);
            var tiledMap = new ol.ekmap.TiledMapLayer({
                url: urlMapService,
                token: tokenKey,
                id: 'tilelayer'
            }).addTo(map);
                //BaseLayer
            const mapBaseLayer = {
                roadMap: "Road Map",
                adminMap: "Admin Map",
                vnMap: "VietNam Map",
            };

            // OverLayer
            const mapOverLayer = {
                tilelayer: "Tile Layer"
            };

            // TreeLayerControl
            let Opacity = new ol.ekmap.control.TreeLayer({
                baseLayers: mapBaseLayer,
                overLayers: mapOverLayer,
                opacityControl: true,
                className: 'class-fix'
            });
            map.addControl(Opacity, 'bottom-right');
        })
 *
 */
var TreeLayer = /*@__PURE__*/ (function(Control) {
    function TreeLayer(opt_options) {
        var options = opt_options || {};
        var self = this;

        this.active = false;
        this.elementBaseLayer = [];
        var element = document.createElement('div');

        this.button = ekmap_element.create('BUTTON', {
            parent: element
        });
        this.button.title = 'Lớp bản đồ';
        this.button.addEventListener('touchstart', this.handleClick_.bind(this));
        this.button.addEventListener('click', this.handleClick_.bind(this));

        this.panel_ = ekmap_element.create('div', {
            className: 'containertreelayer',
            parent: element
        });

        var className = 'ol-control-custom gclient-treelayer';
        className = className + ' ' + (options.className !== undefined ? options.className : '');

        var cssClasses = className + ' ol-unselectable ol-control';
        element.className = cssClasses;

        this.show_opacity = options.show_opacity;
        Control.call(this, {
            element: element,
            target: options.target
        });
        this.baseLayer = options.baseLayer;
        this.overLayer = options.overLayer;
        this.vectorTileLayer = options.vectorTiledMapLayer || false;
        if (this.vectorTileLayer)
            this.vectorTileLayer = options.vectorTileLayer.objectLayer
    }

    if (Control) TreeLayer.__proto__ = Control;
    TreeLayer.prototype = Object.create(Control && Control.prototype);
    TreeLayer.prototype.constructor = TreeLayer;

    /** 
     * @private
     */
    TreeLayer.prototype.setActive_ = function setActive_() {
        var self = this;
        this.panel_.innerHTML = "";
        console.log(this.active)
        if (this.active) {
            let drawBase = this.drawBaseLayer_();
            this.drawOverLayer_(drawBase);
            this.drawVectorTileLayer_(drawBase);
            ekmap_element.removeClass(this.panel_, 'ol-hidden');
        } else {
            ekmap_element.addClass(this.panel_, 'ol-hidden');
        }
    }

    /** 
     * @private
     */
    TreeLayer.prototype.drawBaseLayer_ = function() {
        if (this.baseLayer == false) return null;
        var map = this.getMap();
        var self = this;
        var baselayers = [];
        var layers = map.getLayers().array_;
        layers.forEach(layer => {
            if (layer.get('baseLayer'))
                baselayers.push(layer)
        });

        var len = len = baselayers.length;

        if (len > 0) {
            var divBaseLayer = ekmap_element.create('div', {
                unselectable: 'on',
                className: 'containerlayerswitcher containerbaselayerswitcher',
                style: {
                    userSelect: 'none'
                },
                parent: this.panel_
            })

            var divBaseLayerTitle = ekmap_element.create('div', {
                unselectable: 'on',
                className: 'ol-panel-heading',
                style: {
                    userSelect: 'none'
                },
                parent: divBaseLayer
            })
            var span = ekmap_element.create('span', {
                className: 'btnCloseTreeLayer',
                parent: divBaseLayerTitle
            });
            var btnClose = ekmap_element.create('a', {
                parent: element,
                html: '<img style="padding:0px 10px 10px 10px; cursor:pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAACCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4MVktI5AAAAMnRSTlMAAQIDBAUGBwgJCg0ODxARJXV7hYiLj5GUmJ6go6aqsrS1w8XIytHT19nc4ubo6ev5+yWLQbAAAABzSURBVBgZncFHEoJAAATA2YBgFhQTBpBkAnX+/zjZpSiult34xeasYfmFgnHkRaOx5EvBkAlTDaxYz9CSMTMvZDVFR8b88DlBz3mTC/TEnuR1iI448DaPeB+hJU8sXIgdH2NYEfMBGmtWCsY2cWAFpcI/vj+FCU1mGENhAAAAAElFTkSuQmCC">',
                parent: span
            });
            span.addEventListener('touchstart', this.handleCloseClick_.bind(this));
            span.addEventListener('click', this.handleCloseClick_.bind(this));

            var divTitle = ekmap_element.create('div', {
                parent: divBaseLayerTitle
            })
            var title = ekmap_element.create('h5', {
                className: 'ol-header-tile ol-header-tile-baselayer',
                parent: divTitle,
                html: 'Bản đồ nền'
            });

            var divContentBaseLayer = ekmap_element.create('div', {
                className: 'contentbaselayerswitcher',
                parent: divBaseLayer
            });
            for (var i = 0; i < len; i++) {
                var element = ekmap_element.create('div', {
                    className: 'layerswitcher',
                    parent: divContentBaseLayer
                });
                var anhdaidien = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADhmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY0NTQ5ODZkLTBmMmEtZTk0ZC05Mjc3LWYwODE5MzdmMWFiZSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5N0MzQzAyMDhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N0MzQzAxRjhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI1ZWJmZDcyLWJkYzktYTA0Ny1iYmM5LWNmOTQ2YTE0NzJjMCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRiMGQ1ZWY5LTg2ZDgtMTFlNi1hM2FjLWMzODdkMmFhNjkxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtNVieYAAATBSURBVHhe7ZqHTuQwEIa99N577533fxBA9N577+XuvpENwYAgYIfsyZ+0ymbWTuw/4zKTzfz5hwo8k6OPAU0QxCIIYhEEsQiCWARBLIIgFkEQiyCIRRDEIghi4SWWOTs7U09PT/rMDzk5OaqiokKfucO5IIuLi+r6+loa7BMELy4uVr29vdriBqeCPD4+qqmpKTU8PKzy8/O11Q/39/dqenpajY6OqtzcXG39Oc4fYyaTkY9vfN3Hi197mJbe4Oseiawyd3d3amlpSVx8Y2NDW9OJd0F4knNzczLJNjc3q4uLC5l404p3QY6OjmTS6+rqUlVVVbIqXF5eqoeHB10iXSQyZKKY/UkSE+938C5IbW2tiMAw2d/flyMbKpdLpUsS8ZChoSHZl5ycnIhADJ+0koggeENHR4fq7+9XjY2N2ppOEp9D0k4QxCIIYpFqQVidkt7ZploQdrisTGtra9rin8QFoXMrKyv67GNmZmZUXl6eGhgYkITTV+q4IFFBtre31fn5uSSQlpeXtfUteAY72b6+PlVQUCD7GGIgAkTfJCYIu9S9vT3V09OjBgcH1dXV1btB3vz8vCSaKGPAU0g6IaSp42vrn4ggx8fHamtrS3V3d0vaj8h3ZGRE0gKzs7O6lBIPIBOGR9iwuTOiMISyVhAaz7zBTjWaFKZDzA+tra1yzhxBZxHjo84i5NjYmFzHVxLbqyAMC+aKlpYWVV1dra0v8NTLyspEMOYIhonv5PRneLk7TxjXZ3JsaGhQ9fX1+pe3sM84PT0Vb2Gu+G28CEKWjOi2s7NTsmQfcXBwoA4PDyXoYzVJA179871hEqWurk48o6ioSFt+H6eCmEx4nOQPq853MPdwnX13/uZuYmJCnjwddd1YA3MUKxJDbnx8XFvd4FwQVovNzU1vy6KB1Yglm1XKJc4FyXZ+d9FPIUEQiyCIRWKCEOmye007sQVZWFiQvIaBKJbl7zMQhKUy7cQWhHeybLdvbm6ez8lfAB5A3oNw34YlsrS0VH6nHAKRLALKYzfXAaJk41UIbrzL2ClLHfOOmGvt7u7Ksv8TYgvCKl1ZWfmc0mOTxJ6Ap8/fHRCKhkbzHEAQd3t7K402ddfX16UcUTEf6gPRL+XZy5Aj2dnZkftiN3scPJVrYcdGGXaveOxPEtOxBaExTU1NIgKeQiP40DleUba3t0t8glC8+TdQxuQ5KGeiYIJAvIdAkN+JfPmQQOI+JiVgEkMkiYyd8jwA84qUchxpV9Tb4vCtSRU3JRXIXMJTp2HYCgsLdQkl3z9qlBEG6IQBO4JHbcA513/PzlDiSF1zv7a2tlf3iENsQXBRPuQuiFlwdTrBd5JB/PeDMc9Tq6mp0bVegjBT3xD9znVKSkrEmxgePH2GA2KwRafjeCJ2M6TKy8ul8wjD/TjiYYgTnfy/SmxByFsY9XFd4xUMARpEB3BtUoF0zGDyHdH6dDD6b0V+QyDqclxdXZXUgAkUo3aEoD4dx45IzCt4LLlbzr8zwWZVLIPXMEeZ4TE5OSnRLsK4IqsEwfuYMPEYJlk8FM90SdZFu3gGYiBKdEi6IoT/Fu4G339CEMQiCGIRBLEIglgEQSyCIBZBEIsgiEUQxCII8gql/gKvssAfZKH1AAAAAABJRU5ErkJggg==';
                var layer = baselayers[i];
                if (layer.get('anhdaidien'))
                    anhdaidien = layer.get('anhdaidien');
                else {
                    var source = layer.getSource();
                    var coord = [5, 25, 14]; //lấy tile Việt Nam làm đại diện
                    var fn = source.getTileUrlFunction();
                    anhdaidien = fn.call(source, coord, source.getProjection());
                }
                if (layer.getVisible())
                    ekmap_element.addClass(element, 'selected')

                element.innerHTML = '<img src="' + anhdaidien + '"><label style="display:inline-block">' + layer.get('title') + '</label>';
                element.setAttribute('uid', layer.ol_uid);
                this.elementBaseLayer.push(element);

                function handleInteraction(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var l = self.elementBaseLayer;
                    for (var j = 0, len = l.length; j < len; j++) {
                        ekmap_element.removeClass(l[j], 'selected');
                    }
                    var layerid = this.getAttribute('uid');

                    layers.forEach(layer => {
                        if (layer.ol_uid == layerid)
                            layerActive = layer
                    });
                    var layerActive
                    if (layerActive && !layerActive.getVisible()) {
                        layers.forEach(layer => {
                            if (layerActive != layer)
                                layer.setVisible(false)
                        });
                        layerActive.setVisible(true);
                        ekmap_element.addClass(this, 'selected');
                    } else
                        layerActive.setVisible(false);
                }

                if (ekmap_common.isMobile())
                    element.addEventListener('touchstart', handleInteraction);
                else
                    element.addEventListener('click', handleInteraction);
            }
            return true;
        }
        return false;
    }

    /** 
     * @private
     */
    TreeLayer.prototype.drawOverLayer_ = function drawOverLayer_(drawBase) {
        if (this.overLayer == false) return null;
        var map = this.getMap();
        var self = this;
        var overlayers = [];
        var layers = map.getLayers().array_;
        console.log(layers)
        layers.forEach(layer => {
            if (layer.get('overlay'))
                overlayers.push(layer)
        });
        var len = overlayers.length;
        if (len > 0) {
            var divOverLayer = ekmap_element.create('div', {
                unselectable: 'on',
                className: 'containerlayerswitcher',
                style: {
                    userSelect: 'none'
                },
                parent: this.panel_
            });

            var divOverLayerTitle = ekmap_element.create('div', {
                className: 'ol-panel-heading',
                parent: divOverLayer
            });

            if (!drawBase) {
                var span = ekmap_element.create('span', {
                    className: 'btnCloseTreeLayer',
                    parent: divOverLayerTitle
                });
                var btnClose = ekmap_element.create('a', {
                    parent: element,
                    html: '<img style="padding:0px 10px 10px 10px; cursor:pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAACCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4MVktI5AAAAMnRSTlMAAQIDBAUGBwgJCg0ODxARJXV7hYiLj5GUmJ6go6aqsrS1w8XIytHT19nc4ubo6ev5+yWLQbAAAABzSURBVBgZncFHEoJAAATA2YBgFhQTBpBkAnX+/zjZpSiult34xeasYfmFgnHkRaOx5EvBkAlTDaxYz9CSMTMvZDVFR8b88DlBz3mTC/TEnuR1iI448DaPeB+hJU8sXIgdH2NYEfMBGmtWCsY2cWAFpcI/vj+FCU1mGENhAAAAAElFTkSuQmCC">',
                    parent: span
                });
                span.addEventListener('touchstart', this.handleCloseClick_.bind(this));
                span.addEventListener('click', this.handleCloseClick_.bind(this));
            }

            divOverLayerTitle.style = "padding-bottom:10px;";
            var title = ekmap_element.create('h5', {
                className: 'ol-header-tile',
                parent: divOverLayerTitle,
                html: 'Lớp chuyên đề'
            });

            var divContentOverLayer = ekmap_element.create('div', {
                className: 'containeroverlayerswitcher containeroverlayerswitcher-content',
                parent: divOverLayer
            });

            for (var i = len - 1; i >= 0; i--) {
                var anhdaidien = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADhmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY0NTQ5ODZkLTBmMmEtZTk0ZC05Mjc3LWYwODE5MzdmMWFiZSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5N0MzQzAyMDhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N0MzQzAxRjhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI1ZWJmZDcyLWJkYzktYTA0Ny1iYmM5LWNmOTQ2YTE0NzJjMCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRiMGQ1ZWY5LTg2ZDgtMTFlNi1hM2FjLWMzODdkMmFhNjkxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtNVieYAAATBSURBVHhe7ZqHTuQwEIa99N577533fxBA9N577+XuvpENwYAgYIfsyZ+0ymbWTuw/4zKTzfz5hwo8k6OPAU0QxCIIYhEEsQiCWARBLIIgFkEQiyCIRRDEIghi4SWWOTs7U09PT/rMDzk5OaqiokKfucO5IIuLi+r6+loa7BMELy4uVr29vdriBqeCPD4+qqmpKTU8PKzy8/O11Q/39/dqenpajY6OqtzcXG39Oc4fYyaTkY9vfN3Hi197mJbe4Oseiawyd3d3amlpSVx8Y2NDW9OJd0F4knNzczLJNjc3q4uLC5l404p3QY6OjmTS6+rqUlVVVbIqXF5eqoeHB10iXSQyZKKY/UkSE+938C5IbW2tiMAw2d/flyMbKpdLpUsS8ZChoSHZl5ycnIhADJ+0koggeENHR4fq7+9XjY2N2ppOEp9D0k4QxCIIYpFqQVidkt7ZploQdrisTGtra9rin8QFoXMrKyv67GNmZmZUXl6eGhgYkITTV+q4IFFBtre31fn5uSSQlpeXtfUteAY72b6+PlVQUCD7GGIgAkTfJCYIu9S9vT3V09OjBgcH1dXV1btB3vz8vCSaKGPAU0g6IaSp42vrn4ggx8fHamtrS3V3d0vaj8h3ZGRE0gKzs7O6lBIPIBOGR9iwuTOiMISyVhAaz7zBTjWaFKZDzA+tra1yzhxBZxHjo84i5NjYmFzHVxLbqyAMC+aKlpYWVV1dra0v8NTLyspEMOYIhonv5PRneLk7TxjXZ3JsaGhQ9fX1+pe3sM84PT0Vb2Gu+G28CEKWjOi2s7NTsmQfcXBwoA4PDyXoYzVJA179871hEqWurk48o6ioSFt+H6eCmEx4nOQPq853MPdwnX13/uZuYmJCnjwddd1YA3MUKxJDbnx8XFvd4FwQVovNzU1vy6KB1Yglm1XKJc4FyXZ+d9FPIUEQiyCIRWKCEOmye007sQVZWFiQvIaBKJbl7zMQhKUy7cQWhHeybLdvbm6ez8lfAB5A3oNw34YlsrS0VH6nHAKRLALKYzfXAaJk41UIbrzL2ClLHfOOmGvt7u7Ksv8TYgvCKl1ZWfmc0mOTxJ6Ap8/fHRCKhkbzHEAQd3t7K402ddfX16UcUTEf6gPRL+XZy5Aj2dnZkftiN3scPJVrYcdGGXaveOxPEtOxBaExTU1NIgKeQiP40DleUba3t0t8glC8+TdQxuQ5KGeiYIJAvIdAkN+JfPmQQOI+JiVgEkMkiYyd8jwA84qUchxpV9Tb4vCtSRU3JRXIXMJTp2HYCgsLdQkl3z9qlBEG6IQBO4JHbcA513/PzlDiSF1zv7a2tlf3iENsQXBRPuQuiFlwdTrBd5JB/PeDMc9Tq6mp0bVegjBT3xD9znVKSkrEmxgePH2GA2KwRafjeCJ2M6TKy8ul8wjD/TjiYYgTnfy/SmxByFsY9XFd4xUMARpEB3BtUoF0zGDyHdH6dDD6b0V+QyDqclxdXZXUgAkUo3aEoD4dx45IzCt4LLlbzr8zwWZVLIPXMEeZ4TE5OSnRLsK4IqsEwfuYMPEYJlk8FM90SdZFu3gGYiBKdEi6IoT/Fu4G339CEMQiCGIRBLEIglgEQSyCIBZBEIsgiEUQxCII8gql/gKvssAfZKH1AAAAAABJRU5ErkJggg==';
                var layer = layers[i];
                var displayInLayerSwitcher = layer.get('displayInLayerSwitcher');
                if (displayInLayerSwitcher == false) continue;

                var lopdulieu = layer.get('lopDuLieu') || "";
                var kieukhonggian = layer.get('kieuKhongGian') || "";
                kieukhonggian = kieukhonggian.toLowerCase();
                var visible = true;
                visible = layer.getVisible();
                var uid = layer.ol_uid;

                var element = ekmap_element.create('div', {
                    className: 'layerswitcher layerswitcher-content',
                    parent: divContentOverLayer,
                    uid: uid
                });

                if (layer.get('anhdaidien'))
                    anhdaidien = layer.get('anhdaidien');
                else if (kieukhonggian == "image" || kieukhonggian == "imagexyz" || kieukhonggian == "raster") {
                    var source = layer.getSource();
                    var coord = [5, 25, 14]; //lấy tile Việt Nam làm đại diện
                    var fn = source.getTileUrlFunction();
                    anhdaidien = fn.call(source, coord, source.getProjection());
                }
                var img = ekmap_element.create('img', {
                    parent: element,
                    src: anhdaidien,
                    uid: uid
                });
                var divInfo = ekmap_element.create('div', {
                    className: 'layerswitcher-content-media',
                    parent: element,
                    uid: uid
                });
                var label = ekmap_element.create('label', {
                    className: 'ol-label-layer ol-label-layer-p-b',
                    html: layer.get('title') || "OverLayer",
                    parent: divInfo,
                    uid: uid
                });
                if (ekmap_common.isMobile()) {
                    function handleInteraction(e) {
                        var layer;
                        var layerid = e.getAttribute('uid');
                        layers.forEach(lay => {
                            if (lay.ol_uid == layerid)
                                layer = lay
                        });
                        layer.set('checked', true); //đánh dấu thao tác người dùng
                        var parent = e.closest('.layerswitcher-content');
                        var opa = parent.getElementsByClassName('layerswitcher-opacity')[0]; //độ trong suốt của lớp
                        var img = parent.getElementsByTagName('img')[0];
                        var label = parent.getElementsByClassName('ol-label-layer')[0];
                        if (ekmap_element.hasClass(img, 'selected')) {
                            layer.setVisible(false);
                            ekmap_element.removeClass(img, 'selected');
                            ekmap_element.removeClass(label, 'selected');
                            if (opa) {
                                ekmap_element.addClass(opa, 'ol-hidden');
                                ekmap_element.addClass(label, 'ol-label-layer-p-b');

                            }
                        } else {
                            layer.setVisible(true);
                            ekmap_element.addClass(img, 'selected');
                            ekmap_element.addClass(label, 'selected');
                            if (opa) {
                                ekmap_element.removeClass(opa, 'ol-hidden');
                                ekmap_element.removeClass(label, 'ol-label-layer-p-b');
                            }
                        }
                    }
                    var startx = 0;
                    var dist = 0;

                    function onTouchStart(e) {
                        startx = 0;
                        dist = 0;
                        var touchobj = e.changedTouches[0]; // reference first touch point (ie: first finger)
                        startx = parseInt(touchobj.clientX); // get x position of touch point relative to left edge of browser
                    }

                    function onTouchMove(e) {
                        var touchobj = e.changedTouches[0] // reference first touch point for this event
                        dist = Math.abs(parseInt(touchobj.clientX) - startx);
                    }

                    function onTouchEnd(e) {
                        var touchobj = e.changedTouches[0] // reference first touch point for this event
                        if (dist < 5) { //click
                            handleInteraction(this);
                        }
                        e.preventDefault();
                    }
                    img.addEventListener('touchstart', onTouchStart);
                    img.addEventListener('touchmove', onTouchMove, false);
                    img.addEventListener('touchend', onTouchEnd, false);
                    label.addEventListener('touchstart', onTouchStart);
                    label.addEventListener('touchmove', onTouchMove, false);
                    label.addEventListener('touchend', onTouchEnd, false);

                    if (layer.get('tooltransparent') && self.show_opacity == undefined || self.show_opacity == true) {
                        //opacity
                        var opacity = ekmap_element.create('div', {
                            className: 'layerswitcher-opacity ol-hidden',
                            parent: divInfo,
                            uid: uid
                        });
                        var value = layer.getOpacity() * 100;
                        var opacity_cursor = ekmap_element.create('div', {
                            className: 'layerswitcher-opacity-cursor',
                            parent: opacity,
                            uid: uid,
                            style: {
                                left: value + "%"
                            }
                        });
                        opacity_cursor.addEventListener('mousedown', this.dragOpacity_.bind(this));
                        opacity_cursor.addEventListener('touchstart', this.dragOpacity_.bind(this));

                        function handerEventOpacity(e) {
                            var x = e.pageX ||
                                (e.touches && e.touches.length && e.touches[0].pageX) ||
                                (e.changedTouches && e.changedTouches.length && e.changedTouches[0].pageX);
                            var rect = this.getBoundingClientRect();
                            var dx = Math.max(0, Math.min(1, (x - rect.x) / rect.width)) * 100;
                            var value = dx / 100;
                            var layerid = this.getAttribute('uid');
                            var layer;
                            layers.forEach(lay => {
                                if (lay.ol_uid == layerid)
                                    layer = lay
                            });
                            if (layer) {
                                layer.setOpacity(value);
                            }
                            var opa_cursor = this.getElementsByClassName('layerswitcher-opacity-cursor')[0]; //độ trong suốt của lớp
                            var w = opa_cursor.getBoundingClientRect().width;
                            opa_cursor.style.left = dx + "%";
                        }
                        opacity.addEventListener('touchstart', handerEventOpacity);
                        opacity.addEventListener('click', handerEventOpacity);
                        if (visible) {
                            ekmap_element.removeClass(opacity, 'ol-hidden');
                        }

                    }
                } else { //xử lý riêng với web
                    function handleInteraction(e) {
                        var layerid = e.getAttribute('uid');
                        var layer;
                        layers.forEach(lay => {
                            if (lay.ol_uid == layerid)
                                layer = lay
                        });
                        layer.set('checked', true); //đánh dấu thao tác người dùng
                        var parent = e.closest('.layerswitcher-content');
                        var opa = parent.getElementsByClassName('slidecontainer')[0]; //độ trong suốt của lớp
                        var img = parent.getElementsByTagName('img')[0];
                        var label = parent.getElementsByClassName('ol-label-layer')[0];
                        if (ekmap_element.hasClass(img, 'selected')) {
                            layer.setVisible(false);
                            ekmap_element.removeClass(img, 'selected');
                            ekmap_element.removeClass(label, 'selected');
                            if (opa) {
                                ekmap_element.addClass(opa, 'ol-hidden');
                                ekmap_element.addClass(label, 'ol-label-layer-p-b');
                            }
                        } else {
                            layer.setVisible(true);
                            ekmap_element.addClass(img, 'selected');
                            ekmap_element.addClass(label, 'selected');
                            if (opa) {
                                ekmap_element.removeClass(opa, 'ol-hidden');
                                ekmap_element.removeClass(label, 'ol-label-layer-p-b');
                            }
                        }
                    }
                    img.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        handleInteraction(this);
                    });
                    label.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        handleInteraction(this);
                    });

                    if (layer.get('tooltransparent') && self.show_opacity == undefined || self.show_opacity == true) {
                        //opacity
                        var value = layer.getOpacity() * 100;
                        var opacity = ekmap_element.create('div', {
                            className: 'slidecontainer ol-hidden',
                            parent: divInfo,
                            uid: uid
                        });
                        var input = ekmap_element.create('input', {
                            className: 'slider',
                            type: "range",
                            min: "0",
                            max: "100",
                            value: value,
                            parent: opacity
                        });
                        input.addEventListener('input', function(e) {
                            e.preventDefault();
                            var target = e.target;
                            var layerI = target.getAttribute('uid');
                            var value = e.target.value;
                            var l;
                            layers.forEach(lay => {
                                if (lay.ol_uid == layerI)
                                    l = lay
                            });
                            if (l) {
                                value = value / 100;
                                l.setOpacity(value);
                            }
                        });

                        function handerEventOpacity(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            var layerid = e.target.getAttribute('uid');
                            var layer;
                            layers.forEach(lay => {
                                if (lay.ol_uid == layerid)
                                    layer = lay
                            });
                            if (layer) {
                                layer.setOpacity(value);
                            }
                        }
                        if (visible) {
                            opacity.removeClass('ol-hidden');
                        }
                    }
                }
                if (visible) {

                    ekmap_element.addClass(img, 'selected');
                    ekmap_element.addClass(label, 'selected');
                    ekmap_element.removeClass(label, 'ol-label-layer-p-b');
                }
            }
        }
    }

    /** 
     * @private
     */
    TreeLayer.prototype.drawVectorTileLayer_ = function(drawBase) {
        if (this.vectorTileLayer == false) return null;
        var map = this.getMap();
        var self = this;
        var layers = this.vectorTileLayer;
        var divVectorTileLayer = ekmap_element.create('div', {
            unselectable: 'on',
            className: 'containerlayerswitcher containerbaselayerswitcher',
            style: {
                userSelect: 'none'
            },
            parent: this.panel_
        })

        var divVectorTileTitle = ekmap_element.create('div', {
            unselectable: 'on',
            className: 'ol-panel-heading',
            style: {
                userSelect: 'none'
            },
            parent: divVectorTileLayer
        })

        if (!drawBase) {
            var span = gclient_element.create('span', {
                className: 'btnCloseTreeLayer',
                parent: divVectorTileTitle
            });
            var btnClose = gclient_element.create('a', {
                parent: element,
                html: '<img style="padding:0px 10px 10px 10px; cursor:pointer;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEUAAACCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4OCg4MVktI5AAAAMnRSTlMAAQIDBAUGBwgJCg0ODxARJXV7hYiLj5GUmJ6go6aqsrS1w8XIytHT19nc4ubo6ev5+yWLQbAAAABzSURBVBgZncFHEoJAAATA2YBgFhQTBpBkAnX+/zjZpSiult34xeasYfmFgnHkRaOx5EvBkAlTDaxYz9CSMTMvZDVFR8b88DlBz3mTC/TEnuR1iI448DaPeB+hJU8sXIgdH2NYEfMBGmtWCsY2cWAFpcI/vj+FCU1mGENhAAAAAElFTkSuQmCC">',
                parent: span
            });
            span.addEventListener('touchstart', this.handleCloseClick_.bind(this));
            span.addEventListener('click', this.handleCloseClick_.bind(this));
        }

        var divTitle = ekmap_element.create('div', {
            parent: divVectorTileTitle
        })
        var title = ekmap_element.create('h5', {
            className: 'ol-header-tile ol-header-tile-baselayer',
            parent: divTitle,
            html: 'Lớp bản đồ'
        });

        var divContentVectorTileLayer = ekmap_element.create('div', {
            className: 'contentbaselayerswitcher',
            parent: divVectorTileLayer
        });

        Object.keys(layers).forEach((layer) => {
            const layerId = layer;
            const br = document.createElement('br');
            this._checkBoxControlAdd(layerId, divContentVectorTileLayer);
            divContentVectorTileLayer.appendChild(br);
            if (this.show_opacity) {
                this._rangeControlAdd(layerId, divContentVectorTileLayer);
                divContentVectorTileLayer.appendChild(br);
            }
        });
    }


    TreeLayer.prototype._checkBoxControlAdd = function _checkBoxControlAdd(layerId, div) {
            const checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.id = layerId;
            checkBox.style.marginRight = '1rem';
            checkBox.style.height = '1.5rem';
            checkBox.style.width = '1.5rem';
            // var layer = this._map.getLayer(layerId);
            // if (this.currentZoom < layer.minzoom || this.currentZoom > layer.maxzoom) {
            //     checkBox.checked = false;
            //     checkBox.disabled = true;
            // } else {
            //     checkBox.checked = true;

            // }

            // checkBox.addEventListener('change', (event) => {
            //     const ckFlag = event.target.checked;
            //     checkBox.value = 'change';
            //     if (ckFlag) {
            //         this._map.setLayoutProperty(layerId, 'visibility', 'visible');
            //     } else {
            //         this._map.setLayoutProperty(layerId, 'visibility', 'none');
            //     }
            // });

            const layerName = document.createElement('strong');
            if (this.vectorTileLayer !== null) {
                layerName.appendChild(document.createTextNode(this.vectorTileLayer[layerId]));
            }

            var divInput = document.createElement('div');
            divInput.appendChild(checkBox)
            divInput.appendChild(layerName)
            div.appendChild(divInput);
        }
        /** 
         * @private
         */
    TreeLayer.prototype.handleOutSideClick_ = function handleOutSideClick_(event) {
        if (!this.divTreeLayer) return;
        var self = this;
        var isClickInside = this.divTreeLayer.contains(event.target);
        if (!isClickInside) {
            self.active = false;
            self.setActive_();
        }
    }

    /** 
     * @private
     */
    TreeLayer.prototype.handleClick_ = function handleClick_(e) {
        var self = this;
        e.preventDefault();
        self.active = !self.active;
        self.setActive_();
    }

    /** 
     * @private
     */
    TreeLayer.prototype.handleCloseClick_ = function handleCloseClick_(e) {
        var self = this;
        e.preventDefault();
        self.active = false;
        self.setActive_();
    }


    /** 
     * @private
     */
    TreeLayer.prototype.dragOpacity_ = function dragOpacity_(e) {
        e.preventDefault();
        var map = this.getMap();
        var target = e.target;
        var layerid = target.getAttribute('uid');
        var layers = map.getLayers().array_;
        var layer;
        layers.forEach(lay => {
            if (lay.ol_uid == layerid)
                layer = lay
        });
        switch (e.type) { // Start opacity
            case 'mousedown':
            case 'touchstart':
                {
                    target.addEventListener('touchend', this.dragOpacity_.bind(this), this);
                    target.addEventListener('touchmove', this.dragOpacity_.bind(this), this);
                    target.addEventListener('mousemove', this.dragOpacity_.bind(this), this);
                    target.addEventListener('mouseup', this.dragOpacity_.bind(this), this);
                    target.addEventListener('mouseout', this.dragOpacity_.bind(this), this);
                    break;
                }
                // Stop opacity
            case 'touchcancel':
            case 'touchend':
            case 'mouseout':
            case 'mouseup':
                {
                    target.removeEventListener('touchend', this.dragOpacity_.bind(this), this);
                    target.removeEventListener('touchmove', this.dragOpacity_.bind(this), this);
                    target.removeEventListener('mousemove', this.dragOpacity_.bind(this), this);
                    target.removeEventListener('mouseup', this.dragOpacity_.bind(this), this);
                    target.removeEventListener('mouseout', this.dragOpacity_.bind(this), this);
                    break;
                }
                // Move opcaity
            default:
                {
                    var x = e.pageX ||
                        (e.touches && e.touches.length && e.touches[0].pageX) ||
                        (e.changedTouches && e.changedTouches.length && e.changedTouches[0].pageX);
                    var rect = target.parentElement.getBoundingClientRect();
                    var dx = Math.max(0, Math.min(1, (x - rect.x) / rect.width)) * 100;
                    target.style.left = dx + "%";
                    var value = dx / 100;
                    if (layer) {
                        layer.setOpacity(value);
                    }
                    break;
                }
        }
    }
    return TreeLayer;
}(Control));

export default TreeLayer;