import '../core/Base';
import mapboxgl from 'mapbox-gl';
/**
 * @class mapboxgl.ekmap.control.SnapShot
 * @category  Control
 * @classdesc SnapShot.
* @param {Object} options Construction parameters.
 * @param {Array} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default.
 * @param {String} options.tooltip=Snapshot Tooltip of button.

 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *      preserveDrawingBuffer: true
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.SnapShot(),'bottom-right');
 */
export class SnapShot extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.target = this.options.target;
    }

    /**
     * @function mapboxgl.ekmap.control.SnapShot.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        this._div = document.createElement('div');
        this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        //this._div.style.padding = "8px";
        this._div.style.fontSize = "14px"
        let input = this.createLayerInputToggle();
        input.addEventListener("click", function(e) {
            var nameImg = 'map_' + me.guid12() + '.png';
            me._map.getCanvas().toBlob(function(blob) {
                    saveAs(blob, nameImg);
                })
                /**
                 * @event mapboxgl.ekmap.control.SnapShot#aftersnap
                 * @description Fired when after snap.
                 */
            me.fire('aftersnap', me);
        })
        if (!this.target)
            this._div.appendChild(input)
        else
            this._div.style.display = 'none';
        return this._div;
    }

    /**
     * @function mapboxgl.ekmap.control.SnapShot.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove(map) {
        this._map = map;
        this._div.parentNode.removeChild(this._div);
        this._map = undefined;
    }

    /**
     * @private
     * @description Create layer input
     */
    createLayerInputToggle() {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = "fa fa-camera";
            button.className = "mapboxgl-ctrl-zoom-in";
            button.title = this.options.tooltip != undefined ? this.options.tooltip : 'Snap shot';
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button;
    }

    /**
     * @private
     * @description Create id
     */
    guid12() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4();
    }

}

mapboxgl.ekmap.control.SnapShot = SnapShot;