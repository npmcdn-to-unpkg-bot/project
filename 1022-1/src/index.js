$(function(){
  var audio = new Audio();
  audio.controls = true  //这样控件才能显示出来
  audio.setAttribute('id','media');
  audio.setAttribute('autoplay','autoplay');
  audio.setAttribute('loop','loop');
  audio.src = 'images/bg.mp3';  //音乐的路径
  document.body.appendChild(audio);  //把它添加到页面中
  $('.audio_btn').addClass('on');
  $('.audio_btn').on('click',function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $('#media')[0].pause();
    }else{
      $(this).addClass('on');
      $('#media')[0].play();
    }
  })

  $('.dianji').on('click',function(){
    $(".page-1").fadeOut(1000);
    $(".page-2").fadeIn(800);
    $('.audio_btn').removeClass('on');
    $('#media')[0].pause();

    var img = document.querySelector('.page-2').getElementsByTagName('img');
      for(var i =0;i<img.length;i++){
        img[i].setAttribute("class",img[i].getAttribute('class')+" "+img[i].getAttribute('data-val')+" animated")
      }
  })
  $('.weclome').on('click',function(){
    $(".page-2").slideUp().remove();
    $('.audio_btn').addClass('on');
    $('#media')[0].play();
    $('.page').show().fullpage({
      afterRender:function(){
        $('.page').find('img').each(function(){
          $(this).addClass($(this).attr('data-class'));
        })
      },
      afterLoad:function(){
        this.find('img').each(function(){
          var classname = $(this).attr('data-class');
          $(this).removeClass().addClass(classname);
          $(this).addClass($(this).attr('data-val')+' animated').show();
        })
      },
      onLeave:function(){
        this.find('img').each(function(){
          var classname = $(this).attr('data-class');
          $(this).removeClass().addClass(classname);
          $(this).addClass($(this).attr('data-leave')+' animated');
        })
      }
    });
  })
  $('.loading').each(function(){
    this.addEventListener('touchmove',function(e){
      e.preventDefault();
    })
  })
})

