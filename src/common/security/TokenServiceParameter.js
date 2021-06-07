import { Ekmap } from '../Ekmap';
import { Util } from '../commontypes/Util';
import { ClientType } from '../REST';

/**
 * @class Ekmap.TokenServiceParameter
 * @classdesc token 申请参数。
 * @category Security
 * @param {Object} options - token 申请参数。
 * @param {string} options.username - 用户名。
 * @param {string} options.password - 密码。
 * @param {Ekmap.ClientType} [options.clientType='Ekmap.ClientType.NONE'] - token 申请的客户端标识类型。
 * @param {string} [options.ip] - clientType=IP 时，必选。
 * @param {string} [options.referer] -clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则设置相应的 URL。
 * @param {number} [options.expiration=60] - 申请令牌的有效期,从发布令牌的时间开始计算,单位为分钟。
 *
 *
 */
export class TokenServiceParameter {
    constructor(options) {
        /**
         * @member {string} Ekmap.TokenServiceParameter.prototype.userName
         * @description 用户名。
         */
        this.userName = null;

        /**
         * @member {string} Ekmap.TokenServiceParameter.prototype.password
         * @description 密码。
         */
        this.password = null;

        /**
         * @member {Ekmap.ClientType} Ekmap.TokenServiceParameter.prototype.clientType
         * @description token 申请的客户端标识类型。
         */
        this.clientType = ClientType.NONE;

        /**
         * @member {string} [Ekmap.TokenServiceParameter.prototype.ip]
         * @description clientType=IP 时，必选。
         */

        this.ip = null;
        /**
         * @member {string} [Ekmap.TokenServiceParameter.prototype.referer]
         * @description clientType=Referer 时，必选。如果按照指定 URL 的方式申请令牌，则设置相应的 URL。
         */
        this.referer = null;

        /**
         * @member {number} Ekmap.TokenServiceParameter.prototype.expiration
         * @description 申请令牌的有效期，从发布令牌的时间开始计算，单位为分钟。
         */
        this.expiration = 60;

        Util.extend(this, options);

        this.CLASS_NAME = "Ekmap.TokenServiceParameter";
    }

    /**
     * @function Ekmap.TokenServiceParameter.prototype.toJSON
     * @description 将所有信息转成 JSON 字符串
     * @returns {string} 参数的 JSON 字符串
     */
    toJSON() {
        return {
            userName: this.userName,
            password: this.password,
            clientType: this.clientType,
            ip: this.ip,
            referer: this.referer,
            expiration: this.expiration
        }
    }

}

Ekmap.TokenServiceParameter = TokenServiceParameter;