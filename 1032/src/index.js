function defaultEvent(element){
	if(element === undefined) return;
	element.addEventListener("touchstart",function(e){
		// e.preventDefault();
		// e.stopPropagation();
	})
	element.addEventListener("touchend",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	element.addEventListener("touchmove",function(e){
		// e.preventDefault();
		// e.stopPropagation();
	})
}

$(function(){
	$('.close').on('click',function(){
		$('.dialog').removeClass('show');
		$('#shade').hide();
	})
	$('.dialogprize .btn').on('click',function(){
		$('.close').trigger('click');
	})
})