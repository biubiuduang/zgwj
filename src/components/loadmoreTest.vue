<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <p class="backNav">
        <i class="el-icon-arrow-left" @click="$router.back()"></i>
        {{$store.state.title}}
      </p>
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
          <template v-for="item in goodsList">
            <router-link tag="li" class="page-loadmore-listitem" :to="'/detail/'+item.goods_id">
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

<script type="text/babel">
  export default {
    data() {
      return {
        goodsList: [],
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
        listCount: 0,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0
      };
    },

    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleInit: function(){
//        setTimeout(() => {
//          for (let i = 1; i <= 20; i++) {
//            this.list.push(i);
//          }
//          this.allLoaded = false;
//        }, 3000);
        var that = this;
        this.search.start = 0;
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
                that.allLoaded = true;
              }
            } else {
              that.allLoaded = true;
            }
          }
        })
      },
      handleMore: function(){
//        let lastValue = this.list[this.list.length - 1];
//        setTimeout(() => {
//          for (let i = 1; i <= 10; i++) {
//            this.list.push(lastValue + i);
//          }
//        },3000);
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
                that.allLoaded = true;
              }
            } else {
              that.allLoaded = true;
            }
          }
        })

      },
      loadBottom() {
        if (this.goodsList.length < this.listCount) {
          this.handleMore();

        } else {
          this.allLoaded = true;
        }
          this.$refs.loadmore.onBottomLoaded();

      }
    },

    created() {
      this.handleInit();
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  };
</script>

<style scoped>
.page-loadmore-listitem{
  height: 100px;
}
</style>
