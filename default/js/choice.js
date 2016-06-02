window.addEventListener("load",function(){ //默认处理
	   setTimeout(function(){
	   window.scrollTo(0,1);
	   },0);
})

$(function(){ //监控
	   self_adaption();
       Content_selection();
    $(window).resize(function(){
       self_adaption();
       Content_selection();
    })
})


var self_adaption = function(){
    var h = $(window).height();
    var w = $(window).width();
    $(".box").height(h);
    $(".center_mou").height(h-$(".top"));
}





var Content_selection = function(){
    $(".c_top").click(function(){
        $(this).siblings("ul").toggle(300);
        $(this).find("i").toggleClass("right_sj");
    })
    $(".ul_box li").click(function(){
        $(this).find("span").addClass("quanm").parents("li").siblings("li").find("span").removeClass("quanm")
    })
}



