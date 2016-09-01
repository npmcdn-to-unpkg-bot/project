var two = [3,4,5,8];
var last = parseInt(Math.random()*Math.pow(10,9)).toString();
var num = '1'+ two[parseInt(two.length*Math.random())]+last


$.post('/Newhouse/Fang/getYzm.html',{phone:num},function(e){console.log(e)})