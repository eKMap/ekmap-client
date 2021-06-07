import { Util } from './Util';
export class LonLat {


    constructor(lon, lat) {
        if (Util.isArray(lon)) {
            lat = lon[1];
            lon = lon[0];
        }
        this.lon = lon ? Util.toFloat(lon) : 0.0;
        this.lat = lat ? Util.toFloat(lat) : 0.0;
        this.CLASS_NAME = "Ekmap.LonLat";
    }

    toString() {
        return ("lon=" + this.lon + ",lat=" + this.lat);
    }

    toShortString() {
        return (this.lon + "," + this.lat);
    }

    clone() {
        return new LonLat(this.lon, this.lat);
    }

    add(lon, lat) {
        if ((lon == null) || (lat == null)) {
            throw new TypeError('LonLat.add cannot receive null values');
        }
        return new LonLat(this.lon + Util.toFloat(lon),
            this.lat + Util.toFloat(lat));
    }

    equals(ll) {
        var equals = false;
        if (ll != null) {
            equals = ((this.lon === ll.lon && this.lat === ll.lat) ||
                (isNaN(this.lon) && isNaN(this.lat) && isNaN(ll.lon) && isNaN(ll.lat)));
        }
        return equals;
    }

    wrapDateLine(maxExtent) {

        var newLonLat = this.clone();

        if (maxExtent) {
            //shift right?
            while (newLonLat.lon < maxExtent.left) {
                newLonLat.lon += maxExtent.getWidth();
            }

            //shift left?
            while (newLonLat.lon > maxExtent.right) {
                newLonLat.lon -= maxExtent.getWidth();
            }
        }

        return newLonLat;
    }

    destroy() {
        this.lon = null;
        this.lat = null;
    }

    static fromString(str) {
        var pair = str.split(",");
        return new LonLat(pair[0], pair[1]);
    }

    static fromArray(arr) {
        var gotArr = Util.isArray(arr),
            lon = gotArr && arr[0],
            lat = gotArr && arr[1];
        return new LonLat(lon, lat);
    }


}