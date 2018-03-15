<template>
  <div class="padding-top">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <div v-if="orderNormal" class="order-normal flex-center">
      <router-link tag="p" to="/member">去购买会员 >></router-link>
    </div>
    <div v-else class="page-infinite-wrapper" ref="wrapper">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore">
        <ul class="gradecardList">
          <li v-for="item in gradecardList">
            <p class="title"><span>会员类型 ：</span>{{item.card_name}}</p>
            <p class="type"><span>订单状态 ：</span>{{item.card_status}}</p>
            <p class="date"><span>购买时间 ：</span>{{item.started_at}}</p>
          </li>
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
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        orderNormal: true,
        allLoaded : false,
        gradecardList:[],
        page: {
          start: 0,
          count: 0
        },
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        bottomStatus: '',
      }
    },
    activated() {
      this.handleInit();
    },
    methods: {
      handleInit: function(){
        this.orderNormal = true;
        this.allLoaded = false;
        this.gradecardList = [];
        this.page = {
            start: 0,
            count: 0
        };
        this.handleGetList();
      },
      handleGetList: function(){
        var that = this;
        this.newAjax({
          url: "user/get_own_gradecards",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          data:{
            start: that.page.start
          },
          success: function(data){
            console.log(data);
            if(data.status == 200){
              if(data.data.items == undefined){
                that.orderNormal= true;
              }else{
                that.orderNormal= false;
                that.gradecardList = that.gradecardList.concat(data.data.items);

                if(that.gradecardList.length >= data.data.page.count){
                  that.allLoaded = true;
                }else{
                  that.page.start = that.gradecardList.length;
                  that.allLoaded = false;
                }
              }
            }else{
              MessageBox('提示', data.message);
            }
          }
        })
      },
      loadBottom: function(){
        if(this.allLoaded == false){
          this.handleGetList();
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    }
  }
</script>
<style scoped lang="less">
  .gradecardList{
    background-color: #ffffff;
    overflow: hidden;
    text-align: left;
    li{
      padding:1rem 0.7rem;
      background-color: #f5f5f5;
      margin-bottom: 1px;
      p{
        line-height:1.3rem;
        font-size:0.7rem;
        &.title{
          font-size: 0.8rem;
          color:#3E3E3E;
         }
         span{
           font-size: 0.7rem;
         }
      }
    }
  }
</style>
