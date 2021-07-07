export class Math {
    constructor() {

        /**
         * @member {number} Ekmap.LevelRenderer.Tool.Math._radians
         * @description Angle and radian conversion parameters
         */
        this._radians = window.Math.PI / 180;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Math";
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Math.prototype.sin
     * @description Sine function.
     * @param {number} angle-the radian (angle) parameter.
     * @param {boolean} [isDegrees=false] Whether the angle parameter is an angle calculation, and angle is an angle measured in radians.
     * @returns {number} sin value.
     */
    sin(angle, isDegrees) {
        return window.Math.sin(isDegrees? angle * this._radians: angle);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Math.prototype.cos
     * @description Cosine function.
     * @param {number} angle-the radian (angle) parameter.
     * @param {boolean} [isDegrees=false] Whether the angle parameter is an angle calculation, and angle is an angle measured in radians.
     * @returns {number} cos value.
     */
    cos(angle, isDegrees) {
        return window.Math.cos(isDegrees? angle * this._radians: angle);
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Math.prototype.degreeToRadian
     * @description Angle to radians.
     * @param {number} angle-the radian (angle) parameter.
     * @param {boolean} [isDegrees=false] Whether the angle parameter is an angle calculation, and angle is an angle measured in radians.
     * @returns {number} radian value.
     */
    degreeToRadian(angle) {
        return angle * this._radians;
    }

    /**
     * @function Ekmap.LevelRenderer.Tool.Math.prototype.radianToDegree
     * @description radians to angle.
     * @param {number} angle-the radian (angle) parameter.
     * @param {boolean} [isDegrees=false] Whether the angle parameter is an angle calculation, and angle is an angle measured in radians.
     * @returns {number} angle.
     */

    radianToDegree(angle) {
        return angle / this._radians;
    }

}