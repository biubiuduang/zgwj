<template>
  <div class="address padding-top userAddr">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <p class="title"></p>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="address-form">
      <el-form-item label="登录密码:" prop="pwd">
        <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码确认:" prop="pwd2">
        <el-input type="password" v-model="ruleForm2.pwd2" auto-complete="off"></el-input>
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
        if (len < 6 ) {
          callback(new Error('请输入六位以上密码.'));
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
                message: '修改失败',
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
    padding-right: 2rem;
  }
  .userAddr{
  .title{
    line-height: 50px;
    text-indent:2rem;
    font-size: 0.8rem;
    text-align: left;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 22px;
  }
  }
  .el-input__inner{
    border:none;
    border-bottom: 1px solid #dcdcdc;
  }
  .el-form-item__content{
    text-align: left;
  }
  .enter-box .el-form-item__content{
    position: absolute;
    bottom: 1rem;
    left:0;
    width: 100%;
    text-align: center;
    margin-left:0 !important;
  .el-button{
    width: 80%;
  }
  }
</style>
