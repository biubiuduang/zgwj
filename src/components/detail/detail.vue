<template>
    <div class="padding-box detail">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <div class="swipe">
        <mt-swipe :auto="4000">
          <template v-for="item in details.goods_images">
            <mt-swipe-item class="detail-swipe-item" :style="{'background-image':'url('+ item.image_url +')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}"></mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <div class="detail-info">
        <div class="title-info">
          <p class="title">{{details.goods_name}}</p>
          <p class="money">吊牌价:{{details.goods_price}}</p>
        </div>
        <p class="age-info">
          <span class="is-stars">
            <span v-if="details.is_star == 1">星标玩具</span>
            <span v-else>非星标玩具</span>
          </span>
          <span class="age">{{details.age_name}}</span>
        </p>
      </div>

      <mt-navbar v-model="selected" class="detail-navbar">
        <mt-tab-item id="1">
          <p>玩具详情</p>
        </mt-tab-item>
        <mt-tab-item id="2">
          <p>评价(0)</p>
        </mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="info-img">

          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2" class="evaluate">
          <p></p>
        </mt-tab-container-item>
      </mt-tab-container>

      <div class="handle">
        <div class="function col-xs-4">
          <div class="collect col-xs-6" @click="handleCollect(details.goods_id)">
            <p class="icon-img">
              <img v-if="collectStatus == true" src="../../assets/img/icon/heard.png" alt="">
              <img v-else src="../../assets/img/icon/unheard.png" alt="">
            </p>
            <p>收藏</p>
          </div>
          <div class="collect col-xs-6" @click="handleCollect(details.goods_id)">
            <p class="icon-img"><img src="../../assets/img/icon/kefu.png" alt=""></p>
            <p>客服</p>
          </div>
        </div>
        <div class="btn-box col-xs-8">
          <input type="button" v-if="details.goods_number == 0" class="appointment"  @click="handleAppointment(details.goods_id)" value="预约玩具" />
          <div class="buy" v-else>
            <input type="button" class="col-xs-6 btn-left"  @click="handleGoCar(details.goods_id)" value="加入购物车" />
            <input type="button" class="col-xs-6 btn-right"   @click="handleAddCar(details.goods_id)" value="立即租凭" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    import { Toast, MessageBox } from 'mint-ui';
    export default {
      data() {
        return {
          selected: "1",
          details: {},
          collectStatus: false
        }
      },
      activated() {
        this.handleDetail();
        this.handleCollectState(this.$route.params.id);
      },
      methods: {
        //获取详情
        handleDetail: function(){

          this.collectStatus= false;
          var that = this;
          this.newAjax({
            url: "goods/get_goods",
            data: {
              goods_id: this.$route.params.id
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                if(data.data.length == 0){
                  MessageBox('提示', '获取产品详情失败.');
                  that.$router.push("/list");
                }else{
                  $(".info-img").html(data.data.goods_desc);
                  that.details = data.data;
                }
              }else{
                MessageBox('提示', data.message);
                that.$router.push("/list");
              }
            },
            error: function(){
              MessageBox('提示', '获取产品详情失败.');
              that.$router.push("/list");
            }
          })
        },
        //加入购物车
        handleAddCar: function(id){
          var that = this;
          if(this.details.on_sale == 1){
            that.newAjax({
              url: "order/add_carts",
              method: "POST",
              header: {
                Accept: "application/json; charset=utf-8",
                token: localStorage.getItem("token")
              },
              data: {
                goods_id: id
              },
              success: function(data){
                that.$router.push("/shoppingCar");
              }
            })
          }
        },
        handleGoCar: function(id){
          var that = this;
          if(this.details.on_sale == 1){
            that.newAjax({
              url: "order/add_carts",
              method: "POST",
              header: {
                Accept: "application/json; charset=utf-8",
                token: localStorage.getItem("token")
              },
              data: {
                goods_id: id
              },
              success: function(data){
                console.log(data);
                if(data.status == 200){
                  Toast({
                    message: '加入成功',
                    iconClass: 'mintui mintui-success',
                    duration: 2000
                  });
                }else{
                  Toast({
                    message: '加入失败',
                    duration: 2000
                  });
                }
              }
            })
          }
        },
        //预约
        handleAppointment: function(id){
          var that = this;
          that.newAjax({
            url: "user/bookin_goods",
            method: "POST",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              goods_id: id
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                Toast({
                  message: '预约成功',
                  iconClass: 'mintui mintui-success',
                  duration: 2000
                });
              }else{
                Toast({
                  message: '预约失败',
                  duration: 2000
                });
              }
            }
          })
        },
        handleCollect: function(id){
          var that = this;
          if(this.collectStatus == false){
            this.newAjax({
              url: "user/add_collect",
              method: "POST",
              header: {
                Accept: "application/json; charset=utf-8",
                token: localStorage.getItem("token")
              },
              data: {
                goods_id: id
              },
              success: function(data){
                console.log(data);
                if(data.status == 200){
                  that.collectStatus = true;
                  Toast({
                    message: '收藏成功',
                    iconClass: 'mintui mintui-success',
                    duration: 2000
                  });
                }else{
                  Toast({
                    message: '收藏失败',
                    duration: 2000
                  });
                }
              }
            })
          }
        },
        handleCollectState: function(id){
          var that = this;
          this.newAjax({
            url:"user/get_collects",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              start: 0,
              number: 99999999,
            },
            success: function(data){
              if(data.status == 200){
                if(data.data.items != undefined){
                  var len = data.data.items.length;
                  for(var i = 0; i< len; i++){
                    if(data.data.items[i].goods_id === id){
                      that.collectStatus = true;
                      break;
                    }
                  }
                }else{
                  that.collectStatus = false;
                }
              }else{
                that.collectStatus = false;
              }
            }
          })
        },
      }
    }
</script>
<style lang="less">

  @import "../../assets/css/parameters.less";
  .detail{
  background-color:@bg-color;
  .swipe{
    margin-top:2rem;
    height: 18rem;
    width: 100%;
    background-color: #ffffff;
    .mint-swipe-item{
      width: 100%;
      height:18rem;
    }
    .detail-swipe-item{
      width: 100%;
      height: 100%;
    }
  }
  .detail-info{
    width: 100%;
    margin:0 auto 0.7rem auto;
    padding:1rem 0;
    background-color: #ffffff;
    text-align: left;
    .title-info{
      padding:0 0.7rem;
      overflow: hidden;
      .title{
        float:left;
        height: 2.4rem;
        font-size: 0.8rem;
        width: 100%;
        line-height: 1.2rem;
        color:#666666;
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
      .money{
        font-size: 0.9rem;
        margin-top:0.8rem;
        font-weight: 800;
        color:@primary-color;
      }
      .collect{
        float: right;
        width: 2.6rem;
        text-align: right;
        color:#979797;
        font-size: 0.8rem;
        i{
          font-size: 1rem;
          &.red{
            color:#ff0000;
           }
        }
      }
    }
    .age-info{
      width: 100%;
      overflow: hidden;
      font-size: 0.7rem;
      padding: 0 0.7rem;
      margin:0.5rem 0 0 0;
      color:#999999;
      span{
        display: block;
        float: left;
        &.age{
          color:#979797;
          float:right;
        }
      }
    }
  }
  .handle{
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    overflow: hidden;
    background-color: #ffffff;
    height: 2.5rem;
    .function{
      padding:0 10px;
      .col-xs-6{
        padding:0 0;
        p{
          font-size: 0.6rem;
          &.icon-img{
           margin:0.2rem 0;
            img{
              width: 1.2rem;
            }
           }
        }
      }
    }
    .btn-box{
      input{
        background-color: #2396FF;
        color:#ffffff;
        box-sizing: border-box;
        float:left;
        height:2rem;
        line-height:2rem;
        margin-top:0.25rem;
        font-weight: 800;
        font-size: 0.7rem;
        display:block;
      &.appointment{
         background-color: @blue;
         width: 100%;
         border-radius: 1rem;
       }
      }
      .btn-left{
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        background-color: @blue;
      }
      .btn-right{
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        background-color: @assist-color;
      }
    }
  }
  .detail-navbar{
    margin-bottom: 5px;
    p{
      font-size: 0.8rem;
    }
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: none;
    color:@blue;

      &:after{
          content: " ";
          display: block;
          border-radius: 2px;
          height: 4px;
          background-color: @blue;
          width: 2rem;
          margin:6px auto 0 auto;
       }
  }
  .evaluate{
    width: 100%;
    p{
      width: 100%;
      height: 18rem;
      background: url("../../assets/img/icon/null.png") center no-repeat #ffffff;
      background-size: 18rem 18rem;
    }
  }
  .info-img{
    width:100%;
    p{
      width: 100%;
    }
    img{
      width: 100%;
    }
  }
  }
</style>
