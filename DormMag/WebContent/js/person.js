$(function(){
	var uid = tools.GetUrl("uid");
	console
	$.ajax({
		url:"person",
		type:"GET",
		data:{
			"uid": uid
		},
		success: function(response){
			var data = tools.StrToJson(response);
			var time = data[0].brithday.replace(".","/");
			if(time.indexOf(".")){
				time = time.replace(".","/");
			}
			console.log(time);
			var brithday = new Date(time+" 0:0:0").getTime();
			var now  = new Date().getTime();
			var timeLong = now - brithday;
			var long = new Date(timeLong);
			var str= JSON.stringify(data[0].dormNum);
			if( str== "null"){
				roomNum = ["ªπŒ¥∑÷≈‰Àﬁ…·≈∂£¨«Î◊¢“‚º∞ ±∑÷≈‰Àﬁ…·",'<a href="#" >øÏÀŸ∑÷≈‰</a>'];
			}else{
				roomNum = data[0].dormNum.split("#");
			}
			var y = long.getFullYear() - 1970;
			var floor = roomNum[0].length < 5 ?roomNum[0]+"∫≈Àﬁ…·":roomNum[0];
			var room = roomNum[1].length < 5 ?roomNum[1]+"∫≈Àﬁ…·":roomNum[1];
			$(".t1").html(data[0].stuNum);
			$(".t2").text(data[0].name);
			$(".t3").text(data[0].collage);
			$(".t4").text(data[0].major);
			$(".txt1").text(data[0].name);
			$(".txt2").text(data[0].brithday);
			$(".txt3").text(y);
			$(".txt4").text(data[0].IDCard);
			$(".txt5").text(data[0].class);
			$(".txt6").text(data[0].phone);
			$(".txt7").text(data[0].QQNum);
			$(".txt8").text(data[0].address);
			$(".txt9").text(floor);
			$(".txt10").html(room);
			$(".txt11").text(data[0].magor);
			
		}
	});
});