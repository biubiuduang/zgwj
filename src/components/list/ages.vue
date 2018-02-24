<template>
    <div class="item item-0">
        <ul class="ages-list">
          <li v-for="(item, index) in list" @click="handleList(item,index)">
            {{item}}
          </li>
        </ul>
    </div>
</template>
<script>
    export default {
      data() {
        return {
          list: ['全部','0-6个月','6-12个月','1-2岁','2-3岁','3-6岁','6-12岁','12岁以上'],
        }
      },
      methods: {
        handleList: function(item,index){
          this.$emit('handleAges',item);
          $(".ages-list li").removeClass("active").eq(index).addClass("active");
        }
      }
    }
</script>
<style scoped lang="less">
  ul{
    li{
      text-align: left;
      line-height: 24px;
      font-size: 14px;
      color:#000000;
      padding:5px 15px;
      &.active{
        color:#2e6da4;
      }
    }
  }
</style>
