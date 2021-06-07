import { Ekmap } from '../Ekmap';

/**
 * @name Date
 * @memberOf Ekmap
 * @namespace
 * @category BaseTypes Util
 * @description Contains the implementation of the parse and toISOString methods. The two methods are used to parse RFC 3339 dates and follow the ECMAScript 5 specification.
 */
export var DateExt = Ekmap.Date = {

    toISOString: (function() {
        if ("toISOString" in Date.prototype) {
            return function(date) {
                return date.toISOString();
            };
        } else {
            function pad(num, len) {
                var str = num + "";
                while (str.length < len) {
                    str = "0" + str;
                }
                return str;
            }

            return function(date) {
                var str;
                if (isNaN(date.getTime())) {
                    // ECMA-262 says throw RangeError, Firefox returns
                    // "Invalid Date"
                    str = "Invalid Date";
                } else {
                    str =
                        date.getUTCFullYear() + "-" +
                        pad(date.getUTCMonth() + 1, 2) + "-" +
                        pad(date.getUTCDate(), 2) + "T" +
                        pad(date.getUTCHours(), 2) + ":" +
                        pad(date.getUTCMinutes(), 2) + ":" +
                        pad(date.getUTCSeconds(), 2) + "." +
                        pad(date.getUTCMilliseconds(), 3) + "Z";
                }
                return str;
            };
        }

    })(),

    parse: function(str) {
        var date;
        var match = str.match(/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:(?:T(\d{1,2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(?:[+-]\d{1,2}(?::(\d{2}))?)))|Z)?$/);
        if (match && (match[1] || match[7])) { // must have at least year or time
            var year = parseInt(match[1], 10) || 0;
            var month = (parseInt(match[2], 10) - 1) || 0;
            var day = parseInt(match[3], 10) || 1;
            date = new Date(Date.UTC(year, month, day));
            // optional time
            var type = match[7];
            if (type) {
                var hours = parseInt(match[4], 10);
                var minutes = parseInt(match[5], 10);
                var secFrac = parseFloat(match[6]);
                var seconds = secFrac | 0;
                var milliseconds = Math.round(1000 * (secFrac - seconds));
                date.setUTCHours(hours, minutes, seconds, milliseconds);
                // check offset
                if (type !== "Z") {
                    var hoursOffset = parseInt(type, 10);
                    var minutesOffset = parseInt(match[8], 10) || 0;
                    var offset = -1000 * (60 * (hoursOffset * 60) + minutesOffset * 60);
                    date = new Date(date.getTime() + offset);
                }
            }
        } else {
            date = new Date("invalid");
        }
        return date;
    }
};