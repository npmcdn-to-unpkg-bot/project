window.addEventListener('load', eventWindowLoaded,false);
function eventWindowLoaded(){
	canvasApp();
}
function canvasSupport(){
	return Modernizr.canvas;
}
function canvasApp(){
	if(!canvasSupport()){
		return;
	}
	var theCanvas= document.getElementById('canvasOne');
	var context=theCanvas.getContext('2d');
	function drawScreen(){
		//背景
		context.globalAlpha = 1;
		context.fillStyle = '#000000';
		context.fillRect(0,0,640,480);
		//图像
		context.globalAlpha=.25;
		context.drawImage(hellowWorldImage,0,0);
		if(fadeIn){
			alpha +=.01;
			if(alpha>=1){
				alpha=1;
				fadeIn = false;
			}
		}else{
			alpha -=0.01;
			if(alpha<0){
				alpha = 0;
				fadeIn =true;
			}
		}
		//text
		context.font='72px Sans-Serif';
		context.textBaseline = 'top';
		context.globalAlpha = alpha;
		context.fillStyle='#ffffff';
		context.fillText(text,150,200);
	}
	var text = 'Hello World',
		alpha = 0,
		fadeIn = true,
		hellowWorldImage = new Image();
		hellowWorldImage.src='images/html5bg.jpg';
	function gameLoop(){
		window.setTimeout(gameLoop,20);
		drawScreen();
	}
	gameLoop();

}