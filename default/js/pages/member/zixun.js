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
    var _url = url, type = $("#type").val();
    $.ajax({
              type: 'get',
              url: _url,
              data: {"pageNow" : pageNum, "type" : type},
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
            temp += '<li class="ui-border-t house-sales-list">'
                +  '<a href="'+v.url+'news/'+v.newsId+'/"><img src="'+v.photoUrl+'" class="ui-list-img-s" /></a>'
                +  '<div class="ui-list-info">'
                +  '<h4 class="ui-nowrap-multi"><a href="'+v.url+'news/'+v.newsId+'/">'+v.title+'</a></h4>'
                +  '<div class="hf-f12 hf-fgray ui-nowrap">'+v.createTime+'</div>'
                +  '</div>'
                +  '<div class="hf-contorls" style="display:none;"><div class="hf-contorls-wrap"><span><a href="/member/favorite/edit?all=1&type=4&mId='+v.newsId+'">删除</a></span><span><a href="/member/favorite/edit?all=2&type=4&uId='+v.uId+'">清空</a></span><i></i></div></div>'
                +  '</li>';
        });
		 
        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/member/Favorite/getmore", "#loading", "#listBox");
  }, 300);

});