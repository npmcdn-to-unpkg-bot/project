/*
**********
*made in fanfan
**********
*/
;(function($){ 
 $.fn.chart = function(settings) {
  var  defaults = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: 'auto',
                    data:[10, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

  var options = $.extend({},defaults,settings);
  return this.each(function(){
    var myChart = echarts.init(this);
        // 指定图表的配置项和数据 options
        // console.log(options)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(options);
  })
}
})(jQuery); 