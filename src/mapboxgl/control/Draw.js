import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { map } from 'leaflet';
/**
 * @class mapboxgl.ekmap.control.Draw
 * @category  Control
 * @classdesc Draw.
 *
 * @param {Object} options Construction parameters.
 * @param {Object} options.controls Hide or show individual controls. Each property's name is a control, and value is a boolean indicating whether the <br> control is on or off. Available control names are point, line_string, polygon, trash, combine_features and uncombine_features. By <br> default, all controls are on. To change that default, use displayControlsDefault..
 * @param {Boolean} options.displayControlsDefault=true The default value for controls. For example, if you would like all controls to be off by <br> default, and specify an allowed list with controls, use displayControlsDefault: false.
 * @param {Object} options.modes Over ride the default modes with your own.
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Draw#endDraw
 * @fires mapboxgl.ekmap.control.Draw#startDraw
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 * var  draw  =  new  mapboxgl.ekmap.control.Draw ( drawOptions ) ;
 */
export class Draw extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.controls = this.options.controls ? this.options.controls : {};
        this.displayControlsDefault = this.options.displayControlsDefault != undefined ? this.options.displayControlsDefault : true;
        this.modes = this.options.modes ? this.options.modes : {
            ...MapboxDraw.modes,
            'draw_rectangle_drag': mapboxGLDrawRectangleDrag,
        };
        this.draw = '';
        this.listeners = {};
    }

    /**
     * @function mapboxgl.ekmap.control.Draw.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        this._div = document.createElement('div');
        this._div.title = "Draw";
        this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._div.style.fontSize = "14px";
        this.draw = new MapboxDraw({
            displayControlsDefault: this.displayControlsDefault,
            controls: this.controls,
            modes: this.modes,
            // styles: SnapModeDrawStyles,
            // snap: true,
            // snapOptions: {
            //   snapPx: 15, // defaults to 15
            //   snapToMidPoints: true, // defaults to false
            //   snapVertexPriorityDistance: 0.0025, // defaults to 1.25
            // },
            // guides: false
        });
        map.addControl(this.draw, 'top-left');
        if (!this.displayControlsDefault)
            this._div.style.display = 'none'
        return this._div;
    }

    /**
     * @function mapboxgl.ekmap.control.Draw.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove(map) {
        this._map = map;
        map.removeControl(this.draw);
        this._div.parentNode.removeChild(this._div);
        this._map = undefined;
    }

    /**
     * @function mapboxgl.ekmap.control.Draw.prototype.deleteAll
     * @description Removes all features. Returns the draw instance for chaining.
     */
    deleteAll() {
        this.draw.deleteAll();
        this.draw.delete();
        if (this._map.getLayer('buffered')) {
            this._map.removeLayer('buffered');
            this._map.removeSource('buffered')
        }
    }

    /**
     * @function mapboxgl.ekmap.control.Draw.prototype.changeMode
     * @description Changes Draw to another mode. Returns the draw instance for chaining.
     * @param {String} mode The mode argument must be one of the mode names described above and enumerated in Draw.modes(Eg: 'draw_polygon','draw_line_string','draw_rectangle_drag','draw_point')
     */
    changeMode(mode) {
        this.draw.changeMode(mode);
        this.fire('startDraw', this);
        this.offEvent();
        this.listeners["draw"] = this.updateAreaPolygon.bind(this);
        this.listeners["draw_change"] = this.updateAreaPolygon.bind(this);
        this._map.once('draw.create', this.listeners["draw"]);
        this._map.on('draw.update', this.listeners["draw_change"]);
        if (this._map.getLayer('buffered')) {
            this._map.removeLayer('buffered');
            this._map.removeSource('buffered')
        }
    }

    updateAreaPolygon(e) {
        if (e.features.length > 0) {
            /**
             * @event mapboxgl.ekmap.control.DrawLine#lineBufferDrawn
             * @description Fired when line drawn
             */
            var data = e.features[0];
            var polygon

            if (data.geometry.type == "Polygon" || data.geometry.type == "LineString") {
                if (data.geometry.type == "Polygon")
                    polygon = data.geometry.coordinates[0];
                else if (data.geometry.type == "LineString")
                    polygon = data.geometry.coordinates;
                var bounds = new mapboxgl.LngLatBounds();
                polygon.forEach(function (coord) { bounds = bounds.extend(coord) });
                this.fire('endDraw', { data: data, center: bounds.getCenter() });
            }
            else if (data.geometry.type == "Point")
                this.fire('endDraw', { data: data, center: data.geometry.coordinates });

        }

    }

    offEvent() {
        var draw = this.draw;
        for (var evt in this.listeners) {
            if (evt == 'draw')
                this._map.off('draw.create', this.listeners[evt]);
            else if (evt == 'draw_change')
                this._map.off('draw.update', this.listeners[evt]);
        }
        this.listeners = {};
    }


    trash() {
        this.draw.trash();
    }

    set(featureCollection) {
        this.draw.set(featureCollection);
    }
}

mapboxgl.ekmap.control.Draw = Draw;