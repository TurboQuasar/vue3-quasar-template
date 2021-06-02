import { AppRouteModule, RouteMeta } from 'router/types';
export interface IAuthState {
  token: string;
  role: string;
  lang: string;
  routes: AppRouteModule[];
  tagView: ITagView[];
  breadcrumbs: RouteMeta[];
  keepAliveList: string[];
}
export interface ITagView {
  fullPath: string;
  name: string;
  title: string;
  icon: string;
  keepAlive: string;
}
function state(): IAuthState {
  return {
    token: '',
    role: '',
    lang: 'zh-CN',
    routes: [],
    tagView: [],
    breadcrumbs: [],
    keepAliveList: [],
  };
}

export default state;
