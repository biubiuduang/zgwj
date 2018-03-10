<template>
    <div class="item item-0">
        <ul class="ages-list">
          <li v-for="(item, index) in ages" @click="handleList(item.category_name,index,item.category_id)">
            {{item.category_name}}
          </li>
        </ul>
    </div>
</template>
<script>
    export default {
      props: {
        ages: Array,
      },
      methods: {
        handleList: function(item,index,id){
          this.$emit('handleAges',id);
          $(".ages-list li").removeClass("active").eq(index).addClass("active");
        }
      }
    }
</script>
<style scoped lang="less">
  ul{
    li{
      text-align: left;
      line-height: 1.92rem;
      font-size: 0.7rem;
      color:#3e3e3e;
      padding: 0 0.7rem;
      &.active{
        color:#2396FF;
      }
    }
  }
</style>
