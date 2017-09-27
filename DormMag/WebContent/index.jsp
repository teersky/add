<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Insert title here</title>
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/reset.css" rel="stylesheet" type="text/css" />	
		<link href="css/index.css" rel="stylesheet" type="text/css" />
		<script language="JavaScript" src="js/jquery.js"></script>
		<script type="text/javascript">
			$(function(){	
				//导航切换
				$(".menuson li").click(function(){
					$(".menuson li.active").removeClass("active")
					$(this).addClass("active");
				});
				
				$('.title').click(function(){
					var $ul = $(this).next('ul');
					$('dd').find('ul').slideUp();
					if($ul.is(':visible')){
						$(this).next('ul').slideUp();
					}else{
						$(this).next('ul').slideDown();
					}
				});
				windowLen();
				$(window).resize(function(){
					windowLen();
				});
				
				function windowLen(){
					var len = $(window).height()-$("#header").height();
					if(len <= $("#left").height()){
						$("#right").css({height: $("#left").height()});
					}else{
						$("#right").css({height: $(window).height()-$("#header").height()+"px"});
					}
				}
			})	
		</script>	
	</head>
	<body>
		<div id="header" style="background:url(images/topbg.gif) repeat-x;">
			<div class="topleft">
		    	<a href="main.html" target="_parent"><img src="images/logo.png" title="系统首页" /></a>
		    </div>   
		            
		    <div class="topright">    
			    <ul>
			    	<li><span><img src="images/help.png" title="帮助"  class="helpimg"/></span><a href="#">帮助</a></li>
			    	<li><a href="#">关于</a></li>
			    	<li><a href="login.html" target="_parent">退出</a></li>
			    </ul>
		     
		    	<div class="user">
		    		<span>admin</span>
		    		<i>消息</i>
		    		<b>5</b>
		    	</div>    
			</div>
			<div class="clear"></div>
		</div>
		<div id="box">
			<div id="left">
				<div class="lefttop"><span></span>通讯录</div>
	    
			    <dl class="leftmenu">
			        
			    <dd>
				    <div class="title">
				    <span><img src="images/leftico01.png" /></span>管理信息
				    </div>
			    	<ul class="menuson">
				        <li><cite></cite><a href="?uid=000" >首页模版</a><i></i></li>
				        <li><cite></cite><a href="?uid=010" >数据列表</a><i></i></li>
				        <li><cite></cite><a href="?uid=020" >图片数据表</a><i></i></li>
				        <li><cite></cite><a href="?uid=030" >添加编辑</a><i></i></li>
				        <li><cite></cite><a href="?uid=040" >图片列表</a><i></i></li>
				        <li><cite></cite><a href="?uid=050" >自定义</a><i></i></li>
				        <li><cite></cite><a href="?uid=060" >常用工具</a><i></i></li>
				        <li><cite></cite><a href="?uid=070" >信息管理</a><i></i></li>
				        <li><cite></cite><a href="?uid=080" >Tab页</a><i></i></li>
				        <li><cite></cite><a href="?uid=090" >404页面</a><i></i></li>
			        </ul>    
			    </dd>
			        
			    
			    <dd>
				    <div class="title">
				    <span><img src="images/leftico02.png" /></span>其他设置
				    </div>
				    <ul class="menuson">
				        <li><cite></cite><a href="#">编辑内容</a><i></i></li>
				        <li><cite></cite><a href="#">发布信息</a><i></i></li>
				        <li><cite></cite><a href="#">档案列表显示</a><i></i></li>
				    </ul>     
			    </dd> 
			    
			    
			    <dd>
				    <div class="title"><span><img src="images/leftico03.png" /></span>编辑器</div>
				    <ul class="menuson">
				        <li><cite></cite><a href="#">自定义</a><i></i></li>
				        <li><cite></cite><a href="#">常用资料</a><i></i></li>
				        <li><cite></cite><a href="#">信息列表</a><i></i></li>
				        <li><cite></cite><a href="#">其他</a><i></i></li>
				    </ul>    
			    </dd>  
			    
			    
			    <dd>
				    <div class="title"><span><img src="images/leftico04.png" /></span>日期管理</div>
				    <ul class="menuson">
				        <li><cite></cite><a href="#">自定义</a><i></i></li>
				        <li><cite></cite><a href="#">常用资料</a><i></i></li>
				        <li><cite></cite><a href="#">信息列表</a><i></i></li>
				        <li><cite></cite><a href="#">其他</a><i></i></li>
				    </ul>
			    
			    </dd>   
			    
			    </dl>
			</div>
			<div id="right">
				<iframe src=http://www.163.com></iframe>
			</div>
			<div class="clear"></div>
		</div>
	</body>
</html>