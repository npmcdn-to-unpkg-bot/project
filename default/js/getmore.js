var totalheight = 0;
function loadData(){
    totalheight = parseFloat(jQuery(window).height()) + parseFloat(jQuery(window).scrollTop());
    if (jQuery(document).height() <= totalheight) {  // 说明滚动条已达底部
        /*这里使用Ajax加载更多内容*/
       // alert('text'); return false;

        var data = {}; // 查询参数
        //提交url
        var pblUrl = jQuery('#pblUrl').val();
        //alert(pblUrl);
        // 当前页
        var pageNow = parseInt(jQuery('#pageNow').val());
        var pageSize = parseInt(jQuery('#pageSize').val());
        jQuery('#pageNow').val(parseInt(pageNow)+1);
        jQuery("#loading").html('<a href="javascript:void(0)" class="hf-fgray" onclick="loadData()">正在拼命加载中...</a>');
        jQuery.post(
            pblUrl,
            {pageNow:pageNow,pageSize:pageSize,loadMorn:1},
            function(result){
                if(result){
                    var arr = eval(result);
                    $.each(arr,function(k,v){
                        var ajaxdata='<li class="ui-border-t hf-news-photo"><h6 class="ui-nowrap ui-whitespace-right">'+v['title']+'</h6><div class="ui-whitespace-right" style="padding-bottom: 10px;"><a href="'+v['id']+'"><div class="hf-one-img hf-tag-"'+v['img']+'""><span style="background-image:url('+v['photourl']+')"></span></div></a></div></li>';
                        jQuery("#container").append(ajaxdata);
                    })
                    }else{
                    jQuery("#loading").hide();
                }
            }
        );
    }
}
jQuery(window).scroll( function() {
    loadData();
}); 