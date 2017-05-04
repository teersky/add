var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
router.get('', function(req, res, next) {
	res.render('regeit', {
		text: '',
		psd: ''
	});
});
router.post('', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.body;
		var name = param.username;
		var psd1 = param.password1;
		var psd2 = param.password2;
		var job=param.work;
		var sex=param.sex;
		var db='';
		if(job=="管理员"){
			db='administator';
		}
		if(job=="菜农"){
			db='peasant';
		}
		if(job=="收购商"){
			db='business';
		}
		// 建立连接 增加一个用户信息 
		if(name == '' || psd1 == '' || psd2 == '') {
			var result = {
				err: 201,
				text: "输入有空",
				title: 'tjp',
				
			}
			res.render('regeit', result);
			return false;
		}
		if(psd1 != psd2) {
			var result = {
				err: 201,
				text: "密码不匹配",
				title: 'tjp'
			
			}
			res.render('regeit', result);
			return false;
		}
		for(var i = 0; i < 10; i++) {
			psd1 = (require('crypto').createHash('md5').update(psd1).digest('hex'));
			psd1 = psd1
		}
		console.log(db)
		var user=[name,psd1,sex];
		connection.query('INSERT INTO ' +db+ '(username,password,sex) VALUES(?,?,?)', user, function selectCb(err, results, fields) {
			if(err) {
				console.log(err)
				return false;
			}
			var result = {
						err: 201,
						text: "",
						title: 'tjp',
						psd: '注册成功'
				}
			res.render('regeit', result);
			connection.end();
		});
	});
});
module.exports = router;