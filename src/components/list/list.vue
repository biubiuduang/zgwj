<template>
  <div class="page-loadmore list">
    <div class="choice-box">
      <div class="search-box">
        <mt-search
          v-model="value"
          cancel-text=""
          placeholder="搜索玩具">
        </mt-search>
      </div>
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
    <ul class="page-loadmore-list row">
      <template v-for="item in goodsList">
        <router-link tag="li" class="goods-list col-xs-6" :to="'/detail/'+item.goods_id">
          <div class="pv-img"
               :style="{ backgroundImage: 'url(' + item.goods_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
          <div class="pv-info">
            <p class="p-title">{{item.goods_name}}</p>
            <div class="info-msg">
              <p class="is-stars" v-if="item.is_star == 1">星标玩具</p>
              <p class="is-stars" v-else>非星标玩具</p>
              <p class="age-name goods-price">吊牌价:{{item.goods_price}}</p>
            </div>
          </div>
        </router-link>
      </template>
    </ul>
    <div slot="bottom" class="mint-loadmore-bottom">
      <!--<span v-if="allLoaded">↑加载更多</span>-->
      <span>没有更多数据了!</span>
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
      Ages, Brand, Type, Auto
    },
    data() {
      return {
        value: "",
        list: {
          isShow: false,
          data: ['年龄', '品牌', '筛选', '默认排序'],
        },
        searchAll: [{category_name: "全部", category_id: "全部"}],
        searchList: {
          ages: [],
          brand: [],
          type: [],
          ability: [],
        },
        search: {
          keywords: '',
          age_id: '',
          brand_id: '',
          is_star: '2',
          has_stock: '2',
          type_id: '',
          ability_id: '',
          order_str: '',
          start: '0',
          number: '30',
        },
        addOn: true,
        goodsList: [],
        listCount: 0,
        bottomStatus: '',
        allLoaded: true,
      }
    },
    created() {
      this.handleOnloadList();
    },
    methods: {
      //初始化
      handleOnload: function () {
        if (sessionStorage.getItem("refresh") === "yes") {
          sessionStorage.setItem("refresh", "no");
          window.location.reload();
        } else {
          sessionStorage.setItem("refresh", "no")
        }
      },
      handleOnloadList: function () {
        this.search = {
          keywords: this.$route.query.keywords || '',
          age_id: this.$route.query.ages || '',
          brand_id: this.$route.query.brand || '',
          is_star: '2',
          has_stock: '2',
          type_id: this.$route.query.type || '',
          ability_id: this.$route.query.ability || '',
          order_str: this.$route.query.order_str || '',
          start: '0',
          number: '30',
        };
        this.handleInitList();
      },
      //滚动条滚动到底部,加载下一页
      listScroll: function(){
        var that = this;
        $(window).scroll(function() {
          var scrollTop = $(this).scrollTop();
          var scrollHeight = $(document).height();
          var windowHeight = $(this).height();
          if(!that.allLoaded && scrollTop + windowHeight == scrollHeight && that.$route.name == 'list') {
// 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
            that.handleGoodsList();
          }
        });
      },
      //获取玩具列表
      handleGoodsList: function () {
        var that = this;
        this.search.start = this.goodsList.length;
        if(!that.allLoaded){
          that.allLoaded = true;
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
                  // var goodsId = [];
                  // for(var j = 0; j < that.goodsList.length ;j ++){
                  //   goodsId.push(that.goodsList[j].goods_id);
                  // }
                  // console.log(goodsId);
                  if(that.goodsList.length == data.data.page.count){
                    that.allLoaded = true;
                  }else{
                    that.allLoaded = false;
                  }
                } else {
                  that.goodsList = [];
                }
              } else {
                that.goodsList = [];
              }
            }
          })
        }
      },
      handleInitList: function () {
        var that = this;
        $("html,body").animate({scrollTop:0}, 500);
        this.allLoaded = true;
        this.goodsList = [];
        this.search.start = '0';
        this.newAjax({
          url: 'goods/get_goodes',
          data: that.search,
          success: function (data) {
            if (data.status == 200) {
              if (data.data.items != undefined) {
                that.goodsList = data.data.items;
                that.listCount = data.data.page.count;
                // var goodsId = [];
                // for(var i = 0; i < that.goodsList.length ;i ++){
                //   goodsId.push(that.goodsList[i].goods_id);
                // }
                // console.log(goodsId);
                if(data.data.items.length == data.data.page.count){
                  that.allLoaded = true;
                }else{
                  that.allLoaded = false;
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
            console.log("keykeykey");
            $(".page-loadmore-list").html("");
            //回车执行查询
//              that.search.keywords = $(this).val();
//              that.handleInitList();

            sessionStorage.setItem("refresh", "yes");
            that.$router.push({path: '/list', query: {keywords: $(this).val()}});
            window.location.reload();
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

        that.search.keywords = '';
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
        that.search.keywords = '';
        that.list.isShow = false;
        $(".choice-list li").removeClass("active");

        console.log("brand");
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

        that.search.keywords = '';
        that.handleInitList();
      },
      handleAuto: function (data) {
        let that = this;
        that.search.order_str = data;
        that.list.isShow = false;
        $(".choice-list li").removeClass("active");
        that.search.keywords = '';
        that.handleInitList();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    },
    activated() {
      if(this.$route.meta.keepStatus){
        this.handleOnloadList();
      }
      this.handleOnload();
      this.handleClassList();
      this.handleDocument();
      this.handleEnter();
      this.listScroll();
    },
    watch: {
      '$route'(to, from) {
        // data数据操作
        if (this.$route.query.keywords) {
          this.search.keywords = this.$route.query.keywords;
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      if(to.meta.name =="index"){
        to.meta.keepAlive = false;
      }
      from.meta.keepStatus = false;
      to.meta.keepAlive = true;
      next();
    }
  }
</script>
<style lang="less">

  @import "../../assets/css/parameters.less";

  .page-loadmore{
    padding: 112px 0 62px 0;
  }
  .list {
    background-color: #ffffff;
    .search-box {
      background-color: @primary-color;
      padding: 10px;
    }
    .mint-search {
      height: 36px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 0.864rem;
    }
    .mint-searchbar {
      height: 36px;
      padding: 0;
      border-radius: 18px;
      background: none;
      input {
        border-radius: 18px;
      }
    }
    .mint-searchbar-inner {
      background: none;
      .mintui-search, .mint-searchbar-core {
        padding-left: 10px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .choice-box {
      width: 100%;
      background-color: #ffffff;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 3;
      .list-popup {
        position: fixed;
        left: 0;
        top: 102px;
        z-index: 4;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        .item {
          width: 100%;
          max-height: 18rem;
          background-color: #ffffff;
          overflow: scroll;
        }
      }
    }
    .choice-list {
      overflow: hidden;
      height: 46px;
      padding: 13px 0;
      border-bottom: 1px solid #e1e1e1;
      li {
        line-height: 20px;
        padding: 0 5px;
        font-size: 14px;
        border-right: 1px solid #333;
        color: #666666;
        &:last-child {
          border-right: none;
        }
        &.active {
          color: #1b6d85;
          i {
            &:after {
              content: '\e608';
            }
          }
        }
      }
    }
    .row {
      padding: 0 3px;
    }
    .goods-list {
      padding: 10px 3px;
      .pv-img {
        width: 100%;
        padding-top: 100%;
        background-color: #d8d8d8;
        border-radius: 5px;
        img {
          width: 100%;
        }
      }
      .pv-info {
        text-align: left;
        width: 100%;
        position: relative;
        font-size: 14px;
        padding: 0 8px;
        .p-title {
          color: #666666;
          font-weight: 800;
          white-space: normal;
          height: 36px;
          margin: 5px 0;
          font-size: 16px;
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
        .info-msg {
          overflow: hidden;
          margin: 10px 0;
          font-size: 14px;
          p {
            line-height: 16px;
            &.goods-price {
              margin-top: 5px;
              color: @primary-color;
            }
          }
        }
      }
    }
  }
</style>
