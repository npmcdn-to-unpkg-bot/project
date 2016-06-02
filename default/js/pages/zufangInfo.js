$(function(){
   //分享
   $("#shareBtn1").actionsheet({sheetContent : "#share", cancelBtn : "#shareCancelBtn", cssName : "show"});
   $("#shareBtn2").actionsheet({sheetContent : "#share", cancelBtn : "#shareCancelBtn", cssName : "show"});

   //收藏
   //$(".saveBtn").on("click", function(){
    //    $(this).toggleClass("on");
   //});


   //楼盘导航固定
   $(window).scroll(function() {
      var scrolls = parseInt($(this).scrollTop());

      //头部
      if(scrolls > 44){
       $("#header-transparent").hide();
       $("#header-blue").show();
      }else{
       $("#header-transparent").show();
       $("#header-blue").hide();
      }
   });

  //返回顶部
   $("#goTop").backTop();

   $("#foldBtn").on("click", function(){
      $("#aboutContent").css({"height":"auto"});
      $(this).hide();
   });
});