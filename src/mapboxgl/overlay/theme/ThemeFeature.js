import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import { GeometryPoint as Point, GeoText, GeometryVector as Vector } from '../../../common';
import { Util } from '../../core/Util';

/**
 * @class mapboxgl.ekmap.ThemeFeature
 * @category  Visualization Theme
 * @classdesc Thematic map feature class.
 * @param {GeoJSONObject} geometry The geometric object of the thematic map element.
 * @param {Object} attributes Geometric object properties.
 */
export class ThemeFeature {

    constructor(geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    }

    /**
     * @function mapboxgl.ekmap.ThemeFeature.prototype.toFeature
     * @description Converted to vector elements.
     */
    toFeature() {
        var geometry = Util.toEkmapGeometry(this.geometry);
        var points = [];
        if (this.geometry instanceof mapboxgl.LngLat) {
            points = [this.geometry.lng, this.geometry.lat];
        } else if (this.geometry instanceof mapboxgl.Point) {
            points = [this.geometry.x, this.geometry.y];
        } else if (this.geometry.length === 3) {
            geometry = new GeoText(this.geometry[0], this.geometry[1], this.geometry[2]);
        }
        if (points.length > 1) {
            geometry = new Point(points[0], points[1]);
        }
        return new Vector(geometry, this.attributes);
    }
}

mapboxgl.ekmap.ThemeFeature = ThemeFeature;