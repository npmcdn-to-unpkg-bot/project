/*
* by fanfan
*
*/
"use strict";
$(function(){
  function handleTouchStart(e) {
      if (isTouched) {
          if ($.device.android) {
              if ('targetTouches' in e && e.targetTouches.length > 1) return;
          } else return;
      }
      isMoved = false;
      isTouched = true;
      isScrolling = undefined;
      wasScrolled = undefined;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchStartTime = (new Date()).getTime();
      /*jshint validthis:true */
      container = $(this);
  }

  function handleTouchMove(e) {
      if (!isTouched) return;
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (!isScrolling) {
          isTouched = false;
          return;
      }

      scrollTop = container[0].scrollTop;
      if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

      if (!isMoved) {
          /*jshint validthis:true */
          container.removeClass('transitioning');
          if (scrollTop > container[0].offsetHeight) {
              isTouched = false;
              return;
          }
          if (dynamicTriggerDistance) {
              triggerDistance = container.attr('data-ptr-distance');
              if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
          }
          startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
          if (container[0].scrollHeight === container[0].offsetHeight || !$.device.ios) {
              useTranslate = true;
          } else {
              useTranslate = false;
          }
          useTranslate = true;
      }
      isMoved = true;
      touchesDiff = pageY - touchesStart.y;

      if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
          // iOS 8 fix
          if ($.device.ios && parseInt($.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

          if (useTranslate) {
              e.preventDefault();
              translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
              container.transform('translate3d(0,' + translate + 'px,0)');
          } else {}
          if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
              refresh = true;
              container.addClass('pull-up').removeClass('pull-down');
          } else {
              refresh = false;
              container.removeClass('pull-up').addClass('pull-down');
          }
      } else {

          container.removeClass('pull-up pull-down');
          refresh = false;
          return;
      }
  }

  function handleTouchEnd() {
      if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
      }
      if (translate) {
          container.addClass('transitioning');
          translate = 0;
      }
      container.transform('');
      if (refresh) {
          //防止二次触发
          if(container.hasClass('refreshing')) return;
          container.addClass('refreshing');
          container.trigger('refresh');
      } else {
          container.removeClass('pull-down');
      }
      isTouched = false;
      isMoved = false;
  }


          // Attach Events
  // eventsTarget.on($.touchEvents.start, handleTouchStart);
  // eventsTarget.on($.touchEvents.move, handleTouchMove);
  // eventsTarget.on($.touchEvents.end, handleTouchEnd);
        

})


