import { Ekmap } from '../Ekmap';
import { Vector } from '../commontypes/Vector';
import { ServerGeometry } from './ServerGeometry';
import { Util } from '../commontypes/Util';

/**
  * @class Ekmap.ServerFeature
  * @category iServer
  * @classdesc The vector feature class of the server. This class describes the related information of the vector elements returned by the server, including fields and geometric information.
  * @param {Object} options-parameters.
  * @param {Ekmap.ServerGeometry} geometry-the geometric information of the vector feature.
  * @param {Array.<string>} [options.fieldNames] A collection of attribute field names of vector features.
  * @param {Array.<string>} [options.fieldValues] A collection of attribute field values of vector features.
*/
export class ServerFeature {

    constructor(options) {

       /**
          * @member {Array.<string>} [Ekmap.ServerFeature.prototype.fieldNames]
          * @description A collection of attribute field names of vector elements.
          */
        this.fieldNames = null;

        /**
         * @member {Array.<string>} [Ekmap.ServerFeature.prototype.fieldValues]
         * @description The attribute field value collection of vector elements.
         */
        this.fieldValues = null;

        /**
         * @member {Ekmap.ServerGeometry} Ekmap.ServerFeature.prototype.geometry
         * @description The geometric information of the vector element.
         */
        this.geometry = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "Ekmap.ServerFeature";
    }

    /**
      * @function Ekmap.ServerFeature.prototype.destroy
      * @description releases the resource and blanks the attribute of the referenced resource.
      */
    destroy() {
        var me = this;
        me.fieldNames = null;
        me.fieldValues = null;
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    }

    /**
      * @function Ekmap.ServerFeature.prototype.toFeature
      * @description converts the server-side vector feature ServerFeature to the client-side vector feature Feature.
      * @returns {Ekmap.Vector} The converted client vector features.
      */
    toFeature() {
        var names, values, geo,
            attr = {},
            me = this,
            feature;

        names = me.fieldNames;
        values = me.fieldValues;
        for (var i in names) {
            attr[names[i]] = values[i];
        }
        if (me.geometry) {
            geo = me.geometry.toGeometry();
        }
        feature = new Vector(geo, attr);
        if (me.geometry && me.geometry.id) {
            feature.fid = me.geometry.id;
        }

        return feature;
    }

   /**
      * @function Ekmap.ServerFeature.prototype.fromJson
      * @description converts the JSON object representation server vector feature into ServerFeature.
      * @param {Object} jsonObject-The JSON object to be converted.
      * @returns {Ekmap.ServerFeature} The converted ServerFeature object.
      */
    static fromJson(jsonObject) {
        var geo = null;
        if (!jsonObject) {
            return;
        }
        geo = jsonObject.geometry;
        if (geo) {
            geo = ServerGeometry.fromJson(geo);
        }
        return new ServerFeature({
            fieldNames: jsonObject.fieldNames,
            fieldValues: jsonObject.fieldValues,
            geometry: geo
        });
    }

}


Ekmap.ServerFeature = ServerFeature;