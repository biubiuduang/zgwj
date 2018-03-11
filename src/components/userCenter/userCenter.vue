<template>
    <div class="userCenter">
      <div class="user-limit">
        <mt-cell :title="userInfo.user_nickname" is-link class="user-header" to="/userCenter/info">
          <span>个人设置</span>
          <img slot="icon" class="user-avatar" :src="userInfo.user_avatar" width="60" height="60">
        </mt-cell>
        <mt-cell v-if="userLV == '普通用户'" icon="common" title="普通用户" is-link to="/member">
          <span>成为会员,享租更实惠</span>
        </mt-cell>
        <mt-cell v-else :title="userLV" icon="vip" is-link to="/userCenter/memberInfo">
          <span>查看会员权利</span>
        </mt-cell>
        <mt-cell title="会员购买记录" icon="viporder" is-link to="/userCenter/memberOrder">
          <span></span>
        </mt-cell>
      </div>
      <div class="user-expense">
        <mt-cell title="我的订单" icon="order" is-link to="/order">
          <span>订单状态</span>
        </mt-cell>
        <mt-cell title="我的收藏" icon="collect" is-link to="/collect">
          <span>已收藏{{collectCount}}个</span>
        </mt-cell>
        <mt-cell title="我的卡券" icon="coupon" is-link to="/coupon">
        </mt-cell>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          userInfo:{},
          collectCount: 0,
          userLV: "普通用户"
        }
      },
      activated() {
        this.handleUserInfo();
        this.handleCollectCount();
      },
      methods: {
        handleUserInfo: function(){
          var that = this;
          this.newAjax({
            url: "user/get_profile",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                that.userInfo = data.data;
                if(data.data.gradecard == undefined){
                  that.userLV = "普通用户"
                }else{
                  that.userLV = data.data.gradecard.card_name+"会员"
                }
              }
            }
          })
        },
        handleCollectCount: function(){
          var that = this;
          this.newAjax({
            url: "user/get_collects",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                if(data.data.items == undefined){
                  that.collectCount = 0;
                }else{
                  if(data.data.page.count < 100){
                    that.collectCount = data.data.page.count;
                  }else{
                    that.collectCount = "99+";
                  }
                }
              }else{
                that.collectCount = 0;
              }
            }
          })
        },
      }

    }
</script>
<style scoped lang="less">
  .mint-cell{
    background-color: #ffffff;
  }
  .user-limit{
    margin-bottom:0.5rem;
  }
.user-avatar{
  border-radius: 50%;
}
</style>
