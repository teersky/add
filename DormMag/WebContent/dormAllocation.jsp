<%@ page language="java" contentType="text/html; charset=GBK"
    pageEncoding="GBK"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>Insert title here</title>
<link type="text/css" rel="stylesheet" href="css/dormAllocation.css" />
</head>
<body>
	<table id="table">
		<thead>
			<tr>
				<td>宿舍号</td>
				<td>男/女</td>
				<td>年级</td>
				<td>成员</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr v-for = "m in msg">
				<td>{{ m[0].split("#")[0]+'楼'+m[0].split("#")[1]+'室' }}</td>
				<td>{{ m[1]==0? "女":"男" }}生宿舍</td>
				<td>{{ m[2]==null? '':m[2]+"级" }}</td>
				<td>
					 <a  v-for="i in m[4].slice(0,m[4].length-1).split('&')" v-bind:index="m[3]==null?'':m[3].split('&')[$index]" href="javascript:;" >{{ i }}</a>
				</td>
				<td>
					<a v-bind:href="'?'+m[0]" v-if="m[4].slice(0,m[4].length-1).split('&').length <5">添加</a>
					<span v-if="m[4].slice(0,m[4].length-1).split('&').length >=5">添加</span>
				</td> 
			</tr>
		</tbody>	
	</table>	
</body>
<script type="text/javascript" src="js/jquery.js"></script>	
<script type="text/javascript" src="js/vue.js"></script>
<script type="text/javascript" src="js/tools.js"></script>
<script type="text/javascript" src="js/dormAllocation.js"></script>
</html>