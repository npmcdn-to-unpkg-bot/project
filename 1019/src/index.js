$(function(){
  $('.iconmenu').on('click',function(){
    console.log(111)
    $('body').toggleClass('openleft');
  })


  !function(){
    var start = 0,
        move = 0,
        end =0;

    $('.page-left').each(function(){
      this.addEventListener('touchstart',function(event){
        start = event.touches[0].clientX;
      })
      this.addEventListener('touchmove',function(event){
        move = event.touches[0].clientX;
        if(move-start<-50){
          $('body').removeClass('openleft');
        }
      })
    })

  }()
  $('.shade').each(function(){
    this.addEventListener('touchmove',function(event){
      event.preventDefault();
    })
  })
  $('.page-dialog').each(function(){
    this.addEventListener('touchmove',function(event){
      event.preventDefault();
    })
  })
  $('.page-dialog .close').on('click',function(){
    $('.shade').hide();
    $('.page-dialog').hide();
  })
  $('.shade').on('click',function(){
    $(this).hide();
    $('.page-dialog').hide();
  })
  $('.show-dialog-2').on('click',function(){
    $('.page-dialog').hide();
    $('.shade').show();
    $('.page-dialog-2').fadeIn();
    $('body').removeClass('openleft');
  })
  $('.show-dialog-1').on('click',function(){
    $('.page-dialog').hide();
    $('.shade').show();
    $('.page-dialog-1').fadeIn();
    $('body').removeClass('openleft');
  })

})