import {
    Ekmap
} from '../Ekmap';
import {
    Events
} from '../commontypes/Events';
import {
    Credential
} from '../commontypes/Credential';
import {
    Util
} from '../commontypes/Util';
import {
    ServerType
} from '../REST';
import {
    JSONFormat as JSON
} from '../format/JSON';
import {
    FunctionExt
} from '../commontypes/BaseTypes';

/**
  * @class Ekmap.CommonServiceBase
  * @category eKServer
  * @classdesc The base class of Service that connects to various services of eKServer.
  * @param {string} url-service address.
  * @param {Object} options-parameters.
  * @param {Object} options.eventListeners-event listener object. The processCompleted attribute can be passed into the callback function after the processing is completed. The processFailed attribute is passed into the callback function after processing failure.
  * @param {string} [options.proxy] service proxy address.
  * @param {Ekmap.ServerType} [options.serverType=Ekmap.ServerType.EKSERVER] Server type, EKSERVER.
  * @param {boolean} [options.withCredentials=false] Whether the request carries cookies.
  * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
  * @param {Object} [options.headers] request headers.
  */
export class CommonServiceBase {

    constructor(url, options) {
        let me = this;

        this.EVENT_TYPES = ["processCompleted", "processFailed"];

        this.events = null;

        this.eventListeners = null;

        this.url = null;

        this.urls = null;

        this.proxy = null;

        this.serverType = null;

        this.index = null;

        this.length = null;

        this.options = null;

        this.totalTimes = null;

        this.POLLING_TIMES = 3;

        this._processSuccess = null;

        this._processFailed = null;

        this.isInTheSameDomain = null;

        this.withCredentials = false;



        if (Util.isArray(url)) {
            me.urls = url;
            me.length = url.length;
            me.totalTimes = me.length;
            if (me.length === 1) {
                me.url = url[0];
            } else {
                me.index = parseInt(Math.random() * me.length);
                me.url = url[me.index];
            }
        } else {
            me.totalTimes = 1;
            me.url = url;
        }

        if (Util.isArray(url) && !me.isServiceSupportPolling()) {
            me.url = url[0];
            me.totalTimes = 1;
        }

        me.serverType = me.serverType || ServerType.ISERVER;

        options = options || {};
        this.crossOrigin = options.crossOrigin;
        this.headers = options.headers;
        Util.extend(this, options);

        me.isInTheSameDomain = Util.isInTheSameDomain(me.url);

        me.events = new Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        this.CLASS_NAME = "Ekmap.CommonServiceBase";
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.destroy
     * @description Release the resource and leave the attribute of the referenced resource blank.
     */
    destroy() {
        let me = this;
        if (Util.isArray(me.urls)) {
            me.urls = null;
            me.index = null;
            me.length = null;
            me.totalTimes = null;
        }
        me.url = null;
        me.options = null;
        me._processSuccess = null;
        me._processFailed = null;
        me.isInTheSameDomain = null;

        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.request
     * @description: This method is used to send a request to the service.
     * @param {Object} options-parameters.
     * @param {string} [options.method='GET'] request method, including "GET", "POST", "PUT", "DELETE".
     * @param {string} [options.url] The address to send the request to.
     * @param {Object} [options.params] A set of key-value pairs added to the URL as a query string. This parameter is only applicable to requests sent in GET mode.
     * @param {string} [options.data] The data sent to the server.
     * @param {function} options.success-the callback function after the request is successful.
     * @param {function} options.failure-the callback function after the request fails.
     * @param {Object} [options.scope] If the callback function is a public method of the object, set the scope of the object.
     * @param {boolean} [options.isInTheSameDomain] Whether the request is in the current domain.
     * @param {boolean} [options.withCredentials=false] Whether the request carries cookies.
     * @param {boolean} [options.crossOrigin] Whether to allow cross-domain requests.
     * @param {Object} [options.headers] request headers.
     */
     request(options) {
        let me = this;
        options.url = options.url || me.url;
        options.proxy = options.proxy || me.proxy;
        options.withCredentials = options.withCredentials != undefined? options.withCredentials: me.withCredentials;
        options.crossOrigin = options.crossOrigin != undefined? options.crossOrigin: me.crossOrigin;
        options.headers = options.headers || me.headers;
        options.isInTheSameDomain = me.isInTheSameDomain;
        //Add a piece of security authentication information to the url
        let credential = this.getCredential(options.url);
        if (credential) {
            options.url = Util.urlAppend(options.url, credential.getUrlParameters());
        }

        me.calculatePollingTimes();
        me._processSuccess = options.success;
        me._processFailed = options.failure;
        options.scope = me;
        options.success = me.getUrlCompleted;
        options.failure = me.getUrlFailed;
        me.options = options;
        me._commit(me.options);
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.getCredential
     * @description Get credential information
     * @param {string} url-service address.
     * @returns {Ekmap.Credential} Credential information object.
     */
    getCredential(url) {
        let keyUrl = url,
            credential, value;
        switch (this.serverType) {
            case ServerType.IPORTAL:
                value = SecurityManager.getToken(keyUrl);
                credential = value? new Credential(value, "token"): null;
                if (!credential) {
                    value = SecurityManager.getKey(keyUrl);
                    credential = value? new Credential(value, "key"): null;
                }
                break;
            case ServerType.ONLINE:
                value = SecurityManager.getKey(keyUrl);
                credential = value? new Credential(value, "key"): null;
                break;
            default:
                //eKServer or others
                value = SecurityManager.getToken(keyUrl);
                credential = value? new Credential(value, "token"): null;
                break;
        }
        return credential;
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.getUrlCompleted
     * @description This method is executed after the request is successful.
     * @param {Object} result-the result object returned by the server.
     */
    getUrlCompleted(result) {
        let me = this;
        me._processSuccess(result);
    }


    /**
     * @function Ekmap.CommonServiceBase.prototype.getUrlFailed
     * @description This method is executed after the request fails.
     * @param {Object} result-the result object returned by the server.
     */
    getUrlFailed(result) {
        let me = this;
        if (me.totalTimes> 0) {
            me.totalTimes--;
            me.ajaxPolling();
        } else {
            me._processFailed(result);
        }
    }


    /**
     *
     * @function Ekmap.CommonServiceBase.prototype.ajaxPolling
     * After the @description request fails, if the remaining number of failed requests is not 0, get the URL again and send the request
     */
    ajaxPolling() {
        let me = this,
            url = me.options.url,
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
        me.index = parseInt(Math.random() * me.length);
        me.url = me.urls[me.index];
        url = url.replace(re, re.exec(me.url)[0]);
        me.options.url = url;
        me.options.isInTheSameDomain = Util.isInTheSameDomain(url);
        me._commit(me.options);
    }


    /**
     * @function Ekmap.CommonServiceBase.prototype.calculatePollingTimes
     * @description Calculates the number of failed executions of the remaining request.
     */
    calculatePollingTimes() {
        let me = this;
        if (me.times) {
            if (me.totalTimes> me.POLLING_TIMES) {
                if (me.times> me.POLLING_TIMES) {
                    me.totalTimes = me.POLLING_TIMES;
                } else {
                    me.totalTimes = me.times;
                }
            } else {
                if (me.times <me.totalTimes) {
                    me.totalTimes = me.times;
                }
            }

        } else {
            if (me.totalTimes> me.POLLING_TIMES) {
                me.totalTimes = me.POLLING_TIMES;
            }
        }
        me.totalTimes--;
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.isServiceSupportPolling
     * @description Determines whether the service supports polling.
     */
    isServiceSupportPolling() {
        let me = this;
        return !(
            me.CLASS_NAME === "Ekmap.REST.ThemeService" ||
            me.CLASS_NAME === "Ekmap.REST.EditFeaturesService"
        );
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.serviceProcessCompleted
     * @description status is complete, execute this method.
     * @param {Object} result-the result object returned by the server.
     */
    serviceProcessCompleted(result) {
        result = Util.transformResult(result);
        this.events.triggerEvent("processCompleted", {
            result: result
        });
    }

    /**
     * @function Ekmap.CommonServiceBase.prototype.serviceProcessFailed
     * @description status failed, execute this method.
     * @param {Object} result-the result object returned by the server.
     */
    serviceProcessFailed(result) {
        result = Util.transformResult(result);
        let error = result.error || result;
        this.events.triggerEvent("processFailed", {
            error: error
        });
    }

    _commit(options) {
        if (options.method === "POST" || options.method === "PUT") {
            if (options.params) {
                options.url = Util.urlAppend(options.url,
                    Util.getParameterString(options.params || {}));
            }
            options.params = options.data;
        }
        FetchRequest.commit(options.method, options.url, options.params, {
            headers: options.headers,
            withCredentials: options.withCredentials,
            crossOrigin: options.crossOrigin,
            timeout: options.async? 0: null,
            proxy: options.proxy
        }).then(function(response) {
            if (response.text) {
                return response.text();
            }
            if (response.json) {
                return response.json();
            }
            return response;
        }).then(function(text) {
            var result = text;
            if (typeof text === "string") {
                result = new JSON().read(text);
            }
            if (!result || result.error || result.code >= 300 && result.code !== 304) {
                if (result && result.error) {
                    result = {
                        error: result.error
                    };
                } else {
                    result = {
                        error: result
                    };
                }
            }
            if (result.error) {
                var failure = (options.scope)? FunctionExt.bind(options.failure, options.scope): options.failure;
                failure(result);
            } else {
                result.succeed = result.succeed == undefined? true: result.succeed;
                var success = (options.scope)? FunctionExt.bind(options.success, options.scope): options.success;
                success(result);
            }
        }).catch(function(e) {
            var failure = (options.scope)? FunctionExt.bind(options.failure, options.scope): options.failure;
            failure(e);
        })
    }
}

Ekmap.CommonServiceBase = CommonServiceBase;

/**
 * Server request callback function
 * @callback RequestCallback
 * @example
 * var requestCallback = function (serviceResult){
 * console.log(serviceResult.result);
 *}
 * new QueryService(url).queryByBounds(param, requestCallback);
 * @param {Object} serviceResult
 * @param {Object} serviceResult.result The server returns the result.
 * @param {Object} serviceResult.object The object that publishes the application event.
 * @param {Object} serviceResult.type event type.
 * @param {Object} serviceResult.element The DOM node that accepts browser events.
 */