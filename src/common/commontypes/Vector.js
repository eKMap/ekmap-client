import { Ekmap } from '../Ekmap';
import { Feature } from './Feature';
import { Util } from './Util';

export class Vector extends Feature {


    constructor(geometry, attributes, style) {
        super(null, null, attributes);

        this.fid = null;
        this.geometry = geometry ? geometry : null;
        this.attributes = {};
        if (attributes) {
            this.attributes = Util.extend(this.attributes, attributes);
        }
        this.bounds = null;
        this.state = null;
        this.style = style ? style : null;
        this.url = null;
        this.lonlat = null;
        this.CLASS_NAME = "Ekmap.Feature.Vector";
        // TRASH THIS
        Ekmap.State = {
            /** states */
            UNKNOWN: 'Unknown',
            INSERT: 'Insert',
            UPDATE: 'Update',
            DELETE: 'Delete'
        };

        Vector.style = {
            'default': {
                fillColor: "#ee9900",
                fillOpacity: 0.4,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "#ee9900",
                strokeOpacity: 1,
                strokeWidth: 1,
                strokeLinecap: "round",
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                cursor: "inherit",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3
            },
            'select': {
                fillColor: "blue",
                fillOpacity: 0.4,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "blue",
                strokeOpacity: 1,
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                cursor: "pointer",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3

            },
            'temporary': {
                fillColor: "#66cccc",
                fillOpacity: 0.2,
                hoverFillColor: "white",
                hoverFillOpacity: 0.8,
                strokeColor: "#66cccc",
                strokeOpacity: 1,
                strokeLinecap: "round",
                strokeWidth: 2,
                strokeDashstyle: "solid",
                hoverStrokeColor: "red",
                hoverStrokeOpacity: 1,
                hoverStrokeWidth: 0.2,
                pointRadius: 6,
                hoverPointRadius: 1,
                hoverPointUnit: "%",
                pointerEvents: "visiblePainted",
                //cursor:"inherit",
                cursor: "default",
                fontColor: "#000000",
                labelAlign: "cm",
                labelOutlineColor: "white",
                labelOutlineWidth: 3

            },
            'delete': {
                display: "none"
            }
        };
    }

    /**
     * @function Ekmap.Feature.Vector.prototype.destroy
     * @description nullify references to prevent circular references and memory leaks
     */
    destroy() {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null;
        }

        this.geometry = null;
        super.destroy();
    }

    /**
     * @function Ekmap.Feature.Vector.prototype.clone
     * @description Create a clone of this vector feature.  Does not set any non-standard
     *     properties.
     * @returns {Ekmap.Feature.Vector} An exact clone of this vector feature.
     */
    clone() {
        return new Vector(
            this.geometry ? this.geometry.clone() : null,
            this.attributes,
            this.style);
    }

    toState(state) {
        if (state === Ekmap.State.UPDATE) {
            switch (this.state) {
                case Ekmap.State.UNKNOWN:
                case Ekmap.State.DELETE:
                    this.state = state;
                    break;
                case Ekmap.State.UPDATE:
                case Ekmap.State.INSERT:
                    break;
            }
        } else if (state === Ekmap.State.INSERT) {
            switch (this.state) {
                case Ekmap.State.UNKNOWN:
                    break;
                default:
                    this.state = state;
                    break;
            }
        } else if (state === Ekmap.State.DELETE) {
            switch (this.state) {
                case Ekmap.State.INSERT:
                    // the feature should be destroyed
                    break;
                case Ekmap.State.DELETE:
                    break;
                case Ekmap.State.UNKNOWN:
                case Ekmap.State.UPDATE:
                    this.state = state;
                    break;
            }
        } else if (state === Ekmap.State.UNKNOWN) {
            this.state = state;
        }
    }
}
Ekmap.Feature.Vector = Vector;