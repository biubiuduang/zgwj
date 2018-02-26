<template>
  <div class="address">
    <p class="title">我的地址:</p>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="收货人:" prop="addUser">
        <el-input type="text" v-model="ruleForm2.addUser" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="addr">
        <el-input type="text" v-model="ruleForm2.addr" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="tel">
        <el-input v-model.number="ruleForm2.tel"></el-input>
      </el-form-item>
      <el-form-item class="enter-box">
        <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入收货人姓名.'));
      }
    };
    var validateAdd= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入收货地址.'));
      }
    };
    var checkTel = (rule, value, callback) => {
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        return callback(new Error('请输入11位手机号'));
      }
    };
    return {
      ruleForm2: {
        addUser: '',
        addr: '',
        tel: ''
      },
      rules2: {
        addUser: [
          { validator: validateUser, trigger: 'blur' }
        ],
        addr: [
          { validator: validateAdd, trigger: 'blur' }
        ],
        tel: [
          { validator: checkTel, trigger: 'blur' }
        ]
      }
    };
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="less">
  .address{
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
  .el-input{
    width: 80%;
    margin-left:0;
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
