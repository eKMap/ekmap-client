import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
  * @class Ekmap.Format
  * @classdesc Read and write format class base classes of various formats. Its subclasses should contain and implement read and write methods.
  * @category BaseTypes Format
  * @param {Object} options-optional parameters.
  * @param {boolean} [options.keepData=false] If set to true, the data attribute will point to the parsed object (such as JSON or xml data objects).
  * @param {Object} [options.data] When the keepData attribute is set to true, this is the string to be parsed passed to the read operation.
  */
export class Format {


    constructor(options) {
       /**
          * @member {Object} Ekmap.Format.prototype.data
          * @description When the keepData attribute is set to true, this is the string passed to the read operation to be parsed.
          */
        this.data = null;

        /**
         * APIProperty: keepData
         * @member {Object} [Ekmap.Format.prototype.keepData=false]
         * @description keeps a reference to the most recently read data (via the <data> attribute).
         */
        this.keepData = false;

        Util.extend(this, options);
        this.options = options;

        this.CLASS_NAME = "Ekmap.Format";
    }

    /**
      * @function Ekmap.Format.prototype.destroy
      * @description Destroy the format class and release related resources.
      */
     destroy() {
        //Used to destroy the format class and release related resources
    }

    /**
      * @function Ekmap.Format.prototype.read
      * @description to read data from a string.
      * @param {string} data-the data to be read.
      */
     read(data) {// eslint-disable-line no-unused-vars
        //Used to read data from a string
    }

    /**
     * @function Ekmap.Format.prototype.write
     * @description writes the object as a string.
     * @param {Object} object-serializable object.
     * @returns {string} The object is written as a string.
     */
    write(object) {// eslint-disable-line no-unused-vars
        //Used to write strings
    }
}

Ekmap.Format = Ekmap.Format || Format;