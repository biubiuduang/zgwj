<template>
  <div class="page-loadmore">
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="page-loadmore-list">
          <li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
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
        list: [],
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
        setTimeout(() => {
          for (let i = 1; i <= 20; i++) {
            this.list.push(i);
          }
          this.allLoaded = false;
        }, 3000);
      },
      handleMore: function(){
        let lastValue = this.list[this.list.length - 1];
        setTimeout(() => {
          for (let i = 1; i <= 10; i++) {
            this.list.push(lastValue + i);
          }
        },3000);
      },
      loadBottom() {
        let lastValue = this.list[this.list.length - 1];
        console.log(lastValue);
        if (lastValue < 40) {
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
