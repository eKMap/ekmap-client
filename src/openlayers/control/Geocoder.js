import { transform as ol_proj_transform } from 'ol/proj'
import gclient_ajax from './ext/ajax';
import Control from 'ol/control/Control';
import olObject from 'ol/Object';

/**
 * Control tìm kiếm vị trí theo địa chỉ, với nhiều nguồn dữ liệu: OSM, Bing, Mapquest, Opencage, Photon.
 * 
 * Không sử dụng trên bản đồ
 * @constructor
 * @extends {ol.Object}
 * @fires select (Sự kiện chọn địa chỉ)
 * @fires searchforcus (forcus ô nhập)
 * @fires searchblur (blur ô nhập)
 * @fires searchclear (xóa ô nhập)
 * @fires searchend (hoàn thành tìm kiếm)
 * @param {Object=} target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * @param {Object=} options Đối tượng mở rộng
 *  @param {string} options.className CSS mở rộng
 *  @param {string | undefined} options.viewbox Giới hạn vùng bao tìm kiếm: xmin,ymin,xmax,ymax
 *  @param {string | undefined} options.countrycode Giới hạn tìm kiếm theo quốc gia. (Mã quốc gia theo ISO 3166-1 alpha2.)
 *  @param {string | undefined} options.placeholder placeholder của ô tìm kiếm. Mặc định "Nhập để tìm kiếm..."
 *  @param {number | undefined} this.typing  Thời gian deplay để bắt đầu tìm kiếm (ms). Mặc định 500
 *  @param {integer | undefined} options.minLength Ký tự tối thiểu để bắt đầu tìm kiếm, mặc định 3
 *  @param {integer | undefined} options.maxItems Tối đa kết quả hiển thị. Mặc định 10
 *  @param {string} options.provider Nguồn tìm kiếm dữ liệu, bao gồm: osm, bing, mapquest, opencage, photon. Mặc định osm
 */
var Geocode = /*@__PURE__*/ (function(Control) {
    function Geocode(target, opt_options) {
        this.options = opt_options ? opt_options : {};
        this.typing = this.options.typing != undefined ? this.options.typing : 500;
        var self = this;

        this.target = target;
        this._classname = this.options.className || 'search';

        var classNames = (this.options.className || '') + 'gclient-search-geocode ol-search-geocode';
        this.element = document.createElement('DIV');
        this.element.className = classNames

        // Search input
        var tout, cur = "";
        var input = this._input = document.createElement("INPUT");
        input.setAttribute("type", "search");
        input.setAttribute("class", "search");
        input.setAttribute("autocomplete", "off");
        input.setAttribute("placeholder", this.options.placeholder || "Nhập để tìm kiếm...");
        input.addEventListener("change", function(e) {
            self.dispatchEvent({ type: "change:input", input: e, value: input.value });
        });
        var path = '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>'
        var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('class', 'ol-ctrl-geocoder--icon');
        icon.setAttribute('viewBox', '0 0 18 18');
        icon.setAttribute('xml:space', 'preserve');
        icon.setAttribute('width', 18);
        icon.setAttribute('height', 18);
        // IE does not have innerHTML for SVG nodes
        if (!('innerHTML' in icon)) {
            var SVGNodeContainer = document.createElement('div');
            SVGNodeContainer.innerHTML = '<svg>' + path.valueOf().toString() + '</svg>';
            var SVGNode = SVGNodeContainer.firstChild,
                SVGPath = SVGNode.firstChild;
            icon.appendChild(SVGPath);
        } else {
            icon.innerHTML = path;
        }

        var doSearch = function(e) {
            var li = self.element.querySelector("ul.autocomplete li.select");
            var val = input.value;
            // move up/down
            if (e.key == 'ArrowDown' || e.key == 'ArrowUp' || e.key == 'Down' || e.key == 'Up') {
                if (li) {
                    li.classList.remove("select");
                    li = (/Down/.test(e.key)) ? li.nextElementSibling : li.previousElementSibling;
                    if (li) li.classList.add("select");
                } else self.element.querySelector("ul.autocomplete li").classList.add("select");
            }
            // Clear input
            else if (e.type == 'input' && !val) {
                setTimeout(function() {
                    self.drawList_();
                    self.dispatchEvent({ type: "searchclear", features: [] });
                }, 200);
            }
            // Select in the list
            else if (li && (e.type == "search" || e.key == "Enter")) {
                if (self.element.classList.contains("ol-control")) input.blur();
                li.classList.remove("select");
                cur = val;
                self._handleSelect(self._list[li.getAttribute("data-search")]);
            }
            // Search / autocomplete
            else if ((e.type == "search" || e.key == 'Enter') ||
                (cur != val && self.typing >= 0)) {
                // current search
                cur = val;
                if (cur) {
                    // prevent searching on each typing
                    if (tout) clearTimeout(tout);
                    tout = setTimeout(function() {
                        if (cur.length >= self.get("minLength")) {
                            var s = self.autocomplete(cur, function(auto) { self.drawList_(auto); });
                            if (s) self.drawList_(s);
                        } else self.drawList_();
                    }, self.typing);
                } else self.drawList_();
            }
            // Clear list selection
            else {
                li = self.element.querySelector("ul.autocomplete li");
                if (li) li.classList.remove('select');
            }
        };
        input.addEventListener("keyup", doSearch);
        input.addEventListener("search", doSearch);
        input.addEventListener("cut", doSearch);
        input.addEventListener("paste", doSearch);
        input.addEventListener("input", doSearch);
        //   if (!options.noCollapse) {
        input.addEventListener('blur', function() {
            self.dispatchEvent({ type: "searchblur", features: self._list });
            setTimeout(function() {
                if (input !== document.activeElement) {
                    self.element.classList.add('ol-collapsed');
                    this.set('reverse', false);
                    self.element.classList.remove('ol-revers');
                }
            }.bind(self), 200);
        }.bind(self));
        input.addEventListener('focus', function() {
            self.dispatchEvent({ type: "searchforcus", features: self._list });
            if (!self.get('reverse')) {
                self.element.classList.remove('ol-collapsed');
                self.element.classList.remove('ol-revers');
            }
        }.bind(self));
        //   }
        this.element.appendChild(icon);
        this.element.appendChild(input);
        // Autocomplete list
        var ul = document.createElement('UL');
        ul.classList.add('autocomplete');
        this.element.appendChild(ul);

        if (this.target) {
            var container = document.getElementById(this.target);
            container.appendChild(this.element);
        } else
            Control.call(this, {
                element: this.element,
            });

        let provider = this.options.provider;
        olObject.call(this, this.options);

        if (typeof(this.options.getTitle) == 'function') this.getTitle = this.options.getTitle;
        if (typeof(this.options.autocomplete) == 'function') this.autocomplete = this.options.autocomplete;

        // Options
        //   this.set('copy', options.copy);
        this.set('minLength', this.options.minLength || 3);
        this.set('maxItems', this.options.maxItems || 10);
        //   this.set('maxHistory',  options.maxItems || 10);
        // History
        this.restoreHistory();
        this.drawList_();

        // Handle Mix Content Warning
        // If the current connection is an https connection all other connections must be https either
        //   var url = options.url || "";
        //   this.set('url', url);

        this._ajax = new gclient_ajax({ dataType: 'JSON', auth: this.options.authentication });
        this._ajax.on('success', function(resp) {
            if (resp.status >= 200 && resp.status < 400) {
                if (typeof(this._callback) === 'function') this._callback(resp.response);
            } else {
                console.log('AJAX ERROR', arguments);
                this.dispatchEvent({ type: "searchend", features: [], error: arguments });
            }
        }.bind(this));
        this._ajax.on('error', function() {
            console.log('AJAX ERROR', arguments);
            this.dispatchEvent({ type: "searchend", features: [], error: arguments });
        }.bind(this));
        // Handle searchin
        this._ajax.on('loadstart', function() {
            var widthInput = input.clientWidth;
            ul.style.width = widthInput + "px";
            self.element.classList.add('searching');
        }.bind(this));
        this._ajax.on('loadend', function() {
            self.element.classList.remove('searching');
            self.dispatchEvent({ type: "searchend", features: self._list });
        }.bind(self));

        // Overwrite handleResponse
        if (typeof(this.options.handleResponse) === 'function') this.handleResponse = this.options.handleResponse;

        this.setProvider(provider);
        this.set('viewbox', this.options.viewbox);
        this.set('countrycode', this.options.countrycode);
    }

    if (Control) Geocode.__proto__ = Control;
    Geocode.prototype = Object.create(Control && Control.prototype);
    Geocode.prototype.constructor = Geocode;

    /** Lấy đối tượng Input
     *	@return {Element} 
     *	@api
     */
    Geocode.prototype.getInputField = function() {
        return this._input;
    };


    /** Force search to refresh
     * @private
     */
    Geocode.prototype.search = function() {
        var search = this.element.querySelector("input.search");
        this._triggerCustomEvent('search', search);
    };

    /** Reverse geocode
     * @param {Object} event
     *  @param {ol.coordinate} event.coordinate
     * @private
     */
    Geocode.prototype._handleClick = function(e) {
        if (this.get('reverse')) {
            document.activeElement.blur();
            this.reverseGeocode(e.coordinate);
        }
    };

    /** Trigger custom event on elemebt
     * @param {*} eventName 
     * @param {*} element 
     * @private
     */
    Geocode.prototype._triggerCustomEvent = function(eventName, element) {
        gclient_element.dispatchEvent(eventName, element);
    };

    /** Tìm kiếm theo giá trị đầu vào
     *	@param {string} value Giá trị tìm kiếm
     *	@param {boolean} search Có tìm kiếm luôn hay không
     *	@api
     */
    Geocode.prototype.setInput = function(value, search) {
        var input = this.element.querySelector("input.search");
        input.value = value;
        if (search) this._triggerCustomEvent("keyup", input);
    };


    /**
     * Save history and select
     * @param {*} f 
     * @param {boolean} reverse true if reverse geocode
     * @private
     */
    Geocode.prototype._handleSelect = function(f, reverse) {
        if (!f) return;
        // Save input in history
        var hist = this.get('history');
        // Prevent error on stringify
        var i;
        try {
            var fstr = JSON.stringify(f);
            for (i = hist.length - 1; i >= 0; i--) {
                if (!hist[i] || JSON.stringify(hist[i]) === fstr) {
                    hist.splice(i, 1);
                }
            }
        } catch (e) {
            for (i = hist.length - 1; i >= 0; i--) {
                if (hist[i] === f) {
                    hist.splice(i, 1);
                }
            }
        }
        hist.unshift(f);
        while (hist.length > (this.get('maxHistory') || 10)) {
            hist.pop();
        }
        // this.saveHistory();
        // Select feature
        this.select(f, reverse);
        //this.drawList_();
    };

    /** Current history
     * @private
     */
    Geocode.prototype._history = {};

    /** Save history (in the localstorage)
     * @private
     */
    Geocode.prototype.saveHistory = function() {

    };

    /** Restore history (from the localstorage) 
     * @private
     */
    Geocode.prototype.restoreHistory = function() {
        this.set('history', []);
    };

    /**
     * Remove previous history
     * @private
     */
    Geocode.prototype.clearHistory = function() {
        this.set('history', []);
        this.saveHistory();
        this.drawList_();
    };

    /**
     * Get history table
     * @private
     */
    Geocode.prototype.getHistory = function() {
        return this.get('history');
    };


    /** Test if 2 features are equal
     * @param {any} f1
     * @param {any} f2
     * @return {boolean}
     * @private
     */
    Geocode.prototype.equalFeatures = function( /* f1, f2 */ ) {
        return false;
    };


    /** Send ajax request
     * @param {string} url
     * @param {*} data
     * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
     * @private
     */
    Geocode.prototype.ajax = function(url, data, cback, options) {
        options = options || {};
        this._callback = cback;
        this._ajax.set('dataType', options.dataType || 'JSON');
        this._ajax.send(url, data, options);
    };


    /** Autocomplete function (ajax request to the server)
     * @param {string} s search string
     * @param {function} cback a callback function that takes an array of {name, feature} to display in the autocomplete field
     * @private
     */
    Geocode.prototype.autocomplete = function(s, cback) {
        var data = this.requestData(s);
        var url = encodeURI(this.get('url'));
        this.ajax(url, data, function(resp) {
            if (typeof(cback) === 'function') cback(this.handleResponse(resp));
        });
    };


    /**
     * Handle server response to pass the features array to the display list
     * @param {any} response server response
     * @return {Array<any>} an array of feature
     * @private
     */
    Geocode.prototype.handleResponse = function(response) {
        return response;
    };


    /** Trả về chuỗi kết quả hiển thị trên danh sách tìm kiếm
     *	@param {Object} f Đối tượng
     *	@return {string} Chuỗi kết quả
     *	@api
     */
    Geocode.prototype.getTitle = function(f) {
        var provider = this.get('provider');
        if (provider == "photon") {
            // var info = [];
            f = f.properties;
            // if(f.osm_value) info.push(f.osm_value);
            // if(f.city) info.push(f.city);
            // if(f.state) info.push(f.state);
            // if(f.country) info.push(f.country);
            var title = "<img/><span>" + f.name + "</span>";
            return (title);
        } else if (provider == "bing") {
            var title = "<img/><span>" + f.address.formattedAddress + "</span>";
            return (title);
        } else if (provider == "mapquest") {
            // var info = [];
            var display_name = f.display_name;
            // f = f.address;
            // if(f.neighbourhood) info.push(f.neighbourhood);
            // if(f.road) info.push(f.road);
            // if(f.city || f.town) info.push(f.city || f.town);
            // info.push(f.country);
            var title = "<img/><span>" + display_name + "</span>";
            return (title);
        } else if (provider == "opencage") {
            // var info = [];
            // var components = f.components;
            // if(components.house_number)info.push(components.house_number);
            // if(components.road)info.push(components.road);
            // if(components.city || components.town)info.push(components.city || components.town);
            // if(components.state)info.push(components.state);
            // if(components.country)info.push(components.country);
            var title = "<img/><span>" + f.formatted + "</span>";
            return (title);
        } else {
            var title = "<img/><span>" + f.display_name + "</span>";
            return (title);
        }
    };

    /** Tham số tìm kiếm
     * @param {string} s Từ khóa tìm kiếm
     * @return {Object} Tham số (dạng key:value)
     * @api
     */
    Geocode.prototype.requestData = function(s) {
        var data;
        var provider = this.get('provider');
        switch (provider) {
            case "photon":
                data = {
                    q: s,
                    limit: this.get('maxItems'),
                    lang: 'en',
                };
                if (this.get('viewbox')) data.bbox = this.get('viewbox');
                break;
            case "bing":
                data = {
                    query: s,
                    key: 'AicCC5CsDJ5QuXcgSEcRNieeAViD7nwzzSOaOXtyEhmaGkiG-yU-LOzyF3OSDLst',
                    includeNeighborhood: 0,
                    maxResults: this.get('maxItems'),
                };
                if (this.get('countrycode')) data.countryRegion = this.get('countrycode');
                break;
            case "mapquest":
                data = {
                    q: s,
                    key: 'WKzhuynVf45GhkMlnRgRIJKZh3Q0YMD4',
                    format: 'json',
                    addressdetails: 1,
                    limit: this.get('maxItems'),
                    'accept-language': 'en-US',
                };
                if (this.get('viewbox')) data.viewbox = this.get('viewbox');
                if (this.get('countrycode')) data.countrycodes = this.get('countrycode');
                break;
            case "opencage":
                data = {
                    q: s,
                    key: '8c65c06b6d044c2fb34d6fc443925306',
                    limit: this.get('maxItems'),
                    countrycode: '',
                    pretty: 1,
                    no_annotations: 1,
                };
                if (this.get('viewbox')) data.bounds = this.get('viewbox');
                if (this.get('countrycode')) data.countrycode = this.get('countrycode');
                break;
            default: //osm
                data = {
                    format: "json",
                    addressdetails: 1,
                    q: s,
                    polygon_geojson: 0,
                    bounded: 0,
                    limit: this.get('maxItems')
                }
                if (this.get('countrycode')) data.countrycodes = this.get('countrycode');
                if (this.get('viewbox')) data.viewbox = this.get('viewbox');
                break;
        }
        return data;
    };

    /** A ligne has been clicked in the menu > dispatch event
     *	@param {any} f the feature, as passed in the autocomplete
     *	@private
     */
    Geocode.prototype.select = function(f) {
        var c = [Number(f.lon), Number(f.lat)];
        // Add coordinate to the event
        try {
            c = ol_proj_transform(c, 'EPSG:4326', this.getMap().getView().getProjection());

        } catch (e) { /* ok */ }
        this.dispatchEvent({ type: "select", search: f, coordinate: c });
    };

    /** Reverse geocode
     * @param {ol.coordinate} coord
     * @private
     */
    Geocode.prototype.reverseGeocode = function(coord, cback) {
        var lonlat = ol_proj_transform(coord, this.getMap().getView().getProjection(), 'EPSG:4326');
        this.ajax(
            this.get('url').replace('search', 'reverse'), { lon: lonlat[0], lat: lonlat[1], format: 'json' },
            function(resp) {
                if (cback) {
                    cback.call(this, [resp]);
                } else {
                    this._handleSelect(resp, true);
                    //this.setInput('', true);
                }
            }.bind(this)
        );
    };

    /** Thay đổi nguồn tìm kiếm
     *	@param {String} provider osm, bing, mapquest, opencage, photon
     *	 @api
     */
    Geocode.prototype.setProvider = function(provider) {
        this.clearHistory();
        if (this._input) {
            this._input.value = '';
        }
        switch (provider) {
            case "photon":
                this.set('url', 'https://photon.komoot.de/api/');
                this.set('copy', '<a href="http://www.openstreetmap.org/copyright" target="new">&copy; OpenStreetMap contributors</a>');
                break;
            case "bing":
                this.set('url', 'https://dev.virtualearth.net/REST/v1/Locations/');
                this.set('copy', '<a href="https://www.microsoft.com/" target="new">&copy; Microsoft</a>');
                break;
            case "mapquest":
                this.set('url', 'http://open.mapquestapi.com/nominatim/v1/search.php');
                this.set('copy', '<a href="https://www.mapquest.com/" target="new">&copy; MapQuest</a>');
                break;
            case "opencage":
                this.set('url', 'https://api.opencagedata.com/geocode/v1/json');
                this.set('copy', '<a href="https://opencagedata.com/" target="new">&copy; OpenCage</a>');
                break;
            default: //osm
                this.set('url', 'https://nominatim.openstreetmap.org/search');
                this.set('copy', '<a href="http://www.openstreetmap.org/copyright" target="new">&copy; OpenStreetMap contributors</a>');
                break;
        }
        this.set('provider', provider);
    };

    /** Lấy thông tin nguồn dữ liệu tìm kiếm
     *	@return {String} Nguồn dữ liệu
     */
    Geocode.prototype.getProvider = function() {
        return this.get('provider');
    };


    /** Thay đổi vùng bao tìm kiếm
     *	@param {string | undefined} viewbox Vùng bao tìm kiếm: xmin,ymin,xmax,ymax . Nguồn dữ liệu Bing không hỗ trợ theo vùng bao
     *	 @api
     */
    Geocode.prototype.setViewBox = function(viewbox) {
        this.set('viewbox', provider);
    };

    /** Lấy thông tin vùng bao tìm kiếm
     *	@return {string | undefined} viewbox Vùng bao tìm kiếm: xmin,ymin,xmax,ymax
     */
    Geocode.prototype.getViewBox = function() {
        return this.get('viewbox');
    };


    /** Thay đổi quốc gia tìm kiếm
     *	@param {string | undefined} countrycode Mã quốc gia theo ISO 3166-1 alpha2 . Nguồn dữ liệu Photon không hỗ trợ theo quốc gia
     *	@api
     */
    Geocode.prototype.setCountryCode = function(countrycode) {
        this.set('countrycode', countrycode);
    };

    /** Lấy thông tin quốc gia tìm kiếm
     *	@return {string | undefined} Mã quốc gia theo ISO 3166-1 alpha2
     */
    Geocode.prototype.getCountryCode = function() {
        return this.get('countrycode');
    };

    /** Over
     * @param {Array} auto an array of search result
     * @private
     */
    Geocode.prototype.drawList_ = function(auto) {
        var self = this;
        var ul = this.element.querySelector("ul.autocomplete");
        ul.innerHTML = '';
        this._list = [];
        if (!auto) {
            var input = this.element.querySelector("input.search");
            var value = input.value;
            if (!value) {
                auto = this.get('history');
            } else {
                return;
            }
            ul.setAttribute('class', 'autocomplete history');
        } else {
            ul.setAttribute('class', 'autocomplete');
        }
        var li, max;

        var provider = this.get('provider');
        if (provider == "photon") {
            if (!auto || auto.length == 0) return;
            auto = auto.features;
            max = Math.min(self.get("maxItems"), auto.length);
            for (var i = 0; i < max; i++) {
                auto[i].lon = auto[i].geometry.coordinates[0];
                auto[i].lat = auto[i].geometry.coordinates[1];
                if (!i || !self.equalFeatures(auto[i], auto[i - 1])) {
                    li = document.createElement("LI");
                    li.setAttribute("data-search", this._list.length);
                    this._list.push(auto[i]);
                    li.addEventListener("click", function(e) {
                        self._handleSelect(self._list[e.currentTarget.getAttribute("data-search")]);
                    });
                    var title = self.getTitle(auto[i]);
                    if (title instanceof Element) li.appendChild(title);
                    else li.innerHTML = title;
                    ul.appendChild(li);
                }
            }
        } else if (provider == "bing") {
            if (!auto || auto.length == 0) return;
            auto = auto.resourceSets;
            if (auto.length == 0) return;
            auto = auto[0].resources;
            max = Math.min(self.get("maxItems"), auto.length);
            for (var i = 0; i < max; i++) {
                auto[i].lon = auto[i].point.coordinates[1];
                auto[i].lat = auto[i].point.coordinates[0];
                if (!i || !self.equalFeatures(auto[i], auto[i - 1])) {
                    li = document.createElement("LI");
                    li.setAttribute("data-search", this._list.length);
                    this._list.push(auto[i]);
                    li.addEventListener("click", function(e) {
                        self._handleSelect(self._list[e.currentTarget.getAttribute("data-search")]);
                    });
                    var title = self.getTitle(auto[i]);
                    if (title instanceof Element) li.appendChild(title);
                    else li.innerHTML = title;
                    ul.appendChild(li);
                }
            }
        } else if (provider == "mapquest") {
            if (!auto || auto.length == 0) return;
            max = Math.min(self.get("maxItems"), auto.length);
            for (var i = 0; i < max; i++) {
                if (!i || !self.equalFeatures(auto[i], auto[i - 1])) {
                    li = document.createElement("LI");
                    li.setAttribute("data-search", this._list.length);
                    this._list.push(auto[i]);
                    li.addEventListener("click", function(e) {
                        self._handleSelect(self._list[e.currentTarget.getAttribute("data-search")]);
                    });
                    var title = self.getTitle(auto[i]);
                    if (title instanceof Element) li.appendChild(title);
                    else li.innerHTML = title;
                    ul.appendChild(li);
                }
            }
        } else if (provider == "opencage") {
            if (!auto || auto.length == 0) return;
            auto = auto.results;
            if (!auto || auto.length == 0) return;
            max = Math.min(self.get("maxItems"), auto.length);
            for (var i = 0; i < max; i++) {
                auto[i].lon = auto[i].geometry.lng;
                auto[i].lat = auto[i].geometry.lat;
                if (!i || !self.equalFeatures(auto[i], auto[i - 1])) {
                    li = document.createElement("LI");
                    li.setAttribute("data-search", this._list.length);
                    this._list.push(auto[i]);
                    li.addEventListener("click", function(e) {
                        self._handleSelect(self._list[e.currentTarget.getAttribute("data-search")]);
                    });
                    var title = self.getTitle(auto[i]);
                    if (title instanceof Element) li.appendChild(title);
                    else li.innerHTML = title;
                    ul.appendChild(li);
                }
            }
        } else { //osm
            max = Math.min(self.get("maxItems"), auto.length);
            for (var i = 0; i < max; i++) {
                if (auto[i]) {
                    if (!i || !self.equalFeatures(auto[i], auto[i - 1])) {
                        li = document.createElement("LI");
                        li.setAttribute("data-search", this._list.length);
                        this._list.push(auto[i]);
                        li.addEventListener("click", function(e) {
                            self._handleSelect(self._list[e.currentTarget.getAttribute("data-search")]);
                        });
                        var title = self.getTitle(auto[i]);
                        if (title instanceof Element) li.appendChild(title);
                        else li.innerHTML = title;
                        ul.appendChild(li);
                    }
                }
            }
        }
        if (max && this.get("copy")) {
            li = document.createElement("LI");
            li.classList.add("copy");
            li.innerHTML = this.get("copy");
            ul.appendChild(li);
        }
    };

    return Geocode;
}(Control));

export default Geocode;