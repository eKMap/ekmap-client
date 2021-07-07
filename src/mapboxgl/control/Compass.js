import '../core/Base';
import mapboxgl from 'mapbox-gl';
var _ = require('lodash');

/**
 * @class mapboxgl.ekmap.control.Compass
 * @category  Control
 * @classdesc Compass.
 *
 * @param {Object} options Construction parameters.
 * @param {String} options.mainColor=#fbb03b Color of Compassr lines.
 * @param {String} options.labelColor=#263238 Color of label.
 * @param {String} options.secondaryColor=#fff Color of halo and inner marker background.
 * @param {String} options.fontHalo=1 Label font halo size.
 * @param {String} options.font=['Roboto Medium']  Array of fonts.
 * @param {String} options.fontSize=12 Label font size.
 * @param {String} options.mode='line' Available mode names are line and polygon.
 * @param {String} options.instant=true Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports.
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Compass#Compassr.on
 * @fires mapboxgl.ekmap.control.Compass#Compassr.off
 * @fires mapboxgl.ekmap.control.Compass#Compassr.change
 * 
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.Compass(),'top-right');
 * 
 *  //target
 *  map.addControl(new mapboxgl.ekmap.control.Compass({
 *      target: // the id attribute of target
 *  }));
 * 
 * // with miles:
 *  map.addControl(new CompassrControl({
 *      units: 'miles'
 *  }), 'top-right');
 * 
 * // with mode polygon:
 *  map.addControl(new CompassrControl({
 *      mode: 'polygon'
 *  }), 'top-right');
 * // or
 *  var CompassControl = new mapboxgl.ekmap.control.Compass();
 *  map.addControl(CompassControl);
 *  CompassControl.changeMode('polygon')
 */
export class Compass extends mapboxgl.Evented {

  constructor(options) {
    super(options);
    this.options = options ? options : {};
    this.instant = this.options.instant != undefined ? this.options.instant: true;
    this.position = this.options.position != undefined ? this.options.position : 'bottom'
  }

  /**
   * @function mapboxgl.ekmap.control.Compass.prototype.onAdd
   * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
   * @param {Map} map the Map this control will be added to.
   * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
   */
  onAdd(map) {
    this.map = map;
    this.map.on('rotate', this.syncRotate.bind(this));
    this._div = document.createElement('div');
    this._div.title = "Compass";
    this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group mapbox-control-Compass';
    this._div.style.fontSize = "14px";
    this.popup = [];
    this.button = this.createLayerInputToggle();
    this._div.appendChild(this.button);
    let me = this; 
    this.button.addEventListener("click", function (e) {
      me.map.easeTo({ bearing: 0, pitch: 0 });
    })
    if (!this.instant) this._div.hidden = true;
    return this._div;
  }

  /**
   * @function mapboxgl.ekmap.control.Compass.prototype.onRemove
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
      var button = document.createElement("button");
      var icon = iconPointer();
      button.appendChild(icon);
    return button;
  }

  iconPointer () {
    return (new DOMParser().parseFromString(svg$7, 'image/svg+xml')).firstChild;
  }

  syncRotate() {
    const angle = this.map.getBearing() * (-1);
    if (!this.instant) {
      this._div.hidden = angle === 0;
    }
    this.button.childNodes[0].style.transform = `rotate(${angle}deg)`;
  }
}

mapboxgl.ekmap.control.Compass = Compass;