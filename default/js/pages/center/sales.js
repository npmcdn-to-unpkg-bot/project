
$(function(){
   //编辑 删除
   $(".house-sales-list").on("longTap", function(){
        var control = $(this).find(".hf-contorls");

        if(control.css("display") === "none"){
        	$(".house-sales-list").removeAttr("style");
                $(this).attr({"style":"background:#f0f0f0"});
                $(".house-sales-list .hf-contorls").hide();
                control.show();
        }
   });
});