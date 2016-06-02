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
       qiehuan();
    $(window).resize(function(){
       self_adaption();
       Content_selection();
       qiehuan();
    })
})


var self_adaption = function(){ //自适应
    var h = $(window).height();
    var w = $(window).width();
    $(".box").height(h);
    $(".center").height(h-$(".top").height()-$(".botton").height());
    $(".cent_top ol li").width($(".center").width()/2);
    $(".cent_top ol i").width($(".center").width()/4);
    var spnd = $(".cent_top ol i").width()/2;
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



var qiehuan = function(){
    $(".cent_top ol li").each(function(){
        $(this).click(function(){
            var i = $(this).index();
            $(".release_a").eq(i).show().siblings(".release_a").hide();
        })
    })
}


