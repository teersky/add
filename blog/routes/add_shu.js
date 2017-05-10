var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
router.get('', function(req, res, next) {
	 res.render('add_shu', { });
	// 从连接池获取连接 
	
});

module.exports = router;
