<template>
    <div class="member-class padding-top">
      <p class="backNav" >
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <router-link tag="p" class="title" to="/member"
                   :style="{ backgroundImage: 'url(' + memberInfo.card_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"
      >
        {{memberInfo.card_name}}
        <!--<p class="triangle"></p>-->
      </router-link>
      <mt-cell title="价格" :value="'￥'+memberInfo.card_price"></mt-cell>
      <mt-cell title="可选类型" :value="'星标'+cardRules.star_toys_count_pertime+'件，非星标'+cardRules.normal_toys_count_pertime+'件'"></mt-cell>
      <mt-cell title="有效期" label="第一次收到玩具开始计时" :value="memberInfo.card_duration"></mt-cell>
      <mt-cell title="免费配送" :value="cardRules.express_times+'次'"></mt-cell>
      <mt-cell title="更换次数" :value="cardRules.toys_total_count+'次'"></mt-cell>
      <div class="pay">
        <p>乐享价:￥{{memberInfo.card_price}}</p>
        <input id="btnPay" type="button" @click="handleHref" value="购买">
      </div>
    </div>
</template>
<script>

    import wx from 'weixin-js-sdk'
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
        },
        handleBuy: function(){
          var that = this;
          this.newAjax({
            url:"order/buy_card",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              card_id: this.$route.query.id
            },
            success: function(data){
              console.log(data);
              //alert(data.data.jsApiParametersArray.appId);
//              wx.config({
//                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                appId: data.data.jsApiParametersArray.appId, // 必填，公众号的唯一标识
//                timestamp: data.data.jsApiParametersArray.timeStamp, // 必填，生成签名的时间戳
//                nonceStr: data.data.jsApiParametersArray.nonceStr, // 必填，生成签名的随机串
//                signature: data.data.jsApiParametersArray.paySign,// 必填，签名
//                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
//              });
//              alert('config end  ready start');
//              wx.ready(function(){
//                wx.chooseWXPay({
//                  appId: data.data.jsApiParametersArray.appId,
//                  timestamp: data.data.jsApiParametersArray.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//                  nonceStr: data.data.jsApiParametersArray.nonceStr, // 支付签名随机串，不长于 32 位
//                  package: data.data.jsApiParametersArray.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//                  signType: data.data.jsApiParametersArray.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//                  paySign: data.data.jsApiParametersArray.paySign, // 支付签名
//                  success: function (res) {
//// 支付成功后的回调函数
//                    alert(res);
//                    console.log(res);
//                  }
//                });
//              });
              function onBridgeReady(){
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId":data.data.jsApiParametersArray.appId,     //公众号名称，由商户传入
                    "timeStamp":data.data.jsApiParametersArray.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":data.data.jsApiParametersArray.nonceStr, //随机串
                    "package":data.data.jsApiParametersArray.package,
                    "signType":data.data.jsApiParametersArray.signType,         //微信签名方式：
                    "paySign":data.data.jsApiParametersArray.paySign //微信签名
                  },
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      alert(res)
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                  }
                );
              }
              if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              }else{
                onBridgeReady();
              }
            }
          })
        },
        handleHref: function(){
          window.location.href = "http://toysbox-api.3vlogic.com/order/buy_card?card_id="+this.$route.query.id+"&token="+localStorage.getItem("token");
        }
      }
    }
</script>
<style lang="less">

  @import "../../../assets/css/parameters.less";
.member-class{
  .title{
    width: 100%;
    height: 8rem;
    font-size: 1rem;
    line-height: 8rem;
    background-color: #e1e1e1;
    margin-bottom: 30px;
    position: relative;
    color:#ffffff;
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
    width: 100%;
    height: 2rem;
    padding: 0 1rem;
    line-height: 2rem;
    font-size: 0.8rem;
    margin-top:0.8rem;
    p{
      text-align: center;
      font-size: 1rem;
      color:@primary-color;
      width: 100%;
      font-weight: 800;
    }
    #btnPay{
      width: 100%;
      height: 2rem;
      color:#ffffff;
      font-size: 1rem;
      line-height: 2rem;
      background-color: @blue;
      border-radius: 1rem;
      margin-top:0.4rem;
    }
  }
}

</style>
