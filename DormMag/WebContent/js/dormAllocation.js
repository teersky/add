$(function(){
	$.ajax({
		url:"dormAllocation",
		type:"Get",
		data:{
			dormType:"getAllDorm"
		},
		success: function(response){
			var data = tools.StrToJson(response);
			console.log(data);
			var vm = new Vue({
				el:"table",
				data:{
					msg: data
				}
			});
		}
	});
});