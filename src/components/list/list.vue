<template>

  <div class="page-loadmore list">
      <div class="choice-box">
    <mt-search
      v-model="value"
      placeholder="搜索">
    </mt-search>
    <ul class="choice-list">
      <template v-for="(item, index) in list.data">
        <li class="col-xs-3" @click="handleTabs(index)">{{item}}<i class="iconfont icon-up"></i></li>
      </template>
    </ul>
    <div class="list-popup" v-show="list.isShow">
      <Ages :ages="searchList.ages" @handleAges="handleAges"></Ages>
      <Brand :brand="searchList.brand" @handleBrand="handleBrand"></Brand>
      <Type :type="searchList.type" :ability="searchList.ability" @handleType="handleType"></Type>
      <Auto @handleAuto="handleAuto"></Auto>
    </div>
  </div>
      <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
          <template v-for="item in goodsList">
            <router-link tag="li" class="page-loadmore-listitem goods-list" :to="'/detail/'+item.goods_id">
              <div class="pv-img" :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
              <div class="pv-info">
                <p class="p-title">{{item.goods_name}}</p>
                <div class="info-msg">
                  <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
                  <p class="is-stars" v-else>非星标玩具</p>
                  <p class="is-ages">{{item.age_name}}</p>
                </div>
              </div>
            </router-link>
          </template>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-if="allLoaded== false" v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑加载更多</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
          <span v-if="allLoaded">没有更多数据了!</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
    import Ages from "./ages.vue";
    import Brand from "./brand.vue";
    import Type from "./type.vue";
    import Auto from "./auto.vue";
    export default {
      components: {
        Ages,Brand,Type,Auto
      },
      data() {
        return {
          value:"",
          list: {
            isShow: false,
            data: ['年龄','品牌','筛选','默认排序'],
          },
          searchAll: [{category_name:"全部",category_id:"全部"}],
          searchList: {
            ages: [],
            brand: [],
            type: [],
            ability:[],
          },
          search: {
            keywords:'',
            age_id: this.$route.query.ages,
            brand_id: this.$route.query.brand,
            is_star: '2',
            has_stock: '1',
            type_id: this.$route.query.type,
            ability_id: this.$route.query.ability,
            order_str: 'default',
            start: '0',
            number:'30',
          },
          addOn: true,
          goodsList: [],
          listCount: 0,
          bottomStatus: '',
          allLoaded: false,
          wrapperHeight: 0
        }
      },
      activated() {
        this.handleInitList();
        this.handleClassList();
        this.handleDocument();
        this.handleEnter();
      },
      methods: {
        //获取玩具列表
        handleGoodsList: function () {
          var that = this;
          this.search.start = this.goodsList.length;
          this.newAjax({
            url: 'goods/get_goodes',
            data: that.search,
            success: function (data) {
              if (data.status == 200) {
                if (data.data.items != undefined) {
                  console.log(data);
                  var len = data.data.items.length;
                  for (var i = 0; i < len; i++) {
                    that.goodsList.push(data.data.items[i]);
                  }
                } else {
                  that.goodsList = [];
                }
              } else {
                that.goodsList = [];
              }
            }
          })
        },
        handleInitList: function () {
          var that = this;
          this.goodsList = [];
          this.search.start = 0;
          this.newAjax({
            url: 'goods/get_goodes',
            data: that.search,
            success: function (data) {
              if (data.status == 200) {
                if (data.data.items != undefined) {
                  console.log(data);
                  var len = data.data.items.length;
                  for (var i = 0; i < len; i++) {
                    that.goodsList.push(data.data.items[i]);
                  }
                  that.listCount = data.data.page.count;
                  that.allLoaded = false;
                } else {
                  that.goodsList = [];
                }
              } else {
                that.goodsList = [];
              }

            }
          })
        },
        //获取玩具分类
        handleClassList: function () {
          var that = this;
          this.newAjax({
            url: "goods/get_categories",
            success: function (data) {
              that.searchList.ages = that.searchAll.concat(data.data.items[0].child[0]);
              that.searchList.brand = that.searchAll.concat(data.data.items[1].child[0]);
              that.searchList.type = data.data.items[3].child[0];
              that.searchList.ability = data.data.items[4].child[0];
            }
          })
        },
        //Tabs点击事件
        handleTabs: function (index) {
          if ($(".choice-list li:eq(" + index + ")").hasClass("active")) {
            $(".choice-list li:eq(" + index + ")").removeClass("active");
            this.list.isShow = false;
          } else {
            $(".choice-list li").removeClass("active").eq(index).addClass("active");
            $(".item").hide();
            $(".item-" + index).show();
            this.list.isShow = true;
          }
        },
        handleDocument: function () {
          let that = this;
          $(document).on("click", function () {
            that.list.isShow = false;
            $(".choice-list li").removeClass("active");
          });
          $(".choice-box .item,.choice-box .choice-list").on("click", function (event) {
            event.stopPropagation();
          })
        },
        handleEnter: function () {
          var that = this;
          $('.mint-searchbar-core').bind('keyup', function (event) {
            if (event.keyCode == "13") {
              //回车执行查询
              that.search.keywords = $(this).val();
              that.goodsList = [];
              that.search.start = that.goodsList.length;
              that.handleInitList();
            }
          });
        },
        handleAges: function (data) {
          let that = this;
          if (data == '全部') {
            delete that.search.age_id;
          } else {
            that.search.age_id = data;
          }
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");

          that.handleInitList();
        },
        handleBrand: function (data) {
          let that = this;
          if (data == '全部') {
            delete that.search.brand_id;
          } else {
            that.search.brand_id = data;
          }
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");

          that.handleInitList();

        },
        handleType: function (data) {
          let that = this;
          that.search.is_star = data.stars;
          that.search.has_stock = data.store;
          that.search.type_id = data.type;
          that.search.ability_id = data.ability;

          that.list.isShow = false;
          $(".choice-list li").removeClass("active");

          that.handleInitList();
        },
        handleAuto: function (data) {
          let that = this;
          that.search.order_str = data;
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");

          that.handleInitList();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        loadBottom: function(){
          if (this.goodsList.length < this.listCount) {
            this.handleGoodsList();
          } else {
            this.allLoaded = true;
          }

          this.$refs.loadmore.onBottomLoaded();
        },
      },
      mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      }
    }
</script>
<style lang="less">
.list{
  .mint-loadmore{
    padding: 110px 0 70px 0;
  }
  .mint-search{
    height: auto;
    position: relative;
    z-index: 3;
  }
  .mint-searchbar {
    background-color: #000000;
    padding: 0.665rem 0.5rem;
  }
  .mint-searchbar-inner{
    height: 1.73rem;
    line-height: 1.73rem;
    border-radius: 0.25rem;
    padding: 0 0.7rem;
  }
  .choice-box{
    width: 100%;
    background-color: #ffffff;
    position: fixed;
    left:0;
    top:0;
    z-index:3;
    .list-popup{
      position: fixed;
      left:0;
      top:110px;
      z-index: 4;
      background-color:rgba(0,0,0,0.4);
      width: 100%;
      height: 100%;
      .item{
        width: 100%;
        max-height: 18rem;
        background-color: #ffffff;
        overflow: scroll;
      }
    }
  }
  .choice-list{
    overflow:hidden;
    height: 46px;
    padding: 13px 0;
    border-bottom:1px solid #e1e1e1;
    li{
      line-height: 20px;
      padding: 0 5px;
      font-size: 14px;
      border-right: 1px solid #333;
      color:#3e3e3e;
      &:last-child{
        border-right: none;
       }
       &.active{
        color:#1b6d85;
        i{
          &:after{
             content:'\e608';
           }
        }
       }
    }
  }
  .goods-list{
    width: 100%;
    padding: 15px;
    height: 90px;
    .pv-img{
      width: 60px;
      height: 60px;
      background-color: #d8d8d8;
      border-radius: 5px;
      float: left;
      img{
        width: 100%;
      }
    }
    .pv-info{
      text-align: left;
      width: 100%;
      padding-left: 75px;
      position: relative;
      font-size: 14px;
      .p-title{
        color: #252525;
        font-weight: 800;
        white-space: normal;
        height: 36px;
        -webkit-line-clamp: 2;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -ms-box-flex: 1;
        box-flex: 1;
      }
      .info-msg{
        overflow:hidden;
        margin-top:8px;
        font-size:12px;
        p{
          line-height: 16px;
          &.is-stars{
            float: left;
           }
           &.is-ages{
            float: right;
            }
        }
      }
    }
  }
}
</style>
