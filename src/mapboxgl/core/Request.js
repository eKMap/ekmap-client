import mapboxgl from "mapbox-gl";
import "../core/Base";

export class Request {
    static send(url, data, options, callback) {
        options = options || {};
        var self = this;
        // Url
        var encode = (options.encode !== false)
        if (encode) url = encodeURI(url);
        // New request
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url, true);
        if (options.header) {
            for (var header in options.header) {
                ajax.setRequestHeader(header, options.header[header]);
            }
        }
        // Load complete
        //this.dispatchEvent({ type: 'loadstart' });
        ajax.onload = function () {
            // self._request = null;
            // self.dispatchEvent({ type: 'loadend' });
            if (this.status >= 200 && this.status < 400) {
                var response;
                // Decode response
                try {
                    response = JSON.parse(this.response);
                    if (response.features) {
                        callback(response.features);
                    }
                    if (response.results) {
                        callback(response.results);
                    }
                    if (response.layers) {
                        callback(response);
                    }
                    if (response.objectIdFieldName) {
                        callback(response)
                    }
                } catch (e) {

                }
            } else {
            }
        };

        // Oops
        ajax.onerror = function () {
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
    get(options) {
        var ajax = new gclient_ajax(options);
        if (options.success) ajax.on('success', function (e) { options.success(e.response, e); });
        if (options.error) ajax.on('error', function (e) { options.error(e); });
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
    static post(url, data, options, callback) {
        options = options || {};
        var encode = (options.encode !== false)
        if (encode) url = encodeURI(url);
        if (data.adds || data.updates || data.deletes) {
            var dataPost = new FormData();
            dataPost.append("f", "json");
            dataPost.append("adds", data.adds);
            dataPost.append("updates", data.updates);
            dataPost.append("deletes", data.deletes);
            if (options.token) dataPost.append("token", options.token)
        }else{
            if (isNaN(data % 2)) {
                var dataPost = new FormData();
                dataPost.append("f", "json");
                dataPost.append("features", data);
                if (options.token) dataPost.append("token", options.token)
            } else {
                var dataPost = new FormData();
                dataPost.append("f", "json");
                dataPost.append("objectIds", data)
                if (options.token) dataPost.append("token", options.token)
            }
        }
        var ajax = new XMLHttpRequest();
        ajax.open("POST", url, false);
        if (options.header) {
            for (var header in options.header) {
                ajax.setRequestHeader("Content-Type", options.header[header]);
            }
        }
        // Load complete
        ajax.onload = function () {
            // self._request = null;
            // self.dispatchEvent({ type: 'loadend' });
            if (this.status >= 200 && this.status < 400) {
                var response;
                // Decode response
                try {
                    response = JSON.parse(this.response);
                    if(response.addResults && response.updateResults && response.deleteResults)
                        callback(response)
                    else{
                        if (response.addResults) 
                            callback(response.addResults)
                        if (response.updateResults) 
                            callback(response.updateResults)
                        if (response.deleteResults) 
                            callback(response.deleteResults)
                    }
                } catch (e) {
                }
            } else {
            }
        };

        // Oops
        ajax.onerror = function () {
        };
        // GO!
        if (dataPost) {
            ajax.send(dataPost);
        }
        else
            ajax.post();
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
    put(options) {
        var ajax = new gclient_ajax(options);
        if (options.success) ajax.on('success', function (e) { options.success(e.response, e); });
        if (options.error) ajax.on('error', function (e) { options.error(e); });
        ajax.send(options.url, options.data, options.options, "PUT");
    };
}

mapboxgl.ekmap.Request = Request;
