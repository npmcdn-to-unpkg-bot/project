$(function(){
    $('img').each(function(){
      var anOut = $(this).attr('data-out');
      if(anOut){
        $(this).addClass('animated '+anOut);
      }
    })
    $('#fullpage').fullpage({
      'sectionsColor':['#f3f5f7','#f3f5f7','#fff','#f3f5f7',
                       '#fff','#f3f5f7','#f3f5f7','#fff',
                       '#f3f5f7','#fff','#f3f5f7','#fff',
                       '#f3f5f7','#fff','#f3f5f7'
                      ],
      afterLoad: function(a,b,c){
        this.find('img').each(function(){
          var anIn = $(this).attr('data-in');
          var anOut = $(this).attr('data-out');
          $(this).removeClass('animated');
          if(anOut){
            $(this).removeClass(anOut);
          }
          if(anIn){
            $(this).addClass('animated '+anIn);
          }
        })
      },
      onLeave: function(){
        this.find('img').each(function(){
          var anIn = $(this).attr('data-in');
          var anOut = $(this).attr('data-out');
          $(this).removeClass('animated');
          if(anIn){
            $(this).removeClass(anIn);
          }
          if(anOut){
            $(this).addClass('animated '+anOut);
          }
        })
      }
    });
  })