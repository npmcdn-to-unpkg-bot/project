/**
 *name：位置和周边地图
 *author：zhailulu
 *
 **/
var nearbyMap = (function(){
    var defaults={
    		mapId:'',
    		height:'auto',
    		callback:function(){}
	  }, map = {}, mapObj, opts,  _data, extraHeight = 44, placeSearch;

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
    map.setMarker = function(lat, lng, name, type, hide){
        var content, marker;
        //展现方式
        if(type == "area"){
           content = "<div class ='hf-area-layer'><div class='hf-area-title'>政务区</div><div class='hf-area-content'>111个楼盘</div></div>";
        }else if(type == "house-blue"){
           content = "<div class='hf-tag-blue'><div class='hf-arrow-blue'><em></em><span></span></div>"+name+"</div>";
        }else if(type == "house-grey"){
           content = "<div class='hf-tag-grey'><div class='hf-arrow-grey'><em></em><span></span></div>"+name+"</div>";
        }

        marker = new AMap.Marker({
                      content: content,
                      position: new AMap.LngLat(lng, lat),
                      offset: new AMap.Pixel(0,0)
                });

        if(!hide){
           marker.setMap(mapObj);
        }

        return marker;
    }

    //显示坐标
    map.showMarkers = function(hide){
       var markers = _data.center,  Marker, Markers=[];
       
       map.setMarker(_data.center.lat, _data.center.lng, _data.center.name, "house-blue", false);
    };

    map.nearby = function(cityName,  type){
      var lat = _data.center.lat, lng = _data.center.lng;
      AMap.service(["AMap.PlaceSearch"], function() {

        placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize:5,
            pageIndex:1,
            cityName: cityName,
            map: mapObj
            //panel: "result"
        });
        
        //中心点坐标
        var cpoint = new AMap.LngLat(lng, lat);
        placeSearch.searchNearBy(type, cpoint, 1000, function(status, result){
          if(status=="no_data"){
            $.tips({
              content:'暂无相关'+type+'信息',
              stayTime:2000,
              type:"warn"
            });
          }

        });
    });

    };

    //初始化
    map.init = function(){

      var position = new AMap.LngLat(_data.center.lng, _data.center.lat);
      	  mapObj = new AMap.Map(opts.mapId,{
      					  view: new AMap.View2D({
      					  center: position,
      					  zoom: _data.zoom, 
      					  rotation: 0 
      					 }),
      				 lang:"zh_cn"
      	  });

      
	    this.setHeight(opts.height);

    
	    this.showMarkers(false);

      //导航
      $(".hf-map-nav-grey").on("click", function(){
          var type = $(this).find(".map-nav-type").text();
          map.nearby("合肥", type);
      });
    };

    
    return {
    	init : function(options, data){
            opts = $.extend(defaults, options);
            _data = data;
    		map.init();
    	}
    }
})();