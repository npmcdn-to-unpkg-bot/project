/*浮点数相加*/
function accAdd(num1,num2){
    var r1,r2,m;
    try{
        r1 = num1.toString().split( '.')[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2=num2.toString().split( ".")[1].length;
    }catch(e){
        r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    // return (num1*m+num2*m)/m;
    return Math.round(num1*m+num2*m)/m;
 }
 
 //浮点数相减
 function accSub(num1,num2){
    var r1,r2,m;
    try{
        r1 = num1.toString().split( '.')[1].length;
    }catch(e){
        r1 = 0;
    }
    try{
        r2=num2.toString().split( ".")[1].length;
    }catch(e){
        r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    n=(r1>=r2)?r1:r2;
    return (Math.round(num1*m-num2*m)/m).toFixed(n);
 }
 
 //两浮点数相除
 function accDiv(num1,num2){
    var t1,t2,r1,r2;
    try{
        t1 = num1.toString().split( '.')[1].length;
    }catch(e){
        t1 = 0;
    }
    try{
        t2=num2.toString().split( ".")[1].length;
    }catch(e){
        t2=0;
    }
    r1=Number(num1.toString().replace( ".","" ));
    r2=Number(num2.toString().replace( ".","" ));
    return (r1/r2)*Math.pow(10,t2-t1);
 }
 
 //浮点数相乘
 function accMul(num1,num2){
    var m=0,s1=num1.toString(),s2=num2.toString();
    try{m+=s1.split( ".")[1].length;}catch(e){};
    try{m+=s2.split( ".")[1].length;}catch(e){};
    return Number(s1.replace("." ,"" ))*Number(s2.replace(".", ""))/Math.pow(10,m);
 }

var calculator = {
	//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 / 贷款当前月0～length-1)
    getMonthMoney : function(lilv,total,month,cur_month){
	   var lilv_month = Math.round((lilv / 12)*100000)/100000;//月利率
	   var benjin_money = total/month;
	   return (total - benjin_money * cur_month) * lilv_month + benjin_money;

    },
	//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
    getMonthMoneyRate: function(lilv,total,month){
	  var lilv_month = Math.round((lilv / 12)*100000)/100000;//月利率
	  return total * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1 );
    },
    //面积:
    calArea  : function(type){
        var arg = $("#"+type+"-price").val().trim(), loop = $("#"+type+"-area").val().trim(),
            pre = $("#"+type+"-pay").selected().attr("data-pay"),
            rate = Math.round(($("#"+type+"-rate-input").val().split("%")[0]/100)*10000)/10000,
            monthNum = $("#"+type+"-month").selected().attr("data-time");


        if(!arg && !(/^[1-9]\d*$/.test(arg)) || !loop && !(/^[1-9]\d*$/.test(loop))){
        	 el=$.tips({
			    content:'单价/面积只能输入正整数!',
			    stayTime:2000,
			    type:"success"
			 });
			 return;
        }

        //房屋总价
        var totalPrice = arg * loop;

        //贷款总额
        var loadTotal = accMul(totalPrice , 1-pre);
        
        //首付款
        var firstPay = accMul(totalPrice, pre);

        //等额本息-月均还款
        var argLoadRate = calculator.getMonthMoneyRate(rate, loadTotal, monthNum);
        //等额本金-首页还款
        var argLoadMoney = calculator.getMonthMoney(rate, loadTotal, monthNum, 0);

        //等额本息-还款总额
        var payTotalRate = accMul(argLoadRate, monthNum);
        //等额本金-还款总额(首月)
        var payTotalMoney = 0;
        for(var i=0;i<monthNum; i++){
        	payTotalMoney += calculator.getMonthMoney(rate, loadTotal, monthNum, i);
        }

        //等额本息-支付利息
        var payRate = payTotalRate-loadTotal;
        //等额本金--支付利息
        var payMoney = payTotalMoney-loadTotal;
 

        //等额本息
        calculator.showResult("rate", true, argLoadRate, firstPay, loadTotal, payTotalRate, rate, payRate);
        //等额本金
        calculator.showResult("money", true, argLoadMoney, firstPay, loadTotal, payTotalMoney, rate, payMoney);
    },

    //额度
    calLimit  : function(type){
        var pre = $("#"+type+"-pay").selected().attr("data-pay"),
            rate = Math.round(($("#"+type+"-rate-input").val().split("%")[0]/100)*10000)/10000,
            monthNum = $("#"+type+"-month").selected().attr("data-time");
        var firstPay = 0;
        //贷款总额
        var loadTotal = $("#"+type+"-load-input").val()*10000;

        if(!loadTotal && !(/^[1-9]\d*$/.test(loadTotal))){
        	 el=$.tips({
			    content:'贷款总额为正整数！',
			    stayTime:2000,
			    type:"success"
			 });
			 return;
        }

        //等额本息-月均还款
        var argLoadRate = calculator.getMonthMoneyRate(rate, loadTotal, monthNum);
        //等额本金-首页还款
        var argLoadMoney = calculator.getMonthMoney(rate, loadTotal, monthNum, 0);

        //等额本息-还款总额
        var payTotalRate = accMul(argLoadRate, monthNum);
        //等额本金-还款总额(首月)
        var payTotalMoney = 0;
        for(var i=0;i<monthNum; i++){
        	payTotalMoney += calculator.getMonthMoney(rate, loadTotal, monthNum, i);
        }

        //等额本息-支付利息
        var payRate = payTotalRate-loadTotal;
        //等额本金--支付利息
        var payMoney = payTotalMoney-loadTotal;
 

        //等额本息
        calculator.showResult("rate", false, argLoadRate, firstPay, loadTotal, payTotalRate, rate, payRate);
        //等额本金
        calculator.showResult("money", false, argLoadMoney, firstPay, loadTotal, payTotalMoney, rate, payMoney);
        
    },

    showResult : function(type, isArea, month, first, loadTotal, payTotal, rate, payInt){

        $("#"+type+"-month").text(Math.round(month*100)/100);

        //是否面积计算
        if(!!isArea){
        	$("#"+type+"-first").text(Math.round(first*100)/100).parents("li").show().prev().show();
        }else{
        	$("#"+type+"-first").parents("li").hide().prev().hide();
        }
        
        $("#"+type+"-loadTotal").text(Math.round(loadTotal*100)/100);
        $("#"+type+"-payTotal").text(Math.round(payTotal*100)/100);
        $("#"+type+"-int").text(Math.round(rate*10000)/100);
        $("#"+type+"-payInt").text(Math.round(payInt*100)/100);
    }

};

$.extend($.fn, {
	selected : function(){
		return $(this).find('option').not(function(){ return !this.selected; });
	},
	//计算方式:面积/贷款总额
	choiceMode : function(type, style){
        $(this).on("click", function(){
          if(style === "area"){
            $("#"+type+"-area-box").show();
            $("#"+type+"-money-box").hide();
          }else if(style === "money"){
          	$("#"+type+"-area-box").hide();
            $("#"+type+"-money-box").show();
          }
        });
	},
	//房屋性质
	houseProperty  : function(type, pay, rate){
	   $(this).on("click", function(){
	   	  $("#"+type+"-pay").find('option').not(function(){ return !this.selected; }).prop("selected", "");
          $("#"+type+"-pay option[data-pay='"+pay+"']").prop("selected", "selected");
          $("#"+type+"-rate option[data-discount='"+rate+"']").prop("selected", "selected");
          $("#"+type+"-rate-input").val(rate);
	   });
	},
    //利率
	bindRate : function(type){
		var _this = $(this), id = _this.attr("id");
        _this.on("change", function(){
		    var selected = $(this).find('option').not(function(){ return !this.selected; }),
		           rate = selected.attr("data-discount");

		    $("#"+id+"-input").val(rate+"%");
		});
	}
})

$(function(){
   //计算方式
   $("#business-mode-area").choiceMode("business", "area");
   $("#business-mode-money").choiceMode("business", "money");
   $("#fund-mode-area").choiceMode("fund", "area");
   $("#fund-mode-money").choiceMode("fund", "money");

   //利率
   $("#business-rate").bindRate();
   $("#fund-rate").bindRate();

   //房屋性质
   $("#business-first").houseProperty("business", "0.2", "4.90");
   $("#business-second").houseProperty("business", "0.25", "4.90");
   $("#fund-first").houseProperty("fund", "0.2", "3.25");
   $("#fund-second").houseProperty("fund", "0.4", "3.57");

   //计算
   $(".calBtn").on("click", function(){
      var current = $(".hf-tab-nav li.current"), type = current.attr("data-type"),
          mode = $(this).parents(".cal-tab-content").find(".formula_mode:checked").attr("data-mode");
      var style = type+"-"+mode;

      switch(style){
         case "1-3" : calculator.calArea("business");break; //
         case "1-4" : calculator.calLimit("business");break; //
         case "2-3" : calculator.calArea("fund");break;//
         case "2-4" : calculator.calLimit("fund");break;//
      }

      $("#resultBox").show();
   });


   //结果导航切换
   $(".result-nav").on("click", function(){
       var index = $(this).index();
       $(".result-nav").removeClass("on");
       $(this).addClass("on");
       $(".result-box").hide();
       $(".result-box").eq(index).show();
   });
});