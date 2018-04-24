<template>
  <div class="item item-3">
    <ul class="auto-list">
      <li v-for="(item, index) in list" class="col-xs-4" @click="handleList(item.category_id,index)">
        <p>{{item.category_name}}</p>
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
  @import "../../assets/css/parameters.less";
  ul{
    overflow: hidden;
    margin:1rem 0;
    li{
      line-height: 2rem;
      font-size: 0.7rem;
      color:#666666;
      text-align: center;
      padding:0.3rem;
      p{
        background-color: #e3e3e3;
        border-radius: 1rem;
      }
    &.active{
       color:#2396FF;
      p{
        color:#ffffff;
        background-color: @blue;
      }
     }
    }
  }
</style>
