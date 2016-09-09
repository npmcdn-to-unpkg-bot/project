 function defaultEvent(element){
    if(element === undefined) return;
    element.addEventListener("touchstart",function(e){
      e.stopPropagation();
    })
    element.addEventListener("touchend",function(e){
      e.stopPropagation();
    })
    element.addEventListener("touchmove",function(e){
      // e.preventDefault();
      e.stopPropagation();
    })
  }