/*
* by fanfan
*
*/
"use strict";

$(function(){

    $('.component').on('onInit',function(){
      $(this).css({
        top : parseInt($(this).attr('top'))/75+'rem',
        left : parseInt($(this).attr('left'))/75+'rem',
        bottom : parseInt($(this).attr('bottom'))/75+'rem',
        animationDelay : $(this).attr('delay')+'ms',
      });
      $(this).addClass('animated');
    })

    // leave
    $('.component').on('onLoad',function(){
      var load  = $(this).attr('load');
      var leave = $(this).attr('leave');
      $(this).removeClass(leave);
      $(this).addClass(load);
    })

    $('.component').on('onLeave',function(){
      var load  = $(this).attr('load');
      var leave = $(this).attr('leave');
      $(this).removeClass(load);
      $(this).addClass(leave);
    })

    $('.component').trigger('onLeave');
    $('#page').fullpage({
      // anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9'],
      menu: '#menu',
      css3:true,
      onLeave: function(index, nextIndex, direction){
        // console.log(index);
        $('#page').find('.section').eq(index-1).find('.component').trigger('onLeave');
      },
      afterLoad: function(anchorLink, index){
        // console.log(index);
        $('#page').find('.section').eq(index-1).find('.component').trigger('onLoad');
      },
      afterRender:function(){
         $('.component').trigger('onInit');
      }
    });
  })


