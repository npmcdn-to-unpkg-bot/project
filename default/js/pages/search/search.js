var throttle = function (fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};


var getKeyword = function (e) {
    var val = $(this).val().trim(), siteId = $("#siteId").val(),housetype = $("#housetype").val();
    var code = e.keyCode || e.which;
    //
    if (!val || !val.replace(/[^\w\u4E00-\u9FA5]/g, '')) {
        return;
    }

    //字母+数字
    /* if(!(code<=90 && code>=65) && !(code>=48 && code<=57)){
     return;
     }*/

    console.log(housetype);
    //全文搜索
    if ($("#all-search").css("display") === "none") {
        $("#search-cancel").hide();
        $("#all-search").show();
    }

    $.ajax({
        type: 'get',
        url: "http://xkapi.com/v1.0/Other/SearchProjectName.api",
        data: {"siteId": siteId, "keyword": val, "outType": "jsonp"},
        dataType: 'jsonp',
        success: function (words) {
            console.log(words);
            var html = "";
            $("#listBox").children().remove();

            $.each(words.data, function (k, v) {
                var href = "", stype = "";
                switch (v.type) {
                    case "newhouse" :
                    	if(housetype == '1'){
                    		href = "/housetype/?keyword=" + v.projectName;
                    	}else{
                    		href = "/newhouse/?keyword=" + v.projectName;
                    	}
                        stype = "新房";
                        break;
                    case "oldhouse" :
                        href = "/oldhouse/?keyword=" + v.projectName;
                        stype = "二手房";
                        break;
                    case "zufang"   :
                        href = "/zufang/?keyword=" + v.projectName;
                        stype = "租房";
                        break;
                }

                html += '<li class="ui-border-t search-list"><a href="' + href + '">'
                        + '<div class="ui-list-info">'
                        + '<h4>' + v.projectName + '-' + stype + '</h4>'
                        + '</div></a></li>';

            });

            $("#listBox").append(html);

            //
            $(".search-list").on("click", function () {
                var elem = $(this).find("h4"), txt = elem.text().split("-")[0],
                        htype = elem.text().split("-")[1], history = store.get("historySearch");

                //
                // load = $.loading({content: '加载中...'});

                if (history) {
                    var arr = history;
                    if ($.inArray(txt, arr) === -1) {
                        arr.push({"name": txt, "type": htype});
                        store.set("historySearch", arr);
                    }
                } else {
                    store.set("historySearch", [{"name": txt, "type": htype}]);
                }
            });
        },
        error: function (xhr, type) {
            //alert('Ajax error!');
        }
    });
};

var showHistory = function () {
    var history = store.get("historySearch"),housetype = $("#housetype").val();

    if (history) {
        var html = "";
        $.each(history, function (k, v) {
            var t = v.type, url = "";
            switch (t) {
                case "新房"   :
                	if(housetype == '1'){
                		url = "/housetype/?keyword=" + v.name;
                	}else{
                		url = "/newhouse/?keyword=" + v.name;
                	}
                    break;
                case "二手房" :
                    url = "/oldhouse/?keyword=" + t;
                    break;
                case "租房"   :
                    url = "/zufang/?keyword=" + t;
                    break;
            }
            html += '<a href="' + url + '">' + v.name + '</a>';
        });
        $("#historyListBox").append(html);
    } else {
        $("#historyListBox").html("暂无搜索历史");
    }
};

$(function () {
    $('.ui-searchbar').click(function () {
        $('.ui-searchbar-wrap').addClass('focus');
        $('.ui-searchbar-input input').focus().val("");
    });
    $('.ui-searchbar-cancel').click(function () {
        $('.ui-searchbar-wrap').removeClass('focus');
    });

    //
    $("#search-input").on("focus", function () {
        $("#historyBox, #hotBox").hide();
        $("#listBox").show();
    });

    //查询
    $("#search-input")[0].oninput = throttle(getKeyword, 200);

    //清除搜索框
    $("#clearBtn").on("click", function () {
        $("#search-input").val("");
        $("#listBox").children().remove();
    });

    //历史搜索
    showHistory();

    //清除历史搜索
    $("#clearHistoryBtn").on("click", function () {
        $("#historyListBox").html("暂无搜索历史");
        store.remove("historySearch");
    });
    
    //关键词搜索
    $("#all-search").on("click", function () {
        var keyword = $('#search-input').val(),housetype = $("#housetype").val();
        if(housetype == '1'){
        	$("#submitSearch").attr('href', '/searchList.html?keyword='+keyword+'&key='+housetype).click();
    	}else{
    		$("#submitSearch").attr('href', '/searchList.html?keyword='+keyword).click();
    	}
    });
});