import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: 'ciel-admin',
  },
  getters: {
    appName: state => state.appName,
  },
  mutations: {
    SET_APP_NAME(state, name) {
      state.appName = name;
    },
  },
  actions: {
    setAppName({ commit }, name) {
      commit('SET_APP_NAME', name);
    },
  },
});
