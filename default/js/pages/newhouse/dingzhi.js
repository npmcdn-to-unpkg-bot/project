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
            temp += '<li class="ui-border-tb ui-whitespace">'
                +  '<a href="/dingzhi/'+v.customId+'.html">';
			if(v.areaName!=''){
				temp += '<i class="hf-badge-lg hf-badge-gray">'+v.areaName+'</i>';
			}
			if(v.priceRange!=''){
				temp += '<i class="hf-badge-lg hf-badge-gray">'+v.priceRange+'</i>';
			}
			if(v.areaRange!=''){
				temp += '<i class="hf-badge-lg hf-badge-gray">'+v.areaRange+'</i>';
			}
			temp += '<p class="hf-fgray hf-f13 ui-border-b">其它需求：'+v.remark+'</p>'
                +  '<p>合房推荐：'+v.reply+'</p></a></li>';
			
        });
        console.log(temp);

        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/Dingzhi/Index/getmoredingzhi", "#loading", "#listBox");
  }, 300);

});