import axios, { AxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';
import { Modal } from 'antd';
import Store from '@/store';
import { deleteToken } from '@/store/features/user.ts';
interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: AxiosRequestConfig<D>;
    request?: any;
}
export default function request(config: AxiosRequestConfig) {
    const instance = axios.create({
        baseURL: '/',
        // 指定请求超时的毫秒数
        timeout: 3000,
        // 表示支持跨域请求携带Cookie，默认是false，表示不携带Cookie
        // 同时需要后台配合，返回需要有以下字段，
        // 如果该字段设置为true，但是后台没有返回以下两个字段的话浏览器是会报错的
        // Access-Control-Allow-Credentials: true
        // Access-Control-Allow-Origin: 当前页面的域名
        withCredentials: false
    });
    // 前置拦截器（发起请求之前的拦截）
    instance.interceptors.request.use(
        (config: any) => {
            /**
             * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
             *
             *
             */
            const token = Store.getState().user.token;
            console.log(token);
            if (token) {
                config.headers.token = token;
            }
            return config;
        },
        (error: { message: string }) => {
            const errorMsg = error?.message || 'Request Error';
            Modal.error({
                content: errorMsg
            });
            return Promise.reject(error);
        }
    );

    // 后置拦截器（获取到响应时的拦截）
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            // 这里我们将后台返回的数据解构出来返回，方便后续获取
            // const { data } = response;
            // 这里根据其它业务可以做其它特殊的拦截，比如根据后台返回的data有固定的格式，根据后台返回的code可以做一些统一处理，比如像下面这样
            const { code, msg, data } = response.data;
            const { status } = response;

            // // 根据自定义错误码判断请求是否成功
            if (code === 1 || status == 200) {
                // 将组件用的数据返回
                return data;
            } else {
                // 处理业务错误。
                Modal.error({
                    content: msg
                });
                return Promise.reject(new Error(msg));
            }
        },
        (error: { response: any }) => {
            const { response } = error;
            // 处理 HTTP 网络错误
            let message = '';
            // HTTP 状态码
            const status = response?.status;
            switch (status) {
                case 401:
                    message = 'token 失效，请重新登录';
                    // 这里可以触发退出的 action
                    Store.dispatch(deleteToken());
                    break;
                case 403:
                    message = '拒绝访问';
                    break;
                case 404:
                    message = '请求地址错误';
                    break;
                case 500:
                    message = '服务器故障';
                    break;
                default:
                    message = '网络连接故障';
            }
            Modal.error({
                content: message,
                onOk: () => {}
            });

            return Promise.reject(error);
        }
    );

    return instance(config);
}
