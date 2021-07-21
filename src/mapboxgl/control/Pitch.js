import '../core/Base';
import mapboxgl from 'mapbox-gl';
var _ = require('lodash');

/**
 * @class mapboxgl.ekmap.control.Pitch
 * @category  Control
 * @classdesc Pitch.
 *
 * @param {Object} options Construction parameters.
 * @param {String} options.mainColor=#fbb03b Color of Pitchr lines.
 * @param {String} options.labelColor=#263238 Color of label.
 * @param {String} options.secondaryColor=#fff Color of halo and inner marker background.
 * @param {String} options.fontHalo=1 Label font halo size.
 * @param {String} options.font=['Roboto Medium']  Array of fonts.
 * @param {String} options.fontSize=12 Label font size.
 * @param {String} options.mode='line' Available mode names are line and polygon.
 * @param {String} options.instant=true Any units [@turf/distance](https://github.com/Turfjs/turf/tree/master/packages/turf-distance) supports.
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.control.Pitch#Pitchr.on
 * @fires mapboxgl.ekmap.control.Pitch#Pitchr.off
 * @fires mapboxgl.ekmap.control.Pitch#Pitchr.change
 * 
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.Pitch(),'top-right');
 * 
 *  //target
 *  map.addControl(new mapboxgl.ekmap.control.Pitch({
 *      target: // the id attribute of target
 *  }));
 * 
 * // with miles:
 *  map.addControl(new PitchrControl({
 *      units: 'miles'
 *  }), 'top-right');
 * 
 * // with mode polygon:
 *  map.addControl(new PitchrControl({
 *      mode: 'polygon'
 *  }), 'top-right');
 * // or
 *  var PitchControl = new mapboxgl.ekmap.control.Pitch();
 *  map.addControl(PitchControl);
 *  PitchControl.changeMode('polygon')
 */
export class Pitch extends mapboxgl.Evented {

  constructor(options) {
    super(options);
    this.options = options ? options : {};
    this.instant = this.options.instant != undefined ? this.options.instant : true;
    this.width = this.options.width != undefined ? this.options.width : 150;
    this.className = this.options.className != undefined ? this.options.className : '';
  }

  /**
   * @function mapboxgl.ekmap.control.Pitch.prototype.onAdd
   * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
   * @param {Map} map the Map this control will be added to.
   * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
   */
  onAdd(map) {
    var me = this;
    this.map = map;
    // if(!mobileCheck())
    //     this.map.on('rotate', this.syncRotate.bind(this));
    this.button = document.createElement("button");
    this.button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Pitch';
    this.button.style.backgroundImage = 'url("data:image/png;base64,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")';
    this.button.style.backgroundPosition = 'center';
    this.button.style.backgroundRepeat = 'no-repeat';
    this.button.style.backgroundSize = '70%';
    this.button.className = "mapboxgl-ctrl-zoom-in";
    // this.label = document.createElement('label');
    // this.label.id = 'rangeval';
    this.button.addEventListener("click", function (e) {
      event.preventDefault();
      event.stopPropagation();
      if (me._panel) {
        // me._div.removeChild(me.label);
        me._div.removeChild(me._panel);
        me._panel = null;
      }else{
        me._panel = me.createLayerInputToggle();
        // me._div.appendChild(me.label);
        me._div.appendChild(me._panel);
      }
    })
    this._div = document.createElement('div');
    this._div.setAttribute("id", "container");
    this._div.title = "Pitch";
    this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._div.style.fontSize = "14px";
    $(document).click((event) => {
      if (!$(event.target).closest('#container').length) {
        me.close();
      }
    });
    if (this.button)
      this._div.appendChild(this.button);
    return this._div;
  }

  /**
   * @function mapboxgl.ekmap.control.Pitch.prototype.onRemove
   * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
   * @param {Map} map the Map this control will be removed from.
   * @returns {undefined}  there is no required return value for this method.
   */
  onRemove(map) {
    this.map = map;
    this._div.parentNode.removeChild(this._div);
    this.map = undefined;
  }

  syncRotate() {
    document.getElementById("customrange").value = this.map.getPitch();
  }

  createLayerInputToggle() {
    var me = this;
    var div = document.createElement("div");
    div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    div.style.position = 'absolute';
    div.style.background = 'white';
    div.style.width = '30px';
    div.style.height = this.width + 10 +'px';
    div.style.borderRadius = '4px';
    var input = document.createElement('input');
    input.type = 'range';
    input.className = 'form-range ' + this.className;
    input.style.width = this.width + 'px';
    input.style.height = '20px';
    input.style.margin = '5px';
    input.style.transformOrigin = '75px 75px';
    input.style.transform = 'rotate(-90deg)';
    input.style.position = 'fixed';
    input.min = this.map.getMinPitch();
    input.max = this.map.getMaxPitch();
    input.value = this.map.getPitch();
    input.step = '1';
    input.id = 'customrange';


    //event change web
    input.addEventListener("input", function (ev) {
      me.map.setPitch(document.getElementById("customrange").value);
      // document.getElementById('rangeval').innerHTML = document.getElementById("customrange").value;
    });
    //IE10
    input.addEventListener("change", function (ev) {
      me.map.setPitch(document.getElementById("customrange").value);
      // document.getElementById('rangeval').innerHTML = document.getElementById("customrange").value;
    });
    div.appendChild(input);
    return div;
  }

  /**
     * @private
     * @description Close layer input
     */
  close() {
    if (this._panel) {
      this._div.removeChild(this._panel);
      // this._div.removeChild(this.label);
      this._panel = null;
    }
    this.button.style.display = "";
  }
}

mapboxgl.ekmap.control.Pitch = Pitch;