<template>
    <div>
      <mt-cell title="" class="user-header">
        <span>昵称</span>
        <img slot="icon" src="/static/img/36icons-Home.9cf4650.png" width="60" height="60">
      </mt-cell>
      <mt-cell title="宝宝信息" is-link to="/babyInfo">
        <span>未设置</span>
      </mt-cell>
      <mt-cell title="我的地址" is-link to="/userAddress">
        <span>未设置</span>
      </mt-cell>
      <mt-cell title="绑定手机">
        <span>13800138000</span>
      </mt-cell>
      <input class="exit" type="button" value="退出登录" />
    </div>
</template>
<script>
    export default {}
</script>
<style>
.exit{
  width: 80%;
  font-size: 14px;
  padding: 12px;
  color: #fff;
  background-color: #409EFF;
  border-color: #409EFF;
  border-radius: 5px;
  position: absolute;
  bottom: 1rem;
  left:10%;
}
</style>
