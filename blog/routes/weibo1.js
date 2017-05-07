var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
/* GET home page. */
var page_Size=6;
var json={};
var rr=[];

router.get('', function(req, res) {
	var body = ''; 
	var param = req.query || req.params;
	var msg=(param.act);
	var json={};
	
	if(msg=='add'){
		var date=new Date().getTime();
		var sql= "INSERT INTO info(ID,content,time,name,acc,ref) VALUES(0,?,?,?,?,?)"
		var arr=[param.content,date,param.username,0 ,0]; 	
		var get = require('./get.js'); 
		get.add(pool,sql,arr,res);
	}
	if(msg=="get"){
		var sql= "SELECT *from info ORDER BY time desc";
		var get1 = require('./get.js'); 
		get1.get(pool,sql,res);
	}
	if(msg=="del"){
		var sql= "delete from  info where ID="+param.id+"";
		var get = require('./get.js'); 
		get.del(pool,sql,res);
	}
	if(msg=="acc"){
		var sql= "SELECT acc from info where ID="+param.id+"";
		var get = require('./get.js'); 
		get.acc(pool,sql,res);
	}
	if(msg=="acc_update"){
		var updatemsg1='update info set acc='+param.acc_num+' where ID='+param.id+' ';
		var updatemsg2={acc:param.old_num};
		var get = require('./get.js'); 
		get.acc_update(pool,updatemsg1,updatemsg2,res);
	}
	if(msg=="ref"){
		console.log('asd');
		var sql= "SELECT ref from info where ID="+param.id+"";
		var get = require('./get.js'); 
		get.ref(pool,sql,res);
	
	}
	if(msg=="ref_update"){
		var updatemsg1='update info set ref='+param.acc_num+' where ID='+param.id+' ';
		var updatemsg2={ref:param.old_num};
		var get = require('./get.js'); 
		get.ref_update(pool,updatemsg1,updatemsg1,res);
	}
});


module.exports = router;