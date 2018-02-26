<template>
    <div>
      <mt-cell title="" is-link class="user-header" to="/userCenterSet">
        <span>个人设置</span>
        <img slot="icon" src="/static/img/36icons-Home.9cf4650.png" width="60" height="60">
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
    export default {}
</script>
<style lang="less">

</style>
