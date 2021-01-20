import gclient_ext_inherits from './inherits';

import ol_Object from 'ol/Object'

/** Ajax
 * @constructor
 * @fires success
 * @fires error
 * @param {*} options
 *  @param {string} options.auth Xác thực nếu cần, dạng btoa("username:password");
 *  @param {string} options.dataType Loại dữ liệu trả về, mặc định JSON
 *  @param {Object} options.customHeader Header cần bổ sung. Dạng key value
 */
var gclient_ajax = function(options) {
    options = options || {};

    ol_Object.call(this);

    this._auth = options.auth;
    this._header = options.customHeader;
    this.set('dataType', options.dataType || 'JSON');
};
gclient_ext_inherits(gclient_ajax, ol_Object);

gclient_ajax.prototype.send = function(url, data, options, method) {
    options = options || {};
    if (!method) method = "GET";
    var self = this;
    // Url
    // Url
    var encode = (options.encode !== false)
    if (encode) url = encodeURI(url);

    // Parameters
    if (method == "GET") {
        var parameters = '';
        for (var index in data) {
            if (data.hasOwnProperty(index) && data[index] !== undefined) {
                parameters += (parameters ? '&' : '?') + index + '=' + (encode ? encodeURIComponent(data[index]) : data[index]);
            }
        }
        url += parameters;
    }
    // New request
    var ajax = this._request = new XMLHttpRequest();
    ajax.open(method, url, true);
    if (this._auth) {
        ajax.setRequestHeader("Authorization", "Basic " + this._auth);
    }
    if (this._header) {
        for (var header in this._header) {
            ajax.setRequestHeader(header, this._header[header]);
        }
    }
    // Load complete
    this.dispatchEvent({ type: 'loadstart' });
    ajax.onload = function() {
        self._request = null;
        self.dispatchEvent({ type: 'loadend' });
        if (this.status >= 200 && this.status < 400) {
            var response;
            // Decode response
            try {
                switch (self.get('dataType')) {
                    case 'JSON':
                        {
                            response = JSON.parse(this.response);
                            break;
                        }
                    default:
                        {
                            response = this.response;
                        }
                }
            } catch (e) {
                // Error
                self.dispatchEvent({
                    type: 'error',
                    status: 0,
                    statusText: 'parsererror',
                    error: e,
                    options: options,
                    jqXHR: this
                });
                return;
            }
            self.dispatchEvent({
                type: 'success',
                response: response,
                status: this.status,
                statusText: this.statusText,
                options: options,
                jqXHR: this
            });
        } else {
            self.dispatchEvent({
                type: 'error',
                status: this.status,
                statusText: this.statusText,
                options: options,
                jqXHR: this
            });
        }
    };

    // Oops
    ajax.onerror = function() {
        self._request = null;
        self.dispatchEvent({ type: 'loadend' });
        self.dispatchEvent({
            type: 'error',
            status: this.status,
            statusText: this.statusText,
            options: options,
            jqXHR: this
        });
    };

    // GO!
    if (data)
        ajax.send(JSON.stringify(data));
    else
        ajax.send();
};

/** Phương thức GET
 * @param {*} options
 *  @param {string} options.url
 *  @param {string} options.auth Xác thực nếu cần, dạng btoa("username:password");
 *  @param {string} options.dataType Loại dữ liệu trả về, mặc định JSON
 *  @param {string} options.success Hàm callback khi success
 *  @param {string} options.error Hàm callback khi error
 */
gclient_ajax.get = function(options) {
    var ajax = new gclient_ajax(options);
    if (options.success) ajax.on('success', function(e) { options.success(e.response, e); });
    if (options.error) ajax.on('error', function(e) { options.error(e); });
    ajax.send(options.url, options.data, options.options);
};

/** Phương thức POST
 * @param {*} options
 *  @param {string} options.url
 *  @param {string} options.auth Xác thực nếu cần, dạng btoa("username:password");
 *  @param {string} options.dataType Loại dữ liệu trả về, mặc định JSON
 *  @param {string} options.data Dữ liệu POST lên
 *  @param {string} options.success Hàm callback khi success
 *  @param {string} options.error Hàm callback khi error
 */
gclient_ajax.post = function(options) {
    var ajax = new gclient_ajax(options);
    if (options.success) ajax.on('success', function(e) { options.success(e.response, e); });
    if (options.error) ajax.on('error', function(e) { options.error(e); });
    ajax.send(options.url, options.data, options.options, "POST");
};

/** Phương thức PUT
 * @param {*} options
 *  @param {string} options.url
 *  @param {string} options.auth Xác thực nếu cần, dạng btoa("username:password");
 *  @param {string} options.dataType Loại dữ liệu trả về, mặc định JSON
 *  @param {string} options.data Dữ liệu PUT lên
 *  @param {string} options.success Hàm callback khi success
 *  @param {string} options.error Hàm callback khi error
 */
gclient_ajax.put = function(options) {
    var ajax = new gclient_ajax(options);
    if (options.success) ajax.on('success', function(e) { options.success(e.response, e); });
    if (options.error) ajax.on('error', function(e) { options.error(e); });
    ajax.send(options.url, options.data, options.options, "PUT");
};


export default gclient_ajax