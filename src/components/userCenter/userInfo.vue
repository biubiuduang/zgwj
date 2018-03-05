<template>
    <div>
      <keep-alive>
        <router-view :info="userInfo"></router-view>
      </keep-alive>
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
<style>

</style>
