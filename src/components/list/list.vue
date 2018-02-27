<template>
    <div>
      <mt-search
        v-model="value"
        placeholder="搜索">
      </mt-search>
      <div class="choice-box">
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
      <div class="page-infinite-wrapper" ref="wrapper">
          <div class="list-box">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange">
            <ul class="pv-list">
              <template v-for="item in goodsList">
              <router-link tag="li" :to="'/detail/'+item.goods_id">
                <div class="pv-img flex-center">
                    <img :src="item.goods_thumb" alt="">
                </div>
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
            <div slot="bottom" class="mint-loadmore-bottom" :class="allLoaded == true?'mint-loadmore-bottom-to':''">
              <span class="load-icon" v-if="allLoaded == false">
                <mt-spinner type="fading-circle"></mt-spinner>
              </span>
              <span v-else>没有更多数据了</span>
            </div>
          </mt-loadmore>
          </div>
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
          searchAll: [{category_name:"全部",category_id:""}],
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
            is_star: '',
            has_stock: '1',
            type_id: this.$route.query.type,
            ability_id: this.$route.query.ability,
            order_str: 'default',
            start: '0',
            number:'30',
          },
          addOn: true,
          goodsList: [
            {
              goods_id:1,
              goods_name: "产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称",
              age_name: "0-6个月",
              goods_thumb:"/static/img/36icons-Home.9cf4650.png",
              is_star:1,
              page_count:100,
              page_number: 10,
            },
            {
              goods_id:1,
              goods_name: "产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称",
              age_name: "0-6个月",
              goods_thumb:"/static/img/36icons-Home.9cf4650.png",
              is_star:2,
              page_count:100,
              page_number: 10,
            },
            {
              goods_id:1,
              goods_name: "产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称",
              age_name: "0-6个月",
              goods_thumb:"/static/img/36icons-Home.9cf4650.png",
              is_star:1,
              page_count:100,
              page_number: 10,
            },
            {
              goods_id:1,
              goods_name: "产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称",
              age_name: "0-6个月",
              goods_thumb:"/static/img/36icons-Home.9cf4650.png",
              is_star:1,
              page_count:100,
              page_number: 10,
            },
            {
              goods_id:1,
              goods_name: "产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称",
              age_name: "0-6个月",
              goods_thumb:"/static/img/36icons-Home.9cf4650.png",
              is_star:1,
              page_count:100,
              page_number: 10,
            }
          ],
          bottomStatus: '',
          allLoaded: false,
        }
      },
      activated() {
        console.log(this.$route.query.type);
        console.log(this.search);
        this.handleGoodsList();
        this.handleClassList();
        this.handleDocument();
        this.handleEnter();
        console.log(this.goodsList.length);
      },
      methods: {
        //获取玩具列表
        handleGoodsList: function(d){
          var that = this;
          this.newAjax({
            url: 'goods/get_goodes',
            data: d,
            success: function(data){
              that.goodsList = data.data.items;
            }
          })
        },
        //获取玩具分类
        handleClassList: function(){
          var that = this;
          this.newAjax({
            url:"goods/get_categories",
            success: function(data){
              console.log(data);
              that.searchList.ages = that.searchAll.concat(data.data.items[0].child[0]);
              that.searchList.brand = that.searchAll.concat(data.data.items[1].child[0]);
              that.searchList.type = data.data.items[3].child[0];
              that.searchList.ability = data.data.items[4].child[0];
            }
          })
        },
        //Tabs点击事件
        handleTabs: function(index){
          if($(".choice-list li:eq("+index+")").hasClass("active")){
            $(".choice-list li:eq("+index+")").removeClass("active");
            this.list.isShow = false;
          }else{
            $(".choice-list li").removeClass("active").eq(index).addClass("active");
            $(".item").hide();
            $(".item-"+index).show();
            this.list.isShow = true;
          }
        },
        handleDocument: function(){
          let that = this;
          $(document).on("click",function(){
            that.list.isShow = false;
            $(".choice-list li").removeClass("active");
          });
          $(".choice-box .item,.choice-box .choice-list").on("click",function(event){
            event.stopPropagation();
          })
        },
        handleEnter: function(){
          $('.mint-searchbar-core').bind('keyup', function(event) {
            if (event.keyCode == "13") {
              //回车执行查询
              alert($(this).val());
            }
          });
        },
        handleAges: function(data){
          let that = this;
          that.search.age_id = data;
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");
          console.log(that.search);
        },
        handleBrand: function(data){
          let that = this;
          that.search.brand_id = data;
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");
          console.log(that.search);
        },
        handleType: function(data){
          let that = this;
          that.search.is_star= data.stars;
          that.search.has_stock= data.store;
          that.search.type_id= data.type;
          that.search.ability_id= data.ability;
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");
          console.log(that.search);
        },
        handleAuto: function(data){
          let that = this;
          that.search.order_str = data;
          that.list.isShow = false;
          $(".choice-list li").removeClass("active");
          console.log(that.search);
        },
        loadBottom: function() {
         // 加载更多数据
          this.allLoaded = true;// 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange: function(status) {
          this.bottomStatus = status;
        },
      }
    }
</script>
<style scoped lang="less">
  .mint-search{
    height: auto;
  }
  .choice-box{
    position: relative;
    z-index:3;
    .list-popup{
      position: fixed;
      left:0;
      top:86px;
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
    height: 30px;
    margin-top:10px;
    border-bottom:1px solid #e1e1e1;
    li{
      line-height: 20px;
      padding: 0 5px;
      border-right: 1px solid #333;
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
  .page-infinite-wrapper{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding:86px 0 50px 0;
    .list-box{
      width: 100%;
      height: 100%;
      overflow: scroll;
    }
  }
  .load-icon{
    width: 28px;
    height: 28px;
    display: block;
    margin:0 auto;
  }
  .mint-loadmore-bottom-to{
    margin-bottom: 0;
  }
  .pv-list{
    overflow: scroll;
    max-height:100%;
    li{
      border-bottom: 1px solid #ebebeb;
      overflow: hidden;
      padding: 0.5rem;
      .pv-img{
        width: 6rem;
        height: 6rem;
        float:left;
        img{
          width: 100%;
        }
      }
      .pv-info{
        float:left;
        width: 11rem;
        padding-left: 0.46rem;
        text-align: left;
        .p-title{
          font-size: 0.8rem;
          color: #252525;
          padding: 0 .13rem;
          margin:0.5rem 0 2.1rem 0;
          white-space: normal;
          height: 2.4rem;
          -webkit-line-clamp: 2;
          line-height: 1.2rem;
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
          height: 1rem;
          p{
            font-size: 0.7rem;
            line-height: 1rem;
            &.is-stars{
              float:left;
            }
            &.is-ages{
              float:right;
            }
          }
        }
      }
    }
  }
</style>
