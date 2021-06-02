import { boot } from 'quasar/wrappers';
import axios, { AxiosRequestConfig } from 'axios';
import { Notify } from 'quasar';
import { store } from 'store/index';
import { config } from '../config';
import { Result } from 'classes/Result';

function createInstance(options: AxiosRequestConfig) {
  const instance = axios.create(options);
  // 请求拦截
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = store.state['auth/token'];
      config.headers.Authorization = 'Bearer ' + token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //响应拦截
  instance.interceptors.response.use(
    (response) => {
      const data: Result<any> = response.data;
      const defaultNotify: any = {
        message: '未知错误',
        icon: 'warning',
        color: 'warning',
        position: 'top',
        timeout: 1500,
      };
      switch (data.code) {
        case 200:
          return data.data;
        case 401:
          defaultNotify.message = '账号或密码错误';
          Notify.create(defaultNotify);
        default:
          return data.data;
      }
      return Promise.reject(data);
    },
    (error) => {
      const defaultNotify: any = {
        message: '未知错误',
        icon: 'warning',
        color: 'warning',
        position: 'top',
        timeout: 1500,
      };
      if (
        error.code === 'ECONNABORTED' ||
        error.message.indexOf('timeout') !== -1 ||
        error.message === 'Network Error'
      ) {
        defaultNotify.message = '网络异常';
        Notify.create(defaultNotify);
        return Promise.reject(error);
      }
      switch (error.response?.status) {
        case 403:
          defaultNotify.message = '拒绝访问(403)';
          Notify.create(defaultNotify);
          break;
        case 404:
          defaultNotify.message = '资源不存在(404)';
          Notify.create(defaultNotify);
          break;
        case 408:
          defaultNotify.message = '请求超时(404)';
          Notify.create(defaultNotify);
          break;
        case 500:
          defaultNotify.message = '服务器错误(500)';
          Notify.create(defaultNotify);
          break;
        case 501:
          defaultNotify.message = '服务未实现(501)';
          Notify.create(defaultNotify);
          break;
        case 502:
          defaultNotify.message = '网络错误(502)';
          Notify.create(defaultNotify);
          break;
        case 503:
          defaultNotify.message = '服务不可用(503)';
          Notify.create(defaultNotify);
          break;
        case 504:
          defaultNotify.message = '网络超时(504)';
          Notify.create(defaultNotify);
          break;
        case 505:
          defaultNotify.message = 'HTTP版本不受支持(505)';
          Notify.create(defaultNotify);
          break;
        default:
          Notify.create(defaultNotify);
          break;
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
const api = createInstance({
  baseURL: process.env.BASE_API,
  timeout: config.$timeOut,
});
const mockApi = createInstance({
  baseURL: process.env.MOCK_API,
  timeout: config.$timeOut,
});
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$mockApi = mockApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api, mockApi };
