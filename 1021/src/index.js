/*
**********
*made in fanfan
**********
*/
var json = [{"合肥":1000},{"芜湖":1000},{"马鞍山":1000},{"六安":1000},
            {"池州":1000},{"淮南":1000},{"黄山":1000},{"蚌埠":1000},
            {"安庆":1000},{"铜陵":1000},{"巢湖":1000},{"阜阳":1000},
            {"淮北":1000},{"宣城":1000},{"滁州":1000},{"亳州":1000},{"宿州":1000}];

$(function(){
  charts.init({
    element : $('.chart-lst-2')[0],
    data : json
  })
})


var charts = function(){
  var defaults={

  },option={},chart={},myChart,chartoption={};

  chart.init = function(){
    myChart = echarts.init(option.element);

    for(var attr in option.data){
      chartoption.xAxis.push(attr);
      chartoption.series.data.push(option.data[attr]);

    }
    
  }

  return {
    init:function(options){
      jQuery.extend(option,defaults, options);
      chart.init();
    }
  }

}()