import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import { ThemeFeature } from './ThemeFeature';
import {
    ServerFeature,
    LonLat,
    GeoJSON as GeoJSONFormat,
    GeometryVector,
    GeometryPoint as Point,
    GeoText,
    LevelRenderer,
    CommonUtil
} from '../../../common';

/**
 * @class mapboxgl.ekmap.ThemeLayer
 * @category Visualization Theme
 * @classdesc Thematic map base class. 
 * @param {string} name The name of the thematic map layer.
 * @param {Object} options Optional parameters.
 * @param {mapboxgl.Map} options.map The current mapboxgl map object will be deprecated in the next version. Please use the map.addLayer() method to add a layer.
 * @param {string} options.id Thematic layer ID. By default, CommonUtil.createUniqueID("themeLayer_") is used to create the thematic layer ID.
 * @param {boolean} options.loadWhileAnimating=true Whether to redraw in real time.
 * @param {boolean} options.visibility=true Whether the layer is visible.
 * @param {number} options.opacity=1 Layer transparency.
 * @fires mapboxgl.ekmap.ThemeLayer#changelayer
 * @fires mapboxgl.ekmap.ThemeLayer#featuresremoved
 */
export class ThemeLayer {

    constructor(name, opt_options) {
        var options = opt_options ? opt_options : {};
        /**
         * @member {string} mapboxgl.ekmap.ThemeLayer.prototype.name
         * @description The name of the thematic map layer.
         */
        this.name = name;

        /**
         * @member {string} [mapboxgl.ekmap.ThemeLayer.prototype.id]
         * @description The thematic map layer id.
         */
        this.id = options.id ? options.id : CommonUtil.createUniqueID("themeLayer_");

        this.type = 'custom';
        /**
         * @member {float} [mapboxgl.ekmap.ThemeLayer.prototype.opacity=1]
         * @description Layer transparency.
         */
        this.opacity = options.opacity ? options.opacity : 1;

        /**
         * @member {boolean} [mapboxgl.ekmap.ThemeLayer.prototype.visibility=true]
         * @description Whether the layer is visible.
         */
        this.visibility = true;

        /**
         * @member {boolean} [mapboxgl.ekmap.ThemeLayer.prototype.loadWhileAnimating=true]
         * @description Whether to redraw in real time. (When drawing large data elements, there will be lag, it is recommended to set this parameter to false).
         */
        this.loadWhileAnimating = options.loadWhileAnimating === undefined ? true : options.loadWhileAnimating;

        /**
         * @member {mapboxgl.Map} mapboxgl.ekmap.ThemeLayer.prototype.map
         * @description map object.
         */
        this.map = options.map ? options.map : null;

        this.features = [];
        this.TFEvents = [];

        if (this.map) {
            this.map.addLayer(this);
        }

    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.onAdd
     * @description Add this layer to the basemap.
     */
    onAdd(map) {
        this.map = map;
        this._createCanvasContainer();

        this.addTFEvents();
        this.map.on('resize', this.resizeEvent.bind(this));
        this.map.on('zoomstart', this.zoomStartEvent.bind(this));
        this.map.on('zoomend', this.zoomEndEvent.bind(this));
        this.map.on('rotatestart', this.rotateStartEvent.bind(this));
        this.map.on('rotate', this.rotateEvent.bind(this));
        this.map.on('rotateend', this.rotateEndEvent.bind(this));
        this.map.on('dragend', this.dragEndEvent.bind(this));
        this.map.on('movestart', this.moveStartEvent.bind(this));
        this.map.on('move', this.moveEvent.bind(this));
        this.map.on('moveend', this.moveEndEvent.bind(this));
        this.map.on('remove', this.removeFromMap.bind(this));

        this.refresh();
    }

    render() {}

    /**
     * @function mapboxgl.ekmap.HeatMapLayer.prototype.refresh
     * @description Force to refresh the current hotspot display, called after the layer hotspot array changes, to update the display.
     */
    refresh() {
        if (this.features.length === 0) {
            return;
        }
        if (this.map) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    _createCanvasContainer() {
        this.movingOffset = [0, 0];
        this.mapContainer = this.map.getCanvasContainer();
        this.div = document.createElement('div');
        this.div.id = this.id;
        this.div.style.position = 'absolute';
        var container = this.map.getCanvasContainer();
        var canvas = this.map.getCanvas();
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.className = "themeLayer";
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        container.appendChild(this.div);
        this.setOpacity(this.opacity);
        this.levelRenderer = new LevelRenderer();
        this.renderer = this.levelRenderer.init(this.div);
        this.renderer.clear();
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.destroyFeatures
     * @description Destroy an element.
     * @param {ekmap.Feature.Vector} features Elements to be destroyed.
     */
    destroyFeatures(features) {
        var all = (features == undefined);
        if (all) {
            features = this.features;
        }
        if (features) {
            this.removeFeatures(features);
            for (var i = features.length - 1; i >= 0; i--) {
                features[i].destroy();
            }
        }
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.setVisibility
     * @description Set the visibility of the layer, and set the corresponding visible mark for hiding, displaying, and redrawing the layer.
     * @param {boolean} visibility Whether to display the layer (the resolution of the current map is between the maximum and minimum resolution).
     */
    setVisibility(visibility) {
        if (visibility !== this.visibility) {
            this.visibility = visibility;
            this.display(visibility);
            this.redrawThematicFeatures(this.map.getBounds());
        }
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.display
     * @description Temporarily hide or show the layer. By generating real-time effects on CSS control, re-rendering becomes invalid. The setVisibility method is generally used to dynamically control the display and hide of the layer.
     * @param {boolean} display Whether to display the layer.
     */
    display(display) {
        this.div.style.display = display ? "block" : "none";
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.setOpacity
     * @description Set the opacity of the layer, the value is between [0-1].
     * @param {number} opacity Opacity.
     */
    setOpacity(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            var element = this.div;
            CommonUtil.modifyDOMElement(element, null, null, null,
                null, null, null, opacity);

            if (this.map !== null) {
                /**
                 * @event mapboxgl.ekmap.ThemeLayer#changelayer
                 * @description Triggered after the layer properties are changed.
                 * @property {Object} layer Layers.
                 * @property {string} property The attribute being changed.
                 */
                mapboxgl.Evented.prototype.fire('changelayer', { layer: this, property: "opacity" });
            }
        }
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.addFeatures
     * @param {mapboxgl.ekmap.ThemeFeature|ekmap.ServerFeature|GeoJSONObject} features Elements to be added.
     * @description Abstract method, instantiable subclass must implement this method. Add data to the thematic map layer.
     */
    addFeatures(features) {

    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.removeFeatures
     * @param {Array.<ekmap.Feature.Vector>} features The array of feature to be deleted.
     * @description Delete feature from the thematic map. This function deletes all the vector elements passed in.
     *              Each item in the features array in the parameter must be a feature that has been added to the current layer，
     *              If you cannot determine the feature array, you can call removeAllFeatures to delete all features.
     *              If there are too many elements in the feature array to be deleted, it is recommended to use removeAllFeatures，
     *              Delete all the features and add them again. This will be more efficient.
     */
    removeFeatures(features) {
        if (!features || features.length === 0) {
            return;
        }
        if (features === this.features) {
            return this.removeAllFeatures();
        }
        if (!(CommonUtil.isArray(features))) {
            features = [features];
        }
        var featuresFailRemoved = [];
        for (var i = features.length - 1; i >= 0; i--) {
            var feature = features[i];
            var findex = CommonUtil.indexOf(this.features, feature);
            if (findex === -1) {
                featuresFailRemoved.push(feature);
                continue;
            }
            this.features.splice(findex, 1);
        }
        var drawFeatures = [];
        for (var hex = 0, len = this.features.length; hex < len; hex++) {
            feature = this.features[hex];
            drawFeatures.push(feature);
        }
        this.features = [];
        this.addFeatures(drawFeatures);
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getBounds());
        }
        var succeed = featuresFailRemoved.length == 0 ? true : false;
        /**
         * @event mapboxgl.ekmap.ThemeLayer#featuresremoved
         * @description Triggered after the element is deleted.
         * @property {Array.<Feature>} features Elements that were not successfully deleted.
         * @property {boolean} succeed Whether the deletion is successful or not.
         */
        mapboxgl.Evented.prototype.fire("featuresremoved", { features: featuresFailRemoved, succeed: succeed });
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.removeAllFeatures
     * @description Clear all the vector features of the current layer.
     */
    removeAllFeatures() {
        if (this.renderer) {
            this.renderer.clear();
        }
        this.features = [];
        mapboxgl.Evented.prototype.fire('featuresremoved', { features: [], succeed: true });
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.getFeatures
     * @description View the valid data in the current layer.
     * @returns {ekmap.Feature.Vector} Valid data added to the layer by the user.
     */
    getFeatures() {
        var len = this.features.length;
        var clonedFeatures = new Array(len);
        for (var i = 0; i < len; ++i) {
            clonedFeatures[i] = this.features[i];
        }
        return clonedFeatures;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.getFeatureBy
     * @description Traverse each feature in the feature array features of the thematic map, when feature[property] === value，
     *              Return this feature (and only the first one).
     * @param {string} property The name of an attribute of feature.
     * @param {string} value The value corresponding to the property.
     * @returns {ekmap.Feature.Vector} The first vector feature that matches the attribute and value.
     */
    getFeatureBy(property, value) {
        var feature = null;
        for (var id in this.features) {
            if (this.features[id][property] === value) {
                feature = this.features[id];
                break;
            }
        }
        return feature;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.getFeatureById
     * @description Given an id, return the corresponding vector element.
     * @param {string} featureId The attribute id of the vector feature.
     * @returns {ekmap.Feature.Vector} The feature corresponding to id, or null if it does not exist.
     */
    getFeatureById(featureId) {
        return this.getFeatureBy('id', featureId);
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.getFeaturesByAttribute
     * @description Given the key value and value value of an attribute, return an array of all matched features.
     * @param {string} attrName The key of the attribute.
     * @param {string} attrValue The attribute id of the vector feature.
     * @returns {Array.<Feature>} An array of matching features.
     */
    getFeaturesByAttribute(attrName, attrValue) {
        var feature,
            foundFeatures = [];
        for (var id in this.features) {
            feature = this.features[id];
            if (feature && feature.attributes) {
                if (feature.attributes[attrName] === attrValue) {
                    foundFeatures.push(feature);
                }
            }
        }
        return foundFeatures;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.redrawThematicFeatures
     * @description Abstract method, instantiable subclass must implement this method. Redraw thematic elements.
     * @param {mapboxgl.LngLatBounds} extent The scope of redrawing.
     */
    redrawThematicFeatures(extent) {}

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.on
     * @description Add thematic element event monitoring. Add thematic element event monitoring.
     * @param {Event} event Listen for events.
     * @param {function} callback Callback.
     * @param {string} context Information.
     */
    on(event, callback, context) {
        if (this.renderer) {
            this.renderer.on(event, callback);
        } else {
            this.map.on(event, callback);
        }
        return this;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.off
     * @description Remove thematic element event monitoring.
     * @param {Event} event Listen for events.
     * @param {function} callback Callback.
     * @param {string} context Information.
     */
    off(event, callback, context) { // eslint-disable-line no-unused-vars
        var me = this;
        if (me.renderer) {
            me.renderer.off(event, callback);
        } else {
            this.map.off(event, callback);
        }
        return this;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.addTFEvents
     * @description The event listener requested by the user before adding the layer to the map is added to the layer.
     * @private
     */
    addTFEvents() {
        var tfEs = this.TFEvents;
        var len = tfEs.length;
        for (var i = 0; i < len; i++) {
            this.renderer.on(tfEs[i][0], tfEs[i][1]);
        }

    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.getLocalXY
     * @description The geographic coordinates are converted to pixel coordinates.
     * @param {Object} coordinate Coordinate position.
     */
    getLocalXY(coordinate) {
        var pixelP, map = this.map;
        if (coordinate instanceof Point || coordinate instanceof GeoText) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.x, coordinate.y));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        if (coordinate instanceof LonLat) {
            let tempPoint = map.project(new mapboxgl.LngLat(coordinate.lon, coordinate.lat));
            pixelP = [tempPoint.x, tempPoint.y];
        }
        return pixelP;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.toFeature
     * @description Converted to Ekmap elements.
     * @param {mapboxgl.ekmap.ThemeFeature|GeoJSONObject} features Elements to be transferred.
     * @returns {ekmap.Feature.Vector} The converted Ekmap element.
     */
    toiClientFeature(features) {
        if (!CommonUtil.isArray(features)) {
            features = [features];
        }

        let featuresTemp = [];
        for (let i = 0; i < features.length; i++) {
            if (features[i] instanceof ThemeFeature) {
                featuresTemp.push(features[i].toFeature());
            } else if (features[i] instanceof GeometryVector) {
                featuresTemp.push(features[i]);
            } else if (["FeatureCollection", "Feature", "Geometry"].indexOf(features[i].type) != -1) {
                let format = new GeoJSONFormat();
                featuresTemp = featuresTemp.concat(format.read(features[i]));
            } else if (features[i].geometry && features[i].geometry.parts) {
                featuresTemp.push(ServerFeature.fromJson(features[i]).toFeature());
            } else {
                throw new Error(`features's type is not be supported.`);
            }

        }
        return featuresTemp;
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.toFeature
     * @deprecated
     * @description Converted to iClient elements, this method will be deprecated, by {@link mapboxgl.ekmap.ThemeLayer#toiClientFeature} instead.
     * @param {mapboxgl.ekmap.ThemeFeature|GeoJSONObject} features Elements to be transferred.
     * @returns {ekmap.Feature.Vector} The converted Ekmap element.
     */
    toFeature(features) {
        return this.toiClientFeature(features);
    }

    moveEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.div.style.transform = '';
        this.redrawThematicFeatures(this.map.getBounds());
        this._show();
    }

    moveStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.startPitch = this.map.getPitch();
        this.startBearing = this.map.getBearing();
        var startMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        this.startMoveX = startMovePoint.x;
        this.startMoveY = startMovePoint.y;
    }

    moveEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            this.redrawThematicFeatures(this.map.getBounds());
            return;
        }
        if (this.rotating || this.zooming) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        var endMovePoint = this.map.project(new mapboxgl.LngLat(0, 0));
        var tMoveX = endMovePoint.x - this.startMoveX;
        var tMoveY = endMovePoint.y - this.startMoveY;
        this.div.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)' + ' translate3d(' + tMoveX + 'px, ' + tMoveY + 'px, 0px)';
    }

    zoomStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = true;
        this._hide();
    }

    zoomEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.zooming = false;
        this._show();
    }

    rotateStartEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = true;
    }

    rotateEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        if (this.map.getPitch() !== 0) {
            this._hide();
        }
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var tPitch = this.map.getPitch() - this.startPitch;
        var tBearing = -this.map.getBearing() + this.startBearing;
        this.div.style.transform = 'rotateX(' + tPitch + 'deg)' + ' rotateZ(' + tBearing + 'deg)'
    }

    rotateEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this.rotating = false;
        this._show();
    }

    dragEndEvent() {
        if (this.loadWhileAnimating || !this.visibility) {
            return;
        }
        this._hide();
    }

    resizeEvent() {
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
        var canvas = this.map.getCanvas();
        this.div.style.width = canvas.style.width;
        this.div.style.height = canvas.style.height;
        this.div.width = parseInt(canvas.width);
        this.div.height = parseInt(canvas.height);
        this.renderer.resize();
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.removeFromMapConverted to vector elements.
     * @description Remove the layer.
     */
    removeFromMap() {
        this.mapContainer.removeChild(this.div);
        this.removeAllFeatures();
    }

    /**
     * @function mapboxgl.ekmap.ThemeLayer.prototype.moveTo
     * @description Move the layer before a certain layer.
     * @param {string} layerID The ID of the layer to be inserted.
     * @param {boolean} before=true Whether to insert this layer before the layer whose layer id is layerID (if false, insert this layer after the layer whose layer id is layerID).
     */
    moveTo(layerID, before) {
        const layer = document.getElementById(this.div.id);
        before = before !== undefined ? before : true;
        if (before) {
            const beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        const nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }

    _hide() {
        this.renderer.painter.root.style.display = 'none';
    }

    _show() {
        this.renderer.painter.root.style.display = 'block';
    }
}

mapboxgl.ekmap.ThemeLayer = ThemeLayer;