var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

// 响应一个JSON数据
var responseJSON = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code: '-200',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
var responseJSON2 = function(res, ret) {
	if(typeof ret === 'undefined') { 
		res.json({
			code: '-200',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
// 添加用户

//http://localhost:3000/users/addUser?id=5&username=zhd&password=1.8
router.get('/addUser', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		// 建立连接 增加一个用户信息 
		var psd=param.password
		for(var i=0;i<10;i++){
			psd=(require('crypto').createHash('md5').update(psd).digest('hex'));
			psd=psd
		}
		connection.query(userSQL.insert, [param.username, psd], function(err, result) {
			res.json(result);
			// 释放连接  
			connection.release();

		});
	});
});

router.post('/postAdd', function(req, res, next){
	pool.getConnection(function(err, connection) {
		var name = req.body.username;  
	    var psd = req.body.password;  
	   
	    for(var i=0;i<10;i++){
			psd=(require('crypto').createHash('md5').update(psd).digest('hex'));
			psd=psd
		}
	  	if(name==''){
	  		res.json({
	  			err:210,
	  			data:"未输入用户名"
	  		});
	  		return false;
	  	}
		if(name==''){
	  		res.json({
	  			err:220,
	  			data:"未输入密码"
	  		});
	  		return false;
	  	}
		connection.query(userSQL.getUserByName, [name],function selectCb(err, results, fields) {
			if(results){
				res.json({
		  			err:220,
		  			data:"您注册的用户名已存在，请重试"
		  		});
		  		return false;
			}else{
				connection.query(userSQL.insert, [name, psd], function(err, result) {
			  		res.json({
						code: '-222',
						msg: '注册成功'
					});
			  	});
			}
		});
	  	
	});
	
   
});

//查询全部
//http://localhost:3000/users/selUser
router.get('/selUser', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		// 建立连接 增加一个用户信息 
		connection.query(userSQL.queryAll, function selectCb(err, results, fields) {
			if(err) {
				throw err;
			}
			responseJSON2(res, results);
			connection.end();
		});
	});
});


//按照id查询
//http://localhost:3000/users/getUserById?id=5
router.post('/postUserByNames', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.body
		var name =param.username;
		var psd =param.password;
		// 建立连接 增加一个用户信息 
		if(name=='' || psd==''){
			var result={
				err:201,
				text:"输入有空",
				title: 'tjp',
				psd:''
			}
			res.render('login', result);
			return false;
		}
		for(var i=0;i<10;i++){
			psd=(require('crypto').createHash('md5').update(psd).digest('hex'));
			psd=psd
		}
		
		connection.query(userSQL.getUserByName, [name],function selectCb(err, results, fields) {
			if(err) {
				
				return false;
			}
			if(results[0]==undefined){
				var result={
					err:201,
					text:"用户名不存在",
					title: 'tjp',
					psd:''
				}
				res.render('login', result);
				return false;
			}else{
				
				if(results[0].password != psd){
					var result={
						err:201,
						text:"",
						title: 'tjp',
						psd:'密码错误'
					}
					res.render('login', result);
					return false;
				}
				res.render('result', results[0]);
				/*res.json({
					code: '9902',
					msg: 'ok'
				});*/
			}
			connection.end();
		});
	});
});

//按照用户名查询
//http://localhost:3000/users/getUserById?id=5
router.get('/getUserByNames', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		// 建立连接 增加一个用户信息 
		if(param.id=='' || param.username=='' || param.password==''){
			res.json({
				code: '-201',
				msg: '输入有空项'
			});
			return false;
		}
		var psd=param.password
		for(var i=0;i<10;i++){
			psd=(require('crypto').createHash('md5').update(psd).digest('hex'));
			psd=psd
		}
		
		console.log(param.username)
		connection.query(userSQL.getUserByName, [param.username], function selectCb(err, results, fields) {
			if(err) {
				return false;
			}
			if(results[0]==undefined){
				res.json({
					code: '-205',
					msg: '用户名不存在'
				});
				return false;
			}else{
				
				if(results[0].password != psd){
					res.json({
						code: '-202',
						msg: '密码错误'
					});
					return false;
				}
				res.render('result', results[0]);
				/*res.json({
					code: '602',
					msg: '密码错误'
				});*/
			}
			connection.end();
		});
	});
});
module.exports = router;