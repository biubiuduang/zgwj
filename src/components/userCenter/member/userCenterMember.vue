<template>
  <div class="padding-top">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <ul class="member-list">
      <template v-for="item in memberList">
        <router-link tag="li" :to="{path:'/memberClass',query:{id: item.card_id} }">{{item.card_name}}</router-link>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        memberList: []
      }
    },
    activated() {
      this.handleGetList();
    },
    methods: {
      handleGetList: function(){
        var that = this;
        this.newAjax({
          url: "user/get_gradecards",
          success: function(data){
            console.log(data);
            var len = data.data.items.length;
            for(var i =0; i<len;i++){
              if(data.data.items[i].card_type == 1){
                that.memberList.push(data.data.items[i]);
              }
            }
          }
        })
      }
    }
  }
</script>
<style lang="less">
.member-list{
  text-align: center;
  li{
    width: 15.12rem;
    height: 5.04rem;
    margin: 1rem auto;
    font-size: 0.8rem;
    line-height: 5.04rem;
    border-radius: 0.8rem;
    background-color: #d8d8d8;
    border-bottom: 1px solid #ffffff;
  }
}
</style>
