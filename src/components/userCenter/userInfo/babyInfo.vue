<template>
    <div class="babyInfo">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="宝宝姓名:">
          <el-input type="text" placeholder="宝宝姓名" v-model="info.baby_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="宝宝性别:">
          <el-select v-model="info.baby_sex" placeholder="选择宝宝性别">
            <el-option label="男宝宝" value="male"></el-option>
            <el-option label="女宝宝" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期:">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择宝宝出生日期" v-model="info.baby_birthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item class="enter-box">
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
    export default {
      props: {
        info: Object
      },
      data() {
        return {

        }
      },
      activated(){
      },
      methods: {
        submitForm: function(){
          var that = this;
          this.newAjax({
            url: "user/update_profile",
            method: "POST",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              baby_name: that.info.baby_name,
              baby_sex: that.info.baby_sex,
              baby_birthday: that.$moment(that.info.baby_birthday).format("YYYY-MM-DD")
            },
            success: function(data){
              if(data.status == 200){
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
        },
      },
      beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        $(".el-date-picker").hide();
        next();
      }
    }
</script>
<style lang="less">
  @import "../../../assets/css/parameters.less";
  .babyInfo{
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
        margin-bottom: 0;
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

