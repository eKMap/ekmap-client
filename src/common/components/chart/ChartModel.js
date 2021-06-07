import { Ekmap } from "../../Ekmap";
import { FetchRequest } from "../../util/FetchRequest";
import { GetFeaturesBySQLParameters } from "../../iServer/GetFeaturesBySQLParameters";
import { FilterParameter } from "../../iServer/FilterParameter";
import { GetFeaturesBySQLService } from "../../iServer/GetFeaturesBySQLService";
import { QueryBySQLParameters } from "../../iServer/QueryBySQLParameters";
import { QueryBySQLService } from "../../iServer/QueryBySQLService";
import { DataFormat, QueryOption } from "../../REST";
import { Lang } from "../../lang/Lang";
import { FileReaderUtil } from "../util/FileReaderUtil";
import { Events } from "../../commontypes/Events";

export class ChartModel {

    constructor(datasets) {
        this.datasets = datasets;
        this.EVENT_TYPES = ["getdatafailed"];
        this.events = new Events(this, null, this.EVENT_TYPES);
    }

    getDatasetInfo(success) {
        let datasetUrl = this.datasets.url;
        let me = this;
        FetchRequest.get(datasetUrl).then(function(response) {
            return response.json();
        }).then(function(results) {
            if (results.datasetInfo) {
                let datasetInfo = results.datasetInfo;
                me.datasetsInfo = {
                    dataSourceName: datasetInfo.dataSourceName,
                    datasetName: datasetInfo.name,
                    mapName: results.name
                };
                success({
                    result: me.datasetsInfo
                });
            }
        }).catch(function(error) {
            console.log(error);
            me._fireFailedEvent(error);
        });
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

    getDataInfoByIptl(success) {
        this.getServiceInfo(this.datasets.url, success);
    }

    getServiceInfo(url, success) {
        let me = this;
        FetchRequest.get(url, null, {
            withCredentials: this.datasets.withCredentials
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.succeed === false) {
                me._fireFailedEvent(data);
                return;
            }
            if (data.dataItemServices && data.dataItemServices.length > 0) {
                let dataItemServices = data.dataItemServices,
                    resultData;

                dataItemServices.forEach(item => {
                    if (item.serviceType === 'RESTDATA' && item.serviceStatus === 'PUBLISHED') {
                        resultData = item;
                    } else if (item.serviceType === 'RESTMAP' && item.serviceStatus === 'PUBLISHED') {
                        resultData = item;
                    } else {
                        me.getDatafromContent(url, success);
                        return;
                    }
                })
                resultData && me.getDatafromRest(resultData.serviceType, resultData.address, success)
            } else {
                me.getDatafromContent(url, success);
                return;
            }
        }).catch(error => {
            console.log(error);
            me._fireFailedEvent(error);
        })
    }

    getDatafromContent(url, success) {
        let results = {
                result: {}
            },
            me = this;
        url += '/content.json?pageSize=9999999&currentPage=1',
            FetchRequest.get(url, null, {
                withCredentials: this.datasets.withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                if (data.succeed === false) {
                    me._fireFailedEvent(data);
                    return;
                }
                if (data.type) {
                    if (data.type === "JSON" || data.type === "GEOJSON") {
                        data.content = JSON.parse(data.content.trim());
                        if (!(data.content.features)) {
                            console.log(Lang.i18n('msg_jsonResolveFiled'));
                            return;
                        }
                        let features = this._formatGeoJSON(data.content);
                        results.result.features = {
                            type: data.content.type,
                            features
                        };

                    } else if (data.type === 'EXCEL' || data.type === 'CSV') {
                        let features = this._excelData2Feature(data.content);
                        results.result.features = {
                            type: 'FeatureCollection',
                            features
                        };
                    }
                    success(results, 'content');
                }
            }, this).catch(error => {
                console.log(error);
                me._fireFailedEvent(error);
            });
    }

    getDatafromRest(serviceType, address, success) {
        let me = this,
            withCredentials = this.datasets.withCredentials;
        if (serviceType === 'RESTDATA') {
            let url = `${address}/data/datasources`,
                sourceName, datasetName;
            FetchRequest.get(url, null, {
                withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                sourceName = data.datasourceNames[0];
                url = `${address}/data/datasources/${sourceName}/datasets`;
                FetchRequest.get(url, null, {
                    withCredentials
                }).then(response => {
                    return response.json()
                }).then(data => {
                    datasetName = data.datasetNames[0];
                    me.getDatafromRestData(`${address}/data`, [sourceName + ':' + datasetName], success);
                    return [sourceName + ':' + datasetName]
                }).catch(function(error) {
                    me._fireFailedEvent(error);
                })
            }).catch(function(error) {
                me._fireFailedEvent(error);
            });
        } else {
            let url = `${address}/maps`,
                mapName, layerName, path;
            FetchRequest.get(url, null, {
                withCredentials
            }).then(response => {
                return response.json()
            }).then(data => {
                mapName = data[0].name;
                path = data[0].path;
                url = url = `${address}/maps/${mapName}/layers`;
                FetchRequest.get(url, null, {
                    withCredentials
                }).then(response => {
                    return response.json()
                }).then(data => {
                    layerName = data[0].subLayers.layers[0].caption;
                    me.getDatafromRestMap(layerName, path, success)
                    return layerName;
                }).catch(function(error) {
                    me._fireFailedEvent(error);
                })
            }).catch(function(error) {
                me._fireFailedEvent(error);
            });

        }
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

    _excelData2Feature(dataContent) {
        let fieldCaptions = dataContent.colTitles;
        let xfieldIndex = -1,
            yfieldIndex = -1;
        for (let i = 0, len = fieldCaptions.length; i < len; i++) {
            if (FileReaderUtil.isXField(fieldCaptions[i])) {
                xfieldIndex = i;
            }
            if (FileReaderUtil.isYField(fieldCaptions[i])) {
                yfieldIndex = i;
            }
        }

        let features = [];

        for (let i = 0, len = dataContent.rows.length; i < len; i++) {
            let row = dataContent.rows[i];

            let x = Number(row[xfieldIndex]),
                y = Number(row[yfieldIndex]);
            let attributes = {};
            for (let index in dataContent.colTitles) {
                let key = dataContent.colTitles[index];
                attributes[key] = dataContent.rows[i][index];
            }
            attributes['index'] = i + '';
            let feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [x, y]
                },
                "properties": attributes
            };
            features.push(feature);
        }
        return features;
    }

    _fireFailedEvent(error) {
        let errorData = error ? {
            error,
            message: Lang.i18n('msg_getdatafailed')
        } : {
            message: Lang.i18n('msg_getdatafailed')
        };

        this.events.triggerEvent("getdatafailed", errorData);
    }
}