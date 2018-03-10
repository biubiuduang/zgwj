<template>
  <div>
    <div class="page-infinite-wrapper" ref="wrapper">
    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"  ref="loadmore">
      <ul>
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
        allLoaded : false,
        list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        bottomStatus: '',
      }
    },
    methods: {
      loadBottom: function(){
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        if(this.list.length >= 100){
          this.allLoaded = true;// 若数据已全部获取完毕
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    }
  }
</script>
<style scoped>
  li{
    height: 2rem;
  }
</style>
