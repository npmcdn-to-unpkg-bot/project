var onSynSub_90tk = function(obj, bto){
	var on = 0;
	obj.find('div.fcon:eq('+ on +')').show();
	bto.find('a:eq('+ on +')').addClass("current").siblings().removeClass('current');
	setInterval(function(){
		if (on<4) {
			on++;
		} else {
			on = 0;
		}
	    obj.find('div.fcon:eq(' + on + ')').show().siblings().hide();
	    bto.find('a:eq(' + on + ')').addClass('current').siblings().removeClass('current');
	},3000);
	bto.find('a').on({
		click:function(){
			on = $(this).index(); 
			obj.find('div.fcon:eq(' + on + ')').show().siblings().hide();
	    	bto.find('a:eq(' + on + ')').addClass('current').siblings().removeClass('current');
		}
	});
}
var onSynSub_header = function(obj){
	obj.find('li.nLi').hover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		//var h = $(this).children('div.sub').height();
		$(this).children('div.sub').animate({
			height: 'toggle'
		},'show');
	},function(){
		obj.find('li:eq(1)').addClass('on').siblings().removeClass('on');
		$(this).children('div.sub').animate({
			height: 'toggle'
		},'show');
	});
	/*
	obj.find('li').on({
		mousemove:function(){

		},
		hover:function(){
			
			var h = $(this).children('div.sub').height();
			$(this).children('div.sub').animate({
				height: h,
				display: 'block'
			},'show');
		}, function(){
			
			$(this).children('div.sub').animate({
				height: '0px',
				display: 'block'
			},'show');
		}
	});
	*/
}