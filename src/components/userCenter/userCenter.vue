<template>
    <div class="userCenter center-info">

      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <div class="user-limit">
        <!--<mt-cell :title="userInfo.user_nickname" is-link class="user-header" to="/userCenter/info">-->
          <!--<span>个人设置</span>-->
          <!--<img slot="icon" class="user-avatar" :src="userInfo.user_avatar"  width="60" height="60" />-->
        <!--</mt-cell>-->
        <div class="userAvatar">
          <div class="avatar">
            <div class="avatar-box">
              <img class="avatarImg" :src="userInfo.user_avatar"  width="72" height="72" alt="">
            </div>
            <template v-if="gradeCard.card_icon">
              <img class="level" :src="gradeCard.card_icon" alt="">
            </template>
          </div>
          <p class="name">{{userInfo.user_nickname}}</p>
          <ul class="user-navbar">
            <router-link :to="{path:'/order',query:{order_status:'waitting'}}" tag="li" class="col-xs-4">
              <p class="icon-img"><img src="../../assets/img/userCenter/7.png" alt=""></p>
              <p class="icon-label">待收货</p>
            </router-link>
            <router-link :to="{path:'/order',query:{order_status:'received'}}" tag="li" class="col-xs-4">
              <p class="icon-img"><img src="../../assets/img/userCenter/5.png" alt=""></p>
              <p class="icon-label">租赁中</p>
            </router-link>
            <router-link :to="{path:'/order',query:{order_status:'returned'}}" tag="li" class="col-xs-4">
              <p class="icon-img"><img src="../../assets/img/userCenter/6.png" alt=""></p>
              <p class="icon-label">已归还</p>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="baby-info center-item">
        <mt-cell title="宝宝信息" is-link to="/userCenter/babyInfo">
        <span>设置</span>
        <img slot="icon" src="../../assets/img/userCenter/baby.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="收货地址" is-link to="/userAddress">
        <span>设置</span>
        <img slot="icon" src="../../assets/img/userCenter/addr.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="消毒流程" is-link to="/disinfection">
        <img slot="icon" src="../../assets/img/userCenter/process.png"  width="18" height="18" />
        </mt-cell>
      </div>

      <div class="user-expense center-item">
        <mt-cell title="我的订单" is-link to="/order">
          <span>订单状态</span>
          <img slot="icon" src="../../assets/img/userCenter/order.png"  width="18" height="18" />
        </mt-cell>
        <!--<mt-cell title="我的预约" is-link to="/appointment">-->
          <!--<img slot="icon" src="../../assets/img/userCenter/5.png"  width="18" height="18" />-->
        <!--<span></span>-->
        <!--</mt-cell>-->
        <mt-cell title="我的收藏" is-link to="/collect">
          <span>已收藏{{collectCount}}个</span>
          <img slot="icon" src="../../assets/img/userCenter/7.png"  width="18" height="18" />
        </mt-cell>
        <!--<mt-cell title="我的卡券" icon="coupon" is-link to="/coupon">-->
        <!--</mt-cell>-->
      </div>
      <div class="info center-item">
        <mt-cell v-if="userLV == '会员'" title="普通用户" is-link to="/member">
          <span>成为会员,享租更实惠</span>
          <img slot="icon" src="../../assets/img/userCenter/vip.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell v-else :title="userLV" is-link to="/userCenter/memberInfo">
          <span>查看会员权利</span>
          <img slot="icon" src="../../assets/img/userCenter/vip.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="新手指南" icon="new" is-link to="/help">
          <span></span>
          <img slot="icon" src="../../assets/img/userCenter/baby.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="会员购买记录" icon="viporder" is-link to="/userCenter/memberOrder">
          <span></span>
          <img slot="icon" src="../../assets/img/userCenter/buy.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="我的交易记录" icon="order" is-link to="/userCenter/payment">
          <span></span>
          <img slot="icon"  src="../../assets/img/userCenter/card.png"  width="18" height="18" />
        </mt-cell>
      </div>
      <div class="info center-item">
        <mt-cell title="手机号" is-link>
          <span>{{userInfo.user_mobile}}</span>
          <img slot="icon" src="../../assets/img/userCenter/phone.png"  width="18" height="18" />
        </mt-cell>
        <mt-cell title="设置密码" is-link to="/setPassword">
          <span>设置</span>
          <img slot="icon" src="../../assets/img/userCenter/pwd.png"  width="18" height="18" />
        </mt-cell>
      </div>

      <input class="exit" type="button" value="退出登录" @click="handleLogOut" />
    </div>
</template>
<script>
    export default {
      data() {
        return {
          userInfo:{},
          collectCount: 0,
          userLV: "会员",
          gradeCard: {},
        }
      },
      activated() {
        this.handleUserInfo();
        this.handleCollectCount();
      },
      methods: {
        handleUserInfo: function(){
          var that = this;
          this.newAjax({
            url: "user/get_profile",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                that.userInfo = data.data;
                that.gradeCard = data.data.gradecard;
                console.log(that.gradeCard);
                if(data.data.gradecard == undefined){
                  that.userLV = "会员"
                }else{
                  that.userLV = data.data.gradecard.card_name+"会员"
                }
              }
            }
          })
        },
        handleCollectCount: function(){
          var that = this;
          this.newAjax({
            url: "user/get_collects",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                if(data.data.items == undefined){
                  that.collectCount = 0;
                }else{
                  if(data.data.page.count < 100){
                    that.collectCount = data.data.page.count;
                  }else{
                    that.collectCount = "99+";
                  }
                }
              }else{
                that.collectCount = 0;
              }
            }
          })
        },
        handleLogOut: function(){
          localStorage.setItem("token","");
          localStorage.setItem("login_status","");
          this.$router.push("/index");
        }
      }

    }
</script>
<style lang="less">
  .center-info{
    padding-bottom: 75px;
    .exit{
      width: 100%;
      height: 48px;
      line-height: 48px;
      background-color: #ffffff;
      margin-top: 0.5rem;
      font-size: 0.7rem;
    }
  }
  .userAvatar{
    width: 100%;
    background: url("../../assets/img/bg-center.png") top center no-repeat #D96068;
    background-size: 100% auto;
    overflow: hidden;
    padding: 0.5rem 0;
    .avatar{
      position: relative;
      .avatar-box{
        width: 72px;
        height: 72px;
        margin:0 auto;
        background: url("../../assets/img/Logo.jpg") center no-repeat;
        background-size: cover;
        border-radius: 36px;
      }
      .avatarImg{
        border-radius: 36px;
      }
      .level{
        position: absolute;
        bottom: -0.5rem;
        left:50%;
        width: 2rem;
        margin-left:-1rem;
      }
    }
    p{
      margin:1rem auto 0.5rem auto;
      font-size: 0.8rem;
      font-weight: 800;
      color:#ffffff;
    }
    .user-navbar{
      .icon-img{
        width: 2.5rem;
        height: 2.5rem;
        background-color: #ffffff;
        border-radius: 0.5rem;
        img{
          width: 100%;
        }
      }
      p{
        font-size: 0.7rem;
        margin: 0.5rem auto;
      }
    }
  }
  .center-item{
    margin-top: 0.5rem;
      .mint-cell-value.is-link{
        margin-right: 1.8rem;
      }
      .mint-cell-wrapper{
        font-size: 0.7rem;
        margin-left: 0.7rem;
        border-bottom: 1px solid #e0e0e0;
      }
    .mint-cell{
    }
  }
  .mint-cell{
    background-color: #ffffff;
  }
.user-avatar{
  border-radius: 50%;
}
</style>
