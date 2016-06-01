/*
*	公共交互
*	made in 饭饭
*/


function autosize(){
	autoHeight({element : $('.content .lst'),scale : 1.0})
}

var game ={
	init : function(imgStr,list){
		var str='';
		for(var i=0;i<list.length;i++){
			str+='<div class="lst card" >'
				+'<div class="face front">'
				+'<img src="'+imgStr+'i000.jpg" alt="">'
				+'</div>'
				+'<div class="face back">'
				+'<img src="'+imgStr+list[i]+'" alt="">'
				+'</div>'
				+'</div>';
		}
		$('.content').html(str);
		autosize();
	},
	game : function(imgStr){
		var list=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.png','9.jpg','10.png'];
		list = list.concat(list);
		list = shuffle(list);

		if( imgStr== undefined) imgStr = 'images/';
		this.init(imgStr,list);
		var count = 0;
		var clickCount = 0;
		$('.content .lst').each(function(){
			this.addEventListener("touchstart",function(e){
				e.preventDefault();
				e.stopPropagation();
				clickCount++;
				if(!$('.music').hasClass('on')){
					$('.music').addClass('on');
					$('#audio')[0].play();
				}
				if($(this).hasClass('active')) return;	
				if($('.card.active').length>1) return;
				$(this).addClass('active card-flipped');
				if($('.card.active').length == 2 ){
					setTimeout(function(){
						if(list[$('.card.active').eq(0).index()] === list[$('.card.active').eq(1).index()]){
							count++;
							
							$('.card.active').removeClass('active').css('visibility' , 'hidden');
							if(count == list.length*0.5){
								if(clickCount < count ){
									alert('小伙子作弊了吧！');
									return;
								}
								clearTimeout(timer);
								console.log(secondCount);
								setTimeout(function(){
									window.location.href="gameover.html?score="+secondCount;
								},1000)
							}
						}else{
							$('.card.active').removeClass('active card-flipped');
						}
					},700)
				}

			})
		})
	}
}

