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
        memberList: [
          {
            card_id:"1",
            card_name:"包年卡"
          },{
            card_id:"2",
            card_name:"包月卡"
          },{
            card_id:"3",
            card_name:"VIP卡"
          }
        ]
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
          }
        })
      }
    }
  }
</script>
<style lang="less">
.member-list{
  li{
    width: 100%;
    height: 8rem;
    font-size: 0.8rem;
    line-height: 8rem;
    background-color: #e1e1e1;
    border-bottom: 1px solid #ffffff;
  }
}
</style>
