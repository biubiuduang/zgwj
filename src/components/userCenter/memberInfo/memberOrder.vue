<template>
  <div class="padding-top">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <div v-if="orderNormal" class="order-normal flex-center">
        <router-link tag="p" to="/member">去购买会员 >></router-link>
      </div>
      <mt-loadmore v-else :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore">
        <ul class="gradecardList">
          <li v-for="item in gradecardList">
            <p class="title"><span>会员类型 ：</span>{{item.card_name}}</p>
            <p class="type"><span>订单状态 ：</span>{{item.card_status}}</p>
            <p class="date"><span>购买时间 ：</span>{{item.created_at}}</p>
          </li>
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
        this.orderNormal = true;
        this.gradecardList = [];
        this.page = {
            start: 0,
            count: 0
        };
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
              if(data.data.items != undefined){
                that.orderNormal= false;
                var len = data.data.items.length;
                for (var i = 0; i < len; i++) {
                  that.gradecardList.push(data.data.items[i]);
                }
                that.page.count = data.data.page.count;
                that.allLoaded = false;
              }else{
                that.orderNormal= true;
                that.gradecardList = [];
                that.allLoaded = true;
              }
            }else{
              MessageBox('提示', data.message);
            }
          }
        })
      },
      handleGetList: function(){
        var that = this;
        this.page.start = this.gradecardList.length;
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
              if(data.data.items != undefined){
                that.orderNormal= false;
                var len = data.data.items.length;
                for (var i = 0; i < len; i++) {
                  that.gradecardList.push(data.data.items[i]);
                }
              }else{
                that.gradecardList = [];
                that.allLoaded = true;
              }
            }else{
              MessageBox('提示', data.message);
            }
          }
        })
      },
      loadBottom: function(){
        if (this.gradecardList.length < this.page.count) {
          this.handleGetList();
        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
</script>
<style lang="less">
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
