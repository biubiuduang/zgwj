<template>
    <div class="userCenter">
      <p class="member-info"></p>
      <mt-cell title="会员类型" :value="userInfo.card_name"></mt-cell>
      <mt-cell title="剩余天数" :value="userInfo.remain_duration+'天'"></mt-cell>
      <mt-cell title="会员权限" :value="'星标'+remainRules.star_toys_count_pertime+'件,常规'+remainRules.normal_toys_count_pertime+'件'"></mt-cell>
      <mt-cell v-if="remainStatus == true" title="会员状态" is-link value="暂停" to="/userCenter/memberState"></mt-cell>
      <mt-cell v-else title="会员状态" is-link value="开启" to="/userCenter/memberState"></mt-cell>
    </div>
</template>
<script>
    export default {
      data() {
        return{
          userInfo :{},
          remainRules: {},
          remainStatus: false
        }
      },
      activated() {
        this.handleGetInfo();
      },
      methods: {
        handleGetInfo: function(){
          var that = this;
          this.newAjax({
            url: "user/get_profile",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              if(data.status == 200){
                if(data.data.gradecard == undefined){

                }else{
                  that.userInfo = data.data.gradecard;
                  that.remainRules = data.data.gradecard.remain_rules;
                  if(data.data.gradecard.paused_at != 0 && data.data.gradecard.unpaused_at == 0){
                    that.remainStatus = true;
                  }
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
