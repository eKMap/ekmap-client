import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.SnapShot
 * @category  Control
 * @classdesc SnapShot.
 *
 * @example
 *  var map = new mapboxgl.Map({
 *      //config....,
 *      preserveDrawingBuffer: true
 *  })
 *  map.addControl(new mapboxgl.ekmap.control.SnapShot(),'bottom-right');
 */
export class SnapShot extends mapboxgl.Evented {

    constructor() {
        super();
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
        this._div["aria-label"] = "Chụp màn hình";
        this._div.title = "Chụp màn hình";
        this._div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        //this._div.style.padding = "8px";
        this._div.style.fontSize = "14px"

        let input = this.createLayerInputToggle('Long', true, 'test', "");
        this._div.appendChild(input)

        this._div.addEventListener("click", function (e) {
            var nameImg = 'map_' + me.guid12() + '.png';
            me._map.getCanvas().toBlob(function (blob) {
                saveAs(blob, nameImg);
            })
        })
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
        let button = document.createElement("button");
        let icon = document.createElement("i");
        icon.className = "fa fa-camera";
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

mapboxgl.ekmap.control.SnapShot = SnapShot;
