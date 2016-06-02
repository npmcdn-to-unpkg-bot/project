var loadMore = {
   init : function(url, load, listBox){
     if($(window).scrollTop()>=$(document).height()-$(window).height() && $(load).css("display") === "none"){
              var pageNum = $(load).data("pageNum");
              $(load).css("display", "block");
              if($(".hf-category-item.on").length>0){
                $(".hf-category-item.on").find("a").trigger("click");
              }
              pageNum += 1;
              loadMore.getList(url, pageNum, function (data) {
               if (data.length === 0) {
                    if (!$(load).data("isOver")) {
                        $(load).find("p").html("已经到底啦!");
                        $(load).data({"isOver": true});
                    }
                    return;
                }
                setTimeout(function () {
                    loadMore.buildList(data, listBox);
                }, 200);
                $(load).data({"pageNum": pageNum}).css("display", "none");
              });
       } 
   },
   getList : function(_url, pageNum, callback){
    var url = window.location.href.split("/")[4], _condition = {pageNow: pageNum};

    if(!!url){
       var con = url.split(/([0-9]+)/);
       $.each(con, function(k, v){
         //
         if((k+1)%2 === 0){
            return;
         }

         //
         switch(v){
            case "k" : $.extend(_condition, {id: con[k+1]});break; //空间
            case "f" : $.extend(_condition, {id: con[k+1]});break; //风格
            case "c" : $.extend(_condition, {id: con[k+1]});break; //主材
         }
       });
     }

     $.ajax({
              type: 'get',
              url: _url,
              data: _condition,
              dataType: 'json',
              success: callback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
       }); 

   },

   buildList : function(data, box){
        var _this = $(this);
        var temp = "";

        $.each(data, function(k, v){
            temp +='<li><a href="' + v.id + '"><img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + v.photoUrl + '"></a>'
                 +'<div><h6 class="ui-nowrap"><a href="' + v.id + '">' + v.title + '</h6></a></div> '
                 + '</li>';
        });

        $(box).append(temp);
   }

}
$(function(){
    //返回顶部
    $("#goTop").backTop();

    //
    $("#filter-space").firstFliter();
    var txt1 = $(".area-list.on").text();
    if(txt1 !== "不限"){
      $("#filter-area").find("span").text(txt1);
    }

    //
    $("#filter-style").firstFliter();
    var txt2 = $(".style-list.on").text();
    if(txt2 !== "不限"){
      $("#filter-style").find("span").text(txt2);
    }

    //
    $("#filter-material").firstFliter();
    var txt3 = $(".material-list.on").text();
    if(txt3 !== "不限"){
      $("#filter-material").find("span").text(txt3);
    }

    //加载更多
    $("#loading").data({"pageNum": 1, "isOver": false});
    window.onscroll = throttle(function () {
       loadMore.init("/home/index/photogetmore", "#loading", "#homePicList");
    }, 300);

    //图片懒加载
    picLazyLoad({
      className: "lazyload"
    });
});

