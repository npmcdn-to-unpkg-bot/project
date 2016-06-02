!function(a){ //全局控制
	function b(){var b=g.getBoundingClientRect().width;
		a.rem=(b/6.4>100?100:(b/6.4<50?50:b/6.4)),g.style.fontSize=a.rem+"px"}
		var g=a.document.documentElement,
		e;a.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(b,300)},!1),
		a.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(e),e=setTimeout(b,300))},!1),b()}(window);

window.addEventListener("load",function(){ //默认处理
	   setTimeout(function(){
	   window.scrollTo(0,1);
	   },0);
})

$(function(){ //监控
	   self_adaption();
       Content_selection();
	   Content_selection_d();
        tion_left();
    $(window).resize(function(){
       self_adaption();
       Content_selection();
        tion_left();
		Content_selection_d();
    })
})


var self_adaption = function(){ //自适应
    var h = $(window).height();
    var w = $(window).width();
    $(".box").height(h);
    $(".center").height(h-$(".top").height()-$(".btn").height());
    $(".cent_top ol li").width($(".center").width()/2);
    $(".cent_top ol i").width($(".center").width()/4);
    var spnd = $(".cent_top ol i").width()/2;
    $(".center_mou").height(h-$(".top").height());
}





var Content_selection = function(){ //头部选择器
    $(".cent_top ol li").each(function(){
        var i = $(this).index();
        var w = $(".cent_top ol i").width();
        $(this).click(function(){
            $(this).find("p").addClass("colod").parent("li").siblings("li").find("p").removeClass("colod");
            $(".cent_top ol i").animate({
                left:i * w *2+"px"
            },200)
        })
    })
}

var tion_left = function(){
    $(".li_onde").click(function(){
        $(".box_two").css({
            transition:"all 0.2s linear",
            transform:"translateX(0%)"
        })
    });

    function let(name){
        name.click(function(){
            $(".box_two").css({
                transition:"all 0.2s linear",
                transform:"translateX(100%)"
                })
            })
    }

    let($(".host span"));
    let($(".right_tt"));
}


var Content_selection_d = function(){
    $(".c_top").click(function(){
        $(this).siblings("ul").toggle(300);
        $(this).find("i").toggleClass("right_sj");
    })
    $(".ul_box li").click(function(){
        $(this).find("span").toggleClass("quanm");
    })
}

