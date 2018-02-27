<template>
    <div>
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" ref="loadmore">
        <ul class="order-list">
          <li>
            <p class="order-number">订单号:100000012 <span>已完成</span></p>
            <div class="pv-img">
              <p class="img-box flex-center">
                <img src="/static/img/36icons-Home.9cf4650.png" alt="">
              </p>
            </div>
            <div class="pv-info">
              <p class="p-title">产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称</p>
              <div class="info-msg">
                <p class="is-stars">星标玩具</p>
                <p class="is-ages">订单状态</p>
              </div>
            </div>
          </li>
        </ul>
        <p class="loading-bottom" v-if="allLoaded == true">没有更多数据了.</p>
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
<style scoped lang="less">
  .order-list{
    overflow: scroll;
    max-height:100%;
    .order-number{
      line-height: 2rem;
      background-color: #e1e1e1;
      font-size: 0.7rem;
      text-align: left;
      text-indent: 1rem;
      margin:-0.5rem -0.5rem 0.5rem -0.5rem;
      span{
        float: right;
        margin-right: 1rem;
      }
    }
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
          height: 1.5rem;
          p{
            font-size: 0.8rem;
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
  .loading-bottom{
    margin-top:0.5rem;
    line-height: 1.5rem;
    font-size: 0.8rem;
  }
</style>
