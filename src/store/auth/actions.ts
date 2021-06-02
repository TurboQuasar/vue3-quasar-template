import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';
import { UserLogin } from '../../models/UserLogin';
const actions: ActionTree<IAuthState, StateInterface> = {
  removeTagView({ commit, state }, payload) {
    commit('REMOVE_TAG_VIEW', payload);
  },
  addTagView({ commit, state }, payload) {
    commit('ADD_TAG_VIEW', payload);
  },
  async login({ commit }, payload) {
    const { token, role } = await UserLogin.login(payload);
    commit('SET_TOKEN', token);
    commit('SET_ROLE', role);
  },
};

export default actions;
