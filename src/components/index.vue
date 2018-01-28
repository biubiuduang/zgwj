<template>
    <div>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      <ul class="global-nav">
        <template v-for="item in items">
          <router-link :to="item.index" tag="li" class="col-xs-3">
            {{item.label}}
          </router-link>
        </template>
      </ul>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          items: [
            {
              index: 'index',
              label: '首页'
            },
            {
              index: 'list',
              label: '全部玩具'
            },
            {
              index: 'shoppingCar',
              label: '购物车'
            },
            {
              index: 'userCenter',
              label: '我的'
            }
          ]
        }
      }
    }
</script>
<style scoped>
</style>
