<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
<script src="js/ajaxfileupload.js"></script>
<script>
	function ajaxFileUpload() {
	    $.ajaxFileUpload
	    (
	        {
	            url: 'upload', //用于文件上传的服务器端请求地址
	            secureuri: false, //一般设置为false
	            //文件上传空间的id属性  <input type="file" id="file" name="file" />
	            fileElementId: 'file1', 
	            //返回值类型 一般设置为json
	        	dataType: 'json',
	             //服务器成功响应处理函数
	            success: function (data, status)  
	            {
	               
	            },
	            error: function (data, status, e)//服务器响应失败处理函数
	            {
	                alert(e);
	            }
	        }
	    )
	    return false;
	}
</script>	
</head>
<body>
	 <!-- <form action="upload" enctype="multipart/form-data" method="post">
   
    	请选择文件：<input type="file" name="file1"><br/>
    	
    	<input type="submit" value="提交" onclick="ajaxLoad()">
    	
    </form> -->

   
    	请选择文件：<input type="file" id="file1" name="file""><br/>
    	
    	<input type="button" value="提交" onclick="ajaxFileUpload()">
    	
  
</body>
</html>