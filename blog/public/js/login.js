$(function(){
	$(".submit").click(function(){
		var username =$(".username").val();
		sessionStorage.setItem("username", username);
	});
})