import { i18n } from 'boot/i18n';

export const config = {
  // 项目名称
  $projectName: '管理系统',
  // 根路由
  $PUBLIC_PATH: process.env.VUE_ROUTER_BASE,
  // 浏览器 title
  $title: ' | Vue Quasar',
  // 侧边栏风格
  $SideBar: 'hHh lpR fFf',
  // axios 中请求基地址，如果需要请在 axios/axiosConfig.js 中打开，下面是跨域代理示例
  //process.env.NODE_ENV === 'development' ? '/api/' : '生产环境 API'
  $baseURL: '',
  // 请求超时时间
  $timeOut: 8000,
  // 组件最大缓存数
  $Max_KeepAlive: 10,
  // 侧边栏底部文字
  $buttonList: [
    { text: 'Quasar', URL: '' },
    { text: 'Github', URL: '' },
    { text: 'Gitee', URL: '' },
    { text: '关于作者', URL: '' },
  ],
  $t: i18n.global.t,
};
const mergerConfig = (app) => {
  Object.assign(app.config.globalProperties, config);
};
export default mergerConfig;
