//根据ip定位
var ipLocation = function () {
    //
    if (store.get("xkb-city")) {
        $("#cityDialog").val(store.get("xkb-city"));
        return;
    }

    AMap.service(["AMap.CitySearch"], function () {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityInfo = result.city;
                    $("#cityDialog").val(cityInfo);
                }
            } else {
                $("#cityDialog").val("自动定位失败,请点击手动切换!");
            }
        });
    });
}


$(function () {
    //城市ip定位
    ipLocation();

    //城市弹窗
    $("#cityDialog").dialogAction();

    //城市切换
    $(".city-list").on("click", function () {
        var city = $(this).text(), id = $(this).attr("data-id");
        $("#cityDialog").val(city);
        $("#cityId").val(id).attr({"value": id});
        $("#cityDialog-cancel").trigger("click");
        $("#houseList a").attr('href', '/member/recommend/getGroupDataLists/siteId/' + id);
    });

    //清空内容
    $(".hf-icon-close").on("click", function () {
        $(this).prev("input").val(" ");
    });


    //还原表单
    if (store.get("xkb-name")) {
        $("#username").val(store.get("xkb-name"));
    }

    if (store.get("xkb-phone")) {
        $("#phone").val(store.get("xkb-phone"));
    }

    if (store.get("xkb-house")) {
        var data = store.get("xkb-house"), txt = "", ids = [];
        $.each(data, function (k, v) {
            txt += v.name + "-";
            //全选
            if (v.isAll) {
                ids.push(v.id);
            }

            //楼盘
            var len = v.house.length - 1;
            $.each(v.house, function (k1, v1) {
                len !== k1 ? txt += v1.houseName + "-" : txt += v1.houseName + " ";
                //部分选择
                if (!v.isAll) {
                    ids.push(v1.houseId);
                }

            });
        });

        $("#house").val(txt).attr({"value": txt}).data({"house-list": data});
        $("#house-input").val(ids.join(",")).attr({"value": ids.join(",")});
    }

    //保存表单数据
    $("#houseList").on("click", function () {
        var name = $("#username").val().trim(), phone = $("#phone").val().trim();
        var city = $("#cityDialog").val().trim();
        if (!!name) {
            store.set('xkb-name', name);
        }

        if (!!phone) {
            store.set('xkb-phone', phone);
        }

        if (!!city) {
            store.set("xkb-city", city);
        }

    });

    //重置
    $("#resetBtn").on("click", function () {
        store.remove('xkb-name');
        store.remove('xkb-phone');
        store.remove('xkb-city');
        store.remove('xkb-house');
        $("#houseList a").attr('href', '/member/recommend/getGroupDataLists/siteId/340100');
        $("#username").val("");
        $("#phone").val("");
        $("#house").val("");
        $("#house-input").val("");
        ipLocation();
    });

    //提交
    $("#submitBtn").on("click", function () {
        store.remove('xkb-name');
        store.remove('xkb-phone');
        store.remove('xkb-city');
        store.remove('xkb-house');
        $.ajax({
            type: 'POST',
            url: '/member/recommend/earm',
            dataType: 'jason',
            data: $('form').serialize(),
            success: function (data) {
                var result = eval("(" + data + ")");
                if (result.code == 101) {
                    alert(result.msg);
                    window.location.href = "/member/index";
                } else {
                    alert(result.msg);
                }
            }

        });
    });
});