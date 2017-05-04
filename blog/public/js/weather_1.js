$(function() {
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398, 39.897445);
	map.centerAndZoom(point, 12);
	var cityName = '';
	$(".location").click(function(){
		var myCity = new BMap.LocalCity();
		myCity.get(myFun);				
	});
	function myFun(result) {
		cityName = result.name;
		map.setCenter(cityName);
		//alert("当前定位城市:"+cityName);
		if(cityName=='全国'){
			cityName="兰州市";
		}
		weatherMsg(cityName);
	}
	
	var msg = null;
	msgJson = {};
	var cityName =sessionStorage.getItem('cityName');
	if(cityName=='全国'){
		cityName="兰州市";
	}
	weatherMsg(cityName);
	function weatherMsg(cityName) {
		var date=new Date();
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		var d=date.getDate();
		var dt=y+"-"+m+"-"+d
		$.ajax({
			"url": "data/cityID.json",
			"async":false,
			"success": function(result) {
				msg = result;
				
				for(var i in msg) {
					msgJson[msg[i]] = i;
				}
				var txt = cityName;
				var cityID = msgJson[txt];
				var msg = '';
				
				var cityMsg = "http://wthrcdn.etouch.cn/weather_mini?citykey=" + cityID;
				$.get(cityMsg, function(mess) {
					
					msg = strToJson(mess);
					
					var foreCast=msg.data.forecast;
					var lowTemp=[];
					var highTepm=[];
					var lowTemp2=[];
					var highTepm2=[];
					for(var i=0;i<foreCast.length;i++){
						
						lowTemp.push(foreCast[i].low.split(" ")[1]);
						highTepm.push(foreCast[i].high.split(" ")[1]);
						lowTemp2.push(foreCast[i].low.split(" ")[1].split("℃")[0]-1+1);
						highTepm2.push(foreCast[i].high.split(" ")[1].split("℃")[0]-1+1);
					
					}	
					changeData(cityName,msg,foreCast,dt,lowTemp,highTepm);
					var data2=highTepm2;
					var data3=lowTemp2;
					charts('#chart_7d', 2017, 3, 7, 86400000, [{
						name: '最高温度',
						data: data2
					}, {
						name: '最低温度',
						data: data3
					}]);
					
				});

			}
		});
	}

	function strToJson(str) {
		return JSON.parse(str);
	}
	
	function changeData(cityName,msg,foreCast,dt,lowTemp,highTepm){
		new Vue({
			el:".father",
			data:{
				address:cityName,
				msg:msg,
				fores:foreCast,
				Dt:dt,
				low:lowTemp,
				high:highTepm
			}
		});
	}
	
	var star=[3,3,4,3,4,2,5,2,1];
	for(var i = 0; i < $(".dB2_list div").length; i++) {
		var b = $(".dB2_list div").eq(i).children('span.star').children();

		for(var j = 0; j < star[i]; j++) {
			b.eq(j).css({
				'background': 'url(images/weather/full_star@1x.png) no-repeat',
				'background-size': '0.7rem'
			});
		}
	}
})