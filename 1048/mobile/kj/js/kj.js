// JavaScript Document
$(document).ready(function(){
	jQuery("#nav").slide({type:"menu", titCell:".nLi", targetCell:".sub", effect:"slideDown", delayTime:300, triggerTime:0, defaultIndex:4, returnDefault:true});
	$(".infolist").bind("mouseover", function(){
		var i = $(this), t = i.position();
		i.css({"background-color":"#ffc"});
		var pTop = t.top-(100-i.outerHeight())/2;
		var pLeft = $(".infos").offset().left;
		pLeft = pLeft>=102 ? pLeft-102 : 10;
		i.find(".dialog").css({top:pTop, left:pLeft});
		i.find(".dialog").show(0);
		i.bind("mouseleave", function(){i.css({"background-color":"#fff"});});
		i.bind("mouseleave", function(){i.find(".dialog").hide(0);});
	});
});
function showAll(s1, s2){
	$(s1).show();$(s2).show();
}
function showWithHide(s, h){
	$(s).show();$(h).hide();
}
function showHaoMaAndShengXiao(){
	checkOnlyOne(0, 'haoMaOrShengXiao');showAll('.hm', '.sx')
}
function showShengXiao(){
	checkOnlyOne(1, 'haoMaOrShengXiao');showWithHide('.sx', '.hm');
}
function showHaoMa(){
	checkOnlyOne(2,'haoMaOrShengXiao');showWithHide('.hm', '.sx');
}
function showSortDown(){
	checkOnlyOne(0, 'sortDownOrSize');showWithHide('.sortDown', '.sortSize');
}
function showSortSize(){
	checkOnlyOne(1, 'sortDownOrSize');showWithHide('.sortSize', '.sortDown');
}
function checkOnlyOne(position, checkName){
	$("input[type='checkbox'][name='" + checkName + "']").each(function(index, element){
		var checked = false;
		if(position==index)	checked = true;
       	$(element).attr("checked", checked);
    });
}
String.prototype.trim=function(){return this.replace(/(^[\s　]+)|([\s　]+$)/g,'')};
String.prototype.strLen=function(){return this.replace(/[^\x00-\xFF]/g,'**').length};
var __currentDate = new Date();
var __year = __currentDate.getFullYear();
var chkK = function(obj, value){
	if(value==='请您输入：年份、月份、期数、号码。试试输入“'+__year+'”'){
		obj.value = '';
		obj.style.fontSize = '14px';
		obj.style.color = '#000';
	}
};
var chkK2 = function(obj, value){
	if(value.trim()===''){
		obj.value = '请您输入：年份、月份、期数、号码。试试输入“'+__year+'”';
		obj.style.fontSize = '12px';
		obj.style.color = '#999';
	}
};
var chkForm = function(obj){
	var key = obj.value.trim();
	if(key==='请您输入：年份、月份、期数、号码。试试输入“'+__year+'”'){
		alert('请输入搜索关键字！');return false;
	}
	if(key.strLen()<2){
		alert('关键词不能小于2个字节！');return false;
	}
	return true;
};
var lotteryInfo = function(year){
	__year = year;
	var browser = {
		versions : function(){
			var u = navigator.userAgent, app = navigator.appVersion;  
			return{
				android: u.indexOf('Android') !== -1,
				iphone: u.indexOf('iPhone') !== -1,
				ipad: u.indexOf('iPad') !== -1,
				ipod: u.indexOf('iPod') !== -1,
				winphone: u.indexOf('Windows Phone') !== -1
			}
		}()
	};
	if(browser.versions.android || browser.versions.iphone || browser.versions.ipad || browser.versions.ipod || browser.versions.winphone){
		return true;
	}
	var areaH = $(window).outerHeight() - 36;
	var html =
	"<div id=\"search\" class=\"search\">" +
	"    <div class=\"inner main\">" +
	"    <form id=\"historySearchForm\" name=\"form1\" action=\""+_contextPath+"/history.html\" method=\"post\" onSubmit=\"javascript:return chkForm(this.keyword);\" target=\"_blank\">" +
	"        <ul>" +
	"            <li class=\"searchin\">" +
	"                <input type=\"text\" id=\"keyword\" name=\"keyword\" class=\"txt\" maxlength=\"60\" value=\"请您输入：年份、月份、期数、号码。试试输入“"+__year+"”\" onfocus=\"javascript:chkK(this, this.value);\" onblur=\"javascript:chkK2(this, this.value);\" />" +
	"                <input type=\"submit\" class=\"btn1\" value=\"快速查找\" />" +
	"            </li>" +
	"            <li class=\"term\">" +
	"                <label>搜索类型</label>" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"0\" checked /> 全部&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"7\" /> 特码&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"1\" /> 平一&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"2\" /> 平二&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"3\" /> 平三&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"4\" /> 平四&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"5\" /> 平五&nbsp;" +
	"                <input name=\"numIndex\" type=\"radio\" value=\"6\" /> 平六" +
	"                <span><a href='"+_contextPath+"/history.html' target='_blank'>每年必开5期的《一码公式》你找到了吗？</a></span>" +
	"            </li>" +
	"        </ul>" +
	"    </form>" +
	"    </div>" +
	"</div>" +
	"<iframe src=\""+_contextPath+"/"+__htmlBaseDir+"/kj/"+ year +"default.htm\" width=\"1020\" height=\""+ (areaH-86) +"\" frameborder=\"0\" scrolling=\"yes\"></iframe>";
	$.layer({
		type: 1,shade: [0.8, '#000', true],shadeClose: true,offset: ['10px','50%'],area: ['1020px', areaH],border: [8, 0.3, '#fff', true],closeBtn: [0, true],title: false,page: {html: html}
	});
	return false;
};

function sidebar(o1, o2, x, y){
	var l = $(o2).offset().left;
	var w = $(o2).width();
	var t = $(o2).offset().top;
	$(o1).css('left', (l+w+x)+'px');
	$(o1).css('top', (t+y)+'px');
}
function sidebar2(o1, o2, y1, y2){
	var t = $(o2).offset().top;
	var st = $(document).scrollTop();
	if(st>t) $(o1).css('top', (y1+y2)+'px');
	else $(o1).css('top', (t-st+y1)+'px');
}
var ie6 = !-[1,] && !window.XMLHttpRequest;
//if(!ie6) sidebar('.sidenav', '.content .main', 20, 5);
if(!ie6){
	//$(window).resize(function(){sidebar('.sidenav', '.content .main', 20, 5);});
	//$(window).scroll(function(){sidebar2('.sidenav', '.content .main', 5, 10);});
}