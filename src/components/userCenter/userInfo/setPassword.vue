<template>
  <div class="address padding-top userAddr">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <p class="title"></p>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="address-form">
      <el-form-item label="登录密码:" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off" placeholder="请输入8-16位密码"></el-input>
      </el-form-item>
      <el-form-item label="密码确认:" prop="pwd2">
        <el-input type="password" v-model="ruleForm2.pwd2" auto-complete="off" placeholder="请再输入一次密码"></el-input>
      </el-form-item>
      <el-form-item class="enter-box">
        <el-button type="primary" @click="submitForm('ruleForm2')">确 认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  import { Toast } from 'mint-ui';
  export default {
    data() {
      var password = (rule, value, callback) => {
        var len = value.length;
        if (len < 8 ) {
          callback(new Error('请输入8位以上密码.'));
        }else{
          callback();
        }
      };
      var password2 = (rule, value, callback) => {
        if (value !== this.ruleForm2.pwd ) {
          callback(new Error('密码输入不一致,请重新输入.'));
        }else{
          callback();
        }
      };
      return {
        ruleForm2: {
          pwd: '',
          pwd2:''
        },
        rules2: {
          pwd: [
            { validator: password, trigger: 'blur' }
          ],
          pwd2: [
            { validator: password2, trigger: 'blur' }
          ],
        }
      };
    },
    activated(){

    },
    methods: {
      submitForm: function(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.handleSetPwd();
          } else {
            Toast({
              message: '修改失败',
              duration: 2000
            });
            return false;
          }
        });
      },
      handleSetPwd: function(){
        var that = this;
        this.newAjax({
          url: "user/update_profile",
          method: "POST",
          data: {
            user_pass: that.ruleForm2.pwd
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            if(data.status == 200){
              that.addrId = data.data.address_id;
              Toast({
                message: '修改成功',
                iconClass: 'mintui mintui-success',
                duration: 2000
              });
            }else{
              Toast({
                message: 'data.message',
                duration: 2000
              });
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .address-form{
    background-color: #ffffff;
    padding-top:20px;
  .el-input__inner{
    border:none;
  }
  .el-select{
    width: 100%;
  }
  .el-form-item{
    margin-bottom: 20px;
    margin-left: 0.7rem;
    border-bottom: 1px solid #e0e0e0;
  .el-form-item{
    border:none;
  }
  }
  .el-form-item__content{
    text-align: left;
  }
  .el-input{
    width: 80%;
    margin-left:0;
  }
  .el-date-editor--date{
    width: 80% !important;
  }
  .enter-box{
    border:none;
    height: 0;
    margin:0;
  .el-form-item__content{
    position: relative;
    bottom: -2rem;
    width: 100%;
    text-align: center;
    margin-left:0 !important;
  .el-button{
    border-radius: 20px;
    width: 80%;
  }
  }
  }
  }
</style>
