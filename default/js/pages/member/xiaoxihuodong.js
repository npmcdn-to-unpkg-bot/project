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
        var timestamp = Math.round(new Date().getTime()/1000) ;
        $.each(data, function(k, v){
			k = 10+k;
            temp += '<div class="ui-whitespace ui-border-tb hf-tidings-new">'
                +  '<a href="/huodong/'+v.tId+'/">'
                +  '<h3>'+v.title+'</h3>'
                +  '<div><img src="'+v.photoUrl+'" ></div>'
                +  '<div class="hf-fgray hf-f12"><time>'+v.createTime+'</time></div>'
                +  '<div class="hf-tidings-text ui-arrowlink ui-border-t">';
			if(v.isDay!=''){
				temp += '距开始:';
			}else{
				temp += '倒计时:';
			}
            temp +=  '<span id="day_show'+k+'" class="hf-huodong-time ">'+parseInt(v.day)+'</span>天'
                +  '<span id="hour_show'+k+'" class="hf-huodong-time ">'+parseInt(v.hour)+'</span>时'
                +  '<span id="minute_show'+k+'" class="hf-huodong-time ">'+parseInt(v.minute)+'</span>分'
                +  '<span id="second_show'+k+'" class="hf-huodong-time ">'+parseInt(v.seconds)+'</span>秒'
                +  '</div></a></div>';
			timer(parseInt(v.Time-timestamp), k);
        });
		
        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/member/Message/getmore", "#loading", "#listBox");
  }, 300);

});