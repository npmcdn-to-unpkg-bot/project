$(function (){

    //记录字体大小
    var size = store.get("fontSize");
    if(!!size){
    	$("#setfont-"+size).find(".hf-setfont").addClass("on");
    	$(".news-content").css({"font-size" : size+"px"});
    }else{
    	$("#setfont-18").find(".hf-setfont").addClass("on");
    }

    //分享
    $("#shareBtn").actionsheet({sheetContent : "#share", cancelBtn : "#shareCancelBtn", cssName : "show"});

    //更多
    $("#moreBtn").actionsheet({sheetContent : "#more", cancelBtn : "#moreCancelBtn", cssName : "show"});

    //设置字体大小
    $(".setfont").on("click", function(){
       var size = $(this).attr("id").split("-")[1];
       $(".news-content").css({"font-size" : size+"px"});
       $(".hf-setfont").removeClass("on");
       $(this).find(".hf-setfont").addClass("on");
       //保存字体
       store.set('fontSize', size);
    });

    //收藏
    $("#saveArticle").toggleStatus({addElem:".hf-icon-favorite", cssName:"on", position:"find"});

    /* 展开更多 */
    var introHgt = $('.news-content').height();
    $('[js=unfold]').on('click',function(e){
        var newsId = $(this).attr("for");
        $.ajax({
            type: "GET",
            url: "/news/contentdata/" + newsId + ".html",
            success: function(jsonData){
                var data = eval('(' + jsonData + ')');
                $('.news-content').append(data.content);
                loadProjectInfo();
                $(this).hide();
            }
        });
        
        
        
        if($('.news-content').height() == introHgt) {
            $('.news-content').css('height', 'auto');
            $(this).hide();
        }else {
            $('.news-content').height(introHgt);
        }

        e.preventDefault();
        e.stopPropagation();
      
    });


    //新闻图片轮显
    if($("#news-photos").length!==0){

       $(".slider-img").first().find("img")[0].onload = function(){
           var h = $(this).height();
           $(".ui-slider").height(h);
       };

       var slider = new fz.Scroll('#news-photos', {
            role: 'slider',
            indicator: false,
            autoplay: false,
            bounce: false
       });

       //当前页数和文字内容显示
       slider.on('scrollEnd', function(curPage) {
        $("#curPagesNum").text(curPage+1);
        $(".hf-photos-text").hide().eq(curPage).show();
       });

       //取消图片单击事件
       
       // $(".slider-img").on("click", function(){
       //      var index = $(this).index();
       //      $(".hf-photos-text").addClass("ui-nowrap-multi").eq(index).removeClass("ui-nowrap-multi");
       // });
    };


    //提问
    $("#questionDialog").dialogAction(function(){

   });

});


