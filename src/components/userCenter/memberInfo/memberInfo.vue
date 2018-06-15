<template>
    <div class="userCenter padding-top">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <p class="member-info"></p>
      <mt-cell title="会员类型" :value="userInfo.card_name"></mt-cell>
      <mt-cell title="剩余天数" :value="userInfo.remain_duration"></mt-cell>
      <mt-cell title="物流次数" :value="userInfo.remain_rules.express_times+'次'"></mt-cell>
      <mt-cell title="会员权限" :value="'星标'+remainRules.star_toys_count_pertime+'件,常规'+remainRules.normal_toys_count_pertime+'件'"></mt-cell>
      <mt-cell v-if="remainStatus == true" title="会员状态" is-link value="暂停" to="/userCenter/memberState"></mt-cell>
      <mt-cell v-else title="会员状态" is-link value="开启" to="/userCenter/memberState"></mt-cell>
      <template v-if="canAddPolicy == 1">
        <mt-cell title="赠送保险" v-if="insureStatus == 0" is-link value="查看" to="/userCenter/insureForm"></mt-cell>
        <mt-cell title="赠送保险" v-else-if="insureStatus == 1" to="/userCenter/memberInfo" value="已投保" ></mt-cell>
        <mt-cell title="赠送保险" v-else-if="insureStatus == 2" to="/userCenter/memberInfo"  value="投保成功"></mt-cell>
      </template>
    </div>
</template>
<script>
    export default {
      data() {
        return{
          userInfo :{},
          remainRules: {},
          remainStatus: false,
          insureStatus: 0,
          canAddPolicy: 0,
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
                console.log(data);
                if(data.data.gradecard != undefined){
                  that.handleInsureStatus(data.data.gradecard.user_card_id);
                  that.userInfo = data.data.gradecard;
                  that.canAddPolicy = data.data.gradecard.remain_rules.can_add_policy;
                  that.remainRules = data.data.gradecard.remain_rules;
                  if(data.data.gradecard.paused_at != 0 && data.data.gradecard.unpaused_at == 0){
                    that.remainStatus = true;
                  }
                }

              }
            }
          })
        },
        handleInsureStatus: function(val){
          var that = this;
          this.newAjax({
            url: "user/get_policy",
            data: {
              user_card_id: val
            },
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              if(data.status == 200){
                console.log(data);
                that.insureStatus = data.data.status
              }else{
                alert(data.message)
              }
            }
          })
        }
      }
    }
</script>
<style>

</style>
