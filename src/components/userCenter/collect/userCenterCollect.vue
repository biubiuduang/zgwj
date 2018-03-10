<template>
  <div>
    <div v-if="collectNormal" class="order-normal flex-center">
      <router-link tag="p" to="/list">去挑选玩具 >></router-link>
    </div>
    <template v-else>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="order-list">
          <template v-for="item in collectList">
            <router-link tag="li"  :to="'/detail/'+item.goods_id">
              <div class="pv-img">
                <p class="img-box flex-center">
                  <img :src="item.goods_thumb" alt="">
                </p>
              </div>
              <div class="pv-info">
                <p class="p-title">{{item.goods_name}}</p>
                <div class="info-msg">
                  <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
                  <p class="is-stars" v-else>非星标玩具</p>
                </div>
                <div class="info-msg">
                  <p class="is-stars">0-6个月</p>
                </div>
                <div class="info-collect">
                  <p class="is-stars" v-if="item.goods_number == 0">暂时无货</p>
                  <p class="is-ages" @click="handleUnfollow($event,item.collect_id)">取消收藏</p>
                </div>
              </div>
            </router-link>
          </template>
        </ul>
        <p class="loading-bottom" v-if="allLoaded == true">没有更多数据了.</p>
        <p class="loading-bottom" v-else>上拉加载更多</p>
      </mt-loadmore>
    </template>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        collectNormal: true,
        allLoaded : false,
        collectList: [],
        page:{
          start: 0,
          count: 0
        },
      }
    },
    activated() {
      this.handleCollectList();
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
                that.collectList = data.data.items;

                that.page.count = data.data.page.count;
                if(that.collectList.length == that.page.count){
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
              that.handleCollectList();
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
  .order-list{
    overflow: scroll;
    max-height:100%;
  .order-number{
    line-height: 2rem;
    background-color: #e1e1e1;
    font-size: 0.7rem;
    text-align: left;
    text-indent: 1rem;
    margin:-0.5rem -0.5rem 0.5rem -0.5rem;
  span{
    float: right;
    margin-right: 1rem;
  }
  }
  li{
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    padding: 0.5rem;
  .pv-img{
    width: 6rem;
    height: 7.5rem;
    float:left;
    .img-box{
      height: 7.5rem;
    }
    img{
      width: 100%;
    }
  }
  .pv-info{
    float:left;
    width: 11rem;
    padding-left: 0.46rem;
    text-align: left;
  .p-title{
    font-size: 0.8rem;
    color: #252525;
    padding: 0 .13rem;
    margin:0.5rem 0 0.6rem 0;
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
    height: 1.5rem;
  p{
    font-size: 0.8rem;
    line-height: 1rem;
  &.is-stars{
     float:left;
   }
  &.is-ages{
     float:right;
   }
  }
  }
  }
  }
  }
</style>
