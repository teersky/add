var express = require('express');
var http = require('http');
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
	res.render('regeit', {});
});
router.post('', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.body;
		var name = param.userName;
		var psd1 = param.psd1;
		var psd2 = param.psd2;
		var job  = param.work;
		var sex  = param.sex;
		var city = param.address;
		console.log(param)
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
		
		var user=[name,psd1,sex,city];
		
		connection.query('INSERT INTO '+ job +'(id,username,password,sex,istitute) VALUES(0,?,?,?,?)', user, function selectCb(err, results, fields) {
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
			res.send(result);
			connection.release();
		});
	});
});
module.exports = router;