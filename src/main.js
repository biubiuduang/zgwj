// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'

import "./assets/css/bootstrap.css"
import "mint-ui/lib/style.css"
import "./assets/css/base.css"

import "./assets/js/jquery.min"
import "./assets/js/bootstrap"

import "./assets/js/common"


Vue.use(Mint)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {

  }
})
