export class Easing {

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.constructor
     * @description Constructor.
     */
     constructor() {
        this.CLASS_NAME = "Ekmap.LevelRenderer.Animation.easing";
    }


    /**
     * @function Ekmap.LevelRenderer.Animation.easing.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {

    }


    /**
     * @function Ekmap.LevelRenderer.Animation.easing.Linear
     * @description linear easing
     * @param {number} k-parameter
     * @return {number} input value
     */
    Linear(k) {
        return k;
    }


    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuadraticIn
     * @description Quadratic easing (t^2)
     * @param {number} k-parameter
     * @return {number} the value of the quadratic easing
     */
    QuadraticIn(k) {
        return k * k;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuadraticOut
     * @description returns the value of exiting according to the quadratic slow motion
     * @param {number} k-parameter
     * @return {number} The value of exiting according to the quadratic slow motion
     */
    QuadraticOut(k) {
        return k * (2-k);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuadraticInOut
     * @description returns the value of entering and exiting in quadratic slow motion
     * @param {number} k-parameter
     * @return {number} Enter and exit values ​​in quadratic slow motion
     */
    QuadraticInOut(k) {
        if ((k *= 2) <1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k-2)-1);
    }


    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CubicIn
     * @description Cubic easing (t^3)
     * @param {number} k-parameter
     * @return {number} The value of the easing according to the third power
     */
    CubicIn(k) {
        return k * k * k;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CubicOut
     * @description returns the value of exiting according to the cubic easing
     * @param {number} k-parameter
     * @return {number} The value of exiting according to the cubic easing
     */
    CubicOut(k) {
        return --k * k * k + 1;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CubicInOut
     * @description returns the value of entering and exiting according to the cubic slow motion
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the cubic slow motion
     */
    CubicInOut(k) {
        if ((k *= 2) <1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    }


    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuarticIn
     * @description returns the value entered by the fourth power of ease
     * @param {number} k-parameter
     * @return {number} The value entered by the fourth power of ease
     */
    QuarticIn(k) {
        return k * k * k * k;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuarticOut
     * @description returns the value of easing exit according to the fourth power
     * @param {number} k-parameter
     * @return {number} The value of easing exit according to the fourth power
     */
    QuarticOut(k) {
        return 1-(--k * k * k * k);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuarticInOut
     * @description returns the value of entering and exiting according to the fourth power of ease
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the fourth power of ease
     */
    QuarticInOut(k) {
        if ((k *= 2) <1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k-2);
    }


    // The easing of the fifth power (t^5)
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuinticIn
     * @description returns the value of the fifth power of easing
     * @param {number} k-parameter
     * @return {number} The value of easing according to the fifth power
     */
    QuinticIn(k) {
        return k * k * k * k * k;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuinticOut
     * @description returns the value of easing exit according to the fifth power
     * @param {number} k-parameter
     * @return {number} The value of easing exit according to the fifth power
     */
    QuinticOut(k) {
        return --k * k * k * k * k + 1;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.QuinticInOut
     * @description returns the value of entering and exiting according to the fifth power of ease
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the fifth power of ease
     */
    QuinticInOut(k) {
        if ((k *= 2) <1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }


    // Ease of sine curve (sin(t))
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.SinusoidalIn
     * @description returns the value entered according to the easing of the sine curve
     * @param {number} k-parameter
     * @return {number} Enter the value according to the easing of the sine curve
     */
    SinusoidalIn(k) {
        return 1-Math.cos(k * Math.PI / 2);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.SinusoidalOut
     * @description returns the value of the easing exit according to the sine curve
     * @param {number} k-parameter
     * @return {number} The value of the easing exit according to the sine curve
     */
    SinusoidalOut(k) {
        return Math.sin(k * Math.PI / 2);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.SinusoidalInOut
     * @description returns the value of entering and exiting according to the easing of the sine curve
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the easing of the sine curve
     */
    SinusoidalInOut(k) {
        return 0.5 * (1-Math.cos(Math.PI * k));
    }


    // The easing of the exponential curve (2^t)
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ExponentialIn
     * @description returns the value entered according to the easing of the exponential curve
     * @param {number} k-parameter
     * @return {number} Enter the value according to the easing of the exponential curve
     */
    ExponentialIn(k) {
        return k === 0? 0: Math.pow(1024, k-1);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ExponentialOut* @description returns the value of the easing exit according to the exponential curve
     * @param {number} k-parameter
     * @return {number} The value of easing exit according to the exponential curve
     */
    ExponentialOut(k) {
        return k === 1? 1: 1-Math.pow(2, -10 * k);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ExponentialInOut
     * @description returns the value of entering and exiting according to the easing of the exponential curve
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the easing of exponential curve
     */
    ExponentialInOut(k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) <1) {
            return 0.5 * Math.pow(1024, k-1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k-1)) + 2);
    }


    // Easing of circular curve (sqrt(1-t^2))
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CircularIn
     * @description returns the value entered by the easing of the circular curve
     * @param {number} k-parameter
     * @return {number} The value entered by the easing of the circular curve
     */
    CircularIn(k) {
        return 1-Math.sqrt(1-k * k);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CircularOut
     * @description returns the value of the easing exit according to the circular curve
     * @param {number} k-parameter
     * @return {number} The value of the easing exit according to the circular curve
     */
    CircularOut(k) {
        return Math.sqrt(1-(--k * k));
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.CircularInOut
     * @description returns the value of entering and exiting according to the easing of the circular curve
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the ease of circular curve
     */
    CircularInOut(k) {
        if ((k *= 2) <1) {
            return -0.5 * (Math.sqrt(1-k * k)-1);
        }
        return 0.5 * (Math.sqrt(1-(k -= 2) * k) + 1);
    }


    // Create an animation that resembles a spring oscillating back and forth before stopping
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ElasticIn
     * @description returns the value entered in easing similar to the animation of a spring oscillating back and forth before stopping
     * @param {number} k-parameter
     * @return {number} Enter the value in easing similar to the animation of a spring oscillating back and forth before stopping
     */
    ElasticIn(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (a <1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1)) *
            Math.sin((k-s) * (2 * Math.PI) / p));
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ElasticOut
     * @description returns the value of easing exit similar to the animation of a spring oscillating back and forth before stopping
     * @param {number} k-parameter
     * @return {number} According to the value of easing exit similar to the animation of a spring oscillating back and forth before stopping
     */
    ElasticOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (a <1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k) *
            Math.sin((k-s) * (2 * Math.PI) / p) + 1);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.ElasticInOut
     * @description returns the value of entering and exiting with a easing similar to the animation of a spring oscillating back and forth before stopping
     * @param {number} k-parameter
     * @return {number} Enter and exit the value by easing similar to the animation of a spring oscillating back and forth before stopping
     */
    ElasticInOut(k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (a <1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) <1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) *
                Math.sin((k-s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1)) *
            Math.sin((k-s) * (2 * Math.PI) / p) * 0.5 + 1;

    }


    // Slightly retract the movement of the animation before an animation starts to animate along the indicated path
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BackIn
     * @description returns the value of the easing entry that slightly retracts the movement of an animation before animating along the indicated path at the beginning of an animation
     * @param {number} k-parameter
     * @return {number} Press to slightly retract the moving easing entry value of a certain animation before starting to animate along the indicated path
     */
    BackIn(k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k-s);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BackOut
     * @description returns the value of the easing exit that slightly retracts the movement of the animation before the animation starts along the indicated path
     * @param {number} k-parameter
     * @return {number} Press the value of the easing exit to slightly retract the movement of an animation before animating along the indicated path
     */
    BackOut(k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BackInOut
     * @description returns the value of the easing entry and exit of the movement of a certain animation before the animation process along the indicated path is slightly retracted
     * @param {number} k-parameter
     * @return {number} Press to slightly retract the movement of the animation before the animation process along the indicated path to enter and exit the value
     */
    BackInOut(k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) <1) {
            return 0.5 * (k * k * ((s + 1) * k-s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }


    // Create a bounce effect
    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BounceIn
     * @description returns the value entered by the easing of the bounce effect
     * @param {number} k-parameter* @return {number} The value entered by the easing of the bounce effect
     */
    BounceIn(k) {
        return 1-this.BounceOut(1-k);
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BounceOut
     * @description returns the value of the easing exit according to the bounce effect
     * @param {number} k-parameter
     * @return {number} The value of easing exit according to the bounce effect
     */
    BounceOut(k) {
        if (k <(1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k <(2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k <(2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    }

    /**
     * @function Ekmap.LevelRenderer.Animation.easing.BounceInOut
     * @description returns the value of entering and exiting according to the easing of the bounce effect
     * @param {number} k-parameter
     * @return {number} Enter and exit value according to the easing of the bounce effect
     */
    BounceInOut(k) {
        if (k <0.5) {
            return this.BounceIn(k * 2) * 0.5;
        }
        return this.BounceOut(k * 2-1) * 0.5 + 0.5;
    }
}