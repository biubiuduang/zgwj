<template>
    <div>
      <div class="give-back list-box">
        <p class="title">待归还的玩具</p>
        <ul class="give-list wait-give-back">
          <li>
            <div class="wait-checkbox">
              <input type="checkbox" name="wait" value="1" />
            </div>
            <div class="pv-img">
              <p class="img-box flex-center">
                <img src="/static/img/36icons-Home.9cf4650.png" alt="">
              </p>
            </div>
            <div class="pv-info">
              <p class="p-title">标题</p>
              <p class="is-stockout"></p>
              <p class="is-stars">星标玩具</p>
              <p class="is-state">订单状态</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="borrow list-box">
        <p class="title">期望租借的玩具</p>
        <p class="tip">温馨提示:您的会员权限一次可以租借<span>0</span>件星标玩具，<span>0</span>件常规玩具。</p>
        <ul class="give-list wait-give-back">
          <li>
            <div class="wait-checkbox">
              <input type="checkbox" name="borrow" value="1" />
            </div>
            <div class="pv-img">
              <p class="img-box flex-center">
                <img src="/static/img/36icons-Home.9cf4650.png" alt="">
              </p>
            </div>
            <div class="pv-info">
              <p class="p-title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
              <p class="is-stockout">暂时无货</p>
              <p></p>
              <p class="is-stars">星标玩具</p>
              <a class="delete" href="javascript:void(0);">删除</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom-count">
        <p class="count">新租<span>0</span>件,归还<span>0</span>件</p>
        <a class="btn-submit" href="javascript:void(0);" @click="handleSubmit">提交订单</a>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {

        }
      },
      activated() {

      },
      methods: {
        handleSubmit: function(){
          var that = this;
          that.$router.push({path:'/enterOrder'});
        }
      }
    }
</script>
<style scoped lang="less">
  .list-box{
    text-align:left;
    p{
      font-size: 0.6rem;
      &.title{
        border-bottom: 1px solid #e1e1e1;
        line-height: 2rem;
        text-indent:2rem;
      }
      &.tip{
        padding: 0.7rem 2rem;
        border-bottom: 1px solid #e1e1e1;
        line-height: 0.8rem;
      }
    }
    .give-list{
      li{
        overflow:hidden;
        border-bottom: 1px solid #e1e1e1;
        height:6.5rem;
        div{
          float: left;
          &.wait-checkbox{
            text-align: center;
            width: 2rem;
            line-height: 6.5rem;
          }
          &.pv-img{
            width: 5rem;
            .img-box{
              width: 100%;
              height:6.5rem;
              img{
                width: 100%;
              }
            }
          }
          &.pv-info{
            position: relative;
            width:10rem;
            padding:0.5rem 0 0.5rem 1rem;
            p{
              height: 0.9rem;
              line-height: 0.9rem;
              margin-bottom:0.2rem;
              font-size: 0.7rem;
              &.p-title{
                 font-size: 0.7rem;
                 color: #252525;
                 white-space: normal;
                 height: 1.8rem;
                 -webkit-line-clamp: 2;
                 overflow: hidden;
                 text-overflow: ellipsis;
                 display: -webkit-box;
                 -webkit-box-orient: vertical;
                 -webkit-box-flex: 1;
                 -moz-box-flex: 1;
                 -ms-box-flex: 1;
                 box-flex: 1;
               }
               &.is-stockout{
                color:#ac2925;
                }
               &.is-stars{
                 font-size: 0.8rem;
                }
            }
            a{
              font-size: 0.7rem;
              position: absolute;
              bottom:0.6rem;
              right:0;
            }
           }
        }
      }
    }
  }
  .bottom-count{
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    height:50px;
    padding: 0 0.5rem;
    border-top: 1px solid #ededed;
    background-color: #ededed;
    p{
      float:left;
      height: 50px;
      line-height: 50px;
      font-size: 0.8rem;
      color:#1b6d85;
    }
    a{
      float: right;
      line-height: 50px;
      font-size: 0.8rem;
      color:#1b6d85;
    }
  }
</style>
