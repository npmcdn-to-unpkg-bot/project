/*
**********
*made in fanfan
**********
*/

//高德地图API
var maps = function(options){
    if(options===undefined)return;
    var element  = options.element,
        position = options.position,
        radius   = options.radius,
        map      = {},
        obj      = {};
    //地图初始化
    obj.init = function(){
        map = new AMap.Map(element, {
            resizeEnable :  true,//是否监控地图容器尺寸变化，默认值为false
            zoom         :  15,
            center       :  position,
            mapStyle     :  'normal'
        });
        if(options.toolBar === true){
            AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
              var toolBar = new AMap.ToolBar();
              var scale = new AMap.Scale();
              map.addControl(toolBar);
              map.addControl(scale);
            })
        }
        // obj.setCircle(position,radius);
        obj.setAdvancedMarker(position,{
            buildName    : options.buildName,
            equalPrice   : options.equalPrice,
            buildAddress : options.buildAddress
        })
    }

    //高级信息窗体点标注
    obj.setAdvancedMarker = function(position,list){
        var infowindow;
        if(list !== undefined){
            var buildName = list.buildName || "暂无";
            var equalPrice = list.equalPrice || "价格暂无";
            var buildAddress = list.buildAddress || "地址暂无";
        }else{
            return;
        }
        
        var marker = new AMap.Marker({
            content  : '<div class="advancedMarker"><p>'+buildName+'<span> | '+equalPrice+'</span></p></div>',
            position : position,
            title    : buildName,
            offset   : new AMap.Pixel(-14,-46),
        });
        marker.setMap(map);

        marker.on('click',function(e){
            infowindow.open(map,e.target.getPosition());
        })
        AMap.plugin('AMap.AdvancedInfoWindow',function(){
         infowindow = new AMap.AdvancedInfoWindow({
                  content: '<div class="info-title">'+buildName+'</div><div class="info-content info-content-hf">'+
                          '<img src="http://img2.xkhouse.com/hfhouse/newhouse/2015/05/20150512/CL4BI1431398813.jpg"><div class="prize">'+
                          equalPrice   + '</div><div class="buildAddress">'+
                          buildAddress + '</div>'+

                          '<a target="_blank" href = "http://http://newhouse.hfhouse.com//"></a></div>',
                  offset: new AMap.Pixel(0, -30),
                  placeSearch: false,
                  asOrigin   : false,
                  panel      : 'near_search_wrap'
            });
         infowindow.on('complete',function(){
            $('#mapTab').fadeOut();
            $('.map_lp_1').fadeIn();
         })

        //infowindow.open(map,position);//打开窗口
        })
    }
    //信息窗体点标注
    obj.setMarker = function(o){

        o.each(function(index, el) {
         obj.setAdvancedMarker(o.posiiton,o.list)
        });
        // var infowindow;
        // if(list !== undefined){
        //     var title   = list.title   || "暂无";
        //     var tel     = list.tel     || "暂无电话";
        //     var address = list.address || "暂无地址";
        // }else{
        //     return;
        // }

        // var marker = new AMap.Marker({
        //     position: position
        // });
        // marker.setMap(map);
        // marker.on('click',function(e){
        //     infowindow.open(map,e.target.getPosition());
        // })
        // AMap.plugin('AMap.AdvancedInfoWindow',function(){
        //  infowindow = new AMap.AdvancedInfoWindow({
        //   content: '<div class="info-title">'+title+'</div><div class="info-content">'+
        //           '<p>地址:'+address+'</p>'+
        //           '<p>电话:'+tel+'</p>'+
        //           '</div>',
        //       offset: new AMap.Pixel(0, -30)
        //     });
        // //infowindow.open(map,position);//打开窗口
        // })
    }

    //覆盖物
    obj.setCircle = function(option,radius){
        var radius = radius || 100;
        var circle = new AMap.Circle({
            center       : option,
            radius       : radius,
            fillOpacity  : 0.1,
            strokeWeight : 0.2
        })
        circle.setMap(map);
        map.setFitView();
    }
    obj.searchNearBy=function(name,callback){
            obj.init();
            AMap.service('AMap.PlaceSearch',function(){//回调函数
            //实例化PlaceSearch
            placeSearch= new AMap.PlaceSearch({
                map       : map,
                pageIndex : 1,
                panel     : 'near_search_wrap',
                pageSize  : 5
            });
            //TODO: 使用placeSearch对象调用关键字搜索的功能
            placeSearch.setType(name);
            placeSearch.searchNearBy("", position, radius, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    //TODO : 解析返回结果,如果设置了map和panel，api将帮助完成点标注和列表
                    console.log(result.poiList);
                    if(callback !==undefined) callback();
                }
            });
            map.setFitView();
        })

    }

    obj.RangingTool=function(){
        console.log(map)
        var ruler1;
        map.plugin(["AMap.RangingTool"], function() {
            ruler1 = new AMap.RangingTool(map);
            AMap.event.addListener(ruler1, "end", function(e) {
                ruler1.turnOff();
                 map.setDefaultCursor("pointer");
            });
        });
        ruler1.turnOn();
        map.setDefaultCursor("crosshair");
    }

    obj.init();
    return obj;
}
//设置楼盘

