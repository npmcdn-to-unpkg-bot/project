$(function(){
  $('.dianji').on('click',function(){
    $(".page-1").fadeOut(1000);
    $(".page-2").fadeIn(800);
    var img = document.querySelector('.page-2').getElementsByTagName('img');
      for(var i =0;i<img.length;i++){
        img[i].setAttribute("class",img[i].getAttribute('class')+" "+img[i].getAttribute('data-val')+" animated")
      }
  })
  $('.weclome').on('click',function(){
    $(".page-2").slideUp();
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

