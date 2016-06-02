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
    var _url = url, areaIds = $("#areaIds").val(), houseSizes = $("#houseSizes").val(), currentMoneys = $("#currentMoneys").val(), loanTimes = $("#loanTimes").val(), expenses = $("#expenses").val();
    $.ajax({
              type: 'get',
              url: _url,
              data: {"pageNow" : pageNum, "areaIds" : areaIds, "houseSizes" : houseSizes, "currentMoneys" : currentMoneys, "loanTimes" : loanTimes, "expenses" : expenses},
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
            	+  '<a href="/newhouse/'+v.projectId+'/">'
                +  '<div class="hf-house-box">'
                +  '<div class="ui-list-img hf-badge-wrap">'
                +  '<img src="'+v.effectPhoto+'">'
                +  '</div>'
                +  '<div class="ui-list-info">'
                +  '<h4 class="ui-nowrap hf-badge-wrap">'+v.projectName+'</h4>'
                +  '<div class="hf-f12 hf-badge-wrap hf-fgray">'+v.areaName+'<span class="hf-f15 hf-badge-pos hf-fred">'+v.averagePrice+'</span></div>'
                +  '<div class="hf-f12 hf-fgray666">主力户型：'+v.houseType+'</div>'
                +  '<div class="ui-nowrap hf-fyellowff963c hf-f12 hf-badge-wrap">'+v.groupDiscount+'<span class="hf-f12 hf-badge-pos"><i class="hf-badge-label-3">'+v.saleState+'</i></span></div>'
                +  '</div></div></a></li>';
			
                            
        });

        $(box).append(temp);

   }

}


$(function(){
   //加载更多
  $("#loading").data({"pageNum" : 1});
  window.onscroll = throttle(function(){
      loadMore.init("/Newhouse/Pinggu/getmorepinggu", "#loading", "#listBox");
  }, 300);

});