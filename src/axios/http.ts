import request from './index'
// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url: string, data = {}, params = {}): Promise<any> {
    return request({
        method: 'post',
        url,
        data,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url: string, params = {}): Promise<any>{
    return request({
        method: 'get',
        url,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url: string, data = {}, params = {}) {
    return request({
        method: 'put',
        url,
        params,
        data,
    });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url: string, params = {}) {
    return request({
        method: 'delete',
        url,
        params,
    });
}
