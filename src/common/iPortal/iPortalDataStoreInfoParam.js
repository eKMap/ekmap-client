import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';

/**
 * @class Ekmap.iPortalDataStoreInfoParam
 * @classdesc iPortal 注册一个HBASE HDFS数据存储类。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 注册一个HBASE HDFS数据存储类具体参数。
 * @param {string} params.type - 大数据文件共享类型和空间数据库类型，包括大数据文件共享HDFS 目录(HDFS)和空间数据库HBASE
 * @param {string} params.url - HDFS数据存储目录地址
 * @param {Ekmap.iPortalDataConnectionInfoParam} [params.connectionInfo] - HBASE空间数据库服务的连接信息
 */
export class IPortalDataStoreInfoParam {

    constructor(params) {
        params = params || {};
        this.type = "";
        this.url = "";
        this.connectionInfo = {};
        Util.extend(this, params);
    }
}
Ekmap.iPortalDataStoreInfoParam = IPortalDataStoreInfoParam;