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
	pool.getConnection(function(err, connection) {
		// 获取前台页面传过来的参数  
		var param = req.query || req.params;
		var name=param.name;
		var phone=param.phone;
		var address=param.address;
		var price=param.price;
		var type=param.type;
		var beizhu=param.beizhu;
		var sender=sessionStorage.getItem('userName');
		var dat=String(new Date().getTime());
		
		
		
		console.log(msg)
		if(name==' '){
			var result={
				err:201,
				text:"请输入蔬菜种类",
			}
			res.render('add_shu', result);
			return false;
		}
		if(phone==' '){
			var result={
				err:202,
				text:"请输入电话号码",
			}
			res.render('add_shu', result);
			return false;
		}
		if(price==' '){
			var result={
				err:203,
				text:"请输入价格",
			}
			res.render('add_shu', result);
			return false;
		}
		if(address==' '){
			var result={
				err:204,
				text:"请输入你的地址",
			}
			res.render('add_shu', result);
			return false;
		}
		var msg=[name,price,dat,sender,address,beizhu,phone];
		// 建立连接 增加一个信息 
		connection.query('INSERT INTO '+ type +'(id,name,price,time,sender,address,beizhu,phone) VALUES(0,?,?,?,?,?,?,?)', msg, function selectCb(err, results, fields) {
			 if(err){
        		 console.log('[INSERT ERROR] - ',err.message);
         		return;
        	}       
			var result = {
						text: "蔬菜信息录入成功...",
						title: '农产品价格公示平台',
						psd: ''
				}
			res.send('result', result);
			connection.end();
		});
	});
});

module.exports = router;
