<template>
    <div>
      <div class="logo">
        <img src="../assets/img/Logo.jpg" alt="">
      </div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form">
        <el-form-item  prop="tel">
          <el-input prefix-icon="mintui mintui-phone" v-model.number="loginForm.tel"  clearable></el-input>
        </el-form-item>
        <el-form-item prop="key">
          <el-input class="code" prefix-icon="mintui mintui-code" type="text" v-model="loginForm.key"></el-input>
          <img class="imgCode" :src="captcha.img" alt="" @click="handleGetImgCode">
        </el-form-item>
        <el-form-item prop="psw">
          <el-input prefix-icon="mintui mintui-tel-msg" type="text" v-model="loginForm.psw"></el-input>
          <el-button class="getCode" type="primary" :disabled="telCodeStatus" @click="handleTelCode">{{countBtn}}</el-button>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
    export default {
      data() {
        var checkTel = (rule, value, callback) => {
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            return callback(new Error('请输入11位手机号'));
          }else{
            callback();
          }
        };
        var checkPsw = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('请输入验证码'));
          }else{
            callback();
          }
        };
        return {
          telCodeStatus: false,
          timeCount: 60,
          countBtn: '获取验证码',
          loginForm: {
            tel: '',
            key:'',
            psw: ''
          },
          captcha: {
            key: '',
            img: ''
          },
          rules: {
            tel: [
              { validator: checkTel, trigger: 'blur' }
            ],
            key: [
              { validator: checkPsw, trigger: 'blur' }
            ],
            psw: [
              { validator: checkPsw, trigger: 'blur' }
            ]
          }
        }
      },
      activated() {
        this.handleGetImgCode();
      },
      methods: {
        handleGetImgCode: function () {
          var that = this;
          this.newAjax({
            url: "common/get_verifycode",
            success: function(data){
              that.captcha.key = data.data.captcha_key;
              that.captcha.img = data.data.captcha_img;
            }
          })
        },
        handleTelCode: function() {
          var that = this;
          if(this.loginForm.tel == ''){
            MessageBox('提示', '请输入手机号!');
            return;
          }else if(this.loginForm.key == ''){
            MessageBox('提示', '请输入图形验证码');
            return;
          }else{
            that.telCodeStatus = true;
            that.newAjax({
              url: 'common/get_sms',
              data:{
                mobile: that.loginForm.tel,
                captcha_key: that.captcha.key,
                captcha_value: that.loginForm.key
              },
              success: function(data){
                if(data.status == 200){
                  that.countDown(that.timeCount);
                }else{
                  that.loginForm.key = '';
                  MessageBox('提示', '获取短信失败,请重新获取.');
                }
              }
            })
          }
        },
        countDown: function(t){
          var that = this;
          var setTime;
          if(t == 0){
            this.telCodeStatus = false;
            this.countBtn = '获取验证码';
            this.timeCount = 60;
            clearTimeout(setTime);
          }else{
            this.countBtn = t+"s";
            t--;
            setTime = setTimeout(function() {
                that.countDown(t)
              },
              1000)

          }
        },
        submitForm: function(formName) {
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.newAjax({
                url: "user/login_sms",
                method: "POST",
                data: {
                  mobile: that.loginForm.tel,
                  sms_code: that.loginForm.psw
                },
                success: function(data){
                  console.log(data);
                  if(data.status == 200){
                    localStorage.setItem("token",data.data.token);
                    that.$store.commit('setLogin',true);
                    that.$router.go(-1);
                  }else{
                    MessageBox('提示', data.message);
                  }
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },

      }
    }
</script>
<style lang="less">
  .logo{
    width: 100%;
    overflow:hidden;
    img {
      display: block;
      margin:2rem auto;
      width: 5rem;
    }
  }
  .login-form{
    padding: 0 1.92rem;
    color:#2396FF;
    .el-input__inner{
      border-radius: 0;
      height: 2rem;
      border: none;
      border-bottom: 1px solid #2396FF;
    }
    .el-input__prefix{
      color:#2396FF;
      font-size: 0.8rem;
    }
    .imgCode,.getCode{
      display: block;
      width: 4.8rem;
      height: 1.8rem;
      position: absolute;
      right:  0;
      bottom: 0.2rem;
    }
    .login-btn{
      button{
        width: 100%;
      }
    }
  }

</style>
