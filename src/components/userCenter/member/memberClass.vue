<template>
    <div class="member-class">
      <router-link tag="p" class="title" to="/member">
        包年卡
        <p class="triangle"></p>
      </router-link>
      <mt-cell title="价格" value="￥888"></mt-cell>
      <mt-cell title="可选类型" value="星标1件，非星标1件"></mt-cell>
      <mt-cell title="有效期" label="第一次收到玩具开始计时" value="12个月"></mt-cell>
      <mt-cell title="免费配送" value="N次"></mt-cell>
      <mt-cell title="更换次数" value="N次"></mt-cell>
      <div class="pay">
        <label for="btnPay">￥888</label>
        <input id="btnPay" type="button" value="购买">
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          memberList: [
            "包年卡","包月卡","VIP卡"
          ]
        }
      }
    }
</script>
<style lang="less">
.member-class{
  .title{
    width: 100%;
    height: 8rem;
    font-size: 0.8rem;
    line-height: 8rem;
    background-color: #e1e1e1;
    border-bottom: 1px solid #ffffff;
    margin-bottom: 30px;
    position: relative;
    .triangle{
      width: 0;
      height: 0;
      border-left:1rem solid transparent;
      border-right:1rem solid transparent;
      border-top:1rem solid #e1e1e1;
      margin:0 auto;
    }
  }
  .pay{
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    height: 2rem;
    padding-right: 1rem;
    border-top:1px solid #e1e1e1;
    line-height: 2rem;
    text-align: right;
    font-size: 0.8rem;
    color:#1b6d85;
    #btnPay{
      margin-left: 1rem;
    }
  }
}

</style>
