
var font = (function(){
	var defaults={
		length : 36,
		colorList : [],
		transformList : [],
		element : {}
	},game={},options={},
	  bout=0,index,time=10,timer,state=false,
	  text = ['祝','父','亲','节','快','乐'],
	  // text = ['   ','  ','  ','  ','  ','  '],
	  tempList=[];
	game.init=function(){
		// options.font=[];
		// for(var i=1 ;i<options.length;i++){
		// 	options.font.push(game.font());
		// }
		
		tempList = options.font.concat(text[bout]);
		tempList = shuffle(tempList);
		index = tempList.indexOf(text[bout]);
		// console.log(tempList)
		// console.log(index)
		var str = '';
		tempList.forEach(function(e){
			str+='<span class="'
				 +options.colorList[Math.floor(Math.random()*options.colorList.length)]
				 +' '
				 +options.transformList[Math.floor(Math.random()*options.transformList.length)]
				 +'">'+e+'</span>';
		})
		options.element.find('.content').html(str);
		options.element.find('.title span').eq(bout).addClass('on').siblings().removeClass('on');
		for(var j=0 ;j<bout;j++){
			options.element.find('.title span').eq(j).addClass('active');
		}
		time = 10;
		game.play();
	}
	game.play = function(){
		function clickFont(){
			// console.log($(this).index())
			if($(this).index() == index){
				clearInterval(timer);
				bout++;
				console.log(bout)
				console.log(text.length)
				if(bout>=text.length){
					$('#shade').fadeIn();
					$('.user').slideDown();
					return;
				}
				game.init();
			}
		}
		function timerFun(){
			time--;
			$('.time span').html(time);
			if(time <= 0){
				state = true;
				clearInterval(timer);
				options.element.find('.content').find('span').each(function(index, el) {
					this.removeEventListener('touchstart',clickFont);
					$('#shade').fadeIn();
					$('.dialog1').slideDown();
				});
			}
		}

		// 监听文字点击
		options.element.find('.content').find('span').each(function(index, el) {
			this.addEventListener('touchstart',clickFont)
		});

		$('.time span').html(time);
		//监听
		timer = setInterval(timerFun,1000);
	}
	game.font=function(){
	    eval( "var word=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
	    return word;
	}
	return {
		init:function(opt){
			options = $.extend(defaults,opt);
			//初始化
			options.font = ['站','无','设','你','建','设',
							'冰','享','附','近','家','加',
							'的','自','房','间','啊','热',
							'及','第','吹','爱','云','好',
							'吃','计','才','陪','我','奇',
							'迹','去','藕','马','甲'];
			options.length = 36;
			bout = 0;
			options.element.find('.title span').removeAttr('class');
		    game.init();
		}
	}
})();



$(function(){
	
})

