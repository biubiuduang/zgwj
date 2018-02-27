<template>
  <div class="item item-3">
    <ul class="auto-list">
      <li v-for="(item, index) in list" @click="handleList(item.category_id,index)">
        {{item.category_name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [{category_name:'默认排序',category_id:'default'},
          {category_name:'人气最高',category_id:'hot'},
          {category_name:'最新上架',category_id:'new'},
          {category_name:'价格最高',category_id:'price_high'},
          {category_name:'价格最低',category_id:'price_low'}
        ],
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
