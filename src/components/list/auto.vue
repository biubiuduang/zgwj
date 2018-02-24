<template>
  <div class="item item-3">
    <ul class="auto-list">
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
        list: ['默认排序','人气最高','最新上架','价格最高','价格最低'],
      }
    },
    methods: {
      handleList: function(item,index){
        this.$emit('handleAuto',item);
        $(".auto-list li").removeClass("active").eq(index).addClass("active");
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
