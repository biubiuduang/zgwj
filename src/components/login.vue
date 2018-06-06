<template>
    <div class="login">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="handleBackIndex"></i>
        返回首页
      </p>
      <div class="logo">
        <img src="../assets/img/Logo.jpg" alt="">
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" class="item-left">短信登录</mt-tab-item>
        <mt-tab-item id="2">密码登录</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form">
            <el-form-item  prop="tel">
              <el-input prefix-icon="mintui mintui-phone" placeholder="请输入11位手机号" v-model.number="loginForm.tel"  clearable></el-input>
            </el-form-item>
            <el-form-item prop="key">
              <el-input class="code" placeholder="请输入图形验证码" prefix-icon="mintui mintui-code" type="text" v-model="loginForm.key"></el-input>
              <img class="imgCode" :src="captcha.img" alt="" @click="handleGetImgCode">
            </el-form-item>
            <el-form-item prop="psw">
              <el-input prefix-icon="mintui mintui-tel-msg" placeholder="请输入短信验证码" type="text" v-model="loginForm.psw"></el-input>
              <el-button class="getCode" type="primary" :disabled="telCodeStatus" @click="handleTelCode">{{countBtn}}</el-button>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <el-form :model="loginForm2" status-icon :rules="rules2" ref="loginForm2" class="login-form">
            <el-form-item  prop="tel">
              <el-input prefix-icon="mintui mintui-phone" placeholder="请输入11位手机号" v-model.number="loginForm2.tel"  clearable></el-input>
            </el-form-item>
            <el-form-item prop="psw">
              <el-input prefix-icon="mintui mintui-tel-msg" placeholder="请输入密码" type="password" v-model="loginForm2.psw"></el-input>
            </el-form-item>
            <el-form-item class="login-btn">
              <el-button type="primary" @click="submitPwd('loginForm2')">登录</el-button>
            </el-form-item>
          </el-form>
        </mt-tab-container-item>

      </mt-tab-container>
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
        var psw = (rule, value, callback) => {
          if (value === '') {
            return callback(new Error('请输入登录密码.'));
          }else{
            callback();
          }
        };
        return {
          selected: '1',
          telCodeStatus: false,
          timeCount: 60,
          countBtn: '获取验证码',
          loginForm: {
            tel: '',
            key:'',
            psw: ''
          },
          loginForm2: {
            tel: '',
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
          },
          rules2: {
            tel: [
              { validator: checkTel, trigger: 'blur' }
            ],
            psw: [
              { validator: psw, trigger: 'blur' }
            ]
          }
        }
      },
      activated() {
        this.handleGetImgCode();
      },
      methods: {
        handleBackIndex: function () {
          this.$router.push({ path: '/index'});
        },
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
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          if(!myreg.test(this.loginForm.tel)){
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
                console.log(data);
                if(data.status == 200){
                  that.countDown(that.timeCount);
                }else{
                  that.telCodeStatus = false;
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
                    if(data.data.has_weixin_grant == 0){
                      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50352eddf02dd20a&redirect_uri=http://api.xwkj2018.com/user/get_profile_weixin&response_type=code&scope=snsapi_userinfo&state="+ data.data.user_id +"#wechat_redirect";
                    }else{
                      that.$router.go(-1);
                    }
                    localStorage.setItem("login_status","true");
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
        submitPwd: function(formName) {
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.newAjax({
                url: "user/login",
                method: "POST",
                data: {
                  account: that.loginForm2.tel,
                  password: that.loginForm2.psw
                },
                success: function(data){
                  console.log(data);
                  if(data.status == 200){
                    localStorage.setItem("token",data.data.token);
                    that.$store.commit('setLogin',true);
                    if(data.data.has_weixin_grant == 0){
                      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50352eddf02dd20a&redirect_uri=http://api.xwkj2018.com/user/get_profile_weixin&response_type=code&scope=snsapi_userinfo&state="+ data.data.user_id +"#wechat_redirect";
                    }else{
                      that.$router.go(-1);
                    }
                    localStorage.setItem("login_status","true");
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
  @import "../assets/css/parameters.less";
  .login{
    padding-top: 40px;
    background-color: #ffffff;
    .mint-navbar .mint-tab-item.is-selected{
      border-bottom: none;
      color:@assist-color;
      &:after{
        content: " ";
        display: block;
        width: 2rem;
        height: 4px;
        border-radius: 2px;
        margin:5px auto 0 auto;
        background-color: @assist-color;
       }
    }
    .el-button--primary{
      background-color:@assist-color;
      border-color:@assist-color;
    }
    .el-button--primary[disabled]{
       background-color:@assist-color;
       border-color:@assist-color;
     }
    .el-button.getCode{
      padding: 0;
    }
  }
  .mint-navbar{
    padding: 0 1.92rem;
    .mint-tab-item{
      padding:0.5rem 0;
      .mint-tab-item-label{
        font-size: 0.8rem;
      }
    }
  }
  .mint-tab-container{
    margin-top:15px;
  }
  .logo{
    width: 100%;
    overflow:hidden;
    img {
      display: block;
      margin:0 auto;
      width: 12rem;
    }
  }
  .login-form{
    padding: 0 1.92rem;
    color:@assist-color;
    .el-input__inner{
      border-radius: 0;
      height: 2rem;
      border: none;
      border-bottom: 1px solid @assist-color;
    }
    .el-input__prefix{
      color:@assist-color;
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
