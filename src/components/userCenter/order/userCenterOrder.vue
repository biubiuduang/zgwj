<template>
    <div>
      <div v-if="orderNormal" class="order-normal flex-center">
        <router-link tag="p" to="/list">去挑选玩具 >></router-link>
      </div>
      <template v-else>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul class="order-list">
            <li v-for="item in orderList">
              <p class="order-number">订单号:{{item.order_no}} <span>{{item.order_status_name}}</span></p>
              <div class="order-goods-list" v-for="goods in item.goods_items">
                <div class="pv-img">
                  <p class="img-box flex-center">
                    <img src="/static/img/36icons-Home.9cf4650.png" alt="">
                  </p>
                </div>
                <div class="pv-info">
                  <p class="p-title">{{goods.goods_name}}</p>
                  <div class="info-msg">
                    <p class="is-stars" v-if="goods.is_star == 1">星标玩具</p>
                    <p class="is-stars" v-else>非星标玩具</p>
                    <p class="is-ages" v-if="goods.goods_status == 1">租借中</p>
                    <p class="is-ages" v-else-if="goods.goods_status == 2">归还中</p>
                    <p class="is-ages" v-else>已归还</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <p class="loading-bottom" v-if="allLoaded == true">没有更多数据了.</p>
        </mt-loadmore>
      </template>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          orderNormal: true,
          orderList: [],
          allLoaded : false,
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
              if(data.status == 200){
                if(data.data.items != undefined){
                  that.orderNormal = false;
                  that.orderList = data.data.items;

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
                alert(data.message);
              }
            }
          })
        },
        loadBottom: function(){
          if(this.allLoaded == false){
            this.handleOrderList();
          }
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
      .order-goods-list{
        overflow: hidden;
        margin:10px auto;
      }
      .pv-img{
        width: 6rem;
        height: 6rem;
        float:left;
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
          margin:0.5rem 0 2.1rem 0;
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
        .info-msg{
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
