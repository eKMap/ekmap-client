import { Ekmap } from "../../Ekmap";
import { Util } from '../../commontypes/Util';
import { Render } from './Render';

export class LevelRenderer {

    constructor() {

        LevelRenderer._instances = {};

        LevelRenderer.Tool = {};

        this.version = '2.0.4';

        this.CLASS_NAME = "Ekmap.LevelRenderer";

    }

    destroy() {
        this.dispose();
        this.version = null;
    }

    init(dom) {
        var zr = new Render(Util.createUniqueID("LRenderer_"), dom);
        LevelRenderer._instances[zr.id] = zr;
        return zr;
    }

    dispose(zr) {
        if (zr) {
            zr.dispose();
            this.delInstance(zr.id);
        } else {
            for (var key in LevelRenderer._instances) {
                LevelRenderer._instances[key].dispose();
            }
            LevelRenderer._instances = {};
        }

        return this;
    }

    getInstance(id) {
        return LevelRenderer._instances[id];
    }

    delInstance(id) {
        delete LevelRenderer._instances[id];
        return this;
    }

}

Ekmap.LevelRenderer = LevelRenderer;