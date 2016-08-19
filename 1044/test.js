$(function(){
  var x1,x2,x3,y1,y2,y3;

  x1 = $('.rotate').offset().left + $('.rotate').width()/2;
  y1 = ($('.rotate').offset().top + $('.rotate').height()/2)*-1;
  var tip = "" ;
  tip += x1 + '  ' + y1;
  $('.tip').html(tip);
  var status = false;
  var status2 = false;

  $('.rotate')[0].addEventListener('touchstart',function(e){
    // console.log(e.touches[0])
    status = false;
    x2 = e.touches[0]['pageX'];
    y2 = e.touches[0]['pageY']*-1;
    var html = "";
    html+= x2+ ' ' + y2 + '<br>'
    $('.touchstart').html(html)
  });

  $('.rotate')[0].addEventListener('touchmove',function(e){
    // console.log(e.touches[0])
    x3 = e.touches[0]['pageX'];
    y3 = e.touches[0]['pageY']*-1;
    var html = "";
    html+= x3+ ' ' + y3 + '<br>'
    $('.touchmove').html(html);

    
    var ab,ac,cosA;
    ab = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    ac = Math.sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1));
    bc = Math.sqrt((x2-x3)*(x2-x3)+(y2-y3)*(y2-y3));

    cosA = ((x2-x1)*(x3-x1)+(y2-y1)*(y3-y1)) / (ab*ac);

    console.log(parseFloat((y1-y2)/(x1-x2) - (y3-y1)/(x3-x1)).toFixed(2))
    // console.info((y3-y1)/(x3-x1))
    var rotate = Math.acos(cosA)*180/Math.PI;

    var nm = parseFloat((y1-y2)/(x1-x2) - (y3-y1)/(x3-x1)).toFixed(2);
    if( nm== 0.01 || nm== 0 || nm== -0.01 ){
      status = true;
      console.log(180)
    }
    if(status){
      rotate = 360 - rotate;
    }
    $('.number').html(rotate);
    $('.rotate').css({
      'transform' : 'rotateZ('+rotate+'deg)'
    })

  });

  $('.rotate')[0].addEventListener('touchend',function(e){
    $('.rotate').css({
      'transform' : 'rotateZ('+0+'deg)'
    })
  })

})