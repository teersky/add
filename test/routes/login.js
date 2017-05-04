var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
router.get('', function(req, res, next) {
  res.render('login', {title: 'tjp', text:'', psd:''});
});
//http://localhost:3000/users/getUserById?id=5
router.post('', function(req, res, next) {
	// 从连接池获取连接 
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.body
		var type =param.user;
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
		
		connection.query('SELECT password FROM '+type+' WHERE username = ? ', [name],function selectCb(err, results, fields) {
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
				console.log(results[0].password +'---'+ psd);
				if(results[0].password != psd){
					var result={
						err:201,
						text:"",
						title: 'tjp',
						psd:'密码错误'
					}
					res.render('login', result);
					return false;
				}else{
					res.render('result', results[0]);
				}
				
				/*res.json({
					code: '9902',
					msg: 'ok'
				});*/
			}
			connection.end();
		});
	});
});
module.exports = router;
