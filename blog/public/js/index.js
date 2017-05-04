$(function(){
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);
	var cityName = '';

	var myCity = new BMap.LocalCity();
	myCity.get(myFun);				

	function myFun(result) {
		cityName = result.name;
		map.setCenter(cityName);
		//alert("当前定位城市:"+cityName);
		if(cityName=='全国'){
			cityName="兰州市";
		}
		sessionStorage.setItem("cityName", cityName);
	}
});