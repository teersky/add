$(function(){
	$(".submit").click(function(){
		var username =$(".user").val();
		var type =$(".type").val();
		var psd=$(".password").val();
		console.log(username)
		sessionStorage.setItem("username", username);
		sessionStorage.setItem("type", type);
		var arr=[psd,type,username];
		$.ajax({
			url:"myMsg2/login",
			type: 'POST',
			data:{
				act:"login",
				user:username,
				type:type,
				psd:psd
				
			},
			success:function(data){
				if(data.err==0){
					location.href=sessionStorage.getItem('url');
					sessionStorage.removeItem('key');
				}
				if(data.err==1){
					alert("密码错误");
				}
			},
			err:function(e){
				console.log(e);
				throw e;
			}
		})
	});
})