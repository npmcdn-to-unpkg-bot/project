/**
 * 房源管理列表js
 * Created by wuxiang on 2016/4/19.
 */
$(function(){

    document.getElementsByClassName("zhezhao")[0].addEventListener("touchstart",function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    document.getElementsByClassName("zhezhao")[0].addEventListener("touchend",function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    document.getElementsByClassName("zhezhao")[0].addEventListener("touchmove",function(e){
        e.preventDefault();
        e.stopPropagation();
    });


});

$(function () {
    //数据类型 默认已发布
    var dataType = 'added';
    //数据条数  默认10条
    var dataNum = 10;
    //分页
    var dataPage = 1;
    //总页数
    var dataTotalPage = config.totalPage;
    //记录操作前的数据类型 用与控制多次点击同一个类
    var colodCache = $('.colod').parent().attr('data-type');
    //table切换操作事件获取
    $('#data-type ol li').click(function () {
        dataType = $('.colod').parent().attr('data-type');
        if (colodCache != dataType) {
            $('#' + dataType).html('');
            //切换类别页码从0开始
            colodCache = dataType;//记录点击后的数据类型
            //将当前页初始化
            dataPage = 1;
            //获取json数据
            getDataJson();
        }
    });

    //操作获取数据
    getDataJson = function () {
        var dataWhere = new Object();
        //数据类型
        dataWhere.dataType = dataType;
        //总条数
        dataWhere.dataNum = dataNum;
        //当前第几页
        dataWhere.dataPage = dataPage;
        //操作模块
        dataWhere.action = config.actionName;

        $('.gou').find("img").hide();
        $.ajax({
            type: 'POST',
            url: '/Member/PublicJsonData/getAgentHouseList',
            data: dataWhere,
            //async: false,
            dataType: "json",
            success: function (data) {
                //console.log(dataWhere);
                //console.log(data);
                //return;
                if (data) {
                    dataTotalPage = data.totalPage;
                    //将获取到的数据进行匹配插入
                    setViewData(data.list);
                }

            }
        });
    };

    //通过获取的数据操作模版
    setViewData = function (data) {
        var release_a_a = '';
        var release_a_b = '';

        if (data) {
            if (config.actionName == 'Sale') {
                var idStr = 'sId';
            } else {
                var idStr = 'hId';
            }

            $.each(data, function (index, data) {
                release_a_a += '<li><div class="li_a"><h4>' + data.title + '</h4><p>发布时间：<span>' + data.refreshtime + '</span><a href="/member/release/editSale/' + idStr + '/' + data.id + '" class="xiu">修改</a></p></div></li>';
                release_a_b += '<li><div class="li_a"><div class="top_img"><div class="gouxuan one_a"><img src="/data/assets/default/images/gou.png" data-id="' + data.id + '" style="display: none;" alt=""></div></div><h4>' + data.title + '</h4><p>发布时间：<span>' + data.refreshtime + '</span></p></div></li>';
            });
        }
        $('#release_a_a').html(release_a_a);
        $('#release_a_b').html(release_a_b);
        func_radio();
    };

    //翻页
    $('.previous').click(function () {

        if (dataPage > 1) {
            dataPage--;
            getDataJson();
        }
    });
    $('.next').click(function () {

        if (dataTotalPage > dataPage) {
            dataPage++;
            getDataJson();
        }
    });

    $('.ols_b li').click(function () {
        var dataAction = $(this).attr('data-action');
        if (dataAction == undefined) {
            return false;
        }
        if (!confirm('您确定执行当前操作？')) {
            return false;
        }
        if (dataAction != '') {
            var idStr = getChecked();
            if (idStr) {
                $.ajax({
                    type: "POST",
                    url: '/Member/PublicJsonData/publicAjaxData',
                    data: {
                        dataAction: dataAction,
                        dataController: config.actionName,
                        dataId: idStr
                    },
                    dataType: 'json',
                    success: function (returnJson) {
                        switch (returnJson.code) {
                            case '101':
                                alert(returnJson.data);
                                break;
                            case '103':
                                alert(returnJson.data);
                                break;
                            case '106':
                                break;
                        }
                        getDataJson();
                    }
                });
            }
        }
    });

    //获取所需要操作的id
    getChecked = function () {
        var str_id = new Array();
        $('.one_a').find("img").each(function () {
            if (!$(this).is(":hidden")) {
                str_id.push($(this).attr('data-id'));
            }
        });
        str_id = str_id.join(',');
        if (typeof str_id == 'string' && str_id != '') {
            return str_id;
        }
        return false;
    }

});