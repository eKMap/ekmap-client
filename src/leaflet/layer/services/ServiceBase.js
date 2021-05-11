import L from 'leaflet';
import '../../core/Base';
import { Util } from '../../core/Util';
import { Request } from '../../core/Request';

/**
 * @class L.ekmap.ServiceBase
 * @category  BaseType Service
 * @description L.ekmap base class.
 * @param {Object} options The optional parameters.
 * @param {string} options.url (Required) The URL to the MapService.
 * @param {string} options.token - Will use this token to authenticate all calls to the service.
 * @param {string} options.tokenKey - Will use this token to authenticate all calls to the service.
 * @extends {L.Evented}
 * 
 */
export class ServiceBase extends L.Evented {

    constructor(options) {
        super(options);
        this.options = Util.getUrlParams(options);
        this.url = this.options.url;
        /**
         * @event L.ekmap.ServiceBase#initialized
         * @description .
         * @property {Object} this this .
         */
        this.fire('initialized', this);
    }

    request(path, params, callback, context) {
        return this._request(path, params, callback, context);
    }

    _request(path, params, callback, context) {
        this.fire('requeststart', {
            url: this.url + path,
            params: params,
        }, true);
        if (this.options.token) {
            params.token = this.options.token;
        }
        if (this.options.tokenKey) {
            params.tokenKey = this.options.tokenKey;
        }
        if (this.options.requestParams) {
            Util.extend(params, this.options.requestParams);
        }
        if (this._authenticating) {
            return;
        } else {
            var url = this.url + path;
            return Request.send(url + '?' + Util.serialize(params), "", {}, callback);
        }
    }

    post(path, dataPost, callback, context) {
        return this._post(path, dataPost, callback, context);
    }

    _post(path, dataPost, callback, context) {
        this.fire('poststart', {
            url: this.url + path,
            dataPost: dataPost,
        }, true);
        if (this.options.requestParams) {
            Util.extend(dataPost, this.options.requestParams);
        }
        var data = {};
        if (this.options.token) {
            data.token = this.options.token;
        }
        if (this._authenticating) {
            this._requestQueue.push([method, path, dataPost, callback, context]);
            return;
        } else {
            var url = this.url + path;
            return Request.post(url + '?' + Util.serialize(data), dataPost, this.options, callback);
        }
    }

    _createServiceCallback(method, path, params, callback, context) {
        return Util.bind(function(error, response) {
            if (error && (error.code === 499 || error.code === 498)) {
                this._authenticating = true;

                this._requestQueue.push([method, path, params, callback, context]);

                // fire an event for users to handle and re-authenticate
                this.fire('authenticationrequired', {
                    authenticate: Util.bind(this.authenticate, this)
                }, true);

                // if the user has access to a callback they can handle the auth error
                error.authenticate = Util.bind(this.authenticate, this);
            }

            callback.call(context, error, response);

            if (error) {
                this.fire('requesterror', {
                    url: this.options.url + path,
                    params: params,
                    message: error.message,
                    code: error.code,
                    method: method
                }, true);
            } else {
                this.fire('requestsuccess', {
                    url: this.options.url + path,
                    params: params,
                    response: response,
                    method: method
                }, true);
            }

            this.fire('requestend', {
                url: this.options.url + path,
                params: params,
                method: method
            }, true);
        }, this);
    }
}

L.ekmap.ServiceBase = ServiceBase;