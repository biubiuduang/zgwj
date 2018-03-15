<template>
    <div class="address padding-top">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="address-form">
        <el-form-item label="收货人:" prop="addUser">
          <el-input type="text" v-model="ruleForm2.addUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市:">
          <el-cascader :options="options" v-model="selectedOptions"></el-cascader>
        </el-form-item>
        <el-form-item label="地址:" prop="addr">
          <el-input type="text" v-model="ruleForm2.addr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="tel">
          <el-input v-model.number="ruleForm2.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item class="enter-box">
          <el-button type="primary" @click="submitForm('ruleForm2')">确认订单</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
    export default {
      data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入收货人姓名.'));
        }else{
          callback();
        }
      };
      var validateAdd= (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('请输入6个字以上的收货地址.'));
        }else{
          callback();
        }
      };
      var checkTel = (rule, value, callback) => {
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(value)) {
          return callback(new Error('请输入11位手机号'));
        }else{
          callback();
        }
      };
      return {
        oldAddr: {
          addUser: '',
          areas: '',
          addr: '',
          tel: ''
        },
        ruleForm2: {
          addUser: '',
          areas: '',
          addr: '',
          tel: ''
        },
        addAddr: true,
        addrId: '',
        options:[],
        selectedOptions:[],
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
    activated(){
      this.handleGetAreas();
      this.handleGetUserAddr();
    },
    methods: {
      submitForm: function(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(that.$route.query.buy);
            if(that.addAddr == true){
              that.handleAddAddr();
            }else{
              if(that.ruleForm2.addUser == that.oldAddr.addUser  &&
                that.selectedOptions.join("-") == that.oldAddr.areas &&
                that.ruleForm2.addr == that.oldAddr.addr  &&
                that.ruleForm2.tel== that.oldAddr.tel)
              {
                that.handleSubOrder();
              }else{
                that.handleResetAddr();
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleGetAreas: function(){
        var that = this;
        this.newAjax({
          url:"user/get_areas",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success:function(data){
            console.log(data);
            that.options = data.data.items;
          }
        })
      },
      handleGetUserAddr: function(){
        var that = this;
        this.newAjax({
          url: "user/get_addresses",
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            console.log(data);
            if(data.status == 200){
              if(data.data.length == 0){
                that.selectedOptions = ["1","2"];
              }else{
                that.oldAddr.addUser = data.data.items[0].consignee;
                that.oldAddr.areas = data.data.items[0].area_id;
                that.oldAddr.addr = data.data.items[0].address;
                that.oldAddr.tel = data.data.items[0].mobile;

                that.ruleForm2.addUser = data.data.items[0].consignee;
                that.ruleForm2.areas = data.data.items[0].area_id;
                that.ruleForm2.addr = data.data.items[0].address;
                that.ruleForm2.tel = data.data.items[0].mobile;

                that.addrId = data.data.items[0].address_id;

                that.selectedOptions = that.ruleForm2.areas.split("-");

                that.addAddr = false;
              }
            }else{
              that.selectedOptions = ["1","2"];
            }
          }
        })
      },
      handleAddAddr: function(){
        var that = this;
        this.newAjax({
          url: "user/add_address",
          method: "POST",
          data: {
            consignee:that.ruleForm2.addUser,
            mobile: that.ruleForm2.tel,
            area_id:that.selectedOptions.join("-"),
            address:that.ruleForm2.addr,
            is_default: 1
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            console.log(111111);
            if(data.status == 200){
              that.addrId = data.data.address_id;
              that.handleSubOrder();
            }else{
              MessageBox('提示', '请求错误,请刷新后重新提交.');
            }
          }
        })
      },
      handleResetAddr: function(){
        var that = this;
        this.newAjax({
          url: "user/edit_address",
          method: "POST",
          data: {
            address_id:that.addrId,
            consignee:that.ruleForm2.addUser,
            mobile: that.ruleForm2.tel,
            area_id:that.selectedOptions.join("-"),
            address:that.ruleForm2.addr,
            is_default: 1
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            console.log(22222222);
            if(data.status == 200){
              that.handleSubOrder();
            }else{
              MessageBox('提示', '请求错误,请刷新后重新提交.');
            }
          }
        })
      },
      handleSubOrder: function(){
        var that = this;
        this.newAjax({
          url: "order/add_order",
          method: "POST",
          data:{
            order_goods_id: that.$route.query.buy,
            address_id: that.addrId,
            goods_id: that.$route.query.return
          },
          header: {
            Accept: "application/json; charset=utf-8",
            token: localStorage.getItem("token")
          },
          success: function(data){
            console.log(data);
            MessageBox.confirm('',{
              title: '提示',
              message: data.message,
              confirmButtonText: '查看订单',
              cancelButtonText: '取消'
            }).then(action => {
              that.$router.push("/order");
            });
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
  .address{
    padding-top: 3rem;
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
    width: 100%;
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
