<template>
    <div>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul class="order-list">
          <li>
            <p class="order-number">订单号:100000012 <span>已完成</span></p>
            <div class="pv-img"></div>
          </li>
        </ul>
        <p class="" v-if="allLoaded == true">没有更多数据了.</p>
      </mt-loadmore>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          allLoaded : false,
          list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
        }
      },
      methods: {
        loadBottom: function(){
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.allLoaded = true;// 若数据已全部获取完毕

          this.$refs.loadmore.onBottomLoaded();
        },
        handleBottomChange: function(){
          console.log(1212121);
        }
      }
    }
</script>
<style scoped>
  li{
    height: 2rem;
  }
</style>
