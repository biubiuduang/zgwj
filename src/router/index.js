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
        path: '/userCenter',
        meta: {
          title: '借个玩具-个人中心'
        },
        name: 'userCenter',
        component: resolve => require(['../components/userCenter/userCenter.vue'], resolve)
      },]
    },
    //购物车
    {
      path: '/shoppingCar',
      meta: {
        title: '借个玩具-购物车'
      },
      name: 'shoppingCar',
      component: resolve => require(['../components/shoppingCar/shoppingCar.vue'], resolve)
    },
    {
      path: '/enterOrder',
      meta: {
        title: '确认订单'
      },
      name: 'enterOrder',
      component: resolve => require(['../components/shoppingCar/address.vue'], resolve)
    },
    //详情
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        title: '借个玩具-玩具详情'
      },
      component: resolve => require(['../components/detail/detail.vue'], resolve)
    },
    //个人中心
    {
      path: '/userCenterSet',
      meta: {
        title: '借个玩具-个人设置'
      },
      name: 'userCenterSet',
      component: resolve => require(['../components/userCenter/userInfo/userCenterSet.vue'], resolve)
    },
    {
      path: '/babyInfo',
      meta: {
        title: '借个玩具-宝宝信息'
      },
      name: 'babyInfo',
      component: resolve => require(['../components/userCenter/userInfo/babyInfo.vue'], resolve)
    },
    {
      path: '/userAddress',
      meta: {
        title: '借个玩具-我的地址'
      },
      name: 'userAddress',
      component: resolve => require(['../components/userCenter/userInfo/userAddress.vue'], resolve)
    },
    //会员卡
    {
      path: '/member',
      meta: {
        title: '借个玩具-会员卡'
      },
      name: 'userCenterMember',
      component: resolve => require(['../components/userCenter/member/userCenterMember.vue'], resolve)
    },
    {
      path: '/memberClass',
      meta: {
        title: '借个玩具-会员卡'
      },
      name: 'memberClass',
      component: resolve => require(['../components/userCenter/member/memberClass.vue'], resolve)
    },
    //会员权限
    {
      path: '/memberInfo',
      meta: {
        title: '借个玩具-会员权利'
      },
      name: 'userCenterMemberInfo',
      component: resolve => require(['../components/userCenter/memberInfo/userCenterMemberInfo.vue'], resolve)
    },
    {
      path: '/memberState',
      meta: {
        title: '借个玩具-会员状态'
      },
      name: 'memberState',
      component: resolve => require(['../components/userCenter/memberInfo/memberState.vue'], resolve)
    },
    {
      path: '/order',
      meta: {
        title: '借个玩具-我的订单'
      },
      name: 'userCenterOrder',
      component: resolve => require(['../components/userCenter/order/userCenterOrder.vue'], resolve)
    },{
      path: '/collect',
      meta: {
        title: '借个玩具-我的收藏'
      },
      name: 'userCenterCollect',
      component: resolve => require(['../components/userCenter/collect/userCenterCollect.vue'], resolve)
    },{
      path: '/coupon',
      meta: {
        title: '借个玩具-我的卡券'
      },
      name: 'userCenterCoupon',
      component: resolve => require(['../components/userCenter/userCenterCoupon.vue'], resolve)
    },{
      path: '/test',
      meta: {
        title: '测试加载'
      },
      name: 'test',
      component: resolve => require(['../components/loadmoreTest.vue'], resolve)
    }
  ]
})
