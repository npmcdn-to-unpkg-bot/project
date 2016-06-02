var loadNewsMore = {
    init: function (url, load, listBox) {
        if ($(window).scrollTop() >= ($(document).height() - $(window).height()) - 52 && $(load).css("display") === "none") {
            var pageNum = $(load).data("pageNum");
            var keyword = $('#keyword').val();

            $(load).css("display", "block");
            pageNum += 1;
            if (pageNum > 50) {
                //$(load).find("p").html("已经到底啦!");
                alert('已经到底啦!');
                $(load).data({"isOver": true});
                $(load).data({"pageNum": pageNum}).css("display", "none");
                return;
            }

            loadNewsMore.getList(url, pageNum, keyword, function (data) {
                if (data.length === 0) {
                    if (!$(load).data("isOver")) {
                        $(load).find("p").html("已经到底啦!");
                        $(load).data({"isOver": true});
                    }
                    return;
                }
                setTimeout(function () {
                    loadNewsMore.buildList(load, data, listBox);
                }, 200);
                $(load).data({"pageNum": pageNum}).css("display", "none");
            });
        }
    },
    getList: function (url, pageNum, keyword, callback) {
        var _url = url;
        $.ajax({
            type: 'get',
            url: _url,
            data: {"pageNow": pageNum, "keyword": keyword},
            dataType: 'json',
            success: callback,
            error: function (xhr, type) {
                //alert('网络拥塞，请稍后重试');
            }
        });

    },
    buildList: function (load, data, box) {
        var _this = $(this), temp = "";
        console.log(data);
        $.each(data, function (k, v) {
            //console.log(data);
            temp += loadNewsMore.makeDom(v);
        });

        $(box).append(temp);
    },
    makeDom: function (data) {
        var temp = "", type=data.categoryId;
          console.log(type);
        if (type == 1 || type== 3 ||type == 146) {//列表
            temp += '<li class="ui-border-t">'
                    + '<div class=" ui-list-img-s"><a href="' + data.id + '"><img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + data.photourl + '"></a></div>'
                    + '<div class="ui-list-info">'
                    + '<h4 class="ui-nowrap-multi"><a href="' + data.id + '">' + data.title + '</a></h4>'
                    + '<div class="hf-f12 ui-nowrap">' + data.createTime + '</div>'
                    + '</div>'
                    + '</li>';
            
        } else if (type == 163 ||type == 162 ||type == 188) {//图集
            //if (type == 163 ) {//图集
            if (data.photoUrlList.length !== 0) {
                temp += '<li class="ui-border-t hf-news-photo">'
                        + '<a href="' + data.id + '" alt="' + data.title + '">'
                        + '<h6 class="ui-nowrap ui-whitespace-right">' + data.title + '</h6>'
                        + '<ul class="ui-grid-trisect" >';
                //data.photourl = [];
                $.each(data.photoUrlList, function (k, v) {
                    temp += '<li><div class="ui-grid-trisect-img"><img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + v.photoUrl + '" alt="' + v.title + '"></div></li>';
                });
                temp += '</ul></a></li>';
            }

        } else if (type == 5) {//专题
            temp += '<li class="ui-border-t hf-news-photo">'
                    + '<a href="' + data.id + '">'
                    + '<h6 class="ui-nowrap ui-whitespace-right">' + data.title + '</h6>'
                    + '<div class="ui-whitespace-right" style="padding-bottom: 10px;">'
                    + '<div class="hf-one-img hf-tag-zhuanti">'
                    + '<img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + data.photourl + '" alt="' + data.title + '">'
                    + '</div></div></a></li>';
        } else if (type == 6) {//直播
            temp += '<li class="ui-border-t hf-news-photo">'
                    + '<a href="' + data.id + '">'
                    + '<h6 class="ui-nowrap ui-whitespace-right">' + data.title + '</h6>'
                    + '<div class="ui-whitespace-right" style="padding-bottom: 10px;">'
                    + '<div class="hf-one-img hf-tag-zhibo">'
                    + '<img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + data.photourl + '" alt="' + data.title + '"></span>'
                    + '</div></div></a></li>';
        }

        return temp;

    }

}
