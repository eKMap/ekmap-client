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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return BaseLayer; });\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Map */ \"ol/Map\");\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/View */ \"ol/View\");\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_View__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ \"ol/layer/Tile\");\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/OSM */ \"ol/source/OSM\");\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control/BaseLayer */ \"ol/control/BaseLayer\");\n/* harmony import */ var ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_control_BaseLayer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ \"ol/proj\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/AssertionError */ \"ol/AssertionError\");\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/control/Control */ \"ol/control/Control\");\n/* harmony import */ var ol_control_Control__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_control_Control__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/control/ScaleLine */ \"ol/control/ScaleLine\");\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! echarts */ \"echarts\");\n/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(echarts__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _core_Element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/Element */ \"./src/openlayers/core/Element.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * @class ol.ekmap.control.BaseLayer\r\n * @category  Control\r\n * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a BaseLayer..\r\n * @extends {ol/control/BaseLayer}\r\n * @param {options} options Scale line options.\r\n * @param {string} options.className CSS Class name.\r\n * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.\r\n * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.\r\n * @param {(ol.control.BaseLayerUnits|string)} options.units='metric' Units.\r\n * @example\r\n * var control = new ol.ekmap.control.BaseLayer();\r\n *      map.addControl(control)\r\n */\r\nclass BaseLayer {\r\n\r\n    constructor(options) {\r\n        options = options || {};\r\n        var element = document.createElement('div');\r\n        if (options.element) element = options.element;\r\n        var className = 'gclient-bl';\r\n        className = className + ' ' + (options.className !== undefined ? options.className : '');\r\n\r\n        var cssClasses = className + ' ol-unselectable ol-control';\r\n        element.className = cssClasses;\r\n\r\n        ol_control_Control__WEBPACK_IMPORTED_MODULE_7___default.a.call(this, {\r\n            element: element,\r\n            target: options.target\r\n        });\r\n        this.baseLayer = {};\r\n        this.drawBaseLayer();\r\n\r\n    }\r\n\r\n    resizeScreen_(evt) {\r\n        this.drawBaseLayer();\r\n    }\r\n\r\n    drawBaseLayer() {\r\n        this.baseLayer = {};\r\n        if (this.first) {\r\n            this.element.removeChild(this.first);\r\n            this.first = null;\r\n        }\r\n        if (this.btnCollapse) {\r\n            this.element.removeChild(this.btnCollapse);\r\n            this.btnCollapse = null;\r\n        }\r\n        this.element.classList.remove(\"gclient-bl-layer-open\");\r\n        if (!this.isMediumScreen_()) {\r\n            this.btnCollapse = _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].create('div', {\r\n                className: 'gclient-bl-bg gclient-bl-layer-bt ol-hidden',\r\n                parent: this.element\r\n            });\r\n            this.btnCollapse.addEventListener('touchstart', this.handleCollapseClick_.bind(this));\r\n            this.btnCollapse.addEventListener('click', this.handleCollapseClick_.bind(this));\r\n        }\r\n\r\n        this.element.querySelectorAll('.gclient-bl-layer').forEach(element => {\r\n            this.element.removeChild(element);\r\n        });\r\n        var baseLayers = [];\r\n        var baseActive;\r\n        var layers = this.getMap().getLayers().getArray(),\r\n            len = layers.length;\r\n\r\n        for (var i = len - 1; i >= 0; i--) {\r\n            var layer = layers[i];\r\n            if (layer.get('baseLayer') && layer.get('displayInLayerSwitcher') != false) {\r\n                baseLayers.push(layer);\r\n                if (layer.getVisible()) {\r\n                    baseActive = layer;\r\n                }\r\n            }\r\n        }\r\n\r\n        var zIndex = baseLayers.length;\r\n\r\n        this.first = _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].create('div', {\r\n            className: 'gclient-bl-bg gclient-bl-layer-first',\r\n            parent: this.element,\r\n            title: baseActive ? (baseActive.get('name') || baseActive.get('title')) : 'Không nền',\r\n            style: {\r\n                \"z-index\": zIndex + 1,\r\n                \"background\": \"#fff url('\" + this.getImageTile_(baseActive) + \"') no-repeat\",\r\n                \"background-size\": \"cover\"\r\n            }\r\n        });\r\n        if (!this.isMediumScreen_()) {\r\n            _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].create('div', {\r\n                className: 'gclient-bl-bg-text',\r\n                parent: this.first,\r\n                uid: baseActive ? baseActive.ol_uid : \"\",\r\n                html: baseActive ? this.formatString(baseActive.get('name') || baseActive.get('title')) : 'Không có nền',\r\n                title: baseActive ? (baseActive.get('name') || baseActive.get('title')) : 'Không có nền'\r\n            })\r\n        }\r\n        this.first.addEventListener('touchstart', this.handleCollapseClick_.bind(this));\r\n        this.first.addEventListener('click', this.handleCollapseClick_.bind(this));\r\n        baseLayers.forEach((layer, index) => {\r\n            this.baseLayer[index] = layer;\r\n            var cssactive = \"\";\r\n            if (layer.getVisible())\r\n                cssactive = \"active\";\r\n            var element = _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].create('div', {\r\n                className: 'gclient-bl-bg gclient-bl-layer ' + cssactive + ' gclient-bl-layer-' + index,\r\n                parent: this.element,\r\n                uid: layer.ol_uid,\r\n                title: layer.get('name') || layer.get('title'),\r\n                style: {\r\n                    \"z-index\": zIndex,\r\n                    \"background\": \"#fff url('\" + this.getImageTile_(layer) + \"') no-repeat\",\r\n                    \"background-size\": \"cover\"\r\n                }\r\n            });\r\n            if (!this.isMediumScreen_()) {\r\n                _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].create('div', {\r\n                    className: 'gclient-bl-bg-text',\r\n                    parent: element,\r\n                    uid: layer.ol_uid,\r\n                    html: this.formatString(layer.get('name') || layer.get('title')),\r\n                    title: layer.get('name')\r\n                })\r\n            }\r\n            element.addEventListener('touchstart', this.setActiveLayer_.bind(this), false);\r\n            element.addEventListener('click', this.setActiveLayer_.bind(this), false);\r\n            zIndex--;\r\n        });\r\n    }\r\n\r\n    isMediumScreen_() {\r\n        var x = window.matchMedia(\"(max-width: 768px)\");\r\n        if (x.matches) return true; //kích thước nhỏ hơn 768\r\n        else return false;\r\n    }\r\n\r\n    handleCollapseClick_(evt) {\r\n        if (evt) {\r\n            evt.preventDefault();\r\n            evt.stopPropagation();\r\n        }\r\n        var tog = this.element.classList.toggle(\"gclient-bl-layer-open\");\r\n        if (this.btnCollapse) this.btnCollapse.classList.toggle(\"ol-hidden\");\r\n        var translate = \"translateX(\";\r\n        let startIndex = 20;\r\n        if (!this.isMediumScreen_() && this.first)\r\n            this.first.classList.toggle(\"ol-hidden\");\r\n        else {\r\n            translate = \"translateY(-\";\r\n            startIndex = 50;\r\n        }\r\n        if (tog) { //expan\r\n            var i = 0;\r\n            for (var index in this.baseLayer) {\r\n                this.element.querySelectorAll('.gclient-bl-layer-' + index).forEach(function(element) {\r\n                    var translateX = translate + (index * element.clientWidth + startIndex + (index * 5) + i) + \"px)\";\r\n                    i += 5;\r\n                    _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].setStyle(element, {\r\n                        transition: \"transform .5s,bottom .5s,width .5s,-webkit-transform .5s\",\r\n                        WebkitTransform: translateX,\r\n                        msTransform: translateX,\r\n                        transform: translateX\r\n                    })\r\n                });\r\n            }\r\n        } else //collapse\r\n        {\r\n            for (var index in this.baseLayer) {\r\n                this.element.querySelectorAll('.gclient-bl-layer-' + index).forEach(function(element) {\r\n                    var translateX = translate + \"0px)\";\r\n                    _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].setStyle(element, {\r\n                        transition: \"transform .5s,bottom .5s,width .5s,-webkit-transform .5s\",\r\n                        WebkitTransform: translateX,\r\n                        msTransform: translateX,\r\n                        transform: translateX\r\n                    })\r\n                });\r\n            }\r\n        }\r\n    }\r\n\r\n    /** \r\n     * @private\r\n     */\r\n    getImageTile_(layer) {\r\n        var anhdaidien = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADhmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY0NTQ5ODZkLTBmMmEtZTk0ZC05Mjc3LWYwODE5MzdmMWFiZSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5N0MzQzAyMDhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N0MzQzAxRjhBQjYxMUU2OUEzRUFDQTNCQjI1MTVERiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI1ZWJmZDcyLWJkYzktYTA0Ny1iYmM5LWNmOTQ2YTE0NzJjMCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjRiMGQ1ZWY5LTg2ZDgtMTFlNi1hM2FjLWMzODdkMmFhNjkxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtNVieYAAATBSURBVHhe7ZqHTuQwEIa99N577533fxBA9N577+XuvpENwYAgYIfsyZ+0ymbWTuw/4zKTzfz5hwo8k6OPAU0QxCIIYhEEsQiCWARBLIIgFkEQiyCIRRDEIghi4SWWOTs7U09PT/rMDzk5OaqiokKfucO5IIuLi+r6+loa7BMELy4uVr29vdriBqeCPD4+qqmpKTU8PKzy8/O11Q/39/dqenpajY6OqtzcXG39Oc4fYyaTkY9vfN3Hi197mJbe4Oseiawyd3d3amlpSVx8Y2NDW9OJd0F4knNzczLJNjc3q4uLC5l404p3QY6OjmTS6+rqUlVVVbIqXF5eqoeHB10iXSQyZKKY/UkSE+938C5IbW2tiMAw2d/flyMbKpdLpUsS8ZChoSHZl5ycnIhADJ+0koggeENHR4fq7+9XjY2N2ppOEp9D0k4QxCIIYpFqQVidkt7ZploQdrisTGtra9rin8QFoXMrKyv67GNmZmZUXl6eGhgYkITTV+q4IFFBtre31fn5uSSQlpeXtfUteAY72b6+PlVQUCD7GGIgAkTfJCYIu9S9vT3V09OjBgcH1dXV1btB3vz8vCSaKGPAU0g6IaSp42vrn4ggx8fHamtrS3V3d0vaj8h3ZGRE0gKzs7O6lBIPIBOGR9iwuTOiMISyVhAaz7zBTjWaFKZDzA+tra1yzhxBZxHjo84i5NjYmFzHVxLbqyAMC+aKlpYWVV1dra0v8NTLyspEMOYIhonv5PRneLk7TxjXZ3JsaGhQ9fX1+pe3sM84PT0Vb2Gu+G28CEKWjOi2s7NTsmQfcXBwoA4PDyXoYzVJA179871hEqWurk48o6ioSFt+H6eCmEx4nOQPq853MPdwnX13/uZuYmJCnjwddd1YA3MUKxJDbnx8XFvd4FwQVovNzU1vy6KB1Yglm1XKJc4FyXZ+d9FPIUEQiyCIRWKCEOmye007sQVZWFiQvIaBKJbl7zMQhKUy7cQWhHeybLdvbm6ez8lfAB5A3oNw34YlsrS0VH6nHAKRLALKYzfXAaJk41UIbrzL2ClLHfOOmGvt7u7Ksv8TYgvCKl1ZWfmc0mOTxJ6Ap8/fHRCKhkbzHEAQd3t7K402ddfX16UcUTEf6gPRL+XZy5Aj2dnZkftiN3scPJVrYcdGGXaveOxPEtOxBaExTU1NIgKeQiP40DleUba3t0t8glC8+TdQxuQ5KGeiYIJAvIdAkN+JfPmQQOI+JiVgEkMkiYyd8jwA84qUchxpV9Tb4vCtSRU3JRXIXMJTp2HYCgsLdQkl3z9qlBEG6IQBO4JHbcA513/PzlDiSF1zv7a2tlf3iENsQXBRPuQuiFlwdTrBd5JB/PeDMc9Tq6mp0bVegjBT3xD9znVKSkrEmxgePH2GA2KwRafjeCJ2M6TKy8ul8wjD/TjiYYgTnfy/SmxByFsY9XFd4xUMARpEB3BtUoF0zGDyHdH6dDD6b0V+QyDqclxdXZXUgAkUo3aEoD4dx45IzCt4LLlbzr8zwWZVLIPXMEeZ4TE5OSnRLsK4IqsEwfuYMPEYJlk8FM90SdZFu3gGYiBKdEi6IoT/Fu4G339CEMQiCGIRBLEIglgEQSyCIBZBEIsgiEUQxCII8gql/gKvssAfZKH1AAAAAABJRU5ErkJggg==';\r\n        if (!layer) return anhdaidien;\r\n        if (layer.metadata.image != null)\r\n            anhdaidien = layer.metadata.image;\r\n        // else {\r\n        //     try {\r\n        //         var source = layer.getSource();\r\n        //         var coord = [5, 25, 14]; //lấy tile Việt Nam làm đại diện\r\n        //         var fn = source.getTileUrlFunction(); //chỉ áp dụng với source tile xyz\r\n        //         anhdaidien = fn.call(source, coord, source.getProjection());\r\n        //     } catch (ex) {\r\n        //         console.log(ex);\r\n        //     }\r\n        // }\r\n        return anhdaidien;\r\n    }\r\n\r\n    /** \r\n     * @private\r\n     */\r\n    formatString(str, length) {\r\n        if (!str) return \"\";\r\n        if (length == undefined) length = 25;\r\n        if (str.length > length) str = str.substr(0, 24) + '...';\r\n        return str;\r\n    }\r\n\r\n    /** \r\n     * @private\r\n     */\r\n    setActiveLayer_(evt) {\r\n        if (evt) {\r\n            evt.preventDefault();\r\n            evt.stopPropagation();\r\n        }\r\n        var target = evt.target;\r\n        var uid = target.getAttribute(\"uid\");\r\n        var layerActive = false;\r\n        this.element.querySelectorAll('.gclient-bl-layer').forEach((element, index) => {\r\n            var hasActive = element.classList.contains(\"active\");\r\n            var id = element.getAttribute(\"uid\");\r\n            if (id == uid) {\r\n                if (!hasActive) {\r\n                    layerActive = this.baseLayer[index];\r\n                    _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].setStyle(this.first, {\r\n                        \"background\": \"#fff url('\" + this.getImageTile_(layerActive) + \"') no-repeat\",\r\n                        \"background-size\": \"cover\"\r\n                    })\r\n                } else {\r\n                    _core_Element__WEBPACK_IMPORTED_MODULE_10__[\"default\"].setStyle(this.first, {\r\n                        \"background\": \"#fff url('\" + this.getImageTile_() + \"') no-repeat\",\r\n                        \"background-size\": \"cover\"\r\n                    })\r\n                }\r\n                element.classList.toggle(\"active\");\r\n            } else {\r\n                element.classList.remove(\"active\");\r\n            }\r\n        });\r\n        var arr = [];\r\n        var layers = this._map.getStyle().layers,\r\n            len = layers.length;\r\n        for (var i = len - 1; i >= 0; i--) {\r\n            var layer = layers[i];\r\n            if (layer.metadata && layer.metadata.type && layer.metadata.type == 'baselayer') {\r\n                arr.push(layer);\r\n            }\r\n        }\r\n        var baselayer = arr;\r\n        for (var i = 0; i < baselayer.length; i++) {\r\n            if (layerActive != baselayer[i]) {\r\n                this._map.setLayoutProperty(baselayer[i].id, 'visibility', 'none');\r\n                // baselayer[i].setVisible(false);\r\n            }\r\n        }\r\n        if (layerActive) this._map.setLayoutProperty(layerActive.id, 'visibility', 'visible'); //layerActive.setVisible(true);\r\n        if (!this.isMediumScreen_() && this.first) {\r\n            var text = 'Không có nền';\r\n            var title = 'Không có nền';\r\n            if (layerActive) {\r\n                text = this.formatString(layerActive.metadata.name);\r\n                title = layerActive.metadata.name;\r\n            }\r\n            this.first.querySelectorAll('.gclient-bl-bg-text').forEach(element => {\r\n                element.setAttribute('title', title);\r\n                element.innerHTML = text;\r\n            })\r\n        }\r\n        this.handleCollapseClick_();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/openlayers/control/BaseLayer.js?");

/***/ }),

/***/ "./src/openlayers/control/ScaleLine.js":
/*!*********************************************!*\
  !*** ./src/openlayers/control/ScaleLine.js ***!
  \*********************************************/
/*! exports provided: ScaleLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return ScaleLine; });\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/Map */ \"ol/Map\");\n/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_Map__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/View */ \"ol/View\");\n/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_View__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/layer/Tile */ \"ol/layer/Tile\");\n/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/source/OSM */ \"ol/source/OSM\");\n/* harmony import */ var ol_source_OSM__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_source_OSM__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/control/ScaleLine */ \"ol/control/ScaleLine\");\n/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ \"ol/proj\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/AssertionError */ \"ol/AssertionError\");\n/* harmony import */ var ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_AssertionError__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * @class ol.ekmap.control.ScaleLine\r\n * @category  Control\r\n * @classdesc A control displaying rough y-axis distances, calculated for the center of the viewport. For conformal projections <br>(e.g. EPSG:3857, the default view projection in OpenLayers), the scale is valid for all directions. No scale line will be <br>shown when the y-axis distance of a pixel at the viewport center cannot be calculated in the view projection. By <br> default the scale line will show in the bottom left portion of the map, but this can be changed by using the css <br> selector .ol-scale-line. When specifying bar as true, a scalebar will be rendered instead of a scaleline..\r\n * @extends {ol/control/ScaleLine}\r\n * @param {options} options Scale line options.\r\n * @param {string} options.className='ol-scale-line' CSS Class name.\r\n * @param {number} options.minWidth=64 Minimum width in pixels at the OGC default dpi. The width will be adjusted to match the dpi used.\r\n * @param {(HTMLElement|string) } options.target Specify a target if you want the control to be rendered outside of the map's viewport.\r\n * @param {(ol.control.ScaleLineUnits|string)} options.units='metric' Units.\r\n * @example\r\n * var control = new ol.ekmap.control.ScaleLine();\r\n *      map.addControl(control)\r\n */\r\nclass ScaleLine extends ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_4___default.a {\r\n\r\n    constructor(options) {\r\n        options = options || {};\r\n        options.render = function (mapEvent) {\r\n            var frameState = mapEvent.frameState;\r\n            if (!frameState) {\r\n                this.viewState_ = null;\r\n            } else {\r\n                this.viewState_ = frameState.viewState;\r\n            }\r\n            this.updateElementRepair();\r\n        }\r\n        super(options);\r\n    }\r\n\r\n    updateElementRepair() {\r\n        const viewState = this.viewState_ || this.o;\r\n\r\n        if (!viewState) {\r\n            this.renderedVisible_ = this.renderedVisible_ || this.j;\r\n            if (this.renderedVisible_) {\r\n                this.element_ = this.element_ || this.c;\r\n                this.element.style.display = 'none';\r\n                this.renderedVisible_ = false;\r\n            }\r\n            return;\r\n        }\r\n\r\n        const center = viewState.center;\r\n        const projection = viewState.projection;\r\n        const units = this.getUnits();\r\n        const pointResolutionUnits = units == \"degrees\" ?\r\n            \"degrees\" :\r\n            \"m\";\r\n        let pointResolution =\r\n            ol_proj__WEBPACK_IMPORTED_MODULE_5__[\"getPointResolution\"](projection, viewState.resolution, center, pointResolutionUnits);\r\n        this.minWidth_ = this.minWidth_ || this.v;\r\n        let nominalCount = this.minWidth_ * pointResolution;\r\n        let suffix = '';\r\n        if (units == \"degrees\") {\r\n            const metersPerDegree = ol_proj__WEBPACK_IMPORTED_MODULE_5__[\"METERS_PER_UNIT\"][\"degrees\"];\r\n            nominalCount *= metersPerDegree;\r\n            if (nominalCount < metersPerDegree / 60) {\r\n                suffix = '\\u2033'; // seconds\r\n                pointResolution *= 3600;\r\n            } else if (nominalCount < metersPerDegree) {\r\n                suffix = '\\u2032'; // minutes\r\n                pointResolution *= 60;\r\n            } else {\r\n                suffix = '\\u00b0'; // degrees\r\n            }\r\n        } else if (units == \"imperial\") {\r\n            if (nominalCount < 0.9144) {\r\n                suffix = 'in';\r\n                pointResolution /= 0.0254;\r\n            } else if (nominalCount < 1609.344) {\r\n                suffix = 'ft';\r\n                pointResolution /= 0.3048;\r\n            } else {\r\n                suffix = 'mi';\r\n                pointResolution /= 1609.344;\r\n            }\r\n        } else if (units == \"nautical\") {\r\n            pointResolution /= 1852;\r\n            suffix = 'nm';\r\n        } else if (units == \"metric\") {\r\n            if (nominalCount < 0.001) {\r\n                suffix = 'μm';\r\n                pointResolution *= 1000000;\r\n            } else if (nominalCount < 1) {\r\n                suffix = 'mm';\r\n                pointResolution *= 1000;\r\n            } else if (nominalCount < 1000) {\r\n                suffix = 'm';\r\n            } else {\r\n                suffix = 'km';\r\n                pointResolution /= 1000;\r\n            }\r\n        } else if (units == \"us\") {\r\n            if (nominalCount < 0.9144) {\r\n                suffix = 'in';\r\n                pointResolution *= 39.37;\r\n            } else if (nominalCount < 1609.344) {\r\n                suffix = 'ft';\r\n                pointResolution /= 0.30480061;\r\n            } else {\r\n                suffix = 'mi';\r\n                pointResolution /= 1609.3472;\r\n            }\r\n        } else {\r\n            throw new ol_AssertionError__WEBPACK_IMPORTED_MODULE_6___default.a(33); // Invalid units\r\n        }\r\n        var DIGITS = [1, 2, 5];\r\n        let i = 3 * Math.floor(\r\n            Math.log(this.minWidth_ * pointResolution) / Math.log(10));\r\n        let count, width, decimalCount;\r\n        while (true) { //eslint-disable-line no-constant-condition\r\n            decimalCount = Math.floor(i / 3);\r\n            const decimal = Math.pow(10, decimalCount);\r\n            count = DIGITS[((i % 3) + 3) % 3] * decimal;\r\n            width = Math.round(count / pointResolution);\r\n            if (isNaN(width)) {\r\n                this.element.style.display = 'none';\r\n                this.renderedVisible_ = false;\r\n                return;\r\n            } else if (width >= this.minWidth_) {\r\n                break;\r\n            }\r\n            ++i;\r\n        }\r\n        this.renderedHTML_ = this.renderedHTML_ || this.D;\r\n        this.innerElement_ = this.innerElement_ || this.l;\r\n        this.renderedWidth_ = this.renderedWidth_ || this.B;\r\n        this.renderedVisible_ = this.renderedVisible_ || this.j;\r\n        this.element_ = this.element_ || this.c;\r\n        let html = count.toFixed(decimalCount < 0 ? -decimalCount : 0) + ' ' + suffix;\r\n        if (this.renderedHTML_ != html) {\r\n            this.innerElement_.innerHTML = html;\r\n            this.renderedHTML_ = html;\r\n        }\r\n\r\n        if (this.renderedWidth_ != width) {\r\n            this.innerElement_.style.width = width + 'px';\r\n            this.renderedWidth_ = width;\r\n        }\r\n\r\n        if (!this.renderedVisible_) {\r\n            this.element.style.display = '';\r\n            this.renderedVisible_ = true;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/openlayers/control/ScaleLine.js?");

/***/ }),

/***/ "./src/openlayers/control/index.js":
/*!*****************************************!*\
  !*** ./src/openlayers/control/index.js ***!
  \*****************************************/
/*! exports provided: ScaleLine, BaseLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ScaleLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScaleLine */ \"./src/openlayers/control/ScaleLine.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return _ScaleLine__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"]; });\n\n/* harmony import */ var _BaseLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseLayer */ \"./src/openlayers/control/BaseLayer.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return _BaseLayer__WEBPACK_IMPORTED_MODULE_1__[\"BaseLayer\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/openlayers/control/index.js?");

/***/ }),

/***/ "./src/openlayers/core/Element.js":
/*!****************************************!*\
  !*** ./src/openlayers/core/Element.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Bạn có thể không cần jQuery (Static)\n * @constructor\n */\nvar gclient_element = {};\n\n/**\n * Bạn có thể không cần jQuery\n * @param {string} tagName The element tag, use 'TEXT' to create a text node\n * @param {*} options\n *  @param {string} options.className className The element class name \n *  @param {Element} options.parent Parent to append the element as child\n *  @param {Element|string} options.html Content of the element\n *  @param {string} options.* Any other attribut to add to the element\n */\ngclient_element.create = function (tagName, options) {\n  options = options || {};\n  var elt;\n  // Create text node\n  if (tagName === 'TEXT') {\n    elt = document.createTextNode(options.html||'');\n    if (options.parent) options.parent.appendChild(elt);\n  } else {\n    // Other element\n    elt = document.createElement(tagName);\n    if (/button/i.test(tagName)) elt.setAttribute('type', 'button');\n    for (var attr in options) {\n      switch (attr) {\n        case 'className': {\n          if (options.className && options.className.trim) elt.setAttribute('class', options.className.trim());\n          break;\n        }\n        case 'html': {\n          if (options.html instanceof Element) elt.appendChild(options.html)\n          else if (options.html!==undefined) elt.innerHTML = options.html;\n          break;\n        }\n        case 'parent': {\n          options.parent.appendChild(elt);\n          break;\n        }\n        case 'style': {\n          this.setStyle(elt, options.style);\n          break;\n        }\n        case 'change':\n        case 'click': {\n          gclient_element.addListener(elt, attr, options[attr]);\n          break;\n        }\n        case 'on': {\n          for (var e in options.on) {\n            gclient_element.addListener(elt, e, options.on[e]);\n          }\n          break;\n        }\n        case 'checked': {\n          elt.checked = !!options.checked;\n          break;\n        }\n        default: {\n          elt.setAttribute(attr, options[attr]);\n          break;\n        }\n      }\n    }\n  }\n  return elt;\n};\n\n/** Set inner html or append a child element to an element\n * @param {Element} element\n * @param {Element|string} html Content of the element\n */\ngclient_element.setHTML = function(element, html) {\n  if (html instanceof Element) element.appendChild(html)\n  else if (html!==undefined) element.innerHTML = html;\n};\n\n/** Append text into an elemnt\n * @param {Element} element\n * @param {string} text text content\n */\ngclient_element.appendText = function(element, text) {\n  element.appendChild(document.createTextNode(text||''));\n};\n\n/**\n * Add a set of event listener to an element\n * @param {Element} element\n * @param {string|Array<string>} eventType\n * @param {function} fn\n */\ngclient_element.addListener = function (element, eventType, fn) {\n  if (typeof eventType === 'string') eventType = eventType.split(' ');\n  eventType.forEach(function(e) {\n    element.addEventListener(e, fn);\n  });\n};\n\n/**\n * Add a set of event listener to an element\n * @param {Element} element\n * @param {string|Array<string>} eventType\n * @param {function} fn\n */\ngclient_element.removeListener = function (element, eventType, fn) {\n  if (typeof eventType === 'string') eventType = eventType.split(' ');\n  eventType.forEach(function(e) {\n    element.removeEventListener(e, fn);\n  });\n};\n\n/**\n * Show an element\n * @param {Element} element\n */\ngclient_element.show = function (element) {\n  element.style.display = '';\n};\n\n/**\n * Hide an element\n * @param {Element} element\n */\ngclient_element.hide = function (element) {\n  element.style.display = 'none';\n};\n\n/**\n * Test if an element is hihdden\n * @param {Element} element\n * @return {boolean}\n */\ngclient_element.hidden = function (element) {\n  return gclient_element.getStyle(element, 'display') === 'none';\n};\n\n/**\n * Toggle an element\n * @param {Element} element\n */\ngclient_element.toggle = function (element) {\n  element.style.display = (element.style.display==='none' ? '' : 'none');\n};\n\n/** Set style of an element\n * @param {DOMElement} el the element\n * @param {*} st list of style\n */\ngclient_element.setStyle = function(el, st) {\n  for (var s in st) {\n    switch (s) {\n      case 'top':\n      case 'left':\n      case 'bottom':\n      case 'right':\n      case 'minWidth':\n      case 'maxWidth':\n      case 'width':\n      case 'height': {\n        if (typeof(st[s]) === 'number') {\n          el.style[s] = st[s]+'px';\n        } else {\n          el.style[s] = st[s];\n        }\n        break;\n      }\n      default: {\n        el.style[s] = st[s];\n      }\n    }\n  }\n};\n\n/**\n * Get style propertie of an element\n * @param {DOMElement} el the element\n * @param {string} styleProp Propertie name\n * @return {*} style value\n */\ngclient_element.getStyle = function(el, styleProp) {\n  var value, defaultView = (el.ownerDocument || document).defaultView;\n  // W3C standard way:\n  if (defaultView && defaultView.getComputedStyle) {\n    // sanitize property name to css notation\n    // (hypen separated words eg. font-Size)\n    styleProp = styleProp.replace(/([A-Z])/g, \"-$1\").toLowerCase();\n    value = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);\n  } else if (el.currentStyle) { // IE\n    // sanitize property name to camelCase\n    styleProp = styleProp.replace(/-(\\w)/g, function(str, letter) {\n      return letter.toUpperCase();\n    });\n    value = el.currentStyle[styleProp];\n    // convert other units to pixels on IE\n    if (/^\\d+(em|pt|%|ex)?$/i.test(value)) { \n      return (function(value) {\n        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;\n        el.runtimeStyle.left = el.currentStyle.left;\n        el.style.left = value || 0;\n        value = el.style.pixelLeft + \"px\";\n        el.style.left = oldLeft;\n        el.runtimeStyle.left = oldRsLeft;\n        return value;\n      })(value);\n    }\n  }\n  if (/px$/.test(value)) return parseInt(value);\n  return value;\n};\n\n/** Get outerHeight of an elemen\n * @param {DOMElement} elt\n * @return {number}\n */\ngclient_element.outerHeight = function(elt) {\n  return elt.offsetHeight + gclient_element.getStyle(elt, 'marginBottom')\n};\n\n/** Check class exist element\n * @param {DOMElement} elt\n * @param {String} css\n * @return {Boolean}\n */\ngclient_element.hasClass = function(elt, css) {\n  return elt.classList.contains(css);\n};\n\n/** Add css to element\n * @param {DOMElement} elt\n * @param {String} css\n */\ngclient_element.addClass = function(elt,css) {\n  elt.classList.add(css);\n};\n\n/** remove css to element\n * @param {DOMElement} elt\n * @param {String} css\n */\ngclient_element.removeClass = function(elt,css) {\n  elt.classList.remove(css);\n};\n\n/** Get outerWidth of an elemen\n * @param {DOMElement} elt\n * @return {number}\n */\ngclient_element.outerWidth = function(elt) {\n  return elt.offsetWidth + gclient_element.getStyle(elt, 'marginLeft')\n};\n\n/** Get element offset rect\n * @param {DOMElement} elt\n * @return {*} \n */\ngclient_element.offsetRect = function(elt) {\n  var rect = elt.getBoundingClientRect();\n  return {\n    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),\n    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),\n    height: rect.height || (rect.bottom - rect.top),\n    width: rect.widtth || (rect.right - rect.left)\n  }\n};\n\n/** Make a div scrollable without scrollbar.\n * On touch devices the default behavior is preserved\n * @param {DOMElement} elt\n * @param {function} onmove a function that takes a boolean indicating that the div is scrolling\n */\ngclient_element.scrollDiv = function(elt, options) {\n  var pos = false;\n  var speed = 0;\n  var d, dt = 0;\n\n  var onmove = (typeof(options.onmove) === 'function' ? options.onmove : function(){});\n  var page = options.vertical ? 'pageY' : 'pageX';\n  var scroll = options.vertical ? 'scrollTop' : 'scrollLeft';\n  var moving = false;\n\n  // Prevent image dragging\n  elt.querySelectorAll('img').forEach(function(i) {\n    i.ondragstart = function(){ return false; };\n  });\n  \n  // Start scrolling\n  gclient_element.addListener(elt, ['mousedown'], function(e) {\n    moving = false;\n    pos = e[page];\n    dt = new Date();\n    elt.classList.add('ol-move');\n  });\n  \n  // Register scroll\n  gclient_element.addListener(window, ['mousemove'], function(e) {\n    moving = true;\n    if (pos !== false) {\n      var delta = pos - e[page];\n      elt[scroll] += delta;\n      d = new Date();\n      if (d-dt) {\n        speed = (speed + delta / (d - dt))/2;\n      }\n      pos = e[page];\n      dt = d;\n      // Tell we are moving\n      if (delta) onmove(true);\n    } else {\n      // Not moving yet\n      onmove(false);\n    }\n  });\n  \n  // Stop scrolling\n  gclient_element.addListener(window, ['mouseup'], function(e) {\n    if (moving) setTimeout (function() { elt.classList.remove('ol-move'); });\n    else elt.classList.remove('ol-move');\n    moving = false;\n    dt = new Date() - dt;\n    if (dt>100) {\n      // User stop: no speed\n      speed = 0;\n    } else if (dt>0) {\n      // Calculate new speed\n      speed = ((speed||0) + (pos - e[page]) / dt) / 2;\n    }\n    elt[scroll] += speed*100;\n    pos = false;\n    speed = 0;\n    dt = 0;\n  });\n\n  // Handle mousewheel\n  if (options.mousewheel && !elt.classList.contains('ol-touch')) {\n    gclient_element.addListener(elt, \n      ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], \n      function(e) {\n        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));\n        elt.classList.add('ol-move');\n        elt[scroll] -= delta*30;\n        elt.classList.remove('ol-move');\n        return false;\n      }\n    );\n  }\n};\n\n/** Dispatch an event to an Element \n * @param {string} eventName\n * @param {Element} element\n*/\ngclient_element.dispatchEvent = function (eventName, element) {\n  var event;\n  try {\n    event = new CustomEvent(eventName);\n  } catch(e) {\n    // Try customevent on IE\n    event = document.createEvent(\"CustomEvent\");\n    event.initCustomEvent(eventName, true, true, {});\n  }\n  element.dispatchEvent(event);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gclient_element);\n\n\n//# sourceURL=webpack:///./src/openlayers/core/Element.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TiledVietNamMapLayer\", function() { return TiledVietNamMapLayer; });\n/* harmony import */ var ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/source/TileImage */ \"ol/source/TileImage\");\n/* harmony import */ var ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n/**\r\n * @class ol.ekmap.TiledVietNamMapLayer\r\n * @classdesc The TiledVietNamMapLayer class.\r\n * @category  Layer\r\n * @param {Object} options  Construction parameters.\r\n * @param {string} options.token  Will use this token to authenticate all calls to the service.\r\n * @param {string} options.attribution Contains an attribution to be displayed when the map is shown to a user.\r\n * @extends {ol.ekmap.TileLayer}\r\n * @example\r\n * var map = new ol.Map({\r\n *     container: 'map',\r\n *     center: [103.9, 22.2],\r\n *     zoom: 6\r\n * });\r\n * var vnMap = new ol.ekmap.TiledVietNamMapLayer({\r\n *      token: {YOUR_API_KEY}\r\n * })\r\n *   .addTo(map);\r\n */\r\nclass TiledVietNamMapLayer extends ol_source_TileImage__WEBPACK_IMPORTED_MODULE_0___default.a {\r\n\r\n    constructor(options) {\r\n        options = options || {};\r\n\r\n        options.attributions = options.attributions || \"<a href='https://www.mapbox.com/about/maps/' target='_blank'>© Map </a>\" +\r\n            \"by <a href='http://ekgis.com.vn/' target='_blank' style='color: blue'>eKGIS</a>\";\r\n\r\n        options.urls = [\r\n            \"https://mt0.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\",\r\n            \"https://mt1.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\",\r\n            \"https://mt2.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\",\r\n            \"https://mt3.ekgis.vn/gserver/rest/services/imagetile/1472/2075/tile/{z}/{x}/{y}.png\"\r\n        ];\r\n        options.urlsToken = [];\r\n        if (options)\r\n            options.urls.forEach(url => {\r\n                url += \"?apikey=\" + options.token;\r\n                options.urlsToken.push(url);\r\n            })\r\n        super({\r\n            attributions: options.attributions,\r\n            urls: options.urlsToken,\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/openlayers/layer/TiledVietNamMapLayer.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control */ \"./src/openlayers/control/index.js\");\n/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ \"./src/openlayers/layer/index.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScaleLine\", function() { return _control__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BaseLayer\", function() { return _control__WEBPACK_IMPORTED_MODULE_0__[\"BaseLayer\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TiledVietNamMapLayer\", function() { return _layer__WEBPACK_IMPORTED_MODULE_1__[\"TiledVietNamMapLayer\"]; });\n\n\n\n\nif (window && window.ol) {\n    let ol = window.ol;\n    ol.ekmap = window.ol.ekmap || {};\n    ol.ekmap.control = window.ol.ekmap.control || {};\n    // control\n    ol.ekmap.control.ScaleLine = _control__WEBPACK_IMPORTED_MODULE_0__[\"ScaleLine\"];\n    ol.ekmap.control.BaseLayer = _control__WEBPACK_IMPORTED_MODULE_0__[\"BaseLayer\"];\n    ol.ekmap.TiledVietNamMapLayer = _layer__WEBPACK_IMPORTED_MODULE_1__[\"TiledVietNamMapLayer\"];\n    // core\n\n    // mapping\n\n    // overlay\n\n    // service\n}\n\n\n\n//# sourceURL=webpack:///./src/openlayers/namespace.js?");

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