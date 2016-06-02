 

$(function(){
  //列表折叠/展开
  $(".area-list").on("click", function(){
     var elem = $(this).parent("li"), isOpen = elem.hasClass("active");

     if(isOpen){
        elem.removeClass("active");
        $(this).next().hide();
     }else{
     	elem.addClass("active");
        $(this).next().show();
     }
  });

  //确认
  $("#confirmBtn").on("click", function(){
     var selectArr = [];
     
     //选中checkbox
     $(".area-list").each(function(){
         var checked = $(this).next().find(".checkbox:checked");
         var areaId = $(this).attr("data-id"), areaName = $(this).text();
         var isAll = $(this).next().find(".all-checkbox").data("isAllCheck") || false;
         if(checked.length === 0){
            return;
         }
         selectArr.push({"id":areaId, "name": areaName, "isAll" : isAll, "house" : []});

         var len = selectArr.length - 1;
         checked.each(function(k, v){
            var elem = $(this).parent().prev().find(".list-title"), houseId = elem.attr("data-id"),
                title = elem.text();
            selectArr[len].house.push({"houseId": houseId, "houseName": title});
         });

     });

     console.log(selectArr);
     store.set("xkb-house", selectArr);
  });

  //全选
  $(".all-checkbox").on("click", function(e){
  	e.stopPropagation();
    var elem = $(this).data("isAllCheck", true).parents(".house-list").siblings().find(".checkbox");
    elem.each(function(){
    	$(this).trigger("click");
    })
  });
})