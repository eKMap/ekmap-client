import * as THREE from "three";
import mapboxgl from "mapbox-gl";
import {Transform,ThreeLayerRenderer} from "./threejs";

const {
    Vector3,
    Shape,
    Mesh,
    BufferGeometry,
    ExtrudeGeometry
} = THREE;

      
/**
 * @class mapboxgl.ekmap.ThreeLayer
 * @category  Visualization Three
 * @classdesc The three layers class.
 * @param {string} id  The layer ID.
 * @param {string} renderer="gl" The rendering mode of the layer (canvas or WebGL). Value: "gl", "canvas".
 * @param {Object} options Initialization parameters.
 * @param {Object} options.threeOptions The parameter object initialized by the threejs renderer. For details of the parameters, see:
 *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}
 *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
 *
 * @extends {mapboxgl.Evented}
 * @fires mapboxgl.ekmap.ThreeLayer#render
 * @fires mapboxgl.ekmap.ThreeLayer#renderscene
 * @example
 * var threeLayer = new mapboxgl.ekmap.ThreeLayer('three');
 * //Model drawing
 * threeLayer.on("initialized", draw);
 * threeLayer.addTo(map);
 *
 * function draw() {
 *    var scene=threeLayer.getScene();
 *    camera=threeLayer.getCamera();
 *    var light = new THREE.PointLight(0xffffff);
 *    camera.add(light);
 *    var material = new THREE.MeshPhongMaterial({color: 0xff0000});
 *    var mesh = this.toThreeMesh(feature.geometry.coordinates, 10, material, true);
 *    scene.add(mesh);
 * }
 *
 * There are two ways to overlay a model:</br>
 *     1.Call threeLayer.toThreeMesh to directly convert geographic coordinates into a threejs 3D model (for extruded models, such as urban buildings) and then add to the 3D scene.
 *     2.Create a mesh using the interface of ThreeJS, then call threeLayer.setPosition to set the geographic location and then add it to the 3D scene.
 *
 */
export class ThreeLayer extends mapboxgl.Evented {

    constructor(id, renderer, options) {
        super();
        this._layerId = id;
        this.options = options;
        let threeOptions = options && options.threeOptions;
        this.renderer = new ThreeLayerRenderer(this, renderer, threeOptions);
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.toThreeShape
     * @description  Create a threejs shape object.
     * @param {Array} coordinates An array of coordinate points.
     * @returns THREE.Shape {@link https://threejs.org/docs/index.html#api/extras/core/Shape} The object of the threejs shape.
     */
    toThreeShape(coordinates) {
        if (!coordinates) {
            return null;
        }
        let center = this.getCoordinatesCenter(coordinates);
        let centerPoint = this.lngLatToPosition(center);
        let outer = coordinates.map(coords => this.lngLatToPosition({
            lng: coords[0],
            lat: coords[1]
        }).sub(centerPoint));

        return new Shape(outer);
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.toThreeMesh
     * @description Create a threejs Mesh object. Convert geographic coordinates to a threejs 3D model (for extruded models such as urban buildings).
     * @param {Array.<Object>} coordinates An array of coordinate points.
     * @param {number} amount height.
     * @param {THREE.Material} material Threejs material object. reference:：[THREE.Material]{@link https://threejs.org/docs/index.html#api/extras/core/Material}
     * @param {boolean} removeDuplicated Whether to remove duplicate coordinate points.
     * @returns {THREE.Mesh} Threejs Mesh object. reference：[THREE.Mesh]{@link https://threejs.org/docs/index.html#api/objects/Mesh}
     */
    toThreeMesh(coordinates, amount, material, removeDuplicated) {
        if (!coordinates) {
            return null;
        }
        let coords = coordinates;
        if (removeDuplicated) {
            coords = this.removeDuplicatedCoordinates(coordinates)
        }

        let targetAmount = this.distanceToThreeVector3(amount, amount).x;
        let shape = this.toThreeShape(coords);
        let geometry = new ExtrudeGeometry(shape, {
            'amount': targetAmount,
            'bevelEnabled': true
        });
        let bufferGeometry = new BufferGeometry().fromGeometry(geometry);
        let mesh = new Mesh(bufferGeometry, material);
        let center = this.lngLatToPosition(this.getCoordinatesCenter(coords));
        mesh.position.set(center.x, center.y, -targetAmount);
        return mesh;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.addObject
     * @description Set the coordinates (latitude and longitude) of the threejs 3D object.
     * @param {THREE.Object3D} object3D Threejs 3D object. reference：[THREE.Object3D]{@link https://threejs.org/docs/index.html#api/core/Object3D} and subclass object.
     * @param {(Array.<number>|Object)} coordinate The added three object coordinates (latitude and longitude).
     * @returns {this} this
     */
    addObject(object3D, coordinate) {
        if (coordinate && object3D) {
            this.setPosition(object3D, coordinate);
        }
        this.renderer && this.renderer.scene.add(object3D);
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getScene
     * @description Get the scene object of threejs.
     * @returns {THREE.Scene} Threejs scene object, reference：[THREE.Scene]{@link https://threejs.org/docs/index.html#api/scenes/Scene}
     */
    getScene() {
        return this.renderer.scene;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getCamera
     * @description Get the threejs camera.
     * @returns {THREE.Camera} Threejs camera. reference：[THREE.Camera]{@link https://threejs.org/docs/index.html#api/cameras/Camera}
     */
    getCamera() {
        return this.renderer.camera;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getThreeRenderer
     * @description Get the threejs renderer.
     * @returns {THREE.WebGLRenderer|THREE.CanvasRenderer} Threejs renderer. reference：
     *                      [THREE.WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
     *                      [THREE.CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
     */
    getThreeRenderer() {
        return this.renderer.context;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.clearMesh
     * @description Clear all threejs mesh objects.
     * @returns {this} The object of this.
     */
    clearMesh() {
        let scene = this.renderer.scene;
        if (!scene) {
            return this;
        }
        for (let i = scene.children.length - 1; i >= 0; i--) {
            if (scene.children[i] instanceof THREE.Mesh) {
                scene.remove(scene.children[i]);
            }
        }
        return this;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.clearAll
     * @description Clear all threejs objects.
     * @param {boolean} clearCamera Whether to clear the camera at the same time.
     * @returns {this} The object of this.
     */
    clearAll(clearCamera) {
        let scene = this.renderer.scene;
        if (!scene) {
            return this;
        }
        for (let i = scene.children.length - 1; i >= 0; i--) {
            if (!clearCamera && scene.children[i] instanceof THREE.Camera) {
                continue;
            }
            scene.remove(scene.children[i]);
        }
        return this;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.setPosition
     * @description Set the coordinates (latitude and longitude) of the threejs 3D object.
     * @param {THREE.Object3D} object3D Threejs 3D object, reference：[THREE.Object3D]{@link https://threejs.org/docs/index.html#api/core/Object3D} and subclass object.
     * @param {(Array.<number>|Object)} coordinate The added three object coordinates (latitude and longitude).
     * @returns {this} The object of this.
     */
    setPosition(object3D, coordinate) {
        if (!object3D || !coordinate) {
            return this;
        }

        var pos = this.lngLatToPosition(coordinate);
        object3D.position.set(pos.x, pos.y, pos.z);
        return this;
    }


    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.lngLatToPosition
     * @description Longitude and latitude turns three js 3D vector objects.
     * @param {(Array.<number>|Object)} lngLat Latitude and longitude coordinates.
     * @returns {THREE.Vector3} Three js 3D vector object. reference: [THREE.Vector3]{@link https://threejs.org/docs/index.html#api/math/Vector3}
     */
    lngLatToPosition(lngLat) {
        let zoom = Transform.projection.nativeMaxZoom;
        let point = Transform.lngLatToPoint(lngLat, zoom);
        return new Vector3(point.x, point.y, -0);
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.distanceToThreeVector3
     * @description A threejs 3D missing object that computes new coordinates from a given distance of a given coordinate.
     * @param {number} x x-axis distance in meters.
     * @param {number} y y-axis distance in meters.
     * @param {(Array.<number>|Object)} lngLat Source coordinates.
     * @returns {THREE.Vector3} The threejs 3D missing object of the target point. reference: [THREE.Vector3]{@link https://threejs.org/docs/index.html#api/math/Vector3}
     */
    distanceToThreeVector3(x, y, lngLat) {
        let map = this._map;

        let center = lngLat || map.getCenter(),
            maxZoom = Transform.projection.nativeMaxZoom,
            targetLngLat = Transform.locate(center, x, y);

        let point1 = Transform.lngLatToPoint(center, maxZoom),
            point2 = Transform.lngLatToPoint(targetLngLat, maxZoom);

        let targetX = Math.abs(point2.x - point1.x) * Math.sign(x);
        let targetY = Math.abs(point2.y - point1.y) * Math.sign(y);
        return new Vector3(targetX, targetY, 0);
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.removeDuplicatedCoordinates
     * @description Remove the repeated coordinates in the array.
     * @param {(Array.<Array.<number>>)} coordinates An array of coordinates.
     * @returns {(Array.<Array.<number>>)} A new array of coordinates.
     */
    removeDuplicatedCoordinates(coordinates) {
        function equals(point1, point2) {
            return point1[0] === point2[0] && point1[1] === point2[1]
        }

        let coords = [].concat(coordinates);
        let length = coords.length;
        for (let i = length - 1; i >= 1; i--) {
            if (equals(coords[i], coords[i - 1])) {
                coords.splice(i, 1);
            }
        }

        let isClose = equals(coords[0], coords[coords.length - 1]);
        isClose && coords.splice(coords.length - 1, 1);
        return coords;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getCoordinatesCenter
     * @description Gets the center coordinate of the given coordinate array.
     * @param {(Array.<Array.<number>>)} coordinates An array of coordinates.
     * @returns {Object} A coordinate object containing latitude and longitude.
     */
    getCoordinatesCenter(coordinates) {
        let sumX = 0, sumY = 0, count = 0;
        let i = 0, len = coordinates.length;
        for (; i < len; i++) {
            if (coordinates[i]) {
                sumX += coordinates[i][0];
                sumY += coordinates[i][1];
                count++;
            }
        }
        return {
            lng: sumX / count,
            lat: sumY / count
        };
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.addTo
     * @description Add a layer to the map.
     * @param {Object} map The object of the map.
     * @returns {this} The object of this
     */
    addTo(map) {
        var me = this;
        me._map = map;
        me.renderer.setMap(map);
        me.renderer.render();
        //three mbgl 联动(仅联动相机,不执行重绘操作)
        me._map.on('render', this._update.bind(me));
        me._map.on('resize', this._resize.bind(me));

        me.on('render', (function () {
            this.context && this.context.render(this.scene, this.camera);
        }).bind(me.renderer));

        return this;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getCanvasContainer
     * @description Get the three layer container.
     * @returns {HTMLElement} A container for the three layers.
     */
    getCanvasContainer() {
        return this.renderer.getCanvasContainer();
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.getCanvas
     * @description Get the three layer canvas.
     * @returns {HTMLCanvasElement} The canvas of the three layers.
     */
    getCanvas() {
        return this.renderer.getCanvas();
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.remove
     * @description Remove the layer.
     */
    remove() {
        let map = this._map, me = this;
        map.off('render', me._update.bind(me));
        map.off('resize', me._resize.bind(me));
        me.renderer.remove();
        me._map = null;
    }

    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.draw
     * @description Provides an external threejs model drawing interface.
     * @param {THREE.WebGLRenderer|THREE.CanvasRenderer} gl Threejs renderer context. For details, please refer to：</br>
     *          [WebGLRenderer]{@link https://threejs.org/docs/index.html#api/renderers/WebGLRenderer}/
     *          [CanvasRenderer]{@link https://threejs.org/docs/index.html#examples/renderers/CanvasRenderer}
     * @param {THREE.Scene} scene Threejs scene object. For details, please refer to：[THREE.Scene]{@link https://threejs.org/docs/index.html#api/scenes/Scene}
     * @param {THREE.Camera} camera Threejs camera object. For details, please refer to: [THREE.Camera]{@link https://threejs.org/docs/index.html#api/cameras/Camera}
     * @returns {this} The object of this.
     * @example
     * var threeLayer = new mapboxgl.ekmap.ThreeLayer('three');
     * //Can be modeled by overriding draw
     * threeLayer.draw = function (gl, scene, camera) {
     *     //TODO drawing operation.
     * }
     * threeLayer.addTo(map);
     */
    draw(gl, scene, camera) {
        return this;
    }


    /**
     * @function mapboxgl.ekmap.ThreeLayer.prototype.renderScene
     * @description Rendered scenes.
     * @returns {this} this
     */
    renderScene() {
        this.renderer.renderScene();
        /**
         * @event mapboxgl.ekmap.ThreeLayer#renderscene
         * @description renderScene Event, triggered after the scene is rendered.
         */ 
        this.fire("renderscene");
        return this;
    }

    _resize() {
        this.renderer.resize();
    }

    _update() {
        /**
         * @event mapboxgl.ekmap.ThreeLayer#render
         * @description render event, triggered when the map is rendered (when the map state changes).
         */
        this.renderScene();
        this.fire('render');
        return this;
    }
}


mapboxgl.ekmap.ThreeLayer = ThreeLayer;