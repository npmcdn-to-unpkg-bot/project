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
       Content_selectionb();
       tion_left();
       zhueij()
    $(window).resize(function(){
       self_adaption();
       Content_selection();
       Content_selectionb();
       tion_left();
       zhueij()
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



var Content_selectionb = function(){
    $(".c_top").click(function(){
        $(this).siblings("ul").toggle(300);
        $(this).find("i").toggleClass("right_sj");
    })
    $(".ul_box li").click(function(){
        $(this).find("span").toggleClass("quanm");
    })
}



var tion_left = function(){
    $(".li_bos").click(function(){
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


var zhueij = function(){
    // $(".right_jj").click(function(){
    //     $(".zd li").eq(1).after("<li class='remov'><div class='li_bne'><div class='wid30' stley='display:block'></div><input class='li_binput' type='text' name='' value='' placeholder=''><span>室</span><input class='li_binput' type='text' name='' value='' placeholder=''><span>厅</span><i class='iconfont right_s right_m right_jo'>&#xd603;</i></div></li>")
    // })
    
    $(".center").delegate(".right_jo","click",function(){
        $(this).parents("li").remove();
    })
}