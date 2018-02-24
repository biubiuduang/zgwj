<template>
    <div>
      <div class="swipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item>1</mt-swipe-item>
          <mt-swipe-item>2</mt-swipe-item>
          <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="detail-info">
        <p class="title">玩具名称玩具名称玩具名称玩具名称玩具名称</p>
        <p class="age-info"><span class="is-stars">星标玩具</span><span class="age">适用年龄</span></p>
        <div class="info-img">

        </div>
      </div>
      <div class="handle">
        <a href="javascript:void(0);" class="collect">收藏</a>
        <a href="javascript:void(0);" class="shopping">加入购物车</a>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {

        }
      },
      activated() {
        this.getId();
      },
      methods: {
        getId: function(){
          console.log(this.$route.params.id);
        },
        handleBack: function(){
          $("#go").click(function(){

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
      }
    }
  }
</style>
