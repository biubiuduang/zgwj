<template>
    <div class="member-class">
      <router-link tag="p" class="title" to="/member">
        {{memberInfo.card_name}}
        <p class="triangle"></p>
      </router-link>
      <mt-cell title="价格" :value="'￥'+memberInfo.card_price"></mt-cell>
      <mt-cell title="可选类型" :value="'星标'+cardRules.star_toys_count_pertime+'件，非星标'+cardRules.normal_toys_count_pertime+'件'"></mt-cell>
      <mt-cell title="有效期" label="第一次收到玩具开始计时" :value="memberInfo.card_duration"></mt-cell>
      <mt-cell title="免费配送" :value="cardRules.express_times+'次'"></mt-cell>
      <mt-cell title="更换次数" :value="cardRules.toys_total_count+'次'"></mt-cell>
      <div class="pay">
        <label for="btnPay">￥{{memberInfo.card_price}}</label>
        <input id="btnPay" type="button" value="购买">
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          memberInfo: {},
          cardRules: {},
          starCount:'',
          normalCount: ''
        }
      },
      activated(){
        this.handleInfo();
      },
      methods: {
        handleInfo : function(){
          var that = this;
          this.newAjax({
            url:"user/get_gradecard",
            data: {
              card_id: this.$route.query.id
            },
            success: function(data){
              console.log(data);
              that.memberInfo = data.data;
              that.cardRules = data.data.card_rules;
            }
          })
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
