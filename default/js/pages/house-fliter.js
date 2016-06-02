//绑定过滤显示楼盘
$.extend($.fn, {
    bindFliter: function(parentObj, type){
       var _this = $(this); 
       _this.on("click", function(){
          var id = $(this).attr("data-id");
          _this.removeClass("on");
          $(this).addClass("on");

          parentObj.trigger("click").find("span").text($(this).text()).attr({"data-id":id}).attr({"data-type":type});
          //获取数据
          getNewshouseData.getList("340100", type, "1", function(houseData){
            //生成列表
            $("#newshouselist").buildList(houseData, true);
          });
      });
    },

    bindMore : function(){
        var _this = $(this); 
         _this.on("click", function(){
            var id = $(this).attr("data-id");
            _this.removeClass("on");
            $(this).addClass("on");
        });
    },

    buildList : function(houseData, isFirst){
              var _this = $(this);
              //是否第一页
              if(isFirst){
                _this.children().remove(); 
              }
                  
              $.each(houseData.data.list, function(k, v){
                  var tempd = v.propertyType.split("#");
                  var tempe = '';
                   $.each(tempd, function(a, b){
                     if(b!=''){
                        tempe += '<i class="hf-badge-green">'+b+'</i>';
                     }
                   }); 
                   
                   var tempa = '<li class="ui-border-t">'
                               + '<div class="hf-house-box">'
                               + '<div class="ui-list-img">'
                               + '<img src="'+v.effectPhoto+'" />'
                               + '</div>'
                               + '<div class="ui-list-info">'
                               + '<h4 class="ui-nowrap hf-badge-wrap" >'+v.projectName+'<span class="hf-badge-pos"><i class="hf-badge">看</i><i class="hf-badge-yellow">佣</i></span></h4>'
                               + '<div class="hf-f12 hf-badge-wrap">'
                               + '<i class="hf-badge-blue">'+v.saleState+'</i>'+tempe+'<span class="hf-f15 hf-badge-pos hf-fred">'+v.averagePrice+'</span></div>'
                               + '<div class="hf-f12 hf-fgray">'+v.areaName+'</div>';
           
                   if(v.groupDiscountInfo==''){
                      var tempb =  '<div class="ui-nowrap hf-fyellow hf-f13"></div></div></div>';
                   }else{
                     var tempb =  '<div class="ui-nowrap hf-fyellow hf-f13">'+v.groupDiscountInfo+'</div></div></div>';
                   }
           
                   if(v.middleSchool!=''){
                     var tempc =  '<div class="hf-school"><span>划分学区</span>'+v.middleSchool+'</div></li>';
                   }else{
                      if(v.juniorSchool!=''){
                      var tempc =  '<div class="hf-school"><span>划分学区</span>'+v.juniorSchool+'</div></li>';
                    }else{
                      var tempc =  '</li>';
                    }
                   }

                   var temp = tempa+tempb+tempc; 
                    _this.append(temp);
               });
    }

});


var areaFliter = (function(){
   var area = $("#filter-area"), content = $("#filter-area-content"),
       areaType = $(".area-type"), areaList = $(".area-list"), schoolList = $(".school-list"),
       reset = $("#area-reset"), ok = $("#area-ok"), areaScroll;

    //浮层
    area.on("click", function(){
        //关闭其他浮层
      $(".hf-category-item").not($(this).parent("li")).removeClass("on");
      $(".hf-filter").not(content).hide();

        content.toggle();
        $(this).parent("li").toggleClass("on");
    });
    
    //类型
    areaType.on("click", function(){
        var index = $(this).index();
        areaType.removeClass("on");
        $(this).addClass("on");
        $(".filter-area-type").eq(index).show();
        $(".filter-area-type").not($(".filter-area-type").eq(index)).hide();
    });

    //列表
    $(".area-list").bindFliter(area, "area");
    $(".school-list").bindFliter(area, "school");
  

    //滚动
    /*areaScroll = new fz.Scroll('.area-scroller', {
        scrollY: true
    });*/


})();


//类型
var typeFilter = (function(){
    var type = $("#filter-type"), content = $("#filter-type-content"),
        typeList = $(".type-list");

    //浮层
    type.on("click", function(){
        //关闭其他浮层
        $(".hf-category-item").not($(this).parent("li")).removeClass("on");
        $(".hf-filter").not(content).hide();

        content.toggle();
        $(this).parent("li").toggleClass("on");
    });

    //列表
    $(".type-list").bindFliter(type, "propertyType");

})();


//价格
var typeFilter = (function(){
    var price = $("#filter-price"), content = $("#filter-price-content"),
        priceList = $(".price-list");

    //浮层
    price.on("click", function(){
        //关闭其他浮层
        $(".hf-category-item").not($(this).parent("li")).removeClass("on");
        $(".hf-filter").not(content).hide();

        content.toggle();
        $(this).parent("li").toggleClass("on");
    });

    //列表
    $(".price-list").bindFliter(price, "price");

})();

//更多
var moreFliter = (function(){
   var more = $("#filter-more"), content = $("#filter-more-content"),
       moreType = $(".more-type"),  
       reset = $("#more-reset"), ok = $("#more-ok"), moreScroll;

    //浮层
    more.on("click", function(){
        //关闭其他浮层
        $(".hf-category-item").not($(this).parent("li")).removeClass("on");
        $(".hf-filter").not(content).hide();

        content.toggle();
        $(this).parent("li").toggleClass("on");
    });
    
    //类型
    moreType.on("click", function(){
        var index = $(this).index();
        //moreType.removeClass("on");
        $(this).addClass("on");
        $(".filter-more-type").eq(index).show();
        $(".filter-more-type").not($(".filter-more-type").eq(index)).hide();
    });

    //列表
    $(".house-list").bindMore();
    $(".sequence-list").bindMore();
    $(".loop-list").bindMore();
    $(".special-list").bindMore();
    $(".sales-list").bindMore();
    $(".status-list").bindMore();

    //滚动
    moreScroll = new fz.Scroll('.area-scroller', {
        scrollY: true
    });

    //重置
    reset.on("click", function(){
       $(".more-type").removeClass("on");
       $(".filter-more-type").find("li").removeClass("on");
    });

    //确定
    ok.on("click", function(){
       content.hide();
       more.parent("li").removeClass("on");
       
       getNewshouseData.getList("340100", "more", "1", function(houseData){  
          $("#newshouselist").children().remove();		  
			    $.each(houseData.data.list, function(k, v){
    				var tempd = v.propertyType.split("#");
    				var tempe = '';
    				 $.each(tempd, function(a, b){
    					 if(b!=''){
    					    tempe += '<i class="hf-badge-green">'+b+'</i>';
    					 }
    				 }); 
    				 var tempa = '<li class="ui-border-t">'
                         + '<div class="hf-house-box">'
                         + '<div class="ui-list-img">'
                         + '<img src="'+v.effectPhoto+'" />'
                         + '</div>'
                         + '<div class="ui-list-info">'
                         + '<h4 class="ui-nowrap hf-badge-wrap" >'+v.projectName+'<span class="hf-badge-pos"><i class="hf-badge">看</i><i class="hf-badge-yellow">佣</i></span></h4>'
                         + '<div class="hf-f12 hf-badge-wrap">'
    					 + '<i class="hf-badge-blue">'+v.saleState+'</i>'+tempe+'<span class="hf-f15 hf-badge-pos hf-fred">'+v.averagePrice+'</span></div>'
                         + '<div class="hf-f12 hf-fgray">'+v.areaName+'</div>';
					 
  					 if(v.groupDiscountInfo==''){
  					    var tempb =  '<div class="ui-nowrap hf-fyellow hf-f13"></div></div></div>';
  					 }else{
  						 var tempb =  '<div class="ui-nowrap hf-fyellow hf-f13">'+v.groupDiscountInfo+'</div></div></div>';
  					 }
					 
  					 if(v.middleSchool!=''){
  						 var tempc =  '<div class="hf-school"><span>划分学区</span>'+v.middleSchool+'</div></li>';
  					 }else{
  					    if(v.juniorSchool!=''){
  							var tempc =  '<div class="hf-school"><span>划分学区</span>'+v.juniorSchool+'</div></li>';
  						}else{
  							var tempc =  '</li>';
  						}
  					 }
					  var temp = tempa+tempb+tempc; 
				 
				    $("#newshouselist").append(temp);
       });
     });
    });

})();



//获取新房数据
var getNewshouseData = {
    getArea : function(siteId, successCallback){
          $.ajax({
                  type: 'get',
                  url: 'http://xkapi.com/v1.1/Newhouse/Area.api',
                  data: {siteId : "340100", outType:"jsonp"},
                  dataType: 'jsonp',
                  success: successCallback,
                  error: function(xhr, type){
                    //alert('Ajax error!')
                  }
            });
    },
    getList : function(siteId, type, pageNum, successCallback){
       var _condition = {siteId : siteId, outType:"jsonp", page: pageNum};
       console.log("fff");
       //
       $(".map-fliter").each(function(k, v){
           var id = $(this).attr("data-id"), type = $(this).attr("data-type");
           if(!id || !type){
               return;
           }

           switch(type){
              case "area" : $.extend(_condition, {areaId: id});break; //区域
              case "school" : $.extend(_condition, {schoolId : id});break; //学区
              case "propertyType" : $.extend(_condition, {propertyType : id});break; //类型
              case "price" : $.extend(_condition, {price : id});break; //价格区间
           }
       });

       //更多
       if(type === "more"){
            $(".filter-more-type").find("li.on").each(function(k, v){
                var name = $(this).attr("class").split("-")[0], moreId = $(this).attr("data-id");
                switch(name){
                  case "house" : $.extend(_condition, {houseType : moreId});break; //户型
                  case "loop" : $.extend(_condition, {loopLine : moreId});break; //环线
                  case "sales" : $.extend(_condition, {saleState : moreId});break; //销售状态
                  case "status" : $.extend(_condition, {renovateState : moreId});break; //装修状态
                  case "special" : $.extend(_condition, {feature : moreId});break; //装修特色
               }

            });
       }

       console.log(_condition);

       $.ajax({
              type: 'get',
              url: 'http://xkapi.com/v1.0/Newhouse/List.api',
              data: _condition,
              dataType: 'jsonp',
              success: successCallback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
       }); 
   }
}

//加载更多
var loadMore = function(){
      if($(window).scrollTop()>=$(document).height()-$(window).height() && $("#loading").css("display") === "none"){
              var pageNum = $("#loading").data("pageNum");
              $("#loading").css("display", "block");

              getNewshouseData.getList("340100", "area", pageNum, function(houseData){
                pageNum += 1;
                $("#loading").data({"pageNum" : pageNum});
                $("#loading").css("display", "none");
                setTimeout(function(){
                  $("#newshouselist").buildList(houseData, false);
                }, 200); 
              });
       } 
};


var throttle = function(fn, delay){
  var timer = null;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(context, args);
    }, delay);
  };
 };

$(function(){

    $("#loading").data({"pageNum" : 1});

    //加载更多
    window.onscroll = throttle(loadMore, 300);
    
});

