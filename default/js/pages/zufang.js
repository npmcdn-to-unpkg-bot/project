var loadMore = {
   init : function(siteId, url, load, listBox){
     if($(window).scrollTop()>=$(document).height()-$(window).height() && $(load).css("display") === "none"){
              var pageNum = $(load).data("pageNum");
              if($(".hf-category-item.on").length>0){
                $(".hf-category-item.on").find("a").trigger("click");
              }
              $(load).css("display", "block");
              pageNum += 1;

              loadMore.getList(siteId, url, pageNum, function(houseData){
                $(load).data({"pageNum" : pageNum}).css("display", "none");
                setTimeout(function(){
                  loadMore.buildList(houseData, listBox);
                }, 200);
              });
       }
   },
   getList : function(siteId, _url, pageNum, callback){
    var url = window.location.href.split("/")[4], _condition = {siteId : siteId, outType:"jsonp", page: pageNum};

    //关键词
    if($.getUrlParam("keyword")){
        $.extend(_condition, {"projname": $.getUrlParam("keyword")});
    }

    if(!!url){
       var con = url.split(/([0-9]+)/);
       $.each(con, function(k, v){
         //
         if((k+1)%2 === 0){
            return;
         }

         //
         switch(v){
            case "q" : $.extend(_condition, {area: con[k+1]});break; //区域
            //case "l" : $.extend(_condition, {type: con[k+1]});break; //类型
            case "j" : $.extend(_condition, {price: con[k+1]});break; //价格
            case "p" : $.extend(_condition, {sort: con[k+1]});break; //排序
            case "h" : $.extend(_condition, {houseType: con[k+1]});break; //户型
            case "m" : $.extend(_condition, {areaZone: con[k+1]});break; //面积
            //case "y" : $.extend(_condition, {buildingera: con[k+1]});break; //房龄
            //case "c" : $.extend(_condition, {roomFace: con[k+1]});break; //朝向
            case "f" : $.extend(_condition, {membertype: con[k+1]});break; //来源
            case "z" : $.extend(_condition, {fitment: con[k+1]});break; //装修
            case "a" : $.extend(_condition, {isShare: con[k+1]});break; //整租/合租
         }
       });
     }

     $.ajax({
              type: 'get',
              url: _url,
              data: _condition,
              dataType: 'jsonp',
              success: callback,
              error: function(xhr, type){
                //alert('Ajax error!');
              }
       });

   },
   buildList : function(houseData, box){
        var _this = $(this);
        var temp = "";

        $.each(houseData.data.list, function(k, v){
           temp += '<a href="/zufang/'+v.aid+'/">'
                +  '<li class="ui-border-t">'
                + '<div class="hf-house-box">'
                + '<div class="ui-list-img">'
                + '<img class="lazyload" src="/data/assets/default/js/lazyLoad/loading.png" data-original="'+v.housephoto+'">'
                + '<i class="hf-badge-pos hf-badge">'+v.membertype+'</i>'
                + '</div>'
                + '<div class="ui-list-info">'
                + '<h4 class="ui-nowrap-multi hf-badge-wrap hf-nowrap-multi">'+v.hiretitle+'</h4>'
                + '<div class="hf-f12 hf-fgray">'+v.areaname+' '+v.projname+' </div>'
                + '<div class="ui-nowrap hf-badge-wrap hf-f13 hf-fgray">'+v.roomtype+' '+v.housearea+'<span class="hf-badge-pos"><em class="hf-f15 hf-fred">'+v.price+'</em></span></div>'
                + '</div></div></li></a>';
        });

        $(box).append(temp);
   }

}

$(function(){
     //返回顶部
     $("#goTop").backTop();

     //导航
     $(".hf-icon-daohang").click(function(){
        var t = $(".pop-layer");
        t.toggleClass("show");
     });

     //区域
    $("#filter-area").firstFliter();
    var txt1 = $(".area-list.on").text();
    if(txt1 !== "不限"){
      $("#filter-area").find("span").text(txt1);
    }

    //类型
    $("#filter-origin").firstFliter();
    var txt2 = $(".origin-list.on").text();
    if(txt2 !== "不限"){
      $("#filter-origin").find("span").text(txt2);
    }

    //价格
    $("#filter-price").firstFliter();
    var txt3 = $(".price-list.on").text();
    if(txt3 !== "不限"){
      $("#filter-price").find("span").text(txt3);
    }

    //更多
    $("#filter-more").firstFliter();
    $(".more-type").secondFliter($(".filter-more-type"));
    $("#loading").data({"pageNum" : 1});
    /*window.onscroll = throttle(loadMore, 300);*/
    var siteId = $("#siteId").val();
    window.onscroll = throttle(function(){
      loadMore.init(siteId, "http://xkapi.com/v1.0/Zufang/List.api", "#loading", "#RentListBox");
    }, 300);

    //图片懒加载
    picLazyLoad({
      className: "lazyload"
    });
});