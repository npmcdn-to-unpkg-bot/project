/*
* made in fanfan
*/
function preventEvent(element){
  element.addEventListener('touchmove',function(e){
    e.preventDefault();
  })
}
$(function(){
  $('.wx').on('click',function(){
    $('#wx').show();
    $('#shade').show();
    $('body').removeClass('openleft');
  })
  $('.tel').on('click',function(){
    $('#tel').show();
    $('#shade').show();
    $('body').removeClass('openleft');
  })

  $('#tel .close').on('click',function(){
    $('#tel').hide();
    $('#shade').hide();
  })

  $('#shade').each(function(){
    this.addEventListener('touchstart',function(){
      $('#tel').hide();
      $('#wx').hide();
      $('#shade').hide();
    })
    preventEvent(this)
  })
  $('#wx').each(function(){
    preventEvent(this)
  })
  $('#tel').each(function(){
    preventEvent(this)
  })

  $('.openleft').on('click',function(){
    $('body').toggleClass('openleft');
  })
})

;(function($){
  $.fn.nineArea=function(){
    
    return this.each(function(){
      var game={},$bg1,$bg1Img,$bg2,$bg2Img,timer,direction = true;
      game.init=function(obj){
        var $this = $(obj);
        if($this.find('.bg1').length == 0 ){
          console.log('请设置bg1');return
        }
        if($this.find('.bg2').length == 0 ){
          console.log('请设置bg2');return
        }
        if($this.find('.bg1 img').length == 0 ){
          console.log('请设置bg1,IMG');return
        }
        if($this.find('.bg2 img').length == 0 ){
          console.log('请设置bg2,IMG');return
        }

        $bg1    = $this.find('.bg1').eq(0);
        $bg1Img = $bg1.find('img').eq(0);
        $bg2    = $this.find('.bg2').eq(0);
        $bg2Img = $bg2.find('img').eq(0);

        var $ul = $("<ul></ul>").css({
          position : 'absolute',
          left     : 0,
          top      : 0,
          width    : '100%',
          height   : '100%',
          zIndex   : 3,
          fontSize : 0
        });
        for(var i=0;i<9;i++){
          var $li = $('<li></li>').css({
            position   : 'relative',
            width      : '33.33%',
            height     : '33.33%',
            display    : 'inline-block',
            // background : 'red',
            overflow   : 'hidden',
          })
          var $bg1box = $('<div class="bg1box"></div>'),
              $bg2box = $('<div class="bg2box"></div>');
          $bg1box.css({
            position           : 'absolute',
            // display            : 'none',
            top                : 0,
            left               : 0,
            width              : '100%',
            height             : '100%',
            zIndex             : '2',
            backgroundImage    : 'url('+$bg1Img.attr('src')+')',
            backgroundSize     : '300% 300%',
            backgroundPosition : (i%3*50)+'% '+(Math.floor(i/3)*50)+'%',
          })
          $bg2box.css({
            position           : 'absolute',
            top                : 0,
            left               : 0,
            width              : '100%',
            height             : '100%',
            zIndex             : '1',
            backgroundImage    : 'url('+$bg2Img.attr('src')+')',
            backgroundPosition : (i%3*50)+'% '+(Math.floor(i/3)*50)+'%',
            backgroundSize     : '300% 300%'
          })
          
          $ul.append($li.append($bg1box).append($bg2box));
        }
        $this.append($ul);
        $this.find('.bg2box').each(function(i){
          var j = i%2==0?1:0;
          TweenLite.to(this,1,{css:{'transform':'rotateX('+(i%2*90)+'deg) rotateY('+(j*90)+'deg) scale(0.8)'},ease:Expo.easeOut});
        })
        $bg1.remove();
        $bg2.remove();
        timer = setInterval(function(){
          game.play($this);
        },5000)
      }
      game.play=function(obj){
        $this = $(obj);
        if(direction){
          direction=!direction;
          $this.find('.bg1box').each(function(i){
            // var j = i%2==0?1:0;
            var j=1;
            TweenLite.to(this,1,{css:{'transform':'rotateX('+(i%2*90)+'deg) rotateY('+(j*90)+'deg) scale(0.8)'},ease:Linear.easeInOut});
          })
          $this.find('.bg2box').each(function(i){
            // var j = i%2==0?1:0;
            var j=1;
            TweenLite.to(this,1,{delay:1,css:{'transform':'rotateX(0deg) rotateY(0deg) scale(1)'},ease:Linear.easeInOut});
          })
          $this.find('.nineTop').slideDown(2000);
        }else{
          direction=!direction;
          $this.find('.bg2box').each(function(i){
            // var j = i%2==0?1:0;
            var j=1;
            TweenLite.to(this,1,{css:{'transform':'rotateX('+(i%2*90)+'deg) rotateY('+(j*90)+'deg) scale(0.8)'},ease:Linear.easeInOut});
          })
          $this.find('.bg1box').each(function(i){
            // var j = i%2==0?1:0;
            var j=1;
            TweenLite.to(this,1,{delay:1,css:{'transform':'rotateX(0deg) rotateY(0deg) scale(1)'},ease:Linear.easeInOut});
          })
          $this.find('.nineTop').slideUp(1000);
        }
      }
      game.init(this)
    })
  }
})(jQuery)

$(function(){
  var swiper = new Swiper('.swiper-container',{
    autoplay : 5000,
    loop     : true
  });

  $('.nineArea-1').nineArea();
  setTimeout(function(){
    $('.nineArea-2').nineArea();
  },3000)
})