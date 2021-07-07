import {
    Ekmap
} from '../Ekmap';
import {
    Format
} from './Format';

/**
  * @class Ekmap.Format.JSON
  * @classdesc The parsing class for safe reading and writing of JSON. Use the {@link Ekmap.Format.JSON} constructor to create a new instance.
  * @category BaseTypes Format
  * @param {Object} [options] parameters.
  * @param {string} [options.indent=" "] used to format the output, the indent string will be used once for each indentation.
  * @param {string} [options.space=" "] used to format the output, the space string will be added after the ":" in the name-value pair.
  * @param {string} [options.newline="\n"] used to format the output, the newline string will be used at the end of each name-value pair or array item.
  * @param {number} [options.level=0] used to format the output, indicating the indentation level.
  * @param {boolean} [options.pretty=false] Whether to use extra space control structure when serializing. Used in the write method.
  * @param {boolean} [options.nativeJSON] The listener object that needs to be registered.
  * @extends {Ekmap.Format}
  */
export class JSONFormat extends Format {

    constructor(options) {
        super(options);
        /**
         * @member {string} [Ekmap.Format.JSON.prototype.indent=" "]
         * @description is used to format the output, and the indent string will be used once for each indentation.
         */
        this.indent = "";

        /**
         * @member {string} [Ekmap.Format.JSON.prototype.space=" "]
         * @description is used to format the output, and the space string will be added after the ":" of the name-value pair.
         */
        this.space = "";

        /**
         * @member {string} [Ekmap.Format.JSON.prototype.newline="\n"]
         * @description is used to format the output, and the newline string will be used at the end of each name-value pair or array item.
         */
        this.newline = "\n";

        /**
         * @member {integer} [Ekmap.Format.JSON.prototype.level=0]
         * @description is used to format the output, indicating the indentation level.
         */
        this.level = 0;

        /**
         * @member {boolean} [Ekmap.Format.JSON.prototype.pretty=false]
         * @description Whether to use extra space control structure when serializing. Used in the write method.
         */
        this.pretty = false;

        /**
         * @member {boolean} Ekmap.Format.JSON.prototype.nativeJSON
         * @description Determines whether the browser natively supports JSON format data.
         */
        this.nativeJSON = (function() {
            return !!(window.JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function");
        })();

        this.CLASS_NAME = "Ekmap.Format.JSON";
        /**
         * @member Ekmap.Format.JSON.prototype.serialize
         * @description provides methods for converting some types of objects to JSON strings.
         */
        this.serialize = {
            /**
             * @function Ekmap.Format.JSON.serialize.object
             * @description converts the object into a JSON string.
             * @param {Object} object-serializable object.
             * @returns {string} JSON string.
             */
            'object': function(object) {
                // three special objects that we want to treat differently
                if (object == null) {
                    return "null";
                }
                if (object.constructor === Date) {
                    return this.serialize.date.apply(this, [object]);
                }
                if (object.constructor === Array) {
                    return this.serialize.array.apply(this, [object]);
                }
                var pieces = ['{'];
                this.level += 1;
                var key, keyJSON, valueJSON;

                var addComma = false;
                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        // recursive calls need to allow for sub-classing
                        keyJSON = this.write.apply(this, [key, this.pretty]);
                        valueJSON = this.write.apply(this, [object[key], this.pretty]);
                        if (keyJSON != null && valueJSON != null) {
                            if (addComma) {
                                pieces.push(',');
                            }
                            pieces.push(this.writeNewline(), this.writeIndent(),
                                keyJSON, ':', this.writeSpace(), valueJSON);
                            addComma = true;
                        }
                    }
                }

                this.level -= 1;
                pieces.push(this.writeNewline(), this.writeIndent(), '}');
                return pieces.join('');
            },

           /**
              * @function Ekmap.Format.JSON.serialize.array
              * @description converts the array into a JSON string.
              * @param {Array} array-serializable array.
              * @returns {string} JSON string.
              */
            'array': function(array) {
                var json;
                var pieces = ['['];
                this.level += 1;

                for (var i = 0, len = array.length; i < len; ++i) {
                    // recursive calls need to allow for sub-classing
                    json = this.write.apply(this, [array[i], this.pretty]);
                    if (json != null) {
                        if (i > 0) {
                            pieces.push(',');
                        }
                        pieces.push(this.writeNewline(), this.writeIndent(), json);
                    }
                }

                this.level -= 1;
                pieces.push(this.writeNewline(), this.writeIndent(), ']');
                return pieces.join('');
            },

            /**
              * @function Ekmap.Format.JSON.serialize.string
              * @description converts the string into a JSON string.
              * @param {string} string-Serializable string.
              * @returns {string} JSON string.
              */
            'string': function(string) {
                // If the string contains no control characters, no quote characters, and no
                // backslash characters, then we can simply slap some quotes around it.
                // Otherwise we must also replace the offending characters with safe
                // sequences.
                var m = {
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                };
                /*eslint-disable no-control-regex*/
                if (/["\\\x00-\x1f]/.test(string)) {
                    return '"' + string.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    }) + '"';
                }
                return '"' + string + '"';
            },

            /**
              * @function Ekmap.Format.JSON.serialize.number
              * @description converts the number into a JSON string.
              * @param {number} number-serializable number.
              * @returns {string} JSON string.
              */
            'number': function(number) {
                return isFinite(number) ? String(number) : "null";
            },

            /**
             * @function Ekmap.Format.JSON.serialize.boolean
             * @description Transform a boolean into a JSON string.
             * @param {boolean} bool - The boolean to be serialized.
             * @returns {string} A JSON string representing the boolean.
             */
            'boolean': function(bool) {
                return String(bool);
            },

            /**
              * @function Ekmap.Format.JSON.serialize.object
              * @description converts the date object into a JSON string.
              * @param {Date} date-serializable date object.
              * @returns {string} JSON string.
              */
            'date': function(date) {
                function format(number) {
                    // Format integers to have at least two digits.
                    return (number < 10) ? '0' + number : number;
                }

                return '"' + date.getFullYear() + '-' +
                    format(date.getMonth() + 1) + '-' +
                    format(date.getDate()) + 'T' +
                    format(date.getHours()) + ':' +
                    format(date.getMinutes()) + ':' +
                    format(date.getSeconds()) + '"';
            }
        };
    }

    /**
      * @function Ekmap.Format.JSON.prototype.read
      * @description parses a string conforming to the JSON structure.
      * @param {string} json-a string conforming to the JSON structure.
      * @param {function} filter-filter method, each key-value pair in the final result will call the filter method, and replace the value returned by the method in the corresponding value position.
      * @returns {Object} Object, array, string or number.
      */
    read(json, filter) {
        var object;
        if (this.nativeJSON) {
            try {
                object = JSON.parse(json, filter);
            } catch (e) {
                // Fall through if the regexp test fails.
            }
        }

        if (this.keepData) {
            this.data = object;
        }

        return object;
    }

    /**
      * @function Ekmap.Format.JSON.prototype.write
      * @description serializes an object to a string in JSON format.
      * @param {(object|string|Array|number|boolean)} value-The object, array, string, number, Boolean value that needs to be serialized.
      * @param {boolean} [pretty=false] Whether to use extra space control structure when serializing. Used in the write method.
      * @returns {string} A string conforming to the JSON format.
      *
      */
    write(value, pretty) {
        this.pretty = !!pretty;
        var json = null;
        var type = typeof value;
        if (this.serialize[type]) {
            try {
                json = (!this.pretty && this.nativeJSON) ?
                    JSON.stringify(value) :
                    this.serialize[type].apply(this, [value]);
            } catch (err) {
                //Ekmap.Console.error("Trouble serializing: " + err);
            }
        }
        return json;
    }

   /**
      * @function Ekmap.Format.JSON.prototype.writeIndent
      * @description outputs an indented string according to the indentation level.
      * @private
      * @returns {string} An appropriately indented string.
      */
    writeIndent() {
        var pieces = [];
        if (this.pretty) {
            for (var i = 0; i < this.level; ++i) {
                pieces.push(this.indent);
            }
        }
        return pieces.join('');
    }

   /**
      * @function Ekmap.Format.JSON.prototype.writeNewline
      * @description outputs a string representing a new line in the formatted output mode.
      * @private
      * @returns {string} The string representing the new line.
      */
    writeNewline() {
        return (this.pretty)? this.newline:'';
    }

    /**
     * @function Ekmap.Format.JSON.prototype.writeSpace
     * @private
     * @description outputs a string representing spaces in the formatted output mode.
     * @returns {string} A space.
     */
    writeSpace() {
        return (this.pretty)? this.space:'';
    }

}

Ekmap.Format.JSON = JSONFormat;