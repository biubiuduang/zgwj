<template>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div>
        <ul class="global-nav">
          <router-link to="/index" tag="li" class="col-xs-3">
            <p class="img"><img src="../assets/img/index/icon-1.png" alt=""></p>
            <p class="img-active"><img src="../assets/img/index/icon-1-active.png" alt=""></p>
            <p>首页</p>
          </router-link>
          <router-link to="/list" tag="li" class="col-xs-3">
            <p class="img"><img src="../assets/img/index/icon-2.png" alt=""></p>
            <p class="img-active"><img src="../assets/img/index/icon-2-active.png" alt=""></p>
            <p>全部玩具</p>
          </router-link>
          <router-link to="/shoppingCar" tag="li" class="col-xs-3">
            <p class="img"><img src="../assets/img/index/icon-3.png" alt=""></p>
            <p class="img-active"><img src="../assets/img/index/icon-3-active.png" alt=""></p>
            <p>购物车</p>
          </router-link>
          <router-link to="/userCenter" tag="li" class="col-xs-3">
            <p class="img"><img src="../assets/img/index/icon-4.png" alt=""></p>
            <p class="img-active"><img src="../assets/img/index/icon-4-active.png" alt=""></p>
            <p>我的</p>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          items: [
            {
              icon: '../../assets/img/index/icon-1.png',
              iconActive: '../../assets/img/index/icon-1-active.png',
              index: 'index',
              label: '首页'
            },
            {
              icon: '../assets/img/index/icon-2.png',
              iconActive: '../assets/img/index/icon-2-active.png',
              index: 'list',
              label: '全部玩具'
            },
            {
              icon:'../assets/img/index/icon-3.png',
              iconActive: '../assets/img/index/icon-3-active.png',
              index: 'shoppingCar',
              label: '购物车'
            },
            {
              icon:'../assets/img/index/icon-4.png',
              iconActive: '../assets/img/index/icon-4-active.png',
              index: 'userCenter',
              label: '我的'
            }
          ]
        }
      }
    }
</script>
<style lang="less">
.global-nav{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color:#FAFAFA;
  z-index: 10;
  border-top:1px solid #dfdfdf;
  li{
    padding:0.25rem 0;
    color:#979797;
    p{
      font-size: 0.6rem;
      line-height: 1rem;
      height: 1rem;
      img{
        height: 1.5rem;
        width: auto;
      }
      &.img{
        height:1.5rem;
      }
      &.img-active{
        display: none;
       }
    }
  &.router-link-active{
     color:#2396FF;
     p{
      &.img{
         display: none;
      }
      &.img-active{
         display: inline;
       }
     }
   }
  }
}
</style>
