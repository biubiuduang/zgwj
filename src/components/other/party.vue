<template>
  <div class="padding-box padding-top">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <h2 class="title">派对服务</h2>
    <div class="article-content">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        content:{}
      }
    },
    activated(){
      this.handleContent();
    },
    methods: {
      handleContent: function(){
        var that = this;
        this.newAjax({
          url: 'article/get_article',
          data:{
            article_id: '1'
          },
          success: function(data){
            if(data.status == 200){
              that.content = data.data;
              $(".article-content").html(data.data.article_content);
            }
          }
        })
      }
    }
  }
</script>
<style scoped>
  .title{
    font-size: 1rem;
    line-height: 3rem;
  }
</style>
