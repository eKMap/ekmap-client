import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { Util } from '../core/Util';
import { Request } from '../core/Request';
import { Parse } from '../core/Parse';

/**
 * Mô tả vào đây.
 *
 * @options {number} mô tả options.
 * @example
 * var fls = new FeatureLayerService({url:'xxxx'});
 */
export class Service extends mapboxgl.Evented {

    constructor(url, options) {
        super();
        this.url = url;
        this.options = options ? options : {};
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

        if (this.options.token) {
            dataPost.token = this.options.token;
        }
        if (this.options.requestParams) {
            Util.extend(dataPost, this.options.requestParams);
        }
        if (this._authenticating) {
            this._requestQueue.push([method, path, dataPost, callback, context]);
            return;
        } else {
            var url = this.url + path;
            return Request.post(url, dataPost, {}, callback);
        }
    }

    _createServiceCallback(method, path, params, callback, context) {
        return Util.bind(function (error, response) {
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

mapboxgl.ekmap.Service = Service;