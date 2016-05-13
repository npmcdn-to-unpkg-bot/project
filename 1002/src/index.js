/*
*	公共交互
*	made in 饭饭
*/

//	页面初加载
$(function(){

})

//	手机浏览器宽高变化
$(window).resize(function(){

});




//	清除默认触摸事件  传入的为DOM 对象

function defaultEvent(event){
	if(event == undefined) return;
	event.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	event.addEventListener("touchend",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	event.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
}


