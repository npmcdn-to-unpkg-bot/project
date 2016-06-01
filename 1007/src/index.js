/*
*	公共交互
*	made in 饭饭
*/


function autosize(){
	autoHeight({element : $('.content .lst'),scale : 1.0})
}

var game ={
	imglist : function(){
		var list=[[1,'images/1.jpg'],
			  [2,'images/2.jpg'],
			  [3,'images/3.jpg'],
			  [4,'images/4.jpg'],
			  [5,'images/5.jpg'],
			  [6,'images/6.jpg'],
			  [7,'images/7.jpg'],
			  [8,'images/8.png'],
			  [9,'images/9.jpg'],
			  [10,'images/10.png']];

		list = list.concat(list);
		list = shuffle(list);
		return list
	},
	init : function(){
		var str='';
		for(var i=0;i<this.imglist().length;i++){
			str+='<div class="lst card" >'
				+'<div class="face front">'
				+'<img src="images/i000.jpg" alt="">'
				+'</div>'
				+'<div class="face back">'
				+'<img src="'+this.imglist()[i][1]+'" alt="">'
				+'</div>'
				+'</div>';
		}
		$('.content').html(str);
		autosize();
	},
	game : function(){
		this.init();
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
						if(game.imglist()[$('.card.active').eq(0).index()] === game.imglist()[$('.card.active').eq(1).index()]){
							count++;
							
							$('.card.active').removeClass('active').css('visibility' , 'hidden');
							if(count == game.imglist.length*0.5){
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

