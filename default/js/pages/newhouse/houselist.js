var loadMore = {
   init : function(siteId, url, load, listBox){
     if($(window).scrollTop()>=$(document).height()-$(window).height() && $(load).css("display") === "none"){
              var pageNum = $(load).data("pageNum");

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
    var url = window.location.href.split("/")[5], _condition = {siteId : siteId, outType:"jsonp", page: pageNum};

    //关键词
    if($.getUrlParam("keyword")){
        $.extend(_condition, {"keyword": $.getUrlParam("keyword")});
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
            case "q" : $.extend(_condition, {areaId: con[k+1]});break; //区域
            case "s" : $.extend(_condition, {schoolId: con[k+1]});break; //学区
            case "l" : $.extend(_condition, {propertyType: con[k+1]});break; //类型
            case "j" : $.extend(_condition, {price: con[k+1]});break; //价格
            case "p" : $.extend(_condition, {order: con[k+1]});break; //排序
            case "h" : $.extend(_condition, {houseType: con[k+1]});break; //户型
            case "m" : $.extend(_condition, {areaSize: con[k+1]});break; //面积
            case "t" : $.extend(_condition, {feature: con[k+1]});break; //楼盘特色
            case "z" : $.extend(_condition, {renovateState: con[k+1]});break; //装修状态
            case "x" : $.extend(_condition, {saleState: con[k+1]});break; //销售状态
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
            
			  var tempa = '<li class="ui-border-t">'
                + '<a href="/newhouse/'+v.projectId+'/huxing/'+v.housetypeId+'.html?houselist=1">'
                + '<div class="hf-house-box">'
                + '<div class="ui-list-img hf-badge-wrap">'
                + '<img src="'+v.photoPath+'" />'
                + '</div>'
                + '<div class="ui-list-info">'
                + '<h4 class="ui-nowrap hf-badge-wrap" >'+v.projectName+'</h4>'
                + '<div class="hf-f12 hf-badge-wrap hf-fgray">'+v.areaName+' <span class="hf-f15 hf-badge-pos hf-fred">'+v.totalPrice+'</span></div>'
                + '<div class="hf-f12 hf-fgray666"> '+v.housetype+'   '+v.typeArea+'㎡</div>'
                + '<div class="ui-nowrap hf-fgray666 hf-f12 hf-badge-wrap">参考价：'+v.averagePrice+'<span class="hf-f12 hf-badge-pos">'
                + '<i class="hf-badge-label-3">'+v.saleState+'</i></span></div>'
                + '</div></div></a></li>';
        
             temp += tempa;
         });
         //console.log(temp);
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
    $(".area-type").secondFliter($(".filter-area-type"));
    var txt1 = $(".area-list.on").text();
    if(txt1 !== "不限"){
      $("#filter-area").find("span").text(txt1);
    }

    //类型
    $("#filter-type").firstFliter();
    var txt2 = $(".type-list.on").text();
    if(txt2 !== "不限"){
      $("#filter-type").find("span").text(txt2);
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
    window.onscroll = throttle(function(){
      loadMore.init(siteId, "http://xkapi.com/v1.0/Newhouse/Housetypelist.api", "#loading", "#newhouselist");
    }, 300);

    //图片懒加载
    picLazyLoad({
      className: "lazyload"
    });
});