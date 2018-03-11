<template>
    <div class="padding-box">
      <h2 class="title">{{content.article_title}}</h2>
      <div class="article-content">
        {{content.article_content}}
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
