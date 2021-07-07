import '../core/Base';
const LAYER_LINE = 'controls-layer-line';
const LAYER_POLYGON = 'controls-layer-polygon';
const LAYER_SYMBOL = 'controls-layer-symbol';
const SOURCE_LINE = 'controls-source-line';
const SOURCE_POLYGON = 'controls-source-polygon';
const SOURCE_SYMBOL = 'controls-source-symbol';
const MAIN_COLOR = '#fbb03b';
const LABEL_COLOR = '#263238';
const HALO_COLOR = '#fff';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf'
var _ = require('lodash');

/**
 * @class mapboxgl.ekmap.control.Rule
 * @category  Control
 * @classdesc Rule.
 *
 * @param {Object} options Construction parameters.
 * @param {String} options.mainColor=#fbb03b Color of ruler lines.
 * @param {String} options.labelColor=#263238 Color of label.
 * @param {String} options.secondaryColor=#fff Color of halo and inner marker background.
 * @param {String} options.fontHalo=1 Label font halo size.
 * @param {String} options.font=['Roboto Medium']  Array of fonts.
 * @param {String} options.fontSize=12 Label font size.
 * @param {String} options.mode='line' Available mode names are line and polygon.
 * @param {String} options.units=kilometers Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Rule#ruler.on
 * @fires mapboxgl.ekmap.control.Rule#ruler.off
 * @fires mapboxgl.ekmap.control.Rule#ruler.change
 * 
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.Rule(),'top-right');
 * 
 *  //target
 *  map.addControl(new mapboxgl.ekmap.control.Rule({
 *      target: // the id attribute of target
 *  }));
 * 
 * // with miles:
 *  map.addControl(new RulerControl({
 *      units: 'miles'
 *  }), 'top-right');
 * 
 * // with mode polygon:
 *  map.addControl(new RulerControl({
 *      mode: 'polygon'
 *  }), 'top-right');
 * // or
 *  var ruleControl = new mapboxgl.ekmap.control.Rule();
 *  map.addControl(ruleControl);
 *  ruleControl.changeMode('polygon')
 */
export class Rule extends mapboxgl.Evented {

  constructor(options) {
    super(options);
    this.options = options ? options : {};
    this.target = this.options.target;
    this.listeners = {};
    this.isMeasuring = false;
    this.mainColor = options.mainColor != undefined ? options.mainColor : MAIN_COLOR;
    this.secondaryColor = options.secondaryColor != undefined ? options.secondaryColor : HALO_COLOR;
    this.font = options.font != undefined ? options.font : ['Roboto Medium'];
    this.fontSize = options.fontSize != undefined ? options.fontSize : 12;
    this.fontHalo = options.fontHalo  != undefined ? options.fontHalo : 1;
    this.labelColor = options.labelColor != undefined ? options.labelColor : LABEL_COLOR;
    this.units = options.units != undefined ? options.units : 'kilometers';
    this.mode = options.mode != undefined ? options.mode : 'line';
  }

  /**
   * @function mapboxgl.ekmap.control.Rule.prototype.onAdd
   * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
   * @param {Map} map the Map this control will be added to.
   * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
   */
  onAdd(map) {
    this.map = map;
    this._div = document.createElement('div');
    this._div.title = "Rule";
    this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapbox-control-ruler';
    this._div.style.fontSize = "14px";
    this.popup = [];
    let input = this.createLayerInputToggle();
    let me = this; //might use this later
    input.addEventListener("click", function (e) {
      if (me.isMeasuring) {
        /**
         * @event mapboxgl.ekmap.control.Rule#ruler.off
         * @description Fired when off control.
         */
        me.fire('ruler.off');
        me.deactivate();
      } else {
        /**
        * @event mapboxgl.ekmap.control.Rule#ruler.on
        * @description Fired when start control.
        */
        me.fire('ruler.on');
        me.activate();
      }
    })
    if (!this.target)
      this._div.appendChild(input);
    else
      this._div.style.display = 'none';
    return this._div;
  }

  /**
   * @function mapboxgl.ekmap.control.Rule.prototype.onRemove
   * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
   * @param {Map} map the Map this control will be removed from.
   * @returns {undefined}  there is no required return value for this method.
   */
  onRemove(map) {
    this.map = map;
    this._div.parentNode.removeChild(this._div);
    this.map = undefined;
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
      button.className = "mapboxgl-ctrl-zoom-in";
      button.title = this.options.tooltip != undefined ? this.options.tooltip : "Rule";
      button.appendChild(icon);
    } else {
      var button = document.getElementById(this.target);
    }
    return button;
  }

  onClick(e) {

  }
  
  /**
  * @function mapboxgl.ekmap.control.Rule.prototype.activate
  * @description activate control Rule.
  */
  activate() {
    this.isMeasuring = true;
    this.markers = [];
    this.coordinates = [];
    this.polygon;
    this.labels = [];
    this.id = this.guid12();
    this.map.getCanvas().style.cursor = 'crosshair';
    this.offEvent();
    this.draw();
    if (this.mode == 'line') {
      this.listeners["click"] = this.mapClickLineListener.bind(this);
      this.map.on('click', this.listeners["click"]);
      this.listeners["dblclick"] = this.mapdblClickLineListener.bind(this);
      this.map.on('dblclick', this.listeners["dblclick"]);
    }
    else {
      this.listeners["click"] = this.mapClickPolygonListener.bind(this);
      this.map.on('click', this.listeners["click"]);
      this.listeners["dblclick"] = this.mapdblClickPolygonListener.bind(this);
      this.map.on('dblclick', this.listeners["dblclick"]);
    }
    this.listeners["style.load"] = this.styleLoadListener.bind(this);
    this.map.on('style.load', this.listeners["style.load"]);
  }
  /**
  * @function mapboxgl.ekmap.control.Rule.prototype.deactivate
  * @description deactivate control Rule.
  */
  deactivate() {
    this.isMeasuring = false;
    this.map.getCanvas().style.cursor = '';
    // remove layers, sources and event listeners
    var layers = this.map.getStyle().layers;
    layers.forEach(layer => {
      if (layer.id.indexOf(LAYER_LINE) != -1 || layer.id.indexOf(LAYER_POLYGON) != -1 || layer.id.indexOf(LAYER_SYMBOL) != -1)
        this.map.removeLayer(layer.id)
      // if (layer.source.indexOf(SOURCE_LINE) != -1 || layer.source.indexOf(SOURCE_POLYGON) != -1 || layer.source.indexOf(SOURCE_SYMBOL) != -1)
      //   this.map.removeSource(layer.source)
    });
    if (this.markers.length > 0)
      this.markers.forEach(m => m.remove());
      if (this.popup.length > 0)
      this.popup.forEach(m => m.remove());
    this.offEvent();
  }

  styleLoadListener() {
    this.draw();
  }

  draw() {
    this.map.addSource(SOURCE_LINE + '-' + this.id, {
      type: 'geojson',
      data: this.lineStringFeature(this.coordinates),
    });

    this.map.addSource(SOURCE_POLYGON + '-' + this.id, {
      type: 'geojson',
      data: this.polygonFeature(this.coordinates),
    });

    this.map.addSource(SOURCE_SYMBOL + '-' + this.id, {
      type: 'geojson',
      data: this.pointFeatureCollection(this.coordinates, this.labels),
    });

    this.map.addLayer({
      id: LAYER_POLYGON + '-' + this.id,
      type: 'fill',
      source: SOURCE_POLYGON + '-' + this.id,
      paint: {
        'fill-color': this.mainColor,
        'fill-opacity': 0.25,
      }
    });

    this.map.addLayer({
      id: LAYER_LINE + '-' + this.id,
      type: 'line',
      source: SOURCE_LINE + '-' + this.id,
      paint: {
        'line-color': this.mainColor,
        'line-width': 2,
        // 'line-dasharray': [2, 1]
      },
    });

    this.map.addLayer({
      id: LAYER_SYMBOL + '-' + this.id,
      type: 'symbol',
      source: SOURCE_SYMBOL + '-' + this.id,
      layout: {
        'text-field': '{text}',
        'text-font': this.font,
        'text-anchor': 'top',
        'text-size': this.fontSize,
        'text-offset': [0, 0.8],
      },
      paint: {
        'text-color': this.labelColor,
        'text-halo-color': this.secondaryColor,
        'text-halo-width': this.fontHalo,
      },
    });
  }

  mapClickLineListener(event) {
    var me = this;
    const markerNode = me.getMarkerNode();
    const lineSource = me.map.getSource(SOURCE_LINE + '-' + me.id);
    const symbolSource = me.map.getSource(SOURCE_SYMBOL + '-' + me.id);
    const marker = new mapboxgl.Marker({ element: markerNode, draggable: false })
      .setLngLat(event.lngLat)
      .addTo(me.map);
    const newCoordinate = [event.lngLat.lng, event.lngLat.lat];
    me.coordinates.push(newCoordinate);
    me.fire('ruler.change', { coordinates: me.coordinates });
    me.updateLabels();
    lineSource.setData(me.lineStringFeature(me.coordinates));
    symbolSource.setData(me.pointFeatureCollection(me.coordinates, me.labels));
    me.markers.push(marker);
  }

  mapClickPolygonListener(event) {
    var me = this;
    const markerNode = me.getMarkerNode();
    const lineSource = me.map.getSource(SOURCE_LINE + '-' + me.id);
    const polygonSource = me.map.getSource(SOURCE_POLYGON + '-' + me.id);
    const symbolSource = me.map.getSource(SOURCE_SYMBOL + '-' + me.id);
    const marker = new mapboxgl.Marker({ element: markerNode, draggable: true })
      .setLngLat(event.lngLat)
      .addTo(me.map);
    const newCoordinate = [event.lngLat.lng, event.lngLat.lat];
    me.coordinates.push(newCoordinate);
    if (me.coordinates.length > 2) {
      var coordinates = me.coordinates.slice();
      var line = turf.lineString(coordinates)
      me.polygon = turf.lineToPolygon(line);
      polygonSource.setData(me.polygon);
    }
    lineSource.setData(me.lineStringFeature(me.coordinates));
    me.fire('ruler.change', { coordinates: me.coordinates });

    me.markers.push(marker);

    // marker.on('drag', () => {
    //   const index = me.markers.indexOf(marker);
    //   const lngLat = marker.getLngLat();
    //   me.coordinates[index] = [lngLat.lng, lngLat.lat];
    //   me.updateLabels();
    //   lineSource.setData(me.lineStringFeature(me.coordinates));
    //   symbolSource.setData(me.pointFeatureCollection(me.coordinates, this.labels));
    // });
  }

  mapdblClickPolygonListener(event) {
    var me = this;
    const lineSource = me.map.getSource(SOURCE_LINE + '-' + me.id);
    lineSource.setData(turf.lineString(me.polygon.geometry.coordinates[0]));
    me.map.setPaintProperty(LAYER_LINE + '-' + me.id, 'line-color', '#3bb2d0');
    me.map.setPaintProperty(LAYER_LINE + '-' + me.id, 'line-width', 2);
    me.map.setPaintProperty(LAYER_POLYGON + '-' + me.id, 'fill-color', '#3bb2d0');
    me.map.setPaintProperty(LAYER_POLYGON + '-' + me.id, 'fill-outline-color', '#3bb2d0');

    me.updatePolygonLabels();
    var centroid = turf.centroid(me.polygon);
    var pop = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat(centroid.geometry.coordinates)
      .setHTML(me.labels)
      .addTo(me.map);
    me.popup.push(pop);
    me.markers.forEach(m => m.remove());
    me.activate();
  }

  mapdblClickLineListener(event){
    var me = this;
    me.map.setPaintProperty(LAYER_LINE + '-' + me.id, 'line-color', '#3bb2d0');
    me.map.setPaintProperty(LAYER_LINE + '-' + me.id, 'line-width', 2);
    var pop = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
      .setLngLat(me.coordinates[me.coordinates.length - 1])
      .setHTML(me.labels[me.labels.length - 1])
      .addTo(me.map);
    me.popup.push(pop);
    me.markers.forEach(m => m.remove());
    me.map.removeLayer(LAYER_SYMBOL + '-' + me.id);
    me.activate();
  }

  getMarkerNode() {
    const node = document.createElement('div');
    node.style.width = '12px';
    node.style.height = '12px';
    node.style.borderRadius = '50%';
    node.style.background = this.secondaryColor;
    node.style.boxSizing = 'border-box';
    node.style.border = `2px solid ${this.mainColor}`;
    return node;
  }

  lineStringFeature(coordinates) {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };
  }

  polygonFeature(coordinates) {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates,
      },
    };
  }

  pointFeatureCollection(coordinates, labels) {
    return {
      type: 'FeatureCollection',
      features: coordinates.map((c, i) => ({
        type: 'Feature',
        properties: {
          text: labels[i],
        },
        geometry: {
          type: 'Point',
          coordinates: c,
        },
      })),
    };
  }

  updateLabels() {
    const { coordinates, units, labelFormat } = this;
    let sum = 0;
    this.labels = coordinates.map((coordinate, index) => {
      if (index === 0) return labelFormat(0);
      sum += turf.distance(coordinates[index - 1], coordinates[index], { units });
      return labelFormat(sum, units);
    });
  }

  updatePolygonLabels() {
    const { coordinates, polygon, labelFormatS, units } = this;
    this.labels = labelFormatS(turf.area(polygon), units);
  }

  labelFormat(number) {
    if (number < 1) {
      return `${(number * 1000).toFixed()} m`;
    }
    return `${number.toFixed(2)} m`;
  }

  labelFormatS(number, units) {
    if (number < 1) {
      return `${(number * 1000).toFixed()} m`;
    }
    if (units == 'meters')
      return `${number.toFixed(2)} m` + '<sup>2</sup>';
    else
      return `${(number / 1000).toFixed(2)} km` + '<sup>2</sup>';
  }

  labelFormatL(number, units){
    if (number < 1) {
      return `${(number * 1000).toFixed()} m`;
    }
    if (units == 'meters')
      return `${number.toFixed(2)} m`;
    else
      return `${(number / 1000).toFixed(2)} km`;
  }

  offEvent() {
    for (var evt in this.listeners) {
      this.map.off(evt, this.listeners[evt]);
    }
    this.listeners = {};
  }

  guid12() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4();
  }

  /**
     * @function mapboxgl.ekmap.control.Rule.prototype.changeMode
     * @description Changes Rule to another mode.
     * @param {String} mode Available mode names are 'line' and 'polygon'.
     */
  changeMode(mode) {
    this.mode = mode;
    if (this.markers.length > 0)
      this.markers.forEach(m => m.remove());
    this.activate();
  }
}

mapboxgl.ekmap.control.Rule = Rule;