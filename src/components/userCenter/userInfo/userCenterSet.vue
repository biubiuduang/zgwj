<template>
    <div class="userCenter">
      <mt-cell title="" class="user-header">
        <span>{{info.user_nickname}}</span>
        <img slot="icon" :src="info.user_avatar" width="60" height="60">
      </mt-cell>
      <mt-cell title="宝宝信息" icon="nav" is-link to="/userCenter/babyInfo">
        <span v-if="info.baby_name == ''">未设置</span>
        <span v-else>已设置</span>
      </mt-cell>
      <mt-cell title="我的地址" icon="location" is-link to="/userAddress">
        <span></span>
      </mt-cell>
      <mt-cell title="绑定手机" icon="phone">
        <span>{{info.user_mobile}}</span>
      </mt-cell>
      <input class="exit" type="button" value="退出登录" @click="handleLogOut" />
    </div>
</template>
<script>
    export default {
      props: {
        info: Object
      },
      data(){
        return {

        }
      },
      activated(){

      },
      methods: {
        handleLogOut: function(){
          localStorage.setItem("token","");
          this.$router.push("/index");
        }
      }
    }
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
