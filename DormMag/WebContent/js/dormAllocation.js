$(function(){
	$.ajax({
		url:"dormAllocation",
		type:"Get",
		data:{
			dormType:"getAllDorm"
		},
		success: function(response){
			var data = tools.StrToJson(response);
			var vm = new Vue({
				el:"table",
				data:{
					msg: data
				},
				methods:{
					"lengthTest":function(index){
						console.log(index);
					}
				}
			});
			
			
		}
	});
});