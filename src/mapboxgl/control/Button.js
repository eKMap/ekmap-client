import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Button
 * @category  Control
 * @classdesc Button.
 *
 * @param {Object} options Construction parameters.
 * @param {string} options.icon=fa-flickr Icon of button.
 * @param {string} options.className Style class of button.
 * @param {string} options.tooltip=Buttonclick Tooltip of button.
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.Button({
 *      icon: //Icon of button
 * }),'bottom-right');
 * @fires mapboxgl.ekmap.control.Button#click
 */
export class Button extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        if (!this.options.icon)
            this.options.icon = 'fa fa-flickr'

    }

    /**
     * @function mapboxgl.ekmap.control.Button.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;
        let me = this; //might use this later
        this._div = document.createElement('div');
        this._div.title = this.options.tooltip != undefined ? this.options.tooltip : 'Button click';
        this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        if (this.options.className)
            this._div.className += " " + this.options.className;
        this._div.style.fontSize = "14px"

        let input = this.createLayerInputToggle();
        this._div.appendChild(input)
            /**
             * @event mapboxgl.ekmap.control.Button#click
             * @description Fired when click button.
             */
        this._div.addEventListener("click", function(e) {
            me.fire('click', me);
        })
        return this._div;
    }

    /**
     * @function mapboxgl.ekmap.control.Button.prototype.onRemove
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
        let button = document.createElement("button");
        let icon = document.createElement("i");
        icon.className = this.options.icon;
        button.className = "mapboxgl-ctrl-zoom-in"
        button.appendChild(icon);
        return button
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

mapboxgl.ekmap.control.Button = Button;