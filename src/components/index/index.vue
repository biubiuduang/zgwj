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
          <router-link to="member" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/36icons-VIP.png" alt="">
            <p>成为会员</p>
          </router-link>
        </ul>
      </div>
      <template v-if="recommendShow == true">
      <h2 >玩具推荐</h2>
      <div class="container best-list">
        <ul class="row">
          <template v-for="item in recommendList">
            <router-link :to="'/detail/'+item.goods_id" tag="li" class="col-xs-6">
              <div class="list-box">
                <div class="pv-img flex-center">
                  <img :src="item.goods_thumb" alt="">
                </div>
                <p>{{item.goods_name}}</p>
              </div>
            </router-link>
          </template>
        </ul>
      </div>
      </template>

      <template v-if="newShow == true">
        <h2>新品玩具
          <router-link :to="{path:'/list',query:{type:'1'}}" tag="a" class="link-more">
            更多>>
          </router-link>
        </h2>
        <div class="container best-list">
          <ul class="row">
            <template v-for="item in newList">
              <router-link :to="'/detail/'+item.goods_id" tag="li" class="col-xs-6">
                <div class="list-box">
                  <div class="pv-img flex-center">
                    <img :src="item.goods_thumb" alt="">
                  </div>
                  <p>{{item.goods_name}}</p>
                </div>
              </router-link>
            </template>
          </ul>
        </div>
      </template>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          //推荐玩具列表
          recommendShow: true,
          recommendList:[],
          //新品玩具列表
          newShow: true,
          newList:[],
        }
      },
      activated() {
        this.handleRecommendList();
        this.handleNewList();
      },
      methods: {
        handleRecommendList: function(){
          var that = this;
          this.newAjax({
            url: "goods/get_goodes",
            data: {
              is_recommend: 1,
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                if(data.data.items.length > 4){
                  var item = [];
                  for(var i = 0; i < 4; i++){
                    item.push(data.data.items[i]);
                  }
                  that.recommendList = item;
                }else{
                  that.recommendList = data.data.items;
                }
              }else{
                that.recommendShow = false;
              }
            }
          })
        },
        handleNewList: function(){
          var that = this;
          this.newAjax({
            url: "goods/get_goodes",
            data: {
              order_str: "new",
            },
            success: function(data){
              console.log(data.data.items);
              if(data.status == 200){
                if(data.data.items.length > 4){
                  var item = [];
                  for(var i = 0; i < 4; i++){
                    item.push(data.data.items[i]);
                  }
                  that.newList = item;
                }else{
                  that.newList = data.data.items;
                }
              }else{
                that.newShow = false;
              }
            }
          })
        }
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
      .list-box{
        width: 100%;
        padding: 10px;
        background-color: #cccccc;
        .pv-img{
          width: 100%;
          height: 6rem;
          img{
            width: 100%;
          }
        }
        p{
          text-align: left;
          font-size: 0.7rem;
          color: #252525;
          padding: 0 .13rem;
          margin:0.5rem 0 0.5rem 0;
          white-space: normal;
          height: 2.4rem;
          -webkit-line-clamp: 2;
          line-height: 1.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          -ms-box-flex: 1;
          box-flex: 1;
        }
      }
    }
  }
</style>
