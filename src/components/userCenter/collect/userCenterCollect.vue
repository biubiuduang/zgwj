<template>
  <div class="userCenter">
    <div v-if="collectNormal" class="order-normal flex-center">
      <router-link tag="p" to="/list">去挑选玩具 >></router-link>
    </div>
    <div v-else class="page-infinite-wrapper" ref="wrapper">
      <p class="count">已收藏{{collectCount}}个玩具</p>
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="order-list">
          <template v-for="item in collectList">
            <router-link tag="li"  :to="'/detail/'+item.goods_id">
              <div class="pv-img flex-center">
                <p class="img-box" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></p>
              </div>
              <div class="pv-info">
                <p class="p-title">{{item.goods_name}}</p>
                <div class="info-msg">
                  <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
                  <p class="is-stars" v-else>非星标玩具</p>
                  <p class="is-stars">{{item.age_name}}</p>
                </div>
                <div class="info-collect">
                  <p class="is-stars" v-if="item.goods_number == 0">暂时无货</p>
                  <p class="is-stars" v-else>有库存</p>
                  <p class="is-ages" @click="handleUnfollow($event,item.collect_id)"><i class="iconfont icon-delete"></i></p>
                </div>
              </div>
            </router-link>
          </template>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑上拉加载更多</span>
          <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
        </div>
        <p class="loading-bottom" v-if="allLoaded">没有更多数据了.</p>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        collectNormal: true,
        collectCount: 0,
        allLoaded : false,
        collectList: [],
        page:{
          start: 0,
          count: 0
        },
        bottomStatus: ''
      }
    },
    activated() {
      this.handleInit();
    },
    methods: {
      handleInit: function(){
        var that = this;
        that.allLoaded = false;
        that.collectList = [];
        that.page = {
          start:0,
          count:0
        };
        that.handleCollectList();
      },
      handleCollectList: function(){
        var that = this;
        this.newAjax({
          url:"user/get_collects",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          data: {
            start: that.page.start
          },
          success: function(data){
            console.log(data);
            if(data.status == 200){
              if(data.data.items == undefined){
                that.collectList = [];
                that.collectNormal = true;
              }else{
                that.collectNormal = false;
                that.collectList = that.collectList.concat(data.data.items);
                if(data.data.page.count > 99){
                  that.collectCount = '99+';
                }else{
                  that.collectCount = data.data.page.count;
                }
                if(that.collectList.length >= data.data.page.count){
                  that.allLoaded = true;
                }else{
                  that.page.start = that.collectList.length;
                  that.allLoaded = false;
                }
              }
            }else{
              that.allLoaded = true;
              that.collectNormal = true;
              alert(data.message);
            }
          }
        })
      },
      loadBottom: function(){
        if(this.allLoaded == false){
          this.handleCollectList();
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleUnfollow: function(event,id){
        event.stopPropagation();
        var that = this;
        this.newAjax({
          url: "user/delete_collect",
          method: "POST",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          data: {
            collect_id: id
          },
          success: function(data){
            console.log(data);
            if(data.status == 200){
              Toast({
                message: '取消成功',
                iconClass: 'mintui mintui-success',
                duration: 2000
              });
              that.handleInit();
            }else{
              Toast({
                message: '取消失败',
                duration: 2000
              });
            }
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .page-infinite-wrapper{
    background-color: #ffffff;
  }
  .count{
    text-indent:0.7rem;
    font-size: 0.8rem;
    text-align: left;
    line-height: 2.16rem;
  }
  .order-list{
  li{
    overflow: hidden;
    padding:0 0.7rem;
  .order-goods-list{
    height:6.4rem;
    overflow: hidden;
    margin:10px auto;
  }
  .pv-img{
    width: 5rem;
    height: 6.4rem;
    float:left;
  .img-box{
    background-color: #d8d8d8;
    width: 4.5rem;
    height:4.5rem;
    border-radius: 0.4rem;
  }
  }
  .pv-info{
    float:left;
    width: 11rem;
    margin-left: 0.6rem;
    text-align: left;
  .p-title{
    font-weight: 800;
    font-size: 0.8rem;
    color: #3e3e3e;
    padding: 0 .13rem;
    margin:0.96rem 0 0.2rem 0;
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
  .info-msg,.info-collect{
    height: 1rem;
    p{
      font-size: 0.8rem;
      line-height: 1rem;
    &.is-stars{
       float:left;
       font-size: 0.7rem;
     }
    &.is-ages{
       float:right;
     }
    }
  }
  .info-collect{
    p.is-stars{
      color:#ff0000;
    }
  }
  }
  }
  }
</style>
