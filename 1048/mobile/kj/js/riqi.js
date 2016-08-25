function getDays(Y,M){
	//定义年月
	var YY = '';
	var MM = '';
	//初始化返回值json
	var riqi = '';
	var nowDate = new Date();
	if (Y == '0'){
		YY = nowDate.getFullYear();
	}else{
		YY = Y;
	}
	if(M == '0'){
		MM = nowDate.getMonth();
	}else{
		MM = M;
	}
	if (YY == 2014){
		if(MM == 1){
			riqi = '30,28,25,23,21,18,16,14,12,9,7,,4,2';
		}else if(MM == 2) {
			riqi = "27,25,22,20,18,15,13,11,9,6,4";
		}else if(MM == 3) {
			riqi = "29,27,25,22,20,18,15,13,11,8,6,4,2";
		}else if(MM == 4) {
			riqi = "29,26,24,22,19,17,15,12,10,8,5,3,1";
		}else if(MM == 5) {
			riqi = "31,29,27,24,22,20,18,15,13,11,8,6,3,1";
		}else if(MM == 6) {
			riqi = "29,26,24,21,19,17,12,10,7,4,2";
		}else if(MM == 7) {
			riqi = "31,29,26,24,22,19,17,15,12,10,8,5,3";
		}else if(MM == 8) {
			riqi = "30,28,26,23,21,19,16,14,12,9,7,5,2";
		}else if(MM == 9) {
			riqi = "30,28,25,23,20,18,16,13,9,4,2";
		}else if(MM == 10) {
			riqi = "30,28,25,23,21,18,16,14,11,9,7,4,2";
		}else if(MM == 11) {
			riqi = "29,27,25,22,20,18,16,13,11,8,6,4,1";
		}else if(MM == 12) {
			riqi = "31,29,27,25,23,21,18,16,13,11,9,6,4,2";
		}else{
			
		}
	}else if (YY == 2015){
		if(MM == 1){
			riqi = '31,29,27,24,22,20,17,15,13,11,8,6,3';
		}else if(MM == 2){
			riqi = "28,26,24,22,17,14,12,10,8,5,3";
		}else if(MM == 3){
			riqi = "31,28,26,24,22,19,17,14,12,10,7,5,3";
		}else if(MM == 4){
			riqi = "30,28,25,23,21,18,16,14,11,9,6,4,2";
		}else if(MM == 5){
			riqi = "30,28,26,23,21,19,17,14,12,10,7,5,2";
		}else if(MM == 6){
			riqi = "30,28,25,23,20,18,16,13,11,9,6,4,2";
		}else if(MM == 7){
			riqi = "30,28,26,23,21,18,16,14,11,9,7,4,2";
		}else if(MM == 8){
			riqi = "29,27,25,22,20,18,15,13,11,8,6,4,1";
		}else if(MM == 9){
			riqi = "30,26,24,22,20,17,15,12,10,8,5,3,1";
		}else if(MM == 10){
			riqi = "31,29,27,24,21,19,17,15,13,11,8,6,3";
		}else if(MM == 11){
			riqi = "28,26,24,22,19,17,15,12,10,7,5,3";
		}else if(MM == 12){
			riqi = "31,29,26,24,22,20,17,15,12,10,8,5,3,1";
		}else{
			
		}

	}else if (YY == 2016){
		if(MM == 1){
			riqi = '30,28,26,23,21,19,16,14,12,10,7,5,2';
		}else if(MM == 2){
			riqi = "27,25,23,20,18,16,13,11,9,7,4,2";
		}else if(MM == 3){
			riqi = "29,26,24,22,19,17,15,12,10,8,5,3,1";
		}else if(MM == 4){
			riqi = "30,28,26,23,21,19,17,14,12,9,7,5,2";
		}else if(MM == 5){
			riqi = "31,28,26,24,21,19,17,15,12,10,8,5,3";
		}
else if(MM == 6){ riqi = "30,28,25,23,21,18,16,14,11,8,6,4,2";}
else{
			
		}


	}else{
		
	}

	riqi = riqi.split(","); //字符分割

	var OId = riqi.length;

//	if(OId > 1){
//		var Kaijiangriqi='{"array" : "[';
//		for(var SID = 0; SID < OId ; SID++){
//				if(SID != OId - 1){
//					Kaijiangriqi = Kaijiangriqi + '{"day":"' + riqi[SID] + '"},';
//				}else{
//					Kaijiangriqi = Kaijiangriqi + '{"day":"' + riqi[SID] + '"}';
//				}
//			}
//		Kaijiangriqi = Kaijiangriqi + ']"}';
//	}else{
//		Kaijiangriqi = '{"array":"[]"}';
//	}
	if(OId > 1){
		return riqi;
	}else{
		return false;
	}

//输出返回值json
//document.write(Kaijiangriqi);
}