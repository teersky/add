var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
router.get('', function(req, res) {
	
	//var sql='SELECT * FROM '+param.type+"where username = "+param.username+""
	var sql='SELECT istitute,sex FROM '+param.type+' WHERE username = ? ';
	var sql2="SELECT acc from info where name = ?";
	pool.getConnection(function(err, connection){
		var sum=0;
		connection.query(sql, param.username, function(err, result){
			//res.send(result);
		  	connection.query(sql2,  param.username, function(err, results){
				for(var i=0;i<results.length;i++){
					sum += results[i].acc-1+1;
					console.log(results[i].acc);
				}

				result[0].num=sum;
				console.log(result);
				res.send(result[0]);
				connection.release();
			});
		  	
			
		});
		
	});
	
});

module.exports = router;