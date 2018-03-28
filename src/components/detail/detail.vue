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
          <div class="collect" @click="handleCollect(details.goods_id)">
            <p><i class="iconfont icon-collect" :class="collectStatus == true?'red':''"></i></p>
            <p>收藏</p>
          </div>
        </div>
        <p class="age-info">
          <span class="is-stars">
            <span v-if="details.is_star == 1">星标玩具</span>
            <span v-else>非星标玩具</span>
          </span>
          <span class="age">{{details.age_name}}</span>
        </p>
        <div class="info-img">

        </div>
      </div>
      <div class="handle">
        <input type="button" v-if="details.goods_number == 0" class="appointment"  @click="handleAppointment(details.goods_id)" value="预约玩具" />
        <input type="button" v-else  @click="handleAddCar(details.goods_id)" value="加入购物车" />
      </div>
    </div>
</template>
<script>
    import { Toast, MessageBox } from 'mint-ui';
    export default {
      data() {
        return {
          details: {},
          collectStatus: false
        }
      },
      activated() {
        this.handleDetail();
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
        }
      }
    }
</script>
<style lang="less">
  .detail{
  .swipe{
    margin-top:2rem;
    height: 18rem;
    width: 100%;
    background-color: #d8d8d8;
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
    margin:0.5rem auto;
    text-align: left;
    .title-info{
      padding:0 0.7rem;
      height: 2.4rem;
      overflow: hidden;
      .title{
        float:left;
        height: 2.4rem;
        font-size: 0.8rem;
        width: 14rem;
        line-height: 1.2rem;
        color:#3e3e3e;
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
      .collect{
        float: right;
        width: 2.6rem;
        text-align: right;
        color:#979797;
        font-size: 0.6rem;
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
      font-size: 0.6rem;
      padding: 0 0.7rem;
      margin:0.2rem 0 1rem 0;
      color:#3e3e3e;
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
    height: 2.5rem;
    input{
      background-color: #2396FF;
      color:#ffffff;
      box-sizing: border-box;
      float:left;
      height:2.5rem;
      width: 100%;
      line-height:2.5rem;
      font-size: 0.8rem;
      display:block;
      &.appointment{
        background-color: #FF8938;
       }
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
