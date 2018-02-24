<template>
    <div>
      <div class="swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item>1</mt-swipe-item>
          <mt-swipe-item>2</mt-swipe-item>
          <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="container nav-global">
        <ul class="nav-index row">
          <router-link to="list" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/36icons-Home.png" alt="">
            <p>全部玩具</p>
          </router-link>
          <router-link to="list" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/36icons-party.png" alt="">
            <p>派对服务</p>
          </router-link>
          <router-link to="list" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/36icons-Introduction.png" alt="">
            <p>新手指南</p>
          </router-link>
          <router-link to="list" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/36icons-VIP.png" alt="">
            <p>成为会员</p>
          </router-link>
        </ul>
      </div>
      <h2>玩具推荐</h2>
      <div class="container best-list">
        <ul class="row">
          <router-link :to="'/detail/'+1" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+2" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+3" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+4" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
        </ul>
      </div>
      <h2>新品玩具
        <router-link :to="{path:'/list',query:{type:'1'}}" tag="a" class="link-more">
          更多>>
        </router-link>
      </h2>
      <div class="container best-list">
        <ul class="row">
          <router-link :to="'/detail/'+4" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+4" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+4" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
          <router-link :to="'/detail/'+4" tag="li" class="col-xs-6">
            <div>
              <img src="../../assets/img/index/36icons-Home.png" alt="">
              <p>名称名称名称名称名称名称名称名称</p>
            </div>
          </router-link>
        </ul>
      </div>

    </div>
</template>
<script>
    export default {
      data() {
        return {

        }
      },
      activated() {

      },
      methods: {

      }
    }
</script>
<style scoped lang="less">
  .swipe{
    height: 8rem;
    width: 100%;
    .mint-swipe-item{
      background-color: #999999;
    }
  }
  .nav-global{
    padding: 8px 0;
    .nav-index{
      margin:0;
    }
    li{
      p{
        margin-top:8px;
      }
    }
  }
  h2{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin: 10px 0;
    background-color: #cccccc;
    a{
      font-size: 14px;
      float: right;
    }
  }
  .best-list{
    li{
      margin-bottom:10px;
      div{
        width: 100%;
        padding: 10px;
        background-color: #cccccc;
        img{
          width: 80%;
        }
        p{
          margin-top:10px;
          height: 36px;
          line-height: 18px;
          text-align: center;
          overflow: hidden;
        }
      }
    }
  }
</style>
