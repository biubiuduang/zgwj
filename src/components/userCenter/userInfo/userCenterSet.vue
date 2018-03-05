<template>
    <div>
      <mt-cell title="" class="user-header">
        <span>{{info.user_nickname}}</span>
        <img slot="icon" :src="info.user_avatar" width="60" height="60">
      </mt-cell>
      <mt-cell title="宝宝信息" is-link to="/userCenter/babyInfo">
        <span v-if="info.baby_name == ''">未设置</span>
        <span v-else>已设置</span>
      </mt-cell>
      <mt-cell title="我的地址" is-link to="/userAddress">
        <span>未设置</span>
      </mt-cell>
      <mt-cell title="绑定手机">
        <span>{{info.user_mobile}}</span>
      </mt-cell>
      <input class="exit" type="button" value="退出登录" />
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
