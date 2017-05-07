exports.do = function (sql, pool, res, callback){
	console.log(sql);
    this.getConnection(function (err, connection){
    	console.log(123);
        connection.query(sql,  function (rerr, esult){
        	res.send(result);
        	console.log(result)
            callback.apply(connection, arguments);
            connection.release();
        });
    })
}
exports.add=function(pool,sql,arr,res){
	pool.getConnection(function(err, connection){
		connection.query(sql, arr, function(err, result){
			console.log(result);
			res.send(result);
			connection.release()
		});
	});
}

exports.get=function(pool,sql,res){
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, result){
			res.send(result);
			connection.release()
		});
	});
}
exports.del=function(pool,sql,res){
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, result){
			if(err){
				throw err;
			}
			res.send(result);
			connection.release()
		});
	});
}
exports.acc=function(pool,sql,res){
	
	console.log(new Date().getSeconds())
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, result){
			if(err){
				throw err;
			}
			res.send(result);
			connection.release()
		});
	});
}
exports.ref=function(pool,sql,res){
	pool.getConnection(function(err, connection){
		connection.query(sql, function(err, result){
			if(err){
				throw err;
			}
			res.send(result);
			connection.release()
		});
	});
}
exports.acc_update=function(pool,msg1,msg2, res){
	pool.getConnection(function(err, connection){
		connection.query(msg1, msg2, function(err, result){
			if(err){
				console.log(err)
				throw err;
			}
			res.send(result);
			connection.release()
		});
	});
}
exports.ref_update=function(pool,msg1,msg2, res){
	pool.getConnection(function(err, connection){
		connection.query(msg1, msg2, function(err, result){
			if(err){
				throw err;
			}
			res.send(result);
			connection.release()
		});
	});
}