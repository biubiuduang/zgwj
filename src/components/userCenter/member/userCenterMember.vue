<template>
  <div class="padding-top">
    <p class="backNav">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      {{$store.state.title}}
    </p>
    <ul class="member-list">
      <template v-for="item in memberList">
        <router-link tag="li" :to="{path:'/memberClass',query:{id: item.card_id} }"
                     :style="{ backgroundImage: 'url(' + item.card_thumb + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"
        >
          <!--<template v-if="item.card_type == 1">-->
          <!--<p class="card-name">{{item.card_name}}</p>-->
          <!--<p class="card-date">有效期:{{item.card_no}}</p>-->
          <!--</template>-->
          <!--<template v-else>-->
            <!--<p class="card-name">{{item.card_name}}</p>-->
            <!--<p class="card-date">物流次数:{{item.card_no}}</p>-->
          <!--</template>-->

        </router-link>
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
        this.memberList= [];
        this.newAjax({
          url: "user/get_gradecards",
          success: function(data){
            console.log(data);
            var len = data.data.items.length;
            for(var i =0; i<len;i++){
//              if(data.data.items[i].card_type == 1){
//                that.memberList.push(data.data.items[i]);
//              }
                that.memberList.push(data.data.items[i]);
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
    height: 6.23785rem;
    margin: 1rem auto;
    padding: 0 1rem;
    font-size: 0.8rem;
    border-radius: 0.8rem;
    background-color: #d8d8d8;
    border-bottom: 1px solid #ffffff;
    p{
      color:#ffffff;
      font-size:1rem;
      font-weight:800;
      &.card-name{
          line-height: 2.52rem;
          text-align: left;
       }
      &.card-date{
          line-height: 2.52rem;
          text-align: right;
       }
    }
  }
}
</style>
