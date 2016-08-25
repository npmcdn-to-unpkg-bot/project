/*
* made in fanfan
 */

$(function(){


// 五行
// 特码肖
// 平特肖
// 号码
// 单双
// 波色
// 家野
// 头数
// 尾数
  var list = [
   ['一行','二行','三行','四行'],
   ['1肖','2肖','3肖','4肖','5肖','6肖','7肖','8肖','9肖'],
   ['1肖','2肖'],
   ['1码','2码','3码','4码','5码','6码','7码','8码','9码','10码',
   '11码','12码','13码','14码','15码','16码','17码','18码','19码','20码',
   '21码','22码','23码','24码','25码','26码','27码','28码','29码','30码'],
   ['单双'],
   ['一波','双波'],
   ['家野'],
   ['1','2','3'],
   ['1','2','3','4','5','6']
  ];
  var listHtml = [
'<ul class="t_num cnmlg" style="float: left; clear: left;"><li><a href="javascript:;"  class="b1"><span>金</span></a></li><li><a href="javascript:;"  class="b2"><span>土</span></a></li><li><a href="javascript:;"  class="b3"><span>水</span></a></li><li><a href="javascript:;"  class="b4"><span>木</span></a></li><li><a href="javascript:;"  class="b5"><span>火</span></a></li></ul> ',
'<ul class="t_sx" id="shengxiao" style="float: left; clear: left;"><li><span class="z1">鼠</span><p class="ckb"> 鼠</p></li><li><span class="z2">牛</span><p class="ckb"> 牛</p></li><li class=""><span class="z3">虎</span><p class="ckb"> 虎</p></li><li class=""><span class="z4">兔</span><p class="ckb"> 兔</p></li><li class=""><span class="z5">龙</span><p class="ckb"> 龙</p></li><li><span class="z6">蛇</span><p class="ckb"> 蛇</p></li><li><span class="z7">马</span><p class="ckb"> 马</p></li><li><span class="z8">羊</span><p class="ckb"> 羊</p></li><li><span class="z9">猴</span><p class="ckb"> 猴</p></li><li class=""><span class="z10">鸡</span><p class="ckb"> 鸡</p></li><li class=""><span class="z11">狗</span><p class="ckb"> 狗</p></li><li class=""><span class="z12">猪</span><p class="ckb"> 猪</p></li></ul> ',
'<ul class="t_sx" id="shengxiao" style="float: left; clear: left;"><li><span class="z1">鼠</span><p class="ckb"> 鼠</p></li><li><span class="z2">牛</span><p class="ckb"> 牛</p></li><li class=""><span class="z3">虎</span><p class="ckb"> 虎</p></li><li class=""><span class="z4">兔</span><p class="ckb"> 兔</p></li><li class=""><span class="z5">龙</span><p class="ckb"> 龙</p></li><li><span class="z6">蛇</span><p class="ckb"> 蛇</p></li><li><span class="z7">马</span><p class="ckb"> 马</p></li><li><span class="z8">羊</span><p class="ckb"> 羊</p></li><li><span class="z9">猴</span><p class="ckb"> 猴</p></li><li class=""><span class="z10">鸡</span><p class="ckb"> 鸡</p></li><li class=""><span class="z11">狗</span><p class="ckb"> 狗</p></li><li class=""><span class="z12">猪</span><p class="ckb"> 猪</p></li></ul>',
'<ul class="t_num" style="float: left; clear: left;"><li><a href="javascript:;"><span class="red_ball">01</span></a></li><li><a href="javascript:;"><span class="red_ball">02</span></a></li><li><a href="javascript:;"><span class="blue_ball">03</span></a></li><li><a href="javascript:;"><span class="blue_ball">04</span></a></li><li><a href="javascript:;"><span class="green_ball">05</span></a></li><li><a href="javascript:;"><span class="green_ball">06</span></a></li><li><a href="javascript:;"><span class="red_ball">07</span></a></li><li><a href="javascript:;"><span class="red_ball">08</span></a></li><li><a href="javascript:;"><span class="blue_ball">09</span></a></li><li><a href="javascript:;"><span class="blue_ball">10</span></a></li><li><a href="javascript:;"><span class="green_ball">11</span></a></li><li><a href="javascript:;"><span class="green_ball">12</span></a></li><li><a href="javascript:;"><span class="red_ball">13</span></a></li><li><a href="javascript:;"><span class="red_ball">14</span></a></li><li><a href="javascript:;"><span class="blue_ball">15</span></a></li><li><a href="javascript:;"><span class="blue_ball">16</span></a></li><li><a href="javascript:;"><span class="green_ball">17</span></a></li><li><a href="javascript:;"><span class="green_ball">18</span></a></li><li><a href="javascript:;"><span class="red_ball">19</span></a></li><li><a href="javascript:;"><span class="red_ball">20</span></a></li><li><a href="javascript:;"><span class="blue_ball">21</span></a></li><li><a href="javascript:;"><span class="blue_ball">22</span></a></li><li><a href="javascript:;"><span class="green_ball">23</span></a></li><li><a href="javascript:;"><span class="green_ball">24</span></a></li><li><a href="javascript:;"><span class="red_ball">25</span></a></li><li><a href="javascript:;"><span class="red_ball">26</span></a></li><li><a href="javascript:;"><span class="blue_ball">27</span></a></li><li><a href="javascript:;"><span class="blue_ball">28</span></a></li><li><a href="javascript:;"><span class="green_ball">29</span></a></li><li><a href="javascript:;"><span class="green_ball">30</span></a></li><li><a href="javascript:;"><span class="red_ball">31</span></a></li><li><a href="javascript:;"><span class="red_ball">32</span></a></li><li><a href="javascript:;"><span class="blue_ball">33</span></a></li><li><a href="javascript:;"><span class="blue_ball">34</span></a></li><li><a href="javascript:;"><span class="green_ball">35</span></a></li><li><a href="javascript:;"><span class="green_ball">36</span></a></li><li><a href="javascript:;"><span class="red_ball">37</span></a></li><li><a href="javascript:;"><span class="red_ball">38</span></a></li><li><a href="javascript:;"><span class="blue_ball">39</span></a></li><li><a href="javascript:;"><span class="blue_ball">40</span></a></li><li><a href="javascript:;"><span class="green_ball">41</span></a></li><li><a href="javascript:;"><span class="green_ball">42</span></a></li><li><a href="javascript:;"><span class="red_ball">43</span></a></li><li><a href="javascript:;"><span class="red_ball">44</span></a></li><li><a href="javascript:;"><span class="blue_ball">45</span></a></li><li><a href="javascript:;"><span class="blue_ball">46</span></a></li><li><a href="javascript:;"><span class="green_ball">47</span></a></li><li><a href="javascript:;"><span class="green_ball">48</span></a></li><li><a href="javascript:;"><span class="red_ball">49</span></a></li></ul> ',
'<ul class="t_num cnmlg" style="float: left; clear: left;"><li><a href="javascript:;"  class="b1"><span>单</span></a></li><li><a href="javascript:;"  class="b2"><span>双</span></a></li><li><a href="javascript:;"  class="b3"><span>合单</span></a></li><li><a href="javascript:;"  class="b4"><span>合双</span></a></li></ul> ',
'<ul class="t_num cnmlg" style="float: left; clear: left;"><li><a href="javascript:;"  class="b1"><span>红波</span></a></li><li><a href="javascript:;"  class="b2"><span>蓝波</span></a></li><li><a href="javascript:;"  class="b3"><span>绿波</span></a></li></ul> ',
'<ul class="t_num cnmlg" style="float: left; clear: left;"><li><a href="javascript:;"  class="b1"><span>家禽</span></a></li><li><a href="javascript:;"  class="b2"><span>野兽</span></a></li></ul> ',
'<ul class="t_num" style="float: left; clear: left;"><li><a href="javascript:;"><span class="red_ball">0</span></a></li><li><a href="javascript:;"><span class="red_ball">1</span></a></li><li><a href="javascript:;"><span class="red_ball">2</span></a></li><li><a href="javascript:;"><span class="red_ball">3</span></a></li><li><a href="javascript:;"><span class="red_ball">4</span></a></li></ul> ',
'<ul class="t_num" style="float: left; clear: left;"><li><a href="javascript:;"><span class="red_ball">0</span></a></li><li><a href="javascript:;"><span class="red_ball">1</span></a></li><li><a href="javascript:;"><span class="red_ball">2</span></a></li><li><a href="javascript:;"><span class="red_ball">3</span></a></li><li><a href="javascript:;"><span class="red_ball">4</span></a></li><li><a href="javascript:;"><span class="red_ball">5</span></a></li><li><a href="javascript:;"><span class="red_ball">6</span></a></li><li><a href="javascript:;"><span class="red_ball">7</span></a></li><li><a href="javascript:;"><span class="red_ball">8</span></a></li><li><a href="javascript:;"><span class="red_ball">9</span></a></li></ul> '
  ]

var index_1,index_2;//控制选择的项
var lenght=0,userSelect=0,userSelectList=[];//控制选择上限和已选择的项

$('.select-1').on('change',function(){
  index_1 = $(this).val();
  if(index_1 == 0){
    $('.select-2').html('');
    $('#listHtml').html('');
  }else{
    if(index_1 <= list.length){
      var html ="<option value='0'>请选择</option>";
      for(var i = 0;i<list[index_1-1].length;i++){
        html += "<option value='"+(i+1)+"'>"+list[index_1-1][i]+"</option>";
      }
      $('.select-2').html(html);
      $('#listHtml').html(listHtml[index_1-1]);
      $('#listHtml').unbind('click');
      if(index_1==4||index_1==8||index_1==9){
        $('#listHtml').addClass('number');
      }else{
        $('#listHtml').removeClass('number');
      }
    }
  }
})

$('.select-2').on('change',function(){
    $('#listHtml').find('li').removeClass('on on-2 active');
    index_2 = $(this).val();
    length = parseInt(index_2);
    if(index_2 == 0){
      $('#length').html('0');
    }else{
      $('#length').html(index_2);
      $('#listHtml').unbind('click');
      // 1 5 6 7
      if(index_1 == 1 ||index_1 == 5 ||index_1 == 6 ||index_1 == 7){
        $('#listHtml').on('click','li',function(){
          $(this).toggleClass('on-2 active');
          if(countSelect() > length){
            $(this).removeClass('on-2 active');
          }
          setSelect();
        })
      }else{
        $('#listHtml').on('click','li',function(){
          $(this).toggleClass('on active');
          if(countSelect() > length){
            $(this).removeClass('on active');
          }
          setSelect();
        })
      }
    }
  })

  function countSelect(){
    return  $('#listHtml').find('li.active').length;
  }
  function setSelect(){
    userSelectList=[];
    userSelect = $('#listHtml').find('li.active').length;
    $('#selectCount').html(userSelect);
    $('#listHtml').find('li.active').each(function(){
      userSelectList.push($(this).index()+1);
    })
    $('#userSelect').val(userSelectList.join(','))
  }
})