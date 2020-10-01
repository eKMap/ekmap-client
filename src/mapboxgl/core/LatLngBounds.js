import { LatLng } from './LatLng';
import mapboxgl from 'mapbox-gl';

/*
 * @class LatLngBounds
 * @aka L.LatLngBounds
 *
 * Represents a rectangular geographical area on a map.
 *
 * @example
 *
 * ```js
 * var corner1 = L.latLng(40.712, -74.227),
 * corner2 = L.latLng(40.774, -74.125),
 * bounds = L.latLngBounds(corner1, corner2);
 * ```
 *
 * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * map.fitBounds([
 * 	[40.712, -74.227],
 * 	[40.774, -74.125]
 * ]);
 * ```
 *
 * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
 *
 * Note that `LatLngBounds` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

export class LatLngBounds { // (LatLng, LatLng) or (LatLng[])

    constructor(corner1, corner2) {
        if (!corner1) { return; }
        var latlngs = corner2 ? [corner1, corner2] : corner1;
        if (!latlngs.length)
            this.extend(latlngs)
        else {
            for (var i = 0, len = latlngs.length; i < len; i++) {
                this.extend(latlngs[i]);
            }
        }
    }

    LatLngBound(corner1, corner2) {
        if (!corner1) { return; }

        var latlngs = corner2 ? [corner1, corner2] : corner1;
        if (!latlngs.length)
            this.extend(latlngs)
        else {
            for (var i = 0, len = latlngs.length; i < len; i++) {
                this.extend(latlngs[i]);
            }
        }
        return this;
    }

    extend(obj) {
        var sw = this._southWest,
            ne = this._northEast,
            sw2, ne2;
        sw2 = obj._sw;
        ne2 = obj._ne;
        if (!sw2 || !ne2) { return this; }
        if (!sw && !ne) {
            this._southWest = new LatLng(sw2.lat, sw2.lng);
            this._northEast = new LatLng(ne2.lat, ne2.lng);
        } else {
            sw.lat = Math.min(sw2.lat, sw.lat);
            sw.lng = Math.min(sw2.lng, sw.lng);
            ne.lat = Math.max(ne2.lat, ne.lat);
            ne.lng = Math.max(ne2.lng, ne.lng);
        }
        return obj ;
    };

    getSouthWest() {
        return this._southWest;
    };

    getNorthEast() {
        return this._northEast;
    };

    static toLatLngBounds(a, b) {
        if (a instanceof LatLngBounds) {
            return a;
        }
        return new LatLngBounds(a, b);
    }
}



// @method extend(latlng: LatLng): this
// Extend the bounds to contain the given point

// @alternative
// @method extend(otherBounds: LatLngBounds): this
// Extend the bounds to contain the given bounds



// TODO International date line?

// @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
// Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

// @alternative
// @factory L.latLngBounds(latlngs: LatLng[])
// Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
mapboxgl.ekmap.LatLngBounds = LatLngBounds;
