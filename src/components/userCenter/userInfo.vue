<template>
    <div class="padding-top">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <keep-alive>
        <router-view :info="userInfo" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>

      <router-view :info="userInfo" v-if="!$route.meta.keepAlive"></router-view>
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
              if(data.data.baby_sex == "unselect"){
                that.userInfo.baby_sex = '';
              }
            }
          }
        })
      }
    }

  }
</script>
<style>

</style>
