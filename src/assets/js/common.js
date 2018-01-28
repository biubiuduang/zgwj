var baseParams = {
  ww : $(window).width()     //浏览器窗口宽度
};

const baseJs = {
  init: function(){
    let that = this;
    that.resetSize();
  },
  resetSize : function(){
      let size = baseParams.ww/18;
      $("html").css("font-size",size);
  },
};

$(function(){
  baseJs.init();
});
