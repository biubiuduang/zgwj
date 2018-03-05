import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token")
  },
  mutations: {
    getLogin : function(state, data){
      state.token = data;
    }
  },
  getters: {
    token: state => state.token
  }
});

export default store;
