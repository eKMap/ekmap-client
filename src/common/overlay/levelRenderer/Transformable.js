import { SUtil } from './SUtil';
export class Transformable {

    /**
     * @function Ekmap.LevelRenderer.Transformable.constructor
     * @description Constructor.
     */
    constructor() {
        /**
         * @member {Array.<number>} Ekmap.LevelRenderer.Transformable.prototype.position
         * @description translation, default value: [0, 0].
         */
        this.position = [0, 0];

        /**
         * @member {Array.<number>} Ekmap.LevelRenderer.Transformable.prototype.rotation
         * @description Rotation, the origin of rotation can be specified by two or three items in the array, default value: [0, 0, 0].
         */
        this.rotation = [0, 0, 0];

        /**
         * @member {Array.<number>} Ekmap.LevelRenderer.Transformable.prototype.scale
         * @description zoom, the origin of zoom can be specified by three or four items in the array, default value: [1, 1, 0, 0].
         */
        this.scale = [1, 1, 0, 0];

        /**
         * @member {boolean} Ekmap.LevelRenderer.Transformable.prototype.needLocalTransform
         * @description Whether to change. Default value: false.
         */
        this.needLocalTransform = false;

        /**
         * @member {boolean} Ekmap.LevelRenderer.Transformable.prototype.needTransform
         * @description Whether there is coordinate transformation. Default value: false.
         */
        this.needTransform = false;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Transformable";
        /**
         * @function Ekmap.LevelRenderer.Transformable.prototype.lookAt
         * @description Set the orientation of the graphic.
         */
        this.lookAt = (function() {
            var v = SUtil.Util_vector.create();
            // {Array.<Number>|Float32Array} target
            return function(target) {
                if (!this.transform) {
                    this.transform = SUtil.Util_matrix.create();
                }
                var m = this.transform;
                SUtil.Util_vector.sub(v, target, this.position);
                if (isAroundZero(v[0]) && isAroundZero(v[1])) {
                    return;
                }
                SUtil.Util_vector.normalize(v, v);
                // Y Axis
                // TODO Scale origin?
                m[2] = v[0] * this.scale[1];
                m[3] = v[1] * this.scale[1];
                // X Axis
                m[0] = v[1] * this.scale[0];
                m[1] = -v[0] * this.scale[0];
                // Position
                m[4] = this.position[0];
                m[5] = this.position[1];

                this.decomposeTransform();

                function isAroundZero(val) {
                    var EPSILON = 5e-5;
                    return val> -EPSILON && val <EPSILON;
                }
            };
        })();
    }

    /**
     * @function Ekmap.LevelRenderer.Transformable.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.needLocalTransform = null;
        this.needTransform = null;
    }


    /**
     * @function Ekmap.LevelRenderer.Transformable.prototype.updateNeedTransform
     * @description update needLocalTransform
     */
    updateNeedTransform() {
        this.needLocalTransform = isNotAroundZero(this.rotation[0]) ||
            isNotAroundZero(this.position[0]) ||
            isNotAroundZero(this.position[1]) ||
            isNotAroundZero(this.scale[0]-1) ||
            isNotAroundZero(this.scale[1]-1);

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val> EPSILON || val <-EPSILON;
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Transformable.prototype.updateTransform
     * @description Determine whether coordinate transformation is required and update the needTransform attribute. If there is a coordinate transformation, calculate its own transform matrix from position, rotation, scale and the transform of the parent node
     */
    updateTransform() {
        this.updateNeedTransform();

        if (this.parent) {
            this.needTransform = this.needLocalTransform || this.parent.needTransform;
        } else {
            this.needTransform = this.needLocalTransform;
        }

        if (!this.needTransform) {
            return;
        }

        var origin = [0, 0];

        var m = this.transform || SUtil.Util_matrix.create();
        SUtil.Util_matrix.identity(m);

        if (this.needLocalTransform) {
            if (
                isNotAroundZero(this.scale[0]) ||
                isNotAroundZero(this.scale[1])
            ) {
                origin[0] = -this.scale[2] || 0;
                origin[1] = -this.scale[3] || 0;
                let haveOrigin = isNotAroundZero(origin[0]) ||
                    isNotAroundZero(origin[1]);
                if (haveOrigin) {
                    SUtil.Util_matrix.translate(
                        m, m, origin
                    );
                }
                SUtil.Util_matrix.scale(m, m, this.scale);
                if (haveOrigin) {
                    origin[0] = -origin[0];
                    origin[1] = -origin[1];
                    SUtil.Util_matrix.translate(
                        m, m, origin
                    );
                }
            }

            if (this.rotation instanceof Array) {
                if (this.rotation[0] !== 0) {
                    origin[0] = -this.rotation[1] || 0;
                    origin[1] = -this.rotation[2] || 0;
                    let haveOrigin = isNotAroundZero(origin[0]) ||
                        isNotAroundZero(origin[1]);
                    if (haveOrigin) {
                        SUtil.Util_matrix.translate(
                            m, m, origin
                        );
                    }
                    SUtil.Util_matrix.rotate(m, m, this.rotation[0]);
                    if (haveOrigin) {
                        origin[0] = -origin[0];
                        origin[1] = -origin[1];
                        SUtil.Util_matrix.translate(
                            m, m, origin
                        );
                    }
                }
            } else {
                if (this.rotation !== 0) {
                    SUtil.Util_matrix.rotate(m, m, this.rotation);
                }
            }

            if (
                isNotAroundZero(this.position[0]) || isNotAroundZero(this.position[1])
            ) {
                SUtil.Util_matrix.translate(m, m, this.position);
            }
        }

        // Save this transformation matrix
        this.transform = m;

        // Apply parent node transformation
        if (this.parent && this.parent.needTransform) {
            if (this.needLocalTransform) {
                SUtil.Util_matrix.mul(this.transform, this.parent.transform, this.transform);
            } else {
                SUtil.Util_matrix.copy(this.transform, this.parent.transform);
            }
        }

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val> EPSILON || val <-EPSILON;
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Transformable.prototype.setTransform
     * @description applies its transform to the context.
     *
     * @param {Context2D} ctx-Context2D context.
     */
    setTransform(ctx) {
        if (this.needTransform) {
            var m = this.transform;
            ctx.transform(
                m[0], m[1],
                m[2], m[3],
                m[4], m[5]
            );
        }
    }



    /**
     * @function Ekmap.LevelRenderer.Transformable.prototype.decomposeTransform
     * @description decomposes the `transform` matrix to `position`, `rotation`, `scale`.
     */
    decomposeTransform() {
        if (!this.transform) {
            return;
        }
        var m = this.transform;
        var sx = m[0] * m[0] + m[1] * m[1];
        var position = this.position;
        var scale = this.scale;
        var rotation = this.rotation;
        if (isNotAroundZero(sx-1)) {
            sx = Math.sqrt(sx);
        }
        var sy = m[2] * m[2] + m[3] * m[3];
        if (isNotAroundZero(sy-1)) {
            sy = Math.sqrt(sy);
        }
        position[0] = m[4];
        position[1] = m[5];
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = scale[3] = 0;
        rotation[0] = Math.atan2(-m[1] / sy, m[0] / sx);
        rotation[1] = rotation[2] = 0;

        function isNotAroundZero(val) {
            var EPSILON = 5e-5;
            return val> EPSILON || val <-EPSILON;
        }
    }

}