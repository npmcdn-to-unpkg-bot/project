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

