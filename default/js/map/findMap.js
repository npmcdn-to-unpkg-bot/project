/**
 *name：找房地图
 *author：zhailulu
 *
 **/
var Map = (function () {
    var defaults = {
        mapId: '',
        height: 'auto',
        callback: function () {
        }
    }, map = {}, mapObj, opts, extraHeight = 100, Marker, Markers = [];

    var siteId = $("#siteId").val();

    //设置高度
    map.setHeight = function () {
        var h = opts.height;
        //自适应高度
        if (h === "auto") {
            h = $("body").height() - extraHeight;
        }

        $("#" + opts.mapId).height(h);
    };

    //创建坐标
    map.setMarker = function (data, type, hide) {

        var content, marker;
        //展现方式
        if (type == "area") {
            content = "<div class ='hf-area-layer'><div class='hf-area-title'>" + data.areaName + "</div><div class='hf-area-content'>" + data.projectCount + "个楼盘</div></div>";
        } else if (type == "house-blue") {
            content = "<a href='/newhouse/" + data.projectId + ".html' ontouchend='window.open (this.href)'><div class='hf-tag-blue'><div class='hf-arrow-blue'><em></em><span></span></div>" + data.projectName + " ￥" + data.averagePrice + "</div></a>";
        } else if (type == "house-grey") {
            content = "<a href='#'><div class='hf-tag-grey'><div class='hf-arrow-grey'><em></em><span></span></div>" + data.projectName + " ￥" + data.averagePrice + "</div></a>";
        }


        marker = new AMap.Marker({
            content: content,
            position: new AMap.LngLat(data.longitude, data.latitude)
        });

        if (!hide) {
            marker.setMap(mapObj);
        }

        if (type === "area") {
            AMap.event.addListener(marker, 'click', function (e) {
                $("#siteId").data("isClick", true);
                $.ajax({
                    type: 'get',
                    url: 'http://xkapi.com/v1.0/Newhouse/List.api',
                    data: {siteId: siteId, areaId: data.areaId, outType: "jsonp"},
                    dataType: 'jsonp',
                    success: function (houseData) {
                        marker.subMarkers = [];
                        $.each(houseData.data.list, function (key, val) {
                            if (!val.longitude || !val.latitude) {
                                return;
                            }
                            var m = map.setMarker(val, "house-blue", true);
                            marker.subMarkers.push(m);
                        });

                        //显示楼盘列表
                        mapObj.add(marker.subMarkers);
                        mapObj.setFitView(marker.subMarkers);
                        mapObj.remove(Markers);
                    },
                    error: function (xhr, type) {
                        alert('Ajax error!');
                    }
                });
            });
        }

        return marker;
    }

    //显示坐标
    map.showMarkers = function (areaData, hide) {

        //区域
        $.each(areaData.data, function (k, v) {
            Marker = map.setMarker(v, "area", false);
            Markers.push(Marker);
        });

        //缩放事件
        AMap.event.addListener(mapObj, 'zoomend', function () {
            //根据范围
            if (mapObj.getZoom() >= 12 && !$("#siteId").data("isClick")) {
                map.getBoundList(siteId);
                $("#siteId").data("isClick", false);
            } else if (mapObj.getZoom() < 12) {
                mapObj.clearMap();
                mapObj.add(Markers);
            }

        });

        //缩放事件
        AMap.event.addListener(mapObj, 'dragend', function () {
            //根据范围
            if (map.getZoom >= 12) {
                map.getBoundList();
            }
        });
    };

    map.getBoundList = function () {
        var mapBounds = mapObj.getBounds();
        var sw = mapBounds.getSouthWest();
        var ne = mapBounds.getNorthEast();
        var _condition = {siteId: siteId, swlng: sw.lng, swlat: sw.lat, nelng: ne.lng, nelat: ne.lat, outType: "jsonp"};
        //
        $(".map-fliter").each(function (k, v) {
            var id = $(this).attr("data-id"), type = $(this).attr("data-type");
            if (!id || !type) {
                return;
            }

            switch (type) {
                case "area" :
                    $.extend(_condition, {areaId: id});
                    break; //区域
                case "school" :
                    $.extend(_condition, {schoolId: id});
                    break; //学区
                case "propertyType" :
                    $.extend(_condition, {propertyType: id});
                    break; //类型
                case "price" :
                    $.extend(_condition, {price: id});
                    break; //价格区间
            }
        });

        //更多
        $(".filter-more-type").find("li.on").each(function (k, v) {
            var name = $(this).attr("class").split("-")[0], moreId = $(this).attr("data-id");
            switch (name) {
                case "house" :
                    $.extend(_condition, {houseType: moreId});
                    break; //户型
                case "size" :
                    $.extend(_condition, {areaSize: moreId});
                    break; //面积
                case "sales" :
                    $.extend(_condition, {saleState: moreId});
                    break; //销售状态
                case "status" :
                    $.extend(_condition, {renovateState: moreId});
                    break; //装修状态
                case "special" :
                    $.extend(_condition, {feature: moreId});
                    break; //楼盘特色
            }

        });


        $.ajax({
            type: 'get',
            url: 'http://xkapi.com/v1.0/Newhouse/List.api',
            data: _condition,
            dataType: 'jsonp',
            success: function (houseData) {
                Map.clearMap();
                $.each(houseData.data.list, function (k, v) {
                    Map.addMarkers(v, "house-blue", true);
                });
            },
            error: function (xhr, type) {
                alert('Ajax error!');
            }
        });
    }

    //初始化
    map.init = function (areaData) {

        mapObj = new AMap.Map(opts.mapId, {
            resizeEnable: true,
            view: new AMap.View2D({
                zoom: 11,
            }),
        });

        var lat = $("#lat").val();
        var lng = $("#lng").val();
        mapObj.setCenter(new AMap.LngLat(lng, lat));

        this.setHeight(opts.height);

        this.showMarkers(areaData, false);
    };


    return {
        init: function (options) {
            opts = $.extend(defaults, options);
            //获取区域楼盘数据
            getMapData.getArea(siteId, function (data) {
                map.init(data);
            });
        },
        addMarkers: function (data, type, hide) {
            var Marker = map.setMarker(data, type, false);
            return Marker;
        },
        clearMap: function () {
            mapObj.clearMap();
        },
        getBound: function () {
            return mapObj.getBounds();
        },
        setZoom: function (num) {
            mapObj.setZoom(num);
        },
        setCenterMap: function(latX,lngY) {
            mapObj.setCenter(new AMap.LngLat(lngY, latX));
        }
    };
})();

$(function () {
    var load;
    //
    $(document).on('ajaxBeforeSend', function (e, xhr, options) {
        load = $.loading({
            content: '加载中...',
        });
    });

    $(document).on('ajaxComplete', function (e, xhr, options) {
        load.loading("hide");
    });
});


