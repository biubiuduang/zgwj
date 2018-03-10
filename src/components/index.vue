<template>
    <div>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      <ul class="global-nav">
        <template v-for="item in items">
          <router-link :to="item.index" tag="li" class="col-xs-3">
            <p><i class="iconfont" :class="item.icon"></i></p>
            <p>{{item.label}}</p>
          </router-link>
        </template>
      </ul>
      </mt-tabbar>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          items: [
            {
              icon: 'icon-index',
              index: 'index',
              label: '首页'
            },
            {
              icon: 'icon-toys',
              index: 'list',
              label: '全部玩具'
            },
            {
              icon:'icon-cart',
              index: 'shoppingCar',
              label: '购物车'
            },
            {
              icon:'icon-account',
              index: 'userCenter',
              label: '我的'
            }
          ]
        }
      }
    }
</script>
<style scoped lang="less">

</style>
