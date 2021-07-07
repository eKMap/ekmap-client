import { Ekmap } from '../../Ekmap';
import { Util as CommonUtil } from '../../commontypes/Util';
import { Eventful } from './Eventful';
import { Transformable } from './Transformable';

export class Group extends Ekmap.mixin(Eventful, Transformable) {

   /**
     * @function Ekmap.LevelRenderer.Group.prototype.constructor
     * @description Constructor.
     * @param {Array} options-Group configuration (options) items, which can be Group's own attributes or custom attributes.
     */
    constructor(options) {
        super(options)
        options = options || {};
        /**
         * @member {string} Ekmap.LevelRenderer.Group.prototype.id
         * @description Group unique identifier.
         */
        this.id = null;

        /**
         * @readonly
         * @member {string} [Ekmap.LevelRenderer.Group.prototype.type='group']
         * @description type.
         */
        this.type ='group';

        //http://www.w3.org/TR/2dcontext/#clipping-region
        /**
         * @member {string} Ekmap.LevelRenderer.Group.prototype.clipShape
         * @description The shape used for clipping. All the graphics in the Group will be clipped by this shape when drawing, and the shape will inherit the transformation of the Group.
         */
        this.clipShape = null;

        /**
         * @member {Array} Ekmap.LevelRenderer.Group.prototype._children
         * @description _children.
         */
        this._children = [];

        /**
         * @member {Array} Ekmap.LevelRenderer.Group.prototype._storage
         * @description _storage.
         */
        this._storage = null;

        /**
         * @member {boolean} [Ekmap.LevelRenderer.Group.prototype.__dirty=true]
         * @description __dirty.
         */
        this.__dirty = true;

        /**
         * @member {boolean} [Ekmap.LevelRenderer.Group.prototype.ignore=false]
         * @description Whether to ignore the Group and all its child nodes.
         */
        this.ignore = false;
        CommonUtil.extend(this, options);
        this.id = this.id || CommonUtil.createUniqueID("smShapeGroup_");
        this.CLASS_NAME = "Ekmap.LevelRenderer.Group";
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.destroy
     * @description destroys the object and releases resources. All properties will be set to null after calling this function.
     */
    destroy() {
        this.id = null;
        this.type = null;
        this.clipShape = null;
        this._children = null;
        this._storage = null;
        this.__dirty = null;
        this.ignore = null;

        super.destroy();
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.children
     * @description copies and returns a new array containing all the child nodes.
     * @returns {Array.<Ekmap.LevelRenderer.Shape>} graphics array.
     */
    children() {
        return this._children.slice();
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.childAt
     * @description Get the child node of the specified index
     * @param {number} idx-node index.
     * @returns {Ekmap.LevelRenderer.Shape} graphics.
     */
    childAt(idx) {
        return this._children[idx];
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.addChild
     * @description Add child nodes, which can be Shape or Group.
     * @param {(Ekmap.LevelRenderer.Shape|Ekmap.LevelRenderer.Group)} child-node graph.
     */
    // TODO Type Check
    addChild(child) {
        if (child == this) {
            return;
        }

        if (child.parent == this) {
            return;
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        this._children.push(child);
        child.parent = this;

        if (this._storage && this._storage !== child._storage) {

            this._storage.addToMap(child);

            if (child instanceof Group) {
                child.addChildrenToStorage(this._storage);
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.removeChild
     * @description Remove child nodes.
     * @param {Ekmap.LevelRenderer.Shape} child-the child node shape that needs to be removed.
     */
    removeChild(child) {
        var idx = CommonUtil.indexOf(this._children, child);

        this._children.splice(idx, 1);
        child.parent = null;

        if (this._storage) {

            this._storage.delFromMap(child.id);

            if (child instanceof Group) {
                child.delChildrenFromStorage(this._storage);
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.eachChild
     * @description Traverse all child nodes.
     * @param {function} cb-callback function.
     * @param {Object} context-context.
     */
    eachChild(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i <this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }
        }
    }


    /**
     * @function Ekmap.LevelRenderer.Group.prototype.traverse
     * @description Depth-first traversal of all descendant nodes.
     * @param {function} cb-callback function.
     * @param {Object} context-context.
     */
    traverse(cb, context) {
        var haveContext = !!context;
        for (var i = 0; i <this._children.length; i++) {
            var child = this._children[i];
            if (haveContext) {
                cb.call(context, child);
            } else {
                cb(child);
            }

            if (child.type ==='group') {
                child.traverse(cb, context);
            }}
        }
    
    
        /**
         * @function Ekmap.LevelRenderer.Group.prototype.addChildrenToStorage
         * @description Add the sprite to the warehouse.
         * @param {Ekmap.LevelRenderer.Storage} storage-graphics warehouse.
         */
        addChildrenToStorage(storage) {
            for (var i = 0; i <this._children.length; i++) {
                var child = this._children[i];
                storage.addToMap(child);
                if (child.type ==='group') {
                    child.addChildrenToStorage(storage);
                }
            }
        }
    
    
        /**
         * @function Ekmap.LevelRenderer.Group.prototype.delChildrenFromStorage
         * @description Delete the sub-graphics from the warehouse.
         * @param {Ekmap.LevelRenderer.Storage} storage-graphics warehouse.
         */
        delChildrenFromStorage(storage) {
            for (var i = 0; i <this._children.length; i++) {
                var child = this._children[i];
                storage.delFromMap(child.id);
                if (child.type ==='group') {
                    child.delChildrenFromStorage(storage);
                }
            }
        }
    
    
        /**
         * @function Ekmap.LevelRenderer.Group.prototype.modSelf
         * @description Whether to modify.
         */
        modSelf() {
            this.__dirty = true;
        }
}