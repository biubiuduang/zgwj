<template>
    <div>
      <div class="swipe">
        <mt-swipe :auto="4000">
          <template v-for="item in details.goods_images">
            <mt-swipe-item class="detail-swipe-item" :style="{'background-image':'url('+ item.image_url +')','background-repeat':'no-repeat','background-size':'cover','background-position':'center'}"></mt-swipe-item>
          </template>
        </mt-swipe>
      </div>
      <div class="detail-info">
        <p class="title">{{details.goods_name}}</p>
        <p class="age-info">
          <span class="is-stars">
            <span v-if="details.is_star == 1">星标玩具</span>
            <span v-else>非星标玩具</span>
          </span>
          <span class="age">{{details.age_name}}</span>
        </p>
        <div class="info-img">
          {{details.goods_desc}}
        </div>
      </div>
      <div class="handle">
        <a href="javascript:void(0);" class="collect" @click="handleCollect(details.goods_id)">收藏</a>
        <a href="javascript:void(0);" class="shopping"
           :class="details.on_sale == 0 ? 'disable' : ''"
           @click="handleAddCar(details.goods_id)"
        >加入购物车</a>
      </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default {
      data() {
        return {
          details: {}
        }
      },
      activated() {
        this.handleDetail();
      },
      methods: {
        //获取详情
        handleDetail: function(){
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
                  alert("获取产品详情失败.");
                  that.$router.push("/list");
                }else{
                  that.details = data.data;
                }
              }else{
                alert(data.message);
                that.$router.push("/list");
              }
            },
            error: function(){
              alert("获取产品详情失败.");
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
        handleCollect: function(id){
          var that = this;
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
</script>
<style scoped lang="less">
  .swipe{
    height: 10rem;
    width: 100%;
    .mint-swipe-item{
      background-color: #999999;
    }
    .detail-swipe-item{
      width: 100%;
      height: 100%;
    }
  }
  .detail-info{
    width: 100%;
    padding:0 10px;
    text-align: left;
    p{
      line-height: 40px;
    }
    .age-info{
      width: 100%;
      overflow: hidden;
      span{
        display: block;
        float: left;
        &.age{
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
    height: 50px;
    a{
      border-radius: 5px;
      background-color: #cccccc;
      color:#ffffff;
      border:1px solid #000000;
      box-sizing: border-box;
      float:left;
      height:50px;
      line-height:50px;
      display:block;
      &.collect{
        width: 30%;
      }
      &.shopping{
        width: 70%;
        &.disable{
           background-color: red;
         }
      }
    }
  }
</style>
