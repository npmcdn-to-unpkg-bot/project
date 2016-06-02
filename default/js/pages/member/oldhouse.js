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
            temp += '<li class="ui-border-t  house-sales-list"">'
                +  '<div class="hf-house-box">'
                +  '<div class="ui-list-img">'
                +  '<a href="'+v.url+'oldhouse/'+v.aid+'/"><img src="'+v.housephoto+'" /></a>'
                +  '</div>'
                +  '<div class="ui-list-info">'    
                +  '<h4 class="ui-nowrap-multi hf-nowrap-multi"><a href="'+v.url+'oldhouse/'+v.aid+'/">'+v.saletitle+'</a></h4>'
                +  '<a href="'+v.url+'oldhouse/'+v.aid+'/">'
                +  '<div class="hf-f12 hf-fgray hf-badge-wrap">'+v.areaName+'<span class="hf-badge-pos"><em class="hf-f15 hf-fred">'+v.price+'</em></span></div>'
                +  '<div class="ui-nowrap hf-badge-wrap hf-f13">'+v.roomtype+' '+v.housearea+'<span class="hf-badge-pos"><span class="hf-f12 hf-fgray">'+v.createTime+'</span></span></div>'
                +  '</a></div></div></div>'
                +  '<div class="hf-contorls" style="display:none;"><div class="hf-contorls-wrap"><span><a href="/member/favorite/edit?all=1&type=2&mId='+v.aid+'">删除</a></span><span><a href="/member/favorite/edit?all=2&type=2&uId='+v.uId+'">清空</a></span><i></i></div></div>'
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