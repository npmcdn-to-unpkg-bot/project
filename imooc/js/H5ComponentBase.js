/* 基本图文组件对象 */

var H5ComponentBase = function(name,cfg){
  var cfg = cfg || {};
  var id  = ('h5_c_'+Math.random()).replace('.','_');

  //把当前的组件类型添加到样式中进行标记
  var cls = ' h5_component_'+cfg.type;

  var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');

  cfg.text && component.text(cfg.text);

  cfg.width && component.width(cfg.width/2);
  cfg.height && component.height(cfg.height/2);
  if(cfg.css !== undefined){
    cfg.css.top && (cfg.css.top = cfg.css.top /2); 
    cfg.css.bottom && (cfg.css.bottom = cfg.css.bottom /2); 
    cfg.css.left && (cfg.css.left = cfg.css.left /2); 
    cfg.css.right && (cfg.css.right = cfg.css.right /2); 
  }
  cfg.css && component.css(cfg.css);
  cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');

  if(cfg.center === true){
    component.css({
      marginLeft : (cfg.width/4 * -1 ) + 'px',
      left       : '50%',
    })
  }
  if(cfg.relativeTo !== undefined){
    component.css('visibility','hidden');
  }
  // ........更多参数
  component.on('onLoad',function(){
    component.addClass(cls+'_load')
             .removeClass(cls+'_leave');

    // relativeTo
    // 
    if(cfg.relativeTo !== undefined){
      var relativeToComponent = component.parent().find('.h5_component_name_'+cfg.relativeTo);
      var top = relativeToComponent.offset().top;
      var left = relativeToComponent.offset().left;
      if(cfg.css.top !== undefined){
        component.css({
          top : cfg.css.top + top
        })
      }
      if(cfg.css.left !== undefined && cfg.center !== true){
        component.css({
          left : cfg.css.left + left
        })
      }
      component.css('visibility','visible');
    }
    //relativeTo end


    cfg.animateIn && component.animate(cfg.animateIn);
    return false;
  })

  component.on('onLeave',function(){
    component.addClass(cls+'_leave')
             .removeClass(cls+'_load');
    cfg.animateOut && component.animate(cfg.animateOut);
    return false;
  })


  return component;
}