<template>
    <div class="padding-top order">
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <p class="backNav">
          <i class="el-icon-arrow-left" @click="$router.back()"></i>
          {{$store.state.title}}
        </p>
        <mt-navbar v-model="orderSelected" class="order-navbar">
          <mt-tab-item id="waitting">待收货</mt-tab-item>
          <mt-tab-item id="received">租凭中</mt-tab-item>
          <mt-tab-item id="returned">已归还</mt-tab-item>
        </mt-navbar>
        <div v-if="orderNormal" class="order-normal flex-center">
          <router-link tag="p" to="/list">去挑选玩具 >></router-link>
        </div>
        <mt-loadmore v-else :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="order-list">
            <li v-for="item in orderList">
              <p class="order-number">订单号:{{item.order_no}} <span>{{item.order_status_name}}</span></p>
              <div class="order-goods-list" v-for="goods in item.goods_items">
                <div class="pv-img flex-center">
                  <p class="img-box" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></p>
                </div>
                <div class="pv-info">
                  <p class="p-title">{{goods.goods_name}}</p>
                  <p class="stars" v-if="goods.is_star == 1">星标玩具</p>
                  <p class="stars" v-else>非星标玩具</p>
                  <div class="info-msg">
                    <p class="is-stars">{{item.created_at}}</p>
                    <p class="is-ages">{{goods.goods_status_name}}</p>
                  </div>
                </div>
              </div>
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
          orderSelected: this.$route.query.order_status? this.$route.query.order_status:"waitting",
          orderNormal: true,
          orderList: [],
          allLoaded : false,
          bottomStatus: '',
          wrapperHeight: 0,
          page:{
            start: 0,
            count: 0
          },
        }
      },
      activated() {
        this.handleInit();
      },
      methods: {
        handleOnload: function(){
          if(this.$route.query.order_status){
            this.orderSelected = this.$route.query.order_status;
          }
        },
        handleInit: function(){

          var that = this;
          this.orderList=[];
          this.page = {
            start: 0,
            count: 0,
          };
          this.newAjax({
            url:"order/get_orders",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              start : that.page.start,
              order_status : that.orderSelected
            },
            success: function(data){
              if(data.status == 200){
                if(data.data.items != undefined){
                  console.log(data);
                  that.orderNormal = false;
                  var len = data.data.items.length;
                  for(var i = 0; i< len; i++){
                    that.orderList.push(data.data.items[i]);
                  }
                  that.page.count = data.data.page.count;
                  that.allLoaded = false;
                }else{
                  that.orderList=[];
                  that.orderNormal = true;
                }
              }else{
                that.allLoaded = true;
                that.orderNormal = true;
                MessageBox('提示', data.message);
              }
            }
          })
        },
        handleOrderList: function(){
          var that = this;
          this.page.start = this.orderList.length;
          this.newAjax({
            url:"order/get_orders",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              start : that.page.start
            },
            success: function(data){
              if(data.status == 200){
                if(data.data.items != undefined){
                  console.log(data);
                  var len = data.data.items.length;
                  for(var i = 0; i< len; i++){
                    that.orderList.push(data.data.items[i]);
                  }
                }
              }else{
                that.allLoaded = true;
                that.orderNormal = true;
                MessageBox('提示', data.message);
              }
            }
          })
        },
        loadBottom: function(){
          if (this.orderList.length < this.page.count) {
            this.handleOrderList();

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
      },
      watch: {
        orderSelected: function (val) {
          // 这里就可以通过 val 的值变更来确定
          this.handleInit();
        }
      }
    }
</script>
<style lang="less">
  @import "../../../assets/css/parameters.less";
  .order{
    background-color: @bg-color;
    padding-top: 4rem;
    .order-navbar{
      height: 2rem;
      line-height: 2rem;
      top:2rem;
      left:0;
      position: fixed;
      width: 100%;
      color:#666666;
      z-index: 2;
      .mint-tab-item-label{
        font-size: 0.7rem;
      }
      .mint-tab-item{
        padding:0.6rem 0;
        &.is-selected{
          border:none;
         .mint-tab-item-label{
          color:@blue;
          &:after{
             content: " ";
             display: block;
             width: 1rem;
             background-color: @blue;
             height:4px;
             margin:5px auto 0 auto;
             border-radius: 2px;
           }
         }
        }
      }

    }
  }
  .order-list{
    .order-number{
      height: 2rem;
      line-height: 2rem;
      background-color: @bg-color;
      font-size: 0.7rem;
      font-weight: 800;
      text-align: left;
      text-indent: 1rem;
      margin:0 -0.7rem;
      span{
        float: right;
        margin-right: 1rem;
      }
    }
    li{
      background-color: #ffffff;
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
          margin:0.96rem 0 0.5rem 0;
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
        .stars{
          font-size: 0.8rem;
          line-height: 1rem;
        }
        .info-msg{
          height: 1rem;
          p{
            font-size: 0.8rem;
            line-height: 1rem;
            &.is-stars{
               float:left;
                color:#c0c0c0;
                font-size: 0.7rem;
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
