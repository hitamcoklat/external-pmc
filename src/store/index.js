import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

const state = {
  isLogged: !localStorage.getItem('token'),
  userData: []
}

const mutations = {
  LOGIN_USER(state, data) {
    state.isLogged = true
    state.userData = data
  },
  LOGOUT_USER(state) {
    state.isLogged = false
  }
}

const getters = {
  userData: state => state.userData,
  isLogged: state => state.isLogged
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  getters,
  state,
  mutations,
  actions: {},
  modules: {}
});
