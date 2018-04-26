<template>
  <div class="userCenter">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <div v-if="collectNormal" class="order-normal flex-center">
        <div>
          <img src="../../../assets/img/icon/null.png" alt="">
          <router-link tag="p" to="/list">去挑选玩具 >></router-link>
        </div>
      </div>
      <mt-loadmore v-else :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <p class="count">已预约{{collectCount}}个玩具</p>
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
          <span v-if="allLoaded== false" v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑加载更多</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          <span v-if="allLoaded">没有更多数据了!</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  import { Toast, MessageBox } from 'mint-ui';
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
        bottomStatus: '',
        wrapperHeight: 0
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
        this.newAjax({
          url:"goods/get_goods_stockouts",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          data: {
            start: that.page.start
          },
          success: function(data){
            if(data.status == 200){
              if(data.data.items != undefined){
                that.collectNormal = false;
                var len = data.data.items.length;
                for(var i = 0; i< len; i++){
                  that.collectList.push(data.data.items[i]);
                }
                that.page.count = data.data.page.count;
                that.allLoaded = false;
                if(data.data.page.count > 99){
                  that.collectCount = '99+';
                }else{
                  that.collectCount = data.data.page.count;
                }
              }else{
                that.collectList = [];
                that.collectNormal = true;
              }
            }else{
              that.allLoaded = true;
              that.collectNormal = true;
              MessageBox('提示', data.message);
            }
          }
        })
      },
      handleCollectList: function(){
        var that = this;
        this.page.start = this.collectList.length;
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
            if(data.status == 200){
              if(data.data.items != undefined){
                var len = data.data.items.length;
                for(var i = 0; i< len; i++){
                  that.collectList.push(data.data.items[i]);
                }
              }else{
                that.collectList = [];
                that.collectNormal = true;
              }
            }else{
              that.allLoaded = true;
              that.collectNormal = true;
              MessageBox('提示', data.message);
            }
          }
        })
      },
      loadBottom: function(){
        if (this.collectList.length < this.page.count) {
          this.handleCollectList();

        } else {
          this.allLoaded = true;
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
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
</script>
<style lang="less">
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
