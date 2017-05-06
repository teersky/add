var express = require('express');
var router = express.Router();
var userSQL = require('../routes/users');
/* GET home page. */
router.get('', function(req, res, next) {
	console.log(req.url);
	if(req.url=='/add'){
		console.log("add");
	}
	if(req.url=='/getPageCount')
    res.render('weibo', { id:'', username:'', password:'' });
	// 从连接池获取连接 
	/*pool.getConnection(function(err, connection) {
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
		
		var msg=[name,price,dat,sender,address,beizhu,phone];
		// 建立连接 增加一个信息 
		connection.query('INSERT INTO '+ type +'(ID,content,time,name,acc,ref) VALUES(0,?,?,?,?,?)', msg, function selectCb(err, results, fields) {
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
	});*/
});

module.exports = router;
