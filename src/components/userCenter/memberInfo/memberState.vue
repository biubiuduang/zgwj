<template>
    <div class="member-state padding-top">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <p class="state-pause" v-if="remainStatus == false">您已暂停会员{{pauseDate}}天</p>
      <div class="state-box">
        <p class="title">
          年卡会员暂停权利:
        </p>
        <p>1.年卡会员,有一次暂停会员权利,最长30天;</p>
        <p>2.年卡会员在归还所有玩具时暂停会员,您的会员时间会因此顺延;</p>
        <p>3.暂停后30内可以手动恢复;</p>
        <p>4.暂停后30天会自动恢复.</p>
        <template>
          <input v-if="remainStatus == true" type="button" @click="handlePaused('pause')" value="暂停" />
          <input v-else type="button" value="恢复" @click="handlePaused('unpause')" />
        </template>
      </div>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
    export default {
      data() {
        return {
          userInfo:{},
          remainRules: {},
          remainStatus: true,
          pauseDate: 0
        }
      },
      activated(){
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
                that.userInfo = data.data.gradecard;
                that.remainRules = data.data.gradecard.remain_rules;
                if(data.data.gradecard.paused_at != 0 && data.data.gradecard.unpaused_at == 0){
                  that.remainStatus = false;
                  var pausedDate = new Date(data.data.gradecard.paused_at);
                  var nowDate = new Date();
                  that.pauseDate = Math.floor((nowDate.getTime() - pausedDate.getTime())/(1000*60*60*24));
                }else{
                  that.remainStatus == true;
                }
              }
            }
          })
        },
        //暂停 / 开启
        handlePaused: function(key){
          var that = this;
          this.newAjax({
            url: "user/handle_gradecard",
            method : "POST",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              user_card_id: that.userInfo.user_card_id,
              handle_type: key
            },
            success: function(data){
              MessageBox({
                title: '提示',
                message: data.message,
              }).then(action => {
                that.$router.push({path:'/userCenter/memberInfo'});
              });
            }
          })
        }
      }
    }
</script>
<style scoped lang="less">
  .member-state{
    background-color: #ffffff;
    text-align: left;
  }
  .state-pause{
    line-height: 2.5rem;
    text-indent:2rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #e1e1e1;
  }
  .state-box{
    padding: 0 1rem;
    p{
      font-size: 0.7rem;
      line-height: 1rem;
      &.title{
         font-size: 0.8rem;
         line-height: 2.5rem;
       }
    }
    input{
      width: 80%;
      font-size: 14px;
      padding: 12px;
      color: #fff;
      background-color: #409EFF;
      border-color: #409EFF;
      border-radius: 5px;
      margin:2rem 0 0 10%;
    }
  }

</style>
