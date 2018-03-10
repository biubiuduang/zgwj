<template>
    <div>
      <div class="give-back list-box" v-if="returnHide == true">
        <p class="title">待归还的玩具</p>
        <ul class="give-list wait-give-back">
          <li v-for="item in returnList">
            <div class="wait-checkbox">
              <input v-if="item.is_star == 1" type="checkbox" name="wait-star" :value="item.order_id+'-'+item.goods_id" />
              <input v-else type="checkbox" name="wait-normal" :value="item.order_id+'-'+item.goods_id" />
              <el-checkbox-group v-model="toyCount.returnData" @change="handleCheck" >
                <el-checkbox :key="item.order_id+'-'+item.goods_id" :checked="true"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="pv-img">
              <p class="img-box flex-center">
                <img :src="item.goods_thumb" alt="">
              </p>
            </div>
            <div class="pv-info">
              <p class="p-title">{{item.goods_name}}</p>
              <p class="is-stockout"></p>
              <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
              <p class="is-stars" v-else>非星标玩具</p>
              <p class="is-state">{{item.goods_status}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="borrow list-box">
        <p class="title">期望租借的玩具</p>
        <p class="tip">温馨提示:<br/>您的会员权限一次可以租借{{toyCount.star}}件星标玩具，{{toyCount.normal}}件常规玩具。</p>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="give-list wait-give-back">
          <li v-for="item in buyList">
            <div class="wait-checkbox">
              <el-checkbox-group v-model="toyCount.buyData" @change="handleCheck" :max="toyCount.max" >
                <el-checkbox :label="item.goods_id"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="pv-img">
              <p class="img-box flex-center">
                <img :src="item.goods_thumb" alt="">
              </p>
            </div>
            <div class="pv-info">
              <p class="p-title">{{item.goods_name}}</p>
              <p class="is-stockout" v-if="item.goods_number > 0"></p>
              <p class="is-stockout" v-else>暂时无货</p>
              <p></p>
              <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
              <p class="is-stars" v-else>非星标玩具</p>
              <a class="delete" href="javascript:void(0);" @click="handleDelete(item.carts_id)">删除</a>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom" :class="allLoaded == true?'mint-loadmore-bottom-to':''">
            <span class="load-icon" v-if="allLoaded == false">
              <mt-spinner type="fading-circle"></mt-spinner>
            </span>
          <span v-else>没有更多数据了</span>
        </div>
        </mt-loadmore>
      </div>
      <div class="bottom-count">
        <p class="count">新租{{toyCount.buyToy}}件,归还{{toyCount.returnToy}}件</p>
        <a class="btn-submit" href="javascript:void(0);" @click="handleSubmit">提交订单</a>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          toyCount: {
            star : 0,
            normal: 0,
            returnToy: 0,
            returnData: [],
            buyToy: 0,
            buyData: [],
            max:0
          },
          returnList: [],
          returnHide: false,
          buyList: [],
          allLoaded: true,
          page:{
            start: 0,
            count: 0
          }
        }
      },
      activated() {
        this.handleGetList();
        this.handleUserInfo();
      },
      methods: {
        handleSubmit: function(){
          var that = this;
          var buyStr = this.toyCount.buyData.join(",");
          var returnStr = this.toyCount.returnData.join(",");
          if(this.toyCount.buyData.length == 0 && this.toyCount.returnData.length == 0){
            alert("请选择退换的玩具.");
          }else{
            that.$router.push({path:'/enterOrder',query:{buy:buyStr,return:returnStr}});
          }
        },
        handleGetList: function(){
          var that = this;
          this.buyList= [];
          this.allLoaded = true;
          this.page = {
            start: 0,
            count: 0
          };
          this.newAjax({
            url: "order/get_carts",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              start : that.page.start
            },
            success: function(data){
              if(data.status == 200){
                if('page' in data.data){
                  if(data.data.returnning_items == undefined ){
                    that.returnHide = true;
                    that.returnList = [];
                  }else{
                    that.returnList = data.data.returnning_items;
                  }

                  that.buyList = data.data.items;
                  that.page.count = data.data.page.count;
                  if(that.buyList.length == that.page.count){
                    that.allLoaded = true;// 若数据已全部获取完毕
                  }else{
                    that.page.start = that.goodsList.length;
                    that.allLoaded = false;
                  }
                }else{
                  that.buyList = [];
                  that.allLoaded = true;
                }
              }else{
                that.allLoaded = true;
              }

            }
          })
        },
        handleLoadList: function(){
          var that = this;
          this.newAjax({
            url: "order/get_carts",
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            data: {
              start : that.page.start
            },
            success: function(data){
              console.log(data);
              if(data.status == 200){
                if('page' in data.data){
                  if(data.data.returnning_items == undefined){
                    that.returnHide = true;
                    that.returnList = [];
                  }else{
                    that.returnList = data.data.returnning_items;
                  }
                  that.buyList = that.buyList.concat(data.data.items);
                  that.page.count = data.data.page.count;
                  if(that.buyList.length == that.page.count){
                    that.allLoaded = true;// 若数据已全部获取完毕
                  }else{
                    that.page.start = that.goodsList.length;
                    that.allLoaded = false;
                  }
                }else{
                  that.buyList = [];
                  that.allLoaded = true;
                }
              }else{
                that.allLoaded = true;
              }

            }
          })
        },
        loadBottom: function(){
          if(this.allLoaded == false){
            this.handleLoadList();
          }
        },
        handleDelete: function(id){
          this.newAjax({
            url:"order/delete_carts",
            method: "POST",
            data: {
              carts_id: id
            },
            header: {
              Accept: "application/json; charset=utf-8",
              token: localStorage.getItem("token")
            },
            success: function(data){
              window.location.reload();
            }
          })
        },
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
                if(data.data.gradecard == undefined){
                  that.toyCount.star = 0;
                  that.toyCount.normal = 0;
                  that.toyCount.max = 0;
                }else{
                  that.toyCount.star = data.data.gradecard.remain_rules.star_toys_count_pertime;
                  that.toyCount.normal = data.data.gradecard.remain_rules.normal_toys_count_pertime;
                  that.toyCount.max = data.data.gradecard.remain_rules.toys_count_pertime;
                }
            }
          })
        },
        handleCheck: function(){
          this.toyCount.max = (this.toyCount.star + this.toyCount.normal - this.returnList.length + this.toyCount.returnData.length);
          this.toyCount.buyToy = this.toyCount.buyData.length;
          this.toyCount.returnToy = this.toyCount.returnData.length;
          this.toyCount.buyToy = this.toyCount.buyData.length;
          console.log(this.toyCount.buyData);
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
        padding-left: 10px;
        height:6.5rem;
        div{
          float: left;
          &.wait-checkbox{
            text-align: center;
            width: 1rem;
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
    z-index: 2;
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
