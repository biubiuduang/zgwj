<template>
    <div class="coupon">
      <mt-navbar v-model="selected" :fixed="true">
        <mt-tab-item id="1">未使用</mt-tab-item>
        <mt-tab-item id="2">已使用</mt-tab-item>
        <mt-tab-item id="3">已过期</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <div class="page-infinite-wrapper" ref="wrapper">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
          <ul class="">
            <li v-for="item in list">{{item}}</li>
          </ul>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑上拉加载更多</span>
            <span v-show="bottomStatus === 'loading'">
                  <mt-spinner type="snake"></mt-spinner>
                </span>
          </div>
          <p class="loading-bottom" v-if="allLoaded">没有更多数据了.</p>
        </mt-loadmore>
      </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          selected: "1",
          allLoaded : false,
          bottomStatus: '',
          list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        }
      },
      activated() {
        this.handleSele();
      },
      watch: {
        selected: function(val){
          this.handleSele();
        }
      },
      methods: {
        handleSele: function(){
          console.log(this.selected);
        },
        loadBottom: function(){
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.allLoaded = true;// 若数据已全部获取完毕

          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
      }
    }
</script>
<style scoped>
.coupon{
  padding: 50px 0 0 0;
}
</style>
