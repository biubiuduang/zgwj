import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import User from '@/components/userCenter/userInfo'
import store from '../store'


Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',//页面初始路由重定向,防止页面初始化时空白现象
      meta: {
        title: '首页'
      },
      redirect: '/index'
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
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
          title: '享玩玩具派对'
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
          title: '个人中心',
          requireAuth: true
        },
        name: 'userCenter',
        component: resolve => require(['../components/userCenter/userCenter.vue'], resolve)
      },{
        path: '/help',
        meta: {
          title: '新手指南'
        },
        name: 'help',
        component: resolve => require(['../components/other/help.vue'], resolve)
      },{
        path: '/party',
        meta: {
          title: '派对服务'
        },
        name: 'party',
        component: resolve => require(['../components/other/party.vue'], resolve)
      }]
    },
    {
      path: '/userCenter',
      component: User,
      children: [
        {
          path: '/userCenter/info',
          meta: {
            title: '用户信息',
            requireAuth: true
          },
          name: 'userCenterSet',
          component: resolve => require(['../components/userCenter/userInfo/userCenterSet.vue'], resolve)
        },
        {
          path: '/userCenter/babyInfo',
          meta: {
            title: '宝宝信息',
            requireAuth: true
          },
          name: 'babyInfo',
          component: resolve => require(['../components/userCenter/userInfo/babyInfo.vue'], resolve)
        }
      ]
    },
    //购物车
    {
      path: '/shoppingCar',
      meta: {
        title: '购物车',
        requireAuth: true
      },
      name: 'shoppingCar',
      component: resolve => require(['../components/shoppingCar/shoppingCar.vue'], resolve)
    },
    {
      path: '/enterOrder',
      meta: {
        title: '收货地址',
        requireAuth: true
      },
      name: 'enterOrder',
      component: resolve => require(['../components/shoppingCar/address.vue'], resolve)
    },
    //详情
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {
        title: '玩具详情'
      },
      component: resolve => require(['../components/detail/detail.vue'], resolve)
    },
    //个人中心
    {
      path: '/userAddress',
      meta: {
        title: '我的地址',
        requireAuth: true
      },
      name: 'userAddress',
      component: resolve => require(['../components/userCenter/userInfo/userAddress.vue'], resolve)
    },
    //会员卡
    {
      path: '/member',
      meta: {
        title: '会员卡'
      },
      name: 'userCenterMember',
      component: resolve => require(['../components/userCenter/member/userCenterMember.vue'], resolve)
    },
    {
      path: '/memberClass',
      meta: {
        title: '会员详情'
      },
      name: 'memberClass',
      component: resolve => require(['../components/userCenter/member/memberClass.vue'], resolve)
    },
    //会员权限
    {
      path: '/userCenter/memberInfo',
      meta: {
        title: '会员权利',
        requireAuth: true
      },
      name: 'userCenterMemberInfo',
      component: resolve => require(['../components/userCenter/memberInfo/memberInfo.vue'], resolve)
    },
    {
      path: '/userCenter/memberState',
      meta: {
        title: '会员状态',
        requireAuth: true
      },
      name: 'memberState',
      component: resolve => require(['../components/userCenter/memberInfo/memberState.vue'], resolve)
    },
    {
      path: '/userCenter/memberOrder',
      meta: {
        title: '会员购买记录',
        requireAuth: true
      },
      name: 'memberOrder',
      component: resolve => require(['../components/userCenter/memberInfo/memberOrder.vue'], resolve)
    },
    {
      path: '/order',
      meta: {
        title: '我的订单',
        requireAuth: true
      },
      name: 'userCenterOrder',
      component: resolve => require(['../components/userCenter/order/userCenterOrder.vue'], resolve)
    },{
      path: '/collect',
      meta: {
        title: '我的收藏',
        requireAuth: true
      },
      name: 'userCenterCollect',
      component: resolve => require(['../components/userCenter/collect/userCenterCollect.vue'], resolve)
    },
    // {
    //   path: '/coupon',
    //   meta: {
    //     title: '玩具派对-我的卡券',
    //     requireAuth: true
    //   },
    //   name: 'userCent erCoupon',
    //   component: resolve => require(['../components/userCenter/userCenterCoupon.vue'], resolve)
    // },
    {
      path: '/test',
      meta: {
        title: '测试加载'
      },
      name: 'test',
      component: resolve => require(['../components/loadmoreTest.vue'], resolve)
    }
  ]
});

router.beforeEach((to ,from ,next ) => {
  if(to.matched.some(record => record.meta.requireAuth)){
    if(store.state.token == '' || store.state.token == null){
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }else{
      next();
      store.commit('setTitle',to.meta.title);
    }
  }else{
    next();
    store.commit('setTitle',to.meta.title);
  }
});

export default router;
