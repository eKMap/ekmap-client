import { Ekmap } from '../Ekmap';
import { CommonServiceBase } from './CommonServiceBase';
import { Util } from '../commontypes/Util';

/**
  * @class Ekmap.DataFlowService
  * @category eKServer DataFlow
  * @classdesc data stream service class
  * @extends {Ekmap.CommonServiceBase}
  * @param {string} url-data stream service address
  * @param {Object} options-parameters.
  * @param {function} options.style-Set the data loading style.
  * @param {function} [options.onEachFeature] Set each data loading popup, etc.
  * @param {GeoJSONObject} [options.geometry] Specify the geometry range, the features within this range can be subscribed.
  * @param {Object} [options.excludeField] -Exclude fields.
  * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
  * @param {Object} [options.headers] request headers.
  */
export class DataFlowService extends CommonServiceBase {


    constructor(url, options) {
        options = options || {};
        /*
         * @constant EVENT_TYPES
         * {Array.<string>}
         * Event types supported by this category
         */
        options.EVENT_TYPES = ["broadcastSocketConnected", "broadcastSocketError", "broadcastFailed", "broadcastSucceeded", "subscribeSocketConnected", "subscribeSocketError", "messageSucceeded", "setFilterParamSucceeded"]
        super(url, options);

        /**
         * @member {GeoJSONObject} Ekmap.DataFlowService.prototype.geometry
         * @description specifies the geometric range, and the elements within this range can be subscribed.
         */
        this.geometry = null;

        /**
         * @member {Object} Ekmap.DataFlowService.prototype.prjCoordSys
         * @description dynamic projection parameters
         */
        this.prjCoordSys = null;

        /**
         * @member {Object} Ekmap.DataFlowService.prototype.excludeField
         * @description exclude fields
         */
        this.excludeField = null;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.DataFlowService";
    }

    /**
     * @function Ekmap.DataFlowService.prototype.broadcast
     * @description Load broadcast data.
     * @param {GeoJSONObject} geoJSONFeature-feature data in JSON format.
     */
    broadcast(geoJSONFeature) {
        if (!this.broadcastWebSocket || !this.broadcastWebSocket.isOpen) {
            this.events.triggerEvent('broadcastFailed');
            return;
        }
        this.broadcastWebSocket.send(JSON.stringify(geoJSONFeature));
        this.events.triggerEvent('broadcastSucceeded');

    }
    /**
     * @function Ekmap.DataFlowService.prototype.setExcludeField
     * @description set exclusion field
     * @param {Object} excludeField-exclude field
     * @returns {this} this
     */
    setExcludeField(excludeField) {
        this.excludeField = excludeField;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function Ekmap.DataFlowService.prototype.setGeometry
     * @description sets the added geometric feature data
     * @param {GeoJSONObject} geometry-Specify the geometry range, the features within this range can be subscribed.
     * @returns {this} this
     */
    setGeometry(geometry) {
        this.geometry = geometry;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function Ekmap.DataFlowService.prototype.unSubscribe
     * @description end subscription data
     */
    unSubscribe() {
        if (!this.subscribeWebSocket) {
            return;
        }
        this.subscribeWebSocket.close();
        this.subscribeWebSocket = null;
    }

    /**
     * @function Ekmap.DataFlowService.prototype.unBroadcast
     * @description end loading broadcast
     */
    unBroadcast() {
        if (!this.broadcastWebSocket) {
            return;
        }
        this.broadcastWebSocket.close();
        this.broadcastWebSocket = null;
    }

    /**
     * @function Ekmap.DataFlowService.prototype.destroy
     * @override
     */
    destroy() {
        CommonServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.geometry = null;
        me.prjCoordSys = null;
        me.excludeField = null;
        this.unBroadcast();
        this.unSubscribe();

    }


    _getFilterParams() {
        var filter = {
            filterParam: {
                prjCoordSys: this.prjCoordSys,
                excludeField: this.excludeField,
                geometry: this.geometry
            }
        };
        return Util.toJSON(filter);
    }


    _onMessage(e) {
        if (e.data && e.data.indexOf("filterParam") >= 0) {
            var filterParam = JSON.parse(e.data);
            e.filterParam = filterParam;
            e.eventType ='setFilterParamSucceeded';
            this.events.triggerEvent('setFilterParamSucceeded', e);
            return;
        }
        var feature = JSON.parse(e.data);
        e.featureResult = feature;
        e.eventType ='messageSucceeded';
        this.events.triggerEvent('messageSucceeded', e);
    }
}

Ekmap.DataFlowService = DataFlowService;