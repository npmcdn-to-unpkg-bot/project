//根据ip定位
var ipLocation = function(){
     AMap.service(["AMap.CitySearch"], function() {
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        var cityInfo = result.city;
                        $("#ipLocation").text(cityInfo);
                    }
                } else {
                    //$("#ipLocation").text(cityInfo);
                }
            });
        });
}

var geo_success = function(position){
      var latlng = [position.coords.longitude-0.0065, position.coords.latitude-0.0060];
      //var TO_GLNG = function(lng){return position.coords.longitude-0.0065;};
      //var TO_GLAT = function(lat){return position.coords.latitude-0.0060;};
      //var latlng = [TO_GLNG, TO_GLAT];
      AMap.service(["AMap.Geocoder"], function() {
        var MGeocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        //逆地理编码
        MGeocoder.getAddress(latlng, function(status, result) {
            alert("ff");
            if (status === 'complete' && result.info === 'OK') {
                var address = result.regeocode.formattedAddress;
                alert(address);
            }
        });
    });
}

var geo_error = function(error){
     switch(error.code){
             case 1 : alert("您拒绝了共享位置,可手动选择城市!");break;
             case 3 : alert("位置采集超时失败");break;
     }
}
//根据GPS定位
var geoLocation = function(){
   
      navigator.geolocation.getCurrentPosition(geo_success, geo_error,{
            timeout: 10000,
            maximumAge: 60000,
            enableHighAccuracy: false
        });
         
};

var throttle = function(fn, delay){
  var timer = null;
  return function(){
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function(){
      fn.apply(context, args);
    }, delay);
  };
 };


var backToTopFun = function() {
      var st = $(document).scrollTop(), winh = $(window).height();
      (st > 200)? $backToTopEle.show(): $backToTopEle.hide();     
};

$(function(){
    //console.log(navigator.geolocation);
    ipLocation();
    //GPS定位
    /*if(navigator.geolocation) {
        geoLocation();
    }else{
        ipLocation();
    }**/
    $("#refresh").on("click", function(){
        ipLocation();
    });

    //字母定位
    $(".letter").on("click", function(){
        var letter = $(this).text(), obj = $("#letter_"+letter);
        var top = obj.position().top;
        $("body").scrollTop(top-44);
    });
});