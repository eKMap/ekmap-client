import { Util } from './Util';
import { Group } from './Group';

export class Storage {
    constructor() {
        this._elements = {};

        this._hoverElements = [];

        this._roots = [];

        this._shapeList = [];

        this._shapeListOffset = 0;

        this.CLASS_NAME = "Ekmap.LevelRenderer.Storage";
    }

    /**
     * @function Ekmap.LevelRenderer.Storage.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.dispose();
        this._shapeList = null;
        this._shapeListOffset = null;
    }

    iterShape(fun, option) {
        if (!option) {
            var defaultIterateOption = {
                hover: false,
                normal: 'down',
                update: false
            };
            option = defaultIterateOption;
        }

        if (option.hover) {
            for (var i = 0, l = this._hoverElements.length; i < l; i++) {
                var el = this._hoverElements[i];
                el.updateTransform();
                if (fun(el)) {
                    return this;
                }
            }
        }

        if (option.update) {
            this.updateShapeList();
        }

        switch (option.normal) {
            case 'down':
                {
                    let l = this._shapeList.length;
                    while (l--) {
                        if (fun(this._shapeList[l])) {
                            return this;
                        }
                    }
                    break;
                }
                // case 'up':
            default:
                {
                    for (let i = 0, l = this._shapeList.length; i < l; i++) {
                        if (fun(this._shapeList[i])) {
                            return this;
                        }
                    }
                    break;
                }
        }

        return this;
    }

    getHoverShapes(update) {
        // hoverConnect
        var hoverElements = [],
            len = this._hoverElements.length;
        for (let i = 0; i < len; i++) {
            hoverElements.push(this._hoverElements[i]);
            var target = this._hoverElements[i].hoverConnect;
            if (target) {
                var shape;
                target = target instanceof Array ? target : [target];
                for (var j = 0, k = target.length; j < k; j++) {
                    shape = target[j].id ? target[j] : this.get(target[j]);
                    if (shape) {
                        hoverElements.push(shape);
                    }
                }
            }
        }
        hoverElements.sort(Storage.shapeCompareFunc);
        if (update) {
            for (let i = 0, l = hoverElements.length; i < l; i++) {
                hoverElements[i].updateTransform();
            }
        }
        return hoverElements;
    }

    getShapeList(update) {
        if (update) {
            this.updateShapeList();
        }
        return this._shapeList;
    }

    updateShapeList() {
        this._shapeListOffset = 0;
        var rootsLen = this._roots.length;
        for (let i = 0; i < rootsLen; i++) {
            let root = this._roots[i];
            this._updateAndAddShape(root);
        }
        this._shapeList.length = this._shapeListOffset;

        var shapeListLen = this._shapeList.length;
        for (let i = 0; i < shapeListLen; i++) {
            this._shapeList[i].__renderidx = i;
        }

        this._shapeList.sort(Storage.shapeCompareFunc);
    }

    _updateAndAddShape(el, clipShapes) {
        if (el.ignore) {
            return;
        }

        el.updateTransform();

        if (el.type == 'group') {

            if (el.clipShape) {
                el.clipShape.parent = el;
                el.clipShape.updateTransform();

                if (clipShapes) {
                    clipShapes = clipShapes.slice();
                    clipShapes.push(el.clipShape);
                } else {
                    clipShapes = [el.clipShape];
                }
            }

            for (var i = 0; i < el._children.length; i++) {
                var child = el._children[i];

                // Force to mark as dirty if group is dirty
                child.__dirty = el.__dirty || child.__dirty;

                this._updateAndAddShape(child, clipShapes);
            }

            // Mark group clean here
            el.__dirty = false;

        } else {
            el.__clipShapes = clipShapes;

            this._shapeList[this._shapeListOffset++] = el;
        }
    }

    mod(elId, params) {
        var el = this._elements[elId];
        if (el) {

            el.modSelf();

            if (params) {
                if (params.parent || params._storage || params.__startClip) {
                    var target = {};
                    for (var name in params) {
                        if (
                            name == 'parent' ||
                            name == '_storage' ||
                            name == '__startClip'
                        ) {
                            continue;
                        }
                        if (params.hasOwnProperty(name)) {
                            target[name] = params[name];
                        }
                    }
                    new Util().merge(el, target, true);
                } else {
                    new Util().merge(el, params, true);
                }
            }
        }

        return this;
    }

    drift(shapeId, dx, dy) {
        var shape = this._elements[shapeId];
        if (shape) {
            shape.needTransform = true;
            if (shape.draggable === 'horizontal') {
                dy = 0;
            } else if (shape.draggable === 'vertical') {
                dx = 0;
            }
            if (!shape.ondrift 
                ||
                (shape.ondrift && !shape.ondrift(dx, dy))
            ) {
                shape.drift(dx, dy);
            }
        }

        return this;
    }

    addHover(shape) {
        shape.updateNeedTransform();
        this._hoverElements.push(shape);
        return this;
    }

    delHover() {
        this._hoverElements = [];
        return this;
    }

    hasHoverShape() {
        return this._hoverElements.length > 0;
    }

    addRoot(el) {
        if (el instanceof Group) {
            el.addChildrenToStorage(this);
        }

        this.addToMap(el);
        this._roots.push(el);
    }

    delRoot(elId) {
        if (typeof(elId) == 'undefined') {
            for (var i = 0; i < this._roots.length; i++) {
                var root = this._roots[i];

                if (root instanceof Group) {
                    root.delChildrenFromStorage(this);
                }
            }

            this._elements = {};
            this._hoverElements = [];
            this._roots = [];

            return;
        }

        if (elId instanceof Array) {
            var elIdLen = elId.length;
            for (let i = 0; i < elIdLen; i++) {
                this.delRoot(elId[i]);
            }
            return;
        }

        var el;
        if (typeof(elId) == 'string') {
            el = this._elements[elId];
        } else {
            el = elId;
        }

        var idx = new Util().indexOf(this._roots, el);
        if (idx >= 0) {
            this.delFromMap(el.id);
            this._roots.splice(idx, 1);
            if (el instanceof Group) {
                el.delChildrenFromStorage(this);
            }
        }
    }

    addToMap(el) {
        if (el instanceof Group) {
            el._storage = this;
        }
        el.modSelf();

        this._elements[el.id] = el;

        return this;
    }

    get(elId) {
        return this._elements[elId];
    }

    delFromMap(elId) {
        var el = this._elements[elId];
        if (el) {
            delete this._elements[elId];

            if (el instanceof Group) {
                el._storage = null;
            }
        }

        return this;
    }

    dispose() {
        this._elements = null;
        // this._renderList = null;
        this._roots = null;
        this._hoverElements = null;
    }

    static shapeCompareFunc(a, b) {
        if (a.zlevel == b.zlevel) {
            if (a.z == b.z) {
                return a.__renderidx - b.__renderidx;
            }
            return a.z - b.z;
        }
        return a.zlevel - b.zlevel;
    }

}