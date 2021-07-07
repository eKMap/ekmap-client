import { Util } from '../levelRenderer/Util';
import { Eventful } from './Eventful';
import { Clip } from './Clip';
import { SUtil } from './SUtil';
import { Util as CommonUtil } from "../../commontypes/Util";

export class Animation extends Eventful {

    constructor(options) {
        super(options);

        options = options || {};
        /**
         * @member {Object} Ekmap.LevelRenderer.Animation.prototype.stage
         * @description stage.
         */
        this.stage = {};

        /**
         * @member {Object} Ekmap.LevelRenderer.Animation.prototype.onframe
         * @description onframe.
         */
        this.onframe = function() {};

        /**
         * @member {Array} Ekmap.LevelRenderer.Animation.prototype._clips
         * @description _clips.
         */
        this._clips = [];

        /**
         * @member {boolean} Ekmap.LevelRenderer.Animation.prototype._running
         * @description _running.
         */
        this._running = false;

        /**
         * @member {number} Ekmap.LevelRenderer.Animation.prototype._time
         * @description _time.
         */
        this._time = 0;

        CommonUtil.extend(this, options);

        this.CLASS_NAME = "Ekmap.LevelRenderer.Animation";
    }

    add(clip) {
        this._clips.push(clip);
    }

    remove(clip) {
        var idx = new Util().indexOf(this._clips, clip);
        if (idx >= 0) {
            this._clips.splice(idx, 1);
        }
    }

    _update() {
        var time = new Date().getTime();
        var delta = time - this._time;
        var clips = this._clips;
        var len = clips.length;

        var deferredEvents = [];
        var deferredClips = [];
        for (let i = 0; i < len; i++) {
            var clip = clips[i];
            var e = clip.step(time);
            // Throw out the events need to be called after
            // stage.update, like destroy
            if (e) {
                deferredEvents.push(e);
                deferredClips.push(clip);
            }
        }
        if (this.stage.update) {
            this.stage.update();
        }

        // Remove the finished clip
        for (let i = 0; i < len;) {
            if (clips[i]._needsRemove) {
                clips[i] = clips[len - 1];
                clips.pop();
                len--;
            } else {
                i++;
            }
        }

        len = deferredEvents.length;
        for (let i = 0; i < len; i++) {
            deferredClips[i].fire(deferredEvents[i]);
        }

        this._time = time;

        this.onframe(delta);

        this.dispatch('frame', delta);
    }

    start() {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||

            function(func) {
                setTimeout(func, 16);
            };

        var self = this;

        this._running = true;

        function step() {
            if (self._running) {
                self._update();
                requestAnimationFrame(step);
            }
        }

        this._time = new Date().getTime();
        requestAnimationFrame(step);
    }

    stop() {
        this._running = false;
    }

    clear() {
        this._clips = [];
    }

    animate(target, options) {
        options = options || {};
        var deferred = new Animator(
            target,
            options.loop,
            options.getter,
            options.setter
        );
        deferred.animation = this;
        return deferred;
    }

    static _interpolateNumber(p0, p1, percent) {
        return (p1 - p0) * percent + p0;
    }

    static _interpolateArray(p0, p1, percent, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._interpolateNumber(p0[i], p1[i], percent);
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (let j = 0; j < len2; j++) {
                    out[i][j] = Animation._interpolateNumber(
                        p0[i][j], p1[i][j], percent
                    );
                }
            }
        }
    }

    static _isArrayLike(data) {
        switch (typeof data) {
            case 'undefined':
            case 'string':
                return false;
        }

        return typeof data.length !== 'undefined';
    }

    static _catmullRomInterpolateArray(p0, p1, p2, p3, t, t2, t3, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (let i = 0; i < len; i++) {
                out[i] = Animation._catmullRomInterpolate(
                    p0[i], p1[i], p2[i], p3[i], t, t2, t3
                );
            }
        } else {
            var len2 = p0[0].length;
            for (let i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    out[i][j] = Animation._catmullRomInterpolate(
                        p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                        t, t2, t3
                    );
                }
            }
        }
    }

    static _catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3 +
            (-3 * (p1 - p2) - 2 * v0 - v1) * t2 +
            v0 * t + p1;
    }

    static _cloneValue(value) {
        var arraySlice = Array.prototype.slice;

        if (Animation._isArrayLike(value)) {
            var len = value.length;
            if (Animation._isArrayLike(value[0])) {
                var ret = [];
                for (var i = 0; i < len; i++) {
                    ret.push(arraySlice.call(value[i]));
                }
                return ret;
            } else {
                return arraySlice.call(value);
            }
        } else {
            return value;
        }
    }

    static rgba2String(rgba) {
        rgba[0] = Math.floor(rgba[0]);
        rgba[1] = Math.floor(rgba[1]);
        rgba[2] = Math.floor(rgba[2]);

        return 'rgba(' + rgba.join(',') + ')';
    }
}

export class Animator {
    constructor(target, loop, getter, setter) {
       
        this._tracks = {};

        this._target = target;

        /**
         * @member {boolean} Ekmap.LevelRenderer.Animation.Animator.prototype._loop
         * @description _loop。
         */
        this._loop = loop || false;

        /**
         * @member {function} Ekmap.LevelRenderer.Animation.Animator.prototype._getter
         * @description _getter。
         */
        this._getter = getter || _defaultGetter;

        /**
         * @member {function} Ekmap.LevelRenderer.Animation.Animator.prototype._setter
         * @description _setter。
         */
        this._setter = setter || _defaultSetter;

        /**
         * @member {number} Ekmap.LevelRenderer.Animation.Animator.prototype._clipCount
         * @description _clipCount。
         */
        this._clipCount = 0;

        /**
         * @member {number} Ekmap.LevelRenderer.Animation.Animator.prototype._delay
         * @description _delay。
         */
        this._delay = 0;

        /**
         * @member {Array} Ekmap.LevelRenderer.Animation.Animator.prototype._doneList
         * @description _doneList。
         */
        this._doneList = [];

        /**
         * @member {Array} Ekmap.LevelRenderer.Animation.Animator.prototype._onframeList
         * @description _onframeList。
         */
        this._onframeList = [];

        /**
         * @member {Array} Ekmap.LevelRenderer.Animation.Animator.prototype._clipList
         * @description _clipList。
         */
        this._clipList = [];
        this.CLASS_NAME = "Ekmap.LevelRenderer.Animation.Animator";
        //Function
        function _defaultGetter(target, key) {
            return target[key];
        }

        function _defaultSetter(target, key, value) {
            target[key] = value;
        }
    }


    when(time /* ms */ , props) {
        for (var propName in props) {
            if (!this._tracks[propName]) {
                this._tracks[propName] = [];
                // If time is 0
                //  Then props is given initialize value
                // Else
                //  Initialize value from current prop value
                if (time !== 0) {
                    this._tracks[propName].push({
                        time: 0,
                        value: Animation._cloneValue(
                            this._getter(this._target, propName)
                        )
                    });
                }
            }
            this._tracks[propName].push({
                time: parseInt(time, 10),
                value: props[propName]
            });
        }
        return this;
    }

    during(callback) {
        this._onframeList.push(callback);
        return this;
    }

    start(easing) {
        var self = this;
        var setter = this._setter;
        var getter = this._getter;
        var onFrameListLen = self._onframeList.length;
        var useSpline = easing === 'spline';

        var ondestroy = function() {
            self._clipCount--;
            if (self._clipCount === 0) {
                // Clear all tracks
                self._tracks = {};

                var len = self._doneList.length;
                for (var i = 0; i < len; i++) {
                    self._doneList[i].call(self);
                }
            }
        };

        var createTrackClip = function(keyframes, propName) {
            var trackLen = keyframes.length;
            if (!trackLen) {
                return;
            }
            // Guess data type
            var firstVal = keyframes[0].value;
            var isValueArray = Animation._isArrayLike(firstVal);
            var isValueColor = false;

            // For vertices morphing
            var arrDim = (
                    isValueArray &&
                    Animation._isArrayLike(firstVal[0])
                ) ?
                2 : 1;
            // Sort keyframe as ascending
            keyframes.sort(function(a, b) {
                return a.time - b.time;
            });
            var trackMaxTime = keyframes[trackLen - 1].time;
            // Percents of each keyframe
            var kfPercents = [];
            // Value of each keyframe
            var kfValues = [];
            for (let i = 0; i < trackLen; i++) {
                kfPercents.push(keyframes[i].time / trackMaxTime);
                // Assume value is a color when it is a string
                var value = keyframes[i].value;
                if (typeof(value) == 'string') {
                    value = SUtil.Util_color.toArray(value);
                    if (value.length === 0) { // Invalid color
                        value[0] = value[1] = value[2] = 0;
                        value[3] = 1;
                    }
                    isValueColor = true;
                }
                kfValues.push(value);
            }

            // Cache the key of last frame to speed up when
            // animation playback is sequency
            var cacheKey = 0;
            var cachePercent = 0;
            var start;
            var i;
            var w;
            var p0;
            var p1;
            var p2;
            var p3;


            if (isValueColor) {
                var rgba = [0, 0, 0, 0];
            }

            var onframe = function(target, percent) {
                // Find the range keyframes
                // kf1-----kf2---------current--------kf3
                // find kf2 and kf3 and do interpolation
                if (percent < cachePercent) {
                    // Start from next key
                    start = Math.min(cacheKey + 1, trackLen - 1);
                    for (i = start; i >= 0; i--) {
                        if (kfPercents[i] <= percent) {
                            break;
                        }
                    }
                    i = Math.min(i, trackLen - 2);
                } else {
                    for (i = cacheKey; i < trackLen; i++) {
                        if (kfPercents[i] > percent) {
                            break;
                        }
                    }
                    i = Math.min(i - 1, trackLen - 2);
                }
                cacheKey = i;
                cachePercent = percent;

                var range = (kfPercents[i + 1] - kfPercents[i]);
                if (range === 0) {
                    return;
                } else {
                    w = (percent - kfPercents[i]) / range;
                }
                if (useSpline) {
                    p1 = kfValues[i];
                    p0 = kfValues[i === 0 ? i : i - 1];
                    p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                    p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                    if (isValueArray) {
                        Animation._catmullRomInterpolateArray(
                            p0, p1, p2, p3, w, w * w, w * w * w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            // value = Ekmap.LevelRenderer.Animation._catmullRomInterpolateArray(
                            //     p0, p1, p2, p3, w, w * w, w * w * w,
                            //     rgba, 1
                            // );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._catmullRomInterpolate(
                                p0, p1, p2, p3, w, w * w, w * w * w
                            );
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                } else {
                    if (isValueArray) {
                        Animation._interpolateArray(
                            kfValues[i], kfValues[i + 1], w,
                            getter(target, propName),
                            arrDim
                        );
                    } else {
                        let value;
                        if (isValueColor) {
                            Animation._interpolateArray(
                                kfValues[i], kfValues[i + 1], w,
                                rgba, 1
                            );
                            value = Animation.rgba2String(rgba);
                        } else {
                            value = Animation._interpolateNumber(kfValues[i], kfValues[i + 1], w);
                        }
                        setter(
                            target,
                            propName,
                            value
                        );
                    }
                }

                for (i = 0; i < onFrameListLen; i++) {
                    self._onframeList[i](target, percent);
                }
            };

            var clip = new Clip({
                target: self._target,
                life: trackMaxTime,
                loop: self._loop,
                delay: self._delay,
                onframe: onframe,
                ondestroy: ondestroy
            });

            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
            self._clipList.push(clip);
            self._clipCount++;
            self.animation.add(clip);
        };

        for (var propName in this._tracks) {
            createTrackClip(this._tracks[propName], propName);
        }
        return this;
    }

    stop() {
        for (var i = 0; i < this._clipList.length; i++) {
            var clip = this._clipList[i];
            this.animation.remove(clip);
        }
        this._clipList = [];
    }

    delay(time) {
        this._delay = time;
        return this;
    }

    done(cb) {
        if (cb) {
            this._doneList.push(cb);
        }
        return this;
    }
}