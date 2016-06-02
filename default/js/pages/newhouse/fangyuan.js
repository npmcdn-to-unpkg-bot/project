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
    var _url = url, pid = $("#pid").val();
    var type = $("#type").val();
    $.ajax({
              type: 'get',
              url: _url,
              data: {"pageNow" : pageNum, "pid" : pid, "type" : type},
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
                +  '<a href="/newhouse/'+v.pid+'/huxing/'+v.choiceId+'.html"><div class="hf-house-box">'
                +  '<div class="ui-list-img">'
                +  '<img class="lazyload ui-list-img-s" src="STATIC_JS/lazyLoad/loading.png" data-original="'+v.photoPath+'" alt="">'
                +  '</div>'
                +  '<div class="ui-list-info">'
                +  '<h4 class="ui-nowrap" >'+v.buildNo+'-'+v.floor+'楼-'+v.roomNo+'室</h4>'
				+  '<div class="hf-f12 hf-badge-wrap" style="height:35px;">'+v.projectName+' '
                +  '<span class="hf-f15 hf-badge-pos hf-fred">'+v.totalPrice+'</span></div>'
                +  ' <div class="ui-nowrap hf-f12 hf-fgray">'+v.typename+'  '+v.buildArea+'</div>'
                +  '</div></div></a></li>';
			
        });

        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/Newhouse/Fangyuan/getmorefangyuan", "#loading", "#listBox");
  }, 300);

});