import {
    Ekmap
} from '../../Ekmap';
import echarts from "echarts";
import {
    ChartViewModel
} from "./ChartViewModel";
import {
    MessageBox
} from "../messagebox/MessageBox";

export class ChartView {

    constructor(domID, options) {
        this.domID = domID;
        this.chartType = options.type || "bar";
        options.datasets.type = options.datasets.type || 'iServer';
        options.datasets.withCredentials = options.datasets.withCredentials || false;
        this.viewModel = new ChartViewModel(options);
        this._fillDataToView();
    }

    onAdd(addChart) {
        this.addChart = addChart;
    }

    _fillDataToView() {
        let messageboxs = new MessageBox();
        this.viewModel.getDatasetInfo(this._createChart.bind(this));
        this.viewModel.events.on({
            "getdatafailed": (error) => {
                messageboxs.showView(error.message);
            }
        });
    }

    getStyle() {
        return this.viewModel.getStyle()
    }

    getFeatures() {
        return this.viewModel.getFeatures();
    }

    setStyle(style) {
        let newOptions = this.viewModel.setStyle(style);
        this._updateChart(newOptions);
    }

    changeType(type) {
        if (this.chartType !== type) {
            this.chartType = type;
            let newOptions = this.viewModel.changeType(type);
            this._updateChart(newOptions);
        }
    }

    updateData(datasets, chartOption) {
        let me = this;
        this.viewModel.updateData(datasets, chartOption, function(options) {
            me._updateChart(options);
            if (me.addChart) {
                me.addChart();
            }
        });
    }

    _createChart(data) {
        this.echart = echarts.init(
            document.getElementById(this.domID),
            null, {
                renderer: "canvas"
            }
        )
        let options = this.viewModel._createChartOptions(data);
        this.echart.setOption(options);
        if (this.addChart) {
            this.addChart();
        }
    }

    _updateChart(options) {
        if (this.echart) {
            this.echart.clear();
            this.echart.setOption(options);
        }
    }
}

Ekmap.Components.Chart = ChartView;