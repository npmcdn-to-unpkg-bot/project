//绑定过滤显示楼盘
$.extend($.fn, {
    bindFliter: function(parentObj, type){
       var _this = $(this);
       _this.on("click", function(){
          var id = $(this).attr("data-id");
          _this.removeClass("on");
          $(this).addClass("on");

          if(type === "school"){
            $(".area-list").removeClass("on");
          }else if(type === "area"){
            $(".school-list").removeClass("on");
          }

          parentObj.trigger("click").find("span").text($(this).text()).attr({"data-id":id}).attr({"data-type":type});
          //var load=$.loading({content:'加载中...'});
          //获取数据
          getMapData.getList(type, function(houseData){
             Map.clearMap();
             Map.setZoom(12);
             $.each(houseData.data.list, function(k, v){
                Map.addMarkers(v, "house-blue", true);
                if(k === 0){
                  Map.setCenterMap(v.latitude, v.longitude);
                }
             });
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
    }
});


var areaFliter = (function(){
   var area = $("#filter-area"), content = $("#filter-area-content"),
       areaType = $(".area-type"), areaList = $(".area-list"), schoolList = $(".school-list"),
       reset = $("#area-reset"), ok = $("#area-ok"), areaScroll;

    //浮层
    var h = $("body").height()-82;
       //遮罩层高度
    content.height(h);
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
    var h = $("body").height()-82;
       //遮罩层高度
    content.height(h);

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
var priceFilter = (function(){
    var price = $("#filter-price"), content = $("#filter-price-content"),
        priceList = $(".price-list");

    var h = $("body").height()-82;
       //遮罩层高度
    content.height(h);

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
    var h = $("body").height()-82;
    //遮罩层高度
    content.height(h);
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
        moreType.removeClass("on");
        $(this).addClass("on");
        $(".filter-more-type").eq(index).show();
        $(".filter-more-type").not($(".filter-more-type").eq(index)).hide();
    });

    //列表
    $(".house-list").bindMore();
    $(".size-list").bindMore();
    $(".special-list").bindMore();
    $(".sales-list").bindMore();
    $(".status-list").bindMore();

    //滚动
    /*moreScroll = new fz.Scroll('.area-scroller', {
        scrollY: true
    });
*/
    //重置
    reset.on("click", function(){
       $(".more-type").removeClass("on");
       $(".filter-more-type").find("li").removeClass("on");
    });

    //确定
    ok.on("click", function(){
       content.hide();
       more.parent("li").removeClass("on");

       getMapData.getList("more", function(houseData){
             Map.clearMap();
             $.each(houseData.data.list, function(k, v){
                Map.addMarkers(v, "house-blue", true);
                if(k === 0){
                  Map.setCenterMap(v.latitude, v.longitude);
                }
             });
       });
    });

})();


//获取地图数据
var getMapData = {
    getArea : function(siteId, successCallback){
        $.ajax({
            type: 'get',
            url: 'http://xkapi.com/v1.1/Newhouse/Area.api',
            data: {siteId : siteId, outType:"jsonp"},
            dataType: 'jsonp',
            success: successCallback,
            error: function(xhr, type){
                //alert('Ajax error!')
            }
        });
    },
    getList : function(type, successCallback){
       var mapBounds = Map.getBound(), siteId = $("#siteId").val();
       var sw = mapBounds.getSouthWest();
       var ne = mapBounds.getNorthEast();
       var _condition = {siteId : siteId, swlng: sw.lng, swlat: sw.lat, nelng:ne.lng, nelat:ne.lat, outType:"jsonp"};
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
                  case "size" : $.extend(_condition, {areaSize : moreId});break; //面积
                  case "sales" : $.extend(_condition, {saleState : moreId});break; //销售状态
                  case "status" : $.extend(_condition, {renovateState : moreId});break; //装修状态
                  case "special" : $.extend(_condition, {feature : moreId});break; //楼盘特色
               }

            });
       }


       //console.log(_condition);

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

// 点击其他透明区域收起
        $(document).on('touchstart','.hf-filter',function(e){
            e.preventDefault();
            $(this).hide().parents('.hf-category-item').removeClass('on');
            $("body,html").removeAttr('style');
        });

        // 点击主区域阻上事件冒泡
        $('.hf-filter-main').on('touchstart',function(e){
            e.stopPropagation();
           // alert(1);
        });