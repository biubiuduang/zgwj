<template>
    <div class="item item-2">
      <div class="filterListBox">
        <div class="filterKindBox">
          <p class="kindName">默认排序</p>
          <ul class="kindFloat list-1">
            <li class="col-xs-4" v-for="item in defaultType" :data-label="item.category_id" @click="handleList($event)"><span>{{item.category_name}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">库存</p>
          <ul class="kindFloat list-2">
            <li class="col-xs-4" v-for="item in storeType" :data-label="item.category_id" @click="handleList($event)"><span>{{item.category_name}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">玩具类型</p><p @click="handleKindMore" class="group-more kind-more">更多 <i class="iconfont icon-up"></i></p>
          <ul class="ulBox list-3">
            <li v-for="(item,index) in type" @click="handleArray($event,array.type)" :data-label="item.category_id" class="col-xs-4" :class="index > 5 ? 'kindHide' : 'kindShow'"><span>{{item.category_name}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">锻炼能力</p><p @click="handlePowerMore" class="group-more power-more">更多 <i class="iconfont icon-up"></i></p>
          <ul class="ulBox list-4">
            <li v-for="(item,index) in ability" @click="handleArray($event,array.ability)" :data-label="item.category_id" class="col-xs-4"  :class="index > 5 ? 'powerHide' : 'powerShow'"><span>{{item.category_name}}</span></li>
          </ul>
        </div>
      </div>
      <div class="filterOperate">
        <span class="resetBtn" @click="handleReset">重置</span>
        <span class="finishBtn" @click="handleFinish">完成</span>
      </div>
    </div>
</template>
<script>
    export default {
      props: {
        type: Array,
        ability: Array
      },
      data() {
        return {
          defaultType: [
            {category_name:'全部',category_id:'2'},
            {category_name:'星标',category_id:'1'},
            {category_name:'非星标',category_id:'0'},
          ],
          storeType: [{category_name:'近看有货',category_id:'1'}],
          array: {
            type: [],
            ability: [],
          },
          typeData: {
            stars : '',
            store : '',
            type : '',
            ability : ''
          }
        }
      },
      methods: {
        handleList: function(e){
          if($(e.target).parent().hasClass("active")){
            $(e.target).parent().removeClass("active");
          }else{
            $(e.target).parent().addClass("active").siblings("li").removeClass("active");
          }
        },
        handleArray: function(e,a){
          var id = $(e.target).parent().attr("data-label");
          if($(e.target).parent().hasClass("active")){
            a.splice($.inArray(id,a),1);
            console.log(a);
            $(e.target).parent().removeClass("active");
          }else{
            $(e.target).parent().addClass("active");
            a.push(id);
            console.log(a);
          }
        },
        handleKindMore: function(){
          $(".kind-more .icon-up").toggleClass("icon-down");
          $(".kindHide").toggleClass("kindShow");
        },
        handlePowerMore: function(){
          $(".power-more .icon-up").toggleClass("icon-down");
          $(".powerHide").toggleClass("powerShow");
        },
        handleReset: function(){
          $(".active").removeClass("active");
          this.array.type = [];
          this.array.ability = [];
        },
        handleFinish: function(){
          this.typeData.stars = $(".list-1 .active").attr("data-label");
          this.typeData.store = $(".list-2 .active").attr("data-label");
          this.typeData.type = this.array.type.join(",");
          this.typeData.ability = this.array.ability.join(",");
          this.$emit('handleType',this.typeData);
        }
      }
    }
</script>
<style scoped lang="less">

  @import "../../assets/css/parameters.less";
  .filterKindBox{
    overflow: hidden;
    padding:0.7rem;
    p{
      line-height: 32px;
      font-size:0.7rem;
      width:3.5rem;
      color:#999999;
      &.kindName{
        float: left;
        margin-right: 0.4rem;
        text-align: left;
      }
      &.group-more{
        line-height: 32px;
        float: right;
        color:#a2a2a2;
      }
    }
    ul{
      width:100%;
      overflow:hidden;
      padding-top:1rem;
      li{
        float: left;
        margin-bottom: 10px;
        padding: 0 5px;
        span{
          display: block;
          width: 100%;
          color:#666666;
          background-color: #e3e3e3;
          font-size: 14px;
          line-height: 32px;
          border-radius: 16px;
        }
        &.active{
          span{
            background-color: @blue;
            color: #fff;
          }
        }
        &.kindHide,&.powerHide{
          display: none;
        }
        &.kindShow,&.powerShow{
          display: block;
        }
      }
      &.kindFloat{
       li{
         margin-bottom:0;
         span{
           padding: 0 10px;
         }
       }
     }
    }
  }
  .item-2{
    position: relative;
    height:18rem;
  }
  .filterListBox{
    height: 15.5rem;
    overflow: scroll;
  }
  .filterOperate{
    height: 2.5rem;
    text-align: right;
    span{
      display: inline-block;
      width: 50%;
      float: left;
      text-align: center;
      font-size: .8rem;
      height: 2.5rem;
      line-height: 2.5rem;
      &.finishBtn{
         color: #fff;
         background-color: @blue;
       }
    }
  }
</style>
