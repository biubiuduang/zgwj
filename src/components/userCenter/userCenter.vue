<template>
    <div>
      <mt-cell title="" is-link class="user-header" to="/userCenter/info">
        <span>个人设置</span>
        <img slot="icon" class="user-avatar" :src="userInfo.user_avatar" width="60" height="60">
      </mt-cell>
      <mt-cell title="普通用户" is-link to="/member">
        <span>成为会员,享租更实惠</span>
      </mt-cell>
      <mt-cell title="会员权限" is-link to="/memberInfo">
        <span>查看会员权利</span>
      </mt-cell>
      <mt-cell title="我的订单" is-link to="/order">
        <span>订单状态</span>
      </mt-cell>
      <mt-cell title="我的收藏" is-link to="/collect">
        <span>已收藏0个</span>
      </mt-cell>
      <mt-cell title="我的卡券" is-link to="/coupon">
      </mt-cell>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          userInfo:{}
        }
      },
      activated() {
        this.handleUserInfo();
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
              }
            }
          })
        }
      }

    }
</script>
<style lang="less">
.user-avatar{
  border-radius: 50%;
}
</style>
