var loadMore = {
   init : function(url, load, listBox){
     if($(window).scrollTop()>=$(document).height()-$(window).height() && $(load).css("display") === "none"){
              var pageNum = $(load).data("pageNum");

              $(load).css("display", "block");
              pageNum += 1;

              loadMore.getList(url, pageNum, function(data){
                if(data.length === 0 ){
                   if(!$(load).data("isOver")){
                     $(load).find("p").html("已经到底啦!");
                     $(load).data({"isOver" : true});
                   }
                   return;
                }
                
                $(load).data({"pageNum" : pageNum}).css("display", "none");
                setTimeout(function(){
                  loadMore.buildList(data, listBox);
                }, 200); 
              });
       } 
   },
   getList : function(url, pageNum, callback){
    var _url = url, siteId = $("#siteId").val();
    $.ajax({
              type: 'get',
              url: _url,
              data: {"pageNow" : pageNum, "siteId" : siteId},
              dataType: 'json',
              success: callback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
        });

   },
   buildList : function(data, box){
        var _this = $(this), temp = "";
                  
        $.each(data, function(k, v){
            temp += '<li class="ui-border-t">'
                +  '<a href="/huodong/'+v.id+' ">'
                +  '<img class="lazyload ui-list-img-s" src="STATIC_JS/lazyLoad/loading.png" data-original="'+v.photoUrl+'" alt=""></a>'
                +  '<div class="ui-list-info">'
                +  '<h4 class="ui-nowrap-multi">'
                +  '<a href="/huodong/detail/'+v.id+' ">'+v.title+'</a></h4>'
                +  '<div class="hf-f12 hf-fgray">已有<em>'+v.countRen+'</em>人参与</div>'
                +  '<div class="hf-f12"><i class="hf-icon-wallect2"></i>已结束</div>'
                +  '</div></li>';
        });
        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/Newhouse/Huodong/getmorehuodong", "#loading", "#listBox");
  }, 300);

});