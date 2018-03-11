<template>
  <div>
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
            that.memberList = data.data.items
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
    font-size: 0.8rem;
    line-height: 8rem;
    border-radius: 0.8rem;
    background-color: #d8d8d8;
    border-bottom: 1px solid #ffffff;
  }
}
</style>
