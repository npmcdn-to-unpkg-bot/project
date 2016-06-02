//直播
var loadLive = {
     makeDom : function(data){
         var html = '<li id="zhidao_'+data.id+'" class="live-list">'
                  + '<div>'+data.content+'</div>'
                  + '<span class="time">'+data.addtime+'<span class="hf-fr">'+data.name+'</span></span>'
                  + '</li>';
         return html;
     },

     getNewData : function(){
            var id = $("#zhiboID").val(), newId = $(".live-list").first().attr("id").split("_")[1];

            $.ajax({
              type: 'get',
              url: '/news/zhibo/zhiboAjaxNew/'+id+'.html?cid='+newId,
              dataType: 'json',
              success: function(data){
                  if(data.length===0){
                      $.tips({
                          content:'暂时无最新消息',
                          stayTime:2000,
                          type:"success"
                      });
                      return;
                  }
                  
                  var list = " ";
                  $.each(data, function(k, v){
                    list += loadLive.makeDom(v);   
                  });

                  $(list).prependTo($("#zhiboBox"));
              },
              error: function(xhr, type){
                //alert('Ajax error!');
              }
            }); 
     },
     getMoreData : function(){
            var id = $("#zhiboID").val(), lastId = $(".live-list").last().attr("id").split("_")[1];
            $.ajax({
              type: 'get',
              url: '/news/zhibo/zhiboAjaxMore/'+id+'.html?cid='+lastId,
              dataType: 'json',
              success: function(data){
                  if(data.length===0){
                      $.tips({
                          content:'已经加载到最后一页',
                          stayTime:2000,
                          type:"success"
                      });
                      $("#loading-live").css("display", "none");
                      return;
                  }

                  $("#loading-live").css("display", "none");

                  var list = " ";
                  $.each(data, function(k, v){
                    list += loadLive.makeDom(v);   
                  });

                  $(list).appendTo($("#zhiboBox"));
              },
              error: function(xhr, type){
                //alert('Ajax error!');
              }
            }); 
     }
}

//评论
var loadComment = {
     makeDom : function(data){
         var html = '<li>'
                  + '<h3 class="meta">'+data.userName+'<time>'+data.createTime+'</time>'
                  + '</h3>'
                  + '<p class="content">'+data.content+'</p>'
                  + '</li>';
         return  html;
     },
      getNewData : function(){
            var id = $("#zhiboID").val(), newId = $(".comment-list").first().attr("id").split("_")[1];
            $.ajax({
              type: 'get',
              url: '/news/zhibo/commentAjaxNew/'+id+'.html?cid='+newId,
              dataType: 'json',
              success: function(data){
                  if(data.length===0){
                      $.tips({
                          content:'暂时无最新消息',
                          stayTime:2000,
                          type:"success"
                      });
                      return;
                  }
                  
                  var list = " ";
                  $.each(data, function(k, v){
                    list += loadComment.makeDom(v); 
                  });

                  $(list).prependTo($("#commentBox"));
              },
              error: function(xhr, type){
                //alert('Ajax error!');
              }
            }); 
     },
     getMoreData : function(){
            var id = $("#zhiboID").val(), lastId = $(".comment-list").last().attr("id").split("_")[1];
            $.ajax({
              type: 'get',
              url: '/news/zhibo/commentAjaxMore/'+id+'.html?cid='+lastId,
              dataType: 'json',
              success: function(data){
                  if(data.length === 0){
                      $.tips({
                          content:'已经加载到最后一页',
                          stayTime:2000,
                          type:"success"
                      });
                      $("#loading-comment").css("display", "none");
                      return;
                  }

                  $("#loading-comment").css("display", "none");

                  var list = " ";
                  $.each(data, function(k, v){
                    list += loadComment.makeDom(v);   
                  });

                  $(list).appendTo($("#commentBox"));
              },
              error: function(xhr, type){
                //alert('Ajax error!');
              }
            }); 
     }
}



            
$(function () {
    //记录字体大小
    var size = store.get("fontSize");
    if(!!size){
      $("#setfont-"+size).find(".hf-setfont").addClass("on");
      $(".news-content").css({"font-size" : size+"px"});
    }else{
      $("#setfont-16").find(".hf-setfont").addClass("on");
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

    //
    $("#loading-live").data({"pageNum" : 1});
    $("#loading-comment").data({"pageNum" : 1});

    //导航固定
    var navTop = parseInt($("#zhiboNav").offset().top)-44;
    var navFixed = function(){
     var scrolls = parseInt($(this).scrollTop()), navElem = $("#zhiboNav");

     //fixed
     if(scrolls > navTop) {
        if(!navElem.hasClass("fixed")){
            navElem.addClass("fixed");
         }
     }else{
        if(navElem.addClass("fixed")){
            navElem.removeClass("fixed");
          }
     }

     //more
     var type = $(".subnav.on").attr("name").split("-")[0];
     if($(window).scrollTop()>=$(document).height()-$(window).height() && $("#loading-"+type).css("display") === "none"){
              var pageNum = $("#loading").data("pageNum");
              $("#loading-"+type).css("display", "block");
              
              switch(type){
                case "live" : loadLive.getMoreData();break;
                case "comment" : loadComment.getMoreData();break;
              }
       } 
   }
                
   //选项卡切换
   $(".subnav").on("click", function(){
          var id = $(this).attr("name");

          $(".subnav").removeClass("on");
          $(this).addClass("on");

          $(".subnav-content").hide();
          $("#"+id).show();
    });



    window.onscroll = throttle(navFixed, 100);


    //手动刷新
    $("#refreshBtn").data({"num" : 1});
    $("#refreshBtn").on("click", function(){
        var type = $(".subnav.on").attr("name"), deg = 360;
        var num = $("#refreshBtn").data("num");

        $(this).css({"transform" : "rotate("+deg*num+"deg)"});
        $("#refreshBtn").data({"num" : num+1});

        switch(type){
          case "live-content" : loadLive.getNewData();break;
          case "comment-content" : loadComment.getNewData();break;
        }
    });

    //评论
    $("#commentBtn").on("click", function(){
        var txt = $("#comment-input").val();
        var newsId = $("#comment-id").val();
        var pattern=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;  

        if(pattern.test(txt)){  
            alert("输入非法字符串!");
        }
        $.ajax({
            type: "POST",
            url: "/news/zhibo/insertcomment.html",
            data: "content=" + txt + '&id=' + newsId,
            success: function(data){
                if(data == 1){
                    alert('提交成功！');window.location.reload();
                }else{
                    alert('提交失败，请稍后重试！');
                }
            }
        });

    });

 });