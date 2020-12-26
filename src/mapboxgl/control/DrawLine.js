import '../core/Base';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'

/**
 * @class mapboxgl.ekmap.control.DrawLine
 * @category  Control
 * @classdesc DrawLine.
 *
 * @param {Object} draw mapboxgl.ekmap.control.Draw.
 * @param {Object} options Construction parameters.
 * @param {number} options.buffer distance to draw the buffer. 
 * @param {string} options.units=meters unit. 
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * 
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 * 
 *   var draw = new mapboxgl.ekmap.control.Draw({
 *            modes: {
 *                ...MapboxDraw.modes,
 *                'draw_rectangle_drag': mapboxGLDrawRectangleDrag,
 *            },
 *            displayControlsDefault: false,
 *        });
 *        map.addControl(new mapboxgl.NavigationControl(), 'top-left');
 *        map.addControl(draw, 'top-left');
 *        var myLineBuffer = new mapboxgl.ekmap.control.DrawLine(draw, {
 *            target: //Id attribute,
 *            buffer: 500
 *        });
 *        map.addControl(myLineBuffer, 'top-left');
 *          
 */
export class DrawLine extends mapboxgl.Evented {

    constructor(draw, options) {
        super(draw, options);
        this.options = options ? options : {};
        this.target = this.options.target;
        this.listeners = {};
        this.units = this.options.units != undefined ? this.options.units : "meters";
        this.buffer = this.options.buffer;
        this.draw = draw;
    }

    /**
     * @function mapboxgl.ekmap.control.DrawLine.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        this._div = document.createElement('div');
        this._div.title = "Click DrawLine";
        this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._div.style.fontSize = "14px";
        let input = this.createLayerInputToggle();
        let me = this; //might use this later


        var cursorDom = $('.mapboxgl-canvas-container')
        input.addEventListener("click", function(e) {
            /**
             * @event mapboxgl.ekmap.control.DrawLine#startDrawLine
             * @description Fired when start control.
             */
            me.fire('startDrawLine', me);
            if (me.draw)
                me.draw.deleteAll();
            if (me._map.getLayer('buffered')) {
                me._map.removeLayer('buffered');
                me._map.removeSource('buffered')
            }
            me.draw.changeMode('draw_line_string');
            var draw = me.draw;
            me.offEvent();
            me.listeners["draw"] = me.updateAreaPolygon.bind(me);
            me._map.once('draw.create', me.listeners["draw"]);
        })
        if (!this.target)
            this._div.appendChild(input)

        return this._div;
    }

    /**
     * @function mapboxgl.ekmap.control.DrawLine.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove(map) {
        this._map = map;
        this._div.parentNode.removeChild(this._div);
        this._map = undefined;
    }

    offEvent() {
        var draw = this.draw;
        for (var evt in this.listeners) {
            this._map.off('draw.create', this.listeners[evt]);
        }
        this.listeners = {};
    }

    /**
     * @private
     * @description Create layer input
     */
    createLayerInputToggle() {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = "fa fa-circle-thin";
            button.className = "mapboxgl-ctrl-zoom-in"
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button;
    }

    /**
     * @function mapboxgl.ekmap.control.DrawLine.prototype.setBufer
     * @description Change buffer of line.
     * @param {number} newBuffer buffer.
     */
    setBuffer(newBuffer) {
        this.buffer = newBuffer;
    }

    /**
     * @function mapboxgl.ekmap.DrawLine.prototype.removeFeature
     * @description Remove buffer.
     */
    removeFeature() {
        if (this._map.getLayer('buffered')) {
            this._map.removeLayer('buffered');
            this._map.removeSource('buffered')
        }
    }

    /**
     * @function mapboxgl.ekmap.control.DrawLine.prototype.deactivate
     * @description deactivate control DrawCircle.
     */
    deactivate() {
        if (this._map.getLayer('buffered')) {
            this._map.removeLayer('buffered');
            this._map.removeSource('buffered')
        }
        if (this.draw)
            this.draw.deleteAll();
        this.offEvent();
        // this._map.off('click', this.onClick);
        // this.fire('unDrawLine', this);
    }

    /**
     * @function mapboxgl.ekmap.control.DrawLine.prototype.activate
     * @description Activate control Select.
     */
    activate() {
        this.draw.changeMode('draw_line_string');
        var draw = this.draw;
        this.offEvent();
        this.listeners["draw"] = this.updateAreaPolygon.bind(this);
        this._map.once('draw.create', this.listeners["draw"]);
        // this.fire('startDrawLine', this);
    }



    /**
     *@private
     */
    remove() {
        this.draw.remove();
    }

    updateAreaPolygon(e) {
        if (e.features.length > 0) {
            var line = e.features[0];
            var buffered = turf.buffer(line, this.buffer, { units: this.units });
            /**
             * @event mapboxgl.ekmap.control.DrawLine#circleDrawn
             * @description Fired when circle drawn
             */
            this.fire('lineBufferDrawn', { data: buffered });
            this._map.addLayer({
                'id': 'buffered',
                'type': 'fill',
                'source': {
                    'type': 'geojson',
                    'data': buffered
                },
                'layout': {},
                'paint': {
                    'fill-color': '#fbb03b',
                    'fill-opacity': 0.25,
                    'fill-outline-color': '#fbb03b'
                }
            })
        }

    }
}

mapboxgl.ekmap.control.DrawLine = DrawLine;