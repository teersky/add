var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
var page_Size=6;
var json={};
var rr=[];

router.get('', function(req, res) {
	var body = ''; 
	var param = req.query || req.params;
	var msg=(param.act);
	var json={};
	if(msg=='add'){
		console.log("添加");
		var date=new Date().getTime();
		
		pool.getConnection(function(err, connection){
			var sql= "INSERT INTO info(ID,content,time,name,acc,ref) VALUES(0,?,?,?,?,?)"
			var arr=[param.content,date,param.username,0 ,0]; 
			console.log(arr);	
			connection.query(sql, arr,function(err, result){
				json= result;
				res.send(result);
			});
		});
	}
	if(msg=="get"){
		console.log("获取数据");
		pool.getConnection(function(err, connection){
			var sql= "SELECT *from info ORDER BY time desc"
			connection.query(sql, function(err, result){
				if(err){
					console.log(err)
					throw err;
				}
				 for(var i = 0;i < result.length;i++){
	            	rr[i] = result[i];
	       		 }
				json=result;
				console.log(json);
				res.send(result);	
			});
		});
	}
	if(msg=="del"){
		var id= param.id;
		console.log(id);
		pool.getConnection(function(err, connection){
			var sql= "delete from  info where ID="+id+"";
			connection.query(sql,function(err, result){
				res.send(result);
			});
		});
		res.send();
	}
});
module.exports = router;