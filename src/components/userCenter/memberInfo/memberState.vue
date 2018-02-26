<template>
    <div class="member-state">
      <p class="state-pause">您已暂停会员xxx天</p>
      <div class="state-box">
        <p class="title">
          年卡会员暂停权利:
        </p>
        <p>1.您是年卡会员,有一次暂停会员权利,最长30天;</p>
        <p>2.您可以在归还所有玩具时暂停会员,您的会员时间会因此顺延;</p>
        <p>3.暂停后30天会自动恢复.</p>
        <input type="button" value="暂停" />
      </div>
    </div>
</template>
<script>
    export default {}
</script>
<style scoped lang="less">
  .member-state{
    text-align: left;
  }
  .state-pause{
    line-height: 2.5rem;
    text-indent:2rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #e1e1e1;
  }
  .state-box{
    padding: 0 1rem;
    p{
      font-size: 0.7rem;
      line-height: 1rem;
      &.title{
         font-size: 0.8rem;
         line-height: 2.5rem;
       }
    }
    input{
      width: 80%;
      font-size: 14px;
      padding: 12px;
      color: #fff;
      background-color: #409EFF;
      border-color: #409EFF;
      border-radius: 5px;
      margin:2rem 0 0 10%;
    }
  }

</style>
