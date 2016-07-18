function load(list){
  if(list == undefined ) return
  var img = list.img == undefined ? [] : list.img ;
  var js = list.js == undefined ? [] : list.js ;
  var length = img.length + js.length , num = 0;
  function progress(num){
    var progress = parseInt(num*100/length);
    console.log(progress)
    document.getElementsByClassName('loading')[0].getElementsByClassName('tip')[0].innerHTML=progress+"%";
    if(num == length){
      document.getElementsByClassName('loading')[0].style.display='none';
      document.body.className = document.body.className +' ready';
    }
  }
  function imgload(src){
    var img = new Image();
    img.onload = function () {
        num++;
        progress(num);
    };
    img.src = src;
  }
  function jsload(list,index){
    if(index == undefined ) index = 0;
    if(index >= list.length) return
    var _doc=document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('src',list[index]);
     _doc.appendChild(script);
     script.onload=function(){
        index++
        jsload(list,index);
        num++;
        progress(num);
     }
  }
  for(var i=0;i<img.length;i++){
    imgload(img[i]);
  }
  jsload(js);
}
