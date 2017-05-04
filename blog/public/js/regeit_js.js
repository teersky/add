$(function(){
	
	$(".text1").focus(function(){
		if($(".text2").val() !='' || $(".text2").val() !='请输入用户名'){
			$(".text1").val("");
		}
	});
	$(".text1").blur(function(){
		if($(".text2").val() !='' || $(".text2").val() !='请输入用户名'){
			$(".text1").val("请输入用户名");
		}
	});
	$(".text2").focus(function(){
		if($(".text2").val() !='' || $(".text2").val() !='请输入密码'){
			$(".text2").val("");
			$(".text2").attr('type','password');
		}
	});
	$(".text2").blur(function(){
		if($(".text2").val()==''){
			$(".text2").attr('type','text');
			$(".text2").val("请输入密码");
		}else{
			$(".warn").html("密码格式不正确");
			return false;
		}
	});
	$(".text3").focus(function(){
		if($(".text3").val() !='' || $(".text3").val() !='请输入密码'){
			$(".text3").val("");
			$(".text3").attr('type','password');
		}
	});
	$(".text3").blur(function(){
		if($(".text3").val()==''){
			$(".text3").attr('type','text');
			$(".text3").val("请输入密码");
		}else{
			$(".warn").html("密码格式不正确");
			return false;
		}
	});

})
