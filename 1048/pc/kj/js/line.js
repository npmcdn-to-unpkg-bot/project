
/*
* 描述：遗漏分层  zhouec 2010/06/10
* 给当前页面的遗漏分层
* 参数：
*   tbodyId: 当前数据TBody的ID
*   startIndex: 分层区域的开始位置  
*               如果分层为一个区域（5,20）,startIndex:'5', 如果分层为多个区域（5,20）,（25,45）,（60,75）,startIndex:'5,25,60'
*   endIndex:   分层区域的结束位置
*               如果分层为一个区域（5,20）,startIndex:'20', 如果分层为多个区域（5,20）,（25,45）,（60,75）,startIndex:'20,45,75'
*   cssStyle: 特殊处理的单元格的样式的字符串 如："backChange z_bg_06, backChange z_bg_17, backChange z_bg_18"
*/ 
function showdata(tbodyId, startIndex, endIndex, cssStyle){
    
    var tbody = document.getElementById(tbodyId);
    var trs = tbody.rows;
    
    //分析参数
    var startParam = new Array(); 
    var endParam = new Array();     
    if (startIndex != "" && startIndex != undefined) {
        //遗漏分层的情况
        if (startIndex.indexOf(",") > 0) {
            //遗漏分层不连续的情况
            startParam = startIndex.split(","); 
            endParam = endIndex.split(","); 
        } else {
            //遗漏分层连续的情况
            startParam[0] = startIndex;
            endParam[0] = endIndex;  
        }
    }
    
    //取得当前的排序
    var isSort = isSortOrNot(tbodyId);
    
    if (!isSort) {
        if(document.getElementById("bdylsj").checked == true){
            //不带遗漏数据
            var k = 0;
            my_array=new Array();
            for(var i = 0; i < trs.length; i++){
                for (var n = 0; n < startParam.length; n++) {   
                    for (var j = parseInt(startParam[n]); j < parseInt(endParam[n]); j++) {
                        var tmp = trs[i].cells[j];
                        //判断是否是一个球
                        if(cssStyle.indexOf(tmp.className) < 0){
                            continue;
                        }else{
                            k++;
                            tdAreaDisplayOrnot(tbodyId, i, j, 1, k);
                        }
                    }
                }
            }
        }else{
            var k=0;
            for(var i = 0; i < trs.length; i++){
                for (var n = 0; n < startParam.length; n++) {   
                    for (var j = parseInt(startParam[n]); j < parseInt(endParam[n]); j++) {
                        var tmp = trs[i].cells[j];
                        if(cssStyle.indexOf(tmp.className) < 0){
                            continue;
                        }else{
                            k++;
                            tdAreaDisplayOrnot(tbodyId, i, j, 2, k);
                        }
                    }
                }
            } 
        } 
    } else { 
        if(document.getElementById("bdylsj").checked == true){
            //不带遗漏数据
            var k = 0;
            my_array=new Array();
            for(var i = trs.length - 1; i >= 0; i--){
                for (var n = 0; n < startParam.length; n++) {   
                    for (var j = parseInt(startParam[n]); j < parseInt(endParam[n]); j++) {
                        var tmp = trs[i].cells[j];
                        //判断是否是一个球
                        if(cssStyle.indexOf(tmp.className) < 0){
                            continue;
                        }else{
                            k++;
                            tdAreaDisplayOrnot(tbodyId, i, j, 1, k);
                        }
                    }
                }
            }
        }else{
            var k=0;
            for(var i = trs.length - 1; i >= 0; i--){ 
                for (var n = 0; n < startParam.length; n++) {   
                    for (var j = parseInt(startParam[n]); j < parseInt(endParam[n]); j++) {
                        var tmp = trs[i].cells[j];
                        if(cssStyle.indexOf(tmp.className) < 0){
                            continue;
                        }else{
                            k++;
                            tdAreaDisplayOrnot(tbodyId, i, j, 2, k);
                        }
                    }
                }
            } 
        }
    }
}


/*
* 描述：遗漏分层
* 给当前页面的遗漏分层
* 参数：
*   tbodyId: 当前数据TBody的ID
*   startIndex: 分层区域的开始位置  
*               如果分层为一个区域（5,20）,startIndex:'5', 如果分层为多个区域（5,20）,（25,45）,（60,75）,startIndex:'5,25,60'
*   endIndex:   分层区域的结束位置
*               如果分层为一个区域（5,20）,startIndex:'20', 如果分层为多个区域（5,20）,（25,45）,（60,75）,startIndex:'20,45,75'
*   cssStyle: 特殊处理的单元格的样式的字符串 如："backChange z_bg_06, backChange z_bg_17, backChange z_bg_18"
*   isZuxuan: 用来处理组选页面上的遗漏分层，组选页面传1，其它页面上没有这个参数 
*             (组选号码走势图中，在开机号开出来之后，该页面多一行，其它页面没有，所以这个要做特殊处理)
*/ 
function yiloufenceng(tbodyId, startIndex, endIndex, cssStyle, isZuxuan){
    //取当前的TBody
    var  vtablebb =document.getElementById(tbodyId);
    //取得当前的排序
    var isSort = isSortOrNot(tbodyId);    
    //分析参数
    var startParam = new Array(); 
    var endParam = new Array();     
    if (startIndex != "" && startIndex != undefined) {
        //遗漏分层的情况
        if (startIndex.indexOf(",") > 0) {
            //遗漏分层不连续的情况
            startParam = startIndex.split(","); 
            endParam = endIndex.split(","); 
        } else {
            //遗漏分层连续的情况
            startParam[0] = startIndex;
            endParam[0] = endIndex;  
        }
    }
    
    var isZuxuanTemp = false;
    if (isZuxuan != undefined && isZuxuan == 1) {
        isZuxuanTemp = true;
    }
    if(document.getElementById("ylfc").checked == true){
        //开始列,结束列,是否Check,是否排序 
        ylfcDisplayOrnot(tbodyId, startParam, endParam, 1, isSort, cssStyle, isZuxuanTemp);    
    }else{
        ylfcDisplayOrnot(tbodyId, startParam, endParam, 2, isSort, cssStyle, isZuxuanTemp);
    } 
}


//判断是否是升序还是降序 
//返回值： true:降序，false:升序
function isSortOrNot(tbodyId) {
    var tbody =document.getElementById(tbodyId);
    var isSort = false;
    if (tbody.rows.length > 0) {
        var value = tbody.rows[0].cells[0].innerText;
        if (value == "1") {
            //值为1时，是降序
            isSort = true;
        } else {
            //值不为1时，是升序
            isSort = false;
        }
    }
    return isSort;
}

/*
在table的指定范围内 做显示或隐藏操作
tableid:表的id
col:列

clum:行

showflag: 1显示 2隐藏
*/
function tdAreaDisplayOrnot(tbodyId, row, col, showflag, k){
	
    var vtablebb = document.getElementById(tbodyId);
     if (showflag == 1) {
		//隐藏
		var tmp = vtablebb.rows[row].cells[col];
		my_array[k] = tmp.innerHTML;
		tmp.innerHTML = "&nbsp;";
	 } else {
		var tmp = vtablebb.rows[row].cells[col];
		tmp.innerHTML = my_array[k];
	 }
}


/*
在table的指定范围内  zhouec 2010/06/10
tableid:表Body的id
begincol:开始列数组
endcol:结束列数组

showflag: 1显示 2隐藏
cssStyle: 特殊处理的单元格的样式的字符串
isZuxuan: 组选页面为true,其它页面为false
*/
function ylfcDisplayOrnot(tableId, begincol, endcol, showflag, isSort, cssStyle, isZuxuan){
    
    //取得当前TBody控件
    var vtablebb = document.getElementById(tableId);
    var beginrow = vtablebb.rows.length - 1;
    var endrow = -1; 
    
    if (isZuxuan) {
        if (!isSort) {
            beginrow = beginrow - 1;
        } else {
            endrow = endrow + 1;
        }
    }
       
    if (!isSort) { 
        //降序时

        if (showflag == 1) {   
            //显示   
            for (var k = 0; k < begincol.length; k++) {
                for (var j = parseInt(begincol[k]); j < parseInt(endcol[k]); j++) {
                    for (var i = beginrow; i > endrow; i--) {
                         
                        var tmp = vtablebb.rows[i].cells[j];
                        if (cssStyle.indexOf(tmp.className) < 0) {
                            if (tmp.innerHTML != "")
                                break;
                        } else {
                            tmp.style.backgroundColor = '#9999CC';
                        }
                    }
                } 
            }
            
        }else{   
            //隐藏
            for (var i = beginrow; i > endrow; i--) {
                for (var k = 0; k < begincol.length; k++) {
                    for (var j = parseInt(begincol[k]); j < parseInt(endcol[k]); j++) {
                        var tmp = vtablebb.rows[i].cells[j];
                        tmp.style.backgroundColor="";
                    }
                }
            }
        }
    } else {
        //升序时

        if (showflag == 1) {  
            //显示
            for (var k = 0; k < begincol.length; k++) {
                for (var j = parseInt(begincol[k]); j < parseInt(endcol[k]); j++) {
                    for (var i = endrow + 1; i <= beginrow; i++) {
                        var tmp = vtablebb.rows[i].cells[j];
                        if (cssStyle.indexOf(tmp.className) < 0) {
                            if (tmp.innerHTML != "")
                                break;
                        } else {
                            tmp.style.backgroundColor = '#9999CC';
                        }
                    }
                }
            }
        }else{   
            //隐藏
            for (var i = endrow + 1; i <= beginrow; i++) {
                for (var k = 0; k < begincol.length; k++) {
                    for (var j = parseInt(begincol[k]); j < parseInt(endcol[k]); j++) {
                        var tmp = vtablebb.rows[i].cells[j];
                        tmp.style.backgroundColor = "";
                    }
                }
            }
        }
    }
}

