import { Config } from './Config';

export class Log {

    constructor() {

        this.CLASS_NAME = "Ekmap.LevelRenderer.Tool.Log";
        return function() {
            if (Config.debugMode === 0) {
                return;
            } else if (Config.debugMode == 1) {
                for (let k in arguments) {
                    throw new Error(arguments[k]);
                }
            } else if (Config.debugMode > 1) {
                for (let k in arguments) {
                    console.log(arguments[k]);
                }
            }
        };
    }

    destory() {
        return true;
    }
}