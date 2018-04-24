<template>
    <div class="item item-1">
        <ul class="brand-list">
           <li class="col-xs-3" v-for="(item,index) in brand" @click="handleList(item.category_name,index,item.category_id)">
             <div v-if="item.image_url" :style="{ backgroundImage: 'url(' + item.image_url + ')','background-repeat':'no-repeat','background-size':'cover','background-position':'center' }"></div>
             <p>{{item.category_name}}</p>
           </li>
        </ul>
    </div>
</template>
<script>
    export default {
      props:{
        brand: Array,
      },
      data() {
        return {
          list: [
            {
              name: '全部玩具',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
            {
              name: '品牌1',
              img: 'http://p1.img.cctvpic.com/photoworkspace/contentimg/2015/05/13/2015051311272376066.jpg',
            },
          ]
        }
      },
      methods: {
        handleList: function(data,index,id){
          this.$emit("handleBrand",id);
          $(".brand-list li").removeClass("active").eq(index).addClass("active");
        }
      }
    }
</script>
<style scoped lang="less">
  @import "../../assets/css/parameters.less";
.brand-list{
  overflow: hidden;
  li{
    text-align:center;
    padding:10px;
    box-sizing: border-box;
    border-right: 1px solid #666666;
    border-bottom: 1px solid #666666;
    height:90px;
    line-height:90px;
    div{
      width: 100%;
      margin: 0 auto;
      height: 50px;
    }
    p{
      line-height: 70px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    div+p{
      width: 100%;
      line-height: 20px;
    }
    &.active{
      color:@blue;
    }
  }
}
</style>
