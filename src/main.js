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


Vue.use(Mint);

Vue.config.productionTip = false;


//面向对象 ajax请求封装
Vue.prototype.newAjax = function(params){
  var that = this;
  var url ="/"+params.url;
  var method = params.method || "GET";
  var data = params.data || {};
  var dataType = params.dataType || "json";
  var success = params.success || function(data){
    console.log(data);
    if (data.code == 200) {

    }else{

    }

  };
  var error = params.error || function(){
    alert('请求错误,请刷新页面');
  };

  $.ajax({
    url: url,
    method: method,
    data : data,
    dataType: dataType,
    contentType: contentType,
    beforeSend : function(){
      $(".popup-loading").show();
    },
    complete : function(){
      $(".popup-loading").hide();
    },
    success : success,
    error : error
  })
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods: {

  },
  watch: {
    '$route' (to, from, next) {
      window.document.title = to.meta.title;
      next;
    }
  }
});
