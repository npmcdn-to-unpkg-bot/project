$.extend($.fn, {   
    //
    buildHomeList : function(data, isFirst){
              var _this = $(this);
              //是否第一页
              if(isFirst){
                _this.children().remove(); 
              }
                  
              $.each(data, function(k, v){
                  var temp = '<li><a href="home-photo.html"><div class="ui-grid-halve-img"><img src="../images/11.jpg" /></div><h6 class="ui-nowrap">东南亚装修效果图大全</h6></a></li>' 
                  _this.append(temp);
               });
    }
});


var throttle = function(fn, delay){
  var timer = null;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(context, args);
    }, delay);
  };
 };


var loadMore = function(){
      //console.log("aa");
      if($(window).scrollTop()>=$(document).height()-$(window).height() && $("#loading").css("display") === "none"){
              var pageNum = $("#loading").data("pageNum");
              $("#loading").css("display", "block");

              /*getNewshouseData.getList("340100", "area", pageNum, function(houseData){
                pageNum += 1;
                $("#loading").data({"pageNum" : pageNum});
                $("#loading").css("display", "none");
                setTimeout(function(){
                  $("#newshouselist").buildList(houseData, false);
                }, 200); 
              });*/
       } 
};

$(function(){
    //返回顶部
    $("#goTop").backTop();

    //
    $("#filter-area").firstFliter();
    $(".area-type").secondFliter($(".fliter-area-type"));
    $("#filter-type").firstFliter();
    $("#filter-sort").firstFliter();

    //加载更多
    // window.onscroll = throttle(loadMore, 300);
});