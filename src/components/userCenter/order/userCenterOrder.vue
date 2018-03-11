<template>
    <div>
      <div v-if="orderNormal" class="order-normal flex-center">
        <router-link tag="p" to="/list">去挑选玩具 >></router-link>
      </div>
      <div v-else class="page-infinite-wrapper" ref="wrapper">
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
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
          orderList: [],
          allLoaded : false,
          bottomStatus: '',
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
        handleInit: function(){
          var that = this;
          this.orderList=[];
          this.allLoaded = false;
          this.page = {
            start: 0,
            count: 0
          };
          that.handleOrderList();
        },
        handleOrderList: function(){
          var that = this;

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
              console.log(data);
              if(data.status == 200){
                if(data.data.items != undefined){
                  that.orderNormal = false;
                  that.orderList = that.orderList.concat(data.data.items);
                  that.page.count = data.data.page.count;
                  if(that.orderList.length == that.page.count){
                    that.allLoaded = true;// 若数据已全部获取完毕
                  }else{
                    that.page.start = that.orderList.length;
                    that.allLoaded = false;
                  }
                }else{
                  this.orderList=[];
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
        loadBottom: function(){
          if(this.allLoaded == false){
            this.handleOrderList();
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
  .order-list{
    .order-number{
      height: 2rem;
      line-height: 2rem;
      background-color: #f5f5f5;
      font-size: 0.7rem;
      text-align: left;
      text-indent: 1rem;
      margin:0 -0.5rem;
      span{
        float: right;
        margin-right: 1rem;
      }
    }
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
