$(function(){
	$.ajax({
		url:"studentFile",
		type:"GET",
		data:{
			/*"MethodName":"getStudent"*/
		},
		success:function(response){
			
			var data = tools.StrToJson(response);
			var strArr = [];
			for(var i in data){
				var str= JSON.stringify(data[i][0].dormNum);
				if( str== "null"){
					roomNum = "Œ¥∑÷≈‰";
				}else{
					roomNum = data[i][0].dormNum;
				}
				var str='<tr class="gradeX">'+
					  	'<td>'+i+'</td>'+
					  	'<td>'+data[i][0].name+'</td>'+
					 	'<td>'+data[i][0].brithday+'</td>'+
					  	'<td>'+data[i][0].sex+'</td>'+
					  	'<td>'+data[i][0].nation+'</td>'+
					 	'<td>'+data[i][0].IDCard+'</td>'+
					 	'<td>'+data[i][0].collage+'</td>'+
					  	'<td>'+data[i][0].major+'</td>'+
					  	'<td>'+data[i][0].class+'</td>'+
					  	'<td>'+data[i][0].address+'</td>'+
					  	'<td>'+roomNum+'</td>'+
					  	'<td><a href="personMsg.jsp?uid='+i+'">œÍ«È</a></td>'+
					  	'</tr>'
				strArr.push(str);
			}
			$("#dyntable tbody").html(strArr.toString());
			$('#dyntable').dataTable({
				"sPaginationType": "full_numbers"
			});
		},
		erroe: function(e){
			console.log(e);
		}
	});
});
