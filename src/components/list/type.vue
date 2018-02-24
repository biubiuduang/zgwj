<template>
    <div class="item item-2">
      <div class="filterListBox">
        <div class="filterKindBox">
          <p class="kindName">默认排序</p>
          <ul class="kindFloat list-1">
            <li v-for="item in defaultType" :data-label="item" @click="handleList($event)"><span>{{item}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">库存</p>
          <ul class="kindFloat list-2">
            <li v-for="item in storeType" :data-label="item" @click="handleList($event)"><span>{{item}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">玩具类型</p><p @click="handleKindMore" class="group-more kind-more">更多 <i class="iconfont icon-up"></i></p>
          <ul class="ulBox list-3">
            <li v-for="(item,index) in kindType" @click="handleList($event)" :data-label="item" class="col-xs-3" :class="index > 7 ? 'kindHide' : 'kindShow'"><span>{{item}}</span></li>
          </ul>
        </div>
        <div class="filterKindBox">
          <p class="kindName">锻炼能力</p><p @click="handlePowerMore" class="group-more power-more">更多 <i class="iconfont icon-up"></i></p>
          <ul class="ulBox list-4">
            <li v-for="(item,index) in powerType" @click="handleList($event)" :data-label="item" class="col-xs-3"  :class="index > 7 ? 'powerHide' : 'powerShow'"><span>{{item}}</span></li>
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
      data() {
        return {
          defaultType: ['全部','星标','非星标'],
          storeType: ['近看有货'],
          kindType: ['类型一','类型二','类型三','类型四','类型五','类型六','类型七','类型八','类型九','类型十','类型十一','类型十二','类型十三'],
          powerType: ['类型一','类型二','类型三','类型四','类型五','类型六','类型七','类型八','类型九','类型十','类型十一','类型十二','类型十三'],
          typeData: {
            stars : '',
            store : '',
            type : '',
            power : ''
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
        },
        handleFinish: function(){
          this.typeData.stars = $(".list-1 .active").attr("data-label");
          this.typeData.store = $(".list-2 .active").attr("data-label");
          this.typeData.type = $(".list-3 .active").attr("data-label");
          this.typeData.power = $(".list-4 .active").attr("data-label");
          this.$emit('handleType',this.typeData);
        }
      }
    }
</script>
<style scoped lang="less">
  .filterKindBox{
    overflow: hidden;
    border-bottom: 1px solid #d6d6d6;
    padding:0.7rem 0.7rem;
    p{
      line-height: 32px;
      font-size:0.7rem;
      width:3.5rem;
      color:#3d3d3d;
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
      li{
        float: left;
        margin-bottom: 10px;
        padding: 0 5px;
        span{
          display: block;
          width: 100%;
          border:1px solid #d6d6d6;
          font-size: 14px;
          line-height: 32px;
          border-radius: 5px;
        }
        &.active{
          span{
            background-color: #f26257;
            color: #fff;
            border-color: #f15144;
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
       width: auto;
       float: left;
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
    padding: 0.26rem 0;
    height: 2.5rem;
    text-align: right;
    border-top:1px #d8d8d8 solid;
    span{
      display: inline-block;
      padding: .24rem 1rem;
      border-radius: 8px;
      font-size: .37rem;
      margin-right: .46rem;
      border:1px #d8d8d8 solid;
      height: 1.8rem;
      line-height: 1.32rem;
      box-sizing: border-box;
      &.finishBtn{
         border: 1px #7079c3 solid;
         color: #fff;
         background-color: #89abd9;
       }
    }
  }
</style>
