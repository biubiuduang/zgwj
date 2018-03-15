import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    title: '享玩玩具派对'
  },
  mutations: {
    setLogin: function(state, data){
      state.token = data;
    },
    setTitle: function(state, data){
      state.title = data;
    }
  },
  getters: {
    token: state => state.token
  }
});

export default store;
