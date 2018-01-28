import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/',
      component: Index,
      children: [{
        path: '/index',
        name: 'index',
        component: resolve => require(['../components/index/index.vue'], resolve)
      },{
        path: '/list',
        name: 'list',
        component: resolve => require(['../components/list/list.vue'], resolve)
      },{
        path: '/shoppingCar',
        name: 'shoppingCar',
        component: resolve => require(['../components/shoppingCar/shoppingCar.vue'], resolve)
      },{
        path: '/userCenter',
        name: 'userCenter',
        component: resolve => require(['../components/userCenter/userCenter.vue'], resolve)
      }]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: resolve => require(['../components/detail/detail.vue'], resolve)
    }
  ]
})
