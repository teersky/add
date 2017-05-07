var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
router.get('', function(req, res) {
	var param = req.query || req.params;
	console.log(param)
	//var sql='SELECT * FROM '+param.type+"where username = "+param.username+""
	var sql='SELECT istitute,sex FROM '+param.type+' WHERE username = ? ';
	var sql2='SELECT acc info WHERE username = ? ';
	pool.getConnection(function(err, connection){
		connection.query(sql, param.username, function(err, result){
			res.send(result);
		  console.log(result)
			connection.release()
		});
	});
	
});

module.exports = router;