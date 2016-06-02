
(function(){
    //轮显js
	var ui_slider_img=$('.ui-slider-content img');
	var imgNum=1,len=ui_slider_img.length;
	for(var i=0;i<len;i++){
		if(ui_slider_img[i].complete){
        getOnloadNum();
    }else{
        ui_slider_img[i].onload=getOnloadNum;
    }
	}
	function getOnloadNum(){
		if(imgNum==len){
			 var slider = new fz.Scroll('.ui-slider', {
				role: 'slider',
				indicator: true,
				autoplay: true,
				interval: 3000
			});
		}else{
			imgNum++;
		}
		
	}       
    //房价图表
  if(xinfang.length!==0){
   var houseData = [{
            name : '新房',
            value:xinfang,
            color:'#7dd232',
            line_width:2
        }];

   $("#houseChart").lineChart({"data": houseData, "labels": mydate});
   
   }else{
		      //hide
   }

   //图片懒加载
   picLazyLoad({
      className: "lazyload"
   });
   
})();