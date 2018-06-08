<template>
    <div class="padding-box index">
      <div class="white-bg">
        <div class="container nav-global">
          <mt-search
            v-model="searchValue"
            cancel-text=""
            placeholder="搜索玩具"
          >
          </mt-search>
          <ul class="nav-index row">
            <router-link to="member" tag="li" class="col-xs-3">
              <p class="img-box">
               <img src="../../assets/img/index/3.png" alt="">
              </p>
              <p>成为会员</p>
            </router-link>
            <!--<li class="col-xs-3" @click="handleLink">-->
              <!--<p class="img-box">-->
                <!--<img src="../../assets/img/index/1.png" alt="">-->
              <!--</p>-->
              <!--<p>派对服务</p>-->
            <!--</li>-->
            <router-link to="party" tag="li" class="col-xs-3">
              <p class="img-box">
                <img src="../../assets/img/index/1.png" alt="">
              </p>
              <p>派对服务</p>
            </router-link>
            <router-link to="recycle" tag="li" class="col-xs-3">
              <p class="img-box">
                <img src="../../assets/img/index/2.png" alt="">
              </p>
              <p>玩具回收</p>
            </router-link>
            <router-link to="union" tag="li" class="col-xs-3">
              <p class="img-box">
                <img src="../../assets/img/index/4.png" alt="">
              </p>
              <p>联盟商户</p>
            </router-link>
          </ul>
        </div>
        <div class="swipe">
        <mt-swipe :auto="4000">
          <template v-for="item in bannerList">
            <mt-swipe-item :style="{ backgroundImage: 'url(' + item.cover + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}">
              <a :href="item.location"></a>
            </mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      </div>
      <template v-if="recommendShow == true">
      <h2 class="recommend">**玩具推荐**</h2>
      <div class="container best-list white-bg">
        <ul class="row">
          <template v-for="item in recommendList">
            <router-link :to="'/detail/'+item.goods_id" tag="li" class="col-xs-6">
              <div class="list-box">
                <div class="pv-img" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
                <p>{{item.goods_name}}</p>
                <p class="age-name goods-price">吊牌价:{{item.goods_price}}</p>
              </div>
            </router-link>
          </template>
        </ul>
        <router-link :to="{path:'/list',query:{order_str:'hot'}}" tag="a" class="link-more">
          查看更多
        </router-link>
      </div>
      </template>
      <template v-if="newShow == true">
        <h2 class="news">**新品玩具**</h2>
        <div class="container best-list white-bg">
          <ul class="row">
            <template v-for="(item, index) in newList">
              <router-link :to="'/detail/'+item.goods_id" tag="li" :class="index == 2 ? 'col-xs-12' : 'col-xs-6'">
                <div class="list-box">
                  <p v-if="index==2" class="oneLine">{{item.goods_name}}</p>
                  <div class="pv-img" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
                  <p v-if="index!=2">{{item.goods_name}}</p>
                </div>
              </router-link>
            </template>
          </ul>

          <router-link :to="{path:'/list',query:{order_str:'new'}}" tag="a" class="link-more">
            查看更多
          </router-link>
        </div>
      </template>
      <template v-if="brandShow == true">
        <h2 class="brand">**玩具品牌**</h2>
        <div class="container best-list white-bg container-brand">
          <ul class="row">
            <template v-for="(item, index) in brandList">
              <router-link :to="{path:'/list',query:{brand:item.category_id}}" tag="li" class="col-xs-4" :class="index > 5 ? 'brandHide' : 'brandShow'">
                <div class="list-box">
                  <div class="pv-img" :style="{ backgroundImage: 'url(' + item.image_url + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
                  <p>{{item.category_name}}</p>
                </div>
              </router-link>
            </template>
          </ul>

          <a v-if="listMore" @click="handleStateBrand" href="javascript:void(0);" class="link-more">
            查看更多
          </a>
          <a v-else @click="handleStateBrand" href="javascript:void(0);" class="link-more">
            收起更多
          </a>
        </div>
      </template>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          searchValue: '',
          bannerList: [],
          //推荐玩具列表
          recommendShow: true,
          recommendList:[],
          //新品玩具列表
          newShow: true,
          newList:[],
          //品牌列表
          brandShow: true,
          brandList: [],
          listMore: true
        }
      },
      activated() {
        this.handleBannerList();
        this.handleRecommendList();
        this.handleNewList();
        this.handleBrandList();
        this.handleEnter();
      },
      methods: {
        handleLink: function(){
          window.open("https://h.eqxiu.com/s/VrfTtSfa?eqrcode=1&share_level=1&from_user=56c058e8-1c21-4a5b-9397-a9a0a05d53bd&from_id=9d7bc8d5-9c6e-4827-852a-1bcb298235a4&share_time=1527486201306");
        },
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
                console.log(data);
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
                  for(var i = 0; i < 3; i++){
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
        },
        //获取玩具分类
        handleBrandList: function () {
          var that = this;
          this.newAjax({
            url: "goods/get_categories",
            success: function (data) {
              that.brandList = data.data.items[1].child[0];
              console.log(that.brandList);
            }
          })
        },
        handleStateBrand: function(){
          if(this.listMore == true){
            this.listMore = false;
          }else{
            this.listMore = true;
          }
          $(".brandHide").toggleClass("brandShow");
        },
        handleEnter: function () {
          var that = this;
          $('.mint-searchbar-core').bind('keyup', function (event) {
            if (event.keyCode == "13") {
              sessionStorage.setItem("refresh","yes");
              //回车执行查询
              that.$router.push({ path: '/list', query: { keywords: that.searchValue }})
            }
          });
        },
      },
      beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        to.meta.keepAlive = true;
        next();
      }
    }
</script>
<style lang="less">
  @import "../../assets/css/parameters.less";
  .index{
    background-color:@bg-color;
    .container{
      padding:1rem 0.3rem 0 0.3rem;
      margin-bottom: 16px;
    }
    .row{
      margin-left:0;
      margin-right:0;
    }
    .swipe{
      height: 7.92rem;
      width: 16.7rem;
      margin:0 auto;
      position: relative;
      top:-1.5rem;
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
      background-color: @primary-color;
      height: 9.64rem;
      border-bottom-left-radius: 0.7rem;
      border-bottom-right-radius: 0.7rem;
      padding: 0 0.7rem 0.5rem 0.7rem;
    .mint-search{
      height:1.728rem;
      background-color: rgba(0,0,0,0.2);
      border-radius: 0.864rem;
      margin:0.5rem auto 0.2rem auto;
    }
    .mint-searchbar{
      height:1.728rem;
      padding: 0;
      border-radius: 0.864rem;
      background:none;
      input{
        border-radius: 0.864rem;
      }
    }
    .mint-searchbar-inner{
      background: none;
      .mintui-search,.mint-searchbar-core{
        padding-left: 10px;
        font-size: 14px;
        color:#ffffff;
      }
    }
    .nav-index{
      padding: 0.2rem 0.5rem;
      margin-top:0.96rem;
    }
    li{
      padding:0 0.5rem;
      p{
        font-size: 0.7rem;
        margin-top:0.7rem;
        color:#ffffff;
        &.img-box{
          width: 2.304rem;
          height: 2.304rem;
          margin:0 auto;
          padding: 0.1rem;
          border-radius: 10px;
          background-color: #ffffff;
          img{
            width: 100%;
          }
         }
      }
    }
  }
  h2{
    height: 3rem;
    line-height: 3rem;
    font-size: 0.9rem;
    text-align: center;
    padding:0.5rem 0.7rem;
    margin-bottom: 2px;
    background-color: #ffffff;
    &.recommend{
      margin-top:-1.5rem;
      color:@assist-color;
     }
    &.news{
       color:@primary-color;
     }
     &.brand{
        color:@green;
      }
  }
  .best-list{
    li{
      padding:0 3px;
      margin-bottom:6px;
      .list-box{
        border-radius: 5px;
        padding: 13px;
        background-color: @bg-color;
      .pv-img{
        width: 100%;
        background-color: #d8d8d8;
        border-radius:5px;
        padding-top:100%;
        img{
          width: 100%;
        }
        }
        p{
          text-align: left;
          font-size: 0.8rem;
          color: #666666;
          padding: 0 .13rem;
          margin:0.5rem 0 0 0;
          white-space: normal;
          height: 2.5rem;
          -webkit-line-clamp: 2;
          line-height: 1.25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          -ms-box-flex: 1;
          box-flex: 1;
          &.oneLine{
              margin:0 0 0.5rem 0;
             height: 1.5rem;
             -webkit-line-clamp: 1;
             line-height: 1.5rem;
           }
           &.age-name{
              text-align: right;
              font-size: 14px;
              height: 1.5rem;
              margin:0;
            }
            &.goods-price{
              font-size: 16px;
               color: @primary-color;
             }
        }

      }
    }
    &.container-brand{
      li{
        .list-box{
          p{
            display:block;
            margin:0;
            text-align: center;
            height: 1.5rem;
            -webkit-line-clamp: 1;
            line-height: 1.5rem;
          }
          .pv-img{
            height: 2.45rem;
            padding-top:0;
          }
        }
      }
     }
  }
    a.link-more{
      font-size: 16px;
      line-height: 3rem;
      color:#666666;
    }
    .brandHide{
      display: none;
    }
    .brandShow{
      display: block;
    }
  }

</style>
