<template>
  <div class="insureForm">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <p class="title"></p>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="insure-form">
      <h3>家长信息: </h3>
      <el-form-item label="姓名:" prop="pName">
        <el-input type="text" v-model="ruleForm.pName" auto-complete="off" clearable placeholder="请输入家长姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="pSex">
        <el-select v-model="ruleForm.pSex" placeholder="性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话:" prop="pMobile" >
        <el-input type="text" v-model="ruleForm.pMobile" auto-complete="off" clearable placeholder="请输入11位手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="身份证号:" prop="pCode">
        <el-input type="text" v-model="ruleForm.pCode" auto-complete="off" clearable placeholder="请输入18位身份证号" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址:" prop="pAddr">
        <el-input type="text" v-model="ruleForm.pAddr" auto-complete="off" clearable placeholder="请输入详细的家庭住址"></el-input>
      </el-form-item>
      <h3>子女信息: </h3>
      <el-form-item label="姓名:" prop="cName">
        <el-input type="text" v-model="ruleForm.cName" auto-complete="off" clearable placeholder="请输入子女姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="cSex">
        <el-select v-model="ruleForm.cSex" placeholder="子女性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号:" prop="cCode">
        <el-input type="text" v-model="ruleForm.cCode" auto-complete="off" clearable placeholder="请输入子女18位身份证号" :maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="" prop="type" class="argument">
        <el-checkbox-group v-model="ruleForm.type" class="argumentCheckbox" >
          <el-checkbox label="" name="type"></el-checkbox>
        </el-checkbox-group>
        我阅读并同意 <router-link tag="a" to="/userCenter/insureAgument">《投保协议》</router-link>
      </el-form-item>
      <el-form-item class="enter">
        <el-button type="primary" @click="submitForm('ruleForm')">确 认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  import { Toast } from 'mint-ui';
  export default {
    data() {
      var userName = (rule, value, callback) => {
        if(value === ''){
          return callback (new Error('请输入姓名.'));
        }else{
          callback();
        }
      };
      var userSex = (rule, value, callback) => {
        if(value === ''){
          return callback (new Error('请选择性别.'));
        }else{
          callback();
        }
      };
      var userTel = (rule, value, callback) => {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
          return callback(new Error('请输入11位手机号'));
        }else{
          callback();
        }
      };
      var userCode = (rule, value, callback) => {
        var len = value.length;
        if(len < 18){
          return callback (new Error('请输入18位身份证号.'));
        }else{
          callback();
        }
      };
      var userAddr = (rule, value, callback) => {
        if(value === ''){
          return callback (new Error('请输入您的详细地址.'));
        }else{
          callback();
        }
      };
      var checkbox = (rule, value, callback) => {
        var len = value.length;
        if(len <= 0){
          return callback (new Error('请阅读并选择协议.'));
        }else{
          callback();
        }
      };
      return {
        userCardId: 0,
        ruleForm: {
          pName: '',
          pSex: '',
          pMobile:'',
          pCode: '',
          pAddr: '',
          cName: '',
          cSex: '',
          cCode: '',
          type: []
        },
        rules: {
          pName: [
            {validator: userName, required: true, trigger: 'blur'}
          ],
          pSex: [
            {validator: userSex, required: true, trigger: 'change'}
          ],
          pMobile: [
            {validator: userTel, required: true, trigger: 'blur'}
          ],
          pCode: [
            {validator: userCode, required: true, trigger: 'blur'}
          ],
          pAddr: [
            {validator: userAddr, required: true, trigger: 'blur'}
          ],
          cName: [
            {validator: userName, required: true, trigger: 'blur'}
          ],
          cSex: [
            {validator: userSex, required: true, trigger: 'change'}
          ],
          cCode: [
            {validator: userCode, required: true, trigger: 'blur'}
          ],
          type: [
            {validator: checkbox, required: true, trigger: 'change'}
          ],
        }
      };
    },
    activated(){
      this.handleGetInfo();
    },
    methods: {
      handleGetForm: function(d){

        var that = this;
        this.newAjax({
          url: "user/get_policy",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          data: {
            user_card_id: d
          },
          success: function(data){
            if(data.status == 200){
              if(data.data.status != 0){
                that.$router.push("/userCenter/memberInfo");
              }
            }
          }
        })
      },
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
              if(data.data.gradecard != undefined){
                that.userCardId = data.data.gradecard.user_card_id;
                that.handleGetForm(that.userCardId);
              }else{
                that.$router.push("userCenter")
              }
            }
          }
        })
      },
      submitForm: function(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.handleSubmit();
          } else {
            Toast({
              message: '提交失败,请重新提交',
              duration: 2000
            });
            return false;
          }
        });
      },
      handleSubmit: function(){
        var that = this;
        this.newAjax({
          url: "user/add_policy",
          method: "POST",
          data: {
            user_card_id: that.userCardId,
            truename: that.ruleForm.pName,
            sex: that.ruleForm.pSex,
            identitycard_no: that.ruleForm.pCode,
            address: that.ruleForm.pAddr,
            mobile: that.ruleForm.pMobile,
            baby_name: that.ruleForm.cName,
            baby_sex: that.ruleForm.cSex,
            baby_identitycard_no: that.ruleForm.cCode
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            console.log(that.ruleForm);
            if(data.status == 200){
              that.addrId = data.data.address_id;
              Toast({
                message: '修改成功',
                iconClass: 'mintui mintui-success',
                duration: 2000
              });
              that.$router.push("/userCenter/memberInfo");
            }else{
              Toast({
                message: data.message,
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
  .enter .el-form-item__content{
    width: 100%;
    text-align: center;
    margin-left:0 !important;
    padding-left:1.5rem;
  .el-button{
    width: 100%;
  }
  }
  .insureForm{
    background-color: #ffffff;
    padding: 60px 1.5rem 1rem 0;
    h3{
      text-align: left;
      text-indent: 1rem;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 800;
    }
  }
  .argument{
    .argumentCheckbox{
      float: left;
      margin-right: 5px;
    }
    a{
      color:#409EFF;
    }
  }
</style>
