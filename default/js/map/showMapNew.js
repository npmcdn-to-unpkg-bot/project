/**
 *name：显示单个楼盘
 *author：zhailulu
 *
 **/
var Map = (function(){
    var defaults={
    		mapId:'',
    		height:'auto',
    		callback:function(){}
	  }, map = {}, mapObj, opts, extraHeight = 100, _data;

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
           content = "<div class ='hf-area-layer'><div class='hf-area-title'>"+data.name+"</div><div class='hf-area-content'>个楼盘</div></div>";
        }else if(type == "house-blue"){
           content = "<a href='#'><div class='hf-tag-blue'><div class='hf-arrow-blue'><em></em><span></span></div>"+data.name+"</div></a>";
        }else if(type == "house-grey"){
           content = "<a href='#'><div class='hf-tag-grey'><div class='hf-arrow-grey'><em></em><span></span></div>"+data.name+"</div></a>";
        }
        

        marker = new AMap.Marker({
                content: content,
                position: new AMap.LngLat(data.lng, data.lat)
        });

        if(!hide){
           marker.setMap(mapObj);
        }
           
        return marker;
    }

    //显示坐标
    map.showMarkers = function(hide){
       //区域
       $.each(_data, function(k, v){
          if(!v.lat || !v.lng){
            return;
          }

          Marker = map.setMarker(v, "house-blue", false);
          if(k === 0){
            mapObj.setCenter(new AMap.LngLat(v.lng, v.lat));
          }
       });

    };

    //初始化
    map.init = function(){

      mapObj = new AMap.Map(opts.mapId, {
          resizeEnable: true,
          zoomEnable:false,
          dragEnable:false,
          view: new AMap.View2D({
                  zoom: 13, 
                 }),
      });
      
	    this.setHeight(opts.height);
      
	    this.showMarkers(true);
    };

    
    return {
    	init : function(options){
            opts = $.extend(defaults, options);
            _data = opts.data;
            map.init();
    	}
    }
})();
