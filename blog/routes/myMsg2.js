var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
router.get('', function(req, res) {
	var body = ''; 
	var param = req.query || req.params;
	var msg=(param.act);
	
	//var sql='SELECT * FROM '+param.type+"where username = "+param.username+""
	if(msg=="myMsg"){
		var sql='SELECT istitute,sex,county,phone, tel, email, isOwn FROM '+param.type+' WHERE username = ? ';
		var sql2="SELECT acc from info where name = ?";
		pool.getConnection(function(err, connection){
			var sum=0;

			connection.query(sql, param.username, function(err, result){
				//res.send(result);
				console.log(err);
			  	connection.query(sql2,  param.username, function(err, results){
					for(var i=0;i<results.length;i++){
						sum += results[i].acc-1+1;
					}
					
					result[0].num=sum;
					res.send(result[0]);
					connection.release();
				});
			  	
				
			});
			
		});
	}
	if(msg=="all_shu"){
		var msg=param.getMsg;
		var sql='SELECT * FROM  vegetable WHERE type = ? ';
		var sql2="SELECT * from vegetable";
		
		
		pool.getConnection(function(err, connection){
			if(msg == "全部"){
				connection.query(sql2,  function(err, results){
					res.json(results);
					connection.release();
				});
			}else{
				connection.query(sql, msg, function(err, results){
					res.json(results);
					connection.release();
				});
			}
			
		});
	}
	if(msg=="add_Msg"){
		var c1=param.c1;
		var c2=param.c2;
		var c3=param.c3;
		var c4=param.c4;
		var c5=param.c5;
		var type =param.type;
		var user =param.user;
		var arr=[c1,c2,c3,c4,c5,user]
		
		//var sql='INSERT INTO '+type+'("区(县)",手机,电话,邮箱,是否本县) VALUES(?,?,?,?,?)';
		var sql="update  "+type+" set county=?,phone=? ,tel=?, email=?, isOur= ?  where  username=?";
		console.log(sql)
		pool.getConnection(function(err, connection){
			connection.query(sql,  arr, function(err, results){
				console.log(err)
				res.json(results);
				connection.release();
			});
			
		});
	}

	if(msg=="getMy"){
		var user=param.user;
		var sql="SELECT  *  from vegetable where sender=?";
		console.log(sql)
		pool.getConnection(function(err, connection){
			connection.query(sql,  user, function(err, results){
				res.json(results);
				connection.release();
			});
			
		});
	}
	if(msg=="del_Shu"){
		var sql= "delete from  vegetable where ID="+param.id+"";
		pool.getConnection(function(err, connection){
			connection.query(sql,   function(err, results){
				res.json(results);
				connection.release();
			});
			
		});
	}
	if(msg=="change_vege"){
		var c2=param.c2;
		var c3=param.c3;
		var c4=param.c4;
		var c5=param.c5;
		var id=param.id;
		//var add=param.address;
		var add="兰州市安宁区"
		var dat=String(new Date().getTime());
		var arr=[c2,c3,c4,c5,dat,add,id]
		console.log(arr)
		//var sql='INSERT INTO '+type+'("区(县)",手机,电话,邮箱,是否本县) VALUES(?,?,?,?,?)';
		var sql="SELECT  *  from "+c+"";
	
		pool.getConnection(function(err, connection){
			connection.query(sql,  function(err, results){
				console.log(results)
				res.json(results);
				connection.release();
			});
			
		});
	}
	if(msg=="getUserMsg"){
		var c=param.char;
		console.log(c)
		//var sql='INSERT INTO '+type+'("区(县)",手机,电话,邮箱,是否本县) VALUES(?,?,?,?,?)';
		var sql="SELECT * FROM "+c+"";
	console.log(param)
		pool.getConnection(function(err, connection){
			connection.query(sql,  function(err, results){
				
				res.json(results);
				connection.release();
			});
			
		});
	}
	if(msg=="getCheck"){
		var c=param.char;
		console.log(c)
		//var sql='INSERT INTO '+type+'("区(县)",手机,电话,邮箱,是否本县) VALUES(?,?,?,?,?)';
		var sql="SELECT * FROM checkd";
		pool.getConnection(function(err, connection){
			connection.query(sql,  function(err, results){
				
				res.json(results);
				connection.release();
			});
			
		});
	}

	if(msg=="add_shu"){
		
		// 获取前台页面传过来的参数  
		
		var param = req.query || req.params;
		var char=param.c;
		var name=param.name;
		var phone=param.phone;
		var address=param.address;
		var price=param.price;
		var type=param.type;
		var beizhu=param.beizhu;
		var sender=param.sender;
		var dat=String(new Date().getTime());
		
		if(name==' '){
			res.send({text:"请输入蔬菜种类"});
			return false;
		}
		if(phone==' '){
			res.send( {text:"请输入电话号码"});
			return false;
		}
		if(price==' '){
			res.send( {text:"请输入价格"});
			return false;
		}
		if(address==' '){
			
			res.send( {text:"请输入你的地址"});
			return false;
		}
		var msg=[name,price,dat, sender,address,beizhu,phone,type];
		// 建立连接 增加一个信息 
		 console.log(msg);
		pool.getConnection(function(err, connection) {
			console.log(err)
			connection.query('INSERT INTO  chekcd (id,name,price,time,sender,address,beizhu,phone,type) VALUES(0,?,?,?,?,?,?,?,?)', msg, function selectCb(err, results) {
				/*if(err){
	        		 console.log(err);
	         		return;
	        	}  */
				res.send( {text: "蔬菜信息录入成功..."});
				connection.release();
			});
		});
	}
	if(msg=="admin_shu"){
		var param = req.query || req.params;
		var mg= param;
		// 建立连接 增加一个信息 
		  
		 var msg=[mg.name,mg.price,mg.time,mg.sender,mg.address,mg.beizhu,mg.phone,mg.type];
		pool.getConnection(function(err, connection) {
			
			connection.query('INSERT INTO  vegetable (id,name,price,time,sender,address,beizhu,phone,type) VALUES(0,?,?,?,?,?,?,?,?)', msg, function selectCb(err, results) {
				console.log(err)
				if(err){
	        		 console.log(err);
	         		return;
	        	}  
				res.send( {text: "蔬菜信息录入成功..."});
				connection.release();
			});
		});
	}
	if(msg=="admin_del"){
		var sql= "delete from  "+param.c+" where id="+param.id+"";
		console.log(sql)
		pool.getConnection(function(err, connection){
			connection.query(sql,   function(err, results){
				res.json(results);
				connection.release();
			});
			
		});
	}

	if(msg=="getWeibo"){
		var sql= "SELECT * from "+param.c+"";
		console.log(sql)
		pool.getConnection(function(err, connection){
			connection.query(sql,   function(err, results){
				res.json(results);
				connection.release();
			});
			
		});
	}
	if(msg=="chk_admin"){
		var psd=param.password;
		var sql= "SELECT password from admininstator where username=?";
		console.log(sql)
		pool.getConnection(function(err, connection){
			connection.query(sql,   function(err, results){
				res.json(results);
				connection.release();
			});
			
		});
	}
	
});
router.post('/login', function(req, res) {
	var param = req.body;
	var msg=param.act;
	var user=param.user;
	var psd=param.psd;
	var type=param.type;
	var psd1='';
	for(var i = 0; i < 10; i++) {
		psd = (require('crypto').createHash('md5').update(psd).digest('hex'));
		psd = psd
	}
	//var sql='SELECT psssword FROM  ? WHERE username = ? ';
	var sql='SELECT password FROM '+type+' WHERE username = ?';
	pool.getConnection(function(err, connection){
		connection.query(sql, user,  function(err, results){
			if(results[0].password==psd){
				res.send({err:0,txt:"登录成功"});
			}
			if(results[0].password!=psd){
				console.log("none")
				res.send({err:1,txt:"密码错误"});
			}
			connection.release();
		});
		
	});
	
})
router.post('/getPsd', function(req, res) {
	var param = req.body;
	var act=param.act;
	var user=param.user;
	var psd=param.psd;	
	var type=param.type;
	console.log(psd+'----')
	for(var i = 0; i < 10; i++) {
		psd = (require('crypto').createHash('md5').update(psd).digest('hex'));
		psd = psd
	}
	console.log(psd);
	//var sql='SELECT psssword FROM  ? WHERE username = ? ';
	var sql='SELECT password FROM '+type+' WHERE username= ?';
	
	pool.getConnection(function(err, connection){
		//console.log(err);
		
		connection.query(sql, user, function(err, results){
			//res.send(results);
			if(results[0].password==psd){
				res.send({err:0,txt:"密码匹配"});
			}
			if(results[0].password!=psd){
				console.log("none")
				res.send({err:1,txt:"密码错误"});
			}
			connection.release();
		});
		
	});
	
})

router.post('/setPsd', function(req, res) {
	var param = req.body;
	var user=param.user;
	var psd=param.newPsd;
	var type=param.type;

	for(var i = 0; i < 10; i++) {
		psd = (require('crypto').createHash('md5').update(psd).digest('hex'));
		psd = psd
	}
	var sql2="update  "+type+" set password=?  where  username=?";
	pool.getConnection(function(err, connection){
		connection.query(sql2,  [psd,user], function(err, results){
			console.log(err)
			res.json({"err":0});
			connection.release();
		});
		
	});

});
module.exports = router;