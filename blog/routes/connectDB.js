//此处使用的是MySQL@2.11.1
var mysql = require('mysql');
//日志模块
var logger = require('./logger');
//连接池
var  pool   =  mysql.createPool({
      host     :  'localhost',
      port:3306,
      user     :  'root',
      password :  'root',
      database :  'snow'
});
//通用执行sql方法
module.exports.query = function (sql,params,callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            logger.error(err.message, err);
            if (callback) {
                callback(err);
            }
        } else {
            connection.query(sql, params, callback);
            connection.release();
        }
    });  
}
//查询用户列表
module.exports.getusers = function (searchparam, callback) {
    //此处调用存储过程，返回一个列表和总记录行数
    var sql = "call `proc_getusers`(?,?,?,?,?)";
    var params = [searchparam.Name, searchparam.LoginId, searchparam.Phone, searchparam.PageIndex, searchparam.PageSize];
    dao.query(sql, params, function (err, result, fields) {
        if (callback) {
            if (!err) {
                var users = {
                    rows: result[0],
                    totalitemcount: result[1][0].p_totalitemcount
                }
                callback(users);
            } else {
                callback();
            }
        }
    });
}
//修改用户
module.exports.modifyuser = function (user, callback) {
    var sql = "UPDATE `user`   SET    `Name` = ?,`Sex` = ?,`Phone` = ?, `Email` = ?, `Address` = ?,`Enable`=?  WHERE `Id` = ?";
    var params = [
        user.Name,
        user.Sex,
        user.Phone,
        user.Email,
        user.Address,
        user.Enable,
        user.Id
    ];
    dao.query(sql, params, function (err, result) {
        if (callback) {
            if (!err) {
                var success = result.affectedRows > 0;
                callback(success, success ? "修改成功" : "修改失败");
            } else {
                callback(false, "修改失败");
            }
        }
    });
}