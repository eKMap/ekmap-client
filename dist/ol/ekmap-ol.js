/*!
 * 
 *          ekmap-ol.(https://ekgis.com.vn/)
 *          Copyright© 2009 - 2020 eKGIS
 *          license: Apache-2.0
 *          version: v0.0.1
 *         
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/openlayers/control/BaseLayer.js":
/*!*********************************************!*\
  !*** ./src/openlayers/control/BaseLayer.js ***!
  \*********************************************/
/*! exports provided: BaseLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return BaseLayer; });\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Map */ \"ol/Map\");\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/View */ \"ol/View\");\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_View__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ \"ol/layer/Tile\");\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/OSM */ \"ol/source/OSM\");\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control/BaseLayer */ \"ol/control/BaseLayer\");\n/* harmony import */ var ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ \"ol/proj\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/AssertionError */ \"ol/AssertionError\");\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/control/Control */ \"ol/control/Control\");\n/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_control_Control__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/control/ScaleLine */ \"ol/control/ScaleLine\");\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! echarts */ \"echarts\");\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(echarts__WEBPACK_IMPORTED_MODULE_9__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n\n\n\n/**\r\n * @class ol.ekmap.control.BaseLayer\r\n * @category  Control\r\n * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a BaseLayer..\r\n * @extends {ol/control/BaseLayer}\r\n * @param {options} options Scale line options.\r\n * @param {string} options.className CSS Class name.\r\n * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.\r\n * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.\r\n * @param {(ol.control.BaseLayerUnits|string)} options.units='metric' Units.\r\n * @example\r\n * var control = new ol.ekmap.control.BaseLayer();\r\n *      map.addControl(control)\r\n */\n\nvar BaseLayer = /*#__PURE__*/function (_Control) {\n  _inherits(BaseLayer, _Control);\n\n  var _super = _createSuper(BaseLayer);\n\n  function BaseLayer(options) {\n    var _this;\n\n    _classCallCheck(this, BaseLayer);\n\n    options = options || {};\n    _this = _super.call(this, {\n      element: document.createElement('div'),\n      target: options.target\n    });\n    _this.test = 20;\n    _this.show = false;\n    /**\r\n     * @private\r\n     * @type {HTMLElement}\r\n     */\n\n    var element = _this.element;\n    element.className = 'ekmap-bl ol-unselectable ol-control ekmap-bl-layer-open';\n    var div = document.createElement('div');\n    div.className = 'ekmap-bl-bg ekmap-bl-layer-bt';\n    element.appendChild(div);\n    var layers = map.getLayers();\n    layers.forEach(function (layer) {\n      var divLayer = document.createElement('div');\n\n      divLayer.onclick = function () {\n        this.show = !this.show;\n        if (!layer.values_.visible) layer.setVisible(true);\n      };\n\n      if (layer.values_.visible) divLayer.className = 'ekmap-bl-bg ekmap-bl-layer ol-unselectable ol-control active';else divLayer.className = 'ekmap-bl-bg ekmap-bl-layer ol-unselectable ol-control';\n      divLayer.style.zIndex = 1;\n      divLayer.style.background = 'url(\"https://g3.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png?apikey=1-B27W7NTVd63eQdYAqOuEx8o3qTxDETo9\") 0% 0% / cover no-repeat rgb(255, 255, 255)';\n      divLayer.style.transition = 'transform 0.5s ease 0s, bottom 0.5s ease 0s, width 0.5s ease 0s, -webkit-transform 0.5s ease 0s';\n      divLayer.style.transform = 'translateX(' + _this.test + 'px)';\n      divLayer.style.padding = '0px';\n      var divText = document.createElement('div');\n      divText.setAttribute('class', 'ekmap-bl-bg-text');\n      divText.title = layer.values_.name;\n      divText.innerHTML = layer.values_.name;\n      divLayer.appendChild(divText);\n      element.appendChild(divLayer);\n      _this.test += 100;\n    });\n    return _this;\n  }\n\n  _createClass(BaseLayer, [{\n    key: \"setMap\",\n    value: function setMap(map) {\n      console.log(map);\n\n      _get(_getPrototypeOf(BaseLayer.prototype), \"setMap\", this).call(this, map);\n    }\n  }]);\n\n  return BaseLayer;\n}(ol_control_Control__WEBPACK_IMPORTED_MODULE_7___default.a);\n\n//# sourceURL=webpack:///./src/openlayers/control/BaseLayer.js?");

/***/ }),

/***/ "./src/openlayers/control/ScaleLine.js":
/*!*********************************************!*\
  !*** ./src/openlayers/control/ScaleLine.js ***!
  \*********************************************/
/*! exports provided: ScaleLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return ScaleLine; });\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Map */ \"ol/Map\");\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/View */ \"ol/View\");\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_View__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ \"ol/layer/Tile\");\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/OSM */ \"ol/source/OSM\");\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control/ScaleLine */ \"ol/control/ScaleLine\");\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ \"ol/proj\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/AssertionError */ \"ol/AssertionError\");\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\n/**\r\n * @class ol.ekmap.control.ScaleLine\r\n * @category  Control\r\n * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a scaleline..\r\n * @extends {ol/control/ScaleLine}\r\n * @param {options} options Scale line options.\r\n * @param {string} options.className='ol-scale-line' CSS Class name.\r\n * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.\r\n * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.\r\n * @param {(ol.control.ScaleLineUnits|string)} options.units='metric' Units.\r\n * @example\r\n * var control = new ol.ekmap.control.ScaleLine();\r\n *      map.addControl(control)\r\n */\n\nvar ScaleLine = /*#__PURE__*/function (_Scale) {\n  _inherits(ScaleLine, _Scale);\n\n  var _super = _createSuper(ScaleLine);\n\n  function ScaleLine(options) {\n    _classCallCheck(this, ScaleLine);\n\n    options = options || {};\n\n    options.render = function (mapEvent) {\n      var frameState = mapEvent.frameState;\n\n      if (!frameState) {\n        this.viewState_ = null;\n      } else {\n        this.viewState_ = frameState.viewState;\n      }\n\n      this.updateElementRepair();\n    };\n\n    return _super.call(this, options);\n  }\n\n  _createClass(ScaleLine, [{\n    key: \"updateElementRepair\",\n    value: function updateElementRepair() {\n      var viewState = this.viewState_ || this.o;\n\n      if (!viewState) {\n        this.renderedVisible_ = this.renderedVisible_ || this.j;\n\n        if (this.renderedVisible_) {\n          this.element_ = this.element_ || this.c;\n          this.element.style.display = 'none';\n          this.renderedVisible_ = false;\n        }\n\n        return;\n      }\n\n      var center = viewState.center;\n      var projection = viewState.projection;\n      var units = this.getUnits();\n      var pointResolutionUnits = units == \"degrees\" ? \"degrees\" : \"m\";\n      var pointResolution = ol_proj__WEBPACK_IMPORTED_MODULE_5__[\"getPointResolution\"](projection, viewState.resolution, center, pointResolutionUnits);\n      this.minWidth_ = this.minWidth_ || this.v;\n      var nominalCount = this.minWidth_ * pointResolution;\n      var suffix = '';\n\n      if (units == \"degrees\") {\n        var metersPerDegree = ol_proj__WEBPACK_IMPORTED_MODULE_5__[\"METERS_PER_UNIT\"][\"degrees\"];\n        nominalCount *= metersPerDegree;\n\n        if (nominalCount < metersPerDegree / 60) {\n          suffix = \"\\u2033\"; // seconds\n\n          pointResolution *= 3600;\n        } else if (nominalCount < metersPerDegree) {\n          suffix = \"\\u2032\"; // minutes\n\n          pointResolution *= 60;\n        } else {\n          suffix = \"\\xB0\"; // degrees\n        }\n      } else if (units == \"imperial\") {\n        if (nominalCount < 0.9144) {\n          suffix = 'in';\n          pointResolution /= 0.0254;\n        } else if (nominalCount < 1609.344) {\n          suffix = 'ft';\n          pointResolution /= 0.3048;\n        } else {\n          suffix = 'mi';\n          pointResolution /= 1609.344;\n        }\n      } else if (units == \"nautical\") {\n        pointResolution /= 1852;\n        suffix = 'nm';\n      } else if (units == \"metric\") {\n        if (nominalCount < 0.001) {\n          suffix = 'μm';\n          pointResolution *= 1000000;\n        } else if (nominalCount < 1) {\n          suffix = 'mm';\n          pointResolution *= 1000;\n        } else if (nominalCount < 1000) {\n          suffix = 'm';\n        } else {\n          suffix = 'km';\n          pointResolution /= 1000;\n        }\n      } else if (units == \"us\") {\n        if (nominalCount < 0.9144) {\n          suffix = 'in';\n          pointResolution *= 39.37;\n        } else if (nominalCount < 1609.344) {\n          suffix = 'ft';\n          pointResolution /= 0.30480061;\n        } else {\n          suffix = 'mi';\n          pointResolution /= 1609.3472;\n        }\n      } else {\n        throw new ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default.a(33); // Invalid units\n      }\n\n      var DIGITS = [1, 2, 5];\n      var i = 3 * Math.floor(Math.log(this.minWidth_ * pointResolution) / Math.log(10));\n      var count, width, decimalCount;\n\n      while (true) {\n        //eslint-disable-line no-constant-condition\n        decimalCount = Math.floor(i / 3);\n        var decimal = Math.pow(10, decimalCount);\n        count = DIGITS[(i % 3 + 3) % 3] * decimal;\n        width = Math.round(count / pointResolution);\n\n        if (isNaN(width)) {\n          this.element.style.display = 'none';\n          this.renderedVisible_ = false;\n          return;\n        } else if (width >= this.minWidth_) {\n          break;\n        }\n\n        ++i;\n      }\n\n      this.renderedHTML_ = this.renderedHTML_ || this.D;\n      this.innerElement_ = this.innerElement_ || this.l;\n      this.renderedWidth_ = this.renderedWidth_ || this.B;\n      this.renderedVisible_ = this.renderedVisible_ || this.j;\n      this.element_ = this.element_ || this.c;\n      var html = count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix;\n\n      if (this.renderedHTML_ != html) {\n        this.innerElement_.innerHTML = html;\n        this.renderedHTML_ = html;\n      }\n\n      if (this.renderedWidth_ != width) {\n        this.innerElement_.style.width = width + 'px';\n        this.renderedWidth_ = width;\n      }\n\n      if (!this.renderedVisible_) {\n        this.element.style.display = '';\n        this.renderedVisible_ = true;\n      }\n    }\n  }]);\n\n  return ScaleLine;\n}(ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4___default.a);\n\n//# sourceURL=webpack:///./src/openlayers/control/ScaleLine.js?");

/***/ }),

/***/ "./src/openlayers/control/index.js":
/*!*****************************************!*\
  !*** ./src/openlayers/control/index.js ***!
  \*****************************************/
/*! exports provided: ScaleLine, BaseLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ScaleLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScaleLine */ \"./src/openlayers/control/ScaleLine.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return _ScaleLine__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"]; });\n\n/* harmony import */ var _BaseLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseLayer */ \"./src/openlayers/control/BaseLayer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return _BaseLayer__WEBPACK_IMPORTED_MODULE_1__[\"BaseLayer\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/openlayers/control/index.js?");

/***/ }),

/***/ "./src/openlayers/css/index.js":
/*!*************************************!*\
  !*** ./src/openlayers/css/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ \"./src/openlayers/css/style.css\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/openlayers/css/index.js?");

/***/ }),

/***/ "./src/openlayers/css/style.css":
/*!**************************************!*\
  !*** ./src/openlayers/css/style.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/openlayers/css/style.css?");

/***/ }),

/***/ "./src/openlayers/layer/TiledVietNamMapLayer.js":
/*!******************************************************!*\
  !*** ./src/openlayers/layer/TiledVietNamMapLayer.js ***!
  \******************************************************/
/*! exports provided: TiledVietNamMapLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TiledVietNamMapLayer\", function() { return TiledVietNamMapLayer; });\n/* harmony import */ var ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/source/TileImage */ \"ol/source/TileImage\");\n/* harmony import */ var ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n/**\r\n * @class ol.ekmap.TiledVietNamMapLayer\r\n * @classdesc The TiledVietNamMapLayer class.\r\n * @category  Layer\r\n * @param {Object} options  Construction parameters.\r\n * @param {string} options.token  Will use this token to authenticate all calls to the service.\r\n * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.\r\n * @extends {ol.ekmap.TileLayer}\r\n * @example\r\n * var map = new ol.Map({\r\n *     container: 'map',\r\n *     center: [103.9, 22.2],\r\n *     zoom: 6\r\n * });\r\n * var vnMap = new ol.ekmap.TiledVietNamMapLayer({\r\n *      token: {YOUR_API_KEY}\r\n * })\r\n *   .addTo(map);\r\n */\n\nvar TiledVietNamMapLayer = /*#__PURE__*/function (_TileImage) {\n  _inherits(TiledVietNamMapLayer, _TileImage);\n\n  var _super = _createSuper(TiledVietNamMapLayer);\n\n  function TiledVietNamMapLayer(options) {\n    _classCallCheck(this, TiledVietNamMapLayer);\n\n    options = options || {};\n    options.attributions = options.attributions || \"<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Map </a>\" + \"by <a href='http://ekgis.com.vn/' target='_blank' style='color: blue'>eKGIS</a>\";\n    options.urls = [\"https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\", \"https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\", \"https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\", \"https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\"];\n    options.urlsToken = [];\n    if (options) options.urls.forEach(function (url) {\n      url += \"?apikey=\" + options.token;\n      options.urlsToken.push(url);\n    });\n    return _super.call(this, {\n      attributions: options.attributions,\n      urls: options.urlsToken\n    });\n  }\n\n  return TiledVietNamMapLayer;\n}(ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n//# sourceURL=webpack:///./src/openlayers/layer/TiledVietNamMapLayer.js?");

/***/ }),

/***/ "./src/openlayers/layer/index.js":
/*!***************************************!*\
  !*** ./src/openlayers/layer/index.js ***!
  \***************************************/
/*! exports provided: TiledVietNamMapLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TiledVietNamMapLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TiledVietNamMapLayer */ \"./src/openlayers/layer/TiledVietNamMapLayer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TiledVietNamMapLayer\", function() { return _TiledVietNamMapLayer__WEBPACK_IMPORTED_MODULE_0__[\"TiledVietNamMapLayer\"]; });\n\n\n\n//# sourceURL=webpack:///./src/openlayers/layer/index.js?");

/***/ }),

/***/ "./src/openlayers/namespace.js":
/*!*************************************!*\
  !*** ./src/openlayers/namespace.js ***!
  \*************************************/
/*! exports provided: ScaleLine, BaseLayer, TiledVietNamMapLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control */ \"./src/openlayers/control/index.js\");\n/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ \"./src/openlayers/layer/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return _control__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return _control__WEBPACK_IMPORTED_MODULE_0__[\"BaseLayer\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TiledVietNamMapLayer\", function() { return _layer__WEBPACK_IMPORTED_MODULE_1__[\"TiledVietNamMapLayer\"]; });\n\n\n\n\n\nif (window && window.ol) {\n  var ol = window.ol;\n  ol.ekmap = window.ol.ekmap || {};\n  ol.ekmap.control = window.ol.ekmap.control || {}; // control\n\n  ol.ekmap.control.ScaleLine = _control__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"];\n  ol.ekmap.control.BaseLayer = _control__WEBPACK_IMPORTED_MODULE_0__[\"BaseLayer\"];\n  ol.ekmap.TiledVietNamMapLayer = _layer__WEBPACK_IMPORTED_MODULE_1__[\"TiledVietNamMapLayer\"]; // core\n  // mapping\n  // overlay\n  // service\n}\n\n\n\n\n//# sourceURL=webpack:///./src/openlayers/namespace.js?");

/***/ }),

/***/ 0:
/*!*************************************************************************!*\
  !*** multi ./src/openlayers/namespace.js ./src/openlayers/css/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! D:\\Dev\\eKMap\\eKMap-Client\\src\\openlayers\\namespace.js */\"./src/openlayers/namespace.js\");\nmodule.exports = __webpack_require__(/*! D:\\Dev\\eKMap\\eKMap-Client\\src\\openlayers\\css\\index.js */\"./src/openlayers/css/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/openlayers/namespace.js_./src/openlayers/css/index.js?");

/***/ }),

/***/ "echarts":
/*!***********************************************************************!*\
  !*** external "function(){try{return echarts}catch(e){return {}}}()" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(){try{return echarts}catch(e){return {}}}();\n\n//# sourceURL=webpack:///external_%22function()%7Btry%7Breturn_echarts%7Dcatch(e)%7Breturn_%7B%7D%7D%7D()%22?");

/***/ }),

/***/ "ol/AssertionError":
/*!************************************!*\
  !*** external "ol.AssertionError" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.AssertionError;\n\n//# sourceURL=webpack:///external_%22ol.AssertionError%22?");

/***/ }),

/***/ "ol/Map":
/*!*************************!*\
  !*** external "ol.Map" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.Map;\n\n//# sourceURL=webpack:///external_%22ol.Map%22?");

/***/ }),

/***/ "ol/View":
/*!**************************!*\
  !*** external "ol.View" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.View;\n\n//# sourceURL=webpack:///external_%22ol.View%22?");

/***/ }),

/***/ "ol/control/BaseLayer":
/*!***************************************!*\
  !*** external "ol.control.BaseLayer" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.control.BaseLayer;\n\n//# sourceURL=webpack:///external_%22ol.control.BaseLayer%22?");

/***/ }),

/***/ "ol/control/Control":
/*!*************************************!*\
  !*** external "ol.control.Control" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.control.Control;\n\n//# sourceURL=webpack:///external_%22ol.control.Control%22?");

/***/ }),

/***/ "ol/control/ScaleLine":
/*!***************************************!*\
  !*** external "ol.control.ScaleLine" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.control.ScaleLine;\n\n//# sourceURL=webpack:///external_%22ol.control.ScaleLine%22?");

/***/ }),

/***/ "ol/layer/Tile":
/*!********************************!*\
  !*** external "ol.layer.Tile" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.layer.Tile;\n\n//# sourceURL=webpack:///external_%22ol.layer.Tile%22?");

/***/ }),

/***/ "ol/proj":
/*!**************************!*\
  !*** external "ol.proj" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.proj;\n\n//# sourceURL=webpack:///external_%22ol.proj%22?");

/***/ }),

/***/ "ol/source/OSM":
/*!********************************!*\
  !*** external "ol.source.OSM" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.source.OSM;\n\n//# sourceURL=webpack:///external_%22ol.source.OSM%22?");

/***/ }),

/***/ "ol/source/TileImage":
/*!**************************************!*\
  !*** external "ol.source.TileImage" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ol.source.TileImage;\n\n//# sourceURL=webpack:///external_%22ol.source.TileImage%22?");

/***/ })

/******/ });