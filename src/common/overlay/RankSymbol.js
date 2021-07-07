import { Ekmap } from '../Ekmap';
import { Graph } from './Graph';

export class RankSymbol extends Graph {

    constructor(data, layer, fields, setting, lonlat, options) {
        super(data, layer, fields, setting, lonlat, options);
       
        this.setting = null;
        if (setting && setting.codomain) {
            this.setting = setting;
            this.DVBCodomain = this.setting.codomain;
        }
        this.CLASS_NAME = "Ekmap.Feature.Theme.RankSymbol";
    }

    destroy() {
        this.setting = null;
        super.destroy();
    }

    initBaseParameter() {
        var isSuccess = true;

        if (!this.setting) {
            return false;
        }
        var sets = this.setting;

        if (sets.XOffset) {
            this.XOffset = sets.XOffset;
        }
        if (sets.YOffset) {
            this.YOffset = sets.YOffset;
        }
        this.XOffset = sets.XOffset ? sets.XOffset : 0;
        this.YOffset = sets.YOffset ? sets.YOffset : 0;

        this.origonPoint = [];
        this.chartBox = [];
        this.dataViewBox = [];

        this.DVBParameter = sets.dataViewBoxParameter ? sets.dataViewBoxParameter : [0, 0, 0, 0];

        this.DVBOrigonPoint = [];
        this.DVBCenterPoint = [];
        this.origonPointOffset = [];

        this.resetLocation();

        var w = this.width;
        var h = this.height;
        var loc = this.location;

        this.origonPoint = [loc[0] - w / 2, loc[1] - h / 2];
        var op = this.origonPoint;

        this.chartBox = [op[0], op[1] + h, op[0] + w, op[1]];
        var cb = this.chartBox;
        var dbbP = this.DVBParameter;
        this.dataViewBox = [cb[0] + dbbP[0], cb[1] - dbbP[1], cb[2] - dbbP[2], cb[3] + dbbP[3]];
        var dvb = this.dataViewBox;
        if (dvb[0] >= dvb[2] || dvb[1] <= dvb[3]) {
            return false;
        }

        this.DVBOrigonPoint = [dvb[0], dvb[3]];
        this.DVBWidth = Math.abs(dvb[2] - dvb[0]);
        this.DVBHeight = Math.abs(dvb[1] - dvb[3]);
        this.DVBCenterPoint = [this.DVBOrigonPoint[0] + this.DVBWidth / 2, this.DVBOrigonPoint[1] + this.DVBHeight / 2];

        this.origonPointOffset = [this.DVBOrigonPoint[0] - op[0], this.DVBOrigonPoint[1] - op[1]];

        return isSuccess;
    }
}

Ekmap.Feature.Theme.RankSymbol = RankSymbol;