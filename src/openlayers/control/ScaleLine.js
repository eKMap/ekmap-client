import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Scale from 'ol/control/ScaleLine';
import * as olProj from 'ol/proj';
import AssertionError from 'ol/AssertionError';

/**
 * @class ol.ekmap.control.ScaleLine
 * @category  Control
 * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a scaleline..
 * @extends {ol/control/ScaleLine}
 * @param {options} options Scale line options.
 * @param {string} options.className='ol-scale-line' CSS Class name.
 * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.
 * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.
 * @param {(ol.control.ScaleLineUnits|string)} options.units='metric' Units.
 * @example
 * var control = new ol.ekmap.control.ScaleLine();
 *      map.addControl(control)
 */
export class ScaleLine extends Scale {

    constructor(options) {
        options = options || {};
        options.render = function (mapEvent) {
            var frameState = mapEvent.frameState;
            if (!frameState) {
                this.viewState_ = null;
            } else {
                this.viewState_ = frameState.viewState;
            }
            this.updateElementRepair();
        }
        super(options);
    }

    updateElementRepair() {
        const viewState = this.viewState_ || this.o;

        if (!viewState) {
            this.renderedVisible_ = this.renderedVisible_ || this.j;
            if (this.renderedVisible_) {
                this.element_ = this.element_ || this.c;
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
            }
            return;
        }

        const center = viewState.center;
        const projection = viewState.projection;
        const units = this.getUnits();
        const pointResolutionUnits = units == "degrees" ?
            "degrees" :
            "m";
        let pointResolution =
            olProj.getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
        this.minWidth_ = this.minWidth_ || this.v;
        let nominalCount = this.minWidth_ * pointResolution;
        let suffix = '';
        if (units == "degrees") {
            const metersPerDegree = olProj.METERS_PER_UNIT["degrees"];
            nominalCount *= metersPerDegree;
            if (nominalCount < metersPerDegree / 60) {
                suffix = '\u2033'; // seconds
                pointResolution *= 3600;
            } else if (nominalCount < metersPerDegree) {
                suffix = '\u2032'; // minutes
                pointResolution *= 60;
            } else {
                suffix = '\u00b0'; // degrees
            }
        } else if (units == "imperial") {
            if (nominalCount < 0.9144) {
                suffix = 'in';
                pointResolution /= 0.0254;
            } else if (nominalCount < 1609.344) {
                suffix = 'ft';
                pointResolution /= 0.3048;
            } else {
                suffix = 'mi';
                pointResolution /= 1609.344;
            }
        } else if (units == "nautical") {
            pointResolution /= 1852;
            suffix = 'nm';
        } else if (units == "metric") {
            if (nominalCount < 0.001) {
                suffix = 'μm';
                pointResolution *= 1000000;
            } else if (nominalCount < 1) {
                suffix = 'mm';
                pointResolution *= 1000;
            } else if (nominalCount < 1000) {
                suffix = 'm';
            } else {
                suffix = 'km';
                pointResolution /= 1000;
            }
        } else if (units == "us") {
            if (nominalCount < 0.9144) {
                suffix = 'in';
                pointResolution *= 39.37;
            } else if (nominalCount < 1609.344) {
                suffix = 'ft';
                pointResolution /= 0.30480061;
            } else {
                suffix = 'mi';
                pointResolution /= 1609.3472;
            }
        } else {
            throw new AssertionError(33); // Invalid units
        }
        var DIGITS = [1, 2, 5];
        let i = 3 * Math.floor(
            Math.log(this.minWidth_ * pointResolution) / Math.log(10));
        let count, width, decimalCount;
        while (true) { //eslint-disable-line no-constant-condition
            decimalCount = Math.floor(i / 3);
            const decimal = Math.pow(10, decimalCount);
            count = DIGITS[((i % 3) + 3) % 3] * decimal;
            width = Math.round(count / pointResolution);
            if (isNaN(width)) {
                this.element.style.display = 'none';
                this.renderedVisible_ = false;
                return;
            } else if (width >= this.minWidth_) {
                break;
            }
            ++i;
        }
        this.renderedHTML_ = this.renderedHTML_ || this.D;
        this.innerElement_ = this.innerElement_ || this.l;
        this.renderedWidth_ = this.renderedWidth_ || this.B;
        this.renderedVisible_ = this.renderedVisible_ || this.j;
        this.element_ = this.element_ || this.c;
        let html = count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix;
        if (this.renderedHTML_ != html) {
            this.innerElement_.innerHTML = html;
            this.renderedHTML_ = html;
        }

        if (this.renderedWidth_ != width) {
            this.innerElement_.style.width = width + 'px';
            this.renderedWidth_ = width;
        }

        if (!this.renderedVisible_) {
            this.element.style.display = '';
            this.renderedVisible_ = true;
        }
    }
}
