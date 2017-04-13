
/*
*查询数据库
*/
/*client.query('select * from test', function(err, rows, fields) {
	if (err) throw err;
		console.log('selected after deleted');
	for(var i= 0,usr;usr=rows[i++];){
		console.log('username='+usr.username + ', password='+usr.password);
	}
	console.log('\n');
	client.end();
});*/


/*
*向snow数据库的test表中插入一行数据
*/
/*var  userAddSql = 'INSERT INTO test(id,username,password) VALUES(5,?,?)';
var  userAddSql_Params = ['Wilson', 55];
client.query(userAddSql,userAddSql_Params,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }       
       console.log('-------INSERT----------');
       //console.log('INSERT ID:',result.insertId);       
       console.log('INSERT ID:',result);       
       console.log('#######################'); 
       client.end();
});*/


/*
*更新数据表
*/
/*var usernm='"Wilson"';
var newpsd="10086";
var oldpsd="123";
var updatemsg1='update test set password='+newpsd+' where username='+usernm+' ';
var updatemsg2={password:oldpsd};

client.query(updatemsg1, updatemsg2, function(err, result) {
	if (err) {
		throw err;
	};
	console.log('updated Wilson\'s password to ddd');
	console.log(result);
	console.log('\n');
	client.end();
});*/
 

 /*
 *删除一条数据
 */
/*var usernm='"Wilson"' ;
var oldpsd="10086";
var updatemsg1='delete from test where username='+usernm+' ';
var updatemsg2={password:oldpsd};
client.query(updatemsg1, updatemsg2, function(err, result) {
	if (err){
		throw err;
	}
	console.log('deleted '+ usernm);
	console.log(result);
	console.log('\n');
	client.end();
});*/


module.exports=function(app){
	var mysql = require('mysql');  
   
	//创建连接  
	var client = mysql.createConnection({  
	   	host: 'localhost',
	    user: 'root',
	    password: 'admin',
	    database:'snow'
	});  
	
	client.connect();
	app.
};