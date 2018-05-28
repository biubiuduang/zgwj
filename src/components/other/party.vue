<template>
  <div class="padding-box padding-top">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <video width="100%" x5-playsinline  playsinline  webkit-playsinline="true"  height="auto" autoplay="autoplay" poster="../../assets/img/1.jpeg">
      <!--<source src="http://www.w3school.com.cn/i/movie.mp4" type="video/mp4">-->
      <source src="../../assets/party.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="article-content">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        content:{},
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
            article_id: '2'
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
