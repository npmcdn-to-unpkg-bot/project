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
            temp += '<li class="ui-border-t">'
                +  '<div class="hf-house-box">'
                +  ' <div class="ui-list-img">'
                +  '<a href="'+v.url+'newhouse/'+v.projectId+'/"><img src="'+v.effectPhoto+'" /></a>'
                +  '</div>'
                +  '<div class="ui-list-info">'
                +  '<a href="'+v.url+'/newhouse/'+v.projectId+'/">'
                +  '<h4 class="ui-nowrap" >'+v.projectName+'</h4>'
                +  '<div class="hf-f12 hf-badge-wrap"><i class="hf-badge-blue">'+v.saleState+'</i>'+v.propertyType+'&nbsp;<span class="hf-f15 hf-badge-pos hf-fred">'+v.averagePrice+'</span></div>'
                +  '<div class="hf-f12 hf-fgray">'+v.areaName+'</div>';
				if(v.zanwu==1){
                  temp +=  '<div class="ui-nowrap hf-badge-wrap hf-fyellow hf-f13" style="padding-right:60px;">暂无优惠&nbsp;<span class="hf-badge-pos hf-f12 hf-fgray">'+v.createTime+'</span></div>';
				}else{
				  temp +=  '<div class="ui-nowrap hf-badge-wrap hf-fyellow hf-f13" style="padding-right:60px;">'+v.projectFeature+'&nbsp;<span class="hf-badge-pos hf-f12 hf-fgray">'+v.createTime+'</span></div>';
				}
                temp +=  '</a>'
                +  '</div>'
                +  '</div>'
                +  '<div class="hf-contorls" style="display:none;"><div class="hf-contorls-wrap"><span><a href="/member/favorite/edit?all=1&type=1&mId='+v.projectId+'">删除</a></span><span><a href="/member/favorite/edit?all=2&type=1&uId='+v.uId+'">清空</a></span><i></i></div></div>'
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