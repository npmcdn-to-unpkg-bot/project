/*
*
* for fanfan
*/

$(function(){
  $('#slider-btns a').on('click',function(){
    var index = $(this).index();
    console.log(index)
    $('#slider-btns').css({
      transform: 'rotatez('+72*index*-1+'deg)'
    })
    $('.spinner-btn').css({
      transform: 'rotatez('+72*index*-1+'deg)'
    })
    $('.spinner').css({
      transform: 'scale(2) rotatez('+72*index*-1+'deg)'
    })
    $('.slides img').eq(index).addClass('active').siblings().removeClass('active');
    $('.slider-overlay div').eq(index).addClass('active').siblings().removeClass('active');

  })
})