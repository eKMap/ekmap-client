import { Ekmap } from "../../Ekmap";
import { GetFeaturesBySQLParameters } from "../../eKServer/GetFeaturesBySQLParameters";
import { FilterParameter } from "../../eKServer/FilterParameter";
import { GetFeaturesBySQLService } from "../../eKServer/GetFeaturesBySQLService";
import { QueryBySQLParameters } from "../../eKServer/QueryBySQLParameters";
import { QueryBySQLService } from "../../eKServer/QueryBySQLService";
import { DataFormat, QueryOption } from "../../REST";
import { Events } from "../../commontypes/Events";

export class ChartModel {

    constructor(datasets) {
        this.datasets = datasets;
        this.EVENT_TYPES = ["getdatafailed"];
        this.events = new Events(this, null, this.EVENT_TYPES);
    }

    getDataFeatures(results, success) {
        let datasetsInfo = results.result;
        let getFeatureParam, getFeatureBySQLParams, getFeatureBySQLService;
        let params = {
            name: datasetsInfo.datasetName + "@" + datasetsInfo.dataSourceName
        }
        Object.assign(params, this.datasets.queryInfo);
        getFeatureParam = new Ekmap.FilterParameter(params);
        getFeatureBySQLParams = new Ekmap.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: [datasetsInfo.dataSourceName + ":" + datasetsInfo.datasetName],
            fromIndex: 0,
            toIndex: 100000
        });
        getFeatureBySQLService = new Ekmap.GetFeaturesBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function() {}
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    getLayerFeatures(results, success) {
        let datasetsInfo = results.result;
        let queryParam, queryBySQLParams, queryBySQLService;
        let params = {
            name: datasetsInfo.mapName
        };
        Object.assign(params, this.datasets.queryInfo);
        queryParam = new Ekmap.FilterParameter(params);
        queryBySQLParams = new Ekmap.QueryBySQLParameters({
            queryParams: [queryParam],
            expectCount: 100000
        });
        queryBySQLService = new Ekmap.QueryBySQLService(datasetsInfo.dataUrl, {
            eventListeners: {
                "processCompleted": success,
                "processFailed": function() {}
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    }

    getDatafromRestData(url, dataSource, success) {
        let me = this;
        this.datasets.queryInfo.attributeFilter = this.datasets.queryInfo.attributeFilter || 'SmID>0';
        this._getFeatureBySQL(url, dataSource, this.datasets.queryInfo, (results) => {
            success(results, 'RESTDATA');
        }, (error) => {
            console.log(error);
            me._fireFailedEvent(error);
        });
    }

    getDatafromRestMap(dataSource, path, success) {
        let me = this;
        this.datasets.queryInfo.attributeFilter = this.datasets.queryInfo.attributeFilter || 'smid=1';
        this._queryFeatureBySQL(path, dataSource, this.datasets.queryInfo, null, null, (results) => {
            // let features = result.result.recordsets[0].features;
            success(results, 'RESTMAP');
        }, (error) => {
            console.log(error);
            me._fireFailedEvent(error);
        })
    }

    _getFeatureBySQL(url, datasetNames, queryInfo, processCompleted, processFaild) {
        let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        let params = {
            name: datasetNames.join().replace(":", "@")
        }
        Object.assign(params, queryInfo);
        getFeatureParam = new FilterParameter(params);
        getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: datasetNames,
            fromIndex: 0,
            toIndex: 100000,
            returnContent: true
        });
        let options = {
            eventListeners: {
                processCompleted: getFeaturesEventArgs => {
                    processCompleted && processCompleted(getFeaturesEventArgs);
                },
                processFailed: e => {
                    processFaild && processFaild(e);
                }
            }
        };
        getFeatureBySQLService = new GetFeaturesBySQLService(url, options);
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    _queryFeatureBySQL(url, layerName, queryInfo, fields, epsgCode, processCompleted, processFaild, startRecord, recordLength, onlyAttribute) {
        var queryParam, queryBySQLParams;
        var filterParams = {
            name: layerName
        }
        Object.assign(filterParams, queryInfo);
        queryParam = new FilterParameter(filterParams);
        if (fields) {
            queryParam.fields = fields;
        }
        var params = {
            queryParams: [queryParam]
        };
        if (onlyAttribute) {
            params.queryOption = QueryOption.ATTRIBUTE;
        }
        startRecord && (params.startRecord = startRecord);
        recordLength && (params.expectCount = recordLength);
        if (epsgCode) {
            params.prjCoordSys = {
                epsgCode: epsgCode
            }
        }
        queryBySQLParams = new QueryBySQLParameters(params);
        this._queryBySQL(url, queryBySQLParams, data => {
            data.type === 'processCompleted' ? processCompleted(data) : processFaild(data)
        });
    }

    _queryBySQL(url, params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryBySQLService.processAsync(params);
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    _formatGeoJSON(data) {
        let features = data.features;
        features.forEach((row, index) => {
            row.properties['index'] = index;
        })
        return features;
    }

    

    _fireFailedEvent(error) {
        let errorData = error ? {
            error,
            message: 'Lấy dữ liệu xảy ra lỗi !'
        } : {
            message: 'Lấy dữ liệu xảy ra lỗi !'
        };

        this.events.triggerEvent("getdatafailed", errorData);
    }
}