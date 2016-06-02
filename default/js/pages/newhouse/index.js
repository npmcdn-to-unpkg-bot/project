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
    var _url = url;
    $.ajax({
              type: 'get',
              url: _url,
              data: {"pageNow" : pageNum},
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
			if(v.newsType=='2'){
				var url = "news/photo";
			}else if(v.newsType=='5'){
				var url = "news/zhuanti";
			}else if(v.newsType=='6'){
				var url = "news/zhibo";
			}else{
				var url = "news";
			}
            temp += '<li class="ui-border-t">'
                +  '<div class="ui-list-img-s">'
                +  '<a href="/'+url+'/'+v.id+'.html">'
                +  '<img class="lazyload" src="STATIC_IMG/loading.png" data-original="'+v.photoUrl+'">'
                +  '</a></div>'
                +  '<div class="ui-list-info">'
                +  '<a href="/'+url+'/'+v.id+'.html">'
                +  '<h4 class="ui-nowrap-multi">'+v.title+'</h4>'
                +  '<div class="hf-f12 ui-nowrap">'+v.createTime+'</div>'
                +  '</a></div></li>';
        });           
        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/Index/Index/getmoredongtai", "#loading", "#listBox");
  }, 300);

});