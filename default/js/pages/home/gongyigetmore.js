var loadNewsMore = {
    init: function (url, load, listBox) {
        if ($(window).scrollTop() >= ($(document).height() - $(window).height()) - 52 && $(load).css("display") === "none") {
            var pageNum = $(load).data("pageNum");

            $(load).css("display", "block");
            pageNum += 1;

            loadNewsMore.getList(url, pageNum, function (data) {
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
    getList: function (url, pageNum, callback) {
        var _url = url;
        $.ajax({
            type: 'get',
            url: _url,
            data: {"pageNow": pageNum},
            dataType: 'json',
            success: callback,
            error: function (xhr, type) {
                //alert('Ajax error!');
            }
        });

    },
    buildList: function (load, data, box) {
        var _this = $(this), temp = "";
        console.log(data);
        $.each(data, function (k, v) {
            console.log
            temp += loadNewsMore.makeDom(v);
        });

        $(box).append(temp);
    },
    makeDom: function (data) {
        var temp = "";
        //   var temp="", type = data.newsType;

//        if(type == 0 || !type){//列表
 
        temp += '<li class="ui-border-t">'
                + '<div class=" ui-list-img-s"><a href="' + data.id + '"><img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="' + data.photoUrl + '"></a></div>'
                + '<div class="ui-list-info">'
                + '<h4 class="ui-nowrap-multi"><a href="/home/news/' + data.id + '.html">' + data.title + '</a></h4>'
                + '<div class="hf-f12 ui-nowrap">' + data.createTime + '</div>'
                + '</div>'
                + '</li>';

    
    return temp;
    //$(box).append(temp);
    

}
}