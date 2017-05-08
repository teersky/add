var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
router.get('', function(req, res) {
	var param = req.query || req.params;
	var sql="SELECT * FROM vegetable where name=?"
	pool.getConnection(function(err, connection){
		connection.query(sql,param.name,function(err, result){
			res.send(result[0]);
			connection.release();
		});
	});
});


module.exports=router;