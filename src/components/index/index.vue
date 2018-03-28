<template>
    <div class="padding-box">
      <div class="swipe">
        <mt-swipe :auto="4000">
          <template v-for="item in bannerList">
            <mt-swipe-item :style="{ backgroundImage: 'url(' + item.cover + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}">
              <a :href="item.location"></a>
            </mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <div class="container nav-global">
        <ul class="nav-index row">
          <router-link to="list" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/1.png" alt="">
            <p>全部玩具</p>
          </router-link>
          <router-link to="party" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/2.png" alt="">
            <p>派对服务</p>
          </router-link>
          <router-link to="recycle" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/3.png" alt="">
            <p>玩具回收</p>
          </router-link>
          <router-link to="member" tag="li" class="col-xs-3">
            <img src="../../assets/img/index/4.png" alt="">
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
                <div class="pv-img" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
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
                  <div class="pv-img" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
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
          bannerList: [],
          //推荐玩具列表
          recommendShow: true,
          recommendList:[],
          //新品玩具列表
          newShow: true,
          newList:[],
        }
      },
      activated() {
        this.handleBannerList();
        this.handleRecommendList();
        this.handleNewList();
      },
      methods: {
        handleBannerList: function(){
          var that = this;
          this.newAjax({
            url: "banner/get_banners",
            data: {
              position_no: 'index_1',
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                that.bannerList = data.data.items;
              }else{

              }
            }
          })
        },
        handleRecommendList: function(){
          var that = this;
          this.newAjax({
            url: "goods/get_goodes",
            data: {
              is_recommend: 1,
            },
            success: function(data){
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
    height: 7.92rem;
    width: 100%;
    background-color: #d8d8d8;
    .mint-swipe-item{
      height: 7.92rem;
      a{
        display: block;
        width: 100%;
        height: 7.92rem;
      }
    }
  }
  .nav-global{
    padding: 0 0.7rem 0.5rem 0.7rem;
    .nav-index{
      padding: 0.2rem 0;
      background-color: #FFFFFF;
      box-shadow: 0 4px 15px #E4E9F1;
      margin:-0.3rem 0 0 0;
    }
    li{
      padding:0 0.5rem;
      p{
        font-size: 0.7rem;
        margin-top:0.7rem;
      }
      img{
        width: 80%;
      }
    }
  }
  h2{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.7rem;
    text-align: left;
    padding:0 0.7rem;
    margin: 0.5rem 0;
    a{
      font-size: 0.6rem;
      color:#979797;
      float: right;
    }
  }
  .best-list{
    li{
      padding:0 0.7rem;
      margin-bottom:0.5rem;
      .list-box{
        .pv-img{
          width: 100%;
          background-color: #d8d8d8;
          border-radius:5px;
          height: 6.817rem;
          img{
            width: 100%;
          }
        }
        p{
          text-align: left;
          font-size: 0.7rem;
          color: #3e3e3e;
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
