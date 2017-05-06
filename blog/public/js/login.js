$(function(){
	$(".submit").click(function(){
		var username =$(".user").val();
		var type =$(".type").val();
		console.log(username)
		sessionStorage.setItem("username", username);
		sessionStorage.setItem("type", type);
	});
})