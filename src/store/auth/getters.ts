import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';

const getters: GetterTree<IAuthState, StateInterface> = {
  getLang: (state) => {
    return state.lang;
  },
  getToken: (state) => {
    return state.token;
  },
  getRole: (state) => {
    return state.role;
  },
  getRoutes: (state) => {
    return state.routes;
  },
  getTagView: (state) => {
    return state.tagView;
  },
  getBreadcrumbs: (state) => {
    return state.breadcrumbs;
  },
  getKeepAliveList: (state) => {
    return state.keepAliveList;
  },
};

export default getters;
