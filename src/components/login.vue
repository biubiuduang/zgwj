<template>
    <div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="手机号:" prop="tel">
          <el-input v-model.number="loginForm.tel" close></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="psw">
          <el-input type="password" v-model="loginForm.psw"></el-input>
        </el-form-item>
        <el-form-item class="enter-box">
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
            return callback(new Error('请输入密码'));
          }else{
            callback();
          }
        };
        return {
          loginForm: {
            tel: '',
            psw: ''
          },
          rules: {
            tel: [
              { validator: checkTel, trigger: 'blur' }
            ],
            psw: [
              { validator: checkPsw, trigger: 'blur' }
            ]
          }
        }
      },
      activated() {

      },
      methods: {
        submitForm: function(formName) {
          var that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.newAjax({
                url: "user/login",
                method: "POST",
                data: {
                  account: that.loginForm.tel,
                  password: that.loginForm.psw
                },
                success: function(data){
                  console.log(data);
                  if(data.status == 200){
                    localStorage.setItem("token",data.data.token);
                    that.$store.commit('getLogin',true);
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
        }
      }
    }
</script>
<style>

</style>
