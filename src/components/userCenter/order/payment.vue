<template>
  <div class="page-loadmore payment">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <div class="normal flex-center" v-if="listShow == false">
        <p>没有购买记录,
        <router-link to="/member">购买会员 ></router-link></p>
      </div>
      <mt-loadmore v-else :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list payment-list">
          <template v-for="item in payList">
            <li class="page-loadmore-listitem">
              <div class="title">
                <p>交易流水号:{{item.trade_no}}</p>
                <p class="status" v-if="item.is_paid == 1">已支付</p>
                <p class="status" v-if="item.is_paid == 0">未支付</p>
                <p class="status" v-if="item.is_paid == 2">支付关闭</p>
              </div>
              <div class="info">
                <p><span>物品名称 ：</span>{{item.card_name}}</p>
                <p><span>物品金额 ：</span>{{item.need_money}}</p>
                <p><span>购买时间 ：</span>{{item.created_at}}</p>
                <p><span>支付时间 ：</span>{{item.paid_at}}</p>
                <input v-if="item.is_paid == 0" type="button" @click="btnPay(item.card_id)"  value="支付" />
              </div>
            </li>
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

<script type="text/babel">
  export default {
    data() {
      return {
        payList: [],
        page:{
          start: 0,
          count: 0,
        },
        listCount: 0,
        listShow: false,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0
      };
    },

    methods: {
      btnPay: function(id){
        window.location.href = "http://api.xwkj2018.com/order/buy_card?card_id="+id+"&token="+localStorage.getItem("token");
      },
      handleInit: function(){
        var that = this;
        this.page.start = 0;
        this.payList = [];
        this.newAjax({
          url: 'user/get_payhistories',
          data: {
            start: that.page.start
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function (data) {
            if (data.status == 200) {
              if (data.data.items != undefined) {

                console.log(data);

                that.listShow = true;
                var len = data.data.items.length;
                for (var i = 0; i < len; i++) {
                  that.payList.push(data.data.items[i]);
                }
                that.page.count = data.data.page.count;
                that.allLoaded = false;
              } else {
                that.payList = [];
                that.allLoaded = true;
              }
            } else {
              that.allLoaded = true;
            }
          }
        })
      },
      handleMore: function(){
        var that = this;

        this.page.start = this.payList.length;
        this.newAjax({
          url: 'user/get_payhistories',
          data: {
            start: that.page.start
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function (data) {
            if (data.status == 200) {
              if (data.data.items != undefined) {
                console.log(data);
                var len = data.data.items.length;
                for (var i = 0; i < len; i++) {
                  that.payList.push(data.data.items[i]);
                }
              } else {
                that.payList = [];
                that.allLoaded = true;
              }
            } else {
              that.allLoaded = true;
            }
          }
        })

      },
      loadBottom() {
        if (this.payList.length < this.page.count) {
          this.handleMore();

        } else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();

      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    },

    created() {
      this.handleInit();
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>

<style lang="less">
  .payment{
    .page-loadmore-wrapper{
      padding-top: 2rem;
    }
    .normal{
      height: 100%;
      line-height: 100%;
      font-size: 1rem;
      a{
        color:#2e6da4;
      }
    }
    .payment-list{
      li{
        background-color: #ffffff;
        text-align: left;
        .title{
          background-color: #f5f5f5;
          overflow: hidden;
          padding:0 0.7rem;
          font-size:0.7rem;
          p{
            height: 1.5rem;
            line-height: 1.5rem;
            float: left;
            &.status{
              float:right;
             }
          }
        }
        .info{
          padding:0.7rem;
          position:relative;
          font-size:0.7rem;
          p{
            line-height: 1rem;
          }
          input{
            width: 3rem;
            height: 1.5rem;
            background-color: #2e6da4;
            color:#ffffff;
            border-radius: 5px;
            position:absolute;
            right: 0.7rem;
            bottom: 0.7rem;
          }
        }
      }
    }
  }
</style>
