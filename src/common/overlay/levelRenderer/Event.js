export class Event {
    /**
     * @function Ekmap.LevelRenderer.Tool.Event.prototype.constructor
     * @description Constructor.
     */
     constructor() {
        /**
         * @member {function} Ekmap.LevelRenderer.Tool.Event.prototype.stop
         * @description stop bubbling and prevent default behavior
         */
        this.stop = typeof window.addEventListener ==='function'?

            function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.cancelBubble = true;
            }:
            function(e) {
                e.returnValue = false;
                e.cancelBubble = true;
            };

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Event";
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Event.prototype.getX
     * @description Extract the x coordinate of the mouse (finger).
     * @param {Event} e-event.
     * @returns {number} The x coordinate of the mouse (finger).
     */
    getX(e) {
        return typeof e.zrenderX !='undefined' && e.zrenderX ||
            typeof e.offsetX !='undefined' && e.offsetX ||
            typeof e.layerX !='undefined' && e.layerX ||
            typeof e.clientX !='undefined' && e.clientX;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Event.prototype.getY
     * @description Extract the y coordinate of the mouse (finger).
     * @param {Event} e-event.
     * @returns {number} The y coordinate of the mouse (finger).
     */
    getY(e) {
        return typeof e.zrenderY !='undefined' && e.zrenderY ||
            typeof e.offsetY !='undefined' && e.offsetY ||
            typeof e.layerY !='undefined' && e.layerY ||
            typeof e.clientY !='undefined' && e.clientY;
    }


    /**
     * @function Ekmap.LevelRenderer.Tool.Event.prototype.getDelta
     * @description Extract the changes of the mouse wheel.
     * @param {Event} e-event.
     * @returns {number} The scroll wheel changes, a positive value indicates that the scroll wheel is scrolling up, and a negative value indicates that the scroll wheel is scrolling down.
     */
    getDelta(e) {
        return typeof e.zrenderDelta !='undefined' && e.zrenderDelta ||
            typeof e.wheelDelta !='undefined' && e.wheelDelta ||
            typeof e.detail !='undefined' && -e.detail;
    }
}