// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import { Cascader, Form, FormItem, Input, Button, DatePicker, Select, Option, CheckboxGroup, Checkbox } from 'element-ui'
import Mint from 'mint-ui'
import moment from 'moment'
import { MessageBox } from 'mint-ui';

import "./assets/css/bootstrap.css"
import "mint-ui/lib/style.css"
import "./assets/css/base.css"

import "./assets/js/jquery.min"
import "./assets/js/bootstrap"

import "./assets/js/common"

import { baseJs } from "./assets/js/common"

Vue.use(Mint);
Vue.use(Cascader);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);


Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

//面向对象 ajax请求封装
Vue.prototype.newAjax = function(params){
  var that = this;
  var url ="http://toysbox-api.3vlogic.com/"+params.url;
  var method = params.method || "GET";
  var data = params.data || {};
  var dataType = params.dataType || "json";
  var header = params.header ||{
    Accept: "application/json; charset=utf-8",
  };
  var success = params.success || function(data){
    if (data.code == 200) {

    }else{

    }

  };
  var error = params.error || function(){
    MessageBox('提示', '请求错误,请刷新页面');
  };

  $.ajax({
    url: url,
    method: method,
    data : data,
    dataType: dataType,
    headers: header,
    beforeSend : function(){
      $(".popup-loading").show();
    },
    complete : function(){
      $(".popup-loading").hide();
    },
    success : function(data){
      if(data.status == 10002){
        //alert("登录超时,请重新登录!");
        $(".popup-loading").hide();
        that.$router.push('/login');
        return;
      }else{
        success(data);
      }
    },
    error : error
  })
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
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
