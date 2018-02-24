import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '*',//页面初始路由重定向,防止页面初始化时空白现象
      meta: {
        title: '首页'
      },
      redirect: '/index'
    },
    {
      path: '/',
      meta: {
        title: '首页'
      },
      redirect: '/index'
    },
    {
      path: '/',
      component: Index,
      children: [{
        path: '/index',
        meta: {
          title: '首页'
        },
        name: 'index',
        component: resolve => require(['../components/index/index.vue'], resolve)
      },{
        path: '/list',
        meta: {
          title: '全部玩具'
        },
        name: 'list',
        component: resolve => require(['../components/list/list.vue'], resolve)
      },{
        path: '/shoppingCar',
        meta: {
          title: '借个玩具-购物车'
        },
        name: 'shoppingCar',
        component: resolve => require(['../components/shoppingCar/shoppingCar.vue'], resolve)
      },{
        path: '/userCenter',
        meta: {
          title: '借个玩具-个人中心'
        },
        name: 'userCenter',
        component: resolve => require(['../components/userCenter/userCenter.vue'], resolve)
      }]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        title: '借个玩具-玩具详情'
      },
      component: resolve => require(['../components/detail/detail.vue'], resolve)
    }
  ]
})
