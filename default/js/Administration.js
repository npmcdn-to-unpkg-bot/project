!function (a) { //全局控制
    function b() {
        var b = g.getBoundingClientRect().width;
        a.rem = (b / 6.4 > 100 ? 100 : (b / 6.4 < 50 ? 50 : b / 6.4)), g.style.fontSize = a.rem + "px"
    }

    var g = a.document.documentElement,
        e;
    a.addEventListener("resize", function () {
        clearTimeout(e), e = setTimeout(b, 300)
    }, !1),
        a.addEventListener("pageshow", function (a) {
            a.persisted && (clearTimeout(e), e = setTimeout(b, 300))
        }, !1), b()
}(window);

window.addEventListener("load", function () { //默认处理
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 0);
});

$(function () { //监控
    self_adaption();
    Content_selection();
    wenzi();
    //单选多选
    gouxuan();
    bottons();
    mouse();
    $(window).resize(function () {
        self_adaption();
        Content_selection();
        wenzi();
        //单选多选
        gouxuan();
        bottons();
        mouse();
    })
});


var self_adaption = function () { //自适应
    var h = $(window).height();
    var w = $(window).width();
    $(".box").height(h);
    $(".center").height(h - $(".top").height() - $(".botton").height());
    $(".cent_top ol li").width($(".center").width() / 3);
    $(".cent_top ol i").width($(".center").width() / 3);
    $(".release_a_b").height($(".center").height());
};


var Content_selection = function () { //头部选择器
    $(".cent_top ol li").each(function () {
        var i = $(this).index();
        var w = $(".cent_top ol i").width();
        $(this).click(function () {
            $(this).find("p").addClass("colod").parent("li").siblings("li").find("p").removeClass("colod");
            $(".cent_top ol i").stop(false, true).animate({
                left: i * w
            }, 200);
            //处理底部按钮切换
            $(".btn").eq(i).show().siblings(".btn").hide();
        })
    })
};


var wenzi = function () {
    $(".li_a h4").each(function () {
        var maxwidth = 50;
        if ($(this).text().length > maxwidth) {
            $(this).text($(this).text().substring(0, maxwidth));
            $(this).html($(this).html() + "...");
        }
    })


};


var func_radio = function () {
    $('.one_a').each(function () {
        $(this).click(function () {
            if ($(this).find("img").is(":hidden")) {
                $(this).find("img").show();
            } else {
                $(this).find("img").hide();
            }
        });
    });
};


var gouxuan = function () {
    $('.gou').each(function () {
        $(this).click(function () {
            if ($(this).find("img").is(":hidden")) {
                $(this).find("img").show();
                $('.one_a').find("img").show();
            } else {
                $(this).find("img").hide();
                $('.one_a').find("img").hide();
            }
        });
    });
    func_radio();
};


var bottons = function () {
    $(".botton ol li").click(function () {
        $(this).addClass("back").siblings().removeClass("back");
    });
};


var obj = {
    left_tion: function () {
        $(".administration").click(function () {
            $(".ols_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(0)"
            });
            $(".release_a_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(0)"
            });
            $(".top_a_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(0)"
            });
            $("#release_a_a").hide("normal");
            $("#release_a_b").show("normal");
        })
    },
    right_tion: function () {
        $(".bdministration").click(function () {
            $(".ols_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(100%)"
            });
            $(".release_a_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(100%)"
            });
            $(".top_a_b").css({
                transition: "all 0.3s linear",
                transform: "translateX(100%)"
            });
            $("#release_a_a").show("normal");
            $("#release_a_b").hide("normal");

        });
    }
};


var mouse = function () {
    obj.left_tion();
    obj.right_tion();
};








