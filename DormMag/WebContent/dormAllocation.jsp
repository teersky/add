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
				<td>�����</td>
				<td>��/Ů</td>
				<td>�꼶</td>
				<td>��Ա</td>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr v-for = "m in msg">
				<td>{{ m[0].split("#")[0]+'¥'+m[0].split("#")[1]+'��' }}</td>
				<td>{{ m[1]==0? "Ů":"��" }}������</td>
				<td>{{ m[2]==null? '':m[2]+"��" }}</td>
				<td>
					 <a  v-for="i in m[4].slice(0,m[4].length-1).split('&')" v-bind:index="m[3]==null?'':m[3].split('&')[$index]" href="javascript:;" >{{ i }}</a>
				</td>
				<td>
					<a v-bind:href="'?'+m[0]" v-if="m[4].slice(0,m[4].length-1).split('&').length <5">���</a>
					<span v-if="m[4].slice(0,m[4].length-1).split('&').length >=5">���</span>
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