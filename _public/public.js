/*
**********************
* made in 饭饭
* 2016-05-12
**********************
* 基于JQ编写
*/

// 初始化
$(function(){
	defaultEvent($("#shade")[0]); //清除遮罩层事件autoHeight
})

//URL地址解析
// 调用方法
// alert(GetQueryString("参数名1"));

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
 


// animate.css 
/*
* animated($(".lump1"),'bounceInDown animated');
*/
function animated(element,animate){
	element.addClass(animate).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass(animate);
	});
}


// 清除默认触摸事件  传入的为DOM 对象
function defaultEvent(element){
	if(element === undefined) return;
	element.addEventListener("touchstart",function(e){
		// e.preventDefault();
		// e.stopPropagation();
	})
	element.addEventListener("touchend",function(e){
		// e.preventDefault();
		// e.stopPropagation();
	})
	element.addEventListener("touchmove",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
}

// 自动调整元素高度
/*
* params.element 元素名
* params.scale 高度/宽度
* params.marginTop 上外边距 居中可写为-0.5
* params.refer 参照元素
* autoHeight({element : $(".lump1"),scale : 0.9})
* autoHeight({element : $(".lump2"),scale : 0.5,refer : $(".lump1")})
*/
function autoHeight(params,callback){
	if(params.element === undefined){
		console.log('please input element');
		return;
	}
	var $this = params.element,
		scale = params.scale,
		marginTop = params.marginTop,
		refer = params.refer;
	if(scale === undefined){
		scale = 1;
	}
	if(marginTop === undefined){
		marginTop = 0;
	}
	
	if(refer === undefined){
		var width = parseInt($this.width());
		if(marginTop == 0){
			$this.css({
				height : parseInt(width*scale)
			})
		}else{
			$this.css({
				height : parseInt(width*scale),
				marginTop : parseInt(width*scale*marginTop) + "px"
			})
		}
	}else{
		if(marginTop == 0 ){
			$this.css({
				height : parseInt(refer.height())*scale
			})
		}else{
			$this.css({
				height : parseInt(refer.height())*scale,
				marginTop : parseInt(refer.height())*scale*marginTop + "px"
			})
		}
		
	}
	//回调
	//回调
	if(callback !== undefined){
		callback.call($this);
	}
 }

// 变动的颜色条 changeRainbow
/*
* params.element 元素名
* params.colorList 颜色数组
* params.widthList 宽度数组 之和需为100
* params.time 时间间隔
*/
function changeRainbow(params,callback){
	//todo 对象合并
	// var settings = $.extend({},defaults,params);

	if(params.element === undefined ){
		console.log('please input element');
		return;
	}
	var $this = params.element,
		widthList=params.widthList,
		colorList=params.colorList;
	if(widthList === undefined || arrSum(widthList) != 100 ){
		console.log('widthList:'+widthList);
		widthList = [2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,7,7,9,9];
	}
	if(colorList === undefined){
		console.log('colorList:'+colorList);
		colorList=['#000000','#9addfd','#db231a','#fff500','#e8f77b','#8bc9e0','#0390da','#ad2b7c','#48307e'];
	}
	var length = widthList.length;
	//宽度打乱
	widthList=shuffle(widthList);
	var str=[];
	for (var i=0; i<length;i++){
		str.push('<span></span>');
	}
	$this.append(str.join(''));
	$this.find("span").each(function(index, el) {
		$(this).css({
			display : "inline-block",
			width : widthList[index]/2+"%",
			marginRight:widthList[index]/4+"%",
			marginLeft:widthList[index]/4+"%",
			height : Math.random()*30+70+"%",
			background: colorList[Math.floor(Math.random()*colorList.length)]
		})
	});
	//定时器
	setInterval(function(){
		$this.find("span").each(function(index, el) {
			$(this).css({
				background: colorList[Math.floor(Math.random()*colorList.length)]
			})
		});
	},params.time)
	//回调
	if(callback !== undefined){
		callback.call($this);
	}
}


//数组随机排列 洗牌shuffle
/*
*	error shuffle
*	arr.sort(function(){
*        return Math.random() - 0.5;
*    });
*/
function shuffle(arr){
  var len = arr.length;
  for(var i = 0; i < len - 1; i++){
    var idx = Math.floor(Math.random() * (len - i));
    var temp = arr[idx];
    arr[idx] = arr[len - i - 1];
    arr[len - i -1] = temp;
  }
  return arr;
}

//数组求和
function arrSum(arr){
	return eval(arr.join('+'))
}

//防盗链
// var  ssHostName = (window.location.hostname).toLowerCase();

// if( ssHostName !="www.superslide2.com" &&  ssHostName !="superslide2.com" ){ 

// 	alert("为防止superslide2.com网站崩溃，请勿直接引用http://www.superslide2.com/jquery.SuperSlide.2.1.1.js文件！你应该把js文件放到自己服务器并引用，谢谢合作。");

// }