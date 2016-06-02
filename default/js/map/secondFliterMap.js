//绑定过滤显示楼盘
$.extend($.fn, {
    bindFliter: function(parentObj, type){
       var _this = $(this); 
       _this.on("click", function(){
          var id = $(this).attr("data-id");
          _this.removeClass("on");
          $(this).addClass("on");

          parentObj.trigger("click").find("span").text($(this).text()).attr({"data-id":id}).attr({"data-type":type});
          //var load=$.loading({content:'加载中...'});
          //获取数据
          getMapData.getList(type, function(houseData){  
             Map.clearMap();
             //Map.setZoom(12);
             $.each(houseData.data.list, function(k, v){
                var m;
                if(!v.latitude || !v.longitude){
                  return;
                }
                m = Map.addMarkers(v, "house-blue", true);
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
var typeFilter = (function(){
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

    var h = $("body").height()-82;
    //遮罩层高度
    content.height(h);

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
    $(".size-list").bindMore();
    $(".age-list").bindMore();
    $(".face-list").bindMore();
    $(".fitment-list").bindMore();
    $(".origin-list").bindMore();

    //滚动
    /*moreScroll = new fz.Scroll('.area-scroller', {
        scrollY: true
    });*/

    //重置
    reset.on("click", function(){
       $(".more-type").removeClass("on");
       $(".filter-more-type").find("li").removeClass("on");
    });

    //确定
    var siteId = $("#siteId").val();
    ok.on("click", function(){
       content.hide();
       more.parent("li").removeClass("on");
       
       getMapData.getList("more", function(houseData){  
             Map.clearMap();
             $.each(houseData.data.list, function(k, v){
                if(!v.latitude || !v.longitude){
                  return;
                }
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
    getArea : function(successCallback){
          var siteId = $("#siteId").val();
          $.ajax({
                  type: 'get',
                  url: 'http://xkapi.com/v1.0/Oldhouse/GetCount.api',
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
              //case "school" : $.extend(_condition, {schoolId : id});break; //学区
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
                  case "size" : $.extend(_condition, {areaZone : moreId});break; //面积
                  case "age" : $.extend(_condition, {buildingera : moreId});break; //房龄
                  case "face" : $.extend(_condition, {roomFace : moreId});break; //朝向
                  case "fitment" : $.extend(_condition, {fitment : moreId});break; //装修
                  case "origin" : $.extend(_condition, {membertype : moreId});break; //来源
               }

            });
       }

       getMapData.getListData(_condition, successCallback);
   },

   //获取区域楼盘列表
   getListData : function(_condition, callback){
       $.ajax({
              type: 'get',
              url: 'http://xkapi.com/v1.0/Oldhouse/List.api',
              data: _condition,
              dataType: 'jsonp',
              success: callback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
       }); 

   },
  //获取小区出售房源列表
  getSalesList : function(_name, callback){
     var siteId = $("#siteId").val();
     $.ajax({
              type: 'get',
              url: 'http://xkapi.com/v1.0/Oldhouse/GetRound.api',
              data: {projname : _name, outType:"jsonp", siteId : siteId},
              dataType: 'jsonp',
              success: callback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
       }); 
  }
}


/**
 *name：二手房地图找房
 *author：zhailulu
 *
 **/
var load;
var Map = (function(){
    var defaults={
        mapId:'',
        height:'auto',
        callback:function(){}
    }, map = {}, mapObj, opts, extraHeight = 100, Marker, Markers=[];
    var siteId = $("#siteId").val();
   
    //设置高度
    map.setHeight = function(){
       var h = opts.height;
       //自适应高度
       if(h === "auto"){
           h = $("body").height() - extraHeight;
       }
        
       $("#"+opts.mapId).height(h);
    };

    //创建坐标
    map.setMarker = function(data, type, hide){

        var content, marker;
        //展现方式
        if(type == "area"){
           content = "<div class ='hf-area-layer'><div class='hf-area-title'>"+data.areaName+"</div><div class='hf-area-content'>"+data.count+"个房源</div></div>";
        }else if(type == "house-blue"){
           content = "<a href='#'><div class='hf-tag-blue'><div class='hf-arrow-blue'><em></em><span></span></div>"+data.projname+" ￥"+data.averageprice+"</div></a>";
        }else if(type == "house-grey"){
           content = "<a href='#'><div class='hf-tag-grey'><div class='hf-arrow-grey'><em></em><span></span></div>"+data.projname+" ￥"+data.averageprice+"</div></a>";
        }

        marker = new AMap.Marker({
                content: content,
                position: new AMap.LngLat(data.longitude, data.latitude)
        });

        if(!hide){
           marker.setMap(mapObj);
        }

        if(type === "area"){

          AMap.event.addListener(marker, 'click', function(e){
            //获取列表数据
            $("#siteId").data("isClick", true);
            getMapData.getListData({siteId : siteId, area : data.areaid, outType:"jsonp"}, function(houseData){
                   marker.subMarkers = [];
                   $.each(houseData.data.list, function(key, val){
                      var m;
                      if(!val.longitude || !val.latitude){
                        return;
                      }

                      m = map.setMarker(val, "house-blue", true);
                      marker.subMarkers.push(m);

                      //点击
                      //map.clickList(m, val);

                   });

                   //显示楼盘列表
                   mapObj.add(marker.subMarkers);
                   mapObj.setFitView(marker.subMarkers);
                   mapObj.remove(Markers);      
            });
          });
        }else{
           //点击
           map.clickList(marker, data);
        }

        return marker;
    }

    //显示坐标
    map.showMarkers = function(areaData, hide){
       //区域
       $.each(areaData.data, function(k, v){
          Marker = map.setMarker(v, "area", false);
          Markers.push(Marker);
       });

       //缩放事件
       AMap.event.addListener(mapObj, 'zoomend', function(){
          //根据范围
          if(mapObj.getZoom()>=12 && !$("#siteId").data("isClick")){
               map.getBoundList(siteId);
               $("#siteId").data("isClick", false);
          }else if(mapObj.getZoom()<12){
              mapObj.clearMap();
              mapObj.add(Markers);
          }

        });

       //缩放事件
       AMap.event.addListener(mapObj, 'dragend', function(){
          //根据范围
          if(map.getZoom>=12){
            map.getBoundList();
          }
         
       });
    };

    map.clickList = function(m, val){
       //点击
       AMap.event.addListener(m, 'click', function(e){
          //修改地图高度
          if($("#salesList").css("display") === "none"){
              $("#"+opts.mapId).height("250px");
              $("#salesList").show();
          }
                          
          $("#sales-title").text(val.projname);
          getMapData.getSalesList(val.projname, function(salesData){
              //无
              if(salesData.data.length == 0){
                $("#sales-title").html("抱歉，该楼盘无相关数据!");
                return;
              }
              //显示出售房源列表
              $.each(salesData.data, function(k, v){
                var html = map.showList(v);
                $("#salesList").append(html);
              });

          });
      });

    };

    /*map.bindClick = function(m, callback){
        AMap.event.addListener(m, 'click', callback);
    };*/

    map.getBoundList = function(){
       var mapBounds = mapObj.getBounds();
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
              //case "school" : $.extend(_condition, {schoolId : id});break; //学区
              case "propertyType" : $.extend(_condition, {propertyType : id});break; //类型
              case "price" : $.extend(_condition, {price : id});break; //价格区间
           }
        });

       //更多
       //if(type === "more"){
            $(".filter-more-type").find("li.on").each(function(k, v){
                var name = $(this).attr("class").split("-")[0], moreId = $(this).attr("data-id");
                switch(name){
                  case "house" : $.extend(_condition, {houseType : moreId});break; //户型
                  case "size" : $.extend(_condition, {areaZone : moreId});break; //面积
                  case "age" : $.extend(_condition, {buildingera : moreId});break; //房龄
                  case "face" : $.extend(_condition, {roomFace : moreId});break; //朝向
                  case "fitment" : $.extend(_condition, {fitment : moreId});break; //装修
                  case "origin" : $.extend(_condition, {membertype : moreId});break; //来源
               }

            });
        //}
          
      
          $.ajax({
                type: 'get',
                url: 'http://xkapi.com/v1.0/Oldhouse/List.api',
                data:  _condition,
                dataType: 'jsonp',
                success: function(houseData){
                     Map.clearMap();
                     $.each(houseData.data.list, function(k, v){
                        Map.addMarkers(v, "house-blue", true);
                     });
                },
                error: function(xhr, type){
                  //alert('Ajax error!');
                }
           }); 
    }

    //初始化
    map.init = function(areaData){

      mapObj = new AMap.Map(opts.mapId, {
          resizeEnable: true,
          view: new AMap.View2D({
                  zoom: 11, 
                 }),
      });
      
      this.setHeight(opts.height);
      this.showMarkers(areaData, false);
    };

    map.showList = function(data){
        var temp = '<li class="ui-border-t">'
                 + '<div class="hf-house-box"><div class="ui-list-img"><img src="'+data.housephoto+'"></div>'
                 + '<div class="ui-list-info"><h4 class="ui-nowrap-multi hf-nowrap-multi">'+data.saletitle+'</h4>'
                 + '<div class="hf-f12 hf-fgray">楼层'+data.floor+'</div><div class="ui-nowrap hf-f13 hf-badge-wrap">'
                 + ''+data.roomtype+' '+data.housearea+''
                 + '<span class="hf-badge-pos"><em class="hf-f15 hf-fred">'+data.price+'</em></span></div></div></div></li>';
        return temp;
    };
    
    return {
      init : function(options){
            opts = $.extend(defaults, options);
            
            //获取区域楼盘数据
            getMapData.getArea(function(data){
                map.init(data);
            });
      },

      addMarkers : function(data, type, hide){
             var Marker = map.setMarker(data, type, false);
             return Marker;
      },

      clearMap :  function(){
             mapObj.clearMap();
      },

      setCenterMap : function(lat, lng){
         mapObj.setCenter(new AMap.LngLat(lng, lat));
      },

      getBound : function(){
         return mapObj.getBounds();
      },

      setZoom : function(num){
         mapObj.setZoom(num);
      }
    }
})();

$(function(){
   //
   $(document).on('ajaxBeforeSend', function(e, xhr, options){
      load=$.loading({
        content:'加载中...',
      });

      setTimeout(function(){
        load.loading("hide");
      },2000);
   });

   $(document).on('ajaxComplete', function(e, xhr, options){
      load.loading("hide");
   });
   $(document).on('ajaxSuccess', function(e, xhr, options){
      load.loading("hide");
   });
});
