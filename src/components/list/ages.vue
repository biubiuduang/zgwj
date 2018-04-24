<template>
    <div class="item item-0 container">
        <ul class="ages-list row">
          <li v-for="(item, index) in ages" class="col-xs-4" @click="handleList(item.category_name,index,item.category_id)">
            <p>{{item.category_name}}</p>
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
  @import "../../assets/css/parameters.less";
  ul{
    margin:1rem auto;
    li{
      text-align: center;
      line-height: 1.5rem;
      font-size: 0.8rem;
      color:#666666;
      padding:0.3rem;
      p{
        background-color: #e3e3e3;
        border-radius: 0.75rem;
      }
      &.active{
        p{
          color:#ffffff;
          background-color: @blue;
        }
      }
    }
  }
</style>
