var $rotate=$('.rotate li').find('.rimg');
    var dur=0.5,scale=0.7;
    //$rotate.css({'-webkit-transform':'rotateX('+0+'deg) rotateY(90deg) translateZ(0px)','-webkit-transform-origin':'center'});
    var tmSNum=action.getDataSlow(tmObj);
    $('.module1 .MD1 ul').css('background-color','inherit');
    //trace('tmSNum::-------------------------------------------------------------------:'+tmSNum);
    if(tmSNum==0){
      TweenLite.to($('.module1 .apTxt'),1,{css:{'bottom':-90},ease:Expo.easeInOut,onComplete:function(){
        var arrAp=[0,1,2,3,4,5,6,7,8];
        for(var i=0;i<9;i++){
          var ri=Math.ceil(Math.random()*arrAp.length-1);
          var n=arrAp[ri];
          arrAp.splice(ri,1);
          var $apImg=$('.rotate li').eq(n).find('.rimg');
          var $apBg=$('.rotate li').eq(n).find('.rpane');
          var ISX_Y=Math.round(Math.random()*1);
          var RX=ISX_Y==0?90:0,RY=ISX_Y==0?0:90;
          //trace('RX:'+RX+"  RY:"+RY);
          //TweenLite.to($ap,1,{delay:0.5*i+0.8,css:{'opacity':0},ease:Linear.easeInOut})
          //$ap.delay(i*300).fadeOut('slow');
          TweenLite.to($apImg,dur,{delay:0.1*i,css:{'transform':'rotateX('+RX+'deg) rotateY('+RY+'deg) scale('+scale+')'},ease:Linear.easeInOut});
          //$apBg.css({'-webkit-transform':'rotateX('+-RX+'deg) rotateY('+-RY+'deg) scale(0.8)'});
          TweenLite.to($apBg,0,{css:{'transform':'rotateX('+-RX+'deg) rotateY('+-RY+'deg) scale(0.8)'}});
          TweenLite.to($apBg,dur*2,{delay:0.1*i+dur,css:{'transform':'rotateX('+0+'deg) rotateY('+0+'deg) scale(1)'},ease:Expo.easeOut});
        }
        //test
        TweenLite.delayedCall(dur*2+0.9,function(){
          $('.module1 .MD1 ul').css('background-color','#00b8f4');
        })
      }});

    }else if(tmSNum==1){
      var arrAp=[0,1,2,3,4,5,6,7,8];
      for(var i=0;i<9;i++){
        var ri=Math.ceil(Math.random()*arrAp.length-1);
        var n=arrAp[ri];
        arrAp.splice(ri,1);
        var $apImg=$('.rotate li').eq(n).find('.rpane');
        var $apBg=$('.rotate li').eq(n).find('.rcolor');
        $apBg.show();
        var ISX_Y=Math.round(Math.random()*1);
        var RX=ISX_Y==0?90:0,RY=ISX_Y==0?0:90;

        TweenLite.to($apImg,dur,{delay:0.1*i,css:{'transform':'rotateX('+RX+'deg) rotateY('+RY+'deg) scale('+scale+')'},ease:Linear.easeInOut});
        //$apBg.css({'-webkit-transform':'rotateX('+-RX+'deg) rotateY('+-RY+'deg) scale(0.8)'});
        TweenLite.to($apBg,0,{css:{'transform':'rotateX('+-RX+'deg) rotateY('+-RY+'deg) scale(0.8)'}});
        TweenLite.to($apBg,dur*2,{delay:0.1*i+dur,css:{'transform':'rotateX('+0+'deg) rotateY('+0+'deg) scale(1)'},ease:Expo.easeOut});
      }

      TweenLite.delayedCall(dur*2+0.9,function(){
        $('.module1 .MD1 ul').css('background-color','#a76d1e');
      })

    }else{
      var arrAp=[0,1,2,3,4,5,6,7,8];
      for(var i=0;i<9;i++){
        var ri=Math.ceil(Math.random()*arrAp.length-1);
        var n=arrAp[ri];
        arrAp.splice(ri,1);
        var $apImg=$('.rotate li').eq(n).find('.rimg');
        var $apBg=$('.rotate li').eq(n).find('.rcolor');
        var ISX_Y=Math.round(Math.random()*1);
        var RX=ISX_Y==0?90:0,RY=ISX_Y==0?0:90;

        //trace('RX:'+RX+"  RY:"+RY);
        //$apBg.css({'-webkit-transform':'rotateX('+0+'deg) rotateY('+0+'deg) scale(1)'});
        //$apImg.css({'-webkit-transform':'rotateX('+0+'deg) rotateY('+0+'deg) scale(0.8)'});
        TweenLite.to($apBg,dur,{delay:0.1*i,css:{'transform':'rotateX('+-RX+'deg) rotateY('+-RY+'deg) scale('+scale+')'},ease:Linear.easeInOut});

        //$apImg.css({'-webkit-transform':'rotateX('+RX+'deg) rotateY('+RY+'deg) scale(0.8)'});
        TweenLite.to($apImg,0,{css:{'transform':'rotateX('+RX+'deg) rotateY('+RY+'deg) scale(0.8)'}});

        TweenLite.to($apImg,dur*2,{delay:0.1*i+dur,css:{'transform':'rotateX('+0+'deg) rotateY('+0+'deg) scale(1)'},ease:Expo.easeOut});
      }
      TweenLite.to($('.module1 .apTxt'),0.5,{delay:1.5,css:{'bottom':0},ease:Linear.easeOut});
      TweenLite.delayedCall(dur*2+0.9,function(){
        $('.module1 .MD1 ul').css('background-color','#a76d1e');
      })
    }