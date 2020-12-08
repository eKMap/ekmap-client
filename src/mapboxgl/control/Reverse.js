import '../core/Base';
import mapboxgl from 'mapbox-gl';

/**
 * @class mapboxgl.ekmap.control.Reverse
 * @category  Control
 * @classdesc Reverse.
 * @param {Object} options Construction parameters.
 * @param {LngLatLike} options.coordinates Will use this token to authenticate all calls to the service.
 * @param {string} options.token Will use this token to authenticate all calls to the service.
 * @param {string} options.provider Will use this token to authenticate all calls to the service.
 * @param {String} options.placeholder=Search Override the default placeholder attribute value.
 * @param {string} options.target Specify a target if you want the control to be rendered outside of the map's viewport.</br> If target is equal to null or undefined, control will render by default. 
 * 
 * @extends {mapboxgl.Evented}
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.ekmap.control.Reverse({ setStyle: true }),'bottom-right');
 * (end)
 */

export class Reverse extends mapboxgl.Evented {

    constructor(options) {
        super(options);
        this.options = options ? options : {};
        this.url = '';
        this.lastSelected = null;
        var EventEmitter = require('events').EventEmitter;
        this._eventEmitter = new EventEmitter();
        this.target = this.options.target;

    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.onAdd
     * @description Register a control on the map and give it a chance to register event listeners and resources. This method is called by Map#addControl internally.
     * @param {Map} map the Map this control will be added to.
     * @returns {HTMLElement}  The control's container element. This should be created by the control and returned by onAdd without being attached to the DOM: the map will insert the control's element into the DOM as necessary.
     */
    onAdd(map) {
        this._map = map;

        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onPaste = this._onPaste.bind(this);
        this._showButton = this._showButton.bind(this);
        this._hideButton = this._hideButton.bind(this);
        var Typeahead = require('suggestions');
        if (this.target) {
            this.targetContainer = document.getElementById(this.target);
            this.targetContainer.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl';
        } else {
            this._container = document.createElement('div');
            this._container.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl';
        }

        var searchIcon = this.createIcon('search', '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>')
        this._inputEl = document.createElement('input');
        this._inputEl.type = 'text';
        this._inputEl.className = 'mapboxgl-ctrl-geocoder--input';
        this._inputEl.placeholder = this.options.placeholder ? this.options.placeholder : 'Search';
        this._inputEl.setAttribute('aria-label', this._inputEl.placeholder);
        //Event input
        var _ = require('lodash');
        this._inputEl.addEventListener('keydown', _.debounce(this._onKeyDown, 200));
        this._inputEl.addEventListener('paste', this._onPaste);
        this._inputEl.addEventListener('change', this._onChange);

        this._inputEl.addEventListener('keyup', function(e) {
            console.log(e)
        }.bind(this));

        var actions = document.createElement('div');
        actions.classList.add('mapboxgl-ctrl-geocoder--pin-right');

        this._clearEl = document.createElement('button');
        this._clearEl.setAttribute('aria-label', 'Clear');
        this._clearEl.addEventListener('click', this.clear);
        this._clearEl.className = 'mapboxgl-ctrl-geocoder--button';

        var buttonIcon = this.createIcon('close', '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>')
        this._clearEl.appendChild(buttonIcon);

        this._loadingEl = this.createIcon('loading', '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>');

        actions.appendChild(this._clearEl);
        actions.appendChild(this._loadingEl);

        if (this.target) {
            this.targetContainer.addEventListener('mouseenter', this._showButton);
            this.targetContainer.addEventListener('mouseleave', this._hideButton);
            this.targetContainer.appendChild(searchIcon);
            this.targetContainer.appendChild(this._inputEl);
            this.targetContainer.appendChild(actions);
        } else {
            this._container.addEventListener('mouseenter', this._showButton);
            this._container.addEventListener('mouseleave', this._hideButton);
            this._container.appendChild(searchIcon);
            this._container.appendChild(this._inputEl);
            this._container.appendChild(actions);
        }


        this._typeahead = new Typeahead(this._inputEl, [], {
            filter: false,
            minLength: 2,
            limit: 5
        });

        this.mapMarker = null;
        this._handleMarker = this._handleMarker.bind(this);
        return this._container
    }

    /**
     * @function mapboxgl.ekmap.control.Reverse.prototype.onRemove
     * @description Unregister a control on the map and give it a chance to detach event listeners and resources. This method is called by Map#removeControl internally.
     * @param {Map} map the Map this control will be removed from.
     * @returns {undefined}  there is no required return value for this method.
     */
    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    createLayerInputToggle() {
        if (!this.target) {
            var button = document.createElement("button");
            var icon = document.createElement("i");
            icon.className = this.icon;
            button.className = "mapboxgl-ctrl-zoom-in"
            button.appendChild(icon);
        } else {
            var button = document.getElementById(this.target);
        }
        return button
    }

    createIcon(name, path) {
        var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('class', 'mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-' + name);
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
        return icon;
    }

    _onKeyDown(e) {
        var ESC_KEY_CODE = 27,
            TAB_KEY_CODE = 9;

        if (e.keyCode === ESC_KEY_CODE) {
            this._clear(e);
            return this._inputEl.blur();
        }

        // if target has shadowRoot, then get the actual active element inside the shadowRoot
        var target = e.target && e.target.shadowRoot ?
            e.target.shadowRoot.activeElement :
            e.target;
        var value = target ? target.value : '';

        if (!value) {
            this.fresh = true;
            // the user has removed all the text
            if (e.keyCode !== TAB_KEY_CODE) this.clear(e);
            return (this._clearEl.style.display = 'none');
        }

        // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
        if ((e.metaKey || [TAB_KEY_CODE, ESC_KEY_CODE, 37, 39, 13, 38, 40].indexOf(e.keyCode) !== -1))
            return;

        if (target.value.length >= 2) {
            this._geocode(target.value);
        }
    }

    _onPaste(e) {
        var value = (e.clipboardData || window.clipboardData).getData('text');
        if (value.length >= 2) {
            this._geocode(value);
        }
    }

    _onChange() {
        var selected = this._typeahead.selected;
        if (selected && JSON.stringify(selected) !== this.lastSelected) {
            this._clearEl.style.display = 'none';
            if (this.options.flyTo) {
                var flyOptions;
                if (selected.properties && exceptions[selected.properties.short_code]) {
                    flyOptions = extend({}, this.options.flyTo);
                    if (this._map) {
                        this._map.fitBounds(exceptions[selected.properties.short_code].bbox, flyOptions);
                    }
                } else if (selected.bbox) {
                    var bbox = selected.bbox;
                    flyOptions = extend({}, this.options.flyTo);
                    if (this._map) {
                        this._map.fitBounds([
                            [bbox[0], bbox[1]],
                            [bbox[2], bbox[3]]
                        ], flyOptions);
                    }
                } else {
                    var defaultFlyOptions = {
                        zoom: this.options.zoom
                    }
                    flyOptions = extend({}, defaultFlyOptions, this.options.flyTo);
                    //  ensure that center is not overriden by custom options
                    flyOptions.center = selected.center;
                    if (this._map) {
                        this._map.flyTo(flyOptions);
                    }
                }
            }
            if (this.options.marker && this._mapboxgl) {
                this._handleMarker(selected);
            }

            // After selecting a feature, re-focus the textarea and set
            // cursor at start.
            this._inputEl.focus();
            this._inputEl.scrollLeft = 0;
            this._inputEl.setSelectionRange(0, 0);
            this.lastSelected = JSON.stringify(selected);
            this._eventEmitter.emit('result', { result: selected });
            this.eventManager.select(selected, this);
        }
    }

    _showButton() {
        if (this._typeahead.selected) this._clearEl.style.display = 'block';
    }

    _hideButton() {
        if (this._typeahead.selected) this._clearEl.style.display = 'none';
    }

    /**
     * Shared logic for clearing input
     * @param {Event} [ev] the event that triggered the clear, if available
     * @private
     *
     */
    _clear(ev) {
        if (ev) ev.preventDefault();
        this._inputEl.value = '';
        this._typeahead.selected = null;
        this._typeahead.clear();
        this._onChange();
        this._clearEl.style.display = 'none';
        this._removeMarker();
        this.lastSelected = null;
        this._eventEmitter.emit('clear');
        this.fresh = true;
    }

    /**
     * Clear and then focus the input.
     * @param {Event} [ev] the event that triggered the clear, if available
     *
     */
    clear(ev) {
        this._clear(ev);
        this._inputEl.focus();
    }

    _geocode(searchInput) {
        this._loadingEl.style.display = 'block';
        var extend = require('xtend');
        this._eventEmitter.emit('loading', { query: searchInput });
        this.inputString = searchInput;
        // Possible config proprerties to pass to client
        var keys = [
            'bbox',
            'limit',
            'proximity',
            'countries',
            'types',
            'language',
            'reverseMode',
            'mode'
        ];
        var self = this;
        var geocoderError = null;
        // Create config object
        var config = keys.reduce(function(config, key) {
            if (self.options[key]) {
                // countries, types, and language need to be passed in as arrays to client
                // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
                ['countries', 'types', 'language'].indexOf(key) > -1 ?
                    (config[key] = self.options[key].split(/[\s,]+/)) :
                    (config[key] = self.options[key]);

                if (key === 'proximity' && self.options[key] && typeof self.options[key].longitude === 'number' && typeof self.options[key].latitude === 'number') {
                    config[key] = [self.options[key].longitude, self.options[key].latitude]
                }
            }
            return config;
        }, {});

        var request;
        if (this.options.localGeocoderOnly) {
            request = Promise.resolve();
        }
        // check if searchInput resembles coordinates, and if it does,
        // make the request a reverseGeocode
        else if (
            this.options.reverseGeocode &&
            /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
        ) {
            // parse coordinates
            var coords = searchInput.split(/[\s(,)?]+/).map(function(c) {
                return parseFloat(c, 10);
            }).reverse();

            // client only accepts one type for reverseGeocode, so
            // use first config type if one, if not default to poi
            config.types ? [config.types[0]] : ["poi"];
            config = extend(config, { query: coords, limit: 1 });

            // drop proximity which may have been set by trackProximity since it's not supported by the reverseGeocoder
            if ('proximity' in config) {
                delete config.proximity;
            }

            request = this.geocoderService.reverseGeocode(config).send();
        } else {
            config = extend(config, { query: searchInput });
            request = this.geocoderService.forwardGeocode(config).send();
        }

        var localGeocoderRes = [];
        if (this.options.localGeocoder) {
            localGeocoderRes = this.options.localGeocoder(searchInput);
            if (!localGeocoderRes) {
                localGeocoderRes = [];
            }
        }
        var externalGeocoderRes = [];

        request.catch(function(error) {
                geocoderError = error;
            }.bind(this))
            .then(
                function(response) {
                    this._loadingEl.style.display = 'none';

                    var res = {};

                    if (!response) {
                        res = {
                            type: 'FeatureCollection',
                            features: []
                        }
                    } else if (response.statusCode == '200') {
                        res = response.body;
                        res.request = response.request
                        res.headers = response.headers
                    }

                    res.config = config;

                    if (this.fresh) {
                        this.eventManager.start(this);
                        this.fresh = false;
                    }

                    // supplement Mapbox Geocoding API results with locally populated results
                    res.features = res.features ?
                        localGeocoderRes.concat(res.features) :
                        localGeocoderRes;

                    if (this.options.externalGeocoder) {

                        externalGeocoderRes = this.options.externalGeocoder(searchInput, res.features) || [];
                        // supplement Mapbox Geocoding API results with features returned by a promise
                        return externalGeocoderRes.then(function(features) {
                            res.features = res.features ? features.concat(res.features) : features;
                            return res;
                        }, function() {
                            // on error, display the original result
                            return res;
                        });
                    }
                    return res;

                }.bind(this)).then(
                function(res) {
                    console.log(res)
                    if (geocoderError) {
                        throw geocoderError;
                    }

                    // apply results filter if provided
                    if (this.options.filter && res.features.length) {
                        res.features = res.features.filter(this.options.filter);
                    }

                    if (res.features.length) {
                        this._clearEl.style.display = 'block';
                        this._eventEmitter.emit('results', res);
                        this._typeahead.update(res.features);
                    } else {
                        this._clearEl.style.display = 'none';
                        this._typeahead.selected = null;
                        this._renderNoResults();
                        this._eventEmitter.emit('results', res);
                    }

                }.bind(this)
            ).catch(
                function(err) {
                    this._loadingEl.style.display = 'none';

                    // in the event of an error in the Mapbox Geocoding API still display results from the localGeocoder
                    if ((localGeocoderRes.length && this.options.localGeocoder) || (externalGeocoderRes.length && this.options.externalGeocoder)) {
                        this._clearEl.style.display = 'block';
                        this._typeahead.update(localGeocoderRes);
                    } else {
                        this._clearEl.style.display = 'none';
                        this._typeahead.selected = null;
                        this._renderError();
                    }

                    this._eventEmitter.emit('results', { features: localGeocoderRes });
                    this._eventEmitter.emit('error', { error: err });
                }.bind(this)
            );

        return request;
    }


    /**
     * Handle the placement of a result marking the selected result
     * @private
     * @param {Object} selected the selected geojson feature
     * @returns {MapboxGeocoder} this
     */
    _handleMarker(selected) {
        // clean up any old marker that might be present
        if (!this._map) {
            return;
        }
        this._removeMarker();
        var defaultMarkerOptions = {
            color: '#4668F2'
        }
        var markerOptions = extend({}, defaultMarkerOptions, this.options.marker)
        this.mapMarker = new mapboxgl.Marker(markerOptions);
        if (selected.center) {
            this.mapMarker
                .setLngLat(selected.center)
                .addTo(this._map);
        } else if (selected.geometry && selected.geometry.type && selected.geometry.type === 'Point' && selected.geometry.coordinates) {
            this.mapMarker
                .setLngLat(selected.geometry.coordinates)
                .addTo(this._map);
        }
        return this;
    }

    /**
     * Handle the removal of a result marker
     * @private
     */
    _removeMarker() {
        if (this.mapMarker) {
            this.mapMarker.remove();
            this.mapMarker = null;
        }
    }

}

mapboxgl.ekmap.control.Reverse = Reverse;