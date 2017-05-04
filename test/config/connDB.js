var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

//按照id查询
//http://localhost:3000/users/getUserById?id=5
router.get('/', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		// 建立连接 增加一个用户信息 
		connection.query(userSQL.getUserById, [param.id],function selectCb(err, results, fields) {
			if(err) {
				throw err;
			}

			/*if(results) {
				for(var i = 0; i < results.length; i++) {
					console.log("%d\t%s\t%s", results[i].id, results[i].username, results[i].password);
				}
			}*/
			res.json(results);
			connection.end();
		});
	});
});

module.exports = router;