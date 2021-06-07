import { Ekmap } from '../../Ekmap';
import { ChartModel } from "./ChartModel";
import { Events } from '../../commontypes/Events';

export class ChartViewModel {

    constructor(options) {
        this.datasets = options.datasets;
        this.xField = [];
        this.yField = [];
        this.grid = {
            top: "50px",
            bottom: "50px",
            left: "50px",
            right: "60px"
        };
        this.chartType = options.type || "bar";
        this._initXYField(options.chartOptions);
        this.EVENT_TYPES = ["getdatafailed"];
        this.events = new Events(this, null, this.EVENT_TYPES);
    }

    _initXYField(chartOptions) {
        let me = this;
        if (chartOptions && chartOptions.length > 0) {
            chartOptions.forEach(function(option) {

                if (option.xAxis) {
                    me.xField.push({
                        field: option.xAxis.field,
                        name: option.xAxis.name
                    });
                }
                if (option.yAxis) {
                    me.yField.push({
                        field: option.yAxis.field,
                        name: option.yAxis.name
                    });
                }
            });
        }
    }

    getDatasetInfo(success) {
        this.createChart = success;
        if (this.datasets && this._checkUrl(this.datasets.url)) {
            this.chartModel = new ChartModel(this.datasets);
            if (this.datasets.type === 'iServer') {
                this.chartModel.getDatasetInfo(this._getDatasetInfoSuccess.bind(this));
            } else if (this.datasets.type === 'iPortal') {
                this.chartModel.getDataInfoByIptl(this._getDataInfoSuccess.bind(this));
            }

            this.chartModel.events.on({
                "getdatafailed": (error) => {
                    this.events.triggerEvent("getdatafailed", error)
                }
            });
        }
    }

    _getDatasetInfoSuccess(results) {
        let datasetUrl = this.datasets.url;
        let restIndex = datasetUrl.indexOf("rest");
        if (restIndex > 0) {
            let index = datasetUrl.indexOf("/", restIndex + 5);
            let type = datasetUrl.substring(restIndex + 5, index);
            let dataUrl = datasetUrl.substring(0, restIndex + 4) + "/data";

            if (type === "maps") {
                let mapIndex = datasetUrl.indexOf("/", index + 1);
                let mapName = datasetUrl.substring(index + 1, mapIndex);
                dataUrl = datasetUrl.substring(0, restIndex + 4) + "/maps/" + mapName;
                results.result.dataUrl = dataUrl;
                this._getLayerFeatures(results);
            } else if (type === "data") {
                results.result.dataUrl = dataUrl;
                this._getDataFeatures(results);
            }
        }
    }

    _getDataInfoSuccess(results, type) {
        let me = this;
        if (type === 'RESTMAP') {
            me._getChartDatasFromLayer(results);
        } else {
            me._getChartDatas(results);
        }
    }

    _getDataFeatures(results) {
        this.chartModel.getDataFeatures(results, this._getChartDatas.bind(this));
    }

    _getLayerFeatures(results) {
        this.chartModel.getLayerFeatures(results, this._getChartDatasFromLayer.bind(this));
    }

    _getChartDatas(results) {
        if (results) {
            this.features = results.result.features;
            let features = this.features.features;
            let data = {};
            if (features.length) {
                let feature = features[0];
                let attrFields = [],
                    itemTypes = [];
                for (let attr in feature.properties) {
                    attrFields.push(attr);
                    itemTypes.push(this._getDataType(feature.properties[attr]));
                }
                data = {
                    features,
                    fieldCaptions: attrFields,
                    fieldTypes: itemTypes,
                    fieldValues: []
                }
                for (let m in itemTypes) {
                    let fieldValue = [];

                    for (let j in features) {
                        let feature = features[j];
                        let caption = data.fieldCaptions[m];
                        let value = feature.properties[caption];
                        fieldValue.push(value);
                    }
                    data.fieldValues.push(fieldValue);
                }
                this.createChart(data);
            }
        }
    }

    _getChartDatasFromLayer(results) {
        if (results.result.recordsets) {
            let recordsets = results.result.recordsets[0];
            let features = recordsets.features.features;
            this.features = recordsets.features;
            let data = {};
            if (features.length) {
                data = {
                    features: recordsets.features,
                    fieldCaptions: recordsets.fieldCaptions,
                    fieldTypes: recordsets.fieldTypes,
                    fieldValues: []
                }
                for (let m in data.fieldCaptions) {
                    let fieldValue = [];

                    for (let j in features) {
                        let feature = features[j];
                        let caption = data.fieldCaptions[m];
                        let value = feature.properties[caption];
                        fieldValue.push(value);
                    }
                    data.fieldValues.push(fieldValue);
                }
                this.createChart(data);
            }
        }
    }

    _createChartOptions(data) {
        this.calculatedData = this._createChartDatas(data);
        return this.updateChartOptions(this.chartType);
    }

    changeType(type) {
        if (type !== this.chartType) {
            this.chartType = type;
            return this.updateChartOptions(this.chartType);
        }
    }

    updateData(datasets, chartOption, success) {
        this.updateChart = success;
        this.xField = [];
        this.yField = [];
        this._initXYField(chartOption);
        datasets.type = datasets.type || 'iServer';
        datasets.withCredentials = datasets.withCredentials || false;
        this.datasets = datasets;
        this.getDatasetInfo(this._updateDataSuccess.bind(this));
    }

    _updateDataSuccess(data) {
        let options = this._createChartOptions(data);
        this.updateChart(options);
    }

    updateChartOptions(type, style) {
        if (this.calculatedData) {
            let grid = this.grid;
            let series = this._createChartSeries(this.calculatedData, type);
            let datas = [];
            for (let i in this.calculatedData.XData) {
                datas.push({
                    value: this.calculatedData.XData[i].fieldsData
                });
            }
            let xAxis = {
                type: "category",
                name: this.xField[0].name || "X",
                data: datas,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
            let yAxis = {
                type: "value",
                name: this.yFieldName || "Y",
                data: {},
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            }
            let tooltip = {
                formatter: '{b0}: {c0}'
            };
            let backgroundColor = '#404a59';
            if (style) {
                if (style.grid) {
                    grid = style.grid;
                }
                if (style.tooltip) {
                    tooltip = style.tooltip;
                }
                if (style.backgroundColor) {
                    backgroundColor = style.backgroundColor;
                }
            }
            return {
                backgroundColor: backgroundColor,
                grid: grid,
                series: series,
                xAxis: xAxis,
                yAxis: yAxis,
                tooltip: tooltip
            }
        }
    }

    _createChartDatas(data) {
        let fieldIndex = 0,
            yfieldIndexs = [];
        let fieldCaptions = data.fieldCaptions;
        let me = this;
        //X
        fieldCaptions.forEach(function(field, index) {
            if (me.xField[0] && field === me.xField[0].field) {
                fieldIndex = index;
            }
        });
        //Y
        this.yFieldName = "";
        this.yField.forEach(function(value, index) {
            if (index !== 0) {
                me.yFieldName = me.yFieldName + ",";
            }
            me.yFieldName = me.yFieldName + value.name;
            fieldCaptions.forEach(function(field, index) {
                if (field === value.field) {
                    yfieldIndexs.push(index);
                }
            });
        })
        let datas = this._getAttrData(data, fieldIndex);
        let yDatas = [];
        if (yfieldIndexs.length > 0) {
            yfieldIndexs.forEach(function(yfieldIndex) {
                let yData = [];
                for (let i in data.fieldValues[yfieldIndex]) {
                    yData.push({
                        value: data.fieldValues[yfieldIndex][i]
                    });
                }
                yDatas.push(yData);
            });
        } else {
            let YData = [],
                XData = [],
                len = datas.length;
            for (let i = 0; i < len; i++) {
                let isSame = false;
                for (let j = 0, leng = XData.length; j < leng; j++) {
                    if (datas[i].fieldsData === XData[j].fieldsData) {
                        YData[j].value++;
                        XData[j].recordIndexs.push(i);
                        isSame = true;
                        break;
                    }
                }
                if (!isSame) {
                    if (datas[i].fieldsData) {
                        XData.push({ fieldsData: datas[i].fieldsData, recordIndexs: [i] });
                        YData.push({ value: 1 });
                    }
                }
            }
            datas = XData;
            yDatas = [YData];
        }
        return {
            XData: datas,
            YData: yDatas
        }
    }

    _getAttrData(datacontent, index) {
        if (index === 0) {
            this.xField = [{
                field: datacontent.fieldCaptions[index],
                name: datacontent.fieldCaptions[index]
            }];
        }
        let fieldsDatas = [];
        for (let i = 0, len = datacontent.fieldValues[index].length; i < len; i++) {
            let value = datacontent.fieldValues[index][i];
            fieldsDatas.push({
                recordIndexs: i,
                fieldsData: value
            });
        }
        return fieldsDatas;
    }

    _createChartSeries(calculatedData, chartType) {
        let series = [];
        let yDatas = calculatedData.YData;
        yDatas.forEach(function(yData) {
            let value = 0;
            let serieData = [];
            for (let data of yData) {
                value = data.value;
                serieData.push({
                    value: value
                });
            }
            let serie = {
                type: chartType,
                data: serieData,
                name: "y"
            };

            series.push(serie);
        });
        return series;
    }

    _isDate(data) {
        let reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
        return reg.test(data);
    }

    _isNumber(data) {
        let mdata = Number(data);
        if (mdata === 0) {
            return true;
        }
        return !isNaN(mdata);
    }

    _getDataType(data) {
        if (data !== null && data !== undefined && data !== '') {
            if (this._isDate(data)) {
                return "DATE";
            }
            if (this._isNumber(data)) {
                return "NUMBER";
            }
        }
        return "STRING";
    }

    _checkUrl(url) {
        let match;
        if (url === '' || !this._isMatchUrl(url)) {
            match = false;
        } else if (/^http[s]?:\/\/localhost/.test(url) || /^http[s]?:\/\/127.0.0.1/.test(url)) {
            match = false;
        } else {
            match = true;
        }
        return match;
    }

    _isMatchUrl(str) {
        var reg = new RegExp('(https?|http|file|ftp)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
        return reg.test(str);
    }

    getStyle() {
        let style = {
            grid: this.grid,
            tooltip: this.tooltip,
            backgroundColor: this.backgroundColor
        }
        return style;
    }

    getFeatures() {
        return this.features;
    }

    setStyle(style) {
        return this.updateChartOptions(this.chartType, style);
    }
}
Ekmap.Components.ChartViewModel = ChartViewModel;